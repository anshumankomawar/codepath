use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use std::fmt;

pub type Result<T> = std::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
    Unauthorized(String),
    RegisterError(String),
    AuthError(String),
    JWTError(jsonwebtoken::errors::Error),
}

impl From<jsonwebtoken::errors::Error> for Error {
    fn from(error: jsonwebtoken::errors::Error) -> Self {
        Error::JWTError(error)
    }
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Error::Unauthorized(msg) => write!(f, "Unauthorized: {}", msg),
            Error::RegisterError(msg) => write!(f, "Register error: {}", msg),
            Error::AuthError(msg) => write!(f, "Authorization error: {}", msg),
            Error::JWTError(e) => write!(f, "JWT error: {}", e),
        }
    }
}

impl IntoResponse for Error {
    fn into_response(self) -> Response {
        tracing::error!("Error: {:?}", self);
        let (status, error_message) = match self {
            Error::Unauthorized(_) => (StatusCode::UNAUTHORIZED, self.to_string()),
            Error::AuthError(_) => (StatusCode::UNAUTHORIZED, self.to_string()),
            Error::RegisterError(_) => (StatusCode::INTERNAL_SERVER_ERROR, self.to_string()),
            Error::JWTError(_) => (StatusCode::UNAUTHORIZED, self.to_string()),
        };
        (status, error_message).into_response()
    }
}
