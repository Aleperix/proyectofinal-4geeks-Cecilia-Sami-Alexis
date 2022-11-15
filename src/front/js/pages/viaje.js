import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import defaultAvatarUrl from "../../img/defaultAvatar.png";

export const Viaje = () => {
  const [datosViaje, setDatosViaje] = useState("");
  const [datosPerfilConductor, setDatosPerfil] = useState("");
  const [datosPreferencias, setDatosPreferencias] = useState([]);
  const [datosAsiento, setDatosAsiento] = useState(0);
  const { actions,store } = useContext(Context);
  const idViaje = useParams();
  

  const getDriverData = async (id) => {
    const response = await actions.getProfile(id);
    
    if (response?.perfil) {
      setDatosPerfil(response.perfil, { status: response.status });
      response.perfil.preferencias!==null? setDatosPreferencias(response.perfil.preferencias.split(",")) : setDatosPreferencias(["no hay preferencias guardadas"]);
      console.log("estoy en la funcion get datos perfil")
      return null;
    }
    console.log("estoy en la funcion get datos perfil 2")
    console.log(response.data, { status: response.status });
    setDatosPerfil(response.data, { status: response.status });
    return null;
  };

  const getTravelData = async (id) => {
    const response = await actions.getOneTravel(id);
    if (response?.acerca) {
      setDatosViaje(response);
      setDatosAsiento(response.asientos_disponibles)
      return response.conductor;
    }
    console.log("estoy en la funcion get travel 2")
    console.log(response.data, { status: response.status });
    setDatosViaje(response.data, { status: response.status });
    return null;
  };

 
 const putModifyPlace = async (id) => {
  
  let place = datosAsiento-1;
  let idCompany = store.usuario.id
  console.log(datosPerfilConductor.id)
  let datos = {"place":place, "idCompany":idCompany}
  console.log(datos)
  const response = await actions.modifyTravel(id,{"asientos_disponibles":place, "idCompany":idCompany});
  console.log(response.message)
  // if (response?.acerca) {
  //   setDatosViaje(response);
  //   console.log("estoy en la funcion get travel")
  //   return response.conductor;
  // }
  // console.log("estoy en la funcion get travel 2")
  // console.log(response.data, { status: response.status });
  // setDatosViaje(response.data, { status: response.status });
  // return null;
};

  useEffect(() => {
    async function carga() {
      getDriverData(await getTravelData(idViaje.id));
      
    }
    carga();
  }, []);
  console.log(datosPerfilConductor);
  console.log(datosViaje.asientos_disponibles)
  console.log(datosPreferencias);
  console.log(idViaje.id);
  console.log(datosAsiento);
  return (
    <div className=" container d-flex flex-column justify-content-center">
      <div className="mx-4 my-5">
        <h4 className="card-title text-center">
          {" "}
          Miercoles {datosViaje.fecha}
        </h4>
      </div>
      <div
        className="container d-flex justify-content-center"
        style={{ height: "200px" }}
      >
        <label htmlFor="customRange1" className="form-label d-flex">
          {datosViaje.hora}
        </label>

        <input
          type="range"
          className="d-flex flex-column"
          id=""
          aria-orientation=""
          style={{ transform: "rotate(90deg)" }}
        />
        <div className="d-flex justify-content-between flex-column">
          <label htmlFor="customRange1" className="form-label ">
            {datosViaje.desde}
          </label>
          <label htmlFor="customRange1" className="form-label ">
            {datosViaje.hasta}
          </label>
        </div>
      </div>

      <div className="col-6 container justify-content-center">
        <div className="my-4 d-flex flex-row justify-content-between col-12">
          <h5 className="card-title col-9"> Asientos disponibles</h5>
          <p className="col-1"> {datosViaje.asientos_disponibles}</p>
        </div>

        <div className="my-4 d-flex flex-row justify-content-between col-12">
          <h5 className="card-title col-9"> Importe total para 1 pasajero</h5>
          <p className="col-1"> {datosViaje.costo_asiento_uy}</p>
        </div>
      </div>
      <div className="col-6 container justify-content-center">
        <div>
          <div className="bg-primary p-2 text-white bg-opacity-75 d-flex">
            <h4 className="card-title col-9"> {datosPerfilConductor.nombre} </h4>
            <img
              className="my-2 border border-2 rounded-circle"
              src={
                datosPerfilConductor.url_avatar !== null
                  ? datosPerfilConductor.url_avatar
                  : defaultAvatarUrl
              }
              width="10%"
              alt="Imagen de Perfil"
            />
          </div>
          <div>
            <h6 className="card-title col-9"> 4.5/24 Opiniones</h6>
          </div>
          <br />
          <div>
          <h6 className="card-title col-9"> Acerca de</h6>
            <p>{datosViaje.acerca}</p>
          </div>
        </div>
        <div>
        <h6 className="card-title col-9"> Preferencias</h6>
          {datosPreferencias.map((element, index) => {
            return ( element == "mate" ? 
              <p key={index}>
                <img
                  src="https://i.imgur.com/9vGOpIP.png"
                  alt="foto del mate"
                  width="16px"
                />
                Me encanta tomar mate
              </p>
            : element == "no_fumar" ? 
              <p key={index}>
                <i className="fas fa-smoking-ban"></i>Por favor, no fumar en el
                auto
              </p>
            : element == "mascotas" ? 
              <p key={index}>
                <i className="fas fa-paw"></i>Acepto mascotas pequeñas
              </p>
             : 
              element
            )})}
        </div>
        <br />
        <div className="d-flex col-3 mx-auto ">
          <button className="btn btn-primary" type="button" onClick={()=>putModifyPlace(idViaje.id)}>
            Unirme
          </button>
        </div>
      </div>
    </div>
  );
};
