import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

export async function findAllMovies(page, pageSize) {
	const db = getDb();
	if (page && pageSize) {
		const skip = (page - 1) * pageSize;

		return await db
			.collection("movies")
			.find()
			.skip(skip)
			.limit(pageSize)
			.toArray();
	} else {
		return await db.collection("movies").find().toArray();
	}
}

export async function findMovieById(id) {
	const db = getDb();
	return await db.collection("movies").findOne({ _id: new ObjectId(id) });
}

export async function findMoviesWithAwards() {
	const db = getDb();
	return await db
		.collection("movies")
		.find({ "awards.wins": { $gt: 0 } })
		.toArray();
}
