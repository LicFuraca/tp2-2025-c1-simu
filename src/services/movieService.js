import { findAllMovies, findMovieById } from "../data/movieData.js";
import { NotFoundError, DatabaseError } from "../utils/customError.js";

export const getMovies = async (page, pageSize) => {
	try {
		return await findAllMovies(page, pageSize);
	} catch (error) {
		throw new DatabaseError(
			"An unexpected error occurred while fetching movies",
			500,
			"INTERNAL_SERVER_ERROR"
		);
	}
};

export const getMovieById = async (id) => {
	try {
		const movie = await findMovieById(id);
		if (!movie) {
			throw new NotFoundError("Movie not found");
		}

		return movie;
	} catch (error) {
		throw new DatabaseError(
			"An unexpected error occurred while fetching the movie",
			500,
			"INTERNAL_SERVER_ERROR"
		);
	}
};
