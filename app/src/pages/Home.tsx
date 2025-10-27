import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { spotifyAuth } from '../services/spotify';
import { albumDb } from '../services/db';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [albumCount, setAlbumCount] = useState(0);
  const [clientId, setClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState('');
  const [showClientIdInput, setShowClientIdInput] = useState(false);
  const [showRedirectUriInput, setShowRedirectUriInput] = useState(false);

  useEffect(() => {
    // Load saved Client ID
    const savedClientId = spotifyAuth.getClientId();
    setClientId(savedClientId);
    setShowClientIdInput(!savedClientId);

    // Load saved Redirect URI
    const savedRedirectUri = spotifyAuth.getRedirectUri();
    setRedirectUri(savedRedirectUri);

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

  const handleSaveClientId = () => {
    if (clientId.trim()) {
      spotifyAuth.setClientId(clientId.trim());
      setShowClientIdInput(false);
    }
  };

  const handleClearClientId = () => {
    spotifyAuth.clearClientId();
    setClientId('');
    setShowClientIdInput(true);
  };

  const handleSaveRedirectUri = () => {
    if (redirectUri.trim()) {
      spotifyAuth.setRedirectUri(redirectUri.trim());
      setShowRedirectUriInput(false);
    }
  };

  const handleClearRedirectUri = () => {
    spotifyAuth.clearRedirectUri();
    const autoRedirectUri = spotifyAuth.getRedirectUri();
    setRedirectUri(autoRedirectUri);
    setShowRedirectUriInput(false);
  };

  const handleLogin = () => {
    try {
      const authUrl = spotifyAuth.getAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to generate auth URL');
      setShowClientIdInput(true);
    }
  };

  const handleLogout = () => {
    if (confirm('Möchten Sie sich wirklich von Spotify abmelden?')) {
      spotifyAuth.clearTokens();
      setIsAuthenticated(false);
    }
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
          {/* Spotify Configuration */}
          <div className="mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="font-semibold text-gray-900 dark:text-white mb-4">
              Spotify Konfiguration
            </div>

            {/* Client ID */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Client ID
              </div>
              {showClientIdInput ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      placeholder="7275bd5076504740b45d57398f1ae2d8"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSaveClientId}
                      disabled={!clientId.trim()}
                    >
                      Save
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Get your Client ID from{' '}
                    <a
                      href="https://developer.spotify.com/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Spotify Developer Dashboard
                    </a>
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-white dark:bg-gray-700 px-3 py-2 rounded-md">
                  <div className="flex-1 overflow-hidden">
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {clientId}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClearClientId}
                  >
                    Ändern
                  </Button>
                </div>
              )}
            </div>

            {/* Redirect URI */}
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Redirect URI
              </div>
              {showRedirectUriInput ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={redirectUri}
                      onChange={(e) => setRedirectUri(e.target.value)}
                      placeholder={redirectUri || 'https://s540d.github.io/CD-to-Spotify-PWA'}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSaveRedirectUri}
                      disabled={!redirectUri.trim()}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowRedirectUriInput(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Muss mit der Redirect URI in Ihrem Spotify App übereinstimmen
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-white dark:bg-gray-700 px-3 py-2 rounded-md">
                  <div className="flex-1 overflow-hidden">
                    <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {redirectUri}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowRedirectUriInput(true)}
                    >
                      Ändern
                    </Button>
                    {localStorage.getItem('spotify_redirect_uri') && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleClearRedirectUri}
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs text-yellow-800 dark:text-yellow-200">
              ⚠️ Wichtig: Diese Redirect URI muss in Ihrem Spotify App unter "Redirect URIs" eingetragen sein.
            </div>
          </div>

          {/* Spotify Auth Status */}
          <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className="font-semibold text-gray-900 dark:text-white mb-3">
              Spotify Verbindung
            </div>
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Mit Spotify verbunden</span>
                </div>
                <Button
                  variant="secondary"
                  onClick={handleLogout}
                  className="w-full"
                >
                  Von Spotify abmelden
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Verbinden Sie sich mit Spotify, um Ihre CDs abzuspielen und Playlists zu erstellen.
                </div>
                <Button
                  variant="primary"
                  onClick={handleLogin}
                  disabled={!clientId}
                  className="w-full"
                >
                  Mit Spotify verbinden
                </Button>
                {!clientId && (
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    Bitte konfigurieren Sie zuerst die Client ID
                  </p>
                )}
              </div>
            )}
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
