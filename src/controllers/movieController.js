import {
	getMovies,
	getMovieById,
	getMoviesWithAwards,
} from "../services/movieService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllMovies = asyncHandler(async (req, res) => {
	const page = req.query.page ? parseInt(req.query.page) : undefined;
	const pageSize = req.query.pageSize
		? parseInt(req.query.pageSize)
		: undefined;

	const movies = await getMovies(page, pageSize);
	res.json(movies);
});

export const getMovie = asyncHandler(async (req, res) => {
	const movie = await getMovieById(req.params.id);
	res.json(movie);
});

export const getMoviesWithAwardsController = asyncHandler(async (req, res) => {
	const movies = await getMoviesWithAwards();
	res.json(movies);
});
