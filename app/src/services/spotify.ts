import type { Album, SpotifyTokens } from '../types';

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || window.location.origin;
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
  // Generate authorization URL for OAuth flow
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'token',
      redirect_uri: SPOTIFY_REDIRECT_URI,
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
    } catch (error) {
      console.error('Error searching Spotify:', error);
      throw error;
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
    } catch (error) {
      console.error('Error creating playlist:', error);
      throw error;
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
    } catch (error) {
      console.error('Error playing album:', error);
      throw error;
    }
  },

  // Get album details
  async getAlbumDetails(albumId: string): Promise<any> {
    try {
      const response = await fetch(`${SPOTIFY_API_BASE}/albums/${albumId}`, {
        headers: this.getAuthHeader(),
      });

      if (!response.ok) {
        throw new Error('Failed to get album details');
      }

      return response.json();
    } catch (error) {
      console.error('Error getting album details:', error);
      throw error;
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
    } catch (error) {
      console.error('Error enriching album with Spotify data:', error);
      return album;
    }
  },
};
