import React, { useContext } from "react";
import { Context } from "../store/appContext";
export const ConfPerfil = () => {
  const { store, actions } = useContext(Context);

  return (

    <div className="container d-flex justify-content-center align-items-center">

    <form className="w-50 m-5">

        <div className="">
        <h3> Datos Personales </h3>
        </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label"> Nombre </label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="escribe tu nombre"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label"> Apellido </label>
    <input type="password" className="form-control" id="exampleInputPassword1"placeholder="escribe tu apellido"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label"> E.mail </label>
    <input type="password" className="form-control" id="exampleInputPassword1"placeholder="escribe tu email"/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label"> Contraseña </label>
    <input type="password" className="form-control" id="exampleInputPassword1"placeholder="escribe tu contraseña"/>
  </div>
  <label for="exampleInputPassword1" className="form-label"> Ciudad </label>
  <select class="form-select" aria-label="Default select example">
 <option selected> Ciudad </option>
  <option value="1">Artigas</option>
  <option value="2">Canelos</option>
  <option value="3">Cerro Largo</option>
  <option value="3">Colonia</option>
  <option value="3">Flores</option>
  <option value="3">Florida</option>
  <option value="3">Lavalleja</option>
  <option value="3">Maldonado</option>
  <option value="3">Paysandú</option>
  <option value="3">Río Negro</option>
  <option value="3">Rivera</option>
  <option value="3">Rocha</option>
  <option value="3">Salto</option>
  <option value="3">San José</option>
  <option value="3">Soriano</option>
  <option value="3">Tacuarembó</option>
  <option value="3">Treinta y Tres</option>


</select>
 


<button type="button" className="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Guardar cambios
</button>


<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Advertencia</h1>
        
      </div>
      <div className="modal-body">
      ¿Seguro/a que quieres guardar los cambios?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" >Confirmar</button>
      </div>
    </div>
  </div>
</div>
  
</form>

</div>
    

   
  );
};