"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint, current_app, render_template, flash
from api.models import db, Usuarios, Vehiculos, Viajes, Acompanantes
from api.utils import generate_sitemap, APIException
import json
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from flask_mail import Message
from api.token import generate_confirmation_token, confirm_token
import random, string
from sqlalchemy import and_, or_, not_

api = Blueprint('api', __name__)

def send_email(to, subject, template):
    msg = Message(
        subject,
        recipients=[to],
        html=template,
        sender=current_app.config['MAIL_DEFAULT_SENDER']
    )
    current_app.mail.send(msg)

           ##### Inicio JWT #####
#Logueamos al usuario si los datos proporcionados son correctos
@api.route("/login", methods=["POST"])
def login():
    nombre_usuario = request.json.get("nombre_usuario", None)
    clave = request.json.get("clave", None)
    usuario = Usuarios.query.filter_by(nombre_usuario=nombre_usuario).first()

    if usuario is None:
        raise APIException('El usuario ingresado no existe', status_code=404)

    decrypted_pass = current_app.bcrypt.check_password_hash(usuario.clave, clave)

    if nombre_usuario != usuario.nombre_usuario or decrypted_pass == False:
        raise APIException('Usuario o contraseña incorrectos', status_code=401)
    

    access_token = create_access_token(identity=nombre_usuario)
    refresh_token = create_refresh_token(identity=nombre_usuario)
    response_body = {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "usuario": usuario.serialize(),
        "status": 200
    }
    return jsonify(response_body), 200

#Verificamos si el usuario está logueado o no
@api.route("/isauth", methods=["GET"])
@jwt_required()
def is_auth():
    # Access the identity of the current user with get_jwt_identity
    usuario_actual = get_jwt_identity()

    usuario = Usuarios.query.filter_by(nombre_usuario=usuario_actual).first()

    if usuario is None:
        raise APIException('No tienes permitido hacer esto', status_code=401)

    response_body = {
        "usuario": usuario.serialize(),
        "status": 200
    }
    return jsonify(response_body), 200

#Obtenemos los datos del perfil de un usuario
@api.route("/profile/<int:id_usuario>", methods=["GET"])
@jwt_required()
def profile(id_usuario):

    usuario = Usuarios.query.filter_by(id=id_usuario).first()

    if usuario is None:
        raise APIException('El perfil que buscas no existe', status_code=404)

    viajes_conductor = Viajes.query.filter_by(conductor=id_usuario).all()
    if len(viajes_conductor) == 0:
        viajes_conductor = {"message": 'Aún no has hecho viajes como conductor'}
    else:
        viajes_conductor = list(map(lambda item: item.serialize(), viajes_conductor))

    viajes_acompanante = Acompanantes.query.filter_by(id_usuario=id_usuario).all()
    if len(viajes_acompanante) == 0:
        viajes_acompanante = {"message": 'Aún no has hecho viajes como acompañante'}
    else:
        viajes_acompanante = list(map(lambda item: {**item.serialize(), **item.serialize()}, viajes_acompanante))

    response_body = {
        "perfil": usuario.serialize(),
        "viajes":{
            "conductor": viajes_conductor,
            "acompanante": viajes_acompanante
        },
        "status": 200
    }
    return jsonify(response_body), 200
           ##### Fin JWT #####

           ##### Inicio Usuarios #####
