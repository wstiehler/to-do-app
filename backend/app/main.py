from flask import Flask
from flask_cors import CORS
from app.config.config import Config
from app.models.models import db
from app.routes.routes import routes_blueprint
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    allowed_origins = [
        "*"
    ]
    CORS(app, origins=allowed_origins)

    jwt = JWTManager(app)
    
    db.init_app(app)
    
    with app.app_context():
        db.create_all()

    app.register_blueprint(routes_blueprint)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run()
