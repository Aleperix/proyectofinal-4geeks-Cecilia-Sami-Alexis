import React, { useState } from "react";

export const NuevoViaje = () => {
  console.log("estoy en la vista nuevo viaje");
  const [dateValue, setDateValue] = useState(new Date());
  const [descripcionViaje, setdescripcionViaje] = useState("");
  const [TrayectoDesde, setTrayectoDesde] = useState("");
  const [TrayectoHasta, setTrayectoHasta] = useState("");
  const [Hora, setHora] = useState("");
	const [Asientos, setAsientos] = useState("");
  const [Precio, setPrecio] = useState("");

  function handleDateUpdate(e) {
    const dateValue = e.target.value;
    setDateValue(dateValue); // state variable updated here
  }
  
  function handleSubmit() {
    setDateValue(new Date());
    setdescripcionViaje("");
    setTrayectoDesde("");
    setTrayectoHasta("");
    setHora("");
    setAsientos("");
    setPrecio("");

  }
  return (
    <div
      style={{
        backgroundImage: 'url("https://i.imgur.com/qlzwPNB.jpeg")',
        height: "1000px",
        backgroundRepeatY: "noRepeat"
      }}
    >
      <div
        className="container my-5"
        style={{ width: "35em", backgroundColor: "#8d8dcdf2" }}
      >
        <h1 className="h3 mb-3 fw-normal">Publicar un viaje</h1>
        <form className="column g-3">
          <div className="mb-3">
            <label htmlFor="DescripcionViaje" className="form-label">
              Acerca de tu viaje
            </label>
            <textarea
              className="form-control"
              id="DescripcionViaje"
              rows="3"
              value= {descripcionViaje}
              onChange={(e) => setdescripcionViaje(e.target.value)}
            ></textarea>
          </div>
          <div className="col-md-3 my-2" style={{ width: "50%" }}>
            <label htmlFor="Auto" className="form-label">
              Auto
            </label>
            <select className="form-select" id="Auto" required>
              <option value="modelos">Modelos...</option>
              <option>Modelo 1</option>
              <option>Modelo 2</option>
              <option>Modelo 3</option>
            </select>
          </div>

          <div className="col-md-4 my-3" style={{ width: "50%" }}>
            <label className="form-label">Trayecto</label>
            <input
              type="text"
              className="form-control my-1"
              id="TrayectoDesde"
              required
              placeholder="Desde"
              value={TrayectoDesde}
              onChange={(e) => setTrayectoDesde(e.target.value)}
            />

            <input
              type="text"
              className="form-control"
              id="TrayectoHasta"
              required
              placeholder="Hasta"
              value={TrayectoHasta}
              onChange={(e) => setTrayectoHasta(e.target.value)}
            />
          </div>

          <div className="col-md-4 my-2" style={{ width: "30%" }}>
            <label htmlFor="Date" className="form-label">
              Fecha
            </label>
            <input
              type="date"
              value={dateValue}
              className="form-control"
              id="validationDefault02"
              onChange={(e) => handleDateUpdate(e)}
              required
            />
          </div>

          <div className="col-md-4 my-2" style={{ width: "30%" }}>
            <label htmlFor="hour" className="form-label">
              Hora
            </label>
            <input
              type="time"
              className="form-control"
              id="hour"
              required
              placeholder="Ejemplo: 18:00 "
              value={Hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>

          <div className="col-md-6 my-2">
            <label htmlFor="Asientos" className="form-label">
              Asientos Disponibles
            </label>
            <input
              type="number"
              min="1"
              className="form-control"
              id="Asientos"
              required
              style={{ width: "20%" }}
              value={Asientos}
              onChange={(e) => setAsientos(e.target.value)}
            />
          </div>

          <div className="col-md-6 my-2">
            <label htmlFor="Precio" className="form-label">
              Precio
            </label>
            <input
              type="number"
              min="0"
              max="1000"
              className="form-control"
              id="Precio"
              required
              style={{ width: "20%" }}
              value={Precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

          <div className="col-12 ">
            <button
              type="button"
              className="btn btn-primary  my-4"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Guardar cambios
            </button>

            <div
              className="modal fade" 
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                      Advertencia
                    </h1>
                  </div>
                  <div className="modal-body">
                    ¿Seguro/a que quieres guardar los cambios?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={()=> handleSubmit()}
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
