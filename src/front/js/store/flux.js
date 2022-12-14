import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			siteName: "Fromtony",
			usuario: {},
			auth: false,
			viajes: [],
			viajesReq: [],
			userReq: [],
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
				if (!response.hasOwnProperty("code")) {
					return true;
				} else {
					console.log(response);
					response = response.response;
					return {message: response.data.message}
				}
			},
			modifyUser: async (id, value) => {
				const action = getActions();
				let response = await action.putData(process.env.BACKEND_URL + "/api/users/"+id, value, { Authorization: "Bearer " + localStorage.getItem("token") });
				if (!response.hasOwnProperty("code")) {
					return response.data;
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
					return response.data;
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
			getOneAcompanante: async (travel, user,) => {
				const action = getActions();
				const response = await action.getData(process.env.BACKEND_URL + "/api/acompanante/t/"+travel+"/u/"+user);
				console.log(response);
				if (!response.hasOwnProperty("code")) {
					return response.data;
				}
				return response.response;
			},
			postAcompanante: async (value) => {
				console.log(value);
				const action = getActions();
				let response = await action.postData(process.env.BACKEND_URL + "/api/acompanantes/new", value, { Authorization: "Bearer " + localStorage.getItem("token") });
				if (!response.hasOwnProperty("code")) {
					return response.data;
				} else {
					response = response.response;
					console.log(response);
					return {message: response.data.message}
				}
			},
			getAllReq: async (id, type) => {
				const action = getActions();
				let response
				if (type == "user"){
					response = await action.getData(process.env.BACKEND_URL + "/api/viajesreq/u/"+id);
				}else if(type == "travel"){
					response = await action.getData(process.env.BACKEND_URL + "/api/viajesreq/t/"+id);
				}
					if (type == "user") {
						if (!response.hasOwnProperty("code")) {
							setStore({ userReq: response.data });
							return response.data;
						}
						setStore({ userReq: [] });
						return response.response;
					}else if (type == "travel") {
						if (!response.hasOwnProperty("code")) {
							setStore({ viajesReq: response.data });
							return response.data;
						}
						setStore({ viajesReq: [] });
						return response.response;
					}
			},
			modifyAcompanante: async (id,data) => {
				const action = getActions();
				const response = await action.putData(process.env.BACKEND_URL + "/api/acompanantes/"+ id, data, { Authorization: "Bearer " + localStorage.getItem("token") });
				if (!response.hasOwnProperty("code")) {
					return response.data;
				}
				return response.response;
			},
			//Fin Acompanantes

			//Inicio Vehiculos
			postVehicle: async (value) => {
				console.log(value);
				const action = getActions();
				let response = await action.postData(process.env.BACKEND_URL + "/api/vehicles/new", value, { Authorization: "Bearer " + localStorage.getItem("token") });
				if (!response.hasOwnProperty("code")) {
					return response.data;
				} else {
					response = response.response;
					console.log(response);
					return {message: response.data.message}
				}
			},
			//Fin Vehiculos

							//	Fin API //

							// Inicio funciones globales //

							// Inicio formularios //

			//Verificamos que no hayan campos vac??os
			verifyEmpty: (array) => {
				for (let i = 0; i < array.length; i++) {
					if(i == ""){
						return false
					}
				}
				return true
			},

			//Verificamos que un campo y su confirmaci??n sean iguales
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

			formSubmit: async (value) => {
				const action = getActions();
				let response = await action.postData(process.env.BACKEND_URL + "/api/contactform", value);
				console.log(response);
				if (!response.hasOwnProperty("code")) {
					return response.data;
				} else {
					console.log(response);
					response = response.response;
					return {message: response.data.message}
				}
			},

							// Fin formularios //

							// Fin funciones globales //
		},
	};
};

export default getState;
