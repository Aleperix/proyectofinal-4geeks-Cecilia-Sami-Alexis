import React, { useState, useContext, useRef } from "react";
import { Context } from "../store/appContext";

export const NuevoViaje = () => {
	const { store, actions } = useContext(Context);
	const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10)); //Fecha en formato yyyy-mm-dd
	const [descripcionViaje, setdescripcionViaje] = useState("");
	const [vehiculo, setVehiculo] = useState("0");
	const [desde, setDesde] = useState("");
	const [hasta, setHasta] = useState("");
	const [hora, setHora] = useState(new Date().toLocaleTimeString().slice(0, 5)); //Hora en formato HH:MM
	const [asientos, setAsientos] = useState(1);
	const [precio, setPrecio] = useState(1);

	function handleSubmit() {
		let hoy = new Date();
		// console.log(hoy.getFullYear()+"-"+(hoy.getMonth()+1)+"-"+hoy.getDate());
		let daySel = String(fecha).substring(8, 10);
		let monthSel = String(fecha).substring(5, 7);
		let yearSel = String(fecha).substring(0, 4);
		if ((yearSel == hoy.getFullYear() && monthSel == hoy.getMonth() + 1 && daySel < hoy.getDate()) || (yearSel == hoy.getFullYear() && monthSel < hoy.getMonth() + 1) || yearSel < hoy.getFullYear()) {
			console.log("¿Acaso intentas viajar al pasado?");
		}
		let formData = {
			acerca: descripcionViaje,
			conductor: store.usuario.id,
			vehiculo: vehiculo,
			desde: desde,
			hasta: hasta,
			fecha: Number(fecha.replaceAll('-', '')),
			hora: Number(hora.replace(':', '')),
			asientos_disponibles: Number(asientos),
			costo_asiento_uy: Number(precio)

		}
		actions.postTravel(formData)
		clearFields()
	}

	function clearFields(){
		const time = new Date()
		setFecha(time.toISOString().slice(0, 10)); //Fecha en formato yyyy-mm-dd
		setVehiculo("0");
		setdescripcionViaje("");
		setDesde("");
		setHasta("");
		setHora(time.toLocaleTimeString().slice(0, 5)); //Hora en formato HH:MM
		setAsientos(1);
		setPrecio(1);
	}

	return (
		<>
			<div className="modal fade" id="postTravel" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="postTravelLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="postTravelLabel">
								Publicar viaje
							</h1>
						</div>
						<div className="modal-body">
							<div className="container">
								<form className="column g-3" id="travelForm" onSubmit={(e) => e.preventDefault()}>
									<div className="form-floating">
										<textarea className="form-control" value={descripcionViaje} placeholder="Leave a comment here" id="pv-acerca" onChange={(e) => setdescripcionViaje(e.target.value)}></textarea>
										<label htmlFor="pv-acerca">Acerca de mi viaje</label>
									</div>
									<div className="form-floating mt-2">
										<select className="form-select" id="pv-vehiculo" defaultValue="0" onChange={(e) => setVehiculo(e.target.value)} required>
											<option value="0" disabled>
												-- Selecciona una opción --
											</option>
											{store.usuario.vehiculos
												? store.usuario.vehiculos.map((element, index) => {
														return (
															<option value={element.id} key={index}>
																{element.modelo}
															</option>
														);
												  })
												: null}
										</select>
										<label htmlFor="pv-vehiculo">Vehículo</label>
									</div>
									<div className="row g-2">
										<div className="col-md">
											<div className="form-floating mt-2">
												<input value={desde} type="text" className="form-control" id="pv-desde" placeholder="Desde" onChange={(e) => setDesde(e.target.value)} />
												<label htmlFor="pv-desde">Desde</label>
											</div>
										</div>
										<div className="col-md">
											<div className="form-floating mt-2">
												<input value={hasta} type="text" className="form-control" id="pv-hasta" placeholder="Hasta" onChange={(e) => setHasta(e.target.value)} />
												<label htmlFor="pv-hasta">Hasta</label>
											</div>
										</div>
									</div>
									<div className="row g-2">
										<div className="col-md">
											<div className="form-floating mt-2">
												<input value={fecha} type="date" className="form-control" id="pv-fecha" onChange={(e) => setFecha(e.target.value)} required />
												<label htmlFor="pv-fecha">Fecha</label>
											</div>
										</div>
										<div className="col-md">
											<div className="form-floating mt-2">
												<input value={hora} type="time" className="form-control" id="pv-hora" onChange={(e) => setHora(e.target.value)} required />
												<label htmlFor="pv-hora">Hora</label>
											</div>
										</div>
									</div>
									<div className="row g-2">
										<div className="col-md">
											<div className="form-floating mt-2">
												<input value={asientos} min="1" type="number" className="form-control" id="pv-asientos" onChange={(e) => setAsientos(e.target.value)} />
												<label htmlFor="pv-asientos">Asientos disponibles</label>
											</div>
										</div>
										<div className="col-md">
											<div className="form-floating mt-2">
												<input value={precio} min="1" type="number" className="form-control" id="pv-precio" onChange={(e) => setPrecio(e.target.value)} />
												<label htmlFor="pv-precio">Precio por asiento</label>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => clearFields()}>
								Cancelar
							</button>
							<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postTravelConfirm">
								Publicar
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="postTravelConfirm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="postTravelConfirmLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="postTravelConfirmLabel">
								Advertencia
							</h1>
						</div>
						<div className="modal-body">¿Seguro/a que quieres publicar el viaje?</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#postTravel">
								Volver
							</button>
							<button type="submit" className="btn btn-primary" form="travelForm" data-bs-dismiss="modal" onClick={() => handleSubmit()}>
								Confirmar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};
