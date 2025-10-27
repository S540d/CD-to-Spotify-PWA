import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Album } from '../types';

interface CD2SpotifyDB extends DBSchema {
  albums: {
    key: string;
    value: Album;
    indexes: { 'by-barcode': string; 'by-date': number };
  };
}

const DB_NAME = 'cd2spotify-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<CD2SpotifyDB>> | null = null;

const getDB = async (): Promise<IDBPDatabase<CD2SpotifyDB>> => {
  if (!dbPromise) {
    dbPromise = openDB<CD2SpotifyDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create albums store
        const albumStore = db.createObjectStore('albums', {
          keyPath: 'id',
        });
        albumStore.createIndex('by-barcode', 'barcode');
        albumStore.createIndex('by-date', 'scanDate');
      },
    });
  }
  return dbPromise;
};

export const albumDb = {
  // Add a new album
  async addAlbum(album: Album): Promise<void> {
    const db = await getDB();
    await db.put('albums', album);
  },

  // Get album by ID
  async getAlbum(id: string): Promise<Album | undefined> {
    const db = await getDB();
    return db.get('albums', id);
  },

  // Get album by barcode
  async getAlbumByBarcode(barcode: string): Promise<Album | undefined> {
    const db = await getDB();
    const albums = await db.getAllFromIndex('albums', 'by-barcode', barcode);
    return albums[0];
  },

  // Get all albums sorted by date
  async getAllAlbums(): Promise<Album[]> {
    const db = await getDB();
    const albums = await db.getAllFromIndex('albums', 'by-date');
    return albums.reverse(); // Most recent first
  },

  // Update an existing album
  async updateAlbum(album: Album): Promise<void> {
    const db = await getDB();
    await db.put('albums', album);
  },

  // Delete an album
  async deleteAlbum(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('albums', id);
  },

  // Check if barcode already exists (duplicate detection)
  async isDuplicate(barcode: string): Promise<boolean> {
    const album = await this.getAlbumByBarcode(barcode);
    return !!album;
  },

  // Clear all albums (for testing/reset)
  async clearAllAlbums(): Promise<void> {
    const db = await getDB();
    await db.clear('albums');
  },

  // Get count of albums
  async getCount(): Promise<number> {
    const db = await getDB();
    return db.count('albums');
  },
};
