import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Registro = () => {
	const { store, actions } = useContext(Context);
	const myForm = useRef();
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [usuario, setUsuario] = useState("");
	const [clave, setClave] = useState("");
	const [confirmarClave, setConfirmarClave] = useState("");
	const [correo, setCorreo] = useState("");
	const [departamento, setDepartamento] = useState("");
	const [ciudad, setCiudad] = useState("");
	const [fechaNac, setFechaNac] = useState("");
	const [genero, setGenero] = useState("");
	const [validateForm, setValidateForm] = useState(false);
	const [loginError, setLoginError] = useState("");
	// const navigate = useNavigate();
	// const mostrarAlert = useRef("");

	const handleSubmit = async () => {
		if(nombre != "" && apellido != "" && usuario != "" && clave != "" && confirmarClave != "" && correo != ""  && departamento != "" && ciudad != "" && fechaNac != "" && genero != ""){
			console.log("Todo okay");
		}else{
			setValidateForm(true)
		}
		let registered = await actions.register({ 
			nombre: nombre, 
			apellido: apellido, 
			nombre_usuario: usuario, 
			clave: clave, 
			correo: correo, 
			departamento: departamento, 
			ciudad: ciudad, 
			fecha_nacimiento: fechaNac, 
			genero: genero
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
	};

	return (
		<div className="container text-center" style={{ width: "25rem" }}>
			{!store.auth ? (
				<form className={validateForm === false ? "bg-white p-3 needs-validation" : "bg-white p-3 needs-validation was-validated"} onSubmit={(e) => e.preventDefault()}>
					<img className="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
					<h1 className="h3 mb-3 fw-normal">Registro</h1>
					{/* <div className="alert alert-danger d-none" ref={mostrarAlert} role="alert">
							{loginError}
						</div> */}
					<div className="form-floating">
						<input value={nombre} type="text" className="form-control" id="r-nombre" placeholder="minombre" onChange={(e) => setNombre(e.target.value)} required />
						<div className="invalid-feedback">
      						Por favor, ingresa tu nombre.
    					</div>
						<label htmlFor="r-nombre">Nombre</label>
					</div>
					<div className="form-floating mt-1">
						<input value={apellido} type="text" className="form-control" id="r-apellido" placeholder="miapellido" onChange={(e) => setApellido(e.target.value)} required />
						<div className="invalid-feedback">
      						Por favor, ingresa tu apellido
    					</div>
						<label htmlFor="r-apellido">Apellido</label>
					</div>
					<div className="form-floating mt-1">
						<input value={usuario} type="text" className="form-control" id="r-usuario" placeholder="miusuario" onChange={(e) => setUsuario(e.target.value)} required />
						<div className="invalid-feedback">
      						Por favor, ingresa un nombre de usuario.
    					</div>
						<label htmlFor="r-usuario">Usuario</label>
					</div>
					<div className="form-floating mt-1">
						<input value={clave} type="password" className="form-control" id="r-contraseña" placeholder="micontraseña" onChange={(e) => setClave(e.target.value)} required />
						<div className="invalid-feedback">
      						Por favor, ingresa una contraseña.
    					</div>
						<label htmlFor="r-contraseña">Contraseña</label>
					</div>
					<div className="form-floating mt-1">
						<input value={confirmarClave} type="password" className="form-control" id="r-confirmarcontraseña" placeholder="confirmarmicontraseña" onChange={(e) => setConfirmarClave(e.target.value)} required />
						<div className="invalid-feedback">
      						Por favor, ingresa nuevamente la contraseña.
    					</div>
						<label htmlFor="r-confirmarcontraseña">Confirmar Contraseña</label>
					</div>
					<div className="form-floating mt-1">
						<input value={correo} type="email" className="form-control" id="r-correo" placeholder="micorreo" onChange={(e) => setCorreo(e.target.value)} required />
						<div className="invalid-feedback">
      						Por favor, ingresa una dirección de correo válida.
    					</div>
						<label htmlFor="r-correo">Correo</label>
					</div>
					<div className="form-floating mt-1">
						<select className="form-select" id="r-departamento" defaultValue={""} onChange={(e) => setDepartamento(e.target.value)} required>
							<option disabled value="">
								-- Selecciona una opción --
							</option>
							<option value="1">Artigas</option>
							<option value="2">Canelos</option>
							<option value="4">Cerro Largo</option>
							<option value="5">Colonia</option>
							<option value="6">Flores</option>
							<option value="7">Florida</option>
							<option value="8">Lavalleja</option>
							<option value="9">Maldonado</option>
							<option value="10">Paysandú</option>
							<option value="11">Río Negro</option>
							<option value="12">Rivera</option>
							<option value="13">Rocha</option>
							<option value="14">Salto</option>
							<option value="15">San José</option>
							<option value="16">Soriano</option>
							<option value="17">Tacuarembó</option>
							<option value="18">Treinta y Tres</option>
						</select>
						<div className="invalid-feedback">
							Por favor, selecciona un departamento.
						</div>
						<label htmlFor="r-departamento">Departamento</label>
					</div>
					<div className="form-floating mt-1">
						<input value={ciudad} type="text" className="form-control" id="r-ciudad" placeholder="miciudad" onChange={(e) => setCiudad(e.target.value)} required />
						<div className="invalid-feedback">
							Por favor, ingresa tu ciudad.
						</div>
						<label htmlFor="r-ciudad">Ciudad</label>
					</div>
					<div className="form-floating mt-2">
						<input value={fechaNac} type="date" className="form-control" id="r-fechaNac" onChange={(e) => setFechaNac(e.target.value)} required />
						<div className="invalid-feedback">
							Por favor, ingresa tu fecha de nacimiento.
						</div>
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
						<div className="invalid-feedback">
							Por favor, selecciona tu género.
						</div>
						<label htmlFor="r-genero">Género</label>
					</div>
					<button type="submit" className="w-100 btn btn-lg btn-primary mb-2" onClick={() => handleSubmit()}>
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
	);
};
