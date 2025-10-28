import { useEffect, useState, useCallback } from 'react';
import { spotifyAuth } from '../services/spotify';

// Spotify Web Playback SDK Types
interface SpotifyPlayer {
  connect(): Promise<boolean>;
  disconnect(): void;
  getCurrentState(): Promise<WebPlaybackState | null>;
  setName(name: string): void;
  getVolume(): Promise<number>;
  setVolume(volume: number): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  togglePlay(): Promise<void>;
  seek(position_ms: number): Promise<void>;
  previousTrack(): Promise<void>;
  nextTrack(): Promise<void>;
  addListener(event: string, callback: (data: any) => void): void;
  removeListener(event: string, callback?: (data: any) => void): void;
}

interface WebPlaybackState {
  context: {
    uri: string;
    metadata: any;
  };
  disallows: {
    pausing: boolean;
    skipping_prev: boolean;
    skipping_next: boolean;
  };
  paused: boolean;
  position: number;
  duration: number;
  track_window: {
    current_track: WebPlaybackTrack;
    previous_tracks: WebPlaybackTrack[];
    next_tracks: WebPlaybackTrack[];
  };
}

interface WebPlaybackTrack {
  id: string;
  uri: string;
  name: string;
  album: {
    uri: string;
    name: string;
    images: Array<{ url: string }>;
  };
  artists: Array<{ uri: string; name: string }>;
}

interface WebPlaybackError {
  message: string;
}

// Extend window object for Spotify SDK
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume: number;
      }) => SpotifyPlayer;
    };
  }
}

export interface UseSpotifyPlayerResult {
  player: SpotifyPlayer | null;
  deviceId: string | null;
  isReady: boolean;
  isPaused: boolean;
  currentTrack: WebPlaybackTrack | null;
  position: number;
  duration: number;
  error: string | null;

  // Actions
  play: (uri?: string) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  togglePlay: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  seek: (position_ms: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
}

export function useSpotifyPlayer(): UseSpotifyPlayerResult {
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<WebPlaybackTrack | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Load Spotify Web Playback SDK
  useEffect(() => {
    // Check if SDK is already loaded
    if (window.Spotify) {
      initializePlayer();
      return;
    }

    // Load SDK script
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      initializePlayer();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializePlayer = useCallback(() => {
    const tokens = spotifyAuth.getTokens();
    if (!tokens) {
      setError('Not authenticated with Spotify');
      return;
    }

    const spotifyPlayer = new window.Spotify.Player({
      name: 'CD Collection Web Player',
      getOAuthToken: (cb) => {
        const tokens = spotifyAuth.getTokens();
        if (tokens) {
          cb(tokens.accessToken);
        }
      },
      volume: 0.5,
    });

    // Ready
    spotifyPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
      console.log('Spotify Player Ready with Device ID', device_id);
      setDeviceId(device_id);
      setIsReady(true);
      setError(null);
    });

    // Not Ready
    spotifyPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
      console.log('Device ID has gone offline', device_id);
      setIsReady(false);
    });

    // Errors
    spotifyPlayer.addListener('initialization_error', ({ message }: WebPlaybackError) => {
      console.error('Initialization Error:', message);
      setError(`Initialization Error: ${message}`);
    });

    spotifyPlayer.addListener('authentication_error', ({ message }: WebPlaybackError) => {
      console.error('Authentication Error:', message);
      setError(`Authentication Error: ${message}`);
    });

    spotifyPlayer.addListener('account_error', ({ message }: WebPlaybackError) => {
      console.error('Account Error:', message);
      setError(`Account Error: ${message}. Spotify Premium required.`);
    });

    spotifyPlayer.addListener('playback_error', ({ message }: WebPlaybackError) => {
      console.error('Playback Error:', message);
      setError(`Playback Error: ${message}`);
    });

    // Player State Changes
    spotifyPlayer.addListener('player_state_changed', (state: WebPlaybackState | null) => {
      if (!state) {
        setCurrentTrack(null);
        setIsPaused(true);
        return;
      }

      setCurrentTrack(state.track_window.current_track);
      setIsPaused(state.paused);
      setPosition(state.position);
      setDuration(state.duration);
    });

    // Connect to the player
    spotifyPlayer.connect();

    setPlayer(spotifyPlayer);

    // Cleanup
    return () => {
      spotifyPlayer.disconnect();
    };
  }, []);

  // Actions
  const play = useCallback(
    async (uri?: string) => {
      if (!deviceId) {
        setError('Player not ready');
        return;
      }

      const tokens = spotifyAuth.getTokens();
      if (!tokens) {
        setError('Not authenticated');
        return;
      }

      try {
        const body: any = {};
        if (uri) {
          if (uri.includes('album') || uri.includes('playlist')) {
            body.context_uri = uri;
          } else {
            body.uris = [uri];
          }
        }

        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        });

        setError(null);
      } catch (err) {
        console.error('Play error:', err);
        setError('Failed to play');
      }
    },
    [deviceId]
  );

  const pause = useCallback(async () => {
    if (!player) return;
    try {
      await player.pause();
      setError(null);
    } catch (err) {
      console.error('Pause error:', err);
      setError('Failed to pause');
    }
  }, [player]);

  const resume = useCallback(async () => {
    if (!player) return;
    try {
      await player.resume();
      setError(null);
    } catch (err) {
      console.error('Resume error:', err);
      setError('Failed to resume');
    }
  }, [player]);

  const togglePlay = useCallback(async () => {
    if (!player) return;
    try {
      await player.togglePlay();
      setError(null);
    } catch (err) {
      console.error('Toggle play error:', err);
      setError('Failed to toggle playback');
    }
  }, [player]);

  const nextTrack = useCallback(async () => {
    if (!player) return;
    try {
      await player.nextTrack();
      setError(null);
    } catch (err) {
      console.error('Next track error:', err);
      setError('Failed to skip to next track');
    }
  }, [player]);

  const previousTrack = useCallback(async () => {
    if (!player) return;
    try {
      await player.previousTrack();
      setError(null);
    } catch (err) {
      console.error('Previous track error:', err);
      setError('Failed to skip to previous track');
    }
  }, [player]);

  const seek = useCallback(
    async (position_ms: number) => {
      if (!player) return;
      try {
        await player.seek(position_ms);
        setError(null);
      } catch (err) {
        console.error('Seek error:', err);
        setError('Failed to seek');
      }
    },
    [player]
  );

  const setVolume = useCallback(
    async (volume: number) => {
      if (!player) return;
      try {
        await player.setVolume(volume);
        setError(null);
      } catch (err) {
        console.error('Set volume error:', err);
        setError('Failed to set volume');
      }
    },
    [player]
  );

  return {
    player,
    deviceId,
    isReady,
    isPaused,
    currentTrack,
    position,
    duration,
    error,
    play,
    pause,
    resume,
    togglePlay,
    nextTrack,
    previousTrack,
    seek,
    setVolume,
  };
}
