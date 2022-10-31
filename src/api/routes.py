"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuarios, Vehiculos, Viajes, Acompanantes
from api.utils import generate_sitemap, APIException
import json
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

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
        raise APIException('El usuario ingresado no existe', status_code=401)

    if nombre_usuario != usuario.nombre_usuario or clave != usuario.clave:
        raise APIException('Usuario o contraseña incorrectos', status_code=401)

    access_token = create_access_token(identity=nombre_usuario)
    response_body = {
        "access_token": access_token,
        "usuario": usuario.serialize()
    }
    return jsonify(response_body)

@api.route("/isauth", methods=["GET"])
@jwt_required()
def is_auth():
    return jsonify(get_jwt_identity()), 200
           ##### Fin JWT #####