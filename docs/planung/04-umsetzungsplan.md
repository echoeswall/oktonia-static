# Umsetzungsplan

## Phase 0 – Verantwortlichkeiten und Grundlagen

Ziel: Vor dem Bau ist geklärt, wer Inhalte freigibt und langfristig pflegt.

- verantwortliche Person oder Trägerorganisation festlegen
- technische und redaktionelle Zuständigkeit benennen
- Sprachen und Übersetzungsverantwortliche bestimmen
- Bild-, Text- und Publikationsrechte klären
- Domainzugang dokumentieren
- Budget für VPS, Backups und gegebenenfalls E-Mail festlegen

Ergebnis: kurze Projektvereinbarung und benannte Ansprechpartner.

## Phase 1 – Inhalte inventarisieren

- vollständige Liste der Unterkünfte, Restaurants, Cafés und Geschäfte anlegen
- Strände, Wanderwege, Ziele, Kirchen und Klöster erfassen
- Vereine und deren offizielle Kontakte abfragen
- historische Texte, Quellen, Bilder und Zeitzeugenmaterial sammeln
- vorhandene Ausgaben der Dorfzeitung zusammentragen
- Bildrechte und Kontaktdatenfreigaben dokumentieren

Ergebnis: geprüfter Inhaltsbestand mit Prioritäten und fehlenden Angaben.

## Phase 2 – Struktur und Gestaltung

- Sitemap und URL-Struktur festlegen
- Inhaltsvorlagen für alle Eintragstypen definieren
- mobile Startseite und je eine typische Listen- und Detailseite gestalten
- typografische Wortmarke und Schriftwahl festlegen
- Bildformate und Bildzuschnitte definieren
- Sprachumschaltung konzipieren

Ergebnis: abgestimmtes Designsystem und klickbarer beziehungsweise statischer Prototyp.

## Phase 3 – Technische Basis

- Quellstruktur und automatisierten Build einrichten
- gemeinsame Komponenten für Header, Footer, Karten und Galerien bauen
- Mehrsprachigkeit technisch vorbereiten
- SEO-, Metadaten- und Barrierefreiheitsbasis umsetzen
- Bildoptimierung automatisieren
- Testumgebung bereitstellen

Ergebnis: funktionsfähige Website mit Platzhalter- und ersten Echtdaten.

## Phase 4 – MVP-Inhalte einpflegen

Empfohlene Reihenfolge:

1. Startseite und allgemeine Dorfvorstellung
2. Unterkünfte
3. Essen & Einkaufen
4. Strände und wichtigste Ausflugsziele
5. Kirchen & Klöster
6. Geschichte
7. Vereine und Dorfzeitung
8. Impressum, Datenschutz und Kontakt

Ergebnis: inhaltlich vollständige erste Veröffentlichung in der Hauptsprache; weitere Übersetzungen können schrittweise folgen.

## Phase 5 – VPS und Veröffentlichung

- passenden VPS bestellen und absichern
- Domain und DNS konfigurieren
- TLS und Webserver einrichten
- automatisierte Veröffentlichung einrichten
- externe Backups, Monitoring und Logrotation aktivieren
- technische und redaktionelle Abnahme durchführen
- Website öffentlich schalten

Ergebnis: erreichbare und überwachte Website unter `https://oktonia.info`.

## Phase 6 – Betrieb und Ausbau

- Kontaktdaten und Öffnungszeiten mindestens halbjährlich prüfen
- Wanderwege und Sicherheitshinweise saisonal prüfen
- Dorfzeitung und Veranstaltungen regelmäßig veröffentlichen
- fehlerhafte Links monatlich automatisch erkennen
- Statistik nur datensparsam und bei tatsächlichem Bedarf ergänzen
- nach realer Nutzung entscheiden, ob ein CMS oder Redaktionsportal nötig ist

## Priorisierung

| Priorität | Umfang |
| --- | --- |
| Muss | mobiloptimierte Seiten, drei Sprachen technisch vorbereitet, Unterkünfte, Gastronomie, Geschäfte, Ziele, Geschichte, Vereine, Dorfzeitungs-PDFs, Rechtstexte, HTTPS |
| Soll | Detailseiten, Filter, GPX-Downloads, Veranstaltungshinweise, strukturierte Daten, automatische Bildoptimierung |
| Kann später | Redaktionsportal, Veranstaltungskalender mit Eingabe, Artikelansicht der Dorfzeitung, Newsletter, interaktive Karten |
| Nicht geplant | eigene Buchung, Bezahlung, Benutzerbewertungen, öffentliche Kommentare |

## Grober Aufwand

Bei vorhandenem und freigegebenem Material ist für Konzeption, Design, Entwicklung, Einpflege und Veröffentlichung eines soliden MVP grob mit vier bis acht Arbeitswochen zu rechnen. Der größte Unsicherheitsfaktor ist nicht die Technik, sondern Sammlung, Rechteklärung, Übersetzung und Prüfung der Inhalte.

## Definition of Done für Version 1

- alle Muss-Seiten sind mobil und auf Desktop nutzbar
- jeder veröffentlichte Eintrag hat Quelle beziehungsweise verantwortlichen Kontakt und Prüfdatum
- alle Bilder und Kontaktdaten sind freigegeben
- Kerninhalte sind in der Hauptsprache vollständig
- Sprachwechsel führt nie auf falsche oder leere Seiten ohne Hinweis
- Website ist schnell, barrierearm und ohne unnötiges Tracking nutzbar
- Backup, Aktualisierung und Inhaltskorrektur wurden einmal praktisch getestet

