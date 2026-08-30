# Umzug nach GitHub und Weiterarbeit in VS Code

Diese Anleitung gilt für Windows und das statische Projekt in diesem Ordner.

## 1. Voraussetzungen

Installieren:

- [Git für Windows](https://git-scm.com/download/win)
- [Visual Studio Code](https://code.visualstudio.com/)
- GitHub-Konto

VS Code verwendet die lokal installierte Git-Version. Die integrierte Quellcodeverwaltung kann Änderungen anzeigen, vormerken, committen und synchronisieren. Siehe [offizielle VS-Code-Dokumentation](https://code.visualstudio.com/docs/sourcecontrol/overview).

## 2. Projekt lokal öffnen

1. ZIP-Datei entpacken, beispielsweise nach `C:\Projekte\oktonia-info`.
2. VS Code starten.
3. **Datei → Ordner öffnen** wählen.
4. Den Ordner `oktonia-info` öffnen.
5. `index.html` im Explorer doppelklicken oder im Browser öffnen.

Optional kann die VS-Code-Erweiterung **Live Server** genutzt werden. Notwendig ist sie für dieses Projekt nicht.

## 3. Git-Identität einmalig konfigurieren

Im VS-Code-Terminal:

```powershell
git config --global user.name "Chris Becker"
git config --global user.email "DEINE-GITHUB-EMAIL"
```

Die offizielle VS-Code-Dokumentation beschreibt dieselbe Voraussetzung: [Source Control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview).

## 4. Lokales Repository initialisieren

Im Projektordner:

```powershell
git init
git add .
git commit -m "Initialer HTML-Prototyp für Oktonia.info"
git branch -M main
```

Alternativ in VS Code:

1. Quellcodeverwaltung mit `Strg+Umschalt+G` öffnen.
2. **Repository initialisieren** wählen.
3. Dateien prüfen und mit `+` vormerken.
4. Commit-Nachricht eingeben und committen.

Offizielle Anleitung: [VS Code Source Control Quickstart](https://code.visualstudio.com/docs/sourcecontrol/quickstart).

## 5. Leeres Repository auf GitHub erstellen

Auf GitHub:

1. **New repository** wählen.
2. Repository zum Beispiel `oktonia-info` nennen.
3. Sichtbarkeit wählen. Für kostenloses GitHub Pages ist ein öffentliches Repository der unkomplizierteste Weg.
4. Beim Erstellen **keine** zusätzliche README, `.gitignore` oder Lizenz erzeugen, weil diese Dateien bereits lokal existieren.

Danach zeigt GitHub eine Repository-Adresse wie:

```text
https://github.com/DEIN-NAME/oktonia-info.git
```

## 6. Lokales Projekt verbinden und hochladen

```powershell
git remote add origin https://github.com/DEIN-NAME/oktonia-info.git
git push -u origin main
```

`origin` ist nur der übliche Name für das entfernte Repository. GitHub dokumentiert dies unter [Managing remote repositories](https://docs.github.com/en/get-started/git-basics/managing-remote-repositories) und [Pushing commits](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository).

Beim ersten Push öffnet sich gegebenenfalls die GitHub-Anmeldung. Kein GitHub-Passwort in Befehle oder Dateien schreiben.

## 7. Normaler Arbeitsablauf in VS Code

Nach einer Änderung:

```powershell
git status
git add .
git commit -m "Beschreibung der Änderung"
git push
```

Oder vollständig über `Strg+Umschalt+G`:

1. Diff jeder geänderten Datei prüfen.
2. Änderungen vormerken.
3. verständliche Commit-Nachricht schreiben.
4. committen.
5. **Änderungen synchronisieren** wählen.

Empfohlene kleine Commit-Nachrichten:

```text
Startseitentext ergänzt
Unterkunftskarten vorbereitet
Mobile Navigation korrigiert
Neue Bilder für Strände eingefügt
```

## 8. Repository auf einem zweiten Rechner öffnen

In VS Code:

1. `Strg+Umschalt+P`
2. `Git: Clone` wählen
3. Repository-Adresse einfügen
4. Zielordner wählen
5. geklonten Ordner öffnen

Alternativ:

```powershell
git clone https://github.com/DEIN-NAME/oktonia-info.git
cd oktonia-info
code .
```

Offizielle Anleitung: [Cloning a repository](https://docs.github.com/articles/cloning-a-repository) und [VS Code: Repositories and remotes](https://code.visualstudio.com/docs/sourcecontrol/repos-remotes).

Vor dem Arbeiten auf einem anderen Rechner immer zuerst:

```powershell
git pull
```

## 9. GitHub Pages aktivieren

Da `index.html` direkt im Repository-Hauptordner liegt, ist kein Build notwendig.

1. Repository auf GitHub öffnen.
2. **Settings → Pages** öffnen.
3. Unter **Build and deployment** die Veröffentlichung aus einem Branch wählen.
4. Branch `main` und Ordner `/ (root)` auswählen.
5. speichern und die Bereitstellung abwarten.

GitHub unterstützt dafür einen Branch und entweder den Repository-Hauptordner oder `/docs` als Quelle. Siehe [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Die vorläufige Adresse lautet anschließend ungefähr:

```text
https://DEIN-NAME.github.io/oktonia-info/
```

## 10. Domain `oktonia.info` später verbinden

Erst durchführen, wenn die GitHub-Pages-Seite korrekt funktioniert:

1. In **Settings → Pages → Custom domain** `oktonia.info` eintragen.
2. Beim DNS-Anbieter die von GitHub aktuell vorgegebenen DNS-Einträge setzen.
3. DNS-Prüfung abwarten.
4. anschließend **Enforce HTTPS** aktivieren.

Beim Veröffentlichen aus einem Branch erzeugt GitHub über die Pages-Einstellungen eine `CNAME`-Datei im Veröffentlichungsordner. Die jeweils aktuellen DNS-Werte sollten direkt der [offiziellen GitHub-Anleitung für Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) entnommen werden, statt veraltete IP-Adressen aus einer statischen Anleitung zu kopieren.

GitHub kann nach erfolgreicher DNS-Prüfung automatisch ein TLS-Zertifikat bereitstellen: [Securing GitHub Pages with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

## 11. Häufige Fehler

### `git` wird nicht erkannt

Git installieren und VS Code vollständig neu starten.

### Push wird abgelehnt

Falls auf GitHub versehentlich bereits eine README erzeugt wurde:

```powershell
git pull --rebase origin main
git push -u origin main
```

Konflikte nicht blind überschreiben. Erst die betroffenen Dateien in VS Code prüfen.

### GitHub Pages zeigt 404

- `index.html` muss im ausgewählten Veröffentlichungsordner liegen.
- Branch `main` und `/ (root)` prüfen.
- mindestens ein Commit muss hochgeladen worden sein.
- einige Minuten auf die Bereitstellung warten.

### Änderungen sind online noch nicht sichtbar

```powershell
git status
git log -1
git push
```

Danach die Pages-Bereitstellung auf GitHub und gegebenenfalls den Browsercache prüfen.

