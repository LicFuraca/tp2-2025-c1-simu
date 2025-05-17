import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";

export async function findAllUsers() {
	const db = getDb();
	return await db.collection("users").find().toArray();
}

export async function findUserById(id) {
	const db = getDb();
	return await db.collection("users").findOne({ _id: new ObjectId(id) });
}

export async function findUserByEmail(email) {
	const db = getDb();
	return await db.collection("users").findOne({ email });
}

export async function saveUser(newUser) {
	const db = getDb();
	await db.collection("users").insertOne(newUser);
}
