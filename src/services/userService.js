import {
	findAllUsers,
	findUserById,
	saveUser,
	findUserByEmail,
} from "../data/userData.js";
import { findCommentsByUserEmail } from "../data/commentData.js";
import { findMovieById } from "../data/movieData.js";
import { NotFoundError, ConflictError } from "../utils/customError.js";
import bcrypt from "bcrypt";

export const getUsers = async () => {
	try {
		return await findAllUsers();
	} catch (error) {
		throw error;
	}
};

export const getUserById = async (id) => {
	try {
		const user = await findUserById(id);
		if (!user) {
			throw new NotFoundError("Usuario no encontrado");
		}

		return user;
	} catch (error) {
		throw error;
	}
};

export const registerUser = async ({ username, email, password }) => {
	try {
		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			throw new ConflictError("El email ya está registrado");
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		return await saveUser({ username, email, password: hashedPassword });
	} catch (error) {
		throw error;
	}
};

export const loginUser = async ({ email, password }) => {
	try {
		const user = await findUserByEmail(email);
		if (!user) {
			throw new NotFoundError("Email o contraseña incorrectos");
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new NotFoundError("Email o contraseña incorrectos");
		}

		return user;
	} catch (error) {
		throw error;
	}
};

const addMovieInfoToComments = async (comments) => {
	return Promise.all(
		comments.map(async (comment) => {
			const movie = await findMovieById(comment.movie_id.toString());

			if (movie !== null) {
				return {
					...comment,
					movie_title: movie.title || "No title",
					movie_poster: movie.poster || "No poster",
				};
			}
		})
	);
};

export const getUserCommentsByUserId = async (id) => {
	try {
		const user = await findUserById(id);
		if (!user) throw new NotFoundError("Usuario no encontrado");

		const comments = await findCommentsByUserEmail(user.email);
		if (comments.length === 0)
			throw new NotFoundError(
				"No se encontraron comentarios para este usuario"
			);

		const commentsWithMovieInfo = await addMovieInfoToComments(comments);

		return commentsWithMovieInfo;
	} catch (error) {
		throw error;
	}
};
