import React, { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useSpotifyPlayer } from '../hooks/useSpotifyPlayer';
import type { UseSpotifyPlayerResult } from '../hooks/useSpotifyPlayer';
import { spotifyAuth } from '../services/spotify';

interface PlayerContextValue extends UseSpotifyPlayerResult {
  isAuthenticated: boolean;
  isPremium: boolean | null; // null = checking, true = premium, false = free
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const playerHook = useSpotifyPlayer();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isPremium, setIsPremium] = React.useState<boolean | null>(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = spotifyAuth.isAuthenticated();
      setIsAuthenticated(authenticated);

      // If authenticated, check premium status
      if (authenticated) {
        checkPremiumStatus();
      } else {
        setIsPremium(null);
      }
    };

    checkAuth();

    // Listen for auth changes (after login)
    const interval = setInterval(checkAuth, 5000);
    return () => clearInterval(interval);
  }, []);

  // Check if user has Spotify Premium
  const checkPremiumStatus = async () => {
    const tokens = spotifyAuth.getTokens();
    if (!tokens) {
      setIsPremium(null);
      return;
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Check if user has premium subscription
        const hasPremium = data.product === 'premium';
        setIsPremium(hasPremium);
      } else {
        setIsPremium(null);
      }
    } catch (error) {
      console.error('Error checking premium status:', error);
      setIsPremium(null);
    }
  };

  const value: PlayerContextValue = {
    ...playerHook,
    isAuthenticated,
    isPremium,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer(): PlayerContextValue {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
}
