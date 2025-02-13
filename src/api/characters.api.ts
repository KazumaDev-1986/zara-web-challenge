import { Character, CharacterApiResponse } from '../types/characters';
import { getCachedData, setCachedData } from '../db/cache';
import env from '../config/env';

const CACHE_KEY = 'characters';
const CACHE_SEARCH_BY_NAME_KEY = (value: string) =>
  `search-characters-by-name-${value}`;

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

const __updateCacheDataByCharacter = async (
  cacheKey: string,
  charactersData: Character[],
  character: Character
): Promise<void> => {
  const characters = charactersData.filter((c) => c.id !== character.id);
  const data = [...characters, ...[character]];
  await setCachedData(cacheKey, data);
};

export const fetchCharacters = async (
  limit: number = 50
): Promise<Character[] | null> => {
  const cachedData = await getCachedData(CACHE_KEY);
  if (cachedData) return cachedData;

  const response = await fetch(`${env.API_BASE_URL}/characters?limit=${limit}`);
  if (!response.ok) throw new Error('Error to fetch: fetchCharacters');
  const data: CharacterApiResponse = await response.json();

  await setCachedData(CACHE_KEY, data.items);
  return data.items;
};

export const fetchCharacterById = async (
  id: string
): Promise<Character | null> => {
  const cachedData = await getCachedData(CACHE_KEY);
  if (cachedData) {
    const character = cachedData.find((c) => c.id.toString() === id);
    if (character && character.transformations) {
      return character;
    }
  }

  const response = await fetch(`${env.API_BASE_URL}/characters/${id}`);
  if (!response.ok) throw new Error('Error to fetch: fetchCharacterById');
  const data: Character = await response.json();
  await __updateCacheDataByCharacter(CACHE_KEY, cachedData ?? [], data);

  return data;
};

export const fetchCharactersByName = async (name: string) => {
  const cachedData = await getCachedData(CACHE_SEARCH_BY_NAME_KEY(name));
  if (cachedData) {
    await __updateCacheData(CACHE_KEY, cachedData);
    return cachedData;
  }

  const response = await fetch(`${env.API_BASE_URL}/characters?name=${name}`);
  if (!response.ok) throw new Error('Error to fetch: fetchCharacters');
  const data = await response.json();

  await setCachedData(CACHE_SEARCH_BY_NAME_KEY(name), data);
  await __updateCacheData(CACHE_KEY, data);

  return data;
};
