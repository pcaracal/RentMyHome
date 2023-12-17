mod routes;

#[macro_use]
extern crate rocket;


#[launch]
fn rocket() -> _ {
    let cors = rocket_cors::CorsOptions::default()
        .allowed_origins(rocket_cors::AllowedOrigins::all())
        .allow_credentials(true)
        .to_cors().unwrap();

    rocket::build().attach(cors).mount("/", routes![routes::get_rooms])
}