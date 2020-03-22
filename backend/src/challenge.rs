use crate::account::UserId;
use crate::MainDbCon;
use rocket::http::Status;
use rocket::response::Response;
use rocket_contrib::json::Json;

#[derive(Serialize)]
pub struct ChallengeResponse {
    id: i32,
    title: String,
    topic: String,
    image: String,
    description: String,
    completed: bool,
}

#[get("/")]
pub fn get_challenge(
    user_id: UserId,
    con: MainDbCon,
) -> Result<Json<ChallengeResponse>, Box<dyn std::error::Error>> {
    con.0.execute(
        "DELETE FROM ActiveChallenge where person_id = $1 and activation_ts < NOW() - interval '1 hour'",
        &[&user_id.0],
    )?;

    let res = con.0.query(
        "SELECT challenge_id, completed from ActiveChallenge WHERE person_id = $1",
        &[&user_id.0],
    )?;

    let rows;
    let completed;
    if res.len() == 0 {
        rows = con.0.query(
            "SELECT id, title, topic, description, picture FROM Challenge ORDER BY RANDOM() LIMIT 1",
            &[],
        )?;
        let id: i32 = rows.get(0).get(0);
        println!("running insert");
        con.0.execute(
            "INSERT INTO ActiveChallenge (challenge_id, person_id, activation_ts, completed)
            VALUES ($1, $2, NOW(), FALSE)",
            &[&id, &user_id.0],
        )?;
        completed = false;
    } else {
        let id: i32 = res.get(0).get(0);
        completed = res.get(0).get(1);
        rows = con.0.query(
            "SELECT c.id, c.title, c.topic, c.description, c.picture from Challenge c
            where c.id = $1",
            &[&id],
        )?;
    }
    println!("executing");
    let row = rows.get(0);

    let res = ChallengeResponse {
        id: row.get(0),
        title: row.get(1),
        topic: row.get(2),
        description: row.get(3),
        image: row.get(4),
        completed: completed,
    };
    Ok(Json(res))
}

use rocket::Data;
use uuid::Uuid;

#[derive(Serialize)]
pub struct UploadResponse {}

#[post("/<challenge_id>", format = "any", data = "<data>")]
pub fn upload_result(
    user_id: UserId,
    challenge_id: i32,
    con: MainDbCon,
    data: Data,
) -> Result<Response<'static>, Box<dyn std::error::Error>> {
    let uuid = format!("{}", Uuid::new_v4());
    let file = format!("./data/{}", &uuid);

    let transaction = con.0.transaction()?;

    let res = transaction.query(
        "SELECT completed, challenge_id from ActiveChallenge where person_id = $1",
        &[&user_id.0],
    )?;

    let mut resp = Response::new();
    if res.len() < 1 || res.get(0).get::<usize, bool>(0) != false {
        resp.set_status(Status::new(403, "You may not complete a Challenge twice"));
        return Ok(resp);
    }

    let challenge_id_db: i32 = res.get(0).get(1);
    if challenge_id_db != challenge_id {
        resp.set_status(Status::new(
            403,
            "You may not complete an inactive challenge",
        ));
        return Ok(resp);
    }

    transaction.execute(
        "INSERT INTO ChallengeCompletion (challenge_id, person_id, image_uuid)
        VALUES ($1, $2, $3)",
        &[&challenge_id, &user_id.0, &uuid],
    )?;
    transaction.execute(
        "UPDATE ActiveChallenge SET completed = TRUE 
        where challenge_id = $1 and person_id  = $2",
        &[&challenge_id, &user_id.0],
    )?;

    data.stream_to_file(file)?;

    transaction.commit()?;
    resp.set_status(Status::new(204, "Challenge completion successful"));
    Ok(resp)
}
