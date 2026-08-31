import sqlite3
from pathlib import Path

import click
from flask import current_app, g

SCHEMA_PATH = Path(__file__).parent / "schema.sql"


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(
            current_app.config["DATABASE_PATH"],
            detect_types=sqlite3.PARSE_DECLTYPES,
        )
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA foreign_keys = ON")
    return g.db


def close_db(exception=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db(db_path=None):
    """Create tables from schema.sql. Safe to call repeatedly."""
    path = db_path or current_app.config["DATABASE_PATH"]
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(path)
    try:
        conn.execute("PRAGMA foreign_keys = ON")
        conn.executescript(SCHEMA_PATH.read_text(encoding="utf-8"))
        conn.commit()
    finally:
        conn.close()


@click.command("init-db")
def init_db_command():
    """Flask CLI: flask init-db"""
    init_db()
    click.echo(f"Database initialised at {current_app.config['DATABASE_PATH']}")


def register_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
