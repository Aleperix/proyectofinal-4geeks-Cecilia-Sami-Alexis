import React, {useContext, useRef} from "react";
import {Context} from "../store/appContext";
import defaultAvatarUrl from "../../img/defaultAvatar.png"
import {Link, useLocation, useNavigate} from "react-router-dom";
import { NuevoViaje } from "./nuevoviaje";
import { SearchC } from "./search_c";

export const Navbar = () => {
	const navigate = useNavigate()
	const {store, actions}= useContext(Context)
	const searchDropdown = useRef()

	const handleLogout = ()=>{
		let onLogged = actions.logout();
		if(!onLogged){
			navigate('/')
		}
	}

	const toggleDropdown = ()=> {
		if (!searchDropdown.current.classList.contains("show")) {
			searchDropdown.current.classList.add('show');
		} else {
			searchDropdown.current.classList.remove('show');
		}
	  }

	return (
		useLocation().pathname != "/login" ? useLocation().pathname != "/register" ?
		<>
		<nav className="navbar navbar-expand-lg navbar-expand-xl navbar-light bg-light">
			<div className="container">
				<Link className="navbar-brand" to="/">{store.siteName}</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<SearchC/>
				<div className="collapse navbar-collapse" id="navbarNavDropdown">
				{!store.auth ?
					<ul className="navbar-nav ms-auto">
						<li className="nav-item d-none d-lg-block d-xl-block">
							<Link type="button" to="/login" className="btn btn-outline-primary mx-1">Iniciar Sesión</Link>
						</li>
						<li className="nav-item d-none d-lg-block d-xl-block">
							<Link type="button" to="/register" className="btn btn btn-success">Registrarse</Link>
						</li>
						<li className="nav-item d-xl-none d-lg-none">
							<Link className="nav-link" to="/login">Iniciar Sesión</Link>
						</li>
						<li className="nav-item d-xl-none d-lg-none">
							<Link className="nav-link" to="/register">Registrarse</Link>
						</li>
					</ul>
						:
					<ul className="navbar-nav ms-auto">
						{/* <li className="nav-item">
							<Link className="nav-link active text-secondary" aria-current="page" to="/search">Buscar</Link>
						</li> */}
						<li className="nav-item">
							<span className="nav-link active text-secondary" aria-current="page" data-bs-toggle="modal" data-bs-target="#postTravel" role="button">Publicar un Viaje</span>
						</li>
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								<img className="border border-2 rounded-circle" src={store.usuario.url_avatar == null ? defaultAvatarUrl : store.usuario.url_avatar} width="30px" alt="Imagen de Perfil" />
								<span> {store.usuario.nombre_usuario}</span>
							</a>
							<ul className="dropdown-menu dropdown-menu-end">
								<li><Link className="dropdown-item" to={"/perfil/"+store.usuario.id}><i className="fas fa-user"></i> Perfil</Link></li>
								<li><Link className="dropdown-item" to={"/confperfil/"+store.usuario.id}><i className="fas fa-cog"></i> Configuración de cuenta</Link></li>
								<li role="button" data-bs-toggle="modal" data-bs-target="#logoutadvert"><span className="dropdown-item"><i className="fas fa-sign-out-alt"></i> Cerrar Sesión</span></li>
							</ul>
						</li>						
					</ul>}
				</div>
			</div>
		</nav>
		<div className="modal fade" id="logoutadvert" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="logoutAdvertLabel" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<h1 className="modal-title fs-5 text-danger" id="logoutAdvertLabel">ADVERTENCIA!</h1>
				</div>
				<div className="modal-body">
					¿Seguro/a que deseas cerrar tu sesión?
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
					<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleLogout()}>Confirmar</button>
				</div>
			</div>
		</div>
	</div>
	<NuevoViaje />
	</>
		:
		false
		:
		false
	);
};
