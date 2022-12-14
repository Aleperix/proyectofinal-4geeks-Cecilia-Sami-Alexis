import React, { useContext, useLayoutEffect, useState, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from "../store/appContext";
import logo from "../../img/logo3.png"

export const Registro = () => {

	const { store, actions } = useContext(Context);
	const departamentos = require("../data/departamentos.json");
	const [depIndex, setDepIndex] = useState(Math.floor(Math.random() * departamentos.length))
	const [loginError, setLoginError] = useState("");
	const navigate = useNavigate();
	const mostrarAlert = useRef("");

	const location = useLocation();

	const formik = useFormik({
		initialValues: {nombre: '', apellido: '', nombre_usuario: '', clave: '', confClave: '', correo: '', confCorreo: '', celular: '', departamento: '', ciudad: '', fecha_nacimiento: '', genero: ''},
		validationSchema: Yup.object({
			nombre: Yup.string().min(2, 'Tu nombre debe contener 2 caracteres o más').required('Este campo es requerido'),
			apellido: Yup.string().min(2, 'Tu apellido debe contener 2 caracteres o más').required('Este campo es requerido'),
			nombre_usuario: Yup.string().min(5, 'Tu nombre de usuario debe contener 5 caracteres o más').max(20, 'Tu nombre de usuario no debe contener más de 20 caracteres').required('Este campo es requerido'),
			clave: Yup.string().min(6, 'Tu contraseña debe contener 6 caracteres o más').required('Este campo es requerido'),
			confClave: Yup.string().oneOf([Yup.ref('clave'), null], 'Las contraseñas deben ser iguales').required('Este campo es requerido'),
			correo: Yup.string().email('Correo electrónico inválido').required('Este campo es requerido'),
			confCorreo: Yup.string().oneOf([Yup.ref('correo'), null], 'Los correos deben ser iguales').required('Este campo es requerido'),
			celular: Yup.string().min(8, 'Tu celular debe contener 8 dígitos').max(9, 'Tu celular debe contener 9 dígitos').required('Este campo es requerido'),
			departamento: Yup.string().required('Este campo es requerido'),
			ciudad: Yup.string().min(3, 'La ciudad debe contener 3 caracteres o más').required('Este campo es requerido'),
			fecha_nacimiento: Yup.date().max(new Date(), '¿Acaso vienes del futuro?').required('Este campo es requerido'),
			genero: Yup.string().required('Este campo es requerido'),
		}),
		onSubmit: values => {
			values.celular = Number(values.celular)
		  	console.log(values);
		  	handleSubmit(values)
		},
	  });

	const handleSubmit = async (data) => {
		let registered = await actions.register(data);
		if (registered == true) {
			navigate("/register/confirm");
		} else {
			setTimeout(() => {
				mostrarAlert.current.classList.add("d-none");
			}, 3000);
			mostrarAlert.current.classList.remove("d-none");
			setLoginError(registered.message);
			mostrarAlert.current.scrollIntoView()
		}
	};

	useLayoutEffect(() => {
		window.scrollTo(0, 0)
		document.title = store.siteName+" - Registro"
	}, [location]);

	return (
		<div className="contenedor d-flex align-items-center vh-100" style={{ backgroundImage: 'url("' + departamentos[depIndex].img + '")', backgroundSize: "cover" }}>
			<div className="container text-center bg-white p-1 h-100" style={{ width: "35rem" }}>
				{!store.auth ? (
					<form onSubmit={formik.handleSubmit}>
						<img className="mb-4" src={logo} alt="Logo Fromtony" />
						<h1 className="h3 mb-3 fw-normal">Registro</h1>
						<div className="alert alert-danger d-none" ref={mostrarAlert} role="alert">
							{loginError}
						</div>
						<div className="row g-2">
							<div className="col-md">
								<div className="form-floating mt-1">
									<input id="r-nombre" name="nombre" value={formik.values.nombre} className={formik.touched.nombre && formik.errors.nombre ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: Juan" onChange={formik.handleChange} onBlur={formik.handleBlur} />
									{formik.touched.nombre && formik.errors.nombre ? (
										<div className="text-danger">
											{formik.errors.nombre}
										</div>
									) : null}
									<label htmlFor="r-nombre">Nombre</label>
								</div>
							</div>
							<div className="col-md">
								<div className="form-floating mt-1">
									<input id="r-apellido" name="apellido" value={formik.values.apellido} className={formik.touched.apellido && formik.errors.apellido ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: Pérez" onChange={formik.handleChange} onBlur={formik.handleBlur} />
									{formik.touched.apellido && formik.errors.apellido ? (
										<div className="text-danger">
											{formik.errors.apellido}
										</div>
									) : null}
									<label htmlFor="r-apellido">Apellido</label>
								</div>
							</div>
						</div>
						<div className="row g-2">
							<div className="col-md">
								<div className="form-floating mt-1">
									<input id="r-nombre_usuario" name="nombre_usuario" value={formik.values.nombre_usuario} className={formik.touched.nombre_usuario && formik.errors.nombre_usuario ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: Juantony55" onChange={formik.handleChange} onBlur={formik.handleBlur} />
										{formik.touched.nombre_usuario && formik.errors.nombre_usuario ? (
											<div className="text-danger">
												{formik.errors.nombre_usuario}
											</div>
										) : null}
									<label htmlFor="r-nombre_usuario">Usuario</label>
								</div>
							</div>
							<div className="col-md">
								<div className="form-floating mt-1">
									<input id="r-celular" name="celular" value={formik.values.celular} className={formik.touched.celular && formik.errors.celular ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="number" placeholder="Ej: 097654321" onChange={formik.handleChange} onBlur={formik.handleBlur} />
										{formik.touched.celular && formik.errors.celular ? (
											<div className="text-danger">
												{formik.errors.celular}
											</div>
										) : null}
									<label htmlFor="r-celular">Celular</label>
								</div>
							</div>
						</div>
						<div className="row g-2">
							<div className="col-md">
								<div className="form-floating mt-1">
									<input id="r-clave" name="clave" value={formik.values.clave} className={formik.touched.clave && formik.errors.clave ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="password" placeholder="Ej: Algo que recuerdes muy bien" onChange={formik.handleChange} onBlur={formik.handleBlur} />
										{formik.touched.clave && formik.errors.clave ? (
											<div className="text-danger">
												{formik.errors.clave}
											</div>
										) : null}
									<label htmlFor="r-clave">Contraseña</label>
								</div>
							</div>
							<div className="col-md">
								<div className="form-floating mt-1">
									<input id="r-confClave" name="confClave" value={formik.values.confClave} className={formik.touched.confClave && formik.errors.confClave ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="password" placeholder="Lo mismo que el campo anterior" onChange={formik.handleChange} onBlur={formik.handleBlur} />
										{formik.touched.confClave && formik.errors.confClave ? (
											<div className="text-danger">
												{formik.errors.confClave}
											</div>
										) : null}
									<label htmlFor="r-confClave">Confirmar Contraseña</label>
								</div>
							</div>
						</div>
						<div className="row g-2">
							<div className="col-md">
								<div className="form-floating mt-1">
									<input id="r-correo" name="correo" value={formik.values.correo} className={formik.touched.correo && formik.errors.correo ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: juanperez@dominio.tld" onChange={formik.handleChange} onBlur={formik.handleBlur} />
										{formik.touched.correo && formik.errors.correo ? (
											<div className="text-danger">
												{formik.errors.correo}
											</div>
										) : null}
									<label htmlFor="r-correo">Correo</label>
								</div>
							</div>
							<div className="col-md">
								<div className="form-floating mt-1">
									<input id="r-confCorreo" name="confCorreo" value={formik.values.confCorreo} className={formik.touched.confCorreo && formik.errors.confCorreo ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="confCorreo" placeholder="Lo mismo que el campo anterior" onChange={formik.handleChange} onBlur={formik.handleBlur} />
										{formik.touched.confCorreo && formik.errors.confCorreo ? (
											<div className="text-danger">
												{formik.errors.confCorreo}
											</div>
										) : null}
									<label htmlFor="r-confCorreo">Confirmar Correo</label>
								</div>
							</div>
						</div>
						<div className="row g-2">
							<div className="col-md">
								<div className="form-floating mt-1">
									<select id="r-departamento" name="departamento" value={formik.values.departamento} className={formik.touched.departamento && formik.errors.departamento ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} onChange={formik.handleChange} onBlur={formik.handleBlur}>
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
									<label htmlFor="r-departamento">Departamento</label>
								</div>
							</div>
							<div className="col-md">
								<div className="form-floating mt-1">
									<input id="r-ciudad" name="ciudad" value={formik.values.ciudad} className={formik.touched.ciudad && formik.errors.ciudad ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: Carrasco" onChange={formik.handleChange} onBlur={formik.handleBlur} />
										{formik.touched.ciudad && formik.errors.ciudad ? (
											<div className="text-danger">
												{formik.errors.ciudad}
											</div>
										) : null}
									<label htmlFor="r-ciudad">Ciudad</label>
								</div>
							</div>
						</div>
						<div className="row g-2">
							<div className="col-md">
								<div className="form-floating my-1">
									<input id="r-fecha_nacimiento" name="fecha_nacimiento" value={formik.values.fecha_nacimiento} className={formik.touched.fecha_nacimiento && formik.errors.fecha_nacimiento ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="date" placeholder="Ej: Juantony55" onChange={formik.handleChange} onBlur={formik.handleBlur} />
										{formik.touched.fecha_nacimiento && formik.errors.fecha_nacimiento ? (
											<div className="text-danger">
												{formik.errors.fecha_nacimiento}
											</div>
										) : null}
									<label htmlFor="r-fecha_nacimiento">Fecha de Nacimiento</label>
								</div>
							</div>
							<div className="col-md">
								<div className="form-floating my-1">
									<select id="r-genero" name="genero" value={formik.values.genero} className={formik.touched.genero && formik.errors.genero ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} onChange={formik.handleChange} onBlur={formik.handleBlur}>
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
									<label htmlFor="r-genero">Género</label>
								</div>
							</div>
						</div>
						<button type="submit" className="w-100 btn btn-lg btn-primary mb-2">
							Enviar
						</button>
						<span>
							¿Ya estás registrado/a? <Link to="/login">Inicia sesión!</Link>
						</span>
					</form>
				) : (
					<div className="container text-danger bg-white p-3">Ya tienes una sesión activa!</div>
				)}
			</div>
		</div>
	);
};
