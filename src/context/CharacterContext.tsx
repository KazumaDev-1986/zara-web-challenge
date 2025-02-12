import { createContext, Dispatch } from 'react';

interface CharacterState {
  favorites: number[];
}

const initialState: CharacterState = {
  favorites: [],
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

type CharacterAction =
  | AddFavoriteAction
  | RemoveFavoriteAction
  | SetFavoritesAction;

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
