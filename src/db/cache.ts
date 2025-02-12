import { openDB } from 'idb';
import env from '../config/env';
import { Character } from '../types/CharacterList';

const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

async function getDB() {
  return openDB(env.DB_NAME, 1, {
    upgrade(db) {
      if (
        !db.objectStoreNames.contains(env.DB_STORE_NAME) ||
        !db.objectStoreNames.contains(env.DB_FAVORITES_STORE_NAME)
      ) {
        db.createObjectStore(env.DB_STORE_NAME);
        db.createObjectStore(env.DB_FAVORITES_STORE_NAME);
      }
    },
  });
}

export async function getCachedData(key: string): Promise<Character[] | null> {
  const db = await getDB();
  const cached = await db.get(env.DB_STORE_NAME, key);
  if (cached && Date.now() - cached.timestamp < CACHE_EXPIRATION) {
    return cached.data;
  }
  return null;
}

export async function setCachedData(
  key: string,
  data: Character[]
): Promise<void> {
  const db = await getDB();
  await db.put(env.DB_STORE_NAME, { data, timestamp: Date.now() }, key);
}

export async function addFavorite(id: number) {
  const db = await getDB();
  await db.put(env.DB_FAVORITES_STORE_NAME, id, id);
}

export async function removeFavorite(id: number) {
  const db = await getDB();
  await db.delete(env.DB_FAVORITES_STORE_NAME, id);
}

export async function getAllFavorites() {
  const db = await getDB();
  return (await db.getAll(env.DB_FAVORITES_STORE_NAME)) || [];
}
