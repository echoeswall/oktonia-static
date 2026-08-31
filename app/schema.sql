-- Oktonia CMS schema (Phase 2)
-- Applied via app.db.init_db(). Safe to re-run (IF NOT EXISTS).

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS places (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    slug               TEXT NOT NULL UNIQUE,
    type               TEXT NOT NULL CHECK (type IN (
                           'restaurant', 'apartment', 'church', 'beach',
                           'shop', 'sight', 'monastery', 'other'
                       )),
    name               TEXT NOT NULL,
    short_description  TEXT,
    description        TEXT,
    latitude           REAL CHECK (latitude IS NULL OR (latitude BETWEEN -90 AND 90)),
    longitude          REAL CHECK (longitude IS NULL OR (longitude BETWEEN -180 AND 180)),
    address            TEXT,
    phone              TEXT,
    email              TEXT,
    website            TEXT,
    booking_url        TEXT,
    published          INTEGER NOT NULL DEFAULT 0 CHECK (published IN (0, 1)),
    created_at         TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at         TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS images (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    place_id    INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    filename    TEXT NOT NULL,
    caption     TEXT,
    alt_text    TEXT,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    is_cover    INTEGER NOT NULL DEFAULT 0 CHECK (is_cover IN (0, 1)),
    created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS admin_users (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    username       TEXT NOT NULL UNIQUE,
    password_hash  TEXT NOT NULL,
    created_at     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_images_place_id ON images(place_id);
CREATE INDEX IF NOT EXISTS idx_places_type ON places(type);
CREATE INDEX IF NOT EXISTS idx_places_published ON places(published);
