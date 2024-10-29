use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};

use crate::error::{Error, Result};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    pub username: String,
    pub exp: usize,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub username: String,
    pub password: String,
}

impl User {
    pub async fn register(username: &str, password: &str) -> Result<String> {
        //let results = db
        //.query()
        //.table_name("filesystem")
        //.key_condition_expression("userId = :uid AND resourceId = :rtype")
        //.expression_attribute_values(":uid", AttributeValue::S(username.to_string()))
        //.expression_attribute_values(":rid", AttributeValue::S("metadata".to_string()))
        //.send()
        //.await
        //.unwrap();

        //if results.items.is_some_and(|x| !x.is_empty()) {
        //return Err(Error::RegisterError("User already exists".to_string()));
        //}

        //let user_av = AttributeValue::S(username.to_string());
        //let password_av = AttributeValue::S(password.to_string());
        //let resource_av = AttributeValue::S("metadata".to_string());

        //let request = db
        //.put_item()
        //.table_name("filesystem")
        //.item("userId", user_av)
        //.item("password", password_av)
        //.item("resourceType#resourceId", resource_av);

        //match request.send().await {
        //Ok(_) => {
        //let claims = Claims {
        //username: String::from(username),
        //exp: (chrono::Utc::now() + chrono::Duration::hours(24)).timestamp() as usize,
        //};

        //let secret = "secret".as_bytes();
        //let key = EncodingKey::from_secret(secret);

        //let token = encode(&Header::default(), &claims, &key)?;
        //Ok(token)
        //}
        //Err(e) => Err(Error::RegisterError(e.to_string())),
        //}
        Ok("register".to_string())
    }
}
