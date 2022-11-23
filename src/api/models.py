from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(db.String(250), unique=False, nullable=False)
    nombre = db.Column(db.String(250), unique=False, nullable=False)
    apellido = db.Column(db.String(250), unique=False, nullable=False)
    clave = db.Column(db.String(250), unique=False, nullable=False)
    correo = db.Column(db.String(250), unique=False, nullable=False)
    celular = db.Column(db.Integer, nullable=False)
    departamento = db.Column(db.String(250), unique=False, nullable=False)
    ciudad = db.Column(db.String(250), unique=False, nullable=False)
    fecha_nacimiento = db.Column(db.String(8), unique=False, nullable=False)
    genero = db.Column(db.String(250), unique=False, nullable=False)
    sobre_mi = db.Column(db.String(250), unique=False, nullable=True)
    preferencias = db.Column(db.String(250), unique=False, nullable=True)
    url_avatar = db.Column(db.String(500), unique=False, nullable=True)
    confirmado = db.Column(db.Boolean(), unique=False, nullable=False)
    confirmado_en = db.Column(db.DateTime, nullable=True)
    activo = db.Column(db.Boolean(), unique=False, nullable=False)
    viajes = db.relationship('Viajes', backref='usuarios', lazy=True)
    vehiculos = db.relationship('Vehiculos', backref='usuarios', lazy=True)
    acompanantes = db.relationship('Acompanantes', backref='usuarios', lazy=True)

    def __repr__(self):
        return f'<Usuarios {self.correo}>'

    def serialize(self):
        vehiculos = Vehiculos.query.filter_by(id_usuario=self.id).all()
        vehiculos = list(map(lambda item: item.serialize(), vehiculos))
        return {
            "id": self.id,
            "nombre_usuario": self.nombre_usuario,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "correo": self.correo,
            "celular": self.celular,
            "departamento": self.departamento,
            "ciudad": self.ciudad,
            "fecha_nacimiento": self.fecha_nacimiento,
            "genero": self.genero,
            "sobre_mi": self.sobre_mi,
            "preferencias": self.preferencias,
            "url_avatar": self.url_avatar,
            "activo": self.activo,
            "vehiculos": vehiculos
        }
    def serializeViaje(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "url_avatar": self.url_avatar,
            "preferencias": self.preferencias,
            "correo": self.correo,
            "celular": self.celular,
        }

class Vehiculos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    nombre = db.Column(db.String(250), nullable=False)
    modelo = db.Column(db.String(250), nullable=False)
    kms_por_litro = db.Column(db.Integer, nullable=False)
    cantidad_asientos = db.Column(db.String(20), nullable=False)
    activo = db.Column(db.Boolean(), unique=False, nullable=False)
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
            "activo": self.activo
            # do not serialize the password, its a security breach
        }
    def serializeModelo(self):
        return self.modelo

class Viajes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    acerca = db.Column(db.String(250), nullable=False)
    conductor = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    vehiculo = db.Column(db.Integer, db.ForeignKey('vehiculos.id'))
    desde = db.Column(db.String(250), nullable=False)
    hasta = db.Column(db.String(250), nullable=False)
    fecha = db.Column(db.String(8), nullable=False)
    hora = db.Column(db.String(4), nullable=False)
    asientos_disponibles = db.Column(db.String(20), nullable=False)
    costo_asiento_uy = db.Column(db.String(20), nullable=False)
    activo = db.Column(db.Boolean(), nullable=False)
    acompanantes = db.relationship('Acompanantes', backref='viajes', lazy=True)

    def __repr__(self):
        return f'<Viajes {self.id}>'

    def serialize(self):
        conductor = Usuarios.query.filter_by(id=self.conductor).first()
        conductor = conductor.serializeViaje()
        vehiculo = Vehiculos.query.filter_by(id=self.vehiculo).first()
        vehiculo = vehiculo.serializeModelo()
        return {
            "id": self.id,
            "acerca": self.acerca,
            "conductor": conductor,
            "vehiculo": vehiculo,
            "desde": self.desde,
            "hasta": self.hasta,
            "fecha": self.fecha,
            "hora": self.hora,
            "asientos_disponibles": self.asientos_disponibles,
            "costo_asiento_uy": self.costo_asiento_uy,
            "activo": self.activo,
            # do not serialize the password, its a security breach
        }
    def serializeAcompanante(self):
        conductor = Usuarios.query.filter_by(id=self.conductor).first()
        conductor = conductor.serializeViaje()
        vehiculo = Vehiculos.query.filter_by(id=self.vehiculo).first()
        vehiculo = vehiculo.serializeModelo()
        return {
            "id": self.id,
            "conductor": conductor,
            "desde": self.desde,
            "hasta": self.hasta,
            "fecha": self.fecha,
            "hora": self.hora,
            "vehiculo": vehiculo,
        }

class Acompanantes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    id_viaje = db.Column(db.Integer, db.ForeignKey('viajes.id'))
    cantidad_asientos = db.Column(db.String(10), nullable=False)
    activo = db.Column(db.Boolean(), nullable=False)
    estado = db.Column(db.String(20), nullable=False)
    visto = db.Column(db.Boolean(), nullable=False)
    

    def __repr__(self):
        return f'<Acompanantes {self.id}>'

    def serialize(self):
        usuario = Usuarios.query.filter_by(id=self.id_usuario).first()
        usuario = usuario.serializeViaje()
        viaje = Viajes.query.filter_by(id=self.id_viaje).first()
        viaje = viaje.serializeAcompanante()
        return {
            "id": self.id,
            "usuario": usuario,
            "viaje": viaje,
            "estado": self.estado,
            "visto": self.visto,
            "activo": self.activo
            # do not serialize the password, its a security breach
        }