import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import {Link, useLocation, useNavigate} from "react-router-dom";

export const ConfReg = () => {
	const { store, actions } = useContext(Context);
    const codigo = useRef()
    const [confRegMsg, setConfRegMsg] = useState("");
    const mostrarAlert = useRef("")
    const navigate = useNavigate();

    const checkConfirm = async () =>{
        const token = codigo.current.value
        const response = await actions.confReg(token)
        console.log(response);
        if (response.status == 200) {
            setTimeout(() => {mostrarAlert.current.classList.add('d-none'), mostrarAlert.current.classList.remove('alert-success'), navigate("/login")}, 3000);
            mostrarAlert.current.classList.remove('d-none');
            mostrarAlert.current.classList.add('alert-success');
            setConfRegMsg(response.message);
        }else if(response.status == 404){
            setTimeout(() => {mostrarAlert.current.classList.add('d-none'), mostrarAlert.current.classList.remove('alert-danger')}, 5000);
            mostrarAlert.current.classList.remove('d-none');
            mostrarAlert.current.classList.add('alert-danger')
            setConfRegMsg(response.message);
        }
    }

	return (
		<>
			<div className="text-dark p-5 text-center text-sm-start">
            <div className="container text-center" style={{width: "30rem"}}>
                <form className="bg-white p-3">
                    <img className="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Confirmar Cuenta</h1>
                    <div className="form-floating d-flex">
                        <input id="rc-codigo" ref={codigo} name="codigo" className="form-control" type="text" placeholder="Pega aquí tu código" />
                        <label htmlFor="rc-codigo">Código</label>
                        <button type="button" className="btn btn-primary" onClick={() => checkConfirm()}>Enviar</button>
                    </div>
                    <div className={"alert d-none"} ref={mostrarAlert} role="alert">{confRegMsg}</div>
                </form>
				</div>
			</div>
		</>
	);
};
