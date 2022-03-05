/** @format */

import express from "express";
import connectDB from "./db/connectDB.js";
import user from "./routes/user.js";
import employee from "./routes/employee.js";
import cors from "cors";

const server = express();
const port = process.env.PORT || "3001";

//Database Connection
connectDB();

//JSON
server.use(express.json());
server.use(express.urlencoded());
server.use(cors());

//Load Routes
server.use("/", user);
server.use("/", employee);

//Listining PORT
server.listen(port, () => {
	console.log(`Server is Running at http://localhost:${port}`);
});
