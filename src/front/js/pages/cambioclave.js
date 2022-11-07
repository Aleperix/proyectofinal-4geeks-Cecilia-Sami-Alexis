import React, {useContext} from "react";
import {Context} from "../store/appContext";
import {Link, useLocation, useNavigate} from "react-router-dom";

export const CambioClave = () => {
    const {store, actions} = useContext(Context);

    return (

        <div className="container">
            <div className=" d-flex justify-content-center align-items-center bg-white mt-4 mb-4">
                <form>
                    <h3 className="signin-text mb-3 ">
                        Olvido de Contraseña
                    </h3>
                    <p>
                        Ingresa los siguientes campos
                    </p>
            
                    <div className="form-floating">
                                    <input type="password" className="form-control" id="fg-correo" placeholder="micorreo" required />
                                    <label htmlFor="fg-correo"> Nueva contraseña </label>
									</div>
                                    <div className="form-floating mt-3">
                                    <input type="password" className="form-control" id="fg-correo" placeholder="micorreo" required />
                                    <label htmlFor="fg-correo"> Repetir contraseña </label>
									</div>						
                    <button type="submit" className="btn btn-primary mt-2">Guardar</button>
                </form>
            </div>
        </div>



        );
};