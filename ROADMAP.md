# Development Roadmap: CD Collection to Playlist

**Start**: Oktober 2025
**Projektstatus**: Core Features komplett ✅, Player Implementation next 🟡

---

## Aktueller Status (Stand: 2025-10-28)

```
Phase 1: Core Features         ████████████████  ✅ KOMPLETT
  - Scan2Play                  ████████████████  ✅
  - Batch Import               ████████████████  ✅
  - Local Storage              ████████████████  ✅
  - CSV/m3u Export             ████████████████  ✅

Phase 2: Player                ░░░░░░░░░░░░░░░░  🔴 NEXT
Phase 3: Bugfixing Core        ░░░░░░░░░░░░░░░░  🔴 Geplant
Phase 4: UX Improvements       ░░░░░░░░░░░░░░░░  🔴 Geplant
Phase 5: Bugfixing UX          ░░░░░░░░░░░░░░░░  🔴 Geplant
Phase 6: Production Ready      ░░░░░░░░░░░░░░░░  🔴 Geplant
Phase 7: Advanced Features     ░░░░░░░░░░░░░░░░  🔴 Future
```

### ✅ Was bereits funktioniert:

**CORE FEATURES (KOMPLETT)**
- ✅ Barcode Scanner (Quagga2)
- ✅ MusicBrainz Integration (Album Lookup + Cover Art)
- ✅ Spotify OAuth & API Integration
- ✅ PlayMode: Scan → Sofort abspielen
- ✅ ImportMode: Batch Scanning
- ✅ ManageMode: Sammlung anzeigen/löschen
- ✅ IndexedDB: Lokale Speicherung
- ✅ CSV Export (mit UTF-8 BOM, Excel-kompatibel)
- ✅ m3u Export (Extended M3U, Spotify URIs)
- ✅ Playlist Creation (öffnet in Spotify)
- ✅ PWA installierbar
- ✅ Deployed auf GitHub Pages

**NOCH AUSSTEHEND**
- ❌ Eingebetteter Player in der App
- ❌ Search & Filter
- ❌ Edit/Bulk Operations
- ❌ Statistics & Insights
- ❌ UX Polish (Loading States, Error Handling)
- ❌ Accessibility Improvements

---

## 🎯 NEUE PHASEN-STRUKTUR

Fokus auf **Grundfunktionen → Stabilität → Polish → Erweiterte Features**

### Phase 2: Grundlegende Player Implementierung (3-4 Tage)
**Priorität: HOCH** ⭐⭐⭐
**Ziel**: User kann in der App Musik abspielen, nicht nur extern in Spotify

### Phase 3: Bugfixing Grundfunktionen (2-3 Tage)
**Priorität: HOCH** ⭐⭐⭐
**Ziel**: Alle Core Features sind stabil und zuverlässig

### Phase 4: Grundlegende UX Verbesserungen (3-4 Tage)
**Priorität: MITTEL** ⭐⭐
**Ziel**: App ist benutzerfreundlich und professionell

### Phase 5: Bugfixing UX und Funktionalität (2-3 Tage)
**Priorität: MITTEL** ⭐⭐
**Ziel**: UX ist poliert und fehlerfrei

### Phase 6: Production Ready (2-3 Tage)
**Priorität: HOCH** ⭐⭐⭐
**Ziel**: App ist launch-ready

### Phase 7: Erweiterte Funktionen (8-12 Tage)
**Priorität: NIEDRIG** ⭐
**Ziel**: Nice-to-have Features (Search, Filter, Stats, etc.)

**Total**: ~20-29 Tage (~4-6 Wochen)

---

## Phase 1: Scan2Play (Quick Win)

**Ziel**: Grundinfrastruktur + sofortiger Mehrwert
**Dauer**: 4 Wochen
**Status**: 🔴 Ausstehend

### User Story
*"Ich habe eine CD in der Hand und keinen Player. Ich scanne den Barcode, und die App spielt das Album sofort auf Spotify ab."*

