import { createContext, Dispatch } from 'react';
import { Character } from '../types/characters';

interface CharacterState {
  favorites: number[];
  characters: Character[];
}

const initialState: CharacterState = {
  favorites: [],
  characters: [],
};

interface AddFavoriteAction {
  type: 'ADD_FAVORITE';
  payload: number;
}

interface RemoveFavoriteAction {
  type: 'REMOVE_FAVORITE';
  payload: number;
}

interface SetFavoritesAction {
  type: 'SET_FAVORITES';
  payload: number[];
}

interface SetChractersAction {
  type: 'SET_CHARACTERS';
  payload: Character[];
}
interface RemoveFavoriteAndUpdateCharactersAction {
  type: 'REMOVE_FAVORITES_AND_UPDATE_CHARACTERS';
  payload: number;
}

type CharacterAction =
  | AddFavoriteAction
  | RemoveFavoriteAction
  | SetFavoritesAction
  | SetChractersAction
  | RemoveFavoriteAndUpdateCharactersAction;

function characterReducer(
  state: CharacterState,
  action: CharacterAction
): CharacterState {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((value) => value !== action.payload),
      };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'SET_CHARACTERS':
      return { ...state, characters: action.payload };
    case 'REMOVE_FAVORITES_AND_UPDATE_CHARACTERS':
      return {
        ...state,
        favorites: state.favorites.filter((n) => n !== action.payload),
        characters: state.characters.filter((c) => c.id !== action.payload),
      };
    default:
      return state;
  }
}

interface CharacterContextProps {
  state: CharacterState;
  dispatch: Dispatch<CharacterAction>;
}

export const CharacterContext = createContext<
  CharacterContextProps | undefined
>(undefined);

export { initialState, characterReducer };
