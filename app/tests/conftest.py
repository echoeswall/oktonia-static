import os
import tempfile

import pytest

from app import create_app
from app.db import init_db


@pytest.fixture
def app():
    fd, db_path = tempfile.mkstemp(suffix=".db")
    os.close(fd)

    application = create_app({
        "TESTING": True,
        "DATABASE_PATH": db_path,
        "SECRET_KEY": "test-key",
    })

    with application.app_context():
        init_db(db_path)

    yield application

    os.unlink(db_path)


@pytest.fixture
def db(app):
    with app.app_context():
        from app.db import get_db
        yield get_db()


@pytest.fixture
def client(app):
    return app.test_client()
