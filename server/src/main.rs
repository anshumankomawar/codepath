mod context;
mod error;
mod models;
mod routes;
mod util;

use context::Context;
use routes::create_routes;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        .init();

    let app = create_routes(Context::new().await);
    let addr = std::net::SocketAddr::from(([0, 0, 0, 0], 4321));
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    tracing::info!("listening on {}", addr);
    axum::serve(listener, app).await.unwrap();
}
