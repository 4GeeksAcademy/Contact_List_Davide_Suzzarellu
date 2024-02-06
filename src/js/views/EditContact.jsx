import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const EditContact = () => {
	const { store, actions } = useContext(Context);
	const { selectedAgenda } = store;
	const { selectedContact } = store;
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		full_name: "",
		address: "",
		phone: "",
		email: ""
	});

	const handleChange = (e) => setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));


	const handleSubmit = (event) => {
		event.preventDefault();
		putContact(selectedContact.id);
		setInputs({
			full_name: "",
			address: "",
			phone: "",
			email: ""
		});
		navigate("/contact")
	};

	const putContact = async (id) => {
		const url = `https://playground.4geeks.com/apis/fake/contact/${id}`;
		const currentContact = store.users.find(user => user.id === id);

		const options = {
			method: "PUT",
			body: JSON.stringify({
				full_name: inputs.full_name || currentContact.full_name,
				email: inputs.email || currentContact.email,
				agenda_slug: selectedAgenda,
				address: inputs.address || currentContact.address,
				phone: inputs.phone || currentContact.phone
			}),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(url, options);
		if (!response.ok) {
			return response.status;
		}

		const updatedContact = { ...currentContact, ...inputs };
		actions.setSelectedContact(updatedContact);
		actions.getContact(selectedAgenda);
	};

	return (
		<div className="row d-flex flex-column justify-content-top align-items-center p-4 vh-100 mb-0">
			<h1 className="col-auto p-3">Edit Contact:</h1>
			<form onSubmit={handleSubmit} id="editForm" className="d-flex flex-column col-8 gap-2 col-3 border p-3">
				<label className="form-label">Full Name:
					<input onChange={handleChange} name="full_name" type="text" className="form-control" placeholder={!selectedContact.full_name ? "Full Name:" : selectedContact.full_name}></input>
				</label>

				<label className="form-label">Email:
					<input onChange={handleChange} name="email" type="text" className="form-control" placeholder={selectedContact ? selectedContact.email : "Email"}></input>
				</label>

				<label className="form-label">Phone:
					<input onChange={handleChange} type="tel" name="phone" className="form-control" placeholder={selectedContact ? selectedContact.phone : "Phone"}></input>
				</label>

				<label className="form-label">Address:
					<input onChange={handleChange} name="address" type="text" className="form-control" placeholder={selectedContact ? selectedContact.address : "Address"}></input>
				</label>
				<footer className="d-flex flex-row gap-2 justify-content-end">
					<button onClick={handleSubmit} className="btn btn-primary me-2">Change</button>
					<Link to="/contact">
						<button className="btn btn-danger">Back</button>
					</Link>
				</footer>
			</form>
		</div>
	)
}