### Features

#### 1.1 Barcode-Scanner (Woche 1)
- [ ] Quagga2 Integration
- [ ] Kamera-Zugriff (Browser Permissions)
- [ ] EAN-13 & UPC-A Erkennung
- [ ] Visuelles Feedback (Scan-Erfolg/Fehler)
- [ ] Fehlerbehandlung (schlechtes Licht, ungültiger Code)

**Acceptance Criteria**:
- ✅ Barcode-Erkennung in < 3 Sekunden
- ✅ Fehler-Meldung bei ungültigem Code
- ✅ "Scan erfolgreich" Animation

#### 1.2 MusicBrainz Integration (Woche 1-2)
- [ ] MusicBrainz API Service
- [ ] Barcode → Album Lookup
- [ ] Metadaten abrufen (Artist, Album, Year, Cover)
- [ ] Cover-Art Archive Integration
- [ ] Fehlerbehandlung (Album nicht gefunden)

**Acceptance Criteria**:
- ✅ > 90% Erfolgsrate bei gängigen CDs
- ✅ Cover-Bild wird angezeigt
- ✅ Fallback: "Album nicht gefunden" UI

#### 1.3 Spotify Integration (Woche 2-3)
- [ ] Spotify API Service
- [ ] OAuth 2.0 Login
- [ ] Album-Suche (via MusicBrainz Metadaten)
- [ ] "Play on Spotify" Button
- [ ] Deep Link zu Spotify App/Web Player

**Acceptance Criteria**:
- ✅ Spotify-Login funktioniert
- ✅ Album wird in Spotify geöffnet
- ✅ Fallback: Web Player wenn App nicht installiert

#### 1.4 Minimal UI (Woche 3-4)
- [ ] Home Page (Mode-Auswahl: Play/Import/Manage)
- [ ] Play Mode Page (Scanner + Album-Anzeige)
- [ ] Album-Detail Card (Cover, Artist, Album, Year)
- [ ] Loading States
- [ ] Error States
- [ ] Toast Notifications

**Acceptance Criteria**:
- ✅ Mobile-optimiert (Touch-friendly)
- ✅ Lighthouse Score > 80
- ✅ WCAG 2.1 AA konform (Color Contrast, Keyboard)

#### 1.5 Testing & Documentation (Woche 4)
- [ ] Unit Tests (Vitest): API Services
- [ ] E2E Tests (Playwright): Scan2Play Flow
- [ ] Accessibility Audit (axe)
- [ ] Performance Audit (Lighthouse)
- [ ] User Documentation: "How to Scan"

**Acceptance Criteria**:
- ✅ Test Coverage > 60%
- ✅ Alle E2E Tests grün
- ✅ Keine Accessibility Warnings

### Deliverables Phase 1
- ✅ Funktionierender Scan2Play Flow
- ✅ Deploybar auf GitHub Pages
- ✅ Dokumentation (README mit Quick Start)

### Risiken Phase 1
- **Barcode-Erkennung schwierig**: → Fallback: Manuelle Suche
- **MusicBrainz API langsam**: → Caching, Loading States
- **Spotify OAuth komplex**: → Dokumentation, Beispiel-Code

---

## Phase 2: Sammlung archivieren (Kern-Feature)

**Ziel**: Batch-Scanning + lokale Speicherung
**Dauer**: 6 Wochen
**Status**: 🔴 Ausstehend

### User Story
*"Ich scanne meine 150 CDs nacheinander. Die App speichert alle Alben mit Covers. Wenn ich fertig bin, kann ich die CDs in den Keller bringen und habe eine digitale Übersicht."*

### Features

#### 2.1 IndexedDB Integration (Woche 5)
- [ ] idb Setup (Dexie.js oder idb)
- [ ] Schema Design: Albums, Artists, Tracks
- [ ] CRUD Operations (Create, Read, Update, Delete)
- [ ] Migrations Strategy

