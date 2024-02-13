import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const Contact = () => {
    const { store, actions } = useContext(Context);
    const { selectedAgenda } = store;
    const setSelectedAgenda = actions.setSelectedAgenda;
    const setSelectedContact = actions.setSelectedContact;
    const navigate = useNavigate()

    const handleAgendaClick = (agenda) => {
        actions.getContact(agenda);
        setSelectedAgenda(agenda);
    };

    const handleDeleteContact = (id) => {
        actions.deleteContact(id);
    }

    const handleDeleteAllContact = (agenda) => {
        if (selectedAgenda) {
            actions.deleteAllContact(agenda);
            setSelectedAgenda("");
        }
    }

    const handleEditContact = (contact) => {
        setSelectedContact(contact)
        navigate("/edit")
    }

    return (
        <main className="container d-flex flex-column align-items-center min-vh-100 mb-2 gap-4">
            <section className="row">
                <div className="dropdown d-flex flex-column align-items-center">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Seleccionar Agenda
                    </button>
                    <h3 className="mt-3">{selectedAgenda ? `Esta es la agenda: ${selectedAgenda}` : ""}</h3>
                    <button onClick={() => handleDeleteAllContact(selectedAgenda)} className={`btn btn-danger mt-2 ${!selectedAgenda ? "d-none" : ""}`}>Cancela todos los contactos</button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        {store.agendas.map((agenda, index) => (
                            <li onClick={() => handleAgendaClick(agenda)} key={index} className="dropdown-item">{agenda}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="row d-flex align-items-center">
                <ul className="list-group d-flex justify-content-center mx-1">
                    {store.users.map((user) => (
                        <li key={user.id} className={`${selectedAgenda ? "list-group-item border" : "d-none"}`}>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-md-8">
                                    <h3>{user.full_name}</h3>

                                    <div className="d-flex flex-row align-items-center mb-2">
                                        <i className="fa-solid fa-location-dot me-2"></i>
                                        <p className="mb-0">{user.address}</p>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-2">
                                        <i className="fa-solid fa-phone me-2"></i>
                                        <p className="mb-0">{user.phone}</p>
                                    </div>

                                    <div className="d-flex flex-row align-items-center">
                                        <i className="fa-solid fa-envelope me-2"></i>
                                        <p className="mb-0">{user.email}</p>
                                    </div>
                                </div>

                                <div className="col-md-4 d-flex align-items-center justify-content-end">
                                    <button onClick={() => handleEditContact(user)} className="btn bg-white">
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button className="btn bg-white" onClick={() => handleDeleteContact(user.id)}>
                                        <i className="text-danger fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

        </main>
    );
};

