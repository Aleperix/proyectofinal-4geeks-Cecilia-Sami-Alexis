import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Viajes } from "../component/viajes";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="bg-white text-primary p-5 text-center text-sm-start">
				<div className="container">
					<div className="d-flex justify-content-between">
						<div className="mt-5">
							<h1> Económico, ecológico y divertido. </h1>
							<p className="lead text-secondary"> Fromtony es una iniciativa creada con el objetivo de reducir el número de automóviles en la carretera, ayudando así a reducir las emisiones de CO2 y compartir los gastos de aquella persona que utiliza su coche todos los días. A través de una plataforma digital ponemos en contacto a conductores y pasajeros para que puedan compartir sus trayectos en auto .</p>
							<button type="button" className="btn btn-primary btn-lg">
								Más información
							</button>
						</div>
						<img className="img-fluid w-50 d-none d-lg-flex d-xl-flex" src="https://i.imgur.com/GkiluHM.jpg" alt="" />
					</div>
				</div>
				<section className="bg-primary text-light p-5 bg-opacity-75">
					<div className="Container">
						<div className="d-md-flex justify-content-between align-items-center">
							<h3 className="mb-3.mb-md-0 text-center"> Nuestros viajes destacados </h3>
							<Viajes />
						</div>
					</div>
				</section>

				<div className="container d-flex flex-ms-wrap flex-md-wrap justify-content-center">
					<div className="row">
						<div className="col-sm-6 mt-3">
							<div className="card" style={{ maxWidth: "28rem" }}>
								<img src="https://imgur.com/aJjTFph.jpg" className="card-img-top" alt=" portada pasajeros " />
								<div className="card-body">
									<h5 className="card-title"> Elegí un conductor. </h5>
									<p className="card-text text-secondary">Enviás tu solicitud a conductores que puedan llevarte. Podés buscar viajes inmediatos o agendar cuándo viajar.</p>
								</div>
							</div>
						</div>
						<div className="col-sm-6 mt-3">
							<div className="card" style={{ maxWidth: "28rem" }}>
								<img src="https://imgur.com/S8vYnVH.jpg" className="card-img-top" alt=" portada conductores " />
								<div className="card-body">
									<h5 className="card-title">Elegí tu pasajero.</h5>
									<p className="card-text text-secondary">Te llegarán solicitudes de pasajeros y verás cuanto dinero podrás ahorrar compartiendo el viaje.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
