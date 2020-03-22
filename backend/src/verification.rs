use crate::account::UserId;
use crate::MainDbCon;
use rocket::http::Status;
use rocket::response::NamedFile;
use rocket::Response;
use rocket_contrib::json::Json;
use std::error::Error;
use std::path::Path;

#[derive(Serialize)]
pub struct Verification {
    completion_id: i32,
    submission_picture: String,
    challenge_title: String,
    challenge_topic: String,
    challenge_description: String,
    challenge_picture: String,
}

#[get("/picture/<picture_uuid>")]
pub fn get_submission_picture(_user_id: UserId, picture_uuid: String) -> Option<NamedFile> {
    let file = Path::new("data/").join(picture_uuid);
    NamedFile::open(file).ok()
}

#[get("/")]
pub fn get_verification(
    user_id: UserId,
    con: MainDbCon,
) -> Result<Json<Option<Verification>>, Box<dyn Error>> {
    let rows = con.0.query(
        "SELECT comp.id, comp.image_uuid, c.title, c.topic, c.description, c.picture 
        from ChallengeCompletion comp inner join Challenge c on comp.challenge_id = c.id
        where person_id != $1 and NOT EXISTS (
            select 1 from Verification v where v.verificator_id = $1 and v.completion_id = comp.id)
        ORDER BY RANDOM() LIMIT 1",
        &[&user_id.0],
    )?;
    if rows.len() == 0 {
        return Ok(Json(None));
    }
    let row = rows.get(0);
    let res = Verification {
        completion_id: row.get(0),
        submission_picture: format!("/rest/verification/picture/{}", row.get::<usize, String>(1)),
        challenge_title: row.get(2),
        challenge_topic: row.get(3),
        challenge_description: row.get(4),
        challenge_picture: row.get(5),
    };
    Ok(Json(Some(res)))
}

#[derive(Deserialize)]
pub struct VerificationResultRequest {
    completion_id: i32,
    verification_result: bool,
}

#[post("/completion/rate", data = "<data>")]
pub fn post_verification_submission(
    user_id: UserId,
    data: Json<VerificationResultRequest>,
    con: MainDbCon,
) -> Result<Response<'static>, Box<dyn Error>> {
    let mut res = Response::build()
        .status(Status::new(204, "all ok"))
        .finalize();

    let transaction = con.0.transaction()?;

    let rows = transaction.query(
        "SELECT c.person_id FROM ChallengeCompletion c where c.id = $1 and NOT EXISTS(
        SELECT 1 from verification v where c.id = v.completion_id and v.verificator_id = $2)",
        &[&data.completion_id, &user_id.0],
    )?;

    if rows.len() < 1 {
        res.set_status(Status::new(
            403,
            "You have validated already or the completion does not exist",
        ));
        return Ok(res);
    }
    let challenge_completer: i32 = rows.get(0).get(0);

    transaction.execute(
        "INSERT INTO Verification (completion_id, verificator_id, status)
        VALUES ($1, $2, $3)",
        &[&data.completion_id, &user_id.0, &data.verification_result],
    )?;

    let rows = transaction.query(
        "SELECT status, COUNT(*) as count
        FROM Verification WHERE completion_id = $1 group by status",
        &[&data.completion_id],
    )?;
    let mut pos_count = 0;
    let mut neg_count = 0;

    for row in rows.iter() {
        let status: bool = row.get(0);
        let count: i64 = row.get(1);
        if status == true {
            pos_count += count;
        } else {
            neg_count += count;
        }
    }

    if pos_count + neg_count >= 5 {
        if pos_count >= 3 {
            transaction.execute(
                "UPDATE person set score = score + 1 where id = $1",
                &[&challenge_completer],
            )?;
        }
        let rows = transaction.query(
            "DELETE FROM ChallengeCompletion where id = $1 RETURNING image_uuid",
            &[&data.completion_id],
        )?;
        for row in rows.iter() {
            let uuid: String = row.get(0);
            let filename = format!("./data/{}", uuid);
            match std::fs::remove_file(filename) {
                _ => {}
            };
        }
    }

    transaction.commit()?;

    Ok(res)
}
