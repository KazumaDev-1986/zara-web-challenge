import { ReactNode, useEffect, useReducer } from 'react';
import {
  CharacterContext,
  characterReducer,
  initialState,
} from './CharacterContext';
import { getAllFavorites } from '../db/cache';
import { fetchCharacters } from '../api/characters.api';
import { urlCharacters } from '../constants/appUrls';

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  useEffect(() => {
    getAllFavorites().then((favorites) => {
      dispatch({ type: 'SET_FAVORITES', payload: favorites });

      fetchCharacters()
        .then((data) => {
          const search = location.search;
          const searchParams = new URLSearchParams(search);
          const isFavorites =
            location.pathname === urlCharacters &&
            searchParams.get('favorites');
          const characters = isFavorites
            ? data?.filter((character) => favorites.includes(character.id))
            : data;

          dispatch({ type: 'SET_CHARACTERS', payload: characters ?? [] });
        })
        .catch(console.error);
    });
  }, []);

  return (
    <CharacterContext.Provider value={{ state, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
};
