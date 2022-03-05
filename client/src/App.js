/** @format */

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeForm from "./components/pages/EmployeeForm";
import Login from "./components/pages/Login";
import AdminDashboard from "./components/pages/AdminDashboard";
import Editemployee from "./components/pages/Editemployee";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewEmployee from "./components/pages/ViewEmployee";

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route exact path='/' element={<Login />} />
					<Route exact path='/admin' element={<AdminDashboard />} />
					<Route exact path='/admin/employeeform' element={<EmployeeForm />} />
					<Route
						exact
						path='/admin/editemployee/:id'
						element={<Editemployee />}
					/>
					<Route
						exact
						path='/admin/viewemployee/:id'
						element={<ViewEmployee />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
