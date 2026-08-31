from flask import Blueprint, jsonify

bp = Blueprint("public", __name__)


@bp.get("/health")
def health():
    """Liveness check — proves the app boots and the DB config is wired up."""
    return jsonify(status="ok")
