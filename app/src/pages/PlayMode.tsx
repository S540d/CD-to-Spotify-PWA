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
import { usePlayer } from '../contexts/PlayerContext';

export const PlayMode: React.FC = () => {
  const navigate = useNavigate();
  const { play } = usePlayer();
  const [isScanning, setIsScanning] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState<Album | undefined>(undefined);
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
    setIsScanning(false); // Stop scanning after detection

    try {
      // First check local database
      let album = await albumDb.getAlbumByBarcode(scanResult.barcode);

      // If not found locally, look up from MusicBrainz
      if (!album) {
        const fetchedAlbum = await musicBrainzApi.lookupByBarcode(scanResult.barcode);

        if (!fetchedAlbum) {
          addToast('error', 'Album not found for this barcode');
          setIsProcessing(false);
          return;
        }

        // Enrich with Spotify data
        album = await spotifyApi.enrichAlbum(fetchedAlbum);

        // Save to database for future quick access
        await albumDb.addAlbum(album);
      }

      setCurrentAlbum(album);

      // Auto-play if Spotify URI is available
      if (album.spotifyUri) {
        try {
          await play(album.spotifyUri);
          addToast('success', `Playing: ${album.title}`);
        } catch (_error) {
          addToast('error', 'Could not play album. Make sure you have Spotify Premium.');
        }
      } else {
        addToast('warning', 'Album not found on Spotify');
      }
    } catch (_error) {
      console.error('Scan processing error:', _error);
      addToast('error', 'Failed to process barcode');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handlePlayAgain = async () => {
    if (currentAlbum?.spotifyUri) {
      try {
        setIsProcessing(true);
        await play(currentAlbum.spotifyUri);
        addToast('success', 'Playing album');
      } catch (_error) {
        addToast('error', 'Could not play album. Make sure you have Spotify Premium.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Play Mode
          </h1>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>

        {/* Scanner Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <Button
              variant={isScanning ? 'danger' : 'primary'}
              onClick={() => setIsScanning(!isScanning)}
              disabled={isProcessing}
              className="w-full"
            >
              {isScanning ? 'Stop Scanning' : 'Scan CD to Play'}
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

        {/* Current Album */}
        {currentAlbum && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Now Playing
              </h2>
              <Button
                variant="primary"
                size="sm"
                onClick={handlePlayAgain}
                disabled={!currentAlbum.spotifyUri || isProcessing}
              >
                Play Again
              </Button>
            </div>
            <AlbumCard
              album={currentAlbum}
              onPlay={handlePlayAgain}
            />
          </div>
        )}

        {/* Empty State */}
        {!currentAlbum && !isScanning && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Ready to Play
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Scan a CD barcode to instantly play it on Spotify
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Make sure Spotify is active on one of your devices
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
