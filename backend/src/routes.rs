use rocket::serde::json::Json;
use rocket_http::Status;
use backend::models::Room;
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