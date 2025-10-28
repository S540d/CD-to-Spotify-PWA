import type { Album } from '../types';

/**
 * Export Service
 * Handles CSV and m3u export functionality
 */

// CSV Export with UTF-8 BOM for Excel compatibility
export function exportToCSV(albums: Album[]): Blob {
  const headers = [
    'Artist',
    'Album',
    'Barcode',
    'Spotify_URI',
    'Spotify_Album_ID',
    'Cover_URL',
    'Date_Added',
    'Status',
  ];

  // Create CSV rows
  const rows = albums.map((album) => {
    const date = new Date(album.scanDate).toISOString().split('T')[0]; // YYYY-MM-DD
    return [
      escapeCSV(album.artist),
      escapeCSV(album.title),
      escapeCSV(album.barcode),
      escapeCSV(album.spotifyUri || ''),
      escapeCSV(album.spotifyAlbumId || ''),
      escapeCSV(album.coverUrl || ''),
      date,
      album.status,
    ].join(',');
  });

  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows].join('\n');

  // Add UTF-8 BOM for Excel compatibility
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

  return blob;
}

// Escape CSV field (handle commas, quotes, newlines)
function escapeCSV(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

// m3u Export (Extended M3U format)
export function exportToM3U(albums: Album[]): Blob {
  // Filter albums with Spotify URIs
  const albumsWithSpotify = albums.filter((a) => a.spotifyUri);

  if (albumsWithSpotify.length === 0) {
    throw new Error('No albums with Spotify URIs found');
  }

  // Create m3u content
  const lines = ['#EXTM3U'];

  albumsWithSpotify.forEach((album) => {
    // Extended info: duration, artist - title
    // Note: We don't have track durations, so we use -1 (unknown)
    lines.push(`#EXTINF:-1,${album.artist} - ${album.title}`);
    lines.push(album.spotifyUri!);
  });

  const m3uContent = lines.join('\n');
  const blob = new Blob([m3uContent], { type: 'audio/x-mpegurl;charset=utf-8;' });

  return blob;
}

// Download file to user's device
export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Generate filename with current date
export function generateFilename(prefix: string, extension: string): string {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return `${prefix}-${date}.${extension}`;
}

// Export albums as CSV with auto-generated filename
export function exportAlbumsAsCSV(albums: Album[]): void {
  const blob = exportToCSV(albums);
  const filename = generateFilename('cd-collection', 'csv');
  downloadFile(blob, filename);
}

// Export albums as m3u with auto-generated filename
export function exportAlbumsAsM3U(albums: Album[]): void {
  const blob = exportToM3U(albums);
  const filename = generateFilename('cd-playlist', 'm3u');
  downloadFile(blob, filename);
}

// Parse CSV file (for CSV → m3u conversion)
export async function parseCSV(file: File): Promise<Album[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const lines = content.split('\n').filter((line) => line.trim());

        if (lines.length === 0) {
          reject(new Error('CSV file is empty'));
          return;
        }

        // Parse header
        const headers = lines[0].split(',').map((h) => h.trim());

        // Find column indices
        const artistIdx = headers.findIndex((h) => h.toLowerCase().includes('artist'));
        const albumIdx = headers.findIndex((h) => h.toLowerCase().includes('album'));
        const barcodeIdx = headers.findIndex((h) => h.toLowerCase().includes('barcode'));
        const spotifyUriIdx = headers.findIndex((h) => h.toLowerCase().includes('spotify_uri'));
        const coverUrlIdx = headers.findIndex((h) => h.toLowerCase().includes('cover'));

        if (artistIdx === -1 || albumIdx === -1) {
          reject(new Error('CSV must contain Artist and Album columns'));
          return;
        }

        // Parse rows
        const albums: Album[] = [];
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (!line.trim()) continue;

          const columns = parseCSVLine(line);

          const album: Album = {
            id: crypto.randomUUID(),
            artist: columns[artistIdx] || 'Unknown Artist',
            title: columns[albumIdx] || 'Unknown Album',
            barcode: barcodeIdx !== -1 ? columns[barcodeIdx] || '' : '',
            spotifyUri: spotifyUriIdx !== -1 ? columns[spotifyUriIdx] || undefined : undefined,
            coverUrl: coverUrlIdx !== -1 ? columns[coverUrlIdx] || undefined : undefined,
            scanDate: Date.now(),
            status: 'found',
          };

          albums.push(album);
        }

        resolve(albums);
      } catch (error) {
        reject(new Error(`Failed to parse CSV: ${error}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read CSV file'));
    };

    reader.readAsText(file);
  });
}

// Parse CSV line (handles quoted fields with commas)
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  // Add last field
  result.push(current.trim());

  return result;
}

// Convert CSV to m3u
export async function convertCSVToM3U(file: File): Promise<Blob> {
  const albums = await parseCSV(file);
  return exportToM3U(albums);
}
