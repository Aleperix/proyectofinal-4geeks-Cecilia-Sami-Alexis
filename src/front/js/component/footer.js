import React, { Component } from "react";

export const Footer = () => (
	// <footer className="footer mt-auto py-3 text-center">
	
	// 	<p>
	// 		Made with <i className="fa fa-heart text-danger" /> by {"Alexis, Cecilia & Sami "}
			
	// 	</p>
	// </footer>

	<div class="contenedor">

		<div className="row p-5 bg-light text-primary">
			<div className="col-xs-12 col-md-6 col-lg-3">
			<p className="h5"> Viajes Compartidos. </p>
			</div>
			<div className="col-xs-12 col-md-6 col-lg-3">
			<p className="h5 mb-2"> Contacto </p>
			<div className=" mb-1">
				<a className="text-secondary text-decoration-none" href=""> hola@viajes.com </a>
			</div>
			<a className="text-secondary text-decoration-none" href=""> +598 908 96 18 </a>
			</div>
			<div className="col-xs-12 col-md-6 col-lg-3">
			<p className="h5 mb-2" > Acerca de </p>
			<div className=" mb-1">
				<a className="text-secondary text-decoration-none" href=""> Sobre Nosotros </a>
			</div>
			<div className=" mb-1">
				<a className="text-secondary text-decoration-none" href=""> Prensa y Medios </a>
			</div>
			<div className=" mb-1">
				<a className="text-secondary text-decoration-none" href=""> Ayuda </a>
			</div>
			</div>
			<div className="col-xs-12 col-md-6 col-lg-3">
			<p className="h5 mb-2"> Terminos y Condiciones </p>
			<div className=" mb-1">
				<a className="text-secondary text-decoration-none" href=""> Descripción </a>
			</div>
			<div className=" mb-1">
				<a className="text-secondary text-decoration-none" href=""> Condiciones </a>
			</div>
			<div className=" mb-1">
				<a className="text-secondary text-decoration-none" href=""> Política de Privacidad </a>
			</div>
			</div>
			<div className="col-xs-12 pt-3">
			
			<p className= "text-center mt-4"> Made with <i className="fa fa-heart text-danger " /> by {"Alexis, Cecilia & Sami. "}</p>
			</div>
			

		</div>

	</div>
);
