import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Viajes = () => {
	const { store } = useContext(Context);
	return (
		<div className="container overflow-auto position-relative" style={{ height: "200px" }}>
			<div className="card ">
				<ul className="list-group list-group-flush">
					{store.viajes.map((element, i) => {
						return (
							<li className="list-group-item  align-items-center" key={i} role="button">
								<Link to={"/viaje/" + (i + 1)} className="text-decoration-none text-dark">
									<div className="d-flex flex-row justify-content-between col-12">
										<div className="d-flex align-items-center justify-content-start col-6">
											{element.desde} <i className="fas fa-chevron-right"></i> {element.hasta}
										</div>
										<div className="d-flex align-items-center justify-content-center col-2">
											<i className="fas fa-calendar-alt"></i> {String(element.fecha).substring(0, 2)+"/"+String(element.fecha).substring(2, 4)+"/"+String(element.fecha).substring(4, 8)}
										</div>
										<div className="d-flex align-items-center justify-content-center col-2">
											<i className="fas fa-clock"></i> {String(element.hora).substring(0, 2)+":"+String(element.hora).substring(2, 4)}
										</div>
										<div className="d-flex align-items-center justify-content-center col-2">
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
				<Link className="btn btn-primary me-md-2 ms-auto m-1" type="button" to="/nuevoviaje" style={{ width: "fitContent" }}>
					Publicar Viaje
				</Link>
			</div>
		</div>
	);
};
