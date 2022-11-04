import React, {useContext} from "react";
import {Context} from "../store/appContext";
import {Link, useLocation, useNavigate} from "react-router-dom";

export const CodigoClave = () => {
    const {store, actions} = useContext(Context);

    return (
        <div className="container">
            <div className=" d-flex justify-content-center align-items-center bg-white mt-4 mb-4">
                <form>
                    <h3 className="signin-text mb-3 ">
                        Olvido de Contraseña
                    </h3>
                    <p>
                        Ingresa el código que te enviamos por email a use***@gmail.com
                    </p>
            
                    <div className="form-floating">
                                    <input type="email" className="form-control" id="fg-correo" placeholder="micorreo" required />
                                    <label htmlFor="fg-correo"> Código </label>
									</div>				
                    <button type="button" className="btn btn-primary mt-2">Siguiente</button>
                </form>
            </div>
        </div>
    );
};
