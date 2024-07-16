use actix_web::{delete, get, post, put, web, HttpResponse, Responder};
use crate::{models::todo::Todo, repository::database::Database};

#[get("/todos")]
pub async fn get_todos(db: web::Data<Database>) -> impl Responder {
    let todos = db.get_todos();

    HttpResponse::Ok().json(todos)
}

#[get("/todos/{id}")]
pub async fn get_todo_by_id(db: web::Data<Database>, id: web::Path<String>) -> impl Responder {
    let todo = db.get_todo_by_id(&id);

    match todo {
        Some(todo) => HttpResponse::Ok().json(todo),
        None => HttpResponse::NotFound().body("Todo not found"),
    }
}

#[post("/todos")]
pub async fn create_todo(db: web::Data<Database>, new_todo: web::Json<Todo>) -> impl Responder {
    println!("Received todo: {:?}", new_todo);
    let todo = db.create_todo(new_todo.into_inner());

    match todo {
        Ok(todo) => HttpResponse::Ok().json(todo),
        Err(err) => HttpResponse::InternalServerError().body(err.to_string()),
    }
}


#[put("/todos/{id}")]
pub async fn update_todo_by_id(db: web::Data<Database>, id: web::Path<String>, updated_todo: web::Json<Todo>) -> impl Responder {
    let todo = db.update_todo_by_id(&id, updated_todo.into_inner());

    match todo {
        Some(todo) => HttpResponse::Ok().json(todo),
        None => HttpResponse::NotFound().body("Not updated todo"),
    }
}

#[delete("/todos/{id}")]
pub async fn delete_todo_by_id(db: web::Data<Database>, id: web::Path<String>) -> impl Responder {
    let todo = db.delete_todo_by_id(&id);

    match todo {
        Some(todo) => HttpResponse::Ok().json(todo),
        None => HttpResponse::NotFound().body("Not deleted todo"),
    }
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .service(create_todo)
            .service(get_todos)
            .service(get_todo_by_id)
            .service(update_todo_by_id)
            .service(delete_todo_by_id),
    );
}
