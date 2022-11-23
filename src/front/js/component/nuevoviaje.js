import React, { useState, useContext, useRef} from "react";
import { useNavigate} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from "../store/appContext";
import { NuevoVehiculo } from "./newvehicle";

export const NuevoViaje = () => {
	const { store, actions } = useContext(Context);
	const [travelError, setTravelError] = useState("");
	const navigate = useNavigate();
	const mostrarAlert = useRef();
	const ptModal = useRef()
	const responseMessage = useRef()
	const [responseValue, setResponseValue] = useState();

	const formik = useFormik({
		initialValues: {acerca: '', vehiculo: '', desde: '', hasta: '', fecha: '', hora: '', asientos_disponibles: '', costo_asiento_uy: ''},
		validationSchema: Yup.object({
			acerca: Yup.string().min(15, 'La descripción debe contener 15 o más caracteres').required('Este campo es requerido'),
			vehiculo: Yup.string().required('Este campo es requerido'),
			desde: Yup.string().min(3, 'La ciudad de origen debe contener 3 caracteres o más').required('Este campo es requerido'),
			hasta: Yup.string().min(3, 'La ciudad de destino debe contener 3 caracteres o más').required('Este campo es requerido'),
			fecha: Yup.date().required('Este campo es requerido').min(new Date().toISOString().split('T')[0], '¿Acaso intentas viajar al pasado?'),
			hora: Yup.string().required('Este campo es requerido'),
			asientos_disponibles: Yup.number().min(1, 'Debe haber por lo menos 1 asiento disponible').required('Este campo es requerido'),
			costo_asiento_uy: Yup.number().required('Este campo es requerido'),
		}),
		onSubmit: values => {
			values.conductor = store.usuario.id
			handleSubmit(values)
		},
	  });

	const handleSubmit = async (values) => {
		const response = await actions.postTravel(values)
		console.log(response);
		if (response.status == 200) {
			setTimeout(() => {
				responseMessage.current.classList.remove("bg-success", "show", "animate__fadeInLeft");
			}, 3000);
			responseMessage.current.classList.add("bg-success", "show", "animate__fadeInLeft");
			setResponseValue(response.message)
			let myModal = bootstrap.Modal.getInstance(ptModal.current)
			myModal.hide();
			navigate("/viaje/"+response.id);
		} else {
			setTimeout(() => {
				mostrarAlert.current.classList.add("d-none");
			}, 3000);
			mostrarAlert.current.classList.remove("d-none");
			setTravelError(response.message);
			mostrarAlert.current.scrollIntoView()
		}
	}
	

	return (
		store.auth &&
		<>
			<div className="modal fade" id="postTravel" ref={ptModal} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="postTravelLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="postTravelLabel">
								Publicar viaje
							</h1>
						</div>
						<div className="modal-body">
							<div className="container">
								<form className="column g-3" id="pt-form" onSubmit={formik.handleSubmit}>
									<div className="alert alert-danger d-none" ref={mostrarAlert} role="alert">
										{travelError}
									</div>
									<div className="form-floating mt-1">
										<textarea id="pt-acerca" name="acerca" value={formik.values.acerca} className={formik.touched.acerca && formik.errors.acerca ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} placeholder="Ej: Hago este viaje porque quiero visitar las termas de Salto" onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
										{formik.touched.acerca && formik.errors.acerca ? (
											<div className="text-danger">
												{formik.errors.acerca}
											</div>
										) : null}
										<label htmlFor="pt-acerca">Acerca de mi viaje</label>
									</div>
									<div className="row g-2">
										<div className="col-md">
											<div className="form-floating mt-1">
												<select id="pt-vehiculo" name="vehiculo" value={formik.values.vehiculo} className={formik.touched.vehiculo && formik.errors.vehiculo ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} onChange={formik.handleChange} onBlur={formik.handleBlur}>
													<option disabled value="">
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
												{formik.touched.vehiculo && formik.errors.vehiculo ? (
													<div className="text-danger">
														{formik.errors.vehiculo}
													</div>
												) : null}
												<label htmlFor="pt-vehiculo">Vehículo</label>
											</div>
										</div>
										<div className="col-md align-items-center">
											<button type="button" title="Agregar nuevo vehículo" className="form-control btn btn-primary mt-1 py-3" data-bs-toggle="modal" data-bs-target="#postVehicle">&#8592; Nuevo</button>
										</div>
									</div>
									<div className="row g-2">
										<div className="col-md">
											<div className="form-floating mt-1">
												<input id="pt-desde" type="text" name="desde" value={formik.values.desde} className={formik.touched.desde && formik.errors.desde ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} placeholder="Ej: Durazno" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
												{formik.touched.desde && formik.errors.desde ? (
													<div className="text-danger">
														{formik.errors.desde}
													</div>
												) : null}
												<label htmlFor="pt-desde">Desde</label>
											</div>
										</div>
										<div className="col-md">
											<div className="form-floating mt-1">
												<input id="pt-hasta" name="hasta" value={formik.values.hasta} className={formik.touched.hasta && formik.errors.hasta ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: Colonia" onChange={formik.handleChange} onBlur={formik.handleBlur} />
													{formik.touched.hasta && formik.errors.hasta ? (
														<div className="text-danger">
															{formik.errors.hasta}
														</div>
													) : null}
												<label htmlFor="pt-hasta">Hasta</label>
											</div>
										</div>
									</div>
									<div className="row g-2">
										<div className="col-md">
											<div className="form-floating mt-1">
												<input id="pt-fecha" name="fecha" value={formik.values.fecha} className={formik.touched.fecha && formik.errors.fecha ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="date" onChange={formik.handleChange} onBlur={formik.handleBlur} />
													{formik.touched.fecha && formik.errors.fecha ? (
														<div className="text-danger">
															{formik.errors.fecha}
														</div>
													) : null}
												<label htmlFor="pt-fecha">Fecha</label>
											</div>
										</div>
										<div className="col-md">
											<div className="form-floating mt-1">
												<input id="pt-hora" name="hora" value={formik.values.hora} className={formik.touched.hora && formik.errors.hora ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="time" onChange={formik.handleChange} onBlur={formik.handleBlur} />
													{formik.touched.hora && formik.errors.hora ? (
														<div className="text-danger">
															{formik.errors.hora}
														</div>
													) : null}
												<label htmlFor="pt-hora">Hora</label>
											</div>
										</div>
									</div>
									<div className="row g-2">
										<div className="col-md">
											<div className="form-floating mt-1">
												<input id="pt-asientos_disponibles" name="asientos_disponibles" value={formik.values.asientos_disponibles} className={formik.touched.asientos_disponibles && formik.errors.asientos_disponibles ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="number" placeholder="Ej: 3" onChange={formik.handleChange} onBlur={formik.handleBlur} />
													{formik.touched.asientos_disponibles && formik.errors.asientos_disponibles ? (
														<div className="text-danger">
															{formik.errors.asientos_disponibles}
														</div>
													) : null}
												<label htmlFor="pt-asientos_disponibles">Asientos Disponibles</label>
											</div>
										</div>
										<div className="col-md">
											<div className="form-floating mt-1">
												<input id="pt-costo_asiento_uy" name="costo_asiento_uy" value={formik.values.costo_asiento_uy} className={formik.touched.costo_asiento_uy && formik.errors.costo_asiento_uy ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="number" placeholder="Ej: 150" onChange={formik.handleChange} onBlur={formik.handleBlur} />
													{formik.touched.costo_asiento_uy && formik.errors.costo_asiento_uy ? (
														<div className="text-danger">
															{formik.errors.costo_asiento_uy}
														</div>
													) : null}
												<label htmlFor="pt-costo_asiento_uy">Costo por Asiento</label>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-bs-dismiss="modal">
								Cancelar
							</button>
							<button type="submit" form='pt-form' className="btn btn-primary">
								Publicar
							</button>
						</div>
					</div>
				</div>
			</div>
			<NuevoVehiculo/>
			<div className="toast align-items-center text-white border-0 top-0 left-0 position-fixed" style={{zIndex: "100"}}ref={responseMessage} role="alert" aria-live="assertive" aria-atomic="true">
				<div className="d-flex">
					<div className="toast-body">
					{responseValue}
					</div>
				</div>
			</div>
		</>
	)
};
