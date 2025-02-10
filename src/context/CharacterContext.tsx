import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from 'react';
import { getAllFavorites } from '../db/cache';
import { Character } from '../types/CharacterList';

interface CharacterState {
  favoritesCount: number;
}

const initialState: CharacterState = {
  favoritesCount: 0,
};

interface AddFavoriteAction {
  type: 'ADD_FAVORITE';
  payload: Character;
}

interface RemoveFavoriteAction {
  type: 'REMOVE_FAVORITE';
  payload: string;
}

interface SetFavoritesCountAction {
  type: 'SET_FAVORITES_COUNT';
  payload: number;
}

type CharacterAction =
  | AddFavoriteAction
  | RemoveFavoriteAction
  | SetFavoritesCountAction;

function characterReducer(
  state: CharacterState,
  action: CharacterAction
): CharacterState {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return { ...state, favoritesCount: state.favoritesCount + 1 };
    case 'REMOVE_FAVORITE':
      return { ...state, favoritesCount: state.favoritesCount - 1 };
    case 'SET_FAVORITES_COUNT':
      return { ...state, favoritesCount: action.payload };
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

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  useEffect(() => {
    getAllFavorites().then((favorites) => {
      dispatch({ type: 'SET_FAVORITES_COUNT', payload: favorites.length });
    });
  }, []);

  return (
    <CharacterContext.Provider value={{ state, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
};
