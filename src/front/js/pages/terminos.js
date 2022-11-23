import React, { useContext } from "react";
import { ContacForm } from "../component/contactform";
import { Context } from "../store/appContext";
export const Terminos = () => {
    const { store, actions } = useContext(Context);



    return (

        <div className="container mt-5 bg-light">
			<div className="container">
				<h2 className="text-center py-4">Condiciones Generales de Uso</h2>
			</div>
            <div className="pt-4">
			    <h5>1. Descripción</h5>
			    <p>Fromtony, es un proyecto de trayectos compartidos a la que se puede acceder desde el sitio web www.fromtony.com.uy, diseñada para poner en contacto a los conductores que viajan a un determinado destino con pasajeros que se dirigen al mismo lugar, de forma que puedan compartir el Trayecto así como los costes asociados al mismo.
                    Las presentes condiciones generales de uso tienen por objeto regular el acceso y los términos de uso de la Plataforma. Se ruega leer atentamente estas condiciones.</p>
            </div>
            <div className="pt-4">
			    <h5>2. Definiciones</h5>
			    <p> En este documento,</p>
                <p> “Anuncio” significa un anuncio relacionado con un Trayecto publicado por un usuario Conductor en la Plataforma;</p>
                <p> “Cuenta” significa la cuenta que debe crearse para ser Usuario y poder acceder a determinados servicios ofrecidos por la Plataforma;</p>
                <p> “Conductor” significa el Usuario que utiliza la Plataforma para ofrecer la compartición de un Trayecto a otra persona a cambio de compartir los costes asociados al trayecto, y transportar a dicha persona en un Trayecto determinado en la fecha y hora en las que el Conductor ha organizado el Trayecto con anterioridad;</p>
                <p> “Confirmación de la reserva” tiene el significado que se le atribuye en el Artículo 4.2.1 a continuación;</p>
                <p> “Pasajero” significa el Usuario que ha aceptado compartir un Trayecto con el Conductor en carácter de Acompañante.</p>
                <p> “Plataforma” tiene el significado que se le atribuye más arriba; </p>
                <p> “Tramo” tiene el significado que se le atribuye en el Artículo 4.1 a continuación;</p>
                <p> “Trayecto en coche compartido” significa el recorrido sujeto de un Anuncio de coche compartido publicado por un Conductor en la Plataforma por el cual el Conductor acepta compartir un Trayecto con Pasajeros, Usuarios de la plataforma, a cambio de la compartición de los gastos asociados al Trayecto;</p>
                <p>  “Usuario” significa cualquier persona que haya creado una Cuenta en la Plataforma.</p>
                
            </div>
            <div className="pt-4">
			    <h5>3.Registro en la Plataforma y creación de una Cuenta</h5>
			    <p>La Plataforma solamente puede ser utilizada por personas mayores de 18 años. Está estrictamente prohibido el registro en la plataforma por parte de un menor. Al acceder, utilizar o registrarse en la Plataforma, confirmas y garantizas que tienes más de 18 años.</p>
                <p> La Plataforma permite a los Usuarios publicar y ver Anuncios de coche compartido e interactuar entre ellos para reservar una Plaza. Es posible ver los Anuncios sin estar registrado en la Plataforma. No obstante, no podrás publicar un Anuncio de coche compartido ni reservar una Plaza sin haber creado primero una Cuenta para convertirte en Usuario.</p>
                <p> Para registrarte en la Plataforma es necesario que hayas leído y aceptado las presentes CGU y la Política de privacidad.</p>
                <p> Al crear tu Cuenta te comprometes a proporcionar información verídica y precisa, y a actualizar dicha información por medio de tu perfil o enviando una notificación a Fromtony, con el objetivo de garantizar su relevancia y precisión durante la duración total de tu relación contractual con Fromtony.</p>
                <p> En caso de que te registres utilizando un correo electrónico, te comprometes a guardar en secreto la contraseña seleccionada durante la creación de tu Cuenta y a no comunicársela a ninguna otra persona. En caso de pérdida o divulgación de tu contraseña, deberás comunicárselo a Viatik inmediatamente. Tú eres el único responsable del uso de tu Cuenta por parte de terceras partes, salvo que hayas comunicado de forma expresa a Viatik la pérdida, el uso fraudulento por parte de un tercero, o la revelación de tu contraseña a un tercero.</p>
                <p> Recuerda no crear ni utilizar, bajo tu propia identidad o bajo la identidad de un tercero, ninguna Cuenta adicional a la creada inicialmente.</p>
                
            </div>
        
            <div className="pt-4">
			    <h5> 4. Verificación </h5>
			    <p> Viatik podrá, con fines de transparencia, de mejora de la veracidad o de prevención o detección de fraude, establecer un sistema para verificar parte de la información proporcionada en tu perfil. Se trata, fundamentalmente, de aquellos casos en los que introduces tu número de teléfono o nos proporcionas un Documento de Identidad.</p>
                <p> Reconoces y aceptas que cualquier referencia en la Plataforma o en los Servicios a la información “certificada”, o a cualquier otro término similar, significa solamente que un Usuario ha superado con éxito el procedimiento de verificación existente en la Plataforma o en los Servicios para proporcionarle más información sobre el Usuario con el que está pensando compartir un Trayecto. Fromtony no puede garantizar la veracidad, fiabilidad o validez de la información sujeta al procedimiento de verificación.</p>
            </div>
            
		</div>



        );
};