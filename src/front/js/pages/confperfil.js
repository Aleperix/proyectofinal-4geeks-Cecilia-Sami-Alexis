import React, { useContext } from "react";
import { Context } from "../store/appContext";
export const ConfPerfil = () => {
	const { store, actions } = useContext(Context);
	const departamentos = require('../data/departamentos.json');

	return (
		<div className="container d-flex justify-content-center align-items-center">
			<form className="w-50 m-5">
				<div className="">
					<h3>Datos Personales</h3>
				</div>
				<div className="mb-3">
					<label htmlFor="dp-nombre" className="form-label">
						Nombre
					</label>
					<input type="text" className="form-control" id="dp-nombre" placeholder="Ingresa tu nombre..." />
				</div>
				<div className="mb-3">
					<label htmlFor="pv-apellido" className="form-label">
						Apellido
					</label>
					<input type="text" className="form-control" id="dp-apellido" placeholder="Ingresa tu apellido..." />
				</div>
				<div className="mb-3">
					<label htmlFor="dp-correo" className="form-label">
						Correo
					</label>
					<input type="email" className="form-control" id="dp-correo" placeholder="Ingresa tu correo..." />
				</div>
				<div className="mb-3">
					<label htmlFor="dp-clave" className="form-label">
						Contraseña
					</label>
					<input type="password" className="form-control" id="dp-clave" placeholder="Ingresa una nueva contraseña..." />
				</div>
				<div className="mb-3">
					<label htmlFor="dp-confirmarclave" className="form-label">
						Confirmar Contraseña
					</label>
					<input type="password" className="form-control" id="dp-confirmarclave" placeholder="Confirma tu nueva contraseña..." />
				</div>
				<label htmlFor="dp-ciudad" className="form-label">
					Ciudad
				</label>
				<select className="form-select" defaultValue="" id="dp-ciudad">
					<option value="" disabled>-- Selecciona una opción --</option>
					{departamentos.map((element, index) => {
								return (
									<option value={element.departamento} key={index}>
										{element.departamento}
									</option>
								);
							})}
				</select>

				<button type="button" className="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
					Guardar cambios
				</button>

				<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="staticBackdropLabel">
									Advertencia
								</h1>
							</div>
							<div className="modal-body">¿Seguro/a que quieres guardar los cambios?</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-danger" data-bs-dismiss="modal">
									Cancelar
								</button>
								<button type="button" className="btn btn-primary" data-bs-dismiss="modal">
									Confirmar
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
