import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Viajes = () => {
	const { store } = useContext(Context);
	const [showModal, setShowModal] = useState(false)
	return (
		<>
		<div className="container overflow-auto position-relative">
			<div className="card ">
				<ul className="list-group list-group-flush">
					{store.viajes.map((element, i) => {
						return (
							<li className="list-group-item  align-items-center" key={i} role="button">
								<Link to={"/viaje/" + (i + 1)} className="text-decoration-none text-dark">
									<div className="d-flex flex-row flex-wrap flex-sm-wrap flex-md-wrap justify-content-between">
										<div className="d-flex align-items-center justify-content-start col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-break">
											{element.desde} <i className="fas fa-chevron-right"></i> {element.hasta}
										</div>
										<div className="d-flex align-items-center justify-content-start justify-content-sm-start justify-content-md-start col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
											<i className="fas fa-calendar-alt"></i> {String(element.fecha).substring(6, 8)+"/"+String(element.fecha).substring(4, 6)+"/"+String(element.fecha).substring(0, 4)}
										</div>
										<div className="d-flex align-items-center justify-content-start justify-content-sm-start justify-content-md-start col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
											<i className="fas fa-clock"></i> {String(element.hora).substring(0, 2)+":"+String(element.hora).substring(2, 4)}
										</div>
										<div className="d-flex align-items-center justify-content-start justify-content-sm-start justify-content-md-start col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2">
											<i className="fas fa-money-bill-wave"></i> {element.costo_asiento_uy}
										</div>
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="position-sticky bottom-0 d-flex">
				<button className="btn btn-primary me-md-2 ms-auto m-1" type="button" data-bs-toggle="modal" data-bs-target="#postTravel">
					Publicar Viaje
				</button>
			</div>
		</div>
		</>
	);
};