**Schema**:
```typescript
interface Album {
  id: string; // UUID
  barcode: string;
  artist: string;
  album: string;
  year?: number;
  genre?: string;
  coverUrl?: string;
  spotifyId?: string;
  tracks?: Track[];
  scannedAt: Date;
}
```

**Acceptance Criteria**:
- ✅ 1000+ Alben ohne Performance-Probleme
- ✅ Offline verfügbar (PWA)

#### 2.2 Import Mode (Woche 5-6)
- [ ] Import Mode Page
- [ ] Batch-Scan Flow (CD nach CD)
- [ ] Fortschrittsanzeige ("23/150 CDs")
- [ ] Duplikats-Erkennung (Barcode bereits gescannt)
- [ ] "Scan erfolgreich" Feedback
- [ ] Pause/Resume Funktion

**Acceptance Criteria**:
- ✅ 100 CDs in < 10 Minuten scannen
- ✅ Duplikate werden erkannt
- ✅ Fortschritt wird gespeichert (Reload-sicher)

#### 2.3 Manage Mode (Woche 6-7)
- [ ] Manage Mode Page
- [ ] Album-Kacheln Grid (Cover + Titel)
- [ ] Suche/Filter (Artist, Album, Jahr, Genre)
- [ ] Sortierung (Alphabet, Datum, Jahr)
- [ ] Album-Detail View (alle Metadaten)
- [ ] Delete Album Funktion

**Acceptance Criteria**:
- ✅ Responsive Grid (Mobile: 2 Spalten, Desktop: 4-6 Spalten)
- ✅ Suche funktioniert in < 1 Sekunde (1000 Alben)
- ✅ Lazy Loading für große Sammlungen

#### 2.4 PWA Setup (Woche 7-8)
- [ ] Service Worker (Vite PWA Plugin)
- [ ] Manifest.json (Name, Icons, Theme)
- [ ] Offline-Fallback Page
- [ ] Install Prompt (iOS/Android)
- [ ] Update Mechanism

**Icons**:
- [ ] 192x192px Icon
- [ ] 512x512px Icon
- [ ] Maskable Icon (PWA)

**Acceptance Criteria**:
- ✅ Installierbar auf iOS/Android
- ✅ Offline-Zugriff auf Sammlung
- ✅ Lighthouse PWA Score > 90

#### 2.5 Enhanced UI (Woche 8-9)
- [ ] Dark Mode Support
- [ ] Statistiken Widget (Anzahl Alben, Top Artists, Genres)
- [ ] Empty States ("Keine CDs gescannt")
- [ ] Skeleton Loaders
- [ ] Animations (Framer Motion)

**Acceptance Criteria**:
- ✅ Dark Mode WCAG 2.1 AA konform
- ✅ Smooth Transitions
- ✅ Keine Layout Shifts (CLS < 0.1)

#### 2.6 Testing & Optimization (Woche 9-10)
- [ ] Unit Tests: IndexedDB Services
- [ ] Integration Tests: Import Flow
- [ ] E2E Tests: Batch-Scan (10 CDs)
- [ ] Performance Testing: 1000 Alben
- [ ] Accessibility Audit
- [ ] User Testing (Beta-Nutzer)

**Acceptance Criteria**:
- ✅ Test Coverage > 70%
- ✅ Performance: 1000 Alben ohne Lag
- ✅ Beta-Nutzer Feedback positiv

### Deliverables Phase 2
- ✅ Funktionierender Batch-Import
- ✅ Lokale Sammlung mit Suche/Filter
- ✅ PWA installierbar
- ✅ Dokumentation: "How to Import"

### Risiken Phase 2
- **IndexedDB Quota**: → Monitoring, Warnung bei 80% Auslastung
- **Performance bei 1000+ CDs**: → Virtualisierung (react-window)
- **Cover-Bilder zu groß**: → Komprimierung, Thumbnail-Cache

---

