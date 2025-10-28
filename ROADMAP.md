# Development Roadmap: CD Collection to Playlist

**Ursprüngliche Gesamtdauer**: 14 Wochen (3,5 Monate)
**Start**: Oktober 2025
**Projektstatus**: Phase 1 abgeschlossen ✅, Phase 2 in Arbeit 🟡

---

## Aktueller Status (Stand: 2025-10-28)

```
Phase 1: Scan2Play          ████████████████  ✅ KOMPLETT (4 Wochen)
Phase 2: Sammlung           ████████░░░░░░░░  🟡 50% (in Arbeit)
Phase 3: Export & Verwaltung ░░░░░░░░░░░░░░░░  🔴 Geplant
                             └─────────────┘
                              ~3-5 Wochen verbleibend
```

### ✅ Was bereits funktioniert:

**Phase 1 - Scan2Play (KOMPLETT)**
- ✅ Barcode Scanner (Quagga2)
- ✅ MusicBrainz Integration (Album Lookup)
- ✅ Spotify OAuth & API
- ✅ Scan2Play: Barcode → Sofort abspielen
- ✅ PWA installierbar
- ✅ Deployed auf GitHub Pages

**Phase 2 - Sammlung (TEILWEISE)**
- ✅ IndexedDB Storage (idb)
- ✅ Import Mode (Batch Scanning)
- ✅ Manage Mode (Sammlung anzeigen)
- ✅ Album-Karten mit Covers
- ✅ Löschen einzelner Alben
- ⚠️ Suche/Filter - FEHLT
- ⚠️ Edit/Bulk Operations - FEHLT
- ⚠️ Statistiken - FEHLT

**Phase 3 - Export (AUSSTEHEND)**
- ❌ CSV Export
- ❌ m3u Export
- ❌ CSV → m3u Converter
- ❌ Erweiterte Verwaltung
- ❌ Playlist-Erstellung

---

## 🎯 NEXT: 3-Phasen Implementierungsplan

Basierend auf dem aktuellen Stand priorisieren wir die Implementierung wie folgt:

### Phase 1: Technische Grundfunktionen (8-12 Tage)
**Priorität: HOCH** - Core-Features für Produktivnutzung

### Phase 2: UX Verbesserungen (5-7 Tage)
**Priorität: MITTEL** - Polish & Accessibility

### Phase 3: Erweiterte Abspielfunktion (4-6 Tage)
**Priorität: NIEDRIG** - Nice-to-have Features

Detaillierte Beschreibung siehe unten in "Detaillierter Implementierungsplan".

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

Dieser Plan ergänzt die ursprüngliche Roadmap mit einem fokussierten Ansatz für die verbleibenden Features.

---

### 🔧 PHASE 1: TECHNISCHE GRUNDFUNKTIONEN

**Ziel**: Core-Features implementieren, die für Produktivnutzung essentiell sind
**Dauer**: 8-12 Tage (2-3 Wochen)
**Priorität**: HOCH ⭐⭐⭐

#### 1.1 Export-Funktionen (2-3 Tage)

**User Story**: *"Ich möchte meine CD-Sammlung exportieren, um sie in Excel zu bearbeiten oder in Spotify zu importieren."*

**Features:**
- [ ] **CSV Export**
  - Download-Button in ManageMode mit Icon
  - Format: `Artist, Album, Year, Genre, Barcode, Spotify_URI, Cover_URL, Date_Added`
  - Dateiname: `cd-collection-YYYY-MM-DD.csv`
  - UTF-8 Encoding mit BOM (für Excel-Kompatibilität)
  - Header-Zeile mit Spaltenüberschriften
  - Test mit Sonderzeichen (Umlaute, Akzente)