#Creamos un nuevo usuario
@api.route('/register', methods=['POST'])
def add_new_user():
    body = json.loads(request.data)

    user_exist = Usuarios.query.filter_by(nombre_usuario=body["nombre_usuario"]).first()
    email_exist = Usuarios.query.filter_by(correo=body["correo"]).first()

    for i in body:
        if body[i] == None:
            raise APIException('Hay campos vacíos', status_code=204)
    
    if user_exist != None:
        raise APIException('El nombre de usuario ya está en uso', status_code=403)
    if email_exist != None:
        raise APIException('El correo ya está en uso', status_code=403)

    pw_hash = current_app.bcrypt.generate_password_hash(body["clave"]).decode('utf-8')

    new_user = Usuarios(
        nombre_usuario=body["nombre_usuario"],
        nombre=body["nombre"],
        apellido=body["apellido"],
        clave=pw_hash,
        celular=body["celular"],
        correo=body["correo"],
        departamento=body["departamento"],
        ciudad=body["ciudad"],
        fecha_nacimiento=body["fecha_nacimiento"].replace("-", ""),
        genero=body["genero"],
        sobre_mi=None,
        preferencias="ninguna",
        url_avatar=None,
        confirmado=False,
        activo=1)

    db.session.add(new_user)
    db.session.commit()
    token = generate_confirmation_token(new_user.correo)
    confirm_url = os.environ["FRONTEND_URL"]+"/register/confirm/"
    html = render_template('email/activate.html', token=token, confirm_url=confirm_url, name=new_user.nombre)
    subject = "Por favor, confirma tu cuenta"
    send_email(new_user.correo, subject, html)
    response_body = {
        "message": "Usuario agregado con éxito. Se ha enviado un correo de confirmación a tu correo electrónico",
        "status": 200
    }
    return jsonify(response_body), 200

# Confirmamos la cuenta del nuevo usuario
@api.route('/register/confirm/<token>')
def confirm_email(token):
    try:
        email = confirm_token(token)
    except:
        raise APIException('El link de confirmación es inválido o ha expirado', status_code=404)
    user = Usuarios.query.filter_by(correo=email).first_or_404()
    if user.confirmado:
        raise APIException('La cuenta ya ha sido confirmada. Por favor, inicia sesión', status_code=403)
    else:
        user.confirmado = True
        user.confirmado_en = datetime.datetime.now()
        db.session.add(user)
        db.session.commit()
        raise APIException('Cuenta confirmada con éxito', status_code=200)

# Cambiamos la contraseña del usuario para que pueda volver a entrar al sitio
@api.route('/forgotpass', methods=['PUT'])
def forgot_pass():
    recover_email = request.json['email']
    print(recover_email == "")
    recover_password = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(8))

    if recover_email == "":
        raise APIException('Debes ingresar tu correo electrónico', status_code=204)
    user = Usuarios.query.filter_by(correo=recover_email).first()
    if user == None:
        raise APIException('El correo ingresado no existe en nuestros registros', status_code=404)
    pw_hash = current_app.bcrypt.generate_password_hash(recover_password).decode('utf-8')
    user.clave = pw_hash
    db.session.commit()
    html = render_template('email/forgot.html', new_pass=recover_password, name=user.nombre)
    subject = "Tu nueva contraseña de Fromtony!"
    send_email(recover_email, subject, html)
    response_body = {
        "message": "Una nueva contraseña ha sido enviada a tu correo electrónico",
        "status": 200
    }
    return jsonify(response_body), 200

#Modificamos un usuario dependiendo de su ID
@api.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def modify_user(user_id):
    user = Usuarios.query.filter_by(id=user_id).first()
    body = json.loads(request.data)

    if user is None:
        raise APIException('El usuario que buscas no existe', status_code=404)

    for key in body:
        for col in user.serialize():
            if key == col and key != "id":
                setattr(user, col, body[key])
    
    db.session.commit()

    response_body = {
        "message": "Usuario modificado con éxito",
        "status": 200
    }
    return jsonify(response_body), 200
           ##### Fin Usuarios #####

            ##### Inicio Viajes #####
#Obtenemos todos los viajes
@api.route('/viajes', methods=['GET'])
def get_all_travels():
    viajes = Viajes.query.all() # esto obtiene todos los registros de la tabla User

    if len(viajes) == 0:
        raise APIException('Aún no hay viajes disponibles', status_code=404)

    results = list(map(lambda item: item.serialize(), viajes)) #esto serializa los datos del arrays users

    return jsonify(results), 200

