import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Viajes = () => {
  const { store } = useContext(Context);
  console.log(store.listaViajes);

  return (
    <div className="container overflow-auto position-relative" style={{height: "200px"}}>
      <div className="card ">
        <ul className="list-group list-group-flush">
          {store.listaViajes.map((item, i) => (
            <li className="list-group-item  align-items-center" key={i}>
              <div className="d-flex flex-row justify-content-between col-10">
                <div className="d-flex col-5">
                  <i class="fas fa-paper-plane"></i> &nbsp; Desde:{" "}
                  {item.Ciudad_Salida}{" "}
                </div>

                <div className="d-flex col-5 ">
                  {" "}
                  <i class="fas fa-map-marker-alt"></i> &nbsp; Hasta:{" "}
                  {item.Ciudad_llegada}{" "}
                </div>
              </div>

              {/* // onClick={() => deleteItem(i)} */}
            </li>
          ))}
        </ul>
        
        
      </div>
      <div className="position-sticky bottom-0 d-flex">
        <Link className="btn btn-primary me-md-2 ms-auto" type="button" to="/nuevoviaje" style={{width: "fitContent"}}>
            Button
          </Link>
          
        </div>
    </div>
  );
};
