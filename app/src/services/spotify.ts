import type { Album, SpotifyTokens } from '../types';

// Get Client ID from localStorage or env variable
const getClientId = (): string => {
  const storedClientId = localStorage.getItem('spotify_client_id');
  return storedClientId || import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
};

// Get Redirect URI - handles GitHub Pages base path correctly
const getRedirectUri = (): string => {
  const storedRedirectUri = localStorage.getItem('spotify_redirect_uri');
  if (storedRedirectUri) {
    return storedRedirectUri;
  }

  if (import.meta.env.VITE_SPOTIFY_REDIRECT_URI) {
    return import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  }

  // Auto-detect correct redirect URI
  const origin = window.location.origin;
  const pathname = window.location.pathname;

  // For GitHub Pages, include the base path
  if (pathname.startsWith('/CD-to-Spotify-PWA')) {
    return `${origin}/CD-to-Spotify-PWA`;
  }

  return origin;
};

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

// Scopes required for the app
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-modify-playback-state',
  'user-read-playback-state',
].join(' ');

export const spotifyAuth = {
  // Save Client ID to localStorage
  setClientId(clientId: string): void {
    localStorage.setItem('spotify_client_id', clientId);
  },

  // Get Client ID
  getClientId(): string {
    return getClientId();
  },

  // Clear Client ID
  clearClientId(): void {
    localStorage.removeItem('spotify_client_id');
  },

  // Save Redirect URI to localStorage
  setRedirectUri(redirectUri: string): void {
    localStorage.setItem('spotify_redirect_uri', redirectUri);
  },

  // Get Redirect URI
  getRedirectUri(): string {
    return getRedirectUri();
  },

  // Clear Redirect URI
  clearRedirectUri(): void {
    localStorage.removeItem('spotify_redirect_uri');
  },

  // Generate authorization URL for OAuth flow
  getAuthUrl(): string {
    const clientId = getClientId();
    if (!clientId) {
      throw new Error('Spotify Client ID is not configured. Please enter your Client ID.');
    }

    const redirectUri = getRedirectUri();

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'token',
      redirect_uri: redirectUri,
      scope: SCOPES,
      show_dialog: 'true',
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  },

  // Parse tokens from URL hash (after redirect)
  parseTokensFromHash(): SpotifyTokens | null {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');

    if (!accessToken || !expiresIn) {
      return null;
    }

    const expiresAt = Date.now() + parseInt(expiresIn) * 1000;

    return {
      accessToken,
      expiresAt,
    };
  },

  // Save tokens to localStorage
  saveTokens(tokens: SpotifyTokens): void {
    localStorage.setItem('spotify_tokens', JSON.stringify(tokens));
  },

  // Get tokens from localStorage
  getTokens(): SpotifyTokens | null {
    const tokensStr = localStorage.getItem('spotify_tokens');
    if (!tokensStr) return null;

    try {
      const tokens = JSON.parse(tokensStr);
      
      // Check if token is expired
      if (tokens.expiresAt <= Date.now()) {
        this.clearTokens();
        return null;
      }

      return tokens;
    } catch {
      return null;
    }
  },

  // Clear tokens
  clearTokens(): void {
    localStorage.removeItem('spotify_tokens');
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const tokens = this.getTokens();
    return tokens !== null;
  },
};

export const spotifyApi = {
  // Get authorization header
  getAuthHeader(): { Authorization: string } {
    const tokens = spotifyAuth.getTokens();
    if (!tokens) {
      throw new Error('Not authenticated');
    }

    return {
      Authorization: `Bearer ${tokens.accessToken}`,
    };
  },

  // Search for album on Spotify
  async searchAlbum(artist: string, title: string): Promise<string | null> {
    try {
      const query = encodeURIComponent(`artist:${artist} album:${title}`);
      const response = await fetch(
        `${SPOTIFY_API_BASE}/search?q=${query}&type=album&limit=1`,
        {
          headers: this.getAuthHeader(),
        }
      );

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.albums?.items && data.albums.items.length > 0) {
        return data.albums.items[0].uri;
      }

      return null;
    } catch (_error) {
      console.error('Error searching Spotify:', _error);
      throw _error;
    }
  },

  // Create a playlist
  async createPlaylist(name: string, _albumUris: string[]): Promise<string> {
    try {
      // Get user ID
      const userResponse = await fetch(`${SPOTIFY_API_BASE}/me`, {
        headers: this.getAuthHeader(),
      });

      if (!userResponse.ok) {
        throw new Error('Failed to get user info');
      }

      const userData = await userResponse.json();
      const userId = userData.id;

      // Create playlist
      const createResponse = await fetch(
        `${SPOTIFY_API_BASE}/users/${userId}/playlists`,
        {
          method: 'POST',
          headers: {
            ...this.getAuthHeader(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            description: 'Created by CD to Spotify PWA',
            public: true,
          }),
        }
      );

      if (!createResponse.ok) {
        throw new Error('Failed to create playlist');
      }

      const playlist = await createResponse.json();

      // Add tracks to playlist
      // Note: We need to convert album URIs to track URIs
      // For now, we'll just return the playlist ID
      // In a full implementation, we'd fetch all tracks from albums and add them

      return playlist.external_urls.spotify;
    } catch (_error) {
      console.error('Error creating playlist:', _error);
      throw _error;
    }
  },

  // Play an album
  async playAlbum(albumUri: string): Promise<void> {
    try {
      const response = await fetch(`${SPOTIFY_API_BASE}/me/player/play`, {
        method: 'PUT',
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context_uri: albumUri,
        }),
      });

      if (!response.ok && response.status !== 204) {
        throw new Error('Failed to play album');
      }
    } catch (_error) {
      console.error('Error playing album:', _error);
      throw _error;
    }
  },

  // Get album details
  async getAlbumDetails(albumId: string): Promise<unknown> {
    try {
      const response = await fetch(`${SPOTIFY_API_BASE}/albums/${albumId}`, {
        headers: this.getAuthHeader(),
      });

      if (!response.ok) {
        throw new Error('Failed to get album details');
      }

      return response.json();
    } catch (_error) {
      console.error('Error getting album details:', _error);
      throw _error;
    }
  },

  // Update album with Spotify information
  async enrichAlbum(album: Album): Promise<Album> {
    try {
      const spotifyUri = await this.searchAlbum(album.artist, album.title);

      if (spotifyUri) {
        return {
          ...album,
          spotifyUri,
          spotifyAlbumId: spotifyUri.split(':')[2],
        };
      }

      return album;
    } catch (_error) {
      console.error('Error enriching album with Spotify data:', _error);
      return album;
    }
  },
};
