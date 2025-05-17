import express from "express";
import { getAllMovies, getMovie } from "../controllers/movieController.js";
import { validatePagination } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", validatePagination, getAllMovies);
router.get("/:id", getMovie);

export default router;
