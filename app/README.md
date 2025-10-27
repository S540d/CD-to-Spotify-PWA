# CD Collection to Playlist

**"Archiviere deine CD-Sammlung digital - Scanne, speichere, höre überall"**

A Progressive Web App that helps you digitally archive your physical CD collection. Scan barcodes, store albums locally, and export to Spotify - so you can move those CDs to the basement while keeping full access to your music.

> **Note**: This project is currently in the planning phase. Implementation will begin soon following the roadmap defined in [../ROADMAP.md](../ROADMAP.md).

## Planned Features

### Phase 1: Scan2Play (Quick Win)
- 📷 **Instant Playback**: Scan CD barcode → Play immediately on Spotify
- 🚀 **Fast**: < 3 seconds from scan to play
- 📱 **Mobile-First**: Optimized for smartphone use

### Phase 2: Digital Archive (Core Feature)
- 📦 **Batch Scanning**: Scan 100+ CDs in one session
- 💾 **Local Storage**: Your collection stored in IndexedDB (offline-capable)
- 🖼️ **Album Covers**: Automatic cover art retrieval
- 🔍 **Search & Filter**: Find albums by artist, year, genre

### Phase 3: Export & Management
- 📄 **CSV Export**: Editable format for manual corrections
- 🎵 **m3u Export**: Import into Spotify and other tools
- 🔄 **CSV → m3u Conversion**: Edit in Excel, convert to m3u
- 📊 **Statistics**: Collection insights (top artists, genres, decades)

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Quagga2** for barcode scanning
- **IndexedDB** (via idb) for local data storage
- **MusicBrainz API** for album metadata
- **Spotify Web API** for playlist creation and playback

## 📚 Project Documentation

For comprehensive project information, see the root directory:
- **[../PROJECT_VISION.md](../PROJECT_VISION.md)**: Detailed vision, goals, and user stories
- **[../ROADMAP.md](../ROADMAP.md)**: Development phases and timeline
- **[../README.md](../README.md)**: Project overview

## Getting Started

> **Note**: Setup instructions below are for future development. The app is not yet functional.

### Prerequisites

- Node.js 18+ and npm
- A Spotify Developer account

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Spotify API**:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Add `http://localhost:5173` to the Redirect URIs
   - Copy your Client ID

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Spotify credentials:
   ```
   VITE_SPOTIFY_CLIENT_ID=your_client_id_here
   VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder, ready to deploy to any static hosting service.

## Deployment

### GitHub Pages

1. Update `vite.config.ts` to set the base path:
   ```ts
   export default defineConfig({
     base: '/CD-to-Spotify-PWA/',
     // ... rest of config
   });
   ```

2. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

### Other Platforms

The app can be deployed to:
- Netlify
- Vercel
- Firebase Hosting
- Any static hosting service

Don't forget to update the Spotify Redirect URI in your Spotify app settings!

## Usage

### Import Mode

1. Click "Import Mode" on the home page
2. Click "Start Scanning" to activate the camera
3. Scan CD barcodes one by one
4. The app will automatically fetch album information from MusicBrainz
5. Once done, click "Create Playlist" to generate a Spotify playlist with all scanned albums

### Play Mode

1. Connect your Spotify account
2. Click "Play Mode" on the home page
3. Scan a CD barcode
4. The album will automatically start playing on your active Spotify device

### Manage Collection

1. Click "Manage Collection" to view all scanned albums
2. Play individual albums
3. Delete albums from your collection
4. Create playlists from your entire collection

## Browser Support

- Chrome/Edge (recommended for best camera support)
- Firefox
- Safari (iOS 14+)

## Camera Permissions

The app requires camera access for barcode scanning. Make sure to allow camera permissions when prompted.

## Offline Support

- The app works offline for scanning and viewing your collection
- Internet connection is required for:
  - Fetching album information from MusicBrainz
  - Spotify authentication and playback
  - Creating playlists

## Known Limitations

- Some CD barcodes may not be found in the MusicBrainz database
- Spotify playback requires an active Spotify Premium account with an active device
- Camera quality affects barcode scanning accuracy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [MusicBrainz](https://musicbrainz.org/) for album metadata
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Quagga2](https://github.com/ericblade/quagga2) for barcode scanning
- [Cover Art Archive](https://coverartarchive.org/) for album covers

