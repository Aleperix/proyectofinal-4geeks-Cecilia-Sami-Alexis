from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(250), unique=False, nullable=False)
    nombre = db.Column(db.String(250), unique=False, nullable=False)
    apellido = db.Column(db.String(250), unique=False, nullable=False)
    clave = db.Column(db.String(250), unique=False, nullable=False)
    correo = db.Column(db.String(250), unique=False, nullable=False)
    ciudad = db.Column(db.String(250), unique=False, nullable=False)
    fecha_nacimiento = db.Column(db.Integer, unique=False, nullable=False)
    genero = db.Column(db.String(250), unique=False, nullable=False)
    sobre_mi = db.Column(db.String(250), unique=False, nullable=True)
    preferencias = db.Column(db.String(250), unique=False, nullable=True)
    url_avatar = db.Column(db.String(500), unique=False, nullable=True)
    activo = db.Column(db.Boolean(), unique=False, nullable=False)
    viajes = db.relationship('Viajes', backref='usuarios', lazy=True)
    vehiculos = db.relationship('Vehiculos', backref='usuarios', lazy=True)
    acompanantes = db.relationship('Acompanantes', backref='usuarios', lazy=True)

    def __repr__(self):
        return f'<Usuarios {self.correo}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_usuario": self.nombre_usuario,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "correo": self.correo,
            "ciudad": self.ciudad,
            "fecha_nacimiento": self.fecha_nacimiento,
            "genero": self.genero,
            "sobre_mi": self.sobre_mi,
            "preferencias": self.preferencias,
            "url_avatar": self.url_avatar,
            "activo": self.activo,
            # do not serialize the password, its a security breach
        }

class Vehiculos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    nombre = db.Column(db.String(250), nullable=False)
    modelo = db.Column(db.String(250), nullable=False)
    kms_por_litro = db.Column(db.Integer, nullable=False)
    cantidad_asientos = db.Column(db.Integer, nullable=False)
    viajes = db.relationship('Viajes', backref='vehiculos', lazy=True)

    def __repr__(self):
        return f'<Vehiculos {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "nombre": self.nombre,
            "modelo": self.modelo,
            "kms_por_litro": self.kms_por_litro,
            "cantidad_asientos": self.cantidad_asientos,
            # do not serialize the password, its a security breach
        }

class Viajes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    acerca = db.Column(db.String(250), nullable=False)
    conductor = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    vehiculo = db.Column(db.Integer, db.ForeignKey('vehiculos.id'))
    desde = db.Column(db.String(250), nullable=False)
    hasta = db.Column(db.String(250), nullable=False)
    fecha = db.Column(db.Integer, nullable=False)
    hora = db.Column(db.Integer, nullable=False)
    asientos_disponibles = db.Column(db.Integer, nullable=False)
    costo_asiento_uy = db.Column(db.Integer, nullable=False)
    activo = db.Column(db.Boolean(), nullable=False)
    acompanantes = db.relationship('Acompanantes', backref='viajes', lazy=True)

    def __repr__(self):
        return f'<Viajes {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "acerca": self.acerca,
            "conductor": self.conductor,
            "vehiculo": self.vehiculo,
            "desde": self.desde,
            "hasta": self.hasta,
            "fecha": self.fecha,
            "hora": self.hora,
            "asientos_disponibles": self.asientos_disponibles,
            "costo_asiento_uy": self.costo_asiento_uy,
            "activo": self.activo,
            # do not serialize the password, its a security breach
        }

class Acompanantes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    id_viaje = db.Column(db.Integer, db.ForeignKey('viajes.id'))

    def __repr__(self):
        return f'<Acompanantes {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_usuario": self.id_usuario,
            "id_viaje": self.id_viaje,
            # do not serialize the password, its a security breach
        }