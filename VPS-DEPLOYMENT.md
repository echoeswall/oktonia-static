# Späteres Hosting auf einem eigenen VPS

Diese Anleitung ist für den späteren Produktivbetrieb gedacht. Für die aktuelle Design- und Inhaltsphase ist GitHub Pages einfacher und verursacht keinen Serverwartungsaufwand.

## Empfohlene Mindestkonfiguration

| Komponente | Empfehlung |
| --- | --- |
| Betriebssystem | Debian Stable oder Ubuntu LTS |
| CPU | 1 vCPU |
| RAM | 1 GB |
| SSD | 10–20 GB plus Platz für Bilder/PDFs |
| Webserver | Nginx oder Caddy |
| Zugänge | SSH ausschließlich mit Schlüssel |
| offene Ports | 22, 80 und 443; SSH möglichst zusätzlich einschränken |

## Zielstruktur auf dem Server

```text
/var/www/oktonia.info/
├── index.html
├── bereich.html
├── styles.css
├── script.js
└── assets/
```

## Grundablauf

1. VPS bestellen und alle Sicherheitsupdates installieren.
2. administrativen Benutzer mit SSH-Schlüssel einrichten.
3. Passwortlogin und direkten Root-Login deaktivieren.
4. Firewall aktivieren.
5. Nginx oder Caddy installieren.
6. Website-Dateien aus GitHub auf den Server übertragen.
7. DNS von `oktonia.info` auf die VPS-Adresse zeigen lassen.
8. HTTPS-Zertifikat einrichten.
9. automatische Backups und Überwachung konfigurieren.

## Beispiel für Nginx

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name oktonia.info www.oktonia.info;

    root /var/www/oktonia.info;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(css|js|jpg|jpeg|png|webp|avif|svg|pdf)$ {
        expires 7d;
        add_header Cache-Control "public";
    }
}
```

Nach erfolgreicher HTTP-Prüfung HTTPS mit Let's Encrypt beziehungsweise Certbot oder über Caddy aktivieren. Konkrete Befehle sollten erst erstellt werden, wenn VPS-Anbieter, Betriebssystem, Benutzername und DNS-Anbieter feststehen.

## Veröffentlichung aus GitHub

### Einfacher manueller Weg

```bash
cd /var/www/oktonia.info
git pull --ff-only
```

Der Webserver sollte nicht als Root und Git nicht mit dauerhaft offen gespeicherten Zugangsdaten betrieben werden.

### Später automatisierbar

Ein GitHub-Actions-Workflow kann nach Freigabe per SSH oder `rsync` veröffentlichen. Dafür wird ein begrenzter Deployment-Schlüssel verwendet. Automatische Veröffentlichung sollte erst eingerichtet werden, wenn Backups, Dateirechte und ein Rückweg auf die vorherige Version getestet wurden.

## Betriebspflichten

- monatliche Sicherheitsupdates
- tägliche externe Backups
- Test einer Wiederherstellung
- Zertifikats- und Uptime-Überwachung
- Logrotation und begrenzte Aufbewahrung
- Prüfung von defekten Links
- regelmäßige Aktualitätsprüfung von Telefonnummern, Öffnungszeiten und Wanderhinweisen

## Noch nicht auf den VPS gehören

- unveröffentlichte personenbezogene Daten
- private Kontaktlisten
- Originalfotos ohne Rechteklärung
- geheime Schlüssel im Repository
- Passwörter oder API-Token in HTML, JavaScript oder Konfigurationsdateien

