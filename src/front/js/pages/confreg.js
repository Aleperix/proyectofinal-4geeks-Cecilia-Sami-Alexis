import React, { useContext, useState, useLayoutEffect, useRef } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from "../store/appContext";
import logo from "../../img/logo3.png"

export const ConfReg = () => {
	const { store, actions } = useContext(Context);
    const [confRegMsg, setConfRegMsg] = useState("");
    const mostrarAlert = useRef("")
    const navigate = useNavigate();

    const location = useLocation();

	const formik = useFormik({
		initialValues: {token: ''},
		validationSchema: Yup.object({
			token: Yup.string().required('Este campo es requerido'),
		}),
		onSubmit: (values) => {
		  checkConfirm(values.token)
		},
	  });

    const checkConfirm = async (values) =>{
        const response = await actions.confReg(values)
        if (response.status == 200) {
            setTimeout(() => {mostrarAlert.current.classList.add('d-none'), mostrarAlert.current.classList.remove('alert-success'), navigate("/login")}, 3000);
            mostrarAlert.current.classList.remove('d-none');
            mostrarAlert.current.classList.add('alert-success');
            setConfRegMsg(response.message);
        }else if(response.status == 404 || response.status == 403){
            setTimeout(() => {mostrarAlert.current.classList.add('d-none'), mostrarAlert.current.classList.remove('alert-danger'), response.status == 403 && navigate("/login")}, 5000);
            mostrarAlert.current.classList.remove('d-none');
            mostrarAlert.current.classList.add('alert-danger')
            setConfRegMsg(response.message);
        }
    }

    useLayoutEffect(() => {
		document.title = store.siteName+" - Confirmar registro"
	}, [location]);

	return (
		<>
			<div className="text-dark p-5 text-center text-sm-start">
            <div className="container text-center" style={{width: "30rem"}}>
                <form className="bg-white p-3" onSubmit={formik.handleSubmit}>
                    <img className="mb-4" src={logo} alt="Logo Fromtony"/>
                    <h1 className="h3 mb-3 fw-normal">Confirmar Cuenta</h1>
                    <div className="form-floating d-flex">
                        <input id="rc-token" name="token" value={formik.values.token} className={formik.touched.token && formik.errors.token ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Tu usuario" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.touched.token && formik.errors.token ? (
                            <div className="text-danger">
                                {formik.errors.token}
                            </div>
                            ) : null}
                        <label htmlFor="rc-token">Código</label>
                        <button type="submit" className="btn btn-primary mx-1">Enviar</button>
                    </div>
                    <div className={"alert d-none"} ref={mostrarAlert} role="alert">{confRegMsg}</div>
                </form>
				</div>
			</div>
		</>
	);
};
