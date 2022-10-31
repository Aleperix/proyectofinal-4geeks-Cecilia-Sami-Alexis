import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Viajes = () => {
  const { store } = useContext(Context);
  console.log(store.listaViajes);
  
  return (
    <div
      className="container overflow-auto position-relative"
      style={{ height: "200px" }}
    >
      <div className="card ">
        <ul className="list-group list-group-flush">
          {store.listaViajes.map((item, i) => (
            
              <li className="list-group-item  align-items-center" key={i} role="button">
                <Link to={"/vistaviajes/"+i} className="text-decoration-none text-dark">
                <div className="d-flex flex-row justify-content-between col-12">
                  <div className="d-flex col-4">
                    <i className="fas fa-paper-plane"></i> &nbsp; Desde:{" "}
                    {item.Ciudad_Salida}{" "}
                    
                  </div>

                  <div className="d-flex col-4 ">
                    {" "}
                    <i className="fas fa-map-marker-alt"></i> &nbsp; Hasta:{" "}
                    {item.Ciudad_llegada}{" "}
                  </div>

                  <div className="d-flex col-4 ">
                    {" "}
                    <div className=" col-6 justify-content-center">
                      <p>
                        {" "}
                        <i className="fas fa-calendar-alt"></i> Fecha:{" "}
                        {item.Fecha}{" "}
                      </p>
                    </div>
                    <div className=" col-6 justify-content-center">
                      <p>
                        {" "}
                        <i className="fas fa-money-bill-wave"></i> Valor
                        Asiento: {item.Valor_Asiento}{" "}
                      </p>
                    </div>
                  </div>
                </div>
                </Link>
              </li>
            
          ))}
        </ul>
      </div>
      <div className="position-sticky bottom-0 d-flex">
        <Link
          className="btn btn-primary me-md-2 ms-auto m-1"
          type="button"
          to="/nuevoviaje"
          style={{ width: "fitContent" }}
        >
          Publicar Viaje
        </Link>
      </div>
    </div>
  );
};
