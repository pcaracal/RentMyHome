mod routes;

#[macro_use]
extern crate rocket;

use rocket::config::{Config, TlsConfig, CipherSuite};


#[launch]
fn rocket() -> _ {
    let cors = rocket_cors::CorsOptions::default()
        .allowed_origins(rocket_cors::AllowedOrigins::all())
        .allowed_headers(rocket_cors::AllowedHeaders::all())
        .allow_credentials(true)
        .to_cors().unwrap();

    let tls_config = TlsConfig::from_paths("cert.pem", "key.pem")
        .with_ciphers(vec![
            CipherSuite::TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
            CipherSuite::TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,
            CipherSuite::TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256,
        ])
        .with_preferred_server_cipher_order(true);

    let config = Config {
        tls: Some(tls_config),
        ..Default::default()
    };

    rocket::custom(config).attach(cors).mount("/",
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