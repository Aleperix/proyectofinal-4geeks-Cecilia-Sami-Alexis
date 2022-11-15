import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
export const Buscador = () => {
	const { store, actions } = useContext(Context);
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10)); //Fecha en formato yyyy-mm-dd

	return (
		<div className="container">
            
			<nav className="navbar bg-light my-5">
            <h3 className="d-flex justify-content-center w-100">¿A dónde <span className="text-primary"> quieres ir</span>?</h3>
				<div className="container-fluid">
					<form className="d-flex justify-content-center w-100" role="search">
						<input className="form-control me-2" type="search" placeholder="Origen" aria-label="Search" />
						<input className="form-control me-2" type="search" placeholder="Destino" aria-label="Search" />
						<div className="form-floating">
							<input value={fecha} type="date" className="form-control me-2" id="pv-fecha" onChange={(e) => setFecha(e.target.value)} required />
							<label htmlFor="pv-fecha">Fecha</label>
						</div>
						<button className="btn btn-outline-primary mx-2" type="submit">
							Buscar
						</button>
					</form>
				</div>
			</nav>
		</div>
	);
};
