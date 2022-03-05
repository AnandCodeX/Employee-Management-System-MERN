/** @format */

import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	address: { type: String, required: true },
	email: { type: String, required: true },
	number: { type: String, required: true },
	jdate: { type: String, required: true },
	salary: { type: String, required: true },
	job: { type: String, required: true },
	password: { type: String, required: true },
});

const EmployeeModel = new mongoose.model("employee", EmployeeSchema);

export default EmployeeModel;
