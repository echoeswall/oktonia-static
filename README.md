# Oktonia.info – statischer HTML-Prototyp

Dieses Repository enthält die frameworkfreie HTML-Version des bisherigen Oktonia.info-Prototyps. Sie läuft direkt im Browser, auf GitHub Pages oder auf einem einfachen Webserver wie Nginx.

## Sofort starten

1. Projektordner entpacken.
2. `index.html` doppelklicken.
3. Für komfortable Entwicklung den ganzen Ordner in Visual Studio Code öffnen.

Es müssen weder Node.js noch Pakete installiert oder Builds ausgeführt werden.

## Projektstruktur

```text
oktonia-static/
├── index.html                 Startseite
├── bereich.html               gemeinsame Bereichsseite
├── styles.css                 vollständiges Design
├── script.js                  Navigation und Platzhalterdaten
├── README.md                  Einstieg
├── DOKUMENTATION.md           Gesamtdokumentation
├── GITHUB-VSCODE-UMZUG.md     GitHub- und VS-Code-Anleitung
├── VPS-DEPLOYMENT.md          späteres VPS-Hosting
├── .gitignore
└── docs/planung/              bisherige Planungsdokumente
```

## Aktueller Funktionsumfang

- responsive Startseite
- Bereiche für Übernachten, Essen & Einkaufen, Entdecken, Kirchen & Klöster, Geschichte und Dorfleben
- Platzhalterkarten für spätere Einträge
- mobile Navigation
- vorbereitete Sprachwahl DE/ΕΛ/EN
- keine externen Bibliotheken, Tracker oder Cookies

## Inhalte bearbeiten

- Startseite und feste Texte: `index.html`
- Bereichsbezeichnungen und Platzhalterdaten: Objekt `pages` in `script.js`
- Farben, Abstände und Layout: `styles.css`
- gemeinsame Bereichsvorlage: `bereich.html`

Echte Bilder können später in einem Ordner `assets/images/` abgelegt werden. Dokumente wie Dorfzeitungen gehören nach `assets/documents/`.

## Projektstatus

Der aktuelle Entwurfsstand ist zusätzlich privat unter folgender Adresse erreichbar:

<https://oktonia-info.becker947832.chatgpt.site>

Die Domain `oktonia.info` ist noch nicht mit diesem Prototyp verbunden.

Weitere Hintergründe stehen in [DOKUMENTATION.md](DOKUMENTATION.md).

