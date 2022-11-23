import React, {useContext, useLayoutEffect, useState, useRef} from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from "../store/appContext";
import logo from "../../img/logo3.png"

export const Login = () => {
	const {store, actions} = useContext(Context)
  const departamentos = require('../data/departamentos.json');
  const [depIndex] = useState(Math.floor(Math.random() * departamentos.length))
	const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const mostrarAlert = useRef("")

  const location = useLocation();

  const formik = useFormik({
		initialValues: {nombre_usuario: '', clave: ''},
		validationSchema: Yup.object({
			nombre_usuario: Yup.string().required('Este campo es requerido'),
			clave: Yup.string().required('Este campo es requerido'),
		}),
		onSubmit: (values, { resetForm }) => {
		  handleSubmit(values)
      resetForm();
		},
  });

  const handleSubmit = async (values)=>{
    let onLogged = await actions.login(values);
    if (onLogged == true) {
        navigate("/")
    }else{
        setTimeout(() => {mostrarAlert.current.classList.add('d-none')}, 3000);
        mostrarAlert.current.classList.remove('d-none');
        setLoginError(onLogged?.message);
    }
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
		document.title = store.siteName+" - Login"
	}, [location]);

	return (
		<div className="contenedor d-flex align-items-center vh-100" style={{backgroundImage: 'url("'+departamentos[depIndex].img+'")', backgroundSize: 'cover'}}>
      <div className="container text-center" style={{width: "25rem"}}>
        {!store.auth ?
        <form className="bg-white p-3" onSubmit={formik.handleSubmit}>
          <img className="mb-4" src={logo} alt="Logo Fromtony"/>
          <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>
          <div className="alert alert-danger d-none" ref={mostrarAlert} role="alert">{loginError}</div>
            <div className="form-floating">
              <input id="l-nombre_usuario" name="nombre_usuario" value={formik.values.nombre_usuario} className={formik.touched.nombre_usuario && formik.errors.nombre_usuario ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Tu usuario" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.nombre_usuario && formik.errors.nombre_usuario ? (
                  <div className="text-danger">
                    {formik.errors.nombre_usuario}
                  </div>
                ) : null}
              <label htmlFor="l-nombre_usuario">Usuario</label>
            </div>
            <div className="form-floating mt-1">
              <input id="l-clave" name="clave" value={formik.values.clave} className={formik.touched.clave && formik.errors.clave ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="password" placeholder="Tu contraseña" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.clave && formik.errors.clave ? (
                  <div className="text-danger">
                    {formik.errors.clave}
                  </div>
                ) : null}
              <label htmlFor="l-clave">Contraseña</label>
            </div>
          <div className="mb-3 mt-1 d-flex justify-content-between">
            <label>
              <input type="checkbox" value="remember-me"/> Recuérdame
            </label>
            <Link to="/forgot">Olvidé mi contrseña</Link>
          </div>
          <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">Entrar</button>
          <span>¿Aún no tienes cuenta? <Link to="/register">Regístrate!</Link></span>
        </form>
        :
        <div className="container text-danger bg-white p-3">Ya has iniciado sesión!</div>
        }
      </div>
    </div>
	);
};