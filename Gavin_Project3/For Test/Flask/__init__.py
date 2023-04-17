from flask import Flask, jsonify
from .extensions import db
from .routes import main

def create app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
    # postgres://project3tornadoes_user:jQtDBNu75Ca7ypSQ93IXRtqIvvAAIMXp@dpg-cgu4clt269vbmeoshuh0-a.oregon-postgres.render.com/project3tornadoes
    db.init_app(app)
    app.register_blueprint(main)
    return app