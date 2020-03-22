use crate::MainDbCon;
use rocket::{http::Status, response::Response};
use rocket_contrib::json::Json;
use std::error::Error;

#[derive(Deserialize)]
pub struct NewChallengeRequest {
    title: String,
    topic: String,
    image: String,
    description: String,
}

#[post("/new_challenge", data = "<request>")]
pub fn new_challenge(
    request: Json<NewChallengeRequest>,
    con: MainDbCon,
) -> Result<Response<'static>, Box<dyn Error>> {
    con.0.query(
        "INSERT INTO Challenge(title, topic, description, picture)
		values($1, $2, $3, $4)",
        &[
            &request.title,
            &request.topic,
            &request.description,
            &request.image,
        ],
    )?;
    let mut res = Response::new();
    res.set_status(Status::new(204, "challenge added"));
    Ok(res)
}

#[derive(Deserialize)]
pub struct ChangeChallengeRequest {
    id: i32,
    title: String,
    topic: String,
    image: String,
    description: String,
}

#[post("/change_challenge", data = "<request>")]
pub fn change_challenge(
    request: Json<ChangeChallengeRequest>,
    con: MainDbCon,
) -> Result<Response<'static>, Box<dyn Error>> {
    con.0.query(
        "UPDATE Challenge SET title = $1, topic = $2, description = $3, picture = $4
		WHERE id = $5",
        &[
            &request.title,
            &request.topic,
            &request.description,
            &request.image,
            &request.id,
        ],
    )?;
    let mut res = Response::new();
    res.set_status(Status::new(204, "challenge changed"));
    Ok(res)
}

#[derive(Deserialize)]
pub struct DeleteChallengeRequest {
    id: i32,
}

#[post("/delete_challenge", data = "<request>")]
pub fn delete_challenge(
    request: Json<DeleteChallengeRequest>,
    con: MainDbCon,
) -> Result<Response<'static>, Box<dyn Error>> {
    con.0.query(
        "DELETE FROM Challenge
		WHERE id = $1",
        &[&request.id],
    )?;
    let mut res = Response::new();
    res.set_status(Status::new(204, "challenge deleted"));
    Ok(res)
}
