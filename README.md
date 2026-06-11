# Calendar Picker by Zbinxy (https://grzegorz.zbinski.pl)

---

- [English](#english)
- [Polski](#polski)
- [Deutsch](#deutsch)
- [Français](#français)

---

# English

A tool for quickly generating text descriptions of meeting slots (date, day of week, time range) ready to paste into an email or messenger.

Available in three variants: an HTML page, a Firefox extension, and a Chrome extension.

## Variants

### `index.html` — browser version

Open the file directly in a browser (no server needed).

### Firefox / Chrome extension — sidebar version

Install from `firefox-extension/` or `chrome-extension/`. Runs as a sidebar panel and supports multiple slots at once (stack).

## How to use

### 1. Select a date

Click any day in the calendar. Navigate months with `‹` / `›`. Today is highlighted with a purple border.  
Selecting a date alone (without a time) already produces a result, e.g. `18.06.2026 (Thursday)`.

### 2. Select a time *(optional)*

Click a slot in the time list. Times run from 06:00 to 22:00 in 15-minute steps.

### 3. Duration

Choose from the dropdown: 15, 30, 45, 60, 90, or 120 minutes.

### 4. Result

Once a date is selected, the result field shows the slot, e.g.:

```
18.06.2026 (Thursday) 10:00-10:45
```

## Format buttons

Before copying, choose the Gmail font size and optional strike-through:

| Button | Effect | Clipboard HTML |
|--------|--------|---------------|
| **H1** | Huge — large preview | `<font size="6">` |
| **H2** | Large — default | `<font size="4">` |
| **P** | Paragraph — normal size | `<font size="3">` |
| **N** | Normal — no formatting | plain text |
| **S** | Strike-through toggle | wraps in `<s>` |

The preview updates live. **S** can be combined with any size button — useful for marking outdated dates.

## Slot stack *(extensions only)*

Collect up to 10 slots in the stack.

- **Add** — adds the current result to the stack (sorted chronologically)
- **×** — removes a slot
- **Aggregate** — cycles through 5 output formats:

| # | Format | Example |
|---|--------|---------|
| 0 | date, day, times | `18.06.2026 (Thursday) 10:00-11:00, 19.06.2026 (Friday) 14:00-15:00` |
| 1 | date and times | `18.06.2026 10:00-11:00, 19.06.2026 14:00-15:00` |
| 2 | date once per day | `18.06.2026 10:00-11:00, 12:00-13:00, 19.06.2026 14:00-15:00` |
| 3 | dates only | `18.06.2026, 19.06.2026` |
| 4 | date + day of week | `18.06.2026 (Thursday), 19.06.2026 (Friday)` |

When the stack is non-empty, **Copy** copies the aggregated text (not the single result).

## Language settings *(extensions only)*

The extension auto-detects the browser language (PL / EN / DE / FR, fallback: EN).  
To override: open the extension options page (Firefox: `about:addons` → ⚙ → Preferences; Chrome: `chrome://extensions` → Details → Extension options) and select a language from the dropdown.

## Installing the Firefox extension

1. Open `about:debugging` → *This Firefox* → **Load Temporary Add-on**.
2. Point to `firefox-extension/manifest.json`.
3. The extension appears in the sidebar (toolbar icon).

## Installing the Chrome extension

1. Open `chrome://extensions/` → enable **Developer mode**.
2. Click **Load unpacked** → select the `chrome-extension/` directory.
3. Open the extension from the extensions menu.

---

# Polski

Narzędzie do szybkiego generowania tekstowych opisów terminów spotkań (data, dzień tygodnia, przedział godzinowy) gotowych do wklejenia do e-maila lub komunikatora.

Dostępne w trzech wariantach: strona HTML, wtyczka Firefox i wtyczka Chrome.

## Warianty

### `index.html` — wersja przeglądarkowa

Otwórz plik bezpośrednio w przeglądarce (bez serwera).

### Wtyczka Firefox / Chrome — wersja z paskiem bocznym

Zainstaluj z katalogu `firefox-extension/` lub `chrome-extension/`. Uruchamia się jako pasek boczny i obsługuje wiele terminów naraz (stos).

## Jak używać

### 1. Wybór daty

Kliknij dowolny dzień w kalendarzu. Nawigacja między miesiącami — strzałki `‹` / `›`. Dzisiejszy dzień jest podświetlony fioletową ramką.  
Samo kliknięcie daty (bez godziny) już generuje wynik, np. `18.06.2026 (czwartek)`.

### 2. Wybór godziny *(opcjonalnie)*

Kliknij slot w liście godzin. Godziny dostępne od 06:00 do 22:00 co 15 minut.

### 3. Czas trwania

Wybierz z listy rozwijanej: 15, 30, 45, 60, 90 lub 120 minut.

### 4. Wynik

Po wybraniu daty w polu wyniku pojawia się termin, np.:

```
18.06.2026 (czwartek) 10:00-10:45
```

## Przyciski formatowania

Przed kopiowaniem wybierz rozmiar czcionki Gmail i opcjonalne przekreślenie:

| Przycisk | Efekt | HTML w schowku |
|----------|-------|---------------|
| **H1** | Huge — duży podgląd | `<font size="6">` |
| **H2** | Large — domyślny | `<font size="4">` |
| **P** | Paragraph — normalny rozmiar | `<font size="3">` |
| **N** | Normal — brak formatowania | czysty tekst |
| **S** | Przełącznik przekreślenia | owija w `<s>` |

Podgląd aktualizuje się na żywo. **S** działa z każdym rozmiarem — przydatne do oznaczania nieaktualnych terminów.

## Stos terminów *(tylko wtyczki)*

Zbieraj do 10 terminów w stosie.

- **Dodaj** — dodaje bieżący wynik do stosu (sortowanie chronologiczne)
- **×** — usuwa termin
- **Agreguj** — cyklicznie zmienia format tekstu wyjściowego (5 formatów):

| # | Format | Przykład |
|---|--------|---------|
| 0 | data, dzień, godziny | `18.06.2026 (czwartek) 10:00-11:00, 19.06.2026 (piątek) 14:00-15:00` |
| 1 | data i godziny | `18.06.2026 10:00-11:00, 19.06.2026 14:00-15:00` |
| 2 | data raz na dzień | `18.06.2026 10:00-11:00, 12:00-13:00, 19.06.2026 14:00-15:00` |
| 3 | tylko daty | `18.06.2026, 19.06.2026` |
| 4 | data i dzień tygodnia | `18.06.2026 (czwartek), 19.06.2026 (piątek)` |

Gdy stos nie jest pusty, **Kopiuj** kopiuje zagregowany tekst (nie pojedynczy wynik).

## Ustawienia języka *(tylko wtyczki)*

Wtyczka automatycznie wykrywa język przeglądarki (PL / EN / DE / FR, fallback: EN).  
Aby nadpisać: otwórz stronę opcji wtyczki (Firefox: `about:addons` → ⚙ → Preferencje; Chrome: `chrome://extensions` → Szczegóły → Opcje rozszerzenia) i wybierz język z listy.

## Instalacja wtyczki Firefox

1. Otwórz `about:debugging` → *Ten Firefox* → **Załaduj tymczasowy dodatek**.
2. Wskaż plik `firefox-extension/manifest.json`.
3. Wtyczka pojawia się w pasku bocznym (ikona w toolbarze).

## Instalacja wtyczki Chrome

1. Otwórz `chrome://extensions/` → włącz **Tryb dewelopera**.
2. Kliknij **Załaduj rozpakowany** → wskaż katalog `chrome-extension/`.
3. Otwórz wtyczkę z menu rozszerzeń.

---

# Deutsch

Ein Werkzeug zum schnellen Erstellen von Texten für Besprechungstermine (Datum, Wochentag, Zeitraum) zum direkten Einfügen in E-Mails oder Messenger.

Verfügbar in drei Varianten: als HTML-Seite, Firefox-Erweiterung und Chrome-Erweiterung.

## Varianten

### `index.html` — Browser-Version

Datei direkt im Browser öffnen (kein Server erforderlich).

### Firefox- / Chrome-Erweiterung — Seitenleiste

Installation aus dem Verzeichnis `firefox-extension/` oder `chrome-extension/`. Läuft als Seitenleiste und unterstützt mehrere Termine gleichzeitig (Stapel).

## Bedienung

### 1. Datum auswählen

Klicken Sie auf einen Tag im Kalender. Navigation mit `‹` / `›`. Der heutige Tag ist mit einem violetten Rahmen markiert.  
Ein Klick auf ein Datum (ohne Uhrzeit) erzeugt bereits ein Ergebnis, z. B. `18.06.2026 (Donnerstag)`.

### 2. Uhrzeit auswählen *(optional)*

Klicken Sie auf einen Zeitslot in der Liste. Zeiten von 06:00 bis 22:00 Uhr im 15-Minuten-Takt.

### 3. Dauer

Aus der Dropdown-Liste wählen: 15, 30, 45, 60, 90 oder 120 Minuten.

### 4. Ergebnis

Nach der Datumsauswahl erscheint der Termin im Ergebnisfeld, z. B.:

```
18.06.2026 (Donnerstag) 10:00-10:45
```

## Formatierungsschaltflächen

Vor dem Kopieren Gmail-Schriftgröße und optionales Durchstreichen wählen:

| Schaltfläche | Effekt | Zwischenablage-HTML |
|---|---|---|
| **H1** | Riesig — große Vorschau | `<font size="6">` |
| **H2** | Groß — Standard | `<font size="4">` |
| **P** | Absatz — normale Größe | `<font size="3">` |
| **N** | Normal — keine Formatierung | reiner Text |
| **S** | Durchstreichen umschalten | Wrapper `<s>` |

Die Vorschau aktualisiert sich in Echtzeit. **S** lässt sich mit jeder Größe kombinieren — nützlich zum Markieren veralteter Termine.

## Terminestapel *(nur Erweiterungen)*

Bis zu 10 Termine im Stapel sammeln.

- **Hinzufügen** — fügt das aktuelle Ergebnis zum Stapel hinzu (chronologische Sortierung)
- **×** — entfernt einen Termin
- **Zusammenfassen** — wechselt durch 5 Ausgabeformate:

| # | Format | Beispiel |
|---|--------|---------|
| 0 | Datum, Tag, Zeiten | `18.06.2026 (Donnerstag) 10:00-11:00, 19.06.2026 (Freitag) 14:00-15:00` |
| 1 | Datum und Zeiten | `18.06.2026 10:00-11:00, 19.06.2026 14:00-15:00` |
| 2 | Datum einmal pro Tag | `18.06.2026 10:00-11:00, 12:00-13:00, 19.06.2026 14:00-15:00` |
| 3 | Nur Daten | `18.06.2026, 19.06.2026` |
| 4 | Datum + Wochentag | `18.06.2026 (Donnerstag), 19.06.2026 (Freitag)` |

Wenn der Stapel nicht leer ist, kopiert **Kopieren** den zusammengefassten Text (nicht das Einzelergebnis).

## Spracheinstellungen *(nur Erweiterungen)*

Die Erweiterung erkennt die Browsersprache automatisch (PL / EN / DE / FR, Fallback: EN).  
Zum Überschreiben: Optionsseite der Erweiterung öffnen (Firefox: `about:addons` → ⚙ → Einstellungen; Chrome: `chrome://extensions` → Details → Erweiterungsoptionen) und Sprache aus der Liste wählen.

## Firefox-Erweiterung installieren

1. `about:debugging` öffnen → *Dieses Firefox* → **Temporäres Add-on laden**.
2. Die Datei `firefox-extension/manifest.json` auswählen.
3. Die Erweiterung erscheint in der Seitenleiste (Toolbar-Symbol).

## Chrome-Erweiterung installieren

1. `chrome://extensions/` öffnen → **Entwicklermodus** aktivieren.
2. **Entpackte Erweiterung laden** klicken → Verzeichnis `chrome-extension/` auswählen.
3. Erweiterung über das Erweiterungsmenü öffnen.

---

# Français

Un outil pour générer rapidement des descriptions textuelles de créneaux de réunion (date, jour de la semaine, plage horaire) prêtes à coller dans un e-mail ou une messagerie.

Disponible en trois variantes : une page HTML, une extension Firefox et une extension Chrome.

## Variantes

### `index.html` — version navigateur

Ouvrez le fichier directement dans un navigateur (aucun serveur requis).

### Extension Firefox / Chrome — version barre latérale

Installez depuis le répertoire `firefox-extension/` ou `chrome-extension/`. Fonctionne comme une barre latérale et prend en charge plusieurs créneaux simultanément (pile).

## Utilisation

### 1. Sélectionner une date

Cliquez sur un jour dans le calendrier. Naviguez entre les mois avec `‹` / `›`. Le jour actuel est mis en évidence par un cadre violet.  
Cliquer sur une date seule (sans heure) génère déjà un résultat, par ex. `18.06.2026 (jeudi)`.

### 2. Sélectionner une heure *(optionnel)*

Cliquez sur un créneau dans la liste. Les horaires vont de 06:00 à 22:00 par intervalles de 15 minutes.

### 3. Durée

Choisissez dans le menu déroulant : 15, 30, 45, 60, 90 ou 120 minutes.

### 4. Résultat

Une fois une date sélectionnée, le champ de résultat affiche le créneau, par ex. :

```
18.06.2026 (jeudi) 10:00-10:45
```

## Boutons de mise en forme

Avant de copier, choisissez la taille de police Gmail et le barré optionnel :

| Bouton | Effet | HTML dans le presse-papiers |
|--------|-------|----------------------------|
| **H1** | Énorme — grande prévisualisation | `<font size="6">` |
| **H2** | Grand — par défaut | `<font size="4">` |
| **P** | Paragraphe — taille normale | `<font size="3">` |
| **N** | Normal — sans mise en forme | texte brut |
| **S** | Basculer le barré | encapsule dans `<s>` |

La prévisualisation se met à jour en temps réel. **S** se combine avec n'importe quelle taille — utile pour marquer des dates périmées.

## Pile de créneaux *(extensions uniquement)*

Collectez jusqu'à 10 créneaux dans la pile.

- **Ajouter** — ajoute le résultat actuel à la pile (tri chronologique automatique)
- **×** — supprime un créneau
- **Agréger** — fait défiler 5 formats de sortie :

| # | Format | Exemple |
|---|--------|---------|
| 0 | date, jour, heures | `18.06.2026 (jeudi) 10:00-11:00, 19.06.2026 (vendredi) 14:00-15:00` |
| 1 | date et heures | `18.06.2026 10:00-11:00, 19.06.2026 14:00-15:00` |
| 2 | date une fois par jour | `18.06.2026 10:00-11:00, 12:00-13:00, 19.06.2026 14:00-15:00` |
| 3 | dates uniquement | `18.06.2026, 19.06.2026` |
| 4 | date + jour de la semaine | `18.06.2026 (jeudi), 19.06.2026 (vendredi)` |

Quand la pile n'est pas vide, **Copier** copie le texte agrégé (pas le résultat unique).

## Paramètres de langue *(extensions uniquement)*

L'extension détecte automatiquement la langue du navigateur (PL / EN / DE / FR, repli : EN).  
Pour forcer une langue : ouvrez la page des options de l'extension (Firefox : `about:addons` → ⚙ → Préférences ; Chrome : `chrome://extensions` → Détails → Options de l'extension) et sélectionnez une langue dans la liste.

## Installer l'extension Firefox

1. Ouvrir `about:debugging` → *Ce Firefox* → **Charger un module temporaire**.
2. Pointer vers `firefox-extension/manifest.json`.
3. L'extension apparaît dans la barre latérale (icône dans la barre d'outils).

## Installer l'extension Chrome

1. Ouvrir `chrome://extensions/` → activer le **Mode développeur**.
2. Cliquer sur **Charger l'extension non empaquetée** → sélectionner le répertoire `chrome-extension/`.
3. Ouvrir l'extension depuis le menu des extensions.
