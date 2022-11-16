import React, { useContext, useRef, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const RecupClave = () => {
	const { actions } = useContext(Context);
	const correo = useRef();
	const [recPassMsg, setRecPassMsg] = useState("");
	const mostrarAlert = useRef("");
	const navigate = useNavigate();

	const changePass = async () => {
		const email = correo.current.value;
		const response = await actions.forgotPass({email: email});
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

	return (
		<div className="container">
			<div className=" d-flex justify-content-center align-items-center bg-white">
				<img src="https://i.imgur.com/98dS3PY.jpg" className=" w-50 mx-5" alt="portadarecupcontraseña"></img>
				<form>
					<h3 className="signin-text mb-3">¿Has olvidado tu contraseña?</h3>
					<p>Ingresa el correo electrónico que usas en nuestra aplicación para recuperar tu cuenta:</p>
					<div className="mb-3">
						<div className={"alert d-none"} ref={mostrarAlert} role="alert">{recPassMsg}</div>
						<div className="form-floating">
							<input type="email" ref={correo} className="form-control" id="fg-correo" placeholder="Ingresa el correo que usas en nuestro sitio" required />
							<label htmlFor="fg-correo">Correo</label>
						</div>
					</div>
					<button type="button" className="btn btn-primary" onClick={() => changePass()}>Recuperar Cuenta</button>
				</form>
			</div>
		</div>
	);
};
