import React from 'react';
import type { Album } from '../../types';

interface AlbumCardProps {
  album: Album;
  onPlay?: () => void;
  onDelete?: () => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album, onPlay, onDelete }) => {
  const statusColors = {
    pending: 'bg-gray-500',
    found: 'bg-green-500',
    not_found: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  const statusLabels = {
    pending: 'Pending',
    found: 'Found',
    not_found: 'Not Found',
    error: 'Error',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        {/* Album Cover */}
        <div className="flex-shrink-0">
          {album.coverUrl ? (
            <img
              src={album.coverUrl}
              alt={`${album.title} cover`}
              className="w-24 h-24 rounded object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </div>
          )}
        </div>

        {/* Album Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
            {album.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 truncate">{album.artist}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Barcode: {album.barcode}
          </p>
          
          {/* Status Badge */}
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`${statusColors[album.status]} text-white text-xs px-2 py-1 rounded`}
            >
              {statusLabels[album.status]}
            </span>
            {album.spotifyUri && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900 dark:text-green-200">
                On Spotify
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          {onPlay && album.spotifyUri && (
            <button
              onClick={onPlay}
              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
              aria-label="Play album"
              title="Play on Spotify"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              aria-label="Delete album"
              title="Delete"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