## Phase 3: Export & Verwaltung (Komfort)

**Ziel**: Flexibilität + Playlist-Integration
**Dauer**: 4 Wochen
**Status**: 🔴 Ausstehend

### User Story
*"Ich exportiere meine Sammlung als CSV, bearbeite einige Einträge (Genre korrigieren), konvertiere zu m3u und importiere in Spotify. Fertig!"*

### Features

#### 3.1 CSV Export (Woche 11)
- [ ] Export Button (Manage Mode)
- [ ] CSV Generierung (mit Header)
- [ ] Download als `cd-collection-{date}.csv`
- [ ] Format: Artist, Album, Year, Genre, Barcode, Spotify ID

**CSV Format**:
```csv
Artist,Album,Year,Genre,Barcode,Spotify_Album_ID,Cover_URL,Scanned_Date
Pink Floyd,Dark Side of the Moon,1973,Progressive Rock,5099902893525,4LH4d3cOWNNsVw41Gqt2kv,https://...,2025-10-27
```

**Acceptance Criteria**:
- ✅ CSV öffnet korrekt in Excel/Numbers
- ✅ UTF-8 Encoding (Umlaute funktionieren)

#### 3.2 m3u Export (Woche 11-12)
- [ ] m3u Generierung (Extended M3U Format)
- [ ] Spotify Track URIs
- [ ] Option: "Eine m3u" vs "Pro Album eine m3u"
- [ ] Download als `.m3u` oder `.m3u8`

**m3u Format**:
```m3u
#EXTM3U
#EXTINF:343,Pink Floyd - Speak to Me/Breathe
spotify:track:xxxx
#EXTINF:170,Pink Floyd - Time
spotify:track:yyyy
```

**Acceptance Criteria**:
- ✅ m3u importierbar in Spotify-Import-Tools
- ✅ Track-Reihenfolge korrekt

#### 3.3 CSV → m3u Konvertierung (Woche 12)
- [ ] Import CSV Funktion
- [ ] Parsing & Validierung
- [ ] Konvertierung zu m3u
- [ ] Fehlerbehandlung (fehlende Spotify IDs)

**Acceptance Criteria**:
- ✅ Editierte CSV kann reimportiert werden
- ✅ Fehler-Meldung bei ungültigen Zeilen

#### 3.4 Statistiken & Insights (Woche 12-13)
- [ ] Dashboard (Manage Mode)
- [ ] Metriken:
  - Anzahl Alben
  - Top 10 Artists
  - Genres (Pie Chart)
  - Dekaden (Bar Chart)
  - Scan-Aktivität (Zeitverlauf)
- [ ] Visualisierungen (Recharts oder Chart.js)

**Acceptance Criteria**:
- ✅ Responsive Charts
- ✅ Keine Performance-Probleme bei 1000 Alben

#### 3.5 Erweiterte Verwaltung (Woche 13)
- [ ] Edit Album Funktion (Genre, Jahr korrigieren)
- [ ] Manuelles Hinzufügen (ohne Barcode)
- [ ] Bulk Actions (Mehrere Alben löschen)
- [ ] Import/Export Sammlung (Backup JSON)

**Acceptance Criteria**:
- ✅ Edits werden persistent gespeichert
- ✅ JSON Backup/Restore funktioniert

#### 3.6 Spotify Playlist-Erstellung (Optional, Woche 14)
- [ ] "Create Spotify Playlist" Button
- [ ] Playlist-Name: "My CD Collection"
- [ ] Track-Upload (100 pro Request, Rate Limiting)
- [ ] Fortschrittsanzeige
- [ ] Fehlerbehandlung (Album nicht auf Spotify)

**Acceptance Criteria**:
- ✅ Playlist wird in Spotify erstellt
- ✅ Rate Limits werden respektiert

