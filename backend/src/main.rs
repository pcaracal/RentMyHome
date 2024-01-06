mod routes;

#[macro_use]
extern crate rocket;


#[launch]
fn rocket() -> _ {
    let cors = rocket_cors::CorsOptions::default()
        .allowed_origins(rocket_cors::AllowedOrigins::all())
        .allow_credentials(true)
        .to_cors().unwrap();

    rocket::build().attach(cors).mount("/",
                                       routes![
                                           routes::get_rooms,
                                           routes::get_bookings,
                                           routes::post_register, 
                                           routes::post_login, 
                                           routes::post_booking,
                                           routes::get_verify,
                                           routes::post_booking_extras,
                                           routes::get_booking_extras,
                                           routes::get_user_bookings,
                                       ])
}