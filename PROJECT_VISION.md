# Project Vision: CD Collection to Playlist

## Tagline

**"Archiviere deine CD-Sammlung digital - Scanne, speichere, höre überall"**

---

## Problem Statement

Viele Menschen besitzen umfangreiche CD-Sammlungen, haben aber keinen CD-Player mehr oder möchten Platz schaffen. Die CDs verstauben im Regal, können aber nicht weggeräumt werden, weil der Zugriff auf die Musik verloren ginge. Bestehende Lösungen erfordern manuelles Abtippen oder komplizierte CSV-Imports.

---

## Zielgruppe

### Primäre Zielgruppe
- **Personen mit CD-Sammlungen** (50-300 CDs), die keinen CD-Player mehr besitzen
- **Platz schaffen wollen**: Umzug, Minimalismus, Keller-Archivierung
- **Digitale Nutzung bevorzugen**: Spotify, Apple Music, etc.
- **NICHT Audiophile**: Diese Gruppe bevorzugt das haptische Erlebnis

### User Personas

**Persona 1: "Der Minimalisten-Umzieher"**
- 35 Jahre, zieht in kleinere Wohnung
- Hat 150 CDs, die seit Jahren unberührt im Regal stehen
- Kein CD-Player mehr vorhanden
- Nutzt Spotify Premium
- Will CDs in den Keller/verschenken, aber Zugriff behalten

**Persona 2: "Die nostalgische Sammlerin"**
- 42 Jahre, hat 200+ CDs aus den 90ern/2000ern
- Möchte ihre Sammlung "dokumentieren"
- Nutzt gelegentlich Spotify
- Will ihre Musikgeschichte digital bewahren

---

## Lösung

Eine **Progressive Web App**, die:

1. **CD-Barcodes scannt** (via Smartphone-Kamera)
2. **Metadaten automatisch abruft** (MusicBrainz API)
3. **Lokale digitale Sammlung erstellt** (IndexedDB)
4. **Sofortigen Spotify-Zugriff** ermöglicht (Play Mode)
5. **Export-Optionen** bietet (CSV, m3u)

---

## Alleinstellungsmerkmale

Im Vergleich zu CSV-Import-Tools oder manuellen Lösungen:

| Feature | CD Collection to Playlist | CSV-Import-Tools | Manuell |
|---------|---------------------------|------------------|---------|
| **Barcode-Scanner** | ✅ Automatisch | ❌ | ❌ |
| **Automatische Metadaten** | ✅ MusicBrainz | ❌ Manuell | ❌ Manuell |
| **Lokale Archivierung** | ✅ Persistent (IndexedDB) | ❌ Einmal-Import | ❌ |
| **Offline-fähig** | ✅ PWA | ❌ | ❌ |
| **Scan2Play** | ✅ Sofort abspielen | ❌ | ❌ |
| **Cover-Bilder** | ✅ Automatisch | ❌ | ❌ |
| **Mobile-First** | ✅ Smartphone-optimiert | ⚠️ Desktop | ❌ |

---

## Kernfunktionalität

### Phase 1: Scan2Play (Quick Win)
**Ziel**: Grundinfrastruktur + sofortiger Mehrwert

- CD scannen → MusicBrainz Lookup → Spotify Play
- Minimal UI, sofortiges Feedback
- Baut Pipeline auf: Barcode → Metadaten → Spotify

**User Story**:
*"Ich habe eine CD in der Hand und keinen Player. Ich scanne den Barcode, und die App spielt das Album sofort auf Spotify ab."*

---

### Phase 2: Sammlung archivieren (Kern-Feature)
**Ziel**: Batch-Scanning + lokale Speicherung

- Batch-Scan Mode: Viele CDs hintereinander scannen
- Lokale Speicherung in IndexedDB
- Geschachtelte Ansicht: Album-Kacheln mit Covers
- Suche/Filter in der Sammlung
- Duplikats-Erkennung

**User Story**:
*"Ich scanne meine 150 CDs nacheinander. Die App speichert alle Alben mit Covers. Wenn ich fertig bin, kann ich die CDs in den Keller bringen und habe eine digitale Übersicht."*

---

### Phase 3: Export & Verwaltung (Komfort)
**Ziel**: Flexibilität + Playlist-Integration

- **Export**:
  - CSV (editierbar, Backup)
  - m3u (kompatibel mit Spotify-Import-Tools)
  - Konvertierung: CSV → m3u
