# Technische Requirements

## Empfohlener Ansatz

Version 1 wird als statische Website umgesetzt:

- semantisches HTML5
- modernes CSS ohne großes UI-Framework
- sehr wenig JavaScript, nur für Menü, Filter, Galerie und optionale Funktionen
- Inhalte entweder direkt in strukturierten Dateien oder zur Bauzeit aus Markdown/JSON erzeugt
- Veröffentlichung als fertige HTML-Dateien auf einem VPS

Ein Static-Site-Generator kann intern die Pflege vereinfachen, ohne dass Besucher davon abhängig sind. Der ausgelieferte Stand bleibt normales HTML/CSS/JavaScript.

## VPS und Betrieb

Für den Start reicht in der Regel:

| Ressource | Mindestwert | Empfehlung |
| --- | ---: | ---: |
| vCPU | 1 | 1–2 |
| RAM | 512 MB | 1 GB |
| SSD | 10 GB | 20–25 GB, abhängig von Bildern und PDFs |
| Betriebssystem | aktuelles Debian oder Ubuntu LTS | Debian Stable oder Ubuntu LTS |
| Webserver | Nginx oder Caddy | Nginx, alternativ Caddy |

Weitere Anforderungen:

- feste öffentliche IPv4 und/oder funktionierende IPv6-Adresse
- DNS-Verwaltung für `oktonia.info` und `www.oktonia.info`
- kostenloses TLS-Zertifikat über Let's Encrypt
- SSH-Zugang ausschließlich mit Schlüssel, kein Passwort-Login für Administratoren
- Firewall mit nur SSH, HTTP und HTTPS; SSH nach Möglichkeit zusätzlich eingeschränkt
- automatische Sicherheitsupdates oder geregelter monatlicher Patchtermin
- tägliches Backup der Website-Daten und Konfiguration an einen zweiten Ort
- Uptime- und Zertifikatsüberwachung

## Domain und DNS

- `oktonia.info` als kanonische Adresse
- `www.oktonia.info` leitet dauerhaft auf die kanonische Adresse um
- DNS-Einträge für IPv4/IPv6
- CAA-Eintrag optional auf den verwendeten Zertifikatsanbieter begrenzen
- DNSSEC aktivieren, sofern Registrar und DNS-Anbieter dies sauber unterstützen
- E-Mail-Versand nicht über den Webserver betreiben; dafür einen etablierten Mailanbieter nutzen

## Dateistruktur – Beispiel

```text
site/
├── index.html
├── de/
├── el/
├── en/
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── fonts/
│   └── documents/
├── robots.txt
├── sitemap.xml
└── 404.html
```

Bei automatischer Generierung kommen getrennte Quellordner für Layouts, Inhalte und strukturierte Datensätze hinzu.

## Inhaltsdaten

Wiederkehrende Einträge sollten strukturiert gespeichert werden, zum Beispiel mit folgenden technischen Feldern:

- dauerhafte ID und URL-Slug
- Inhaltstyp und Kategorie
- Status: Entwurf, geprüft, veröffentlicht, archiviert
- Sprachversion
- Titel und Kurzbeschreibung
- Kontakt- und Linkfelder
- Koordinaten
- Bilder mit Alternativtext, Urheber und Freigabestatus
- Quellen
- Datum der letzten inhaltlichen Prüfung

Telefonnummern werden intern im internationalen Format gespeichert. Öffnungszeiten brauchen eine flexible Textdarstellung, weil saisonale und kurzfristige Änderungen üblich sind.

## Bilder und Dokumente

- Originalbilder getrennt archivieren
- Webbilder automatisiert in AVIF und WebP, mit JPEG als Fallback
- mehrere Auflösungen per `srcset`
- sinnvolle Zielgröße: meist unter 300 KB pro sichtbarem Bild, ohne historische Bilder unlesbar zu komprimieren
- Lazy Loading unterhalb des sichtbaren Bereichs
- PDF-Dateien optimieren und mit zugänglichem Titel versehen
- maximale Uploadgröße und Dateitypen begrenzen, sobald ein Redaktionszugang existiert

