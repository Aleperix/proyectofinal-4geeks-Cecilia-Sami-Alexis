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
                        <p> Ingresa el correo electrónico que usas en nuestra aplicación para recuperar tu cuenta: </p>
                            {/* <div className="form-group">
                                <label htmlFor="email"> Email</label>
                                <input type="email" name="email" className="form-control"/>

                            </div> */}
                            <div className="mb-3">
                                <div className="form-floating">
                                    <input type="email" className="form-control" id="fg-correo" placeholder="micorreo" />
                                    <label htmlFor="fg-correo"> Correo </label>
                                </div>
                            </div>



                            {/* <div className="form-group"> */}
                                {/* <label for="password"> Contraseña </label>
                                <input type="password" name="password" className="form-control"/> */}
                                {/* <div className="form-group form-check">
                                <input type="checkbox" name="checkbox" className="form-check-input" id="checkbok"/>
                                <label className="form-check-label" for="checkbox"> Recuérdame </label>
                                </div> */}
                                 <button className="btn btn-primary"> Recuperar Cuenta  </button>

                            {/* </div> */}
                        </form>

               

              

            </div>

        </div>


    );
};
