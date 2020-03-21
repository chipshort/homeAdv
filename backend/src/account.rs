use rocket::http::{Cookie, Cookies, Status};
use rocket::response::Response;
use rocket_contrib::json::Json;

use bcrypt::*;

#[derive(Deserialize)]
pub struct LoginRequest {
    username: String,
    password: String,
}

#[post("/login", data = "<request>")]
pub fn login(request: Json<LoginRequest>, mut cookies: Cookies, con: MainDbCon) -> Response {
    let r = con.0.query(
        "SELECT id, password FROM person where name = $1",
        &[&request.username],
    );

    let mut res = Response::new();
    match r {
        Ok(rows) if rows.len() == 1 => {
            let row = rows.get(0);
            let id: i32 = row.get(0);
            let hash: String = row.get(1);
            match verify(&request.password, &hash) {
                Ok(true) => {
                    cookies.add_private(Cookie::new("user_id", format!("{}", id)));
                    res.set_status(Status::new(204, "login successful"));
                    return res;
                }
                _ => {}
            }
        }
        _ => {}
    }
    res.set_status(Status::new(401, "username of password incorrect"));
    res
}

#[post("/logout")]
pub fn logout(mut cookies: Cookies) -> Response {
    cookies.remove_private(Cookie::named("user_id"));
    Response::new()
}

#[derive(Deserialize)]
pub struct AccountCreationRequest {
    username: String,
    age: u32,
    password: String,
}

#[derive(Serialize)]
pub enum AccountCreationError {
    UsernameTaken,
}

use rocket::request::FromRequest;
use std::str::FromStr;

pub struct UserId(pub i32);

impl FromStr for UserId {
    type Err = <u32 as FromStr>::Err;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        i32::from_str(s).map(UserId)
    }
}

use crate::MainDbCon;
use rocket::outcome::IntoOutcome;
use rocket::request;

impl<'a, 'r> FromRequest<'a, 'r> for UserId {
    type Error = ();

    fn from_request(req: &'a rocket::Request<'r>) -> request::Outcome<Self, Self::Error> {
        req.cookies()
            .get_private("user_id")
            .and_then(|c| c.value().parse().ok())
            .into_outcome((rocket::http::Status::new(401, "you are not logged in"), ()))
    }
}

#[post("/create", data = "<request>")]
pub fn create(
    request: Json<AccountCreationRequest>,
    mut cookies: Cookies,
    con: MainDbCon,
) -> Result<Response, Box<dyn std::error::Error>> {
    let pw = hash(&request.password, DEFAULT_COST)?;
    let res = con.0.query(
        "insert into Person (name, score, password) 
        values ($1, $2, $3) returning id",
        &[&request.username, &0, &pw],
    );
    match res {
        Ok(rows) if rows.len() > 0 => {
            let id: i32 = rows.get(0).get(0);
            cookies.add_private(Cookie::new("user_id", format!("{}", id)));

            let mut res = Response::new();
            res.set_status(rocket::http::Status::new(204, "login successful"));
            Ok(res)
        }
        _ => {
            let mut res = Response::new();
            res.set_status(rocket::http::Status::new(400, "name already used"));
            Ok(res)
        }
    }
}

#[derive(Serialize)]
pub struct ScoreResponse {
    score: i32,
}

#[get("/")]
pub fn get_score(
	user_id: UserId,
	con: MainDbCon,
) -> Result<Json<ScoreResponse>, Box<dyn std::error::Error>> {
	let row = con.0.execute("SELECT score FROM Person WHERE id = $1", &[&user_id.0],
	)?;
	
	let res = ScoreResponse {
		score: row.get(0),
	};
	Ok(Json(res))
}