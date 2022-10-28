import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";

export const Login = () => {
	const {store} = useContext(Context)
  const [depIndex] = useState(Math.floor(Math.random() * store.departamentos.length))
	
	return (
		<div className="contenedor d-flex align-items-center vh-100 vh-100" style={{backgroundImage: 'url("'+store.departamentos[depIndex].img+'")', backgroundSize: 'cover'}}>
      <div className="container text-center" style={{width: "25rem"}}>
        <form className="bg-white p-3">
          <img class="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
          <h1 class="h3 mb-3 fw-normal">Iniciar sesión</h1>
          <div class="form-floating">
            <input type="email" class="form-control" id="l-usuario" placeholder="miusuario"/>
            <label for="l-usuario">Usuario</label>
          </div>
          <div class="form-floating pt-1">
            <input type="password" class="form-control" id="l-contraseña" placeholder="micontraseña"/>
            <label for="l-contraseña">Contraseña</label>
          </div>
          <div class="mb-3 mt-1 d-flex justify-content-between">
            <label>
              <input type="checkbox" value="remember-me"/> Recuérdame
            </label>
            <a href="/forgot">Olvidé mi contraseña</a>
          </div>
          <button class="w-100 btn btn-lg btn-primary mb-2" type="submit">Entrar</button>
          <span>¿Aún no tienes cuenta? <a href="/register">Regístrate!</a></span>
        </form>
      </div>
    </div>
	);
};