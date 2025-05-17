class CustomError extends Error {
	constructor(message, statusCode = 500, errorCode = "INTERNAL_SERVER_ERROR") {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

class ValidationError extends CustomError {
	constructor(message) {
		super(message, 400, "VALIDATION_ERROR");
	}
}

class AuthenticationError extends CustomError {
	constructor(message) {
		super(message, 401, "AUTHENTICATION_ERROR");
	}
}

class AuthorizationError extends CustomError {
	constructor(message) {
		super(message, 403, "AUTHORIZATION_ERROR");
	}
}

class NotFoundError extends CustomError {
	constructor(message) {
		super(message, 404, "NOT_FOUND");
	}
}

class ConflictError extends CustomError {
	constructor(message) {
		super(message, 409, "CONFLICT");
	}
}

class DatabaseError extends CustomError {
	constructor(message) {
		super(message, 500, "DATABASE_ERROR");
	}
}

export {
	CustomError,
	ValidationError,
	AuthenticationError,
	AuthorizationError,
	NotFoundError,
	ConflictError,
	DatabaseError,
};
