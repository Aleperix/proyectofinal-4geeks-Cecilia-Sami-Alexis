import React from "react";
import {Link, useLocation} from "react-router-dom";

export const Footer = () => {
	return (
		useLocation().pathname != "/login" ? useLocation().pathname != "/register" ?
			<footer className="footer">
				<div className="row d-flex justify-content-center flex-xs-wrap flex-sm-wrap flex-md-wrap px-5 pt-5 bg-light text-primary">
					<div className="col mt-2">
						<p className="h5"> Viajes Compartidos. </p>
					</div>
					<div className="col mt-2">
						<p className="h5 mb-1">Contacto</p>
						<a className="text-secondary text-decoration-none d-block" href="">hola@viajes.com</a>
						<a className="text-secondary text-decoration-none d-block" href="">+598 908 96 18</a>
					</div>
					<div className="col mt-2">
						<p className="h5 mb-1" >Acerca de</p>
						<a className="text-secondary text-decoration-none d-block" href="">Sobre Nosotros</a>
						<a className="text-secondary text-decoration-none d-block" href="">Prensa y Medios</a>
						<a className="text-secondary text-decoration-none d-block" href="">Ayuda</a>
					</div>
					<div className="col mt-2">
						<p className="h5 mb-1">Terminos y Condiciones</p>
						<a className="text-secondary text-decoration-none d-block" href="">Descripción</a>
						<a className="text-secondary text-decoration-none d-block" href="">Condiciones</a>
						<a className="text-secondary text-decoration-none d-block" href="">Política de Privacidad</a>
					</div>
						<p className="text-xs-start text-sm-start text-md-center text-lg-center text-xl-center mt-4">Made with <i className="fa fa-heart text-danger"/> by Alexis, Cecilia & Sami.</p>
				</div>
			</footer>
		:
		false
		:
		false
	);
};
