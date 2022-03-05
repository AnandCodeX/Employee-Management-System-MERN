/** @format */

import mongoose from "mongoose";

// Defining Schema
const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	password: { type: String, required: true },
});

// Model
const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
