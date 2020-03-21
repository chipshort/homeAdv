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