#### 3.7 Final Testing & Launch (Woche 14)
- [ ] Komplette E2E Test Suite
- [ ] Performance Audit (Lighthouse)
- [ ] Accessibility Audit (axe, Wave)
- [ ] Security Audit (Secrets, HTTPS)
- [ ] Beta-Testing (5-10 User)
- [ ] Bug Fixes
- [ ] Launch Checklist (PUBLISHING_CHECKLIST.md)

**Acceptance Criteria**:
- ✅ Alle Tests grün
- ✅ Lighthouse > 90 (alle Kategorien)
- ✅ Keine kritischen Bugs

### Deliverables Phase 3
- ✅ CSV/m3u Export funktioniert
- ✅ Statistiken verfügbar
- ✅ Erweiterte Verwaltung
- ✅ Production-Ready
- ✅ Vollständige Dokumentation

### Risiken Phase 3
- **Spotify Rate Limits**: → Progressiv (100 Tracks/Request)
- **CSV Parsing komplex**: → Library (papaparse)
- **Fehlende Spotify IDs**: → Fallback: Suche, Warnung

---

## Meilensteine

| Meilenstein | Datum | Status |
|-------------|-------|--------|
| **M1**: Scan2Play funktioniert | Oktober 2025 | ✅ ABGESCHLOSSEN |
| **M2**: Batch-Import + PWA | Oktober 2025 | ✅ ABGESCHLOSSEN |
| **M3**: Export-Funktionen | TBD | 🟡 In Arbeit |
| **M4**: Search & Management | TBD | 🔴 Geplant |
| **M5**: UX Polish | TBD | 🔴 Geplant |
| **M6**: Production Ready | TBD | 🔴 Geplant |

---

## 📋 Detaillierter Implementierungsplan (Aktualisiert 2025-10-28)

**Strategie**: Grundfunktionen → Stabilität → Polish → Erweiterte Features

---

### ✅ PHASE 1: CORE FEATURES (ABGESCHLOSSEN)

**Ziel**: Alle essentiellen Funktionen implementieren
**Dauer**: ~4 Wochen
**Status**: ✅ KOMPLETT

**Was fertig ist:**
- ✅ Barcode Scanner, MusicBrainz, Spotify API
- ✅ Scan2Play, Import Mode, Manage Mode
- ✅ IndexedDB Storage
- ✅ CSV/m3u Export
- ✅ PWA Setup

---

### 🎵 PHASE 2: GRUNDLEGENDE PLAYER IMPLEMENTIERUNG

**Ziel**: Music Playback direkt in der App mit Spotify Web Playback SDK
**Dauer**: 3-4 Tage
**Priorität**: HOCH ⭐⭐⭐
**Status**: 🔴 NEXT

**Wichtig**: Der User kann derzeit schon Musik abspielen, aber nur durch externes Öffnen in Spotify. Wir implementieren einen eingebetteten Player IN der App mit dem Spotify Web Playback SDK.

#### 2.1 Spotify Web Playback SDK Integration (1-2 Tage)

**Features:**
- [ ] Spotify Web Playback SDK laden und initialisieren
- [ ] Device Registration (Player erscheint als "CD Collection Web Player" in Spotify)
- [ ] Token Management (Access Token refresh)
- [ ] Player State Management (Track Info, Position, Duration)
- [ ] Error Handling (Premium Required, Device Not Available)

**Technische Details:**
```typescript
// Web Playback SDK Integration
interface SpotifyPlayer {
  connect(): Promise<boolean>;
  disconnect(): void;
  getCurrentState(): Promise<PlaybackState | null>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  togglePlay(): Promise<void>;
  seek(position_ms: number): Promise<void>;
  previousTrack(): Promise<void>;
  nextTrack(): Promise<void>;
  setVolume(volume: number): Promise<void>;
}

interface PlaybackState {
  track_window: {
    current_track: Track;
    previous_tracks: Track[];
    next_tracks: Track[];
  };
  position: number;
  duration: number;
  paused: boolean;
}
```

