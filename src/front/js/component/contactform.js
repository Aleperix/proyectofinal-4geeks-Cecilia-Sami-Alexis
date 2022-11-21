import React, { useContext,useState,useRef } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from "../store/appContext";
export const ContacForm = () => {
    const { store, actions } = useContext(Context);
    const [loginError, setLoginError] = useState("");
    const mostrarAlert = useRef("");
    

    const formik = useFormik({
		initialValues: {nombre: '', apellido: '',  correo: '',  consulta: ''},
		validationSchema: Yup.object({
			nombre: Yup.string().min(2, 'Tu nombre debe contener 2 caracteres o más').required('El nombre es requerido'),
			apellido: Yup.string().min(2, 'Tu apellido debe contener 2 caracteres o más').required('El apellido es requerido'),
			correo: Yup.string().email('Correo electrónico inválido').required('Necesitas una cuenta de correo para enviarte la respuesta'),
			consulta: Yup.string().required('Este campo es requerido'),
      
		}),
		onSubmit: values => {
		  console.log(values);
		  handleSubmit(values)
		},
	  });


      const handleSubmit = async (data) => {
		let submit = await actions.formSubmit(data);
		if (submit == true) {
			setLoginError(formSubmit.message);
     mostrarAlert.current.classList.remove("d-none");
		} else {
			setTimeout(() => {
				mostrarAlert.current.classList.add("d-none");
			}, 3000);
			mostrarAlert.current.classList.remove("d-none");
			setLoginError(formSubmit.message);
			mostrarAlert.current.scrollIntoView()
		}
	};


  return (
    <div className="container mt-4">
       
      
      <h5>Formulario de Contacto</h5>
      <div className="alert alert-danger d-none" ref={mostrarAlert} role="alert">
							{loginError}
			</div>

      <form className="row g-3 needs-validation" onSubmit={formik.handleSubmit}>
        <div className="col-md-4">
          <label htmlFor="name" className="form-label" value={formik.values.nombre}>
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="escriba su nombre aqui"
            
          />
          { formik.errors.nombre ? (
								<div className="text-danger">
									{formik.errors.nombre}
							   	</div>
       						) : null}
          
        </div>
        <div className="col-md-4">
          <label htmlFor="apellido" className="form-label" value={formik.values.apellido}>
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            placeholder="escriba su apellido aqui"
          />
           { formik.errors.apellido ? (
								<div className="text-danger">
									{formik.errors.apellido}
							   	</div>
       						) : null}
        </div>
        <div className="col-md-12">
          <label htmlFor="email" className="form-label"  value={formik.values.correo}>
            Email
          </label>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="inputGroupPrepend"
              
            />
            <div className="col-md-12">
             { formik.errors.correo ? (
								<div className="text-danger">
									{formik.errors.correo}
							   	</div>
       						) : null}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="consulta" className="form-label" value={formik.values.consulta}>
            Escribe tu consulta
          </label>
          <textarea className="form-control" id="consulta" rows="3"></textarea>
          { formik.errors.consulta ? (
								<div className="text-danger">
									{formik.errors.consulta}
							   	</div>
       						) : null}
        </div>
        
        <div className="col-12">
          <button className="btn btn-primary" type="submit" onClick={console.log("funciono")}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
