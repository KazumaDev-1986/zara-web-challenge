import { Character, CharacterListApiResponse } from '../types/CharacterList';
import { getCachedData, setCachedData } from '../db/cache';
import env from '../config/env';
// import { CharacterDetailApiResponse } from '../types/CharacterDetail';

export const fetchCharacters = async (
  limit: number = 50
): Promise<Character[] | null> => {
  const cacheKey = 'characters';
  const cachedData = await getCachedData(cacheKey);
  if (cachedData) return cachedData;

  const response = await fetch(`${env.API_BASE_URL}/characters?limit=${limit}`);
  if (!response.ok) throw new Error('Error to fetch: fetchCharacters');
  const data: CharacterListApiResponse = await response.json();

  await setCachedData(cacheKey, data.items);
  return data.items;
};

// export const fetchCharacterById = async (id: string) => {
//   const cacheKey = `character-${id}`;
//   const cachedData = await getCachedData(cacheKey);
//   if (cachedData) return cachedData;

//   const response = await fetch(`${env.API_BASE_URL}/characters/${id}`);
//   if (!response.ok) throw new Error('Error to fetch: fetchCharacterById');
//   const data: CharacterDetailApiResponse = await response.json();

//   await setCachedData(cacheKey, data);
//   return data;
// };

export const fetchCharactersByName = async (name: string) => {
  const cacheKey = `characters-by-name-${name}`;
  const cachedData = await getCachedData(cacheKey);
  if (cachedData) {
    await __updateCacheData('characters', cachedData);
    return cachedData;
  }

  const response = await fetch(`${env.API_BASE_URL}/characters?name=${name}`);
  if (!response.ok) throw new Error('Error to fetch: fetchCharacters');
  const data = await response.json();

  await setCachedData(cacheKey, data);
  await __updateCacheData('characters', data);

  return data;
};

const __updateCacheData = async (
  cacheKey: string,
  data: Character[]
): Promise<void> => {
  const charactersData = await getCachedData(cacheKey);
  const ids = (charactersData ?? []).map((c) => c.id);
  const newCharacters = data.filter((character) => !ids.includes(character.id));
  const characters = [...(charactersData ?? []), ...newCharacters];
  await setCachedData(cacheKey, characters);
};
