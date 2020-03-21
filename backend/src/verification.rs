use crate::account::UserId;
use crate::MainDbCon;
use rocket::response::NamedFile;
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
