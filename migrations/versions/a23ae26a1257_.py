"""empty message

Revision ID: a23ae26a1257
Revises: 
Create Date: 2022-10-27 19:17:08.869741

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a23ae26a1257'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('usuarios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('usuario', sa.String(length=250), nullable=False),
    sa.Column('nombre', sa.String(length=250), nullable=False),
    sa.Column('apellido', sa.String(length=250), nullable=False),
    sa.Column('clave', sa.String(length=250), nullable=False),
    sa.Column('correo', sa.String(length=250), nullable=False),
    sa.Column('ciudad', sa.String(length=250), nullable=False),
    sa.Column('fecha_nacimiento', sa.Integer(), nullable=False),
    sa.Column('genero', sa.String(length=250), nullable=False),
    sa.Column('sobre_mi', sa.String(length=250), nullable=False),
    sa.Column('preferencias', sa.String(length=250), nullable=False),
    sa.Column('url_avatar', sa.String(length=500), nullable=False),
    sa.Column('activo', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('usuarios')
    # ### end Alembic commands ###
