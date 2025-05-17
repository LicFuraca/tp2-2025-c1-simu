import { CustomError } from "../utils/customError.js";

export const errorHandler = (err, req, res, next) => {
	console.error("Error:", {
		name: err.name,
		message: err.message,
		stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
	});

	if (err instanceof CustomError) {
		return res.status(err.statusCode).json({
			success: false,
			errorCode: err.errorCode,
			message: err.message,
		});
	}

	if (err.name === "ValidationError") {
		return res.status(400).json({
			success: false,
			errorCode: "VALIDATION_ERROR",
			message: err.message,
		});
	}

	return res.status(500).json({
		success: false,
		errorCode: "INTERNAL_SERVER_ERROR",
		message: "Something went wrong",
	});
};
