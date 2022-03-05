/** @format */

import React, { useState, useEffect } from "react";
import "../css/Pages.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const ViewEmployee = () => {
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
				<form id='employee__form'>
					<h1 id='employee__form-title'>Employee Details</h1>
					<input
						className='inpute'
						placeholder='Enter Employee Name'
						name='name'
						value={name}
						null=''
						onChange={onChange}
						required
						disabled
					/>
					<input
						className='inpute'
						placeholder='Enter Address'
						name='address'
						value={address}
						null=''
						onChange={onChange}
						required
						disabled
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
						disabled
					/>
					<input
						className='inpute'
						placeholder='Enter Mobile Number'
						name='number'
						value={number}
						null=''
						onChange={onChange}
						required
						disabled
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
						disabled
					/>
					<input
						className='inpute'
						placeholder='Enter Salary'
						name='salary'
						value={salary}
						null=''
						onChange={onChange}
						required
						disabled
					/>
					<select
						className='inpute'
						name='job'
						id='job'
						value={job}
						onChange={onChange}
						null=''
						disabled>
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
						disabled
					/>
				</form>
				<ToastContainer theme='colored' />
			</div>
		</div>
	);
};

export default ViewEmployee;
