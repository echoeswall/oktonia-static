"""Data access for places/images. Plain sqlite3, no ORM (see _working/PHASE-1-BESTANDSAUFNAHME.md).

Validation is enforced by the database constraints in schema.sql (NOT NULL, UNIQUE,
CHECK). Callers should expect sqlite3.IntegrityError for invalid data.
"""

# Single source of truth for the `type` enum. Must stay in sync with the
# CHECK constraint in schema.sql — there is only one place in Python that
# needs to know this list.
PLACE_TYPES = (
    "restaurant", "apartment", "church", "beach",
    "shop", "sight", "monastery", "other",
)

_PLACE_FIELDS = (
    "slug", "type", "name", "short_description", "description",
    "latitude", "longitude", "address", "phone", "email", "website",
    "booking_url", "published",
)


def create_place(db, **fields):
    unknown = set(fields) - set(_PLACE_FIELDS)
    if unknown:
        raise ValueError(f"Unknown place field(s): {sorted(unknown)}")
    columns = list(fields)
    placeholders = ", ".join("?" for _ in columns)
    sql = f"INSERT INTO places ({', '.join(columns)}) VALUES ({placeholders})"
    cur = db.execute(sql, [fields[c] for c in columns])
    db.commit()
    return cur.lastrowid


def get_place(db, id=None, slug=None):
    if (id is None) == (slug is None):
        raise ValueError("Pass exactly one of id or slug")
    if id is not None:
        row = db.execute("SELECT * FROM places WHERE id = ?", (id,)).fetchone()
    else:
        row = db.execute("SELECT * FROM places WHERE slug = ?", (slug,)).fetchone()
    return row


def list_places(db, type=None, published=None):
    query = "SELECT * FROM places WHERE 1=1"
    params = []
    if type is not None:
        query += " AND type = ?"
        params.append(type)
    if published is not None:
        query += " AND published = ?"
        params.append(1 if published else 0)
    query += " ORDER BY name"
    return db.execute(query, params).fetchall()


def update_place(db, id, **fields):
    unknown = set(fields) - set(_PLACE_FIELDS)
    if unknown:
        raise ValueError(f"Unknown place field(s): {sorted(unknown)}")
    if not fields:
        return
    assignments = ", ".join(f"{col} = ?" for col in fields)
    sql = f"UPDATE places SET {assignments}, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?"
    db.execute(sql, [*fields.values(), id])
    db.commit()


def delete_place(db, id):
    db.execute("DELETE FROM places WHERE id = ?", (id,))
    db.commit()


def add_image(db, place_id, filename, caption=None, alt_text=None, sort_order=0, is_cover=False):
    cur = db.execute(
        """INSERT INTO images (place_id, filename, caption, alt_text, sort_order, is_cover)
           VALUES (?, ?, ?, ?, ?, ?)""",
        (place_id, filename, caption, alt_text, sort_order, 1 if is_cover else 0),
    )
    db.commit()
    return cur.lastrowid


def list_images(db, place_id):
    return db.execute(
        "SELECT * FROM images WHERE place_id = ? ORDER BY sort_order, id",
        (place_id,),
    ).fetchall()
