import React, {useContext} from "react";
import {Context} from "../store/appContext";
import {Link, useLocation, useNavigate} from "react-router-dom";

export const RecupClave = () => {
	
	const {store, actions}= useContext(Context)

	
	
	return (

        <div className="container">
            <div className="row content">
                <div className="col-md-6 mb-3">
                    <img src="https://i.imgur.com/98dS3PY.jpg" className="img-fuid" alt="portadarecupcontraseña"></img>

                </div>

            </div>

        </div>


    );
};
