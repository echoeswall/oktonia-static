def test_database_created(app):
    import os
    assert os.path.exists(app.config["DATABASE_PATH"])


def test_tables_exist(db):
    tables = {
        row["name"]
        for row in db.execute("SELECT name FROM sqlite_master WHERE type='table'")
    }
    assert {"places", "images", "admin_users"} <= tables


def test_foreign_keys_enabled(db):
    assert db.execute("PRAGMA foreign_keys").fetchone()[0] == 1


def test_health_endpoint(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}
