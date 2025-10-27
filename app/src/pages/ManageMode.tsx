import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import type { Album, Toast as ToastType } from '../types';
import { albumDb } from '../services/db';
import { spotifyApi } from '../services/spotify';
import { AlbumCard } from '../components/ui/AlbumCard';
import { ToastContainer } from '../components/ui/Toast';

export const ManageMode: React.FC = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (type: ToastType['type'], message: string) => {
    const toast: ToastType = {
      id: crypto.randomUUID(),
      type,
      message,
      duration: 3000,
    };
    setToasts((prev) => [...prev, toast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loadAlbums = useCallback(async () => {
    try {
      setIsLoading(true);
      const allAlbums = await albumDb.getAllAlbums();
      setAlbums(allAlbums);
    } catch (_error) {
      console.error('Error loading albums:', _error);
      addToast('error', 'Failed to load albums');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlbums();
  }, [loadAlbums]);

  const handlePlay = async (album: Album) => {
    if (!album.spotifyUri) {
      addToast('error', 'Album not available on Spotify');
      return;
    }

    try {
      await spotifyApi.playAlbum(album.spotifyUri);
      addToast('success', `Playing: ${album.title}`);
    } catch (_error) {
      addToast('error', 'Could not play album. Make sure Spotify is active.');
    }
  };

  const handleDelete = async (album: Album) => {
    if (!confirm(`Delete "${album.title}" from your collection?`)) {
      return;
    }

    try {
      await albumDb.deleteAlbum(album.id);
      setAlbums((prev) => prev.filter((a) => a.id !== album.id));
      addToast('success', 'Album deleted');
    } catch (_error) {
      console.error('Error deleting album:', _error);
      addToast('error', 'Failed to delete album');
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Delete ALL albums from your collection? This cannot be undone.')) {
      return;
    }

    try {
      await albumDb.clearAllAlbums();
      setAlbums([]);
      addToast('success', 'All albums deleted');
    } catch (_error) {
      console.error('Error clearing albums:', _error);
      addToast('error', 'Failed to clear albums');
    }
  };

  const handleCreatePlaylist = async () => {
    const albumsWithSpotify = albums.filter((a) => a.spotifyUri);

    if (albumsWithSpotify.length === 0) {
      addToast('error', 'No albums found on Spotify');
      return;
    }

    try {
      const playlistUrl = await spotifyApi.createPlaylist(
        `My CD Collection ${new Date().toLocaleDateString()}`,
        albumsWithSpotify.map((a) => a.spotifyUri!)
      );

      addToast('success', 'Playlist created successfully!');
      window.open(playlistUrl, '_blank');
    } catch (_error) {
      console.error('Playlist creation error:', _error);
      addToast('error', 'Failed to create playlist');
    }
  };

  const albumsWithSpotify = albums.filter((a) => a.spotifyUri).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Collection
          </h1>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>

        {/* Stats and Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {albums.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Albums
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {albumsWithSpotify}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                On Spotify
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {albums.length - albumsWithSpotify}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Not Found
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant="primary"
              onClick={handleCreatePlaylist}
              disabled={albumsWithSpotify === 0}
            >
              Create Playlist ({albumsWithSpotify})
            </Button>
            <Button variant="danger" onClick={handleClearAll} disabled={albums.length === 0}>
              Clear All
            </Button>
          </div>
        </div>

        {/* Albums List */}
        {isLoading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading albums...</p>
          </div>
        ) : albums.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No albums in your collection
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start scanning CDs in Import Mode to build your collection
            </p>
            <Button variant="primary" onClick={() => navigate('/import')}>
              Go to Import Mode
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                onPlay={() => handlePlay(album)}
                onDelete={() => handleDelete(album)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
