import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			siteName: "Fromtony",
			usuario: {},
			auth: false,
			viajes: [],
		},
		actions: {
							//	Inicio API //
			/* POST */
			postData: async (url, bodyData, headers) => {
				try {
					if (headers != null) {
						const response = await axios.post(url, bodyData, { headers: headers });
						return response;
					}
					const response = await axios.post(url, bodyData);
					return response;
				} catch (error) {
					console.log(error);
					return error;
				}
			},
			/* GET */
			getData: async (url, headers) => {
				try {
					if (headers != null) {
						const response = await axios.get(url, { headers: headers });
						return response;
					}
					const response = await axios.get(url);
					return response;
				} catch (error) {
					console.log(error);
					return error;
				}
			},
			/* PUT */
			putData: async (url, bodyData, headers) => {
				try {
					if (headers != null) {
						const response = await axios.put(url, bodyData, { headers: headers });
						return response;
					}
					const response = await axios.put(url, bodyData);
					return response;
				} catch (error) {
					console.log(error);
					return error;
				}
			},
			/* DELETE */
			deleteData: async (url) => {
				try {
					const response = await axios.delete(url);
					return response;
				} catch (error) {
					console.log(error);
					return error;
				}
			},
							//	Fin API //

			//Inicio Usuarios
			login: async (value) => {
				const action = getActions();
				let response = await action.postData(process.env.BACKEND_URL + "/api/login", value);
				if (!response.hasOwnProperty("code")) {
					localStorage.setItem("token", response.data.access_token);
					setStore({ auth: true });
					setStore({ usuario: response.data.usuario });
					return true;
				} else {
					response = response.response;
					setStore({ auth: false });
					return {message: response.data.message}
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({ auth: false });
			},
			isAuth: async () => {
				const action = getActions();
				let response = await action.getData(process.env.BACKEND_URL + "/api/isauth", { Authorization: "Bearer " + localStorage.getItem("token") });
				if (!response.hasOwnProperty("code")) {
					setStore({ auth: true });
					setStore({ usuario: response.data.usuario });
					return true;
				}
				setStore({ auth: false });
				return false;
			},
			getProfile: async (id) => {
				const action = getActions();
				let response = await action.getData(process.env.BACKEND_URL + "/api/profile/" + id, { Authorization: "Bearer " + localStorage.getItem("token") });
				if (!response.hasOwnProperty("code")) {
					return response.data;
				}
				return response.response;
			},
			//Fin Usuarios

			//Inicio Viajes
			getAllTravels: async () => {
				const action = getActions();
				const response = await action.getData(process.env.BACKEND_URL + "/api/viajes");
				if (!response.hasOwnProperty("code")) {
					setStore({ viajes: response.data });
					return response.data;
				}
				return response.response;
			},
			postTravel: async (value) => {
				console.log(value);
				const action = getActions();
				let response = await action.postData(process.env.BACKEND_URL + "/api/viajes/new", value, { Authorization: "Bearer " + localStorage.getItem("token") });
				if (!response.hasOwnProperty("code")) {
					action.getAllTravels()
					return true;
				} else {
					response = response.response;
					console.log(response);
					return {message: response.data.message}
				}
			},
			getOneTravel: async (id) => {
				const action = getActions();
				const response = await action.getData(process.env.BACKEND_URL + "/api/viaje/"+ id);
				if (!response.hasOwnProperty("code")) {
					return response.data;
				}
				return response.response;
			},
			modifyTravel: async (id,data) => {
				const action = getActions();
				const response = await action.putData(process.env.BACKEND_URL + "/api/viaje/"+ id, data, { Authorization: "Bearer " + localStorage.getItem("token") });
				if (!response.hasOwnProperty("code")) {
					return response.data;
				}
				return response.response;
			},
			//Fin Viajes

			//Inicio Acompanantes
			//Fin Acompanantes

			//Inicio Vehiculos
			//Fin Vehiculos
		},
	};
};

export default getState;