## Sicherheit

- keine Datenbank und keine öffentliche Anmeldung in Version 1
- strenge Security Header, darunter Content Security Policy, HSTS und Schutz gegen MIME-Sniffing
- keine Drittanbieter-Skripte ohne konkreten Nutzen
- Abhängigkeiten minimieren und regelmäßig aktualisieren
- Deployment über getrennten, eingeschränkten Benutzer
- Server- und Zugriffslogs rotieren und nur begrenzt aufbewahren
- Kontaktformular nur bei echtem Bedarf; zunächst besser eine geschützte Kontaktadresse anzeigen
- bei Formularen: Spam-Schutz, Eingabevalidierung, Rate Limit und keine sensiblen Daten abfragen

## Datenschutz und Recht

Vor Veröffentlichung werden mindestens benötigt:

- Impressum mit verantwortlicher Stelle
- Datenschutzerklärung
- dokumentierte Bild- und Textrechte
- Einwilligungen bei erkennbaren Personen, besonders Minderjährigen
- Freigabe der veröffentlichten geschäftlichen Kontaktdaten
- klare Verantwortlichkeit für Dorfzeitung und Vereinsinhalte
- Verfahren für Korrektur- und Löschanfragen

Eine lokal eingebundene Schrift und eine zunächst nicht eingebettete Karte reduzieren Datenschutzaufwand. Karten können als externer Link oder erst nach bewusster Aktivierung geladen werden. Ein Cookie-Banner ist nicht automatisch nötig, wenn keine nicht erforderlichen Tracker oder Drittinhalte gesetzt werden.

## Suchmaschinen und Teilen

- pro Seite eindeutiger Titel und Beschreibung
- kanonische URLs und Sprachverweise (`hreflang`)
- `sitemap.xml` und `robots.txt`
- strukturierte Daten für lokale Unternehmen, Unterkünfte, Orte und Veranstaltungen, soweit sachlich korrekt
- Open-Graph-Bild und Metadaten
- sprechende URLs ohne Dateiendung, soweit der Build dies unterstützt

## Qualität und Zielwerte

- responsive Darstellung ab 320 px Breite
- aktuelle Versionen von Firefox, Chrome, Edge und Safari
- Lighthouse als technische Orientierung: Performance, Accessibility, Best Practices und SEO jeweils möglichst über 90
- Largest Contentful Paint unter 2,5 Sekunden bei typischer Mobilverbindung
- kein Layoutspringen durch Bilder oder Schriften
- alle internen Links automatisiert prüfen
- HTML validieren

## Redaktion und Veröffentlichung

### Stufe 1 – empfohlen für den Start

Inhalte werden über versionierte Markdown-/Datendateien gepflegt. Eine Änderung wird geprüft und anschließend automatisch auf den VPS übertragen. Das eignet sich für wenige verantwortliche Redakteure.

### Stufe 2 – später möglich

Eine geschützte, einfache Weboberfläche erlaubt Vereinen oder der Dorfzeitung, Entwürfe einzureichen. Neue Inhalte werden nicht sofort öffentlich, sondern durchlaufen eine Freigabe. Dafür werden Authentifizierung, Rollen, Datenbank, Upload-Prüfung und zusätzliche Backups erforderlich.

## Technische Abnahme

- HTTPS funktioniert und HTTP leitet korrekt weiter
- Backups wurden testweise wiederhergestellt
- keine geheimen Schlüssel im öffentlich ausgelieferten Code
- alle Sprachversionen haben korrekte Links
- Telefon-, Karten-, Download- und externe Links funktionieren
- 404-Seite vorhanden
- Datenschutz- und Rechtsseiten veröffentlicht
- Bildrechte und Quellen sind intern nachweisbar
- Sicherheitsupdates, Monitoring und Verantwortlichkeiten sind dokumentiert

