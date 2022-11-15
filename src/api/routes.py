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
from api.emails import send_register_email

api = Blueprint('api', __name__)

           ##### Inicio JWT #####
#Logueamos al usuario si los datos proporcionados son correctos
@api.route("/login", methods=["POST"])
def login():
    nombre_usuario = request.json.get("nombre_usuario", None)
    clave = request.json.get("clave", None)
    usuario = Usuarios.query.filter_by(nombre_usuario=nombre_usuario).first()

    if usuario is None:
        raise APIException('El usuario ingresado no existe', status_code=404)

    if nombre_usuario != usuario.nombre_usuario or clave != usuario.clave:
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
        viajes_acompanante = list(map(lambda item: {**item.serializeViajes(), **item.serialize()}, viajes_acompanante))

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

    new_user = Usuarios(
        nombre_usuario=body["nombre_usuario"],
        nombre=body["nombre"],
        apellido=body["apellido"],
        clave=body["clave"],
        correo=body["correo"],
        departamento=body["departamento"],
        ciudad=body["ciudad"],
        fecha_nacimiento=body["fecha_nacimiento"].replace("-", ""),
        genero=body["genero"],
        sobre_mi=None,
        preferencias=None,
        url_avatar=None,
        confirmado=False,
        activo=1)

    db.session.add(new_user)
    db.session.commit()
    token = generate_confirmation_token(new_user.correo)
    confirm_url = os.environ["FRONTEND_URL"]+"/register/confirm/"
    html = render_template('email/activate.html', token=token, confirm_url=confirm_url)
    subject = "Por favor, confirma tu cuenta"
    send_register_email(new_user.correo, subject, html)
    response_body = {
        "message": "Usuario creado con éxito. Se ha enviado un correo de confirmación a tu correo electrónico",
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
        raise APIException('La cuenta ya ha sido confirmada. Por favor, inicia sesión', status_code=404)
    else:
        user.confirmado = True
        user.confirmado_en = datetime.datetime.now()
        db.session.add(user)
        db.session.commit()
        raise APIException('Cuenta confirmada con éxito', status_code=200)
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
        fecha=body["fecha"],
        hora=body["hora"],
        asientos_disponibles=body["asientos_disponibles"],
        costo_asiento_uy=body["costo_asiento_uy"],
        activo=1)

    db.session.add(new_travel)
    db.session.commit()
    response_body = {
        "message": "Viaje creado con éxito",
        "status": 200
    }
    return jsonify(response_body), 200
           ##### Fin Viajes #####