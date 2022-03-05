/** @format */

import express from "express";
import EmployeeModel from "../models/employeemodel.js";

const router = express.Router();

/* ----------------Add Employeess------------------------------ */

router.post("/employeeform", async (req, res) => {
	try {
		let { name, address, email, number, jdate, salary, job, password } =
			req.body;
		EmployeeModel.findOne({ email: email }, (error, employee) => {
			if (employee) {
				res.send("Employee is already register");
			} else {
				const employee = new EmployeeModel({
					name,
					address,
					email,
					number,
					jdate,
					salary,
					job,
					password,
				});
				employee.save((err, employee) => {
					if (err) {
						res.send(err);
					} else {
						res.send({
							message: "Successfully Registered.",
							employee,
						});
					}
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
});

/* --------------------Update Employeess------------------------------------- */

router.put("/employee:id", async (req, res) => {
	const { name, address, email, number, jdate, salary, job, password } =
		req.body;

	const contactFields = {};
	if (name) contactFields.name = name;
	if (address) contactFields.address = address;
	if (email) contactFields.email = email;
	if (number) contactFields.number = number;
	if (jdate) contactFields.jdate = jdate;
	if (salary) contactFields.salary = salary;
	if (job) contactFields.job = job;
	if (password) contactFields.password = password;

	try {
		let contact = await EmployeeModel.findById(req.params.id);
		if (!contact) return res.status(404).json({ msg: "Contact not found" });

		contact = await EmployeeModel.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		);
		res.json(contact);
	} catch (error) {
		console.log(error);
	}
});

/* -----------------Get All Employeess---------------------------------- */

router.get("/employeeform", async (req, res) => {
	try {
		const employees = await EmployeeModel.find({}).sort({ date: -1 });
		res.json(employees);
	} catch (error) {
		res.send(error);
	}
});

/* --------------------Get Employee by ID------------------------------ */

router.get("/employee:id", async (req, res) => {
	try {
		const updatedID = await EmployeeModel.findOne({ _id: req.params.id });
		res.send(updatedID);
	} catch (error) {
		res.send(error);
	}
});

router.delete("/employeeform:id", async (req, res) => {
	await EmployeeModel.findById(req.params.id);
	try {
		const deleteemp = await EmployeeModel.findByIdAndRemove(req.params.id);
		res.status(201).send(deleteemp);
	} catch (error) {
		res.status(404).send(error);
	}
});

export default router;
