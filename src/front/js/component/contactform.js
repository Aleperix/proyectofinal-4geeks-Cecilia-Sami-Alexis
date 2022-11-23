import React, { useContext,useState,useRef } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from "../store/appContext";
export const ContacForm = () => {
    const { store, actions } = useContext(Context);
    const [loginError, setLoginError] = useState();
    const mostrarAlert = useRef();
    

    const formik = useFormik({
		initialValues: {nombre: '', apellido: '',  correo: '',  consulta: ''},
		validationSchema: Yup.object({
			nombre: Yup.string().min(2, 'El nombre debe contener 2 caracteres o más').required('Este campo es requerido'),
			apellido: Yup.string().min(2, 'El apellido debe contener 2 caracteres o más').required('Este campo es requerido'),
			correo: Yup.string().email('Correo electrónico inválido').required('Este campo es requerido'),
			consulta: Yup.string().min(50, 'La consulta debe contener 50 caracteres o más').required('Este campo es requerido'),
      
		}),
		onSubmit: (values, { resetForm }) => {
		  handleSubmit(values)
      resetForm();
		},
	  });


    const handleSubmit = async (data) => {
      let response = await actions.formSubmit(data);
      if (response.status == 200) {
        setTimeout(() => {mostrarAlert.current.classList.add('d-none'), mostrarAlert.current.classList.remove('alert-success')}, 3000);
        mostrarAlert.current.classList.remove('d-none');
        mostrarAlert.current.classList.add('alert-success');
        setLoginError(response.message);
      }else{
        setTimeout(() => {mostrarAlert.current.classList.add('d-none'), mostrarAlert.current.classList.remove('alert-danger')}, 5000);
        mostrarAlert.current.classList.remove('d-none');
        mostrarAlert.current.classList.add('alert-danger')
        setLoginError(response.message);
      }
	};


  return (
    <div className="container mt-5">
      <div className="text-center">
        <h3>¿Te quedó alguna duda?</h3>
        <div className="alert d-none" ref={mostrarAlert} role="alert">{loginError}</div>
      </div>
      <form className="row g-3 needs-validation" onSubmit={formik.handleSubmit}>
      <div className="row g-2">
        <div className="col-md">
          <div className="form-floating mt-1">
            <input id="c-nombre" name="nombre" value={formik.values.nombre} className={formik.touched.nombre && formik.errors.nombre ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: Juan" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="text-danger">
                  {formik.errors.nombre}
                </div>
              ) : null}
            <label htmlFor="c-nombre">Nombre</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating mt-1">
            <input id="c-apellido" name="apellido" value={formik.values.apellido} className={formik.touched.apellido && formik.errors.apellido ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: Pérez" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.apellido && formik.errors.apellido ? (
                <div className="text-danger">
                  {formik.errors.apellido}
                </div>
              ) : null}
            <label htmlFor="c-apellido">Apellido</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating mt-1">
            <input id="c-correo" name="correo" value={formik.values.correo} className={formik.touched.correo && formik.errors.correo ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: juanperez@dominio.tld" onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.correo && formik.errors.correo ? (
                <div className="text-danger">
                  {formik.errors.correo}
                </div>
              ) : null}
            <label htmlFor="c-correo">Correo</label>
          </div>
        </div>
      </div>
      <div className="row g-2">
        <div className="col-md">
          <div className="form-floating mt-1">
            <textarea id="c-consulta" name="consulta" rows="3" value={formik.values.consulta} className={formik.touched.consulta && formik.errors.consulta ? "form-control border border-danger bg-danger bg-opacity-25" : "form-control"} type="text" placeholder="Ej: No se como registrarme en el sitio" style={{height: "150px"}} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.consulta && formik.errors.consulta ? (
                <div className="text-danger">
                  {formik.errors.consulta}
                </div>
              ) : null}
            <label htmlFor="c-consulta">Consulta</label>
          </div>
        </div>
      </div>
        
        <div className="col-12">
          <button className="btn btn-primary d-flex mx-auto" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