#Creamos un nuevo viaje
@api.route('/viajes/new', methods=['POST'])
@jwt_required()
def add_new_travel():
    body = json.loads(request.data)

    for i in body:
        if body[i] == None:
            raise APIException('Hay campos vacíos', status_code=204)
    
    new_travel = Viajes(
        acerca=body["acerca"],
        conductor=body["conductor"],
        vehiculo=body["vehiculo"],
        desde=body["desde"],
        hasta=body["hasta"],
        fecha=body["fecha"].replace("-", ""),
        hora=body["hora"].replace(":", ""),
        asientos_disponibles=body["asientos_disponibles"],
        costo_asiento_uy=body["costo_asiento_uy"],
        activo=1)

    db.session.add(new_travel)
    db.session.commit()
    db.session.refresh(new_travel)
    response_body = {
        "message": "Viaje agregado con éxito",
        "id": new_travel.id,
        "status": 200
    }
    return jsonify(response_body), 200

#Obtenemos todos los viajes
@api.route('/viajes/search', methods=['POST'])
def search_travels():
    body = json.loads(request.data)

    viajes = Viajes.query.filter(Viajes.desde.like(body["ciudad"]) | Viajes.hasta.like(body["ciudad"])).all() # esto obtiene todos los registros de la tabla User

    if len(viajes) == 0:
        raise APIException('Aún no hay viajes disponibles para esa ciudad', status_code=404)

    results = list(map(lambda item: item.serialize(), viajes)) #esto serializa los datos del arrays users

    return jsonify(results), 200
  
#Obtenemos un viaje dependiendo de su id
@api.route('/viaje/<int:travel_id>', methods=['GET'])
def get_one_travel(travel_id):
    travel = Viajes.query.filter_by(id=travel_id).first()

    if travel is None:
        raise APIException('El viaje que buscas no existe', status_code=404)

    response_body = {
        "viaje": travel.serialize(),
        "status": 200
    }
    return jsonify(response_body), 200

#Modificamos un viaje dependiendo de su ID
@api.route("/viaje/<int:travel_id>", methods=["PUT"])
@jwt_required()
def place(travel_id):
    travel = Viajes.query.filter_by(id=travel_id).first()
    body = json.loads(request.data)

    if travel is None:
        raise APIException('El viaje que buscas no existe', status_code=404)

    for key in body:
        for col in travel.serialize():
            if key == col and key != "id":
                setattr(travel, col, body[key])
    
    db.session.commit()

    response_body = {
        "message": "Viaje modificado con éxito",
        "status": 200
    }
    return jsonify(response_body), 200
            ##### Fin Viajes #####

            ##### Inicio Vehículos #####
#Modificamos un vehiculo dependiendo de su ID
@api.route('/vehicles/new', methods=['POST'])
@jwt_required()
def add_new_vehicle():
    body = json.loads(request.data)

    for i in body:
        if body[i] == None:
            raise APIException('Hay campos vacíos', status_code=204)
    
    new_vehicle = Vehiculos(
        id_usuario=body["id_usuario"],
        nombre=body["nombre"],
        modelo=body["modelo"],
        kms_por_litro=body["kms_por_litro"],
        cantidad_asientos=body["cantidad_asientos"],
        activo=1)

    db.session.add(new_vehicle)
    db.session.commit()
    response_body = {
        "message": "Vehículo agregado con éxito",
        "status": 200
    }
    return jsonify(response_body), 200

#Modificamos un vehículo dependiendo de su ID
@api.route("/vehicles/<int:vehicle_id>", methods=["PUT"])
@jwt_required()
def modify_vehicle(vehicle_id):
    vehicle = Vehiculos.query.filter_by(id=vehicle_id).first()
    body = json.loads(request.data)

    if vehicle is None:
        raise APIException('El acompañante que buscas no existe', status_code=404)

    for key in body:
        for col in vehicle.serialize():
            if key == col and key != "id":
                setattr(vehicle, col, body[key])
    
    db.session.commit()

    response_body = {
        "message": "Vehículo modificado con éxito",
        "status": 200
    }
    return jsonify(response_body), 200
           ##### Fin Vehículos #####

            ##### Inicio Acompañantes #####
