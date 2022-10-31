import axios from 'axios';

const APIUrl = "https://3001-4geeksacade-reactflaskh-mwcruni065b.ws-us73.gitpod.io"
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			usuario: {},
			auth: false,
			departamentos: [
				{departamento: "Artigas", img: 'https://i.imgur.com/OLPdj9C.jpg'},
				{departamento: "Canelones", img: 'https://i.imgur.com/g1wxlPz.jpg'},
				{departamento: "Cerro Largo", img: 'https://i.imgur.com/FT3QlRn.jpg'},
				{departamento: "Colonia", img: 'https://i.imgur.com/L6wPfHm.jpg'},
				{departamento: "Durazno", img: 'https://i.imgur.com/yUUPUj0.jpg'},
				{departamento: "Flores", img: 'https://i.imgur.com/cW5cFNb.jpg'},
				{departamento: "Florida", img: 'https://i.imgur.com/00I9zth.jpg'},
				{departamento: "Lavalleja", img: 'https://i.imgur.com/tNHD1YT.jpg'},
				{departamento: "Maldonado", img: 'https://i.imgur.com/11CVMt6.jpg'},
				{departamento: "Montevideo", img: 'https://i.imgur.com/HaPN1S9.jpg'},
				{departamento: "Paysandú", img: 'https://i.imgur.com/ito9Lzs.jpg'},
				{departamento: "Río Negro", img: 'https://i.imgur.com/wmUI8nr.jpg'},
				{departamento: "Rivera", img: 'https://i.imgur.com/lVi9wR4.jpg'},
				{departamento: "Rocha", img: 'https://i.imgur.com/HCYKfww.jpg'},
				{departamento: "Salto", img: 'https://i.imgur.com/3UG4SJV.jpg'},
				{departamento: "San José", img: 'https://i.imgur.com/zmUa0ZN.jpg'},
				{departamento: "Soriano", img: 'https://i.imgur.com/sXAMQWi.jpg'},
				{departamento: "Tacuarembó", img: 'https://i.imgur.com/npRwouy.jpg'},
				{departamento: "Treinta y Tres", img: 'https://i.imgur.com/fQIj3Yz.jpg'}
			]
		},
		actions: {
								//	Inicio API //
			/* POST */
			postData: async (route, bodyData)=>{
				try {
					const response = await axios.post(APIUrl+route, bodyData)
					return response
				} catch (error) {
					console.log(error);
					return error
				}
			},
			/* GET */
			getData: async (route, headers)=>{
				try {
					if (headers != null) {
						const response = await axios.get(APIUrl+route, {headers: headers})
						return response
					}
					const response = await axios.get(APIUrl+route)
					console.log(response);
					return response
				} catch (error) {
					console.log(error);
					return error
				}
			},
			/* PUT */
			putData: async (route, bodyData)=>{
				try {
					const response = await axios.put(APIUrl+route, bodyData)
					return response
				} catch (error) {
					console.log(error);
					return error
				}
			},
			/* DELETE */
			deleteData: async (route)=>{
				try {
					const response = await axios.delete(APIUrl+route,)
					return response
				} catch (error) {
					console.log(error);
					return error
				}
			},
								//	Fin API //


			//Inicio Usuarios
			login: async (value)  => {
				const action = getActions()
				let response = await action.postData('/api/login', value);
				if (response.status == 200) {
					localStorage.setItem('token', response.data.access_token)
					setStore({auth: true})
					return true
				}else{
					response = response.response
					setStore({auth: false})
					return {message: response.data.message}
				}
			},
			logout: () => {
                localStorage.removeItem('token')
                setStore({auth: false})
			},
			isAuth: async () => {
				const action = getActions()
				let response = await action.getData('/api/isauth', {Authorization: 'Bearer ' + localStorage.getItem('token')});
				if (response.hasOwnProperty('code')){
					setStore({auth: false})
					return false
				}
                setStore({auth: true})
				return true
			},
			//Fin Usuarios

			//Inicio Viajes
			//Fin Viajes

			//Inicio Acompanantes
			//Fin Acompanantes

			//Inicio Vehiculos
			//Fin Vehiculos
		}
	};
};

export default getState;
