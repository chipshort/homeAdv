#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;

use rocket_contrib::databases::postgres;

#[database("main_db")]
struct MainDbCon(postgres::Connection);

#[get("/")]
fn index() -> &'static str {
    "Test"
}

fn main() {
    rocket::ignite().mount("/rest/", routes![index]).launch();
}
