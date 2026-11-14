const { StatusCodes } = require("http-status-codes");

// Base class for errors that should be sent to the client.
// Each subclass fixes the HTTP status code that goes with it.
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ValidationError extends ApiError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

class AuthError extends ApiError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

module.exports = { ApiError, ValidationError, AuthError, NotFoundError };
