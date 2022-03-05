/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Pages.css";
import { ToastContainer, toast } from "react-toastify";

const AdminDashboard = () => {
	function auth() {
		const token = localStorage.getItem("token");
		if (token) {
			getEmployees();
		} else {
			navigate("/");
		}
	}

	//----------State Management & Initilization

	const [employees, setemployees] = useState([]);
	const navigate = useNavigate();
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	//----------Get Employee-------------------
	const getEmployees = async () => {
		const employees = await axios.get(
			"http://localhost:3001/employeeform",
			config
		);
		await setemployees(employees.data);
	};

	//------------Delete Employee---------------
	const deleteemp = async (id) => {
		await axios.delete(`http://localhost:3001/employeeform${id}`, config);
		getEmployees();
		toast.success("Employee Deleted Successfully!!!");
	};

	//------------Add Employee-------------------

	function employeeform() {
		navigate("/admin/employeeform");
	}
	//------------Edit Employee------------------
	function editemployee(id) {
		navigate(`/admin/editemployee/${id}`);
	}

	//------------View Employee------------------

	function ViewEmployee(id) {
		navigate(`/admin/viewemployee/${id}`);
	}

	//-------------Page Load-------------------
	function geolocation(){
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position);
		});
	}

	
	useEffect(() => {
		geolocation()
		auth();
	}, []);

	return (
		<div className='page'>
			<div id='page__shadow'>
				<h2>Admin Dashboard</h2>
				<div>
					<button
						className='button btn btn-success mr-2 adtemp'
						onClick={() => employeeform()}>
						Add Employee
					</button>
					<button
						className='button btn btn-danger mr-2 '
						onClick={() => navigate("/")}>
						Logout
					</button>
				</div>
			</div>
			<div>
				<div className='shadowbox'>
					{employees.map((emp, index) => (
						<tr className='tablee' id='tt' key={index}>
							<th key={index} scope='col' className='table__index'>
								{index + 1}
							</th>
							<td className='card__col table__index'>{emp.name}</td>
							<td className='card__col table__index'>{emp.email}</td>
							<td className='card__col '>{emp.number}</td>
							<td className='admin__buttons'>
								<button
									className='btn btn-primary mr-2'
									onClick={() => {
										ViewEmployee(emp._id);
									}}>
									View
								</button>
								<button
									className='btn btn-outline-primary mr-2'
									onClick={() => {
										editemployee(emp._id);
									}}>
									Edit
								</button>
								<button
									className='btn btn-danger'
									onClick={() => deleteemp(emp._id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</div>
			</div>
			<ToastContainer
				theme='colored'
				position='bottom-right'
				autoClose={2000}
			/>
		</div>
	);
};

export default AdminDashboard;