**Acceptance Criteria:**
- ✅ SDK lädt erfolgreich
- ✅ Player erscheint als Device in Spotify
- ✅ Play/Pause funktioniert
- ✅ Premium-Check mit sinnvoller Fehlermeldung

**Hinweis:** Spotify Web Playback SDK benötigt Spotify Premium.

---

#### 2.2 Mini-Player UI (1 Tag)

**Features:**
- [ ] Persistent Bottom Bar (fixed position)
- [ ] Album Cover Thumbnail
- [ ] Track Info: Artist - Title
- [ ] Play/Pause Button
- [ ] Skip Previous/Next Buttons
- [ ] Progress Bar (Seek-fähig)
- [ ] Volume Control
- [ ] "Open in Spotify" Link

**UI Layout:**
```
┌────────────────────────────────────────────────┐
│ [Cover] Artist - Track Title  [◄] [▶/II] [►]  │
│         ●──────────────● 1:23 / 3:45    🔊 70% │
└────────────────────────────────────────────────┘
```

**Acceptance Criteria:**
- ✅ Mini-Player ist auf allen Seiten sichtbar
- ✅ Responsive (Mobile: vereinfachte Version)
- ✅ Smooth Animations
- ✅ Progress Bar aktualisiert sich in Echtzeit

**Dateien:**
- `app/src/components/player/MiniPlayer.tsx` (NEU)
- `app/src/contexts/PlayerContext.tsx` (NEU)
- `app/src/hooks/useSpotifyPlayer.ts` (NEU)

---

#### 2.3 Player State Management (1 Tag)

**Features:**
- [ ] React Context für globalen Player State
- [ ] Play Album aus ManageMode
- [ ] Play Album aus ImportMode
- [ ] Play Album aus PlayMode
- [ ] Queue Management (Basic)
- [ ] Playback Events (Track Changed, Playback Stopped)

**Context API:**
```typescript
interface PlayerContextValue {
  player: SpotifyPlayer | null;
  currentTrack: Track | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  volume: number;

  playAlbum(albumUri: string): Promise<void>;
  togglePlay(): Promise<void>;
  nextTrack(): Promise<void>;
  previousTrack(): Promise<void>;
  seek(position: number): Promise<void>;
  setVolume(volume: number): Promise<void>;
}
```

**Acceptance Criteria:**
- ✅ Player State ist global verfügbar
- ✅ Alle Modi können Player verwenden
- ✅ Keine State-Konflikte zwischen Komponenten

---

#### 2.4 Premium Check & Fallback (0.5 Tag)

**Features:**
- [ ] Premium Status prüfen (Spotify API: `/me`)
- [ ] Fallback UI für Free Users
- [ ] Clear Error Message: "Web Playback requires Spotify Premium"
- [ ] "Open in Spotify App" Button als Alternative

**Acceptance Criteria:**
- ✅ Free Users bekommen klare Meldung
- ✅ Kein App-Crash bei Free Accounts
- ✅ Alternative (extern in Spotify öffnen) funktioniert

---

### 🐛 PHASE 3: BUGFIXING GRUNDFUNKTIONEN

**Ziel**: Alle Core Features sind stabil und zuverlässig
**Dauer**: 2-3 Tage
**Priorität**: HOCH ⭐⭐⭐
**Status**: 🔴 Geplant

**Focus Areas:**
- [ ] Barcode Scanner Edge Cases
  - Schlechte Lichtverhältnisse
  - Beschädigte Barcodes
  - Kamera-Permission Handling

- [ ] MusicBrainz API
  - Timeout Handling
  - Rate Limit Errors
  - Album nicht gefunden → bessere UX

- [ ] Spotify API
  - Token Refresh
  - Network Errors
  - Rate Limits

- [ ] IndexedDB
  - Storage Quota Exceeded
  - Migration Errors
  - Corrupted Data Handling

- [ ] CSV/m3u Export
  - Sonderzeichen Testing (Umlaute, Akzente)
  - Große Sammlungen (1000+ Alben)
  - Browser Kompatibilität

