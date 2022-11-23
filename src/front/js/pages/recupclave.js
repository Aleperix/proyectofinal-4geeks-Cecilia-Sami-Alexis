import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from "../store/appContext";

export const RecupClave = () => {
	const { store, actions } = useContext(Context);
	const [recPassMsg, setRecPassMsg] = useState("");
	const mostrarAlert = useRef("");
	const navigate = useNavigate();

	const location = useLocation();

	const formik = useFormik({
		initialValues: {email: ''},
		validationSchema: Yup.object({
			email: Yup.string().email('Correo electrónico inválido').required('Este campo es requerido'),
		}),
		onSubmit: (values, { resetForm }) => {
		  changePass(values)
      resetForm();
		},
	  });

	const changePass = async (values) => {
		const response = await actions.forgotPass(values);
		console.log(response);
		if (response.status == 200) {
			setTimeout(() => {
				mostrarAlert.current.classList.add("d-none"), mostrarAlert.current.classList.remove("alert-success"), navigate("/login");
			}, 3000);
			mostrarAlert.current.classList.remove("d-none");
			mostrarAlert.current.classList.add("alert-success");
			setRecPassMsg(response.message);
		} else if (response.status == 404 || response.status == 204) {
			setTimeout(() => {
				mostrarAlert.current.classList.add("d-none"), mostrarAlert.current.classList.remove("alert-danger");
			}, 5000);
			mostrarAlert.current.classList.remove("d-none");
			mostrarAlert.current.classList.add("alert-danger");
			setRecPassMsg(response.message);
		}
	};

	useLayoutEffect(() => {
		window.scrollTo(0, 0)
		document.title = store.siteName+" - Olvidé mi contraseña"
	}, [location]);

	return (
		<div className="container">
			<div className=" d-flex justify-content-center align-items-center bg-white">
				<img src="https://i.imgur.com/98dS3PY.jpg" className="img-fluid w-50 d-none d-lg-flex d-xl-flex" alt="portadarecupcontraseña"></img>
				<form onSubmit={formik.handleSubmit}>
					<h3 className="signin-text mb-3">¿Has olvidado tu contraseña?</h3>
					<p>Ingresa el correo electrónico que usas en nuestra aplicación para recuperar tu cuenta:</p>
					<div className="mb-3">
						<div className="alert d-none" ref={mostrarAlert} role="alert">{recPassMsg}</div>
						<div className="form-floating mt-1">
							<input id="fg-correo" name="email" value={formik.values.email} className={formik.touched.email && formik.errors.email ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ingresa el correo que utilizas en nuestro sitio" onChange={formik.handleChange} onBlur={formik.handleBlur} />
								{formik.touched.email && formik.errors.email ? (
									<div className="text-danger">
										{formik.errors.email}
									</div>
								) : null}
							<label htmlFor="fg-correo">Correo</label>
						</div>
					</div>
					<button type="submit" className="btn btn-primary">Recuperar Cuenta</button>
				</form>
			</div>
		</div>
	);
};
