use rocket::serde::json::Json;
use rocket_http::Status;
use backend::models::{Booking, Room, User};
use serde_json::json;
use diesel::prelude::*;
use backend::{auth, schema};

#[get("/api/rooms")]
pub fn get_rooms() -> (Status, Option<Json<Vec<Room>>>) {
    let mut connection = backend::establish_connection();

    let rooms = match schema::room::table.load::<Room>(&mut connection) {
        Ok(rooms) => rooms,
        Err(_) => return (Status::InternalServerError, None),
    };

    if rooms.is_empty() {
        return (Status::NotFound, None);
    }
    (Status::Ok, Some(Json(rooms)))
}

#[get("/api/bookings/<room_id>")]
pub fn get_bookings(room_id: i32) -> (Status, Option<Json<Vec<Booking>>>) {
    let mut connection = backend::establish_connection();

    let bookings = match schema::booking::table.filter(schema::booking::room_id.eq(room_id)).load::<Booking>(&mut connection) {
        Ok(bookings) => (Status::Ok, Some(Json(bookings))),
        Err(_) => return (Status::InternalServerError, None),
    };

    bookings
}

#[post("/api/register", data = "<user>")]
pub fn post_register(user: Json<User>) -> (Status, Option<Json<String>>) {
    let mut connection = backend::establish_connection();
    let new_user = User {
        id: None,
        username: user.username.clone(),
        password: auth::hash_password(&user.password),
    };

    match schema::user::table
        .filter(schema::user::username.eq(&user.username))
        .first::<User>(&mut connection) {
        Ok(_) => return (Status::Conflict, Option::from(Json(String::from("User already exists")))),
        Err(_) => (),
    };


    diesel::insert_into(schema::user::table)
        .values(&new_user)
        .execute(&mut connection)
        .expect("Error saving new user");

    let results = schema::user::table
        .order(schema::user::id.desc())
        .first::<User>(&mut connection)
        .expect("Error loading users");

    (Status::Ok, Option::from(Json(auth::encode_token(results.id))))
}

#[post("/api/login", data = "<user>")]
pub fn post_login(user: Json<User>) -> (Status, Option<Json<String>>) {
    let mut connection = backend::establish_connection();

    let results = match schema::user::table
        .filter(schema::user::username.eq(&user.username))
        .first::<User>(&mut connection) {
        Ok(results) => results,
        Err(_) => return (Status::Unauthorized, None),
    };

    if !auth::verify_password(&user.password, &results.password) {
        return (Status::Unauthorized, None);
    }

    (Status::Ok, Option::from(Json(auth::encode_token(results.id))))
}