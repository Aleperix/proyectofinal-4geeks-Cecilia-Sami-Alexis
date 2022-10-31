import React, {useContext, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const {store, actions} = useContext(Context)
  const [depIndex] = useState(Math.floor(Math.random() * store.departamentos.length))
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
	const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const mostrarAlert = useRef("")

  const handleSubmit = async ()=>{
    let onLogged = await actions.login({"nombre_usuario":usuario, "clave":clave});
    if (usuario == "" || clave == ""){
        setTimeout(() => {mostrarAlert.current.classList.add('d-none')}, 3000);
        mostrarAlert.current.classList.remove('d-none');
        setLoginError('Hay campos vacíos');
    }
    else if (onLogged == true) {
        navigate("/")
        setUsuario("")
        setClave("")
    }else{
        setTimeout(() => {mostrarAlert.current.classList.add('d-none')}, 3000);
        mostrarAlert.current.classList.remove('d-none');
        setLoginError(onLogged.message);
    }
  }

	return (
		<div className="contenedor d-flex align-items-center vh-100 vh-100" style={{backgroundImage: 'url("'+store.departamentos[depIndex].img+'")', backgroundSize: 'cover'}}>
      <div className="container text-center" style={{width: "25rem"}}>
        {!store.auth ?
        <form className="bg-white p-3">
          <img className="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
          <h1 className="h3 mb-3 fw-normal">Iniciar sesión</h1>
          <div className="alert alert-danger d-none" ref={mostrarAlert} role="alert">{loginError}</div>
          <div className="form-floating">
            <input value={usuario} type="email" className="form-control" id="l-usuario" placeholder="miusuario" onChange={(e) => setUsuario(e.target.value)}/>
            <label htmlFor="l-usuario">Usuario</label>
          </div>
          <div className="form-floating pt-1">
            <input value={clave} type="password" className="form-control" id="l-contraseña" placeholder="micontraseña" onChange={(e) => setClave(e.target.value)}/>
            <label htmlFor="l-contraseña">Contraseña</label>
          </div>
          <div className="mb-3 mt-1 d-flex justify-content-between">
            <label>
              <input type="checkbox" value="remember-me"/> Recuérdame
            </label>
            <a href="/forgot">Olvidé mi contraseña</a>
          </div>
          <button className="w-100 btn btn-lg btn-primary mb-2" onClick={() => handleSubmit()} type="button">Entrar</button>
          <span>¿Aún no tienes cuenta? <a href="/register">Regístrate!</a></span>
        </form>
        :
        <div className="container text-danger bg-white p-3">Ya has iniciado sesión!</div>
        }
      </div>
    </div>
	);
};