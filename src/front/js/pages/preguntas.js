import React, { useContext } from "react";
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
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <p> El conductor fija un precio de acuerdo al trayecto y los asientos disponibles. </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="container mt-4">
        <h5>Formulario de Contacto</h5>

        </div>
        <form class="row g-3 needs-validation" novalidate>
          <div class="col-md-4">
            <label for="validationCustom01" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="validationCustom01" value="Escribe aquí tu nombre" required/>
            <div class="valid-feedback">
              Looks good!
            </div>
          </div>
          <div class="col-md-4">
            <label for="validationCustom02" class="form-label">Apellido</label>
            <input type="text" class="form-control" id="validationCustom02" value="Escribe aquí tu apellido" required/>
            <div class="valid-feedback">
              Looks good!
            </div>
          </div>
          <div class="col-md-4">
            <label for="validationCustomUsername" class="form-label">E.mail</label>
            <div class="input-group">
              {/* <span class="input-group-text" id="inputGroupPrepend">@</span> */}
              <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
              <div class="invalid-feedback">
                Please choose a username.
              </div>
            </div>
          </div>
          {/* <div class="col-md-6">
            <label for="validationCustom03" class="form-label">City</label>
            <input type="text" class="form-control" id="validationCustom03" required/>
            <div class="invalid-feedback">
              Please provide a valid city.
            </div>
          </div> */}
          {/* <div class="col-md-3">
            <label for="validationCustom04" class="form-label">State</label>
            <select class="form-select" id="validationCustom04" required>
              <option selected disabled value="">Choose...</option>
              <option>...</option>
            </select>
            <div class="invalid-feedback">
              Please select a valid state.
            </div>
          </div>
          <div class="col-md-3">
            <label for="validationCustom05" class="form-label">Zip</label>
            <input type="text" class="form-control" id="validationCustom05" required/>
            <div class="invalid-feedback">
              Please provide a valid zip.
            </div>
          </div> */}

            <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Escribe tu consulta</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
              <label class="form-check-label" for="invalidCheck">
                Aceptar términos y condiciones.
              </label>
              <div class="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit">Enviar</button>
          </div>
        </form>
        </div>
    </>
    );
};