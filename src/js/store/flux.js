const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{ title: "FIRST", background: "white", initial: "white" },
				{ title: "SECOND", background: "white", initial: "white" }
			],
			agendas: [],
			users: [],
			selectedAgenda: null,
			selectedContact: null,

		},

		actions: {

			getAgendas: async () => {
				const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda")
				if (!response.ok) return response.status
				const data = await response.json()
				setStore({ agendas: data })
			},

			getContact: async (user) => {
				const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${user}`)
				if (!response.ok) return response.status
				const data = await response.json()
				setStore({ users: data })
			},

			deleteContact: async (id) => {
				const url = `https://playground.4geeks.com/apis/fake/contact/${id}`
				const options = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
				const response = await fetch(url, options)
				if (!response.ok) {
					return response.status
				}
				const { users } = getStore();
				const updatedUsers = users.filter((user) => user.id !== id);
				setStore({ users: updatedUsers });
			},

			deleteAllContact: async (agenda) => {
				const url = `https://playground.4geeks.com/apis/fake/contact/agenda/${agenda}`
				const options = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
				const response = await fetch(url, options)
				if (!response.ok) {
					return response.status
				}
				const { users } = getStore();
				const updatedUsers = users.filter((user) => user.agenda_slug !== agenda);
				setStore({ users: updatedUsers });
			},

			setSelectedAgenda: (agenda) => {
				setStore({ selectedAgenda: agenda });
			},

			setSelectedContact: (contact) => {
				setStore({ selectedContact: contact });
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
