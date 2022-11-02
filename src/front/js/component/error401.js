import React from "react";
import {Link, useLocation} from "react-router-dom";

export const Error401 = () => {
	return (
		<div className="container">
            <h1 className="d-flex justify-content-center" style={{fontSize: "20vw"}}><b>401</b></h1>
			<p className="d-flex justify-content-center text-danger">No tienes permitido estar aquí</p>
        </div>
	);
};
