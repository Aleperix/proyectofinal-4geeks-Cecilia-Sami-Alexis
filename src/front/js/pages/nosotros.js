import React from "react";

export const Nosotros = () => {
  return (
    <div className="container ">
      <div className="container ">
        <div className="card bg-primary p-3">
          <div className="card-body bg-white">
            <h5 className="card-title text-center">
              ¿Conoces <em>Fromtony</em>?
            </h5>

            <p className="card-text">
              Fromtony es una plataforma que nace a partir de la idea de viajar
              seguro, rápido, cómodo, compartiendo gastos y en horarios
              flexibles.
            </p>
            <p className="card-text">
              Para lograr todos estos objetivos utilizamos el método carpooling,
              siendo una practica sustentable que cada vez, mas personas, lo
              prefieren. Consiste en contactar a un conductor que ofrece su
              vehículo privado para llegar a un destino en común con varias
              personas acompañantes, en trayectos que realiza periódicamente, ir
              a trabajar, realizar viajes fuera de la ciudad, o simplemente no
              viajar solo. Tambien puedes ver los viajes disponibles y escoger
              la plaza de acuerdo a tus preferncias.
            </p>
          </div>
        </div>
      </div>
      <br />
      <h5 className="text-center">
        En nuetro grupo de innovadores se encuentran:{" "}
      </h5>
      <div className="">
        <div className="d-flex flex-row justify-content-center">
          <div className="card m-2  d-flexd justify-content-center" style={{ width: "18rem" }}>
            <img src="https://i.imgur.com/H5ydrro.png" className="card-img-top rounded mx-auto d-block" alt="..." style={{width: "214px", height: "105px"}} />
            <div className="card-body">
              <h5 className="card-title text-center">
                Alexis Peña: director ejecutivo
              </h5>
              <p className="card-text">Redes sociales:</p>
            </div>
          </div>
          <div className="card m-2" style={{ width: "18rem" }}>
            
            <img
              src="https://i.imgur.com/UeIoCug.png"
              className="card-img-top rounded mx-auto d-block"
              alt="..."
              style={{ width: "214px", height: "105px"}}
            />
            <div className="card-body">
              <h5 className="card-title text-center">
                Cecilia O'Neil: fundador y presidenta
              </h5>
              <p className="card-text"></p>
            </div>
          </div>
          <div className="card m-2" style={{ width: "18rem" }}>
            <img src="https://i.imgur.com/X1XP9SX.png" className="card-img-top rounded mx-auto d-block" alt="..." style={{width: "214px", height: "105px"}} />
            <div className="card-body">
              <h5 className="card-title text-center">
                Sandra Martinez: asesora tecnica
              </h5>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
