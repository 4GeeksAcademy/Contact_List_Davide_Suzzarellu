import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, action } = useContext(Context)
	const { selectedAgenda } = store
	return (
		<nav className="navbar navbar-light bg-light mb-3 px-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Home</span>
			</Link>
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
