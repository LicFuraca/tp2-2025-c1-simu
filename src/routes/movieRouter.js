import express from "express";
import {
	getAllMovies,
	getMovie,
	getMoviesWithAwardsController,
} from "../controllers/movieController.js";
import { validatePagination } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", validatePagination, getAllMovies);
router.get("/awards", getMoviesWithAwardsController);
router.get("/:id", getMovie);

export default router;
