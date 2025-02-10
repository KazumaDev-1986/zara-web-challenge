/* eslint-disable @typescript-eslint/no-explicit-any */
import { openDB } from 'idb';
import env from '../config/env';

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

async function getCachedData(key: string) {
  const db = await getDB();
  const cached = await db.get(env.DB_STORE_NAME, key);
  if (cached && Date.now() - cached.timestamp < CACHE_EXPIRATION) {
    return cached.data;
  }
  return null;
}

async function setCachedData(key: string, data: any) {
  const db = await getDB();
  await db.put(env.DB_STORE_NAME, { data, timestamp: Date.now() }, key);
}

export async function addFavorite(character: any) {
  const db = await getDB();
  await db.put(env.DB_FAVORITES_STORE_NAME, character, character.id);
}

export async function removeFavorite(id: string) {
  const db = await getDB();
  await db.delete(env.DB_FAVORITES_STORE_NAME, id);
}

export async function getAllFavorites() {
  const db = await getDB();
  return (await db.getAll(env.DB_FAVORITES_STORE_NAME)) || [];
}

export { getCachedData, setCachedData };
