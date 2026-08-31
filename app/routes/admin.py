from flask import Blueprint

# Reserved for Phase 3 (authentication) and Phase 4 (place CRUD).
# Intentionally empty for now — see _working/PHASE-1-BESTANDSAUFNAHME.md,
# Abschnitt 17: phases are not skipped ahead of.
bp = Blueprint("admin", __name__, url_prefix="/admin")
