import React, { useState, useEffect } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';

export const MiniPlayer: React.FC = () => {
  const {
    isAuthenticated,
    isPremium,
    isReady,
    isPaused,
    currentTrack,
    position,
    duration,
    error,
    togglePlay,
    nextTrack,
    previousTrack,
    seek,
    setVolume,
  } = usePlayer();

  const [volume, setVolumeLocal] = useState(50);
  const [isSeeking, setIsSeeking] = useState(false);
  const [localPosition, setLocalPosition] = useState(0);

  // Update local position from player
  useEffect(() => {
    if (!isSeeking) {
      setLocalPosition(position);
    }
  }, [position, isSeeking]);

  // Auto-update position while playing
  useEffect(() => {
    if (!isPaused && !isSeeking) {
      const interval = setInterval(() => {
        setLocalPosition((prev) => Math.min(prev + 1000, duration));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused, isSeeking, duration]);

  // Don't show player if not authenticated or no premium
  if (!isAuthenticated) return null;

  // Show premium required message if user doesn't have premium
  if (isPremium === false) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 text-yellow-900 px-4 py-3 shadow-lg z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Spotify Premium benötigt</span>
          </div>
          <a
            href="https://www.spotify.com/premium/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline hover:no-underline"
          >
            Upgrade auf Premium
          </a>
        </div>
      </div>
    );
  }

  // Don't show player if not ready or no track
  if (!isReady || !currentTrack) return null;

  // Format time (ms to MM:SS)
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseInt(e.target.value);
    setLocalPosition(newPosition);
    setIsSeeking(true);
  };

  const handleSeekEnd = () => {
    seek(localPosition);
    setIsSeeking(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolumeLocal(newVolume);
    setVolume(newVolume / 100);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-lg z-50">
      <div className="max-w-4xl mx-auto px-4 py-3">
        {/* Error Message */}
        {error && (
          <div className="mb-2 text-xs text-red-400 text-center">{error}</div>
        )}

        <div className="flex items-center gap-4">
          {/* Album Cover */}
          <div className="flex-shrink-0">
            {currentTrack.album.images[0] && (
              <img
                src={currentTrack.album.images[0].url}
                alt={currentTrack.album.name}
                className="w-14 h-14 rounded shadow-md"
              />
            )}
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate text-sm">
              {currentTrack.name}
            </div>
            <div className="text-xs text-gray-400 truncate">
              {currentTrack.artists.map((a) => a.name).join(', ')}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={previousTrack}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              title="Previous"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
              </svg>
            </button>

            <button
              onClick={togglePlay}
              className="p-2 bg-white text-gray-900 hover:scale-105 rounded-full transition-transform"
              title={isPaused ? 'Play' : 'Pause'}
            >
              {isPaused ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <button
              onClick={nextTrack}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              title="Next"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
              </svg>
            </button>
          </div>

          {/* Volume Control (Desktop only) */}
          <div className="hidden md:flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-white"
            />
            <span className="text-xs text-gray-400 w-8">{volume}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-gray-400 w-12 text-right">
            {formatTime(localPosition)}
          </span>
          <input
            type="range"
            min="0"
            max={duration}
            value={localPosition}
            onChange={handleSeek}
            onMouseUp={handleSeekEnd}
            onTouchEnd={handleSeekEnd}
            className="flex-1 accent-green-500"
          />
          <span className="text-xs text-gray-400 w-12">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};
