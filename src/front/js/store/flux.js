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
							// Inicio llamadas generales //
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
							// Fin llamadas generales //

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
			register: async (value) => {
				const action = getActions();
				let response = await action.postData(process.env.BACKEND_URL + "/api/register", value);
				console.log(response);
				if (!response.hasOwnProperty("code")) {
					return true;
				} else {
					console.log(response);
					response = response.response;
					return {message: response.data.message}
				}
			},
			confReg: async (value) => {
				const action = getActions();
				let response = await action.getData(process.env.BACKEND_URL + "/api/register/confirm/"+value);
				console.log(response);
				if (!response.hasOwnProperty("code")) {
					return {message: response.data.message, status: response.status}
				} else {
					console.log(response);
					response = response.response;
					return {message: response.data.message, status: response.status}
				}
			},
			forgotPass: async (value) => {
				const action = getActions();
				let response = await action.putData(process.env.BACKEND_URL + "/api/forgotpass", value);
				console.log(response);
				if (!response.hasOwnProperty("code")) {
					return {message: response.data.message, status: response.status}
				} else {
					console.log(response);
					response = response.response;
					return {message: response.data.message, status: response.status}
				}
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
			searchTravels: async (value) => {
				const action = getActions();
				let response = await action.postData(process.env.BACKEND_URL + "/api/viajes/search", value);
				return response
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

							//	Fin API //

							// Inicio funciones globales //

							// Inicio formularios //

			//Verificamos que no hayan campos vacíos
			verifyEmpty: (array) => {
				for (let i = 0; i < array.length; i++) {
					if(i == ""){
						return false
					}
				}
				return true
			},

			//Verificamos que un campo y su confirmación sean iguales
			verifyMatch: (f1, f2, state, vMessage) => {
				if(f1 != f2.value){
					f2.setCustomValidity(vMessage)
					state
					return false
				}else{
					f2.setCustomValidity('')
					return true
				}
			},

							// Fin formularios //

							// Fin funciones globales //
		},
	};
};

export default getState;
