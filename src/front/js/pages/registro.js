import React, { useContext, useState, useRef } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Registro = () => {

	const formik = useFormik({
		initialValues: {firstName: '', lastName: '', userName: '', password: '', confirmPass: '', email: '', confirmEmail: '', department: '', city: '', birthDate: '', genre: ''},
		validationSchema: Yup.object({
			firstName: Yup.string().min(2, 'Tu nombre debe contener 2 caracteres o más').required('Este campo es requerido'),
			lastName: Yup.string().min(2, 'Tu apellido debe contener 2 caracteres o más').required('Este campo es requerido'),
			userName: Yup.string().min(5, 'Tu nombre de usuario debe contener 5 caracteres o más').max(20, 'Tu nombre de usuario no debe contener más de 20 caracteres').required('Este campo es requerido'),
			password: Yup.string().min(6, 'Tu contraseña debe contener 6 caracteres o más').required('Este campo es requerido'),
			confirmPass: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser iguales'),
			email: Yup.string().email('Correo electrónico inválido').required('Este campo es requerido'),
			confirmEmail: Yup.string().oneOf([Yup.ref('email'), null], 'Los correos deben ser iguales'),
			department: Yup.string().required('Este campo es requerido'),
			department: Yup.string().min(3, 'La ciudad debe contener 3 caracteres o más').required('Este campo es requerido'),
		}),
		onSubmit: values => {
		  alert(JSON.stringify(values, null, 2));
		},
	  });


	const { store, actions } = useContext(Context);
	const departamentos = require("../data/departamentos.json");
	const [depIndex] = useState(Math.floor(Math.random() * departamentos.length))

	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [usuario, setUsuario] = useState("");
	const clave = useRef();
	const confirmarClave = useRef();
	const [passConfMsg, setPassConfMsg] = useState("");
	const correo = useRef();
	const confirmarCorreo = useRef();
	const [emailConfMsg, setEmailConfMsg] = useState("");
	const [departamento, setDepartamento] = useState("");
	const [ciudad, setCiudad] = useState("");
	const [fechaNac, setFechaNac] = useState("");
	const [genero, setGenero] = useState("");
	const [validateForm, setValidateForm] = useState(false);
	const [loginError, setLoginError] = useState("");
	const navigate = useNavigate();
	const mostrarAlert = useRef("");

	const handleSubmit = async () => {
		let empty = actions.verifyEmpty([nombre, apellido, usuario, clave.current.value, confirmarClave.current.value, correo.current.value, confirmarCorreo.current.value, departamento, ciudad, genero]);
		let passMatch = actions.verifyMatch(clave.current.value, confirmarClave.current, setPassConfMsg("Ingresa nuevamente la misma contraseña."), "Ingresa nuevamente la misma contraseña.");
		let emailMatch = actions.verifyMatch(correo.current.value, confirmarCorreo.current, setEmailConfMsg("Ingresa nuevamente el mismo correo."), "Ingresa nuevamente el mismo correo.");
		if (empty === true && passMatch === true && emailMatch === true) {
			let registered = await actions.register({
				nombre: nombre,
				apellido: apellido,
				nombre_usuario: usuario,
				clave: clave.current.value,
				correo: correo.current.value,
				departamento: departamento,
				ciudad: ciudad,
				fecha_nacimiento: Number(fechaNac.replaceAll("-", "")),
				genero: genero,
			});
			if (registered == true) {
				navigate("/");
			} else {
				setTimeout(() => {
					mostrarAlert.current.classList.add("d-none");
				}, 3000);
				mostrarAlert.current.classList.remove("d-none");
				setLoginError(registered.message);
			}
		} else {
			setValidateForm(true);
			return null;
		}
	};

	return (
		<div className="contenedor d-flex align-items-center h-100" style={{ backgroundImage: 'url("' + departamentos[depIndex].img + '")', backgroundSize: "cover" }}>
			<div className="container text-center" style={{ width: "25rem" }}>
				{!store.auth ? (
					<form className={validateForm === false ? "bg-white p-3 needs-validation" : "bg-white p-3 needs-validation was-validated"}>
						<img className="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
						<h1 className="h3 mb-3 fw-normal">Registro</h1>
						<div className="alert alert-danger d-none" ref={mostrarAlert} role="alert">
							{loginError}
						</div>
						<div className="form-floating">
							<input value={nombre} type="text" className="form-control" id="r-nombre" placeholder="minombre" onChange={(e) => setNombre(e.target.value)} required />
							<div className="invalid-feedback">Por favor, ingresa tu nombre.</div>
							<label htmlFor="r-nombre">Nombre</label>
						</div>
						<div className="form-floating mt-1">
							<input value={apellido} type="text" className="form-control" id="r-apellido" placeholder="miapellido" onChange={(e) => setApellido(e.target.value)} required />
							<div className="invalid-feedback">Por favor, ingresa tu apellido</div>
							<label htmlFor="r-apellido">Apellido</label>
						</div>
						<div className="form-floating mt-1">
							<input value={usuario} type="text" className="form-control" id="r-usuario" placeholder="miusuario" onChange={(e) => setUsuario(e.target.value)} required />
							<div className="invalid-feedback">Por favor, ingresa un nombre de usuario.</div>
							<label htmlFor="r-usuario">Usuario</label>
						</div>
						<div className="form-floating mt-1">
							<input ref={clave} type="password" className="form-control" id="r-contraseña" placeholder="micontraseña" onChange={(e) => actions.verifyMatch(e.target.value, confirmarClave.current, setPassConfMsg("Ingresa nuevamente la misma contraseña."), "Ingresa nuevamente la misma contraseña.")} required />
							<div className="invalid-feedback">Por favor, ingresa una contraseña.</div>
							<label htmlFor="r-contraseña">Contraseña</label>
						</div>
						<div className="form-floating mt-1">
							<input ref={confirmarClave} type="password" className="form-control" id="r-confirmarcontraseña" placeholder="confirmarmicontraseña" onChange={(e) => actions.verifyMatch(clave.current.value, e.target, setPassConfMsg("Ingresa nuevamente la misma contraseña."), "Ingresa nuevamente la misma contraseña.")} required />
							<div className="invalid-feedback">{passConfMsg}</div>
							<label htmlFor="r-confirmarcontraseña">Confirmar Contraseña</label>
						</div>
						<div className="form-floating mt-1">
							<input ref={correo} type="email" className="form-control" id="r-correo" placeholder="micorreo" onChange={(e) => actions.verifyMatch(e.target.value, confirmarCorreo.current, setEmailConfMsg("Ingresa nuevamente el mismo correo."), "Ingresa nuevamente el mismo correo.")} required />
							<div className="invalid-feedback">Por favor, ingresa una dirección de correo válida.</div>
							<label htmlFor="r-correo">Correo</label>
						</div>
						<div className="form-floating mt-1">
							<input ref={confirmarCorreo} type="text" className="form-control" id="r-confirmarcorreo" placeholder="micorreo" onChange={(e) => actions.verifyMatch(correo.current.value, e.target, setEmailConfMsg("Ingresa nuevamente el mismo correo."), "Ingresa nuevamente el mismo correo.")} required />
							<div className="invalid-feedback">{emailConfMsg}</div>
							<label htmlFor="r-correo">Confirmar Correo</label>
						</div>
						<div className="form-floating mt-1">
							<select className="form-select" id="r-departamento" defaultValue={""} onChange={(e) => setDepartamento(e.target.value)} required>
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
							<div className="invalid-feedback">Por favor, selecciona un departamento.</div>
							<label htmlFor="r-departamento">Departamento</label>
						</div>
						<div className="form-floating mt-1">
							<input value={ciudad} type="text" className="form-control" id="r-ciudad" placeholder="miciudad" onChange={(e) => setCiudad(e.target.value)} required />
							<div className="invalid-feedback">Por favor, ingresa tu ciudad.</div>
							<label htmlFor="r-ciudad">Ciudad</label>
						</div>
						<div className="form-floating mt-2">
							<input value={fechaNac} type="date" className="form-control" id="r-fechaNac" onChange={(e) => setFechaNac(e.target.value)} required />
							<div className="invalid-feedback">Por favor, ingresa tu fecha de nacimiento.</div>
							<label htmlFor="r-fechaNac">Fecha de Nacimiento</label>
						</div>
						<div className="form-floating my-1">
							<select className="form-select" id="r-genero" defaultValue={""} onChange={(e) => setGenero(e.target.value)} required>
								<option disabled value="">
									-- Selecciona una opción --
								</option>
								<option value="1">Femenino</option>
								<option value="2">Masculino</option>
								<option value="4">No Binario</option>
							</select>
							<div className="invalid-feedback">Por favor, selecciona tu género.</div>
							<label htmlFor="r-genero">Género</label>
						</div>
						<button type="button" className="w-100 btn btn-lg btn-primary mb-2" onClick={() => handleSubmit()}>
							Enviar
						</button>
						<span>
							¿Ya estás registrado/a? <a href="/login">Inicia sesión!</a>
						</span>
					</form>
				) : (
					<div className="container text-danger bg-white p-3">Ya tienes una sesión activa!</div>
				)}
			</div>
		</div>
	);
};
