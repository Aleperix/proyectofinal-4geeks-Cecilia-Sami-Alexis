const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			usuario: [],
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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
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
