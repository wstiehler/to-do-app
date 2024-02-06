from flask import Flask
from app.config.config import Config
from app.models import db
from app.routes import routes_blueprint

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    app.register_blueprint(routes_blueprint)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run()
