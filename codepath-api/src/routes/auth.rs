use axum::{extract::State, Json};
use axum_extra::extract::{cookie::Cookie, CookieJar};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

use crate::context::Context;
use crate::error::Result;
use crate::models::user::User;

pub async fn logout(jar: CookieJar) -> Result<CookieJar> {
    tracing::info!("HANDLER -> {:<12}", "/logout");
    Ok(jar
        .remove(Cookie::from("Authorization"))
        .remove(Cookie::from("Session")))
}

#[derive(Deserialize)]
pub struct RegisterRequest {
    pub username: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct RegisterResponse {
    pub jwt: String,
}

pub async fn register(
    State(Context {}): State<Context>,
    payload: Json<RegisterRequest>,
) -> Result<Json<Value>> {
    tracing::info!("HANDLER -> {:<12}", "/register");

    // you can pass in db ref here if you add it to context
    let jwt = User::register(&payload.username, &payload.password).await?;
    Ok(Json(json!(RegisterResponse { jwt })))
}
