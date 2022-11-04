import React from "react";
import {Link, useLocation} from "react-router-dom";

export const ErrorPage = (props) => {
	return (
		<div className="container">
            <h1 className="d-flex justify-content-center" style={{fontSize: "20vw"}}><b>{props.errorStatus}</b></h1>
			<p className="d-flex justify-content-center text-danger">{props.errorMessage}</p>
        </div>
	);
};
