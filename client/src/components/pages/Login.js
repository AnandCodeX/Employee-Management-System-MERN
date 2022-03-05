/** @format */

import { useState, React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Pages.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
	function auth() {
		const token = localStorage.getItem("token");
		if (token) {
			localStorage.removeItem("token");
		}
	}

	const [datas, setdsata] = useState({});

	const navigate = useNavigate();
	const [loginDetails, setloginDetails] = useState({
		name: "",
		password: "",
	});

	const { name, password } = loginDetails;

	function onChange(event) {
		setloginDetails({
			...loginDetails,
			[event.target.name]: event.target.value,
		});
	}

	const loginUser = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const result = await axios.post(
				"http://localhost:3001/user",
				loginDetails,
				config
			);

			setdsata(result.data.token);

			if (result.data.token) {
				toast.success("Login Successfull");
				setTimeout(() => {
					if (result.data.token) {
						localStorage.removeItem("token");
						localStorage.setItem("token", result.data.token);
					}

					navigate("/admin");
				}, 2000);
			} else if (result.data.message === "Password didn't match") {
				toast.warn("Password didn't match");
			} else if (result.data.message === "User not registered") {
				toast.error("User not registered");
			}
		} catch (error) {
			throw error;
		}
	};

	function login(e) {
		e.preventDefault();
		loginUser();
		console.log(datas);
	}
	useEffect(() => {
		auth();
	}, []);
	return (
		<div className='page ' id='login_page'>
			<div id='login_form'>
				<h1 id='login_heading'>Login </h1>
				<input
					className='input'
					name='name'
					value={name}
					placeholder='Enter Username'
					type='text'
					onChange={onChange}
				/>
				<br />
				<input
					className='input'
					name='password'
					value={password}
					placeholder='Enter Password'
					type='password'
					onChange={onChange}
				/>
				<br />
				<button className='button' onClick={login}>
					Submit
				</button>
				<ToastContainer theme='colored' />
			</div>
		</div>
	);
};

export default Login;
