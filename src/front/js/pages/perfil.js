import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Error401 } from "../component/error401";
import { Context } from "../store/appContext";

export const Perfil = () => {
	const {store, actions} = useContext(Context);
	const [datosPerfil, setDatosPerfil] = useState("");
	const [vehiculos, setVehiculos] = useState([]);
	const [edad, setEdad] = useState("");
	const profileid = useParams()
	
	const getProfileData = async (id) => {
		const response = await actions.getProfile(id)
		console.log(response);
		const edad = getAge(String(response.perfil.fecha_nacimiento))
		setDatosPerfil(response.perfil)
		setVehiculos(response.vehiculos)
		setEdad(edad)
	}
	
	function getAge(fechaNac) {
		let hoy = new Date();
		let miFecha
		console.log(hoy);
		if (fechaNac.length == 8){
			miFecha = fechaNac.substring(4, 8)+"/"+fechaNac.substring(2, 4)+"/"+fechaNac.substring(0, 2)
		}else{
			miFecha = fechaNac.substring(3, 7)+"/"+fechaNac.substring(1, 3)+"/0"+fechaNac.substring(0, 1)
		}
		let fechaNacUsr = new Date(miFecha);
		let edad = hoy.getFullYear() - fechaNacUsr.getFullYear();
		let m = hoy.getMonth() - fechaNacUsr.getMonth();
		if (m < 0 || (m === 0 && hoy.getDate() < fechaNacUsr.getDate())) {
			edad--;
		}
		return edad;
	}



	useEffect(() => {
		getProfileData(profileid.id)
	}, []);
	return (
		<>
		{store.auth ?
			<div className="container">
				<div className="mt-5 mx-5" id="profile">
					<div className="container bg-light bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
						<h1 className="h2 my-2">Perfil de {datosPerfil.nombre_usuario}</h1>
						<img className="my-2 border border-2 rounded-circle" src={datosPerfil.url_avatar} width="10%" alt="Imagen de Perfil" />
					</div>
					{store.usuario.id == datosPerfil.id ?
					<div className="mx-4 py-2 bg-secondary bg-opacity-25 border-start border-end border-secondary h-100" id="my-profile-config">
						<div className="my-4 d-flex justify-content-center">
							<span className="d-block m-2">Editar datos personales</span>
							<span className="d-block m-2">Cambiar imagen de perfil</span>
						</div>
					</div>
					:
					<div className="mx-4 py-2 bg-secondary bg-opacity-25 border-start border-end border-secondary h-100" id="my-profile-config">
						<div className="my-4 d-flex justify-content-center">
							<button className="btn btn-secondary d-block m-2">Contactar</button>
						</div>
					</div>}
				</div>
				<div className="mx-5" id="personal-info">
					<div className="container bg-light bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
						<h4 className="h4 my-2">Información Personal</h4>
						<i className="h4 fas fa-user"></i>
					</div>
					<div className="mx-4 py-2 bg-secondary bg-opacity-25 border-start border-end border-secondary h-100" id="my-profile-config">
						<div className="my-4">
							<div className="row row justify-content-center">
								<div className="col-4">
									<span className="d-block m-2"><b>Usuario: </b>{datosPerfil.nombre_usuario}</span>
									<span className="d-block m-2"><b>Nombre: </b>{datosPerfil.nombre}</span>
									<span className="d-block m-2"><b>Apellido: </b>{datosPerfil.apellido}</span>
									<span className="d-block m-2"><b>Correo Electrónico: </b>{datosPerfil.correo}</span>
									<span className="d-block m-2"><b>Ciudad: </b>{datosPerfil.ciudad}</span>
								</div>
								<div className="col-4">
									<span className="d-block m-2"><b>Edad: </b>{edad}</span>
									<span className="d-block m-2"><b>Género: </b>{datosPerfil.genero}</span>
									<span className="d-block m-2"><b>Preferencias para viajar: </b>{datosPerfil.preferencias}</span>
									<span className="d-block m-2"><b>Sobre mi: </b>{datosPerfil.acerca}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{store.usuario.id == datosPerfil.id ?
				<div className="mx-5" id="travels">
					<div className="container bg-light bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
						<h4 className="h4 my-2">Viajes</h4>
						<i className="h4 fas fa-map-marked-alt"></i>
					</div>
					<div className="mx-4 py-2 bg-secondary bg-opacity-25 border-start border-end border-secondary h-100" id="my-profile-config">
						<div className="my-4">
						<div className="table-responsive">
							<table className="table table-striped text-center mx-5">
								<thead>
									<tr>
									<th scope="col-1">#</th>
									<th scope="col-1">Desde</th>
									<th scope="col-1">Hasta</th>
									<th scope="col-1">Fecha</th>
									<th scope="col-1">Hora</th>
									<th scope="col-1">Vehículo</th>
									</tr>
								</thead>
								<tbody>
									<tr>
									<th scope="row">1</th>
									<td>Montevideo</td>
									<td>Piriápolis</td>
									<td>31/10/2022</td>
									<td>13:15</td>
									<td>Nisan</td>
									</tr>
									<tr>
									<th scope="row">2</th>
									<td>Montevideo</td>
									<td>Piriápolis</td>
									<td>31/10/2022</td>
									<td>13:15</td>
									<td>Volkswagen</td>
									</tr>
									<tr>
									<th scope="row">3</th>
									<td>Montevideo</td>
									<td>Piriápolis</td>
									<td>31/10/2022</td>
									<td>13:15</td>
									<td>4x4</td>
									</tr>
								</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				:
				false}
				<div className="mx-5" id="vehicles">
					<div className="container bg-light bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
						<h4 className="h4 my-2">Vehículos</h4>
						<i className="h4 fas fa-space-shuttle"></i>
					</div>
					<div className="mb-2 mx-4 py-2 bg-secondary bg-opacity-25 rounded-bottom border-start border-end border-bottom border-secondary h-100" id="my-profile-config">
						{vehiculos.hasOwnProperty('message') ?
						<div className="my-4 d-flex justify-content-center">
							<p className="d-block m-2 d-flex justify-content center">{vehiculos.message}</p>
						</div>
							:
							<div className="my-4">
								<div className="table-responsive">
									<table className="table table-striped text-center mx-5">
										<thead>
											<tr>
											<th scope="col-1">#</th>
											<th scope="col-1">Modelo</th>
											<th scope="col-1">Kilómetros por litro</th>
											<th scope="col-1">Cantidad de asientos</th>
											</tr>
										</thead>
										<tbody>
										{vehiculos.map((element, index) => {
											return(
											<tr key={index}>
											<th scope="row">1</th>
											<td>Nisan</td>
											<td>20</td>
											<td>4</td>
											</tr>
										)})}
										</tbody>
									</table>
								</div>
							</div>
						}
						</div>
					</div>
				</div>
			:
			<Error401/>}
		</>
	);
};

