# NachtschichtFM

NachtschichtFM ist ein moderner Webradio-Player. Das Projekt bietet einen übersichtlichen Sendeplan, aktuelle Songlisten, Hörerstatistiken und spannende Text- und Hintergrundanimationen.

## Features

- **Live-Hörerzahlen** und aktuelle Songs von [laut.fm](https://laut.fm)
- **Sendeplan** mit Übersicht aller Shows
- **Responsive Design** für Desktop und Mobile
- **Interaktive Animationen** (z.B. ScrambledText, FallingText)
- **Smooth Scrolling** und moderne UI-Komponenten
- **React + TypeScript** Frontend
- **Vite** als Build-Tool

## Installation

1. **Repository klonen**
   ```sh
   git clone <REPO-URL>
   cd nachtschichtfm
   ```

2. **Abhängigkeiten installieren**
   ```sh
   npm install
   ```

3. **Entwicklungsserver starten**
   ```sh
   npm run dev
   ```

4. **Projekt im Browser öffnen**
   - Standardmäßig unter [http://localhost:5173](http://localhost:5173)

## Tests

Um die Tests auszuführen:
```sh
npm run test
```

## Linting

Um den Code zu prüfen:
```sh
npm run lint
```

## API

Die Daten werden über die [laut.fm API](https://api.laut.fm) geladen. Die wichtigsten API-Funktionen findest du in [`src/api/api.ts`](src/api/api.ts):

- [`fetchLastSongs`](src/api/api.ts)
- [`fetchCurrentSong`](src/api/api.ts)
- [`fetchSchedule`](src/api/api.ts)
- [`fetchListeners`](src/api/api.ts)

---

**Viel Spaß mit NachtschichtFM!**