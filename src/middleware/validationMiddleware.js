import { ValidationError } from "../utils/customError.js";

export const validatePagination = (req, res, next) => {
	const { page, pageSize } = req.query;

	if (page !== undefined || pageSize !== undefined) {
		const pageNum = parseInt(page);
		const pageSizeNum = parseInt(pageSize);

		if (!pageNum || !pageSizeNum || pageNum < 1 || pageSizeNum < 1) {
			throw new ValidationError(
				"Invalid pagination parameters. Page and pageSize must be positive numbers"
			);
		}

		req.query.page = pageNum;
		req.query.pageSize = pageSizeNum;
	}

	next();
};

export const validateEmail = (req, res, next) => {
	const { email } = req.body;

	if (!email) {
		throw new ValidationError("Email is required");
	}

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!emailRegex.test(email)) {
		throw new ValidationError("Invalid email format");
	}

	next();
};

export const validatePassword = (req, res, next) => {
	const { password } = req.body;

	if (!password) {
		throw new ValidationError("Password is required");
	}

	next();
};

export const validateLoginCredentials = [validateEmail, validatePassword];
