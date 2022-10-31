import React, {useContext} from "react";
import {Context} from "../store/appContext";
import {Link, useLocation, useNavigate} from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate()
	const {store, actions}= useContext(Context)

	const handleLogout = ()=>{
		let onLogged = actions.logout();
		if(!onLogged){
			navigate('/')
		}
	}
	return (
		useLocation().pathname != "/login" ?
			<nav className="navbar navbar-light bg-light">
				<div className="container">
					<a href="#" className="navbar-brand">Viajes Compartidos</a>
					<div className="collapse-navbar-collapse ms-auto">
						{store.auth ?
						<ul className="list-unstyled d-flex my-auto text-center">
							<li><a className="nav-link active text-secondary" aria-current="page" href="#">Buscar</a></li>
							<li><Link className="nav-link active text-secondary" aria-current="page" to="/nuevoviaje">Publicar un Viaje</Link></li>
							<li><button type="button" onClick={() => handleLogout()} className="btn btn btn-danger">Salir</button></li>
						</ul>
						:
						<ul className="list-unstyled d-flex my-auto text-center">
							<li><Link type="button" to="/login" className="btn btn-outline-primary mx-1">Inicia Sesión</Link></li>
							<li><Link type="button" to="/register" className="btn btn btn-success">Regístrate</Link></li>
						</ul>
						}
					</div>
				</div>
			</nav>
		:
			false
	);
};
