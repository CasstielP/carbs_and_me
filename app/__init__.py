from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_jwt_extended import JWTManager

jwt = JWTManager()


db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_COOKIE_CSRF_PROTECT'] = True


    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from app.routes import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    return app
