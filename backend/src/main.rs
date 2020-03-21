#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;

use rocket_contrib::databases::postgres;

mod account;
mod challenge;

#[database("main_db")]
pub struct MainDbCon(postgres::Connection);

#[get("/")]
fn index() -> &'static str {
    "Test"
}

fn main() {
    rocket::ignite()
        .mount("/rest/", routes![index])
        .mount(
            "/rest/account",
            routes![account::login, account::logout, account::create],
        )
        .mount(
            "/rest/challenges",
            routes![challenge::get_challenge, challenge::upload_result],
        )
        .attach(MainDbCon::fairing())
        .launch();
}
