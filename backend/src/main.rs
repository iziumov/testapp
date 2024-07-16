use actix_cors::Cors;
use actix_web::{get, web, App, HttpResponse, HttpServer, Responder, Result};
use serde::{Serialize};

mod api;
mod models;
mod repository;

#[derive(Serialize)]
pub struct Response {
    pub status: String,
    pub message: String
}

#[get("/health")]
async fn healthcheck() -> impl Responder {
    let response = Response {
        status: "200".to_string(),
        message: "Everything goind ok".to_string()
    };

    HttpResponse::Ok().json(response)
}

async fn not_found() -> Result<HttpResponse> {
    let response = Response {
        status: "404".to_string(),
        message: "Not Found".to_string()
    };

    Ok(HttpResponse::NotFound().json(response))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let todo_db = repository::database::Database::new();
    let app_data = web::Data::new(todo_db);

    HttpServer::new(move || 
        App::new()
        .wrap(
            Cors::default() // ?
                .allowed_origin("http://localhost:5173") // ? .allowed_origin()
                .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"]) // ?
                .allowed_headers(vec![actix_web::http::header::CONTENT_TYPE]) // ?
                .max_age(3600), // ?
        )
        .app_data(app_data.clone())
        .configure(api::api::config)
        .service(healthcheck)
        .default_service(web::route().to(not_found))
        .wrap(actix_web::middleware::Logger::default()) // ?
    )
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}