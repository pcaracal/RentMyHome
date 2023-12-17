use diesel::{AsChangeset, Insertable, Queryable, Selectable};
use rocket::serde::{Deserialize, Serialize};

#[derive(Queryable, Selectable, Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::user)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct User {
    pub id: Option<i32>,
    pub username: String,
    pub password: String,
}

#[derive(Queryable, Selectable, Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::room)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Room {
    pub id: Option<i32>,
    pub name: String,
    pub description: String,
    pub price: i32,
    pub image: String,
}

#[derive(Queryable, Selectable, Insertable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::booking)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Booking {
    pub id: Option<i32>,
    pub start_date: String,
    pub end_date: String,
    pub room_id: i32,
    pub user_id: i32,
}

#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::user)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct UserChangeset {
    pub username: Option<String>,
    pub password: Option<String>,
}

#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::room)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct RoomChangeset {
    pub name: Option<String>,
    pub description: Option<String>,
    pub price: Option<i32>,
    pub image: Option<String>,
}

#[derive(AsChangeset, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::booking)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct BookingChangeset {
    pub start_date: Option<String>,
    pub end_date: Option<String>,
    pub room_id: Option<i32>,
    pub user_id: Option<i32>,
}