- **Statistiken**:
  - Anzahl Alben, Genres, Jahrzehnte
  - Top Artists
- **Verwaltung**:
  - Löschen/Bearbeiten von Einträgen
  - Manuelles Hinzufügen (falls Barcode nicht erkannt)

**User Story**:
*"Ich exportiere meine Sammlung als CSV, bearbeite einige Einträge (Genre korrigieren), konvertiere zu m3u und importiere in Spotify. Fertig!"*

---

## Spotify Playlist-Strategie

### Problem: Geschachtelte Playlists
Spotify unterstützt **keine geschachtelten Playlists** nativ.

### Lösung: Hybrid-Ansatz

**In der App** (geschachtelte Navigation):
```
Meine CD-Sammlung (150 Alben)
├── Pink Floyd - Dark Side of the Moon
├── Nirvana - Nevermind
├── Beatles - Abbey Road
└── ...
```

**In Spotify** (flache Playlist):
```
"My CD Collection" (alle Tracks)
- Pink Floyd - Speak to Me/Breathe
- Pink Floyd - Time
- Nirvana - Smells Like Teen Spirit
- ...
```

**Export-Optionen**:
1. **Eine große m3u** (alle Alben, alle Tracks)
2. **Pro Album eine m3u** (150 separate Dateien)
3. **CSV** (alle Metadaten, editierbar)

**User entscheidet**:
- "Nur lokale Sammlung" (kein Spotify)
- "Alle in eine Playlist"
- "Pro Album eine Playlist"

---

## Metadaten

### Minimum (immer):
- Artist
- Album Name

### Angereichert (wenn verfügbar):
- Jahr
- Genre
- Cover-Bild URL
- Trackliste mit Längen
- Spotify Album/Track IDs
- Barcode (Referenz)
- Scan-Datum (Archivierung)

### Quellen:
1. **MusicBrainz API** (primär)
   - Cover-Art Archive
   - Metadaten (Artist, Album, Year, Genre)
   - Trackliste
2. **Spotify API** (sekundär)
   - Album/Track IDs
   - Verfügbarkeit
   - Direkte Abspielfunktion

---

## Technologie-Stack

Siehe [technische_vorgaben.md](technische_vorgaben.md) für Details.

### Core:
- **React 18** + TypeScript
- **Vite** (Fast Builds)
- **Tailwind CSS** (Styling)

### PWA:
- **Service Worker** (Offline)
- **IndexedDB** (via idb) (lokale Speicherung)
- **Manifest** (Installierbar)

### Barcode:
- **Quagga2** (Barcode Scanner)

### APIs:
- **MusicBrainz API** (Metadaten)
- **Spotify Web API** (Playback, Optional Playlist-Erstellung)

### Testing:
- **Vitest** (Unit Tests)
- **Playwright** (E2E Tests)

---

## User Flows

### Flow 1: Scan2Play (Schnellzugriff)
```
1. App öffnen → "Play Mode"
2. Barcode scannen
3. MusicBrainz Lookup (automatisch)
4. Cover + Album-Info anzeigen
5. "Play on Spotify" Button
6. Spotify öffnet Album (oder Web Player)
```

### Flow 2: Sammlung archivieren (Batch)
```
1. App öffnen → "Import Mode"
2. Barcode scannen (CD #1)
3. In IndexedDB speichern
4. Nächste CD: Barcode scannen (CD #2)
5. ... (150 CDs)
6. Fertig → "Manage Mode" öffnen
7. Geschachtelte Ansicht: 150 Album-Kacheln
```

### Flow 3: Export & Import in Spotify
```
1. "Manage Mode" → "Export"
2. Format wählen: CSV
3. CSV herunterladen
4. (Optional) CSV in Texteditor bearbeiten
5. CSV → m3u konvertieren (in App)
6. m3u in Spotify-Import-Tool laden
7. Playlist "My CD Collection" erstellt
```

---

## Design-Prinzipien

Siehe [ux-vorgaben.md](ux-vorgaben.md) für Details.

### 1. Mobile First
- Smartphone-Kamera für Barcode
- Touch-optimiert
- Responsive (Desktop als Bonus)

### 2. Progressive Enhancement
- Funktioniert ohne Spotify-Login (nur lokale Sammlung)
- Erweitert um Spotify-Features (Play, Playlist)

### 3. Offline First
- PWA: Installierbar
- IndexedDB: Sammlung persistent
- Service Worker: Offline-Zugriff

