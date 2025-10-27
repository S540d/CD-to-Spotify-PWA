# Development Roadmap: CD Collection to Playlist

**Geschätzte Gesamtdauer**: 14 Wochen (3,5 Monate)
**Start**: TBD
**Projektstatus**: Vision & Planung abgeschlossen

---

## Überblick

```
Phase 1: Scan2Play          ████░░░░░░░░░░  (4 Wochen)
Phase 2: Sammlung           ░░░░██████░░░░  (6 Wochen)
Phase 3: Export & Verwaltung ░░░░░░░░░████  (4 Wochen)
                             └─────────────┘
                              14 Wochen
```

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
| **M1**: Scan2Play funktioniert | TBD (Woche 4) | 🔴 Ausstehend |
| **M2**: Batch-Import + PWA | TBD (Woche 10) | 🔴 Ausstehend |
| **M3**: Export + Launch | TBD (Woche 14) | 🔴 Ausstehend |

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

---

**Status**: ✅ Roadmap genehmigt, bereit für Phase 1
**Nächste Schritte**: Projekt-Setup, Technologie-Stack finalisieren, Phase 1 starten
