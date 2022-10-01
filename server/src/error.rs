use hyper::{Body, Response, StatusCode};

pub struct Error {
    status: StatusCode,
    pub message: String,
}

impl Error {
    pub fn new(status: StatusCode, message: impl Into<String>) -> Error {
        Error {
            status,
            message: message.into(),
        }
    }

    pub fn into_response(self) -> Response<Body> {
        let mut response = Response::new(self.message.into());
        *response.status_mut() = self.status;
        response
    }
}

impl From<tokio::io::Error> for Error {
    fn from(src: tokio::io::Error) -> Self {
        Error::new(StatusCode::INTERNAL_SERVER_ERROR, src.to_string())
    }
}

impl From<hyper_tungstenite::tungstenite::error::ProtocolError> for Error {
    fn from(src: hyper_tungstenite::tungstenite::error::ProtocolError) -> Self {
        Error::new(StatusCode::INTERNAL_SERVER_ERROR, src.to_string())
    }
}

impl From<url::ParseError> for Error {
    fn from(src: url::ParseError) -> Self {
        Error::new(StatusCode::INTERNAL_SERVER_ERROR, src.to_string())
    }
}

// impl From<std::num::ParseIntError> for Error {
//     fn from(src: std::num::ParseIntError) -> Self {
//         Error::new(StatusCode::INTERNAL_SERVER_ERROR, src.to_string())
//     }
// }

impl From<rusqlite::Error> for Error {
    fn from(src: rusqlite::Error) -> Self {
        Error::new(StatusCode::INTERNAL_SERVER_ERROR, src.to_string())
    }
}

impl From<serde_qs::Error> for Error {
    fn from(src: serde_qs::Error) -> Self {
        Error::new(StatusCode::INTERNAL_SERVER_ERROR, src.to_string())
    }
}

impl<T> From<std::sync::PoisonError<T>> for Error {
    fn from(src: std::sync::PoisonError<T>) -> Self {
        Error::new(StatusCode::INTERNAL_SERVER_ERROR, src.to_string())
    }
}