### 4. Feedback & Bestätigung
- Scan-Erfolg: Visuelles Feedback
- Fehler: Klare Meldungen
- Fortschritt: "23/150 CDs gescannt"

### 5. Minimalismus
- Fokus auf Kernfunktion
- Keine Überfrachtung
- Klare CTAs

---

## Erfolgsmetriken

### Quantitativ:
- **Scan-Geschwindigkeit**: < 3 Sekunden pro CD (Barcode → Anzeige)
- **Erkennungsrate**: > 90% Barcode-Erkennung beim ersten Versuch
- **Performance**: Lighthouse Score > 80
- **Batch-Performance**: 100 CDs scannen in < 10 Minuten

### Qualitativ:
- **User Feedback**: "Einfacher als CSV-Import"
- **Use Case**: "Konnte CDs endlich in den Keller bringen"

---

## Nicht-Ziele (Out of Scope)

❌ **Audiophile Features**: Lossless Streaming, Equalizer
❌ **Social Features**: Teilen, Kommentare, Bewertungen
❌ **Musik-Streaming**: Die App streamt nicht selbst (nur Spotify-Integration)
❌ **CD-Ripping**: Keine Audio-Konvertierung
❌ **Vinyl/Kassetten**: Nur CDs (vorerst)
❌ **Automatische Playlist-Generierung**: Keine "Mixtapes" oder "Recommendations"

---

## Risiken & Mitigation

### Risiko 1: Barcode nicht erkennbar
**Problem**: Alte/beschädigte CDs, schlechtes Licht
**Mitigation**:
- Manuelle Eingabe (Fallback)
- Tipp-System ("Mehr Licht", "CD drehen")
- Alternative: Suche nach Artist/Album

### Risiko 2: MusicBrainz findet Album nicht
**Problem**: Seltene/Import-CDs
**Mitigation**:
- Fallback: Spotify-Suche
- Manuelles Hinzufügen mit Spotify-Link
- "Unbekannte CDs" Liste

### Risiko 3: Spotify-API-Limitierungen
**Problem**: Rate Limits, fehlende Alben
**Mitigation**:
- Graceful Degradation: Lokale Sammlung funktioniert ohne Spotify
- Caching: Metadaten lokal speichern
- Alternative: Export für andere Dienste (Apple Music, Deezer)

### Risiko 4: User hat kein Spotify
**Problem**: Nutzer ohne Spotify Premium
**Mitigation**:
- App funktioniert ohne Spotify-Login
- Export: m3u für andere Dienste
- Optional: Integration mit Apple Music (zukünftig)

---

## Roadmap

Siehe [ROADMAP.md](ROADMAP.md) für detaillierte Entwicklungsphasen.

**Phase 1**: Scan2Play (4 Wochen)
**Phase 2**: Sammlung archivieren (6 Wochen)
**Phase 3**: Export & Verwaltung (4 Wochen)

**Total**: 14 Wochen (3,5 Monate)

---

## FAQ

### Warum nicht einfach CSV-Import verwenden?
CSV-Import erfordert manuelles Abtippen oder Copy-Paste. Mit Barcode-Scanner ist es 10x schneller.

### Funktioniert die App offline?
Ja! Die App ist eine PWA. Deine Sammlung wird lokal gespeichert. Nur das Abspielen auf Spotify benötigt Internet.

### Kann ich die App ohne Spotify nutzen?
Ja! Du kannst deine Sammlung scannen und als CSV/m3u exportieren. Spotify ist optional.

### Welche Barcodes werden unterstützt?
EAN-13 (Standard für CDs in Europa) und UPC-A (USA). Das sind die Barcodes auf der Rückseite der CD-Hülle.

### Was passiert mit meinen Daten?
Alle Daten werden **lokal** auf deinem Gerät gespeichert (IndexedDB). Kein Server, keine Cloud. Du behältst die volle Kontrolle.

### Kann ich meine Sammlung teilen?
Export als CSV/m3u erlaubt das Teilen oder Backup. Social Features sind nicht geplant.

---

## Credits & Inspiration

- **MusicBrainz**: Open-Source Musik-Metadaten-Datenbank
- **Spotify API**: Playback & Playlist-Integration
- **Quagga2**: Barcode-Scanner-Bibliothek
- **PWA Best Practices**: Google Lighthouse, web.dev

---

**Version**: 1.0
**Letzte Aktualisierung**: 2025-10-27
**Status**: Vision definiert, Entwicklung ausstehend
