# CD Collection to Playlist

**"Archiviere deine CD-Sammlung digital - Scanne, speichere, höre überall"**

A Progressive Web App that helps you digitally archive your physical CD collection. Scan barcodes, store albums locally, and export to Spotify playlists - so you can finally move those CDs to the basement while keeping full access to your music.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/status-alpha-orange.svg)](https://s540d.github.io/CD-to-Spotify-PWA)

## 🚀 Live Demo

**[Try the app now →](https://s540d.github.io/CD-to-Spotify-PWA)**

> **Note**: Currently in **Phase 1 (Alpha)**. The Scan2Play feature is functional. You'll need a Spotify account to test playback features.

## 🎯 The Problem

You have a CD collection but no CD player. You want to free up space (moving, minimalism), but don't want to lose access to your music. Manual CSV imports are tedious and time-consuming.

## 💡 The Solution

Scan CD barcodes with your smartphone camera, automatically retrieve metadata (MusicBrainz), store your collection locally (IndexedDB), and export to Spotify-compatible formats (CSV, m3u).

## 🎵 Features

### Phase 1: Scan2Play (Quick Win)
- 📷 **Instant Playback**: Scan a CD barcode → Play immediately on Spotify
- 🚀 **Fast**: < 3 seconds from scan to play
- 📱 **Mobile-First**: Optimized for smartphone use

### Phase 2: Digital Archive (Core Feature)
- 📦 **Batch Scanning**: Scan 100+ CDs in one session
- 💾 **Local Storage**: Your collection stored in IndexedDB (offline-capable)
- 🖼️ **Album Covers**: Automatic cover art retrieval
- 🔍 **Search & Filter**: Find albums by artist, year, genre
- 📊 **Statistics**: See your collection insights (top artists, genres, decades)

### Phase 3: Export & Manage (Flexibility)
- 📄 **CSV Export**: Editable format for manual corrections
- 🎵 **m3u Export**: Import into Spotify and other tools
- 🔄 **CSV → m3u Conversion**: Edit in Excel, convert to m3u
- ✏️ **Manage**: Edit metadata, delete albums, add manually
- 📊 **Insights**: Visualizations (genres, decades, scanning activity)

## 🚀 Quick Start

### Try it Online

**[Launch the app →](https://s540d.github.io/CD-to-Spotify-PWA)**

### Run Locally

The application code is in the `app/` directory. See [app/README.md](app/README.md) for detailed setup instructions.

```bash
cd app
npm install
cp .env.example .env
# Edit .env with your Spotify credentials
npm run dev
```

## 📚 Documentation

- **[PROJECT_VISION.md](PROJECT_VISION.md)**: Detailed project vision, goals, and technical strategy
- **[ROADMAP.md](ROADMAP.md)**: Development phases and timeline (14 weeks)
- **[technische_vorgaben.md](technische_vorgaben.md)**: Technical standards and best practices
- **[ux-vorgaben.md](ux-vorgaben.md)**: UX/UI guidelines and design principles
- **[accessibility-guidelines.md](accessibility-guidelines.md)**: WCAG 2.1 AA compliance guidelines

## 🎯 Target Audience

- People with CD collections (50-300 CDs) who no longer have a CD player
- Want to free up space (moving, minimalism, basement storage)
- Prefer digital music consumption (Spotify, etc.)
- NOT audiophiles (they prefer the tactile experience)

## 📁 Repository Structure

```
CD-to-Spotify-PWA/
├── app/                          # Main application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── barcode/        # Barcode scanner
│   │   │   ├── ui/             # UI components (Button, Toast, etc.)
│   │   │   └── layout/         # Layout components
│   │   ├── pages/              # Page components (Home, Import, Play, Manage)
│   │   ├── services/           # API services (Spotify, MusicBrainz, IndexedDB)
│   │   ├── types/              # TypeScript type definitions
│   │   └── utils/              # Utility functions
│   ├── public/                  # Static assets and PWA icons
│   ├── README.md               # Detailed application documentation
│   └── package.json
│
├── .github/                     # GitHub templates and workflows
├── technische_vorgaben.md       # Technical standards
├── ux-vorgaben.md              # UX/UI guidelines
├── design-system.md            # Component design system
├── accessibility-guidelines.md  # Accessibility standards
└── testing-standards.md        # Testing best practices
```

## 🌟 Why This App?

Unlike CSV import tools or manual solutions, this app offers:

| Feature | This App | CSV Import | Manual |
|---------|----------|------------|--------|
| Barcode Scanner | ✅ Automatic | ❌ | ❌ |
| Metadata Retrieval | ✅ MusicBrainz | ❌ Manual | ❌ Manual |
| Local Archive | ✅ IndexedDB | ❌ | ❌ |
| Offline-Capable | ✅ PWA | ❌ | ❌ |
| Instant Playback | ✅ Scan2Play | ❌ | ❌ |
| Cover Images | ✅ Automatic | ❌ | ❌ |

## 🛠 Technology Stack

- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **Quagga2** for barcode scanning
- **IndexedDB** (via idb) for local data storage
- **MusicBrainz API** for album metadata and cover art
- **Spotify Web API** for playlist creation and playback
- **Service Worker** for PWA capabilities and offline support

## 📖 User Stories

**Story 1: The Minimalist Mover**
> "I'm moving to a smaller apartment and have 150 CDs taking up space. I scanned them all in one afternoon, exported to Spotify, and now they're in the basement. I still have access to all my music!"

**Story 2: The Digital Native**
> "My parents gave me their CD collection, but I don't have a CD player. I scanned everything, and now I can listen to their music on Spotify. It's like having their entire collection digitized!"

**Story 3: The Quick Player**
> "I found an old CD at a friend's place. No idea what's on it. I scanned it with the app, and it started playing immediately on Spotify. So convenient!"

## 📅 Status & Roadmap

**Current Status**: 🟢 Phase 1 (Alpha) - Live on GitHub Pages

**What's Working:**
- ✅ Barcode scanning (Quagga2)
- ✅ MusicBrainz album lookup
- ✅ Spotify OAuth login
- ✅ Scan2Play: Instant CD → Spotify playback
- ✅ Local album storage (IndexedDB)
- ✅ PWA ready (installable)

**Development Roadmap** (14 weeks total):
- **Phase 1** ✅ COMPLETE: Scan2Play - Instant barcode → Spotify playback
- **Phase 2** (in progress): Digital Archive - Batch scanning + enhanced UI
- **Phase 3** (planned): Export & Management - CSV/m3u export, statistics

See [ROADMAP.md](ROADMAP.md) for detailed milestones and features.

---

## 📖 Project Templates & Standards

This repository also contains comprehensive project templates and standards:

---

# Project Templates

Zentrale Vorlagen und Standards für alle Projekte. Diese Templates definieren Best Practices für Code-Qualität, UX/Design, Testing und Accessibility.

---

## Inhalt

### Kernstandards

1. **technische_vorgaben.md**
   - Code-Qualität (Prettier, ESLint, TypeScript)
   - Testing Standards (Vitest, Jest, Playwright)
   - TypeScript Best Practices
   - Package Management
   - Build & Performance
   - Sicherheit (Secrets, Input Validation, HTTPS)
   - CI/CD & GitHub Actions
   - Pre-Production Checklist

2. **ux-vorgaben.md**
   - Design Fundamentals (Mobile First, Progressive Enhancement)
   - Farbpalette & Semantische Farben
   - Typography & Font Selection
   - Spacing System (8px Grid)
   - Responsive Design Breakpoints
   - Komponenten Standards
   - Dark Mode / Theme Support
   - Barrierefreiheit (WCAG 2.1 AA)
   - Interaktion & Feedback
   - UX Checklist

### Spezialrichtlinien

3. **design-system.md**
   - Komponenten-Katalog mit Code-Beispielen
   - Button (Typen, Größen, States)
   - Form Elements (Input, Textarea, Select, Checkbox, Radio)
   - Cards, Modals, Tabs, Alerts
   - Spinner / Loading States
   - Badges
   - Komponenten-Checkliste

4. **accessibility-guidelines.md**
   - WCAG 2.1 Level AA Compliance
   - Keyboard Navigation (Tab Order, Focus Indicators)
   - Color Contrast (4.5:1 minimum)
   - Semantic HTML
   - ARIA Labels & Descriptions
   - Alt Text Richtlinien
   - Form Labels & Error Handling
   - Color Not Only (nicht nur Farbe)
   - Text Resizing & Zoom
   - Motion & Animation
   - Testing & Audit Tools
   - Quick Checklist

5. **testing-standards.md**
   - Testing Pyramid (Unit, Integration, E2E)
   - Unit Tests (Vitest/Jest)
   - Integration Tests
   - E2E Tests (Playwright)
   - Performance Tests (Lighthouse)
   - Accessibility Tests (axe)
   - Test Naming Conventions
   - Pre-Commit Testing (Husky)
   - CI/CD Integration
   - Coverage Reports

### Deployment & Publishing

6. **PUBLISHING_CHECKLIST.md**
   - Checkliste für das Veröffentlichen von GitHub Pages PWAs
   - Optische Vorgaben (Design, Theme, Components)
   - Technische Konfiguration (GitHub Actions, PWA, Service Worker)
   - Code-Qualität Checkliste
   - Repository Setup
   - Sicherheit & Rechtliches
   - Dokumentation

### GitHub Integration

7. **.github/ISSUE_TEMPLATE/** (Zentrale Issue Templates)
   - `bug.md` - Bug Reports
   - `feature.md` - Feature Requests
   - `documentation.md` - Documentation Requests
   - `question.md` - Questions / Discussions

8. **.github/PULL_REQUEST_TEMPLATE/** (Zentrale PR Templates)
   - `default.md` - Standard PR Template mit Checklisten

9. **.github/README.md**
   - Dokumentation der GitHub Templates
   - Best Practices für Issues und PRs
   - Verwendung und Anpassung

---

## Verwendung in Projekten

Diese Templates werden als Git-Submodul in Projekte eingebunden:

```bash
git submodule add <repo-url> .templates
```

Dann sind alle Templates verfügbar unter `.templates/`:

```
.templates/
├── README.md                           # Diese Datei
├── technische_vorgaben.md              # Technische Standards
├── ux-vorgaben.md                      # UX/Design Standards
├── design-system.md                    # Komponenten-Katalog
├── accessibility-guidelines.md         # WCAG 2.1 AA Guidelines
├── testing-standards.md                # Testing Best Practices
├── PUBLISHING_CHECKLIST.md             # Publishing Checklist
│
└── .github/
    ├── README.md                       # GitHub Templates Dokumentation
    ├── ISSUE_TEMPLATE/
    │   ├── bug.md                      # Bug Report Template
    │   ├── feature.md                  # Feature Request Template
    │   ├── documentation.md            # Documentation Request Template
    │   └── question.md                 # Question / Discussion Template
    │
    └── PULL_REQUEST_TEMPLATE/
        └── default.md                  # Standard PR Template
```

## Verwendung der GitHub Templates

Die `.github` Templates können auf verschiedene Weisen in dein Projekt übernommen werden:

### Option 1: Kopieren (Einfach)
```bash
# Kopiere die .github Verzeichnisse ins Projekt
cp -r .templates/.github .
```

### Option 2: Symlink (Aktualisierbar, nur macOS/Linux)
```bash
# Erstelle Symlinks zu den Templates
ln -s .templates/.github/ISSUE_TEMPLATE .github/ISSUE_TEMPLATE
ln -s .templates/.github/PULL_REQUEST_TEMPLATE .github/PULL_REQUEST_TEMPLATE
```

### Option 3: Anpassung (Empfohlen)
```bash
# Kopiere Templates als Basis
cp -r .templates/.github .

# Bearbeite für dein Projekt (z.B. projekt-spezifische Checklisten)
vim .github/PULL_REQUEST_TEMPLATE/default.md
```

**Siehe auch:** [.github/README.md](.github/README.md) für Dokumentation und Best Practices

---

## Quick Start für neues Projekt

1. **Technische Setup** - Lese `technische_vorgaben.md` für:
   - ESLint & Prettier Konfiguration
   - Vitest Setup
   - GitHub Actions Workflows

2. **UX/Design Setup** - Nutze `ux-vorgaben.md` für:
   - Color Palette definieren (CSS Variables)
   - Typography konfigurieren
   - Responsive Breakpoints setzen
   - Dark Mode implementieren

3. **Komponenten** - Referenziere `design-system.md` für:
   - Button Komponenten
   - Form Elements
   - Modals und andere häufige Komponenten

4. **Accessibility** - Checke `accessibility-guidelines.md` für:
   - WCAG 2.1 AA Compliance
   - Keyboard Navigation
   - Screen Reader Support
   - Color Contrast

5. **Testing** - Implementiere Tests nach `testing-standards.md`:
   - Unit Tests (Vitest)
   - E2E Tests (Playwright)
   - 60%+ Coverage Ziel

6. **Publishing** - Vor Release `PUBLISHING_CHECKLIST.md`:
   - Alle Checklisten durchgehen
   - Lighthouse Audit (80+)
   - Production Checks

---

## Allgemeinheit der Templates

Diese Templates sind absichtlich **projektübergreifend generalisiert**:

✅ **Anwendbar auf:**
- Web Apps (React, Vue, Vanilla JS)
- Progressive Web Apps (PWA)
- Node.js Backend Projekte
- TypeScript & JavaScript Projekte
- GitHub Pages Deployments

✅ **Flexible Standards:**
- Keine Framework-spezifischen Vorgaben
- Best Practices für verschiedene Projekttypen
- Modular: Nimm, was du brauchst

✅ **Living Document:**
- Templates sind zu aktualisieren, wenn Best Practices sich ändern
- Feedback willkommen über Issues/PRs

---

## Labels

Siehe [LABELS.md](LABELS.md) für standardisiertes, einfaches Label-System:

**9 Labels in 3 Kategorien:**
- **Type:** `bug`, `feature`, `enhancement`, `docs`
- **Priority:** `priority: high`, `priority: low`
- **Status:** `blocked`, `ready-for-implementation`

**Automatisiertes Setup** mit Script:
```bash
./scripts/setup-labels.sh S540d/Eisenhauer
```

---

## Aktualisierungshistorie

### Version 2.2 (Labels)
- ✅ Standardisiertes Label-System (9 Labels)
- ✅ LABELS.md mit Dokumentation
- ✅ scripts/setup-labels.sh für Automatisierung
- ✅ Labels in allen 3 Projekten eingerichtet

### Version 2.1 (GitHub Integration)
- ✅ `.github/ISSUE_TEMPLATE/` mit 4 Template-Typen
  - bug.md - Bug Reports
  - feature.md - Feature Requests
  - documentation.md - Documentation Requests
  - question.md - Questions / Discussions
- ✅ `.github/PULL_REQUEST_TEMPLATE/` mit Standard PR Template
- ✅ `.github/README.md` - Dokumentation der GitHub Templates
- ✅ Hauptquellen-README aktualisiert

### Version 2.0 (Überarbeitet)
- ✅ technische_vorgaben.md komplett überarbeitet
- ✅ ux-vorgaben.md massiv erweitert
- ✅ design-system.md neu
- ✅ accessibility-guidelines.md neu
- ✅ testing-standards.md neu
- ✅ PUBLISHING_CHECKLIST.md aktuell

### Version 1.0 (Alte Version)
- Zu minimalistisch und projekt-spezifisch
- Jest statt Vitest
- Unvollständige Accessibility Richtlinien
- Fehlende Design System & GitHub Templates Dokumentation

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:

- How to set up the development environment
- Coding standards and conventions
- Pull request process
- Reporting bugs and suggesting features

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses

This project uses several open-source libraries and APIs:

- **React, Vite, Tailwind CSS** - MIT License
- **Quagga2** (Barcode Scanner) - MIT License
- **MusicBrainz API** - CC0 (Public Domain)
- **Spotify Web API** - Proprietary (Terms of Service apply)

See [LICENSE](LICENSE) for complete third-party attribution.

## Acknowledgments

- [MusicBrainz](https://musicbrainz.org/) for album metadata
- [Cover Art Archive](https://coverartarchive.org/) for album covers
- [Spotify](https://developer.spotify.com/) for the Web API
- All open-source contributors

---

**Made with ❤️ by [S540d](https://github.com/S540d)**

