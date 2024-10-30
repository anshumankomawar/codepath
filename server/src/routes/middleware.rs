use crate::error::Error;
use axum::response::Response;
use axum::{extract::Request, middleware::Next};
use reqwest::Client;
use serde::Deserialize;
use tracing::debug;

const AUTHORIZATION: &str = "Authorization";
const BEARER: &str = "Bearer ";

#[derive(Debug, Deserialize, Clone)]
struct GitHubUser {
    id: u64,
    login: String,
    name: Option<String>,
    email: Option<String>,
}

pub async fn jwt_authentication(mut req: Request, next: Next) -> Result<Response, Error> {
    let access_token = req
        .headers()
        .get(AUTHORIZATION)
        .ok_or_else(|| Error::AuthError("No Authorization Header".to_string()))?
        .to_str()
        .map_err(|_| Error::AuthError("Authorization Token Parse Error".to_string()))?
        .trim_start_matches(BEARER);

    let client = Client::new();
    let response = client
        .get("https://api.github.com/user")
        .header("Authorization", format!("token {}", access_token))
        .header("User-Agent", "YourAppName/1.0") // Replace with your actual app name
        .send()
        .await
        .map_err(|e| Error::AuthError(format!("Github request failed with error: {}", e)))?;

    match response.status() {
        reqwest::StatusCode::OK => {
            let user_info = response.json::<GitHubUser>().await.map_err(|e| {
                Error::AuthError(format!("Failed to parse GitHub user info: {}", e))
            })?;
            println!("User info: {:?}", user_info);
            req.extensions_mut().insert(user_info);
            Ok(next.run(req).await)
        }
        reqwest::StatusCode::UNAUTHORIZED => Err(Error::AuthError(
            "GitHub authentication failed: Unauthorized".to_string(),
        )),
        reqwest::StatusCode::FORBIDDEN => Err(Error::AuthError(
            "GitHub authentication failed: Forbidden".to_string(),
        )),
        status => {
            let error_message = response
                .text()
                .await
                .unwrap_or_else(|_| "No error message available".to_string());
            Err(Error::AuthError(format!(
                "GitHub authentication failed with status {}: {}",
                status, error_message
            )))
        }
    }
}
