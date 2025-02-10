import { CharacterListApiResponse } from '../types/CharacterList';
import { getCachedData, setCachedData } from '../db/cache';
import env from '../config/env';
import { CharacterDetailApiResponse } from '../types/CharacterDetail';

export const fetchCharacters = async (limit: number = 50) => {
  const cacheKey = 'characters';
  const cachedData = await getCachedData(cacheKey);
  if (cachedData) return cachedData;

  const response = await fetch(`${env.API_BASE_URL}/characters?limit=${limit}`);
  if (!response.ok) throw new Error('Error to fetch: fetchCharacters');
  const data: CharacterListApiResponse = await response.json();

  await setCachedData(cacheKey, data.items);
  return data.items;
};

export const fetchCharacterById = async (id: string) => {
  const cacheKey = `character-${id}`;
  const cachedData = await getCachedData(cacheKey);
  if (cachedData) return cachedData;

  const response = await fetch(`${env.API_BASE_URL}/characters/${id}`);
  if (!response.ok) throw new Error('Error to fetch: fetchCharacterById');
  const data: CharacterDetailApiResponse = await response.json();

  await setCachedData(cacheKey, data);
  return data;
};
