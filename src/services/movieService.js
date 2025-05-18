import {
	findAllMovies,
	findMovieById,
	findMoviesWithAwards,
	findMoviesByLanguage,
	findMoviesOrderedByFresh,
} from "../data/movieData.js";
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

export const getMoviesWithAwards = async () => {
	try {
		const movies = await findMoviesWithAwards();
		return movies;
	} catch (error) {
		throw new DatabaseError(
			"An unexpected error occurred while fetching movies with awards",
			500,
			"INTERNAL_SERVER_ERROR"
		);
	}
};

export const getMoviesByLanguage = async (language, page, pageSize) => {
	try {
		if (!language) {
			throw new NotFoundError("Language parameter is required");
		}
		const languageLower = language.toLowerCase();
		const pageInt = parseInt(page);
		const pageSizeInt = parseInt(pageSize);
		const languageCapitalized =
			languageLower.charAt(0).toUpperCase() + languageLower.slice(1);

		const movies = await findMoviesByLanguage(
			languageCapitalized,
			pageInt,
			pageSizeInt
		);
		if (!movies) {
			throw new NotFoundError("No movies found in that language");
		}

		return movies;
	} catch (error) {
		throw error;
	}
};

export const getMoviesOrderedByFresh = async () => {
	try {
		const movies = await findMoviesOrderedByFresh();
		if (!movies) {
			throw new NotFoundError("No movies found");
		}

		return movies;
	} catch (error) {
		throw error;
	}
};
