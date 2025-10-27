# CD to Spotify PWA

A Progressive Web App that allows you to scan CD barcodes and create Spotify playlists or play albums instantly.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)

## 🎵 Features

- 📷 **Barcode Scanning**: Scan CD barcodes using your device camera
- 🎵 **Spotify Integration**: Create playlists and play albums directly on Spotify
- 💾 **Local Storage**: Store your scanned CDs in IndexedDB for offline access
- 📱 **PWA Ready**: Install on mobile devices and work offline
- 🎯 **Three Modes**:
  - **Import Mode**: Batch scan multiple CDs to build your collection
  - **Play Mode**: Scan and instantly play a CD on Spotify
  - **Manage Mode**: View, organize, and manage your scanned albums

## 🚀 Quick Start

The application code is in the `app/` directory. See [app/README.md](app/README.md) for detailed setup instructions.

```bash
cd app
npm install
cp .env.example .env
# Edit .env with your Spotify credentials
npm run dev
```

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

## 🛠 Technology Stack

- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **Quagga2** for barcode scanning
- **IndexedDB** (via idb) for local data storage
- **MusicBrainz API** for album metadata
- **Spotify Web API** for playlist creation and playback
- **Service Worker** for PWA capabilities

## 📖 Documentation

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

