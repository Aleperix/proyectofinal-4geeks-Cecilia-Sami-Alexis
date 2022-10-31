import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Perfil = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="mt-5 mx-5" id="my-profile">
				<div className="container bg-light bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
					<h1 className="h2 my-2">Perfil de Alexis</h1>
					<img className="my-2 border border-2 rounded-circle" src="https://avatars.githubusercontent.com/u/44621287?v=4" width="10%" alt="Imagen de Perfil" />
				</div>
				<div className="mx-4 py-2 bg-secondary bg-opacity-25 border-start border-end border-secondary h-100" id="my-profile-config">
					<div className="my-4">
						<span className="d-block m-2">Editar datos personales</span>
						<span className="d-block m-2">Cambiar imagen de perfil</span>
					</div>
				</div>
			</div>
			<div className="mx-5" id="my-personal-info">
				<div className="container bg-light bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
					<h4 className="h4 my-2">Información Personal</h4>
					<i className="h4 fas fa-user"></i>
				</div>
				<div className="mx-4 py-2 bg-secondary bg-opacity-25 border-start border-end border-secondary h-100" id="my-profile-config">
					<div className="my-4">
						<div className="row row justify-content-center">
							<div className="col-4">
								<span className="d-block m-2"><b>Usuario: </b> Aleperix</span>
								<span className="d-block m-2"><b>Nombre: </b> Alexis</span>
								<span className="d-block m-2"><b>Apellido: </b> Peña</span>
								<span className="d-block m-2"><b>Correo Electrónico: </b> aleperixx@gmail.com</span>
								<span className="d-block m-2"><b>Ciudad: </b> Minas</span>
							</div>
							<div className="col-4">
								<span className="d-block m-2"><b>Edad: </b> 22</span>
								<span className="d-block m-2"><b>Género: </b> Masculino</span>
								<span className="d-block m-2"><b>Preferencias para viajar: </b> Música, Mate, Charla</span>
								<span className="d-block m-2"><b>Sobre mi: </b> Había una vez...</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mx-5" id="my-travels">
				<div className="container bg-light bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
					<h4 className="h4 my-2">Mis Viajes</h4>
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
			<div className="mx-5" id="my-vehicles">
				<div className="container bg-light bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
					<h4 className="h4 my-2">Mis Vehículos</h4>
					<i className="h4 fas fa-space-shuttle"></i>
				</div>
				<div className="mb-2 mx-4 py-2 bg-secondary bg-opacity-25 rounded-bottom border-start border-end border-bottom border-secondary h-100" id="my-profile-config">
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
								<tr>
								<th scope="row">1</th>
								<td>Nisan</td>
								<td>20</td>
								<td>4</td>
								</tr>
								<tr>
								<th scope="row">2</th>
								<td>Volkswagen</td>
								<td>30</td>
								<td>4</td>
								</tr>
								<tr>
								<th scope="row">3</th>
								<td>4x4</td>
								<td>30</td>
								<td>5</td>
								</tr>
							</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

