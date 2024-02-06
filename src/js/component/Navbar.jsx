import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()

	const handleAgenda = () => {
		actions.setSelectedAgenda(null)
		navigate("/")
	}
	return (
		<nav className="navbar navbar-light bg-light mb-3 px-3">
			<button onClick={handleAgenda} className="btn bg-warning">Home</button>
			<div className="ml-auto">
				<Link to="/contact">
					<button className="btn btn-secondary me-2">Contact List</button>
				</Link>
				<Link to="/demo">
					<button className="btn btn-success">Add new contact</button>
				</Link>
			</div >
		</nav >
	);
};
