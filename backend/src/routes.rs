use rocket::serde::json::Json;
use rocket_http::Status;
use backend::models::{Booking, Room};
use serde_json::json;
use diesel::prelude::*;
use backend::schema;

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