// CustomErrors.js
 
class BaseError extends Error {
    constructor(name, message, statusCode) {
      super(message);
      this.name = name;
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  class ValidationError extends BaseError {
    constructor(message) {
      super('ValidationError', message, 400);
    }
  }
  class DatabaseError extends BaseError {
    constructor(message) {
      super('DatabaseError', message, 500);
    }
  }
  class NotFoundError extends BaseError {
    constructor(message) {
      super('NotFoundError', message, 404);
    }
  }
  class UnauthorizedError extends BaseError {
    constructor(message) {
      super('UnauthorizedError', message, 401);
    }
  }
  class ConflictError extends BaseError {
    constructor(message) {
      super('ConflictError', message, 409);
    }
  }
  class ForbiddenError extends BaseError {
    constructor(message) {
      super('ForbiddenError', message, 403);
    }
  }
  class BadRequestError extends BaseError {
    constructor(message) {
      super('BadRequestError', message, 400);
    }
  }
 
  class InternalServerError extends BaseError {
    constructor(message) {
      super('InternalServerError', message, 500);
    }
  }
  module.exports = {
    BaseError,
    ValidationError,
    DatabaseError,
    NotFoundError,
    UnauthorizedError,
    ConflictError,
    ForbiddenError,
    BadRequestError,
    InternalServerError,
  };
