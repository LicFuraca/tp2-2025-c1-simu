import jwt from "jsonwebtoken";

export const generateToken = (user, options = {}) => {
	const payload = {
		_id: user._id,
		username: user.username,
		email: user.email,
	};

	const defaultOptions = { expiresIn: "2h" };
	const tokenOptions = { ...defaultOptions, ...options };

	return jwt.sign(payload, process.env.JWT_SECRET, tokenOptions);
};