#Obtenemos un acompañante dependiendo de su id
@api.route('/acompanante/t/<int:travel_id>/u/<int:user_id>', methods=['GET'])
def get_one_acompanante(travel_id, user_id):
    acompanante = Acompanantes.query.filter(Acompanantes.id_viaje==travel_id, Acompanantes.id_usuario==user_id).first()

    if acompanante is None:
        raise APIException('El acompañante que buscas no existe', status_code=404)

    response_body = {
        "acompanante": acompanante.serialize(),
        "status": 200
    }
    return jsonify(response_body), 200

#Agregamos un acompañante
@api.route('/acompanantes/new', methods=['POST'])
@jwt_required()
def add_new_acompanante():
    body = json.loads(request.data)

    for i in body:
        if body[i] == None:
            raise APIException('Hay campos vacíos', status_code=204)
    
    new_acompanante = Acompanantes(
        id_usuario=body["id_usuario"],
        id_viaje=body["id_viaje"],
        cantidad_asientos=body["cantidad_asientos"],
        activo=1,
        visto=0,
        estado=body["estado"])

    db.session.add(new_acompanante)
    db.session.commit()
    response_body = {
        "message": "Acompañante agregado con éxito",
        "status": 200
    }
    return jsonify(response_body), 200

#Modificamos un acompañante dependiendo de su ID
@api.route("/acompanantes/<int:acompanante_id>", methods=["PUT"])
@jwt_required()
def modify_acompanante(acompanante_id):
    acompanante = Acompanantes.query.filter_by(id=acompanante_id).first()
    body = json.loads(request.data)

    if acompanante is None:
        raise APIException('El acompañante que buscas no existe', status_code=404)

    for key in body:
        for col in acompanante.serialize():
            if key == col and key != "id":
                setattr(acompanante, col, body[key])
    
    db.session.commit()

    response_body = {
        "message": "Acompañante modificado con éxito",
        "status": 200
    }
    return jsonify(response_body), 200

#Obtenemos el estado de mis solicitudes de viajes
@api.route('/viajesreq/u/<int:user_id>', methods=['GET'])
def get_all_user_req(user_id):
    acompanantes = Acompanantes.query.filter(Acompanantes.id_usuario==user_id, not_(or_(Acompanantes.estado.like("pendiente"), Acompanantes.visto == True))).all()
    print(acompanantes)
    if len(acompanantes) == 0:
        raise APIException('Sin cambios en tus solicitudes de viajes', status_code=404)

    results = list(map(lambda item: item.serialize(), acompanantes)) #esto serializa los datos del arrays users
    print(results)
    return jsonify(results), 200

#Obtenemos las solicitudes de mis propios viajes
@api.route('/viajesreq/t/<int:user_id>', methods=['GET'])
def get_all_travel_req(user_id):
    acompanantes = Acompanantes.query.filter(user_id==Viajes.conductor, Acompanantes.estado.like("pendiente")).all()

    if len(acompanantes) == 0:
        raise APIException('Aún no tienes solicitudes de usuarios', status_code=404)

    results = list(map(lambda item: item.serialize(), acompanantes)) #esto serializa los datos del arrays users

    return jsonify(results), 200
           ##### Fin Acompañantes #####

#Recepcion y envio de datos del formulario
@api.route('/contactform', methods=['POST'])
def send_form():
    body = json.loads(request.data)


    if body["correo"] is None:
        raise APIException('Se necesita un correo', status_code=404)
    html = render_template('email/contact.html', nombre=body["nombre"],apellido=body["apellido"], correo=body["correo"],consulta=body["consulta"] )
    subject = "Formulario de contacto"
    send_email(current_app.config['MAIL_DEFAULT_SENDER'], subject, html)

    response_body = {
        "message": "Consulta enviada con éxito",
        "status": 200
    }
    return jsonify(response_body), 200
