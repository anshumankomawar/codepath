mod auth;
mod middleware;

use axum::{
    extract::DefaultBodyLimit,
    http::StatusCode,
    middleware::{from_fn, map_response},
    response::{IntoResponse, Response},
    routing::{get, post, Router},
};
use http::{
    header::{AUTHORIZATION, CONTENT_TYPE},
    HeaderValue, Method,
};
use tower_http::cors::CorsLayer;
use tracing::debug;

use crate::context::Context;

pub fn create_routes(ctx: Context) -> Router<()> {
    let cors = CorsLayer::new()
        .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST])
        .allow_credentials(true)
        .allow_headers([CONTENT_TYPE, AUTHORIZATION]);

    let unprotected_routes = Router::new()
        .route("/", get(handler))
        .route("/logout", post(auth::logout))
        .route("/register", post(auth::register));

    let protected_routes = Router::new()
        .route("/test", post(handler_404))
        .layer(map_response(main_response_mapper))
        .route_layer(from_fn(middleware::jwt_authentication));

    Router::new()
        .merge(unprotected_routes)
        .merge(protected_routes)
        .layer(DefaultBodyLimit::max(20 * 1024 * 1024))
        .with_state(ctx)
        .fallback(handler_404)
        .layer(cors)
}

async fn main_response_mapper(res: Response) -> Response {
    debug!("{:<12} [main_response_mapper]\n", "RES_MAPPER");
    res
}

async fn handler_404() -> impl IntoResponse {
    (StatusCode::NOT_FOUND, "nothing to see here")
}

async fn handler() -> &'static str {
    debug!("hello world");
    "pong"
}
