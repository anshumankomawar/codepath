use crate::{error::Error, models::user::Claims};
use axum::response::Response;
use axum::{extract::Request, middleware::Next};
use axum_extra::extract::CookieJar;
use jsonwebtoken::{decode, decode_header, DecodingKey};
use tracing::debug;

const AUTHORIZATION: &str = "Authorization";
const BEARER: &str = "Bearer ";

pub async fn jwt_authentication(
    jar: CookieJar,
    mut req: Request,
    next: Next,
) -> Result<Response, Error> {
    debug!("[jwt_authentication]\n");
    if let Some(cookie) = jar.get("Authorization") {
        // code for authorization header using cookie implementation as of now...
        //let authorization_header = match req.headers().get(AUTHORIZATION) {
        //Some(header) => header,
        //None => return Err(Error::AuthError("No Authorization Header".to_string())),
        //};

        //let authorization = match authorization_header.to_str() {
        //Ok(authorization) => authorization,
        //Err(_) => return Err(Error::AuthError("Authoriation Token Parse Error".into())),
        //};

        //if !authorization.starts_with(BEARER) {
        //return Err(Error::AuthError("Authorization Bearer Missing".into()));
        //}

        //let jwt_token = authorization.trim_start_matches(BEARER);

        let jwt_token = cookie.value();
        let token_header = decode_header(&jwt_token)?;

        debug!("token_header: {:#?}", token_header);

        let secret = "secret".as_bytes();
        let key = DecodingKey::from_secret(secret);

        let validation = jsonwebtoken::Validation::default();

        let token_data = decode::<Claims>(jwt_token, &key, &validation)?;
        let claims = token_data.claims;
        debug!("{:?}", claims);

        req.extensions_mut().insert(claims);

        return Ok(next.run(req).await);
    } else {
        println!("No Authorization Header");
        return Err(Error::AuthError("No Authorization Header".to_string()));
    }
}
