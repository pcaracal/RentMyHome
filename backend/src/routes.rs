use rocket::serde::json::Json;
use rocket_http::Status;
use backend::models::{Booking, Room, User};
use diesel::prelude::*;
use backend::{auth, schema};
use backend::auth::Token;

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

#[post("/api/bookings/<room_id>", data = "<booking>")]
pub fn post_booking(room_id: i32, token: Token, booking: Json<Booking>) -> (Status, Option<Json<String>>) {
    let mut connection = backend::establish_connection();

    let user_id = auth::decode_token(token.0);

    let new_booking = Booking {
        id: None,
        start_date: booking.start_date.clone(),
        end_date: booking.end_date.clone(),
        room_id,
        user_id,
    };

    match schema::booking::table
        .filter(schema::booking::room_id.eq(room_id))
        .filter(schema::booking::start_date.eq(&booking.start_date))
        .filter(schema::booking::end_date.eq(&booking.end_date))
        .first::<Booking>(&mut connection) {
        Ok(_) => return (Status::Conflict, Option::from(Json(String::from("Booking already exists")))),
        Err(_) => (),
    };

    diesel::insert_into(schema::booking::table)
        .values(&new_booking)
        .execute(&mut connection)
        .expect("Error saving new booking");

    let results = schema::booking::table
        .order(schema::booking::id.desc())
        .first::<Booking>(&mut connection)
        .expect("Error loading bookings");

    (Status::Ok, Option::from(Json(String::from("Booking created"))))
}

#[get("/api/verify")]
pub fn get_verify(token: Token) -> (Status, Option<Json<String>>) {
    let mut connection = backend::establish_connection();

    let user_id = auth::decode_token(token.0);

    let results = match schema::user::table
        .filter(schema::user::id.eq(user_id))
        .first::<User>(&mut connection) {
        Ok(results) => results,
        Err(_) => return (Status::Unauthorized, None),
    };

    (Status::Ok, Option::from(Json(results.username)))
}
