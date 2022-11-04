import axios from 'axios';

const APIUrl = "https://3001-4geeksacade-reactflaskh-mwcruni065b.ws-us74.gitpod.io"
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
			],
      listaViajes: [
        {
          Ciudad_Salida: "Montevideo",
          Ciudad_llegada: "Colonia del sacramento",
          Fecha: "01/11/2022",
          Hora: 9 + "am",
          Valor_Asiento: 200,
          acerca: "breve descripcion",
          Conductor: "breve descripcion",
          Vehiculo: "breve descripcion",
          Asientos_disponibles: 3,
          Activo: true,
          Acompañantes: ["Juan"],
        },
        {
          Ciudad_Salida: "Punta del Este",
          Ciudad_llegada: "Colonia del sacramento",
          Fecha: "02/11/2022",
          Hora: 9 + "am",
          Valor_Asiento: 500,
          acerca: "breve descripcion",
          Conductor: "Mariano",
          Vehiculo: "breve descripcion",
          Asientos_disponibles: 3,
          Activo: true,
          Acompañantes: ["Maria", "Angela"],
        },
        {
          Ciudad_Salida: "Colonia del Sacramento",
          Ciudad_llegada: "Punta del Este",
          Fecha: "03/11/2022",
          Hora: 9 + "am",
          Valor_Asiento: 800,
          acerca: "breve descripcion",
          Conductor: "breve descripcion",
          Vehiculo: "breve descripcion",
          Asientos_disponibles: 1,
          Activo: true,
          Acompañantes: ["Juan", "Norma"],
        },
        {
          Ciudad_Salida: "Montevideo",
          Ciudad_llegada: "Colonia del sacramento",
          Fecha: "01/11/2022",
          Hora: 9 + "am",
          Valor_Asiento: 200,
          acerca: "breve descripcion",
          Conductor: "breve descripcion",
          Vehiculo: "breve descripcion",
          Asientos_disponibles: 3,
          Activo: true,
          Acompañantes: ["Juan"],
        },
        {
          Ciudad_Salida: "Montevideo",
          Ciudad_llegada: "Colonia del sacramento",
          Fecha: "01/11/2022",
          Hora: 9 + "am",
          Valor_Asiento: 200,
          acerca: "breve descripcion",
          Conductor: "breve descripcion",
          Vehiculo: "breve descripcion",
          Asientos_disponibles: 3,
          Activo: false,
          Acompañantes: ["Juan"],
        },
      ],
	  error: null
		},
		actions: {
								//	Inicio API //
			/* POST */
			postData: async (url, bodyData, headers)=>{
				try {
					if (headers != null) {
						const response = await axios.post(url, bodyData, {headers: headers})
						return response
					}
					const response = await axios.post(url, bodyData)
					return response
				} catch (error) {
					console.log(error);
					setStore({error: error.response.status})
					return error
				}
			},
			/* GET */
			getData: async (url, headers)=>{
				try {
					if (headers != null) {
						const response = await axios.get(url, {headers: headers})
						return response
					}
					const response = await axios.get(url)
					return response
				} catch (error) {
					console.log(error);
					setStore({error: error.response.status})
					return error
				}
			},
			/* PUT */
			putData: async (url, bodyData, headers)=>{
				try {
					if (headers != null) {
						const response = await axios.put(url, bodyData, {headers: headers})
						return response
					}
					const response = await axios.put(url, bodyData)
					return response
				} catch (error) {
					console.log(error);
					setStore({error: error.response.status})
					return error
				}
			},
			/* DELETE */
			deleteData: async (url)=>{
				try {
					const response = await axios.delete(url)
					return response
				} catch (error) {
					console.log(error);
					setStore({error: error.response.status})
					return error
				}
			},
								//	Fin API //


			//Inicio Usuarios
			login: async (value)  => {
				const action = getActions()
				let response = await action.postData(APIUrl+'/api/login', value);
				if (!response.hasOwnProperty('code')) {
					localStorage.setItem('token', response.data.access_token)
					setStore({auth: true})
					setStore({usuario: response.data.usuario})
					return true
				}else{
					response = response.response
					setStore({auth: false})
					// return {message: response.data.message}
				}
			},
			logout: () => {
                localStorage.removeItem('token')
                setStore({auth: false})
			},
			isAuth: async () => {
				const action = getActions()
				let response = await action.getData(APIUrl+'/api/isauth', {Authorization: 'Bearer ' + localStorage.getItem('token')});
				if (!response.hasOwnProperty('code')) {
					setStore({auth: true})
					setStore({usuario: response.data.usuario})
					return true
				}
                setStore({auth: false})
				return false
			},
			getProfile: async (id) => {
				const action = getActions()
				let response = await action.getData(APIUrl+'/api/profile/'+id, {Authorization: 'Bearer ' + localStorage.getItem('token')});
				if (!response.hasOwnProperty('code')) {
					console.log(response.data);
					return response.data
				}
				return response.response
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
