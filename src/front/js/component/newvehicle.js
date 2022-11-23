import React, { useState, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import {Link, useLocation} from "react-router-dom";

export const NuevoVehiculo = () => {
	const { store, actions } = useContext(Context);
	const [nombre, setNombre] = useState();
	const [modelo, setModelo] = useState();
	const [kmsPorLitro, setKmsPorLitro] = useState();
	const [cantidadAsientos, setCantidadAsientos] = useState();

	const responseMessage = useRef()
	const [responseValue, setResponseValue] = useState();

	const handleSubmit = async () => {
		let formData = {
            id_usuario: store.usuario.id,
			nombre: nombre,
			modelo: modelo,
			kms_por_litro: kmsPorLitro,
			cantidad_asientos: cantidadAsientos,

		}
		const response = await actions.postVehicle(formData)
		console.log(response);
		if (response.status == 200) {
			setTimeout(() => {
				responseMessage.current.classList.remove("bg-success", "show", "animate__fadeInLeft");
			}, 3000);
			responseMessage.current.classList.add("bg-success", "show", "animate__fadeInLeft");
			setResponseValue(response.message)
			actions.isAuth()
			let myModal = bootstrap.Modal.getInstance(document.querySelector("#postTravel"))
			myModal.show();
		}else{
			setTimeout(() => {
				responseMessage.current.classList.remove("bg-danger", "show", "animate__fadeInLeft");
			}, 3000);
			responseMessage.current.classList.add("bg-danger", "show", "animate__fadeInLeft");
			setResponseValue(response.message)
		}
		clearFields()
	}

	function clearFields(){
		setNombre("")
        setModelo("")
        setKmsPorLitro("")
        setCantidadAsientos("")
	}

	return (
		<>
			<div className="modal fade" id="postVehicle" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="postVehicleLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="postVehicleLabel">
								Agregar Vehículo
							</h1>
						</div>
						<div className="modal-body">
							<div className="container">
								<form className="row g-2" id="travelForm" onSubmit={(e) => e.preventDefault()}>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input value={nombre} type="text" className="form-control" placeholder="Ej: Escarabajo" id="av-nombre" onChange={(e) => setNombre(e.target.value)}></input>
                                            <label htmlFor="av-nombre">Nombre</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input value={modelo} type="text" className="form-control" placeholder="Ej: Volkswagen Fusca" id="av-modelo" onChange={(e) => setModelo(e.target.value)}></input>
                                            <label htmlFor="av-modelo">Modelo</label>
                                        </div>
                                    </div>
									<div className="row g-2">
										<div className="col-md">
											<div className="form-floating mt-2">
												<input value={kmsPorLitro} type="number" min="1" className="form-control" id="av-kmsporlitro" placeholder="Ej: 20" onChange={(e) => setKmsPorLitro(e.target.value)} />
												<label htmlFor="av-kmsporlitro">Kilómetros por Litro</label>
											</div>
										</div>
										<div className="col-md">
											<div className="form-floating mt-2">
												<input value={cantidadAsientos} type="number" className="form-control" id="av-cantidadasientos" placeholder="Ej: 4" onChange={(e) => setCantidadAsientos(e.target.value)} />
												<label htmlFor="pv-hasta">Cantidad de Asientos</label>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => clearFields()}>
								Cancelar
							</button>
							<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postVehicleConfirm">
								Publicar
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="postVehicleConfirm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="postVehicleConfirmLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="postVehicleConfirmLabel">
								Advertencia
							</h1>
						</div>
						<div className="modal-body">¿Seguro/a que quieres agregar el vehículo?</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-bs-dismiss="modal">
								Cancelar
							</button>
							<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleSubmit()}>
								Confirmar
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="toast align-items-center text-white border-0 top-0 left-0 position-fixed" style={{zIndex: "100"}}ref={responseMessage} role="alert" aria-live="assertive" aria-atomic="true">
				<div className="d-flex">
					<div className="toast-body">
					{responseValue}
					</div>
				</div>
			</div>
		</>
	)
};
