use crate::account::UserId;
use crate::MainDbCon;
use rocket_contrib::json::Json;

#[derive(Serialize)]
pub struct ChallengeResponse {
    id: i32,
    title: String,
    topic: Option<String>,
    image: Option<String>,
    description: String,
}

#[get("/")]
pub fn get_challenge(user_id: UserId, con: MainDbCon) -> Json<ChallengeResponse> {
    // let c =

    let res = ChallengeResponse {
        id : 0,
        title: "10 Löffel sind ein Haus".into(),
        topic: Some("Spass".into()),
        image: Some("https://as2.ftcdn.net/jpg/02/22/61/43/500_F_222614376_uyur5TG31C1NaKbyWmimI9NjXFlh6KRr.jpg".into()),
        description: "Suche 10 Löffel und lege ein Haus".into(),
    };
    Json(res)
}

use rocket::Data;
use std::env;
use uuid::Uuid;

#[derive(Serialize)]
pub struct UploadResponse {}

#[post("/challenge/<challenge_id>", format = "plain", data = "<data>")]
pub fn upload_result(
    user_id: UserId,
    challenge_id: u32,
    data: Data,
) -> Result<Json<UploadResponse>, std::io::Error> {
    let mut file = String::from("./data/");
    file.push_str(&format!("{}", uuid::Uuid::new_v4()));
    data.stream_to_file(file)?;
    Ok(Json(UploadResponse {}))
}
