/** @format */

import express from "express";
import UserModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

//--------- User Login---------------------------------------

router.post("/user", async (req, res) => {
	try {
		console.log(req.body);
		const { name, password } = req.body;
		UserModel.findOne({ name: name }, (err, user) => {
			if (user) {
				if (password === user.password) {
					const payload = {
						user: {
							id: user.id,
						},
					};
					jwt.sign(
						payload,
						"jwt",
						{
							expiresIn: 360000,
						},
						(err, token) => {
							res.json({ token });
						}
					);
				} else {
					res.send({ message: "Password didn't match" });
				}
			} else {
				res.send({ message: "User not registered" });
			}
		});
	} catch (error) {
		console.log(error);
	}
});
export default router;
