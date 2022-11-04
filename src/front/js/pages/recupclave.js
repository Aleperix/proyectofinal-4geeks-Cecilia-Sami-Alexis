import React, {useContext} from "react";
import {Context} from "../store/appContext";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "../../styles/recupclave.css"

export const RecupClave = () => {
	
	const {store, actions}= useContext(Context)

	
	
	return (

        <div className="container">
            <div className=" d-flex justify-content-center align-items-center bg-white">
                
                    <img src="https://i.imgur.com/98dS3PY.jpg" className=" w-50 mx-5" alt="portadarecupcontraseña"></img>
                   
                        
                        <form>
                        <h3 className="signin-text mb-3"> ¿Has olvidado tu contraseña? </h3>
                            <div className="form-group">
                                <label for="email"> Email</label>
                                <input type="email" name="email" className="form-control"/>

                            </div>
                            <div className="form-group">
                                <label for="password"> Contraseña </label>
                                <input type="password" name="password" className="form-control"/>
                                <div className="form-group form-check">
                                <input type="checkbox" name="checkbox" className="form-check-input" id="checkbok"/>
                                <label className="form-check-label" for="checkbox"> Recuérdame </label>
                                </div>
                                <button className="btn btn-class"> Recuperar Cuenta  </button>

                            </div>
                        </form>

               

              

            </div>

        </div>


    );
};
