import type { Album, Track } from '../types';

const MUSICBRAINZ_API = 'https://musicbrainz.org/ws/2';
const USER_AGENT = 'CD2Spotify/1.0.0 (https://github.com/S540d/CD-to-Spotify-PWA)';

// Rate limiting: MusicBrainz allows 1 request per second
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second

const rateLimit = async (): Promise<void> => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastRequestTime = Date.now();
};

interface MusicBrainzRelease {
  id: string;
  title: string;
  'artist-credit'?: Array<{
    name: string;
  }>;
  media?: Array<{
    tracks?: Array<{
      id: string;
      title: string;
      length?: number;
      position: number;
    }>;
  }>;
}

export const musicBrainzApi = {
  // Look up album by barcode
  async lookupByBarcode(barcode: string): Promise<Album | null> {
    await rateLimit();

    try {
      const response = await fetch(
        `${MUSICBRAINZ_API}/release?query=barcode:${barcode}&fmt=json`,
        {
          headers: {
            'User-Agent': USER_AGENT,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`MusicBrainz API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.releases || data.releases.length === 0) {
        return null;
      }

      // Get the first (most relevant) release
      const release: MusicBrainzRelease = data.releases[0];

      // Fetch detailed information including tracks
      const detailedRelease = await this.getRelease(release.id);

      const artist = release['artist-credit']?.[0]?.name || 'Unknown Artist';
      const title = release.title || 'Unknown Album';

      const album: Album = {
        id: crypto.randomUUID(),
        barcode,
        artist,
        title,
        scanDate: Date.now(),
        status: 'found',
        tracks: detailedRelease?.tracks,
      };

      // Try to get cover art
      try {
        const coverUrl = await this.getCoverArt(release.id);
        if (coverUrl) {
          album.coverUrl = coverUrl;
        }
      } catch (error) {
        console.warn('Could not fetch cover art:', error);
      }

      return album;
    } catch (error) {
      console.error('MusicBrainz lookup error:', error);
      throw error;
    }
  },

  // Get detailed release information
  async getRelease(releaseId: string): Promise<{ tracks: Track[] } | null> {
    await rateLimit();

    try {
      const response = await fetch(
        `${MUSICBRAINZ_API}/release/${releaseId}?inc=recordings&fmt=json`,
        {
          headers: {
            'User-Agent': USER_AGENT,
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      const tracks: Track[] = [];

      if (data.media && data.media.length > 0) {
        data.media[0].tracks?.forEach((track: any) => {
          tracks.push({
            id: track.id,
            name: track.title,
            duration: track.length || 0,
            trackNumber: track.position,
          });
        });
      }

      return { tracks };
    } catch (error) {
      console.error('Error fetching release details:', error);
      return null;
    }
  },

  // Get cover art from Cover Art Archive
  async getCoverArt(releaseId: string): Promise<string | null> {
    try {
      const response = await fetch(
        `https://coverartarchive.org/release/${releaseId}/front`,
        {
          redirect: 'follow',
        }
      );

      if (response.ok) {
        return response.url;
      }

      return null;
    } catch (error) {
      return null;
    }
  },
};
