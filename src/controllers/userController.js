import {
	getUsers,
	getUserById,
	registerUser,
	loginUser,
} from "../services/userService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/jwt.js";

export const getAllUsersController = asyncHandler(async (req, res) => {
	const users = await getUsers();
	res.json(users);
});

export const loginUserController = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await loginUser({ email, password });
	const token = generateToken(user);

	res.json({ message: "Login exitoso", user, token });
});

export const registerUserController = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	await registerUser({ username, email, password });
	res.status(201).json({ message: "Usuario registrado exitosamente" });
});

export const getUserByIdController = asyncHandler(async (req, res) => {
	const user = await getUserById(req.params.id);
	res.json(user);
});
