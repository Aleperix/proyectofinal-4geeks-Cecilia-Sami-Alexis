import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import defaultAvatarUrl from "../../img/defaultAvatar.png";
import { ErrorPage } from "../component/errorpage";

export const Viaje = () => {
	const [datosViaje, setDatosViaje] = useState({});
  const [fechaViaje, setFechaViaje] = useState();
  const [horaViaje, setHoraViaje] = useState();
	const [datosPreferencias, setDatosPreferencias] = useState([]);
	const { actions, store } = useContext(Context);
	const idViaje = useParams();

	const getTravelData = async (id) => {
		const response = await actions.getOneTravel(id);
		if (response.status == 200) {
      console.log(response);
			setDatosViaje({ viaje: response.viaje, status: response.status });
      setFechaViaje(String(response.viaje.fecha).substring(6, 8)+"/"+String(response.viaje.fecha).substring(4, 6)+"/"+String(response.viaje.fecha).substring(0, 4))
			response.viaje.conductor.preferencias != null ? setDatosPreferencias(response.viaje.conductor.preferencias.split(",")) : setDatosPreferencias(["El usuario aún no tiene preferencias para viajar"]);
      return null
    }
    console.log(response);
		setDatosViaje({message: response.data.message, status: response.status });
		return null;
	};

	const putModifyPlace = async (id) => {
		// let place = datosAsiento - 1;
		let idCompany = store.usuario.id;
		let datos = { asientos_disponibles: place, idCompany: idCompany };
		console.log(datos);
		const response = await actions.modifyTravel(id, datos);
		console.log(response);
		// if (response?.acerca) {
		//   setDatosViaje(response);
		//   console.log("estoy en la funcion get travel")
		//   return response.conductor;
		// }
		// console.log("estoy en la funcion get travel 2")
		// console.log(response.data, { status: response.status });
		// setDatosViaje(response.data, { status: response.status });
		// return null;
	};

	useEffect(() => {
		getTravelData(idViaje.id);
	}, []);

  // return(<h1>Hola</h1>)
	return datosViaje.status != 404 ? (
		<div className=" container d-flex flex-column justify-content-center">
			<div className="mx-4 my-5">
				<h4 className="card-title text-center"> {fechaViaje}</h4>
			</div>
			<div className="container d-flex justify-content-center" style={{ height: "200px" }}>
				<label htmlFor="customRange1" className="form-label d-flex">
					{datosViaje?.viaje?.hora}
				</label>

				<input type="range" className="d-flex flex-column" id="" aria-orientation="" style={{ transform: "rotate(90deg)" }} />
				<div className="d-flex justify-content-between flex-column">
					<label htmlFor="customRange1" className="form-label ">
						{datosViaje?.viaje?.desde}
					</label>
					<label htmlFor="customRange1" className="form-label ">
						{datosViaje?.viaje?.hasta}
					</label>
				</div>
			</div>

			<div className="col-6 container justify-content-center">
				<div className="my-4 d-flex flex-row justify-content-between col-12">
					<h5 className="card-title col-9"> Asientos disponibles</h5>
					<p className="col-1"> {datosViaje?.viaje?.asientos_disponibles}</p>
				</div>

				<div className="my-4 d-flex flex-row justify-content-between col-12">
					<h5 className="card-title col-9"> Importe total para 1 pasajero</h5>
					<p className="col-1"> {datosViaje?.viaje?.costo_asiento_uy}</p>
				</div>
			</div>
			<div className="col-6 container justify-content-center">
				<div>
					<div className="bg-primary p-2 text-white bg-opacity-75 d-flex">
						<h4 className="card-title col-9"> {datosViaje?.viaje?.conductor.nombre + " " + datosViaje?.viaje?.conductor.apellido} </h4>
						<img className="my-2 border border-2 rounded-circle" src={datosViaje?.viaje?.conductor.url_avatar != null ? datosViaje?.viaje?.conductor.url_avatar : defaultAvatarUrl} width="10%" alt="Imagen de Perfil" />
					</div>
					<div>
						<h6 className="card-title col-9"> 4.5/24 Opiniones</h6>
					</div>
					<br />
					<div>
						<h6 className="card-title col-9"> Acerca de</h6>
						<p>{datosViaje?.viaje?.acerca}</p>
					</div>
				</div>
				<div>
					<h6 className="card-title col-9"> Preferencias</h6>
					{datosPreferencias.map((element, index) => {
						return element == "mate" ? (
							<p key={index}>
								<img src="https://i.imgur.com/9vGOpIP.png" alt="foto del mate" width="16px" />
								Me encanta tomar mate
							</p>
						) : element == "no_fumar" ? (
							<p key={index}>
								<i className="fas fa-smoking-ban"></i>Por favor, no fumar en el auto
							</p>
						) : element == "mascotas" ? (
							<p key={index}>
								<i className="fas fa-paw"></i>Acepto mascotas pequeñas
							</p>
						) : (
							element
						);
					})}
				</div>
				<br />
				<div className="d-flex col-3 mx-auto ">
					<button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#acompananteadvert">
						Unirme
					</button>
					<div className="modal fade" id="acompananteadvert" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="acompananteAdvertLabel" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h1 className="modal-title fs-5 text-danger" id="acompananteAdvertLabel">
										ADVERTENCIA!
									</h1>
								</div>
								<div className="modal-body">¿Seguro/a que deseas ser acompañante de este viaje?</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-danger" data-bs-dismiss="modal">
										Cancelar
									</button>
									<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleacompanante()}>
										Confirmar
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<ErrorPage errorStatus={datosViaje.status} errorMessage={datosViaje.message} />
	);
};
