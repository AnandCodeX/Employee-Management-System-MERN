/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Pages.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeForm = () => {
	function auth() {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/");
		}
	}

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

	const submitForm = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			await axios
				.post("http://localhost:3001/employeeform", user, config)
				.then((res) => {
					if (res) {
						if (res.data === "Employee is already register") {
							toast.warn("Employee Already exist");
						} else {
							toast.success("Form Submitted");
							setTimeout(() => {
								navigate("/admin");
							}, 2000);
						}
					}
				});
		} catch (error) {
			toast.error(error);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		submitForm();
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
					type='text'
				/>
				<input
					className='inpute'
					placeholder='Enter Address'
					name='address'
					value={address}
					null=''
					onChange={onChange}
					required
					type='text'
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
					type='number'
				/>
				<input
					className='input'
					type='date'
					placeholder='Enter Birth Date'
					name='jdate'
					value={jdate}
					null=''
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
					type='number'
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
					Submit{" "}
				</button>
			</form>
			<ToastContainer
				theme='colored'
				position='bottom-right'
				autoClose={2000}
			/>
		</div>
	);
};

export default EmployeeForm;
