from flask_mail import Message
from flask import current_app

def send_register_email(to, subject, template):
    msg = Message(
        subject,
        recipients=[to],
        html=template,
        sender=current_app.config['MAIL_DEFAULT_SENDER']
    )
    current_app.mail.send(msg)