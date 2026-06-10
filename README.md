# Callendar picker by Zbinxy (https://grzegorz.zbinski.pl)

A tool for quickly generating text descriptions of meeting slots (date, day of week, time) ready to paste into an email or messenger.

Available in three variants: an HTML page, a Firefox extension, and a Chrome extension.

---

## Variants

### `index.html` — browser version

Open the file directly in a browser (no server needed). Supports a single slot.

### Firefox / Chrome extension — sidebar version

Install from the `firefox-extension/` or `chrome-extension/` directory. The extension runs as a sidebar and supports multiple slots at once (stack).

---

## How to use

### 1. Select a date

Click any day in the calendar. Navigate between months with the `‹` / `›` arrows. Today is highlighted with a purple border.

### 2. Select a time

Click a slot in the list on the right. Times are available from 06:00 to 22:00 in 15-minute intervals.

### 3. Duration

Choose from the dropdown: 15, 30, 45, 60, 90, or 120 minutes.

### 4. Result

Once a date and time are selected, the result field shows the slot, e.g.:

```
18.06.2026 (Thursday) 10:00-10:45
```

The **Copy** button writes the text to the clipboard — both as plain text and as formatted HTML (font size 4), so pasting into Outlook or Gmail produces larger text.

---

## Slot stack (extensions only)

The Firefox and Chrome extensions let you collect multiple slots in a stack (max 10).

### Adding

After selecting a date and time, click **Add**. Slots are sorted chronologically automatically.

### Removing

Click `×` next to any slot in the list.

### Aggregation

The **Aggregate** button cycles through output formats. Five formats are available:

| Format | Example |
|--------|---------|
| 0 — date, day, times | `18.06.2026 (Thursday) 10:00-11:00, 19.06.2026 (Friday) 14:00-15:00` |
| 1 — date and times | `18.06.2026 10:00-11:00, 19.06.2026 14:00-15:00` |
| 2 — date once per day | `18.06.2026 10:00-11:00, 12:00-13:00, 19.06.2026 14:00-15:00` |
| 3 — dates only | `18.06.2026, 19.06.2026` |
| 4 — date and day of week | `18.06.2026 (Thursday), 19.06.2026 (Friday)` |

Format 2 groups multiple slots on the same day — the date appears only on the first entry.

### Copying from the stack

When the stack contains slots, the **Copy** button copies the aggregated text in the currently selected format, not the single result.

---

## Installing the Firefox extension

1. Open `about:debugging` → *This Firefox* → **Load Temporary Add-on**.
2. Point to `firefox-extension/manifest.json`.
3. The extension appears in the sidebar (toolbar icon).

## Installing the Chrome extension

1. Open `chrome://extensions/` → enable **Developer mode**.
2. Click **Load unpacked** and point to the `chrome-extension/` directory.
3. Open the extension from the extensions menu (pin icon).

---

---

# Calendar Picker (PL)

Narzędzie do szybkiego generowania tekstowych opisów terminów spotkań (data, dzień tygodnia, godzina) gotowych do wklejenia do e-maila lub komunikatora.

Dostępne w trzech wariantach: strona HTML, wtyczka Firefox i wtyczka Chrome.

---

## Warianty

### `index.html` — wersja przeglądarkowa

Otwórz plik bezpośrednio w przeglądarce (bez serwera). Obsługuje pojedynczy termin.

### Wtyczka Firefox / Chrome — wersja z paskiem bocznym

Zainstaluj z katalogu `firefox-extension/` lub `chrome-extension/`. Wtyczka uruchamia się jako pasek boczny i obsługuje wiele terminów naraz (stos).

---

## Jak używać

### 1. Wybór daty

Kliknij dowolny dzień w kalendarzu. Nawigacja między miesiącami — strzałki `‹` / `›`. Dzisiejszy dzień jest podświetlony fioletową ramką.

### 2. Wybór godziny

Kliknij slot w liście po prawej. Godziny dostępne od 06:00 do 22:00 co 15 minut.

### 3. Czas trwania

Wybierz z listy rozwijanej: 15, 30, 45, 60, 90 lub 120 minut.

### 4. Wynik

Po wybraniu daty i godziny w polu wyniku pojawia się termin, np.:

```
18.06.2026 (czwartek) 10:00-10:45
```

Przycisk **Kopiuj** wpisuje tekst do schowka — zarówno jako czysty tekst, jak i sformatowany HTML (rozmiar czcionki 4), dzięki czemu po wklejeniu do Outlooka lub Gmaila tekst ma zwiększony rozmiar.

---

## Stos terminów (tylko wtyczki)

Wtyczki Firefox i Chrome umożliwiają zebranie wielu terminów w stosie (max 10).

### Dodawanie

Po wybraniu daty i godziny kliknij **Dodaj**. Terminy są automatycznie sortowane chronologicznie.

### Usuwanie

Kliknij `×` obok dowolnego terminu na liście.

### Agregacja

Przycisk **Agreguj** cyklicznie zmienia format tekstu wyjściowego. Pięć dostępnych formatów:

| Format | Przykład |
|--------|---------|
| 0 — data, dzień, godziny | `18.06.2026 (czwartek) 10:00-11:00, 19.06.2026 (piątek) 14:00-15:00` |
| 1 — data i godziny | `18.06.2026 10:00-11:00, 19.06.2026 14:00-15:00` |
| 2 — data raz na dzień | `18.06.2026 10:00-11:00, 12:00-13:00, 19.06.2026 14:00-15:00` |
| 3 — tylko daty | `18.06.2026, 19.06.2026` |
| 4 — data i dzień tygodnia | `18.06.2026 (czwartek), 19.06.2026 (piątek)` |

Format 2 grupuje wiele slotów tego samego dnia — data pojawia się tylko przy pierwszym wpisie.

### Kopiowanie ze stosu

Gdy stos zawiera terminy, przycisk **Kopiuj** kopiuje zagregowany tekst (aktualnie wybrany format), a nie pojedynczy wynik.

---

## Instalacja wtyczki Firefox

1. Otwórz `about:debugging` → *Ten Firefox* → **Załaduj tymczasowy dodatek**.
2. Wskaż plik `firefox-extension/manifest.json`.
3. Wtyczka pojawia się w pasku bocznym (ikona w toolbarze).

## Instalacja wtyczki Chrome

1. Otwórz `chrome://extensions/` → włącz **Tryb dewelopera**.
2. Kliknij **Załaduj rozpakowany** i wskaż katalog `chrome-extension/`.
3. Wtyczkę otworzysz z menu rozszerzeń (ikona pinezki).
