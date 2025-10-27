import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarcodeScanner } from '../components/barcode/BarcodeScanner';
import { Button } from '../components/ui/Button';
import type { ScanResult, Album, Toast as ToastType } from '../types';
import { musicBrainzApi } from '../services/musicbrainz';
import { spotifyApi } from '../services/spotify';
import { albumDb } from '../services/db';
import { AlbumCard } from '../components/ui/AlbumCard';
import { ToastContainer } from '../components/ui/Toast';

export const ImportMode: React.FC = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedAlbums, setScannedAlbums] = useState<Album[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handleScan = useCallback(async (scanResult: ScanResult) => {
    setIsProcessing(true);

    try {
      // Check for duplicate
      const isDuplicate = await albumDb.isDuplicate(scanResult.barcode);
      if (isDuplicate) {
        addToast('warning', 'This CD has already been scanned');
        setIsProcessing(false);
        return;
      }

      // Look up album info from MusicBrainz
      const album = await musicBrainzApi.lookupByBarcode(scanResult.barcode);

      if (!album) {
        addToast('error', 'Album not found for this barcode');
        setIsProcessing(false);
        return;
      }

      // Enrich with Spotify data if authenticated
      let enrichedAlbum = album;
      if (spotifyApi) {
        try {
          enrichedAlbum = await spotifyApi.enrichAlbum(album);
        } catch (error) {
          console.warn('Could not enrich with Spotify data:', error);
        }
      }

      // Save to database
      await albumDb.addAlbum(enrichedAlbum);

      // Add to displayed list
      setScannedAlbums((prev) => [enrichedAlbum, ...prev]);

      addToast('success', `Added: ${enrichedAlbum.title}`);
    } catch (error) {
      console.error('Scan processing error:', error);
      addToast('error', 'Failed to process barcode');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleCreatePlaylist = async () => {
    if (scannedAlbums.length === 0) {
      addToast('warning', 'No albums to add to playlist');
      return;
    }

    const albumsWithSpotify = scannedAlbums.filter((a) => a.spotifyUri);

    if (albumsWithSpotify.length === 0) {
      addToast('error', 'No albums found on Spotify');
      return;
    }

    try {
      setIsProcessing(true);
      const playlistUrl = await spotifyApi.createPlaylist(
        `CD Import ${new Date().toLocaleDateString()}`,
        albumsWithSpotify.map((a) => a.spotifyUri!)
      );

      addToast('success', 'Playlist created successfully!');
      
      // Open playlist in new tab
      window.open(playlistUrl, '_blank');
    } catch (error) {
      console.error('Playlist creation error:', error);
      addToast('error', 'Failed to create playlist');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Import Mode
          </h1>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>

        {/* Scanner Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <Button
              variant={isScanning ? 'danger' : 'primary'}
              onClick={() => setIsScanning(!isScanning)}
              disabled={isProcessing}
            >
              {isScanning ? 'Stop Scanning' : 'Start Scanning'}
            </Button>
            <Button
              variant="primary"
              onClick={handleCreatePlaylist}
              disabled={scannedAlbums.length === 0 || isProcessing}
            >
              Create Playlist ({scannedAlbums.filter((a) => a.spotifyUri).length})
            </Button>
          </div>

          {isScanning && (
            <BarcodeScanner
              isActive={isScanning}
              onScan={handleScan}
              onError={(error) => addToast('error', error.message)}
            />
          )}
        </div>

        {/* Scanned Albums */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Scanned Albums ({scannedAlbums.length})
          </h2>

          {scannedAlbums.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No albums scanned yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start scanning CD barcodes to build your collection
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {scannedAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
