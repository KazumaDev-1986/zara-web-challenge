export const urlIndex = '/';
export const urlCharacters = '/characters';
export const urlCharactersWithFavorites = '/characters?favorites=1';
export const urlCharactersById = '/characters/:id';

export const urlCharactersByIdBuilder = (id: string) => `/characters/${id}`;
