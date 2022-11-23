import React from "react";
import {Link, useLocation} from "react-router-dom";
import logo from "../../img/logo.png"
import { ConfPerfil } from "./conperfil";


export const Footer = () => {
	return (
		useLocation().pathname != "/login" ? useLocation().pathname != "/register" ?
			<>
			<ConfPerfil/>
			<footer className="footer">
				<div className="row d-flex justify-content-center flex-xs-wrap flex-sm-wrap flex-md-wrap px-5 pt-5 bg-light text-primary">
					<div className="text-xs-start text-sm-start text-md-center text-lg-center text-xl-center col mt-2">
						<p className="h5">Viajes Compartidos.</p>
						<img src={logo} alt="Logo Fromtony" width="30%"/>
					</div>
					<div className="col mt-2">
						<p className="h5 mb-1">Contacto</p>
						<span className="text-secondary text-decoration-none d-block">webmaster@fromtony.com.uy</span>
						<span className="text-secondary text-decoration-none d-block">+598 97 654 321</span>
					</div>
					<div className="col mt-2" >
						<p className="h5 mb-1" >Acerca de</p> 
						<Link className="text-secondary text-decoration-none d-block" to="/nosotros">Sobre Nosotros</Link>
						<Link className="text-secondary text-decoration-none d-block" to="/faq">Ayuda y preguntas</Link>
					</div>
					<div className="col mt-2">
						<p className="h5 mb-1">Terminos y Políticas</p>
						<Link className="text-secondary text-decoration-none d-block" to="/terminos">Condiciones de Uso</Link>
						<Link className="text-secondary text-decoration-none d-block" to="/politicas">Políticas de Privacidad</Link>
					</div>
						<p className="text-xs-start text-sm-start text-md-center text-lg-center text-xl-center mt-4">Made with <i className="fa fa-heart text-danger"/> by Alexis, Cecilia & Sami.</p>
				</div>
			</footer>
			</>
		:
		false
		:
		false
	);
};
