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
		.project({ title: 1, plot: 1, poster: 1, _id: 1 })
		.toArray();
}

export async function findMoviesByLanguage(language, page, pageSize) {
	const db = getDb();
	const skip = (page - 1) * pageSize;

	return await db
		.collection("movies")
		.find({ languages: { $in: [language] } })
		.skip(skip)
		.limit(pageSize)
		.toArray();
}