**Testing:**
- [ ] E2E Tests für kritische Flows
- [ ] Error Scenarios testen
- [ ] Cross-Browser Testing (Chrome, Safari, Firefox)

---

### 🎨 PHASE 4: GRUNDLEGENDE UX VERBESSERUNGEN

**Ziel**: App ist benutzerfreundlich und professionell
**Dauer**: 3-4 Tage
**Priorität**: MITTEL ⭐⭐
**Status**: 🔴 Geplant

**Features:**
- [ ] **Loading States**
  - Skeleton Screens statt Spinner
  - Progress Indicators für Batch-Operationen
  - Smooth Transitions

- [ ] **Error Handling UI**
  - Freundliche Error Messages
  - Retry Buttons
  - Graceful Degradation (Offline)

- [ ] **Empty States**
  - Illustration + Hilfetext
  - Call-to-Action Buttons
  - Onboarding für Erstnutzer

- [ ] **Toast Improvements**
  - Action Buttons (z.B. "Undo")
  - Bessere Positionierung (Mobile)
  - Icons für Toast-Typen

- [ ] **Responsive Optimierungen**
  - Touch-freundliche Buttons (min 44x44px)
  - Mobile Navigation verbessern
  - Tablet Layout optimieren

**Acceptance Criteria:**
- ✅ Lighthouse Score > 85
- ✅ Keine Layout Shifts
- ✅ Smooth auf Mobile

---

### 🐛 PHASE 5: BUGFIXING UX UND FUNKTIONALITÄT

**Ziel**: UX ist poliert und fehlerfrei
**Dauer**: 2-3 Tage
**Priorität**: MITTEL ⭐⭐
**Status**: 🔴 Geplant

**Focus Areas:**
- [ ] UI Bugs fixen (gefunden in Phase 4)
- [ ] Performance Optimierungen
- [ ] Accessibility Verbesserungen
  - Keyboard Navigation
  - Screen Reader Support
  - Color Contrast (WCAG AA)
- [ ] Mobile UX Feinschliff
- [ ] Dark Mode Polish

**Testing:**
- [ ] User Testing (5-10 Beta-Nutzer)
- [ ] Accessibility Audit (axe DevTools)
- [ ] Performance Audit (Lighthouse)

---

### 🚀 PHASE 6: PRODUCTION READY

**Ziel**: App ist launch-ready
**Dauer**: 2-3 Tage
**Priorität**: HOCH ⭐⭐⭐
**Status**: 🔴 Geplant

**Checklist:**
- [ ] **Security Audit**
  - Secrets nicht im Code
  - HTTPS everywhere
  - Input Validation

- [ ] **Performance Optimization**
  - Bundle Size < 500KB
  - Lighthouse > 90 (alle Kategorien)
  - Service Worker Caching optimieren

- [ ] **Documentation**
  - README aktualisieren
  - Deployment Guide
  - User Documentation (How-to)

- [ ] **Testing**
  - E2E Tests komplett
  - Manual Testing (alle Flows)
  - Cross-Browser Testing

- [ ] **Launch Vorbereitung**
  - GitHub Pages Deployment testen
  - Analytics Setup (optional)
  - Error Monitoring (Sentry, optional)

**Deliverables:**
- ✅ Production-ready Build
- ✅ Vollständige Dokumentation
- ✅ Launch Checklist abgehakt

---

### 🌟 PHASE 7: ERWEITERTE FUNKTIONEN

**Ziel**: Nice-to-have Features
**Dauer**: 8-12 Tage
**Priorität**: NIEDRIG ⭐
**Status**: 🔴 Future

**Features (von Phase 1 verschoben):**

#### 7.1 Search & Filter (1-2 Tage)
- [ ] Search Bar (Artist, Album)
- [ ] Filter (Spotify Status)
- [ ] Sortierung (Artist, Album, Datum)

