"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuarios, Vehiculos, Viajes, Acompanantes
from api.utils import generate_sitemap, APIException
import json
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)


           ##### Inicio JWT #####

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
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
        "usuario": usuario.serialize()
    }
    return jsonify(response_body)

@api.route("/isauth", methods=["GET"])
@jwt_required()
def is_auth():
    # Access the identity of the current user with get_jwt_identity
    usuario_actual = get_jwt_identity()

    usuario = Usuarios.query.filter_by(nombre_usuario=usuario_actual).first()

    if usuario is None:
        raise APIException('No tienes permitido hacer esto', status_code=401)

    response_body = {
        "usuario": usuario.serialize()
    }
    return jsonify(response_body), 200

@api.route("/profile/<int:id_usuario>", methods=["GET"])
@jwt_required()
def profile(id_usuario):

    usuario = Usuarios.query.filter_by(id=id_usuario).first()

    if usuario is None:
        raise APIException('El usuario no ha sido encontrado', status_code=404)

    vehiculos = Vehiculos.query.filter_by(id_usuario=id_usuario).all()
    if len(vehiculos) == 0:
        vehiculos = {"message": 'El usuario aún no tiene vehículos'}
    else:
        vehiculos = list(map(lambda item: item.serialize(), vehiculos)) #esto serializa los datos del arrays users

    viajes_conductor = Viajes.query.filter_by(conductor=id_usuario).all()
    if viajes_conductor is None:
        viajes_conductor = {"message": 'El usuario no ha hecho viajes como conductor'}
        
    viajes_acompanante = Acompanantes.query.filter_by(id_usuario=id_usuario).all()
    if viajes_acompanante is None:
        viajes_acompanante = {"message": 'El usuario no ha hecho viajes como acompañante'}

    print(vehiculos)
    response_body = {
        "perfil": usuario.serialize(),
        "vehiculos": vehiculos
    }
    return jsonify(response_body), 200
           ##### Fin JWT #####