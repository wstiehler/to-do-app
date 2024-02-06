from flask import Flask
from app.config.config import Config
from app.models.models import db
from app.routes.routes import routes_blueprint
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicialize o JWTManager
    jwt = JWTManager(app)
    
    db.init_app(app)
    
    # Mova db.create_all() para dentro do contexto de aplicativo Flask
    with app.app_context():
        db.create_all()

    app.register_blueprint(routes_blueprint)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run()
