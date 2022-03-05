/** @format */

import React, { useState, useEffect } from "react";
import "../css/Pages.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Editemployee = () => {
	function auth() {
		const token = localStorage.getItem("token");
		if (token) {
			getEmployees();
		} else {
			navigate("/");
		}
	}

	const { id } = useParams();
	let employees = {};
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const navigate = useNavigate();

	const [user, setUser] = useState({
		name: "",
		address: "",
		email: "",
		number: "",
		jdate: "",
		salary: "",
		job: "",
		password: "",
	});

	const { name, address, email, number, jdate, salary, job, password } = user;

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const getEmployees = async () => {
		employees = await axios.get(`http://localhost:3001/employee${id}`, config);
		setUser(employees.data);
	};

	function submitForm() {
		setUser(employees);
		Update();
	}

	//-------------Update Function--------------------
	const Update = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			await axios.put(`http://localhost:3001/employee${id}`, user, config);
			toast.success("Update Successfull");
		} catch (err) {
			throw err;
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		submitForm();
		setTimeout(() => {
			navigate("/admin");
		}, 2000);
	};
	useEffect(() => {
		auth();
	}, []);
	return (
		<div className='page'>
			<div id='page__shadow'>
				<h2>Admin Dashboard</h2>
				<div>
					<button
						className='button btn btn-primary mr-2 temp'
						onClick={() => {
							navigate("/admin");
						}}>
						Home
					</button>
					<button
						className='button btn btn-danger mr-2 temp'
						onClick={() => navigate("/")}>
						Logout
					</button>
				</div>
			</div>
			<div>
				<form id='employee__form' onSubmit={onSubmit}>
					<h1 id='employee__form-title'>Employee Form</h1>
					<input
						className='inpute'
						placeholder='Enter Employee Name'
						name='name'
						value={name}
						null=''
						onChange={onChange}
						required
					/>
					<input
						className='inpute'
						placeholder='Enter Address'
						name='address'
						value={address}
						null=''
						onChange={onChange}
						required
					/>
					<input
						className='inpute'
						placeholder='Enter Email'
						name='email'
						value={email}
						null=''
						onChange={onChange}
						required
						type='email'
					/>
					<input
						className='inpute'
						placeholder='Enter Mobile Number'
						name='number'
						value={number}
						null=''
						onChange={onChange}
						required
					/>
					<input
						className='input'
						type='date'
						placeholder='Enter Birth Date'
						name='jdate'
						value={jdate}
						null=''
						datatype='yyyy-MM-dd'
						onChange={onChange}
						required
					/>
					<input
						className='inpute'
						placeholder='Enter Salary'
						name='salary'
						value={salary}
						null=''
						onChange={onChange}
						required
					/>
					<select
						className='inpute'
						name='job'
						id='job'
						value={job}
						onChange={onChange}
						null=''>
						<option>Associate Software Engineer</option>
						<option>Software Engineer</option>
						<option> Senior Software Engineer</option>
						<option>Marketing Manager</option>
					</select>

					<input
						className='inpute'
						placeholder='Enter Password'
						name='password'
						value={password}
						null=''
						onChange={onChange}
						required
					/>
					<button type='submit' value='Register'>
						Update{" "}
					</button>
				</form>
				<ToastContainer
					theme='colored'
					position='bottom-right'
					autoClose={2000}
				/>
			</div>
		</div>
	);
};

export default Editemployee;
