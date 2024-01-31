import React from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => (
	<main className="container vh-100">
		<div className="p-5 mb-4 bg-body-tertiary rounded-3 bg-dark">
			<div className="container-fluid py-5 text-white">
				<h1 className="display-5 fw-bold">Agendas de contactos</h1>
				<p className="col-md-8 fs-4">Pressiona el boton para ver los contactos de tu agenda</p>
				<Link to="/contact">
					<button className="btn btn-success me-2">Contact List</button>
				</Link>
			</div>
		</div>
	</main >
);