#### 7.2 Album Management (2-3 Tage)
- [ ] Edit Album Metadata
- [ ] Manual Album Entry
- [ ] Bulk Operations (Multi-Select, Bulk Delete)

#### 7.3 Statistics & Insights (1-2 Tage)
- [ ] Collection Stats
- [ ] Top Artists
- [ ] Alben pro Dekade
- [ ] Optional: Charts (Recharts)

#### 7.4 CSV → m3u Converter (1 Tag)
- [ ] Upload CSV
- [ ] Parse & Validate
- [ ] Convert to m3u
- [ ] Download

#### 7.5 Additional Features (3-4 Tage)
- [ ] Queue Management (Advanced)
- [ ] Smart Playlists
- [ ] Album Reviews/Notes
- [ ] Sharing Features
- [ ] Multi-Language (i18n)

**Total Phase 7**: 8-12 Tage (nach Production Launch)

---

## 📊 Gesamter Zeitplan

| Phase | Dauer | Priorität | Status |
|-------|-------|-----------|--------|
| **Phase 1**: Core Features | ~4 Wochen | ⭐⭐⭐ | ✅ KOMPLETT |
| **Phase 2**: Player | 3-4 Tage | ⭐⭐⭐ | 🔴 NEXT |
| **Phase 3**: Bugfixing Core | 2-3 Tage | ⭐⭐⭐ | 🔴 Geplant |
| **Phase 4**: UX Improvements | 3-4 Tage | ⭐⭐ | 🔴 Geplant |
| **Phase 5**: Bugfixing UX | 2-3 Tage | ⭐⭐ | 🔴 Geplant |
| **Phase 6**: Production Ready | 2-3 Tage | ⭐⭐⭐ | 🔴 Geplant |
| **Phase 7**: Advanced Features | 8-12 Tage | ⭐ | 🔴 Future |
| **TOTAL** | **~20-29 Tage** | **(~4-6 Wochen)** | |

---

## 🎯 Nächster Schritt: Spotify Web Playback SDK

**Warum zuerst Player?**
1. ✅ Komplettes Feature für User-Experience
2. ✅ Differenzierung von anderen CD-Apps
3. ✅ In-App Playback ohne externe Apps
4. ✅ Foundation für erweiterte Player-Features später

**Implementierungsreihenfolge:**
1. SDK Integration & Device Registration
2. Mini-Player UI Component
3. Player State Management (React Context)
4. Premium Check & Fallback UI
5. Testing & Bug Fixes

---

## Änderungshistorie

| Version | Datum | Änderung |
|---------|-------|----------|
| 1.0 | 2025-10-27 | Initiale Roadmap erstellt |
| 2.0 | 2025-10-28 | Status aktualisiert: Phase 1 & 2 teilweise komplett. Detaillierter 3-Phasen Implementierungsplan hinzugefügt (Technische Grundfunktionen → UX → Playback) |
| 3.0 | 2025-10-28 | Neue 7-Phasen-Struktur: Core Features (✅) → Player → Bugfixing → UX → Production → Advanced. Option B (Deep Links) verworfen, nur Spotify Web Playback SDK (Option A). CSV/m3u Export komplett ✅. Search/Filter/Stats verschoben auf Phase 7. |

---

**Status**: ✅ Phase 1 (Core Features) komplett, Phase 2 (Player) NEXT
**Nächste Schritte**: Spotify Web Playback SDK Implementation (Phase 2.1)

## Post-Launch (Optional)

Nach Production Launch (Phase 6) können folgende Features optional implementiert werden:

### Marketing & Community
- [ ] GitHub README mit Screenshots
- [ ] Demo Video (YouTube)
- [ ] Product Hunt Launch
- [ ] Reddit Post (r/selfhosted, r/DataHoarder)

### Optional Features (siehe Phase 7)
- Apple Music Integration
- Vinyl/Kassetten Support
- QR-Code Generierung
- Sharing Features
- Multi-Language (i18n)

---

