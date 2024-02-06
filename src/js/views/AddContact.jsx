import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const { selectedAgenda } = store;
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		name: "",
		address: "",
		phone: "",
		email: "",
		agenda: ""
	});

	const handleChange = (e) => setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

	const handleSubmit = async (event) => {
		event.preventDefault();
		await postContact();
		setInputs({
			name: "",
			address: "",
			phone: "",
			email: "",
			agenda: ""
		});
		navigate("/contact")
	};

	const postContact = async () => {
		const url = "https://playground.4geeks.com/apis/fake/contact/";
		const options = {
			method: "POST",
			body: JSON.stringify({
				full_name: inputs.name,
				email: inputs.email,
				agenda_slug: selectedAgenda !== null ? selectedAgenda : inputs.agenda,
				address: inputs.address,
				phone: inputs.phone
			}),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(url, options);
		if (!response.ok) {
			return response.status
		}
		actions.getAgendas()
		actions.getContact(selectedAgenda);
	};

	return (
		<div className="row d-flex flex-column justify-content-top align-items-center p-4 vh-100 mb-0">
			<h1 className="col-auto p-3">Add new contact:</h1>
			<form onSubmit={handleSubmit} id="form" className="d-flex flex-column col-8 gap-2 col-3 border p-3">
				<label className="form-label">Full Name:
					<input name="name" type="text" value={inputs.name || ""} onChange={handleChange} className="form-control" placeholder="Full Name:"></input>
				</label>

				<label className="form-label">Email:
					<input name="email" type="text" value={inputs.email || ""} onChange={handleChange} className="form-control" placeholder="Email:"></input>
				</label>

				<label className="form-label">Phone:
					<input name="phone" type="tel" className="form-control" value={inputs.phone || ""} onChange={handleChange} placeholder="Phone:"></input>
				</label>

				<label className="form-label">Address:
					<input name="address" type="text" value={inputs.address || ""} onChange={handleChange} className="form-control" placeholder="Address:"></input>
				</label>

				<label className="form-label">Agenda asignada:
					<input name="agenda" type="text" value={inputs.agenda} onChange={handleChange} className="form-control" placeholder={!selectedAgenda ? "No hay ninguna agenda asignada, crea una" : selectedAgenda} disabled={selectedAgenda} />
				</label>

				<footer className="d-flex flex-row gap-2 justify-content-end">
					<button onClick={handleSubmit} className="btn btn-primary">Save</button>
					<Link to="/contact">
						<button className="btn btn-danger">Back</button>
					</Link>
				</footer>
			</form>
		</div>
	);
};
