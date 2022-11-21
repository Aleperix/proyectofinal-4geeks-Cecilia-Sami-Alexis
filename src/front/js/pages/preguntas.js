import React, { useContext } from "react";
import { ContacForm } from "../component/contactform";
import { Context } from "../store/appContext";
export const Preguntas = () => {
    const { store, actions } = useContext(Context);



    return (
   <>
   <div className=" container mt-4 "> 
   <h4>Preguntas Frecuentes </h4>
  
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ¿Quienes Somos?
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p> Somos una plataforma online que conecta conductores y pasajeros para compartir un viaje en auto. Es decir, que varias personas con un destino en común viajen juntas en un mismo vehículo y de esta manera se comparten gastos, se reduce el tráfico y se cuida el medio ambiente. </p>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        ¿Cómo funciona?
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p>Los conductores organizan sus viajes y lo publican en la plataforma especificando los asientos libres, el trayecto y el precio. A través de nuestro sistema los pasajeros pueden ver el viaje y sus especificacioes. Y si deciden tomarlo pueden reservarlo, pagarlo y contactar con el conductor. </p>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        ¿Qué costos tienen los viajes?
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <p> El conductor fija un precio de acuerdo al trayecto y los asientos disponibles. </p>
                    </div>
                </div>
            </div>
        </div>
        <ContacForm/>
        </div>
    </>
    );
};