- [ ] **m3u Playlist Export**
  - Extended M3U Format (#EXTM3U, #EXTINF)
  - Spotify Track URIs: `spotify:track:xxxxx`
  - Nur Alben mit Spotify URI exportieren
  - Option: "Gesamte Sammlung" oder "Ausgewählte Alben"
  - Dateiname: `cd-playlist-YYYY-MM-DD.m3u`

- [ ] **CSV → m3u Converter**
  - Upload CSV Datei
  - Parsing mit Validation
  - Preview-Ansicht vor Export
  - Fehlerbehandlung: Fehlende Spotify URIs
  - Download m3u nach Konvertierung

**Technische Details:**
```typescript
// Export Service
interface ExportService {
  exportToCSV(albums: Album[]): Blob;
  exportToM3U(albums: Album[]): Blob;
  parseCSV(file: File): Promise<Album[]>;
  convertCSVToM3U(csv: Album[]): Blob;
}
```

**Acceptance Criteria:**
- ✅ CSV öffnet korrekt in Excel/Google Sheets
- ✅ m3u ist importierbar in Spotify-Tools
- ✅ CSV → m3u Konvertierung funktioniert
- ✅ Umlaute und Sonderzeichen korrekt dargestellt

**Dateien zu erstellen/ändern:**
- `app/src/services/export.ts` (NEU)
- `app/src/pages/ManageMode.tsx` (UPDATE - Export Buttons)
- `app/src/components/ui/ExportModal.tsx` (NEU - Optional)

---

#### 1.2 Search & Filter (1-2 Tage)

**User Story**: *"Ich habe 200 CDs gescannt und möchte schnell ein bestimmtes Album finden."*

**Features:**
- [ ] **Search Bar**
  - Eingabefeld mit Lupe-Icon
  - Suche nach: Artist, Album Title
  - Live-Filter (client-side)
  - Debounced Input (300ms delay)
  - "Clear" Button (X)
  - Keyboard Shortcut: "/" fokussiert Suche

- [ ] **Filter Optionen**
  - Dropdown "Spotify Status":
    - Alle Alben
    - Mit Spotify ✅
    - Ohne Spotify ❌
  - Sortierung:
    - Neueste zuerst (Standard)
    - Artist A-Z
    - Album A-Z
    - Jahr aufsteigend/absteigend

- [ ] **URL State (Optional)**
  - Filter/Suche in URL Parameter
  - Shareable Links: `/manage?search=pink&sort=artist`

**Technische Details:**
```typescript
interface FilterState {
  searchQuery: string;
  spotifyStatus: 'all' | 'with_spotify' | 'without_spotify';
  sortBy: 'newest' | 'artist_asc' | 'album_asc' | 'year_asc' | 'year_desc';
}

function filterAlbums(albums: Album[], filter: FilterState): Album[]
```

**Acceptance Criteria:**
- ✅ Suche funktioniert mit < 100ms Delay
- ✅ Filter kombinierbar (Suche + Spotify Status + Sortierung)
- ✅ Responsive auf Mobile

**Dateien zu ändern:**
- `app/src/pages/ManageMode.tsx` (UPDATE)
- `app/src/components/ui/SearchBar.tsx` (NEU)
- `app/src/components/ui/FilterDropdown.tsx` (NEU)

---

#### 1.3 Album Management (2-3 Tage)

**User Story**: *"Ich möchte Metadaten korrigieren, Alben manuell hinzufügen und mehrere Alben auf einmal löschen."*

**Features:**
- [ ] **Edit Album Metadata**
  - "Edit" Button auf AlbumCard
  - Modal/Dialog mit Formular
  - Felder: Artist, Title, Year, Genre, Spotify URI
  - Validation (required fields)
  - "Save" & "Cancel" Buttons
  - Optimistic UI Update

- [ ] **Manual Album Entry**
  - "+ Manuell hinzufügen" Button in ManageMode
  - Formular mit allen Feldern
  - Optional: Spotify-Suche Integration
  - Optional: Cover URL Eingabe
  - Generiere UUID als Barcode-Ersatz

- [ ] **Bulk Operations**
  - Checkbox auf jeder AlbumCard
  - "Alle auswählen" / "Auswahl aufheben" Toggle
  - Bulk Actions Bar (fixed bottom):
    - "X Alben ausgewählt"
    - "Löschen" Button
    - "Exportieren" Button (nur ausgewählte)
  - Bestätigungs-Dialog für Bulk Delete

**Technische Details:**
```typescript
interface AlbumFormData {
  artist: string;
  title: string;
  year?: number;
  genre?: string;
  spotifyUri?: string;
  coverUrl?: string;
}

// Bulk Selection State
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
```

**Acceptance Criteria:**
- ✅ Edits werden persistent in IndexedDB gespeichert
- ✅ Manual Entry funktioniert ohne Barcode
- ✅ Bulk Delete mit Confirmation
- ✅ UI ist intuitiv und responsive

**Dateien zu ändern:**
- `app/src/pages/ManageMode.tsx` (UPDATE - Bulk Selection)
- `app/src/components/ui/AlbumCard.tsx` (UPDATE - Edit Button, Checkbox)
- `app/src/components/ui/AlbumEditModal.tsx` (NEU)
- `app/src/components/ui/AlbumAddModal.tsx` (NEU)
- `app/src/services/db.ts` (UPDATE - updateAlbum)

---

#### 1.4 Statistics & Insights (1-2 Tage)

**User Story**: *"Ich möchte Statistiken über meine Sammlung sehen: Wie viele Alben? Welche Artists?"*

**Features:**
- [ ] **Stats Widget (Manage Mode Header)**
  - Karten-Layout (Cards):
    - Gesamt-Anzahl Alben
    - Anzahl mit Spotify
    - Anzahl ohne Spotify
    - Anzahl Artists (unique)

- [ ] **Top Lists**
  - Top 10 Artists (nach Album-Anzahl)
  - Optional: Top Genres (wenn MusicBrainz Genre liefert)

- [ ] **Visualizations (Optional)**
  - Balkendiagramm: Alben pro Dekade (1970s, 1980s, ...)
  - Pie Chart: Genres
  - Optional: Recharts oder Chart.js

**Technische Details:**
```typescript
interface CollectionStats {
  totalAlbums: number;
  withSpotify: number;
  withoutSpotify: number;
  uniqueArtists: number;
  topArtists: { artist: string; count: number }[];
  albumsByDecade: { decade: string; count: number }[];
}

async function getCollectionStats(albums: Album[]): Promise<CollectionStats>
```

**Acceptance Criteria:**
- ✅ Stats werden schnell berechnet (< 500ms für 1000 Alben)
- ✅ Responsive Layout
- ✅ Charts sind optional (kann ohne gestartet werden)

**Dateien zu ändern:**
- `app/src/pages/ManageMode.tsx` (UPDATE - Stats Widget)
- `app/src/components/ui/StatsCard.tsx` (NEU)
- `app/src/utils/statistics.ts` (NEU)

---

### 🎨 PHASE 2: UX VERBESSERUNGEN

**Ziel**: App benutzerfreundlicher, zugänglicher und professioneller machen
**Dauer**: 5-7 Tage
**Priorität**: MITTEL ⭐⭐

#### 2.1 Loading States & Feedback (1 Tag)

- [ ] Skeleton Screens statt Spinner
- [ ] Progress Indicators für Batch-Operationen
- [ ] Toast Improvements (Action Buttons, bessere Positionierung)

#### 2.2 Error Handling (1 Tag)

- [ ] Graceful Degradation (Offline-Modus, API Fehler mit Retry)
- [ ] Error Boundaries (React Error Boundary)

#### 2.3 Accessibility (1-2 Tage)

- [ ] Keyboard Navigation verbessern
- [ ] ARIA Labels hinzufügen
- [ ] Color Contrast prüfen (WCAG AA)
- [ ] Screen Reader Testing

#### 2.4 Responsive & Mobile UX (1 Tag)

- [ ] Touch-freundliche Buttons (min 44x44px)
- [ ] Swipe Gestures (Optional: swipe to delete)
- [ ] Bottom Sheet Modals für Mobile

#### 2.5 Empty States (1 Tag)

- [ ] Ansprechende Empty States mit Illustration
- [ ] Call-to-Action Buttons
- [ ] Onboarding-Hinweise für Erstnutzer

---

### 🎵 PHASE 3: ERWEITERTE ABSPIELFUNKTION

**Ziel**: Playback-Features erweitern (aktuell nur Scan2Play vorhanden)
**Dauer**: 4-6 Tage
**Priorität**: NIEDRIG ⭐

#### 3.1 Player Controls (2-3 Tage)

- [ ] Mini-Player (Persistent Bottom Bar)
- [ ] Spotify Web Playback SDK Integration
- [ ] Play/Pause/Skip Buttons
- [ ] Current Track anzeigen

#### 3.2 Queue Management (1-2 Tage)

- [ ] "Als Nächstes" Liste
- [ ] Drag & Drop Reihenfolge
- [ ] Shuffle & Repeat

#### 3.3 Smart Playlists (1 Tag)

- [ ] "Alle meine CDs" Playlist erstellen
- [ ] "Zuletzt gescannt" Playlist
- [ ] Genre-basierte Playlists

---

## 📊 Zeitplan & Priorisierung

| Phase | Dauer | Status | Start | Ende |
|-------|-------|--------|-------|------|
| **Phase 1.1**: CSV/m3u Export | 2-3 Tage | 🔴 Ausstehend | TBD | TBD |
| **Phase 1.2**: Search & Filter | 1-2 Tage | 🔴 Ausstehend | TBD | TBD |
| **Phase 1.3**: Album Management | 2-3 Tage | 🔴 Ausstehend | TBD | TBD |
| **Phase 1.4**: Statistics | 1-2 Tage | 🔴 Ausstehend | TBD | TBD |
| **Phase 2**: UX Verbesserungen | 5-7 Tage | 🔴 Geplant | TBD | TBD |
| **Phase 3**: Abspielfunktion | 4-6 Tage | 🔴 Optional | TBD | TBD |
| **TOTAL** | **17-25 Tage** | (~3-5 Wochen) | | |

---

## 🎯 Nächster Schritt: CSV/m3u Export

**Warum zuerst Export?**
1. ✅ Sofortiger Nutzen für Benutzer
2. ✅ Unabhängig von anderen Features
3. ✅ Schnell umsetzbar (2-3 Tage)
4. ✅ Foundation für Playlist-Features

**Implementierungsreihenfolge:**
1. CSV Export Service erstellen
2. Export Button in ManageMode hinzufügen
3. m3u Export implementieren
4. CSV → m3u Converter hinzufügen
5. Testing & Documentation

---

## Post-Launch (Nice-to-Have)

Nach Launch (Woche 15+):

### Features (Optional)
- [ ] Apple Music Integration
- [ ] Vinyl/Kassetten Support
- [ ] QR-Code Generierung (für physische Sammlung)
- [ ] Sharing: "Meine Top 10 Alben"
- [ ] Multi-Language (i18n): Deutsch, Englisch, Französisch
- [ ] Themes: Custom Color Schemes

### Marketing & Community
- [ ] GitHub README mit Screenshots
- [ ] Demo Video (YouTube)
- [ ] Product Hunt Launch
- [ ] Reddit Post (r/selfhosted, r/DataHoarder)

---

## Team & Rollen

**Developer**: S540d (Full-Stack, PWA, Testing)
**Designer**: (Optional, Tailwind UI reicht vorerst)
**Beta-Tester**: 5-10 Nutzer (Phase 2 + 3)

---

## Tools & Workflow

### Development
- **IDE**: VS Code + ESLint + Prettier
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions (Lint, Test, Deploy)
- **Deployment**: GitHub Pages
- **Monitoring**: Sentry (Fehler-Tracking)

### Testing
- **Unit**: Vitest
- **E2E**: Playwright
- **Accessibility**: axe DevTools
- **Performance**: Lighthouse CI

### Project Management
- **Issues**: GitHub Issues (mit Labels: bug, feature, enhancement)
- **Milestones**: GitHub Milestones
- **Board**: GitHub Projects (Kanban)

---

## Definition of Done (DoD)

Ein Feature ist "Done" wenn:

- ✅ Code ist geschrieben & funktioniert
- ✅ Unit Tests vorhanden (> 60% Coverage)
- ✅ E2E Test vorhanden (Happy Path)
- ✅ Accessibility getestet (axe)
- ✅ Code Review durchgeführt
- ✅ Dokumentation aktualisiert
- ✅ Deployed auf Staging/Production
- ✅ User kann Feature nutzen

---

## Änderungshistorie

| Version | Datum | Änderung |
|---------|-------|----------|
| 1.0 | 2025-10-27 | Initiale Roadmap erstellt |
| 2.0 | 2025-10-28 | Status aktualisiert: Phase 1 & 2 teilweise komplett. Detaillierter 3-Phasen Implementierungsplan hinzugefügt (Technische Grundfunktionen → UX → Playback) |

---

**Status**: ✅ Phase 1 komplett, Phase 2 50%, Phase 3 geplant
**Nächste Schritte**: CSV/m3u Export implementieren (Phase 1.1)
