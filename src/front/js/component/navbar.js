import React from "react";

export const Navbar = () => {
	return (

	
		<nav className="navbar navbar-light bg-light">
			<div className="container">
			<a href="#" className="navbar-brand">Viajes Compartidos</a>
			
			<div className="collapse-navbar-collapse" id="">
			{/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
			<li className="nav-item">
          
        </li>
		<li className="nav-item">
          
        </li>
			</ul> */}
			<ul className="list-group list-group-horizontal">
  <li className="list-group-item"><a className="nav-link active" aria-current="page" href="#"> Buscar </a></li>
  <li className="list-group-item"><a className="nav-link active" aria-current="page" href="#"> Publicar un Viaje </a></li>
  <li className="list-group-item"><button type="button" className="btn btn-light"> Inicia Sesión </button></li>
  <li className="list-group-item"><button type="button" className="btn btn-primary"> Regístrate </button></li>
</ul>

			 
			
			</div>
			</div>
			<div className="container">
				
				</div>
			
		</nav>
	);
};
