use rocket::http::{Cookie, Cookies};
use rocket::response::Response;
use rocket_contrib::json::Json;

#[derive(Deserialize)]
pub struct LoginRequest {
    username: String,
    password: String,
}

#[post("/login", data = "<request>")]
pub fn login(request: Json<LoginRequest>, mut cookies: Cookies) -> Response {
    let uid = 1;
    cookies.add_private(Cookie::new("user_id", format!("{}", uid)));

    let mut res = Response::new();
    res.set_status(rocket::http::Status::new(204, "login successful"));
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

pub struct UserId(pub u32);

impl FromStr for UserId {
    type Err = <u32 as FromStr>::Err;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        u32::from_str(s).map(UserId)
    }
}

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
pub fn create(request: Json<AccountCreationRequest>, mut cookies: Cookies) -> Response {
    let uid = 1;
    cookies.add_private(Cookie::new("user_id", format!("{}", uid)));

    let mut res = Response::new();
    res.set_status(rocket::http::Status::new(204, "login successful"));
    res
}
