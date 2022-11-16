"""empty message

Revision ID: 3f37127fdd61
Revises: 
Create Date: 2022-11-11 18:56:01.785826

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3f37127fdd61'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('usuarios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre_usuario', sa.String(length=250), nullable=False),
    sa.Column('nombre', sa.String(length=250), nullable=False),
    sa.Column('apellido', sa.String(length=250), nullable=False),
    sa.Column('clave', sa.String(length=250), nullable=False),
    sa.Column('correo', sa.String(length=250), nullable=False),
    sa.Column('departamento', sa.String(length=250), nullable=False),
    sa.Column('ciudad', sa.String(length=250), nullable=False),
    sa.Column('fecha_nacimiento', sa.Integer(), nullable=False),
    sa.Column('genero', sa.String(length=250), nullable=False),
    sa.Column('sobre_mi', sa.String(length=250), nullable=True),
    sa.Column('preferencias', sa.String(length=250), nullable=True),
    sa.Column('url_avatar', sa.String(length=500), nullable=True),
    sa.Column('confirmado', sa.Boolean(), nullable=False),
    sa.Column('confirmado_en', sa.DateTime(), nullable=True),
    sa.Column('activo', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('vehiculos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_usuario', sa.Integer(), nullable=True),
    sa.Column('nombre', sa.String(length=250), nullable=False),
    sa.Column('modelo', sa.String(length=250), nullable=False),
    sa.Column('kms_por_litro', sa.Integer(), nullable=False),
    sa.Column('cantidad_asientos', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_usuario'], ['usuarios.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('viajes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('acerca', sa.String(length=250), nullable=False),
    sa.Column('conductor', sa.Integer(), nullable=True),
    sa.Column('vehiculo', sa.Integer(), nullable=True),
    sa.Column('desde', sa.String(length=250), nullable=False),
    sa.Column('hasta', sa.String(length=250), nullable=False),
    sa.Column('fecha', sa.Integer(), nullable=False),
    sa.Column('hora', sa.Integer(), nullable=False),
    sa.Column('asientos_disponibles', sa.Integer(), nullable=False),
    sa.Column('costo_asiento_uy', sa.Integer(), nullable=False),
    sa.Column('activo', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['conductor'], ['usuarios.id'], ),
    sa.ForeignKeyConstraint(['vehiculo'], ['vehiculos.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('acompanantes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_usuario', sa.Integer(), nullable=True),
    sa.Column('id_viaje', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_usuario'], ['usuarios.id'], ),
    sa.ForeignKeyConstraint(['id_viaje'], ['viajes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('acompanantes')
    op.drop_table('viajes')
    op.drop_table('vehiculos')
    op.drop_table('usuarios')
    # ### end Alembic commands ###
