import { getDb } from "./connection.js";

export const findCommentsByUserEmail = async (userEmail) => {
	const db = getDb();
	return await db.collection("comments").find({ email: userEmail }).toArray();
};

export const findAllComments = async () => {
	const db = getDb();
	return await db.collection("comments").find().toArray();
};
