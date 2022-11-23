import React, {useContext, useLayoutEffect} from "react";
import { useLocation } from "react-router-dom";
import {Context} from "../store/appContext";
export const Politicas = () => {
	const { store, actions } = useContext(Context);
	const location = useLocation();

	useLayoutEffect(() => {
		document.title = store.siteName+" - Políticas de Privacidad"
	}, [location]);

	return (
		<div className="container mt-5 bg-light">
			<div className="container">
				<h2 className="text-center py-4">Políticas de Privacidad</h2>
			</div>
            <div className="pt-4">
			    <h5>1. Condiciones Generales de Uso</h5>
			    <p>Nuestra Plataforma tratará los datos personales proporcionados por los usuarios de este sitio, únicamente con la finalidad y en la modalidad detallada en esta Política de Privacidad y en un todo de acuerdo a la normativa de la República Oriental del Uruguay en materia de Protección de Datos Personales, en particular a la Ley No. 18.331 y los decretos No. 664/008 de 22-12-008 y 414/009 de 31-8-009.</p>
            </div>
            <div className="pt-4">
			    <h5>2. ¿Qué información es la que recogemos?</h5>
			    <p>Fromtony sólo recogerá información que contenga datos personales de usuarios que brinden su consentimiento para ello. Nos comprometemos a usar los datos personales que recibamos, exclusivamente para los fines específicos para los cuales el usuario los proporciona. Sin perjuicio de ello, se reserva la posibilidad de realizar el tratamiento de datos personales de los usuarios para utilizarlos en otros servicios de la empresa.</p>
            </div>
            <div className="pt-4">
			    <h5>2.1 Información que tú nos proporcionas.</h5>
			    <p>Información obligatoria necesaria para registrarse en el servicio que proporcionamos en nuestra Plataforma o para acceder a otros de nuestros servicios; estos datos incluyen tu nombre, correo electrónico, fecha de nacimiento, sexo, número de teléfono móvil y, cuando creas una cuenta, una contraseña. Todos estos campos son obligatorios. Fromtony no podrá proporcionarte los servicios ofrecidos en nuestra página si no nos das la información necesaria o, si procede, no podrás crearte una cuenta de usuario en nuestra Plataforma.</p>
            </div>
            <div className="pt-4">
			    <h5>2.2 Información que recogemos automáticamente.</h5>
			    <p>Recopilamos información global sobre tu actividad en nuestra plataforma (como, por ejemplo, el número de viajes ofrecidos, tu tiempo de respuesta a los mensajes, etc.). Esta información puede ser publicada en tu perfil público en nuestra plataforma, si tienes uno.</p>
            </div>
            <div className="pt-4">
			    <h5> 3. Conservación de Datos </h5>
			    <p> Tus datos personales se archivarán después de los siguientes periodos de retención, 5 años después del último uso de nuestra plataforma, si no cerraste tu cuenta y 30 días después del cierre de tu cuenta, excepto si recibiste un informe o calificación negativa, en cuyo caso tus datos personales se conservarán durante 2 años después del cierre de tu cuenta. Los datos de registro se almacenan durante un máximo de 12 meses a partir de la fecha de su recogida. En el caso de que tu cuenta sea suspendida o bloqueada, conservaremos tus datos durante un periodo de entre 2 o 10 años, dependiendo de la gravedad del incumplimiento, con el fin de impedir que puedas eludir las normas que se apliquen a nuestras plataformas. </p>
            </div>
            <div className="pt-4">
			    <h5>4. Cómo Usamos tus datos.</h5>
			    <p> 4.1 Para darte acceso y para permitirte comunicarte con nuestro servicio de relaciones a la camunidad de usuarios. 4.2 Para permitirte personalizar tu perfil de usuario en nuestra plataforma. 4.3 para enviarte, de acuerdo con la legislación aplicable y, cuando así sea necesario, con tu consentimiento, mensajes de marketing e información necesaria para facilitar el servicio o el proceso de reservas y para ofrecerte sugerencias y recomendaciones sobre bienes y servicios relacionados que puedan interesarte. 4.4 Para notoficarte cambios.</p>
            </div>
		</div>
	);
};
