# Oktonia Backend (Phase 2 – lokal)

Status: **nur lokal**, noch nicht deployed. Die produktive Website (oktonia.info)
läuft weiterhin unverändert als statisches HTML/CSS/JS aus `index.html`,
`bereich.html`, `script.js`, `styles.css` (siehe DOKUMENTATION.md). Dieses
Backend läuft davon komplett getrennt und ersetzt aktuell nichts.

Hintergrund und Entscheidungen: `_working/PHASE-1-BESTANDSAUFNAHME.md`.

## Architektur

```text
Flask (app/)
  ├── SQLite (data/oktonia.db, gitignored)
  ├── app/schema.sql   – places, images, admin_users
  ├── app/models.py    – Datenzugriff (reines sqlite3, kein ORM)
  ├── app/routes/public.py  – aktuell nur GET /health
  └── app/routes/admin.py   – Skelett, noch ohne Routen (kommt Phase 3/4)
```

Scope-Entscheidung (siehe `_working/PHASE-1-BESTANDSAUFNAHME.md` Abschnitt 4.4):
Das `places`-Modell deckt zunächst nur die vier ortsbezogenen Bereiche ab
(Übernachten, Essen & Einkaufen, Entdecken, Kirchen & Klöster). Geschichte und
Dorfleben bleiben vorerst Teil der statischen Seite.

## Setup

```powershell
# einmalig
python -m venv .venv
.venv\Scripts\pip install -r requirements-dev.txt
copy .env.example .env
# .env öffnen und SECRET_KEY durch einen echten Zufallswert ersetzen:
python -c "import secrets; print(secrets.token_hex(32))"

# Datenbank anlegen
$env:FLASK_APP = "wsgi.py"
.venv\Scripts\python -m flask init-db
```

## Entwicklung

```powershell
.venv\Scripts\python wsgi.py
# läuft auf http://127.0.0.1:5000, Debug-Modus an
curl http://127.0.0.1:5000/health
```

## Tests

```powershell
.venv\Scripts\python -m pytest app/tests -v
```

16 Tests (Stand Phase 2): DB-Erzeugung, Foreign Keys aktiv, CRUD auf `places`,
Filter nach Typ/Status, Bildreferenz inkl. Cascade-Delete, Ablehnung
ungültiger Daten (doppelter Slug, ungültiger Typ, fehlendes Pflichtfeld,
Koordinaten außerhalb des gültigen Bereichs).

## Datenmodell

`places.type` ist auf einen festen Wertebereich beschränkt (CHECK-Constraint
in `schema.sql`, gespiegelt als `PLACE_TYPES` in `app/models.py` — das ist die
einzige Stelle, die beide Werte kennen muss):

```text
restaurant, apartment, church, beach, shop, sight, monastery, other
```

Löschen eines `place` löscht über `ON DELETE CASCADE` automatisch dessen
`images`-Einträge mit.

## Nicht Teil von Phase 2

- Admin-Authentifizierung (Phase 3)
- Formulare zum Anlegen/Bearbeiten (Phase 4)
- Bild-Upload (Phase 5)
- Karteneditor (Phase 6)
- Deployment auf den VPS, Nginx-Reverse-Proxy, Gunicorn/systemd (erst nach
  expliziter Freigabe — siehe Einschränkungen zum SSH-Zugriff in
  `_working/PHASE-1-BESTANDSAUFNAHME.md` Abschnitt 3)

## Offene Punkte für Phase 3

- i18n-Strategie serverseitig vs. clientseitig ist weiterhin nicht final
  entschieden (siehe Bestandsaufnahme Abschnitt 4.3) — wird spätestens beim
  ersten Jinja2-Template in Phase 4 relevant.
