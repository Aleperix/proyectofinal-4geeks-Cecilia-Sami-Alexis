import React from "react";

export const Viaje = () => {
  console.log("estoy en la vista viajes");
  return (
    <div
      className=" container d-flex flex-column justify-content-center"
      style={{ width: "fit-Content" }}
    >
      <div className="mx-4 my-5">
        <h4 className="card-title text-center"> Miercoles 2 de Noviembre</h4>
      </div>
      <div
        className="container d-flex justify-content-center"
        style={{ height: "200px" }}
      >
        <label for="customRange1" className="form-label d-flex">
          8:00 am
        </label>

        <input
          type="range"
          className="d-flex flex-column"
          id=""
          aria-orientation=""
          style={{ transform: "rotate(90deg)" }}
        />
        <div className="d-flex justify-content-between flex-column">
          <label for="customRange1" className="form-label ">
            Montevideo
          </label>
          <label for="customRange1" className="form-label ">
            Colonia
          </label>
        </div>
      </div>

      <div className="col-6 container justify-content-center">
        <div className="my-4 d-flex flex-row justify-content-between col-12">
          <h5 className="card-title col-9"> Asientos disponibles</h5>
          <p className="col-1"> 4</p>
        </div>

        <div className="my-4 d-flex flex-row justify-content-between col-12">
          <h5 className="card-title col-9"> Importe total para 1 pasajero</h5>
          <p className="col-1"> 4</p>
        </div>
      </div>
      <div className="col-6 container justify-content-center">
        <div>
          <div className="bg-primary p-2 text-white bg-opacity-75 d-flex">
            <h4 className="card-title col-9"> Sami</h4>
            <p className="col-1"> FOTO</p>
          </div>
          <div>
            <h6 className="card-title col-9"> 4.5/24 Opiniones</h6>
          </div>
          <br />
          <div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              dignissimos est mollitia odit ad reprehenderit, modi fuga deserunt
              suscipit, unde iusto, harum exercitationem voluptatibus distinctio
              dolor. Libero animi modi repellat.
            </p>
          </div>
        </div>
        <div >
          
          <p><img src="https://i.imgur.com/9vGOpIP.png" alt="foto del mate" width="16px" /> Me encanta tomar mate</p>
          <p><i className="fas fa-smoking-ban"></i>Por favor, no fumar en el auto</p>
          <p><i className="fas fa-paw"></i>Acepto mascotas pequeñas</p>
        </div>
        <div className="d-grid gap-2">
  
  <button className="btn btn-primary" type="button">Button</button>
</div>
      </div>
    </div>
  );
};
