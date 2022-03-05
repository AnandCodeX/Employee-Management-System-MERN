/** @format */

import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

const connectDB = async () => {
	try {
		const DB_OPTIONS = {
			dbName: "user",
		};
		await mongoose.connect(DATABASE_URL, DB_OPTIONS);
		console.log("Connected Successfully..");
	} catch (err) {
		console.log(err);
	}
};

export default connectDB;
