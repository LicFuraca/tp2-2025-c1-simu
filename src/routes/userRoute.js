import express from "express";
import {
	getAllUsersController,
	getUserByIdController,
	registerUserController,
	loginUserController,
} from "../controllers/userController.js";
import {
	validateEmail,
	validatePassword,
	validateLoginCredentials,
} from "../middleware/validationMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post(
	"/register",
	validateEmail,
	validatePassword,
	registerUserController
);

router.post("/login", validateLoginCredentials, loginUserController);
router.get("/", authMiddleware, getAllUsersController);
router.get("/:id", authMiddleware, getUserByIdController);

export default router;
