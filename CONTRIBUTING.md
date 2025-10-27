# Contributing to CD Collection to Playlist

Thank you for considering contributing to this project! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

This project follows a simple code of conduct:

- **Be respectful** to all contributors
- **Be constructive** in feedback and discussions
- **Focus on the code**, not the person
- **Help others** learn and grow

---

## How Can I Contribute?

### 🐛 Report Bugs

Found a bug? Please [open an issue](../../issues/new?template=bug.md) with:

- **Clear title** describing the problem
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment** (browser, OS, device)

### 💡 Suggest Features

Have an idea? [Open a feature request](../../issues/new?template=feature.md) with:

- **Clear description** of the feature
- **Use case** - why is it needed?
- **Possible implementation** (optional)
- **Alternatives considered** (optional)

### 📝 Improve Documentation

Documentation improvements are always welcome:

- Fix typos or unclear explanations
- Add examples or clarifications
- Translate documentation (future)
- Improve code comments

### 🔧 Submit Code

See [Pull Request Process](#pull-request-process) below.

---

## Development Setup

### Prerequisites

- **Node.js 18+** and npm
- **Git**
- **Spotify Developer Account** (for testing Spotify features)

### Installation

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/CD-to-Spotify-PWA.git
   cd CD-to-Spotify-PWA
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/S540d/CD-to-Spotify-PWA.git
   ```

4. **Install dependencies**:
   ```bash
   cd app
   npm install
   ```

5. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env and add your Spotify Client ID
   ```

6. **Start development server**:
   ```bash
   npm run dev
   ```

### Available Scripts

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

---

## Coding Standards

### General Principles

- Follow the existing code style
- Write clear, self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Use TypeScript types (avoid `any`)

### Code Style

This project uses:

- **ESLint** for linting (run `npm run lint`)
- **TypeScript** strict mode
- **Prettier** formatting (auto-format on save recommended)

#### Key Conventions

```typescript
// ✅ Good: Descriptive names, typed
const handleAlbumScan = async (barcode: string): Promise<Album | null> => {
  // Implementation
};

// ❌ Bad: Unclear names, untyped
const handle = async (b: any) => {
  // Implementation
};
```

#### React Components

```typescript
// ✅ Good: Typed props, functional component
interface AlbumCardProps {
  album: Album;
  onPlay?: () => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album, onPlay }) => {
  // Implementation
};

// ❌ Bad: Untyped props
export const AlbumCard = ({ album, onPlay }) => {
  // Implementation
};
```

### File Organization

```
app/src/
├── components/       # Reusable UI components
│   ├── barcode/     # Feature-specific components
│   ├── ui/          # Generic UI components (Button, Toast)
│   └── layout/      # Layout components
├── pages/           # Page components (routes)
├── services/        # API services, utilities
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <subject>

# Examples
feat(scanner): add barcode format detection
fix(spotify): handle expired tokens
docs(readme): update installation steps
refactor(db): simplify album query logic
test(musicbrainz): add rate limiting tests
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Build, dependencies, etc.

---

## Pull Request Process

### Before Submitting

1. **Create a feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** following coding standards

3. **Test your changes**:
   ```bash
   npm run lint     # No errors
   npm run build    # Successful build
   # Manual testing in browser
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feat/your-feature-name
   ```

### Submitting PR

1. **Go to GitHub** and create a Pull Request

2. **Fill out the PR template** completely:
   - What does this PR do?
   - Why is this change needed?
   - How was it tested?
   - Screenshots (if UI changes)
   - Related issues

3. **Wait for review** - maintainers will review your PR

4. **Address feedback** - make requested changes

5. **Celebrate** - your PR gets merged! 🎉

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings or errors
- [ ] I have tested my changes manually
- [ ] Documentation has been updated (if needed)

---

## Reporting Bugs

### Before Reporting

1. **Check existing issues** - maybe it's already reported
2. **Try latest version** - bug might be fixed
3. **Test in incognito mode** - rule out extensions
4. **Clear browser cache** - ensure fresh state

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g. Chrome 120]
- OS: [e.g. Windows 11]
- Device: [e.g. Desktop, iPhone 14]

**Additional context**
Any other relevant information.
```

---

## Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Screenshots, mockups, or examples.
```

---

## Development Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features and development phases.

**Current Phase**: Phase 1 (Scan2Play) ✅ Complete
**Next Phase**: Phase 2 (Batch Scanning + Import Mode)

---

## Questions?

- 📖 Read the [README](README.md) and [PROJECT_VISION](PROJECT_VISION.md)
- 💬 Open a [Discussion](../../discussions) for questions
- 🐛 Found a bug? [Create an issue](../../issues)

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing! 🙏
