import React, {useContext, useLayoutEffect} from "react";
import {Context} from "../store/appContext";
import {Link, useLocation} from "react-router-dom";

export const Notifications = (props) => {
	const {store, actions}= useContext(Context)

    const location = useLocation();

    const getAcompOwnRequests = async () =>{
        const response = await actions.getAllReq(store.usuario.id, "user")
		console.log(response);
    }

    const getAcompRequests = async () =>{
        const response = await actions.getAllReq(store.usuario.id, "travel")
		console.log(response);
    }

    const modifyReqStatus = async (id, value) =>{
        let response
        if(value == "vista"){
            response = await actions.modifyAcompanante(id, {visto: true})
        }else{
            response = await actions.modifyAcompanante(id, {estado: value})
        }
		console.log(response);
        if(response.status == 200){
            getAcompRequests()
        }
    }

    useLayoutEffect(() => {
		getAcompOwnRequests()
        getAcompRequests()
	}, [location]);

	return (
		<li className={props.mobile == false ? 'nav-item dropdown d-xl-none d-lg-none' : 'nav-item dropdown d-none d-lg-block d-xl-block'}>
            <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {!props.mobile == false ? <i className="fas fa-bell" title="Notificaciones"></i> : <span title="Notificaciones">Notificaciones</span>}<span className={store.userReq.length != 0 || store.viajesReq.length != 0 ? "position-absolute start-75 translate-middle badge rounded-pill bg-danger" : "d-none"} style={{fontSize: "8px"}}>{store.userReq.length+store.viajesReq.length}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
                {store.userReq.length != 0 && <span className="d-flex justify-content-center text-break"><b>Acompañante</b></span>}
                {store?.userReq?.map((element, index) => {
											return(
                                                element.estado == "aceptada" ? <li key={index} onClick={() => modifyReqStatus(element.id, "vista")}><Link className="dropdown-item" to={"/viaje/"+element.viaje.id} title={"Ir al viaje #"+element.viaje.id}>&#10004;{" "+element.viaje.conductor.nombre+" "+element.viaje.conductor.apellido+" "}ha aceptado tu solicutd</Link></li>:
                                                element.estado == "rechazada" && <li key={index}><Link className="dropdown-item" to={"/viaje/"+element.viaje.id}title={"Ir al viaje #"+element.viaje.id} onClick={() => modifyReqStatus(element.id, "vista")}>&#10060;{" "+element.viaje.conductor.nombre+" "+element.viaje.conductor.apellido+" "}ha rechazado tu solicutd</Link></li>
									)})}
                {store.viajesReq.length != 0 && <span className="d-flex justify-content-center"><b>Conductor</b></span>}
                {store?.viajesReq?.map((element, index) => {
											return(
                                                element.estado == "pendiente" && <li className="dropdown-item" key={index}>{element.usuario.nombre+" "+element.usuario.apellido+" "} ha solicitado acompañarte en el viaje #{element.viaje.id+""} <button className="btn alert-success" title="Aceptar Solicitud" onClick={() => modifyReqStatus(element.id, "aceptada")}>&#10004;</button>{" "}<button className="btn alert-danger" title="Rechazar Solicitud" onClick={() => modifyReqStatus(element.id, "rechazada")}>&#10060;</button></li>
									)})}
                {store.userReq.length == 0 && store.viajesReq.length == 0 && <span className="d-flex justify-content-center">Sin notificaciones</span>}
            </ul>
        </li>	
	);
};
