import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import defaultAvatarUrl from "../../img/defaultAvatar.png";
import { ErrorPage } from "../component/errorpage";

export const Viaje = () => {
	const [datosViaje, setDatosViaje] = useState({});
	const [fechaViaje, setFechaViaje] = useState();
	const [horaViaje, setHoraViaje] = useState();
	const [asientosDisponibles, setAsientosDisponibles] = useState();
	const [asientos, setAsientos] = useState(1);
	const [datosPreferencias, setDatosPreferencias] = useState([]);
	const [esConductor, setEsConductor] = useState()
	const [unitStatus, setUnitStatus] = useState(false)
	const { actions, store } = useContext(Context);
	const idViaje = useParams();

	const location = useLocation();

	const getTravelData = async (id) => {
		const response = await actions.getOneTravel(id);
		if (response.status == 200) {
			console.log(response);
			setDatosViaje({ viaje: response.viaje, status: response.status });
			setFechaViaje(String(response.viaje.fecha).substring(6, 8) + "/" + String(response.viaje.fecha).substring(4, 6) + "/" + String(response.viaje.fecha).substring(0, 4));
			setHoraViaje(String(response.viaje.hora).substring(0, 2) + ":" + String(response.viaje.hora).substring(2, 4));
			setAsientosDisponibles(response.viaje.asientos_disponibles);
			response.viaje.conductor.preferencias != null ? setDatosPreferencias(response.viaje.conductor.preferencias.split(",")) : setDatosPreferencias(["El usuario aún no tiene preferencias para viajar"]);
			console.log(response.viaje.conductor.id);
			store.usuario.id != response.viaje.conductor.id ? setEsConductor(false) : setEsConductor(true)
			return null;
		}
		console.log(response);
		setDatosViaje({ message: response.data.message, status: response.status });
		return null;
	};

	const handleAcompanante = async (id) => {
		let datos = { id_usuario: store.usuario.id, id_viaje: idViaje.id, estado: "pendiente", cantidad_asientos: asientos};
		const response = await actions.postAcompanante(datos);
		if (response.status == 200){
			const response1 = await actions.modifyTravel(idViaje.id, {asientos_disponibles: (asientosDisponibles - asientos)});
			if (response1.status == 200){
				setUnitStatus("pendiente")
			}
		}
		console.log(response);
	};

	const getAcompStatus = async () => {
		console.log(store.usuario.id);
		const response = await actions.getOneAcompanante(idViaje.id, store.usuario.id);
		if (response.status == 200){
			if (response.acompanante.estado == "pendiente"){
				setUnitStatus("pendiente")
				return true
			}else if(response.acompanante.estado == "aceptada"){
				setUnitStatus("aceptada")
				return true
			}else if(response.acompanante.estado == "rechazada"){
				setUnitStatus("rechazada")
				return true
			}
		}
		setUnitStatus(false)
		console.log(response);
	};

	const onAsientosChange = (item) => {
		if (item < 1) {
			setAsientos(1)
		} else if(item > asientosDisponibles) {
			setAsientos(asientosDisponibles)
		}else{
			setAsientos(item)
		}
	}

	useEffect(() => {
		getTravelData(idViaje.id);
		getAcompStatus()
	}, []);
	useLayoutEffect(() => {
		document.title = store.siteName+" - Viaje #"+idViaje.id
		getTravelData(idViaje.id);
		getAcompStatus()
	}, [location]);

	console.log(esConductor);
	console.log(store.usuario.id);
	// return(<h1>Hola</h1>)
	console.log(unitStatus);
	return (
		<>
			{store.auth ? (
				datosViaje?.status != 404 ? (
					<div className="container my-4 d-flex flex-column justify-content-center">
						<Link className="text-decoration-none" to={"/perfil/"+datosViaje?.viaje?.conductor.id}>
							<div className="bg-primary p-2 text-white bg-opacity-75 d-flex align-items-center justify-content-between">
								<h2 className="card-title"> {datosViaje?.viaje?.conductor.nombre + " " + datosViaje?.viaje?.conductor.apellido}</h2>
								<img className="my-2 border border-2 rounded-circle" src={datosViaje?.viaje?.conductor.url_avatar != null ? datosViaje?.viaje?.conductor.url_avatar : defaultAvatarUrl} width="10%" alt="Imagen de Perfil" />
							</div>
						</Link>
						<div className="my-5 text-center">
							<h4 className="card-title"> {fechaViaje}</h4>
							<span>{horaViaje}</span>
						</div>
						<div className="container d-flex justify-content-center align-items-center">
								<label htmlFor="trayecto" className="form-label ">{datosViaje?.viaje?.desde}</label>
								<input type="range" id="trayecto" className="mx-2" />
								<label htmlFor="trayecto" className="form-label ">{datosViaje?.viaje?.hasta}</label>
						</div>
						<div className="mx-5">
							<div className="mt-5 mb-3">
								<span className="h5 d-inline">Asientos disponibles: </span>
								<span className="mx-2 d-inline">{datosViaje?.viaje?.asientos_disponibles}</span>
							</div>
							<div className="my-3">
								<span className="h5 d-inline">Monto por acompañante: </span>
								<span className="mx-2 d-inline">$U{" "+datosViaje?.viaje?.costo_asiento_uy}</span>
							</div>
							<div className="my-3 d-flex flex-column">
								<span className="h5">Acerca del viaje: </span>
								<span>{datosViaje?.viaje?.acerca}</span>
							</div>
							<div className="my-3 d-flex flex-column">
								<span className="h5">Preferencias para viajar: </span>
									{datosPreferencias.map((element, index) => {
										return element == "mate" ? (
											<span key={index}>
												<img src="https://i.imgur.com/9vGOpIP.png" alt="foto del mate" width="16px" />
												<span className="mx-2">Me encanta tomar mate</span>
											</span>
										) : element == "no_fumar" ? (
											<span key={index}>
												<i className="fas fa-smoking-ban"></i><span className="mx-2">Por favor, no fumar en el auto</span>
											</span>
										) : element == "mascotas" ? (
											<span key={index}>
												<i className="fas fa-paw"></i><span className="mx-2">Acepto mascotas pequeñas</span>
											</span>
										) : element == "ninguna" && (
											<span key={index}>
												Ninguna
											</span>
										);
									})}
							</div>
						</div>
						{!esConductor &&
						<div className="container d-flex justify-content-center text-center">
							{unitStatus == "pendiente" ?
							<div className="alert alert-warning mx-auto w-50" role="alert">
  								Tu solicitud está pendiente de aprobación por el conductor
							</div>
							: unitStatus == "aceptada" ?
							<div className="alert alert-success mx-auto w-50" role="alert">
  								<span className="d-block">Tu solicitud ha sido aceptada por el conductor</span>
								  <a className="link-success h3" href={"https://wa.me/598"+datosViaje?.viaje?.conductor?.celular+"?text=Hola "+datosViaje?.viaje?.conductor?.nombre+", soy "+store.usuario.nombre+" de Fromtony. Gracias por aceptarme en el viaje %23"+idViaje.id} target="_blank"><i className="bi bi-whatsapp mx-2"></i></a><a className="link-danger h3" href={"mailto:"+datosViaje?.viaje?.conductor?.correo}><i className="bi bi-envelope mx-2"></i></a>
							</div>
							
							: unitStatus == "rechazada" ?
							<div className="alert alert-danger mx-auto w-50" role="alert">
  								Tu solicitud ha sido rechazada por el conductor
							</div>
							
							:
							!unitStatus &&
							<div className="d-flex mx-auto ">
								<button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#acompananteadvert">
									Unirme
								</button>
								<div className="modal fade" id="acompananteadvert" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="acompananteAdvertLabel" aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h1 className="modal-title fs-5" id="acompananteAdvertLabel">
													Cantidad de Asientos
												</h1>
											</div>
											<div className="modal-body">
												<p className="text-center">Disponibles: {asientosDisponibles}</p>
												<div className="d-flex justify-content-center">
													<div className="form-floating">
														<input value={asientos} type="number" className="form-control" id="v-asientos" min="1" max={asientosDisponibles} onChange={(e) => onAsientosChange(e.target.value)} />
														<label htmlFor="v-asientos">Asientos</label>
													</div>
												</div>
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-danger" data-bs-dismiss="modal">
													Cancelar
												</button>
												<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleAcompanante()}>
													Confirmar
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							}
						</div>
						}
					</div>
				) : (
					<ErrorPage errorStatus={datosViaje?.status} errorMessage={datosViaje?.message} />
				)
			) : (
				<ErrorPage errorStatus={"401"} errorMessage={"No tienes permitido estar aquí"} />
			)}
		</>
	);
};
