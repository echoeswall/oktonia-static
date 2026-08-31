import os
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask

from . import db as db_module

BASE_DIR = Path(__file__).resolve().parent.parent


def create_app(test_config=None):
    load_dotenv(BASE_DIR / ".env")

    app = Flask(__name__)
    app.config.from_mapping(
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev-only-insecure-key"),
        DATABASE_PATH=os.environ.get("DATABASE_PATH", str(BASE_DIR / "data" / "oktonia.db")),
    )

    if test_config is not None:
        app.config.from_mapping(test_config)

    db_module.register_app(app)

    from .routes.public import bp as public_bp
    from .routes.admin import bp as admin_bp
    app.register_blueprint(public_bp)
    app.register_blueprint(admin_bp)

    return app
