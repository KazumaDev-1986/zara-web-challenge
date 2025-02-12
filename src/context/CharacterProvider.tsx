import { ReactNode, useEffect, useReducer } from 'react';
import {
  CharacterContext,
  characterReducer,
  initialState,
} from './CharacterContext';
import { getAllFavorites } from '../db/cache';

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  useEffect(() => {
    getAllFavorites().then((favorites) => {
      dispatch({ type: 'SET_FAVORITES', payload: favorites });
    });
  }, []);

  return (
    <CharacterContext.Provider value={{ state, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
};
