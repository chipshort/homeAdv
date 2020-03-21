use crate::account::UserId;
use rocket_contrib::json::Json;

#[derive(Serialize)]
pub struct ChallengeResponse {
    title: String,
    categories: Vec<String>,
    image: Option<String>,
    description: String,
}

#[get("/")]
pub fn get_challenge(user_id: UserId) -> Json<ChallengeResponse> {
    let res = ChallengeResponse {
        title: "10 Löffel sind ein Haus".into(),
        categories: vec!("K".into(), "T".into(), "E".into()),
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
