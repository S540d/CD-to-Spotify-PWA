import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { spotifyAuth } from '../services/spotify';
import { albumDb } from '../services/db';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [albumCount, setAlbumCount] = useState(0);

  useEffect(() => {
    // Check if user is authenticated
    setIsAuthenticated(spotifyAuth.isAuthenticated());

    // Check for auth callback
    const tokens = spotifyAuth.parseTokensFromHash();
    if (tokens) {
      spotifyAuth.saveTokens(tokens);
      setIsAuthenticated(true);
      // Clear hash from URL
      window.location.hash = '';
    }

    // Load album count
    albumDb.getCount().then(setAlbumCount);
  }, []);

  const handleLogin = () => {
    const authUrl = spotifyAuth.getAuthUrl();
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    spotifyAuth.clearTokens();
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 shadow-lg">
            <svg
              className="w-16 h-16 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            CD to Spotify
          </h1>
          <p className="text-xl text-green-100">
            Scan your CDs, create playlists
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          {/* Spotify Auth Status */}
          <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  Spotify Connection
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {isAuthenticated ? (
                    <span className="text-green-600">Connected ✓</span>
                  ) : (
                    <span className="text-gray-500">Not connected</span>
                  )}
                </div>
              </div>
              {isAuthenticated ? (
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Disconnect
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={handleLogin}>
                  Connect Spotify
                </Button>
              )}
            </div>
          </div>

          {/* Collection Stats */}
          {albumCount > 0 && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {albumCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Albums in your collection
                </div>
              </div>
            </div>
          )}

          {/* Mode Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Choose a Mode
            </h2>

            {/* Import Mode */}
            <button
              onClick={() => navigate('/import')}
              className="w-full p-6 text-left border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Import Mode
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Scan multiple CDs to build your digital collection and create playlists
                  </p>
                </div>
              </div>
            </button>

            {/* Play Mode */}
            <button
              onClick={() => navigate('/play')}
              disabled={!isAuthenticated}
              className="w-full p-6 text-left border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 hover:shadow-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Play Mode
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Scan a CD and instantly play it on Spotify
                    {!isAuthenticated && (
                      <span className="block mt-1 text-orange-600 dark:text-orange-400">
                        (Requires Spotify connection)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </button>

            {/* Manage Mode */}
            <button
              onClick={() => navigate('/manage')}
              className="w-full p-6 text-left border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Manage Collection
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View, organize, and manage your scanned CD collection
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-green-100 text-sm">
          <p>A Progressive Web App by S540d</p>
          <p className="mt-2">
            <a
              href="https://github.com/S540d/CD-to-Spotify-PWA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
