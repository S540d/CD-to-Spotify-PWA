// Album information structure
export interface Album {
  id: string;
  barcode: string;
  artist: string;
  title: string;
  coverUrl?: string;
  spotifyAlbumId?: string;
  spotifyUri?: string;
  scanDate: number;
  status: 'pending' | 'found' | 'not_found' | 'error';
  tracks?: Track[];
}

// Track information
export interface Track {
  id: string;
  name: string;
  duration: number;
  trackNumber: number;
}

// Scan result from barcode scanner
export interface ScanResult {
  barcode: string;
  format: string;
  timestamp: number;
}

// Spotify authentication tokens
export interface SpotifyTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

// App mode types
export type AppMode = 'import' | 'play' | 'manage';

// Toast notification types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}
