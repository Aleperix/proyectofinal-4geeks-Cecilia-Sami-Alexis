import React, { useState, useContext, useRef} from "react";
import { useNavigate} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from "../store/appContext";
import { NuevoVehiculo } from "./newvehicle";

export const ConfPerfil = () => {
	const { store, actions } = useContext(Context);
	const departamentos = require("../data/departamentos.json");
	const [travelError, setTravelError] = useState("");
	const navigate = useNavigate();
	const mostrarAlert = useRef();
	const responseMessage = useRef()
	const [responseValue, setResponseValue] = useState();

	const formik = useFormik({
		initialValues: {nombre_usuario: '', clave: '', correo: '', celular: '', departamento: '', ciudad: '', genero: '', sobre_mi: '', preferencias: []},
		validationSchema: Yup.object({
			nombre_usuario: Yup.string().min(5, 'Tu nombre de usuario debe contener 5 caracteres o más').max(20, 'Tu nombre de usuario no debe contener más de 20 caracteres'),
			clave: Yup.string().min(6, 'Tu contraseña debe contener 6 caracteres o más'),
			correo: Yup.string().email('Correo electrónico inválido'),
			celular: Yup.string().min(8, 'Tu celular debe contener 8 dígitos').max(9, 'Tu celular debe contener 9 dígitos'),
			departamento: Yup.string(),
			ciudad: Yup.string().min(3, 'La ciudad debe contener 3 caracteres o más'),
			genero: Yup.string(),
			sobre_mi: Yup.string().min(20, 'La descripción debe contener 20 caracteres o más'),
			preferencias: Yup.array(),
		}),
		onSubmit: values => {
			values.celular = Number(values.celular)
			if(!values.preferencias.length < 1){values.preferencias = values.preferencias.join(",")}
			Object.keys(values).forEach(key => {
				if (values[key] == '' || values[key] == null) {
						 delete values[key];
				  }
				});
			console.log(values);
			handleSubmit(values)
		},
	  });

	const handleSubmit = async (values) => {
		const response = await actions.modifyUser(store.usuario.id, values)
		console.log(response);
		if (response.status == 200) {
            setTimeout(() => {mostrarAlert.current.classList.add('d-none'), mostrarAlert.current.classList.remove('alert-success')}, 3000);
            mostrarAlert.current.classList.remove('d-none');
            mostrarAlert.current.classList.add('alert-success');
            setResponseValue(response.message);
			mostrarAlert.current.scrollIntoView()
        }else if(response.status == 404 || response.status == 403){
            setTimeout(() => {mostrarAlert.current.classList.add('d-none'), mostrarAlert.current.classList.remove('alert-danger')}, 5000);
            mostrarAlert.current.classList.remove('d-none');
            mostrarAlert.current.classList.add('alert-danger')
            setResponseValue(response.message);
        }
	}
	

	return (
		store.auth &&
		<>
			<div className="modal fade" id="confPerfil" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="confPerfilLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="confPerfilLabel">
								Modificar Perfil
							</h1>
						</div>
						<div className="modal-body">
							<div className="container">
								<p className="text-muted text-center">Los campos no son requeridos y se pueden dejar vacíos para no cambiar sus datos</p>
								<form className="column g-3" id="cp-form" onSubmit={formik.handleSubmit}>
									<div className="alert d-none" ref={mostrarAlert} role="alert">
										{responseValue}
									</div>
									<div className="form-floating mt-1">
										<input id="cp-nombre_usuario" name="nombre_usuario" value={formik.values.nombre_usuario} className={formik.touched.nombre_usuario && formik.errors.nombre_usuario ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: Juantony55" onChange={formik.handleChange} onBlur={formik.handleBlur} />
											{formik.touched.nombre_usuario && formik.errors.nombre_usuario ? (
												<div className="text-danger">
													{formik.errors.nombre_usuario}
												</div>
											) : null}
										<label htmlFor="r-nombre_usuario">Usuario</label>
									</div>
									<div className="form-floating mt-1">
										<input id="cp-celular" name="celular" value={formik.values.celular} className={formik.touched.celular && formik.errors.celular ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="number" placeholder="Ej: 097654321" onChange={formik.handleChange} onBlur={formik.handleBlur} />
											{formik.touched.celular && formik.errors.celular ? (
												<div className="text-danger">
													{formik.errors.celular}
												</div>
											) : null}
										<label htmlFor="cp-celular">Celular</label>
									</div>
									<div className="form-floating mt-1">
										<input id="cp-clave" name="clave" value={formik.values.clave} className={formik.touched.clave && formik.errors.clave ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="password" placeholder="Ej: Algo que recuerdes muy bien" onChange={formik.handleChange} onBlur={formik.handleBlur} />
											{formik.touched.clave && formik.errors.clave ? (
												<div className="text-danger">
													{formik.errors.clave}
												</div>
											) : null}
										<label htmlFor="cp-clave">Contraseña</label>
									</div>
									<div className="form-floating mt-1">
										<input id="cp-correo" name="correo" value={formik.values.correo} className={formik.touched.correo && formik.errors.correo ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: juanperez@dominio.tld" onChange={formik.handleChange} onBlur={formik.handleBlur} />
											{formik.touched.correo && formik.errors.correo ? (
												<div className="text-danger">
													{formik.errors.correo}
												</div>
											) : null}
										<label htmlFor="cp-correo">Correo</label>
									</div>
									<div className="row g-2">
										<div className="col-md">
											<div className="form-floating mt-1">
												<select id="cp-departamento" name="departamento" value={formik.values.departamento} className={formik.touched.departamento && formik.errors.departamento ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} onChange={formik.handleChange} onBlur={formik.handleBlur}>
													<option disabled value="">
														-- Selecciona una opción --
													</option>
													{departamentos.map((element, index) => {
														return (
															<option value={element.departamento} key={index}>
																{element.departamento}
															</option>
														);
													})}
												</select>
												{formik.touched.departamento && formik.errors.departamento ? (
													<div className="text-danger">
														{formik.errors.departamento}
													</div>
												) : null}
												<label htmlFor="cp-departamento">Departamento</label>
											</div>
										</div>
										<div className="col-md">
											<div className="form-floating mt-1">
												<input id="cp-ciudad" name="ciudad" value={formik.values.ciudad} className={formik.touched.ciudad && formik.errors.ciudad ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: Carrasco" onChange={formik.handleChange} onBlur={formik.handleBlur} />
													{formik.touched.ciudad && formik.errors.ciudad ? (
														<div className="text-danger">
															{formik.errors.ciudad}
														</div>
													) : null}
												<label htmlFor="cp-ciudad">Ciudad</label>
											</div>
										</div>
									</div>
									<div className="form-floating my-1">
										<select id="cp-genero" name="genero" value={formik.values.genero} className={formik.touched.genero && formik.errors.genero ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} onChange={formik.handleChange} onBlur={formik.handleBlur}>
											<option disabled value="">
												-- Selecciona una opción --
											</option>
											<option value="Femenino">Femenino</option>
											<option value="Masculino">Masculino</option>
											<option value="No-Binario">No Binario</option>
										</select>
										{formik.touched.genero && formik.errors.genero ? (
											<div className="text-danger">
												{formik.errors.genero}
											</div>
										) : null}
										<label htmlFor="cp-genero">Género</label>
									</div>
									<div className="form-floating mt-1">
										<textarea id="cp-sobre_mi" name="sobre_mi" value={formik.values.sobre_mi} className={formik.touched.sobre_mi && formik.errors.sobre_mi ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} placeholder="Ej: Me llamo Juan Pérez y me gusta utilizar Fromtony" style={{height: "100px"}} onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
										{formik.touched.sobre_mi && formik.errors.sobre_mi ? (
											<div className="text-danger">
												{formik.errors.sobre_mi}
											</div>
										) : null}
										<label htmlFor="cp-sobre_mi">Sobre mi</label>
									</div>
									<div className="my-1">
										<select id="cp-preferencias" name="preferencias" value={formik.values.preferencias} className={formik.touched.preferencias && formik.errors.preferencias ? "form-select border border-danger bg-danger bg-opacity-25" : "form-select"} multiple aria-label="multiple select" onChange={formik.handleChange} onBlur={formik.handleBlur}>
											<option disabled value="">
												-- Preferencias --
											</option>
											<option value="mate">Mate</option>
											<option value="no_fumar">No Fumar</option>
											<option value="mascotas">Mascotas</option>
											<option value="ninguna">Ninguna</option>
										</select>
										{formik.touched.preferencias && formik.errors.preferencias ? (
											<div className="text-danger">
												{formik.errors.preferencias}
											</div>
										) : null}
									</div>
								</form>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-bs-dismiss="modal">
								Cancelar
							</button>
							<button type="submit" form='cp-form' className="btn btn-primary">
								Publicar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};
