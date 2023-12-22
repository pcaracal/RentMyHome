use rocket::serde::json::Json;
use rocket_http::Status;
use backend::models::{Booking, BookingExtras, Room, User};
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
pub fn post_booking(room_id: i32, token: Token, booking: Json<Booking>) -> (Status, Option<Json<Booking>>) {
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
        Ok(_) => return (Status::Conflict, None),
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

    (Status::Ok, Option::from(Json(results)))
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

#[post("/api/booking_extras", data = "<booking_extras>")]
pub fn post_booking_extras(token: Token, booking_extras: Json<BookingExtras>) -> (Status, Option<Json<String>>) {
    let mut connection = backend::establish_connection();

    let user_id = auth::decode_token(token.0);

    let new_booking_extras = BookingExtras {
        id: None,
        booking_id: booking_extras.booking_id.clone(),
        user_id,
        stripe_token_id: booking_extras.stripe_token_id.clone(),
        payment_amount: booking_extras.payment_amount.clone(),
        has_bedsheets: booking_extras.has_bedsheets.clone(),
        has_towels: booking_extras.has_towels.clone(),
        has_cleaning: booking_extras.has_cleaning.clone(),
        has_breakfast: booking_extras.has_breakfast.clone(),
        has_lunch: booking_extras.has_lunch.clone(),
        has_dinner: booking_extras.has_dinner.clone(),
        has_parking: booking_extras.has_parking.clone(),
        has_wifi: booking_extras.has_wifi.clone(),
        has_safe: booking_extras.has_safe.clone(),
    };

    match schema::booking_extras::table
        .filter(schema::booking_extras::booking_id.eq(booking_extras.booking_id.clone()))
        .filter(schema::booking_extras::user_id.eq(user_id))
        .first::<BookingExtras>(&mut connection) {
        Ok(_) => return (Status::Conflict, Option::from(Json(String::from("Booking extras already exists")))),
        Err(_) => (),
    };

    diesel::insert_into(schema::booking_extras::table)
        .values(&new_booking_extras)
        .execute(&mut connection)
        .expect("Error saving new booking extras");

    let results = schema::booking_extras::table
        .order(schema::booking_extras::id.desc())
        .first::<BookingExtras>(&mut connection)
        .expect("Error loading booking extras");

    (Status::Ok, Option::from(Json(String::from("Booking extras created"))))
}

#[get("/api/booking_extras/<booking_id>")]
pub fn get_booking_extras(booking_id: i32, token: Token) -> (Status, Option<Json<Vec<BookingExtras>>>) {
    let mut connection = backend::establish_connection();

    let user_id = auth::decode_token(token.0);

    let booking_extras = match schema::booking_extras::table
        .filter(schema::booking_extras::booking_id.eq(booking_id))
        .filter(schema::booking_extras::user_id.eq(user_id))
        .load::<BookingExtras>(&mut connection) {
        Ok(booking_extras) => (Status::Ok, Some(Json(booking_extras))),
        Err(_) => return (Status::InternalServerError, None),
    };

    booking_extras
}