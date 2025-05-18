import express from "express";
import {
	getAllMovies,
	getMovie,
	getMoviesWithAwardsController,
	getMoviesByLanguageController,
	getMoviesOrderedByFreshController,
} from "../controllers/movieController.js";
import { validatePagination } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", validatePagination, getAllMovies);
router.get("/awards", getMoviesWithAwardsController);
router.get("/languages", validatePagination, getMoviesByLanguageController);
router.get("/fresh", getMoviesOrderedByFreshController);
router.get("/:id", getMovie);

export default router;
