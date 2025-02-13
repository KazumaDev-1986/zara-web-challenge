import { FC, useContext } from 'react';
import './FavoriteLink.css';
import { urlCharacters } from '../../constants/appUrls';
import { CharacterContext } from '../../context/CharacterContext';
import { fetchCharacters } from '../../api/characters.api';

export const FavoriteLink: FC = () => {
  const ctx = useContext(CharacterContext);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    fetchCharacters().then((data) => {
      const favorites = (data ?? []).filter((character) =>
        ctx?.state.favorites.includes(character.id)
      );

      ctx?.dispatch({ type: 'SET_CHARACTERS', payload: favorites });
      window.location.href = `${urlCharacters}?favorites=1`;
    });
  };

  return (
    <button onClick={onClick}>
      <div className="favorite-link">
        <img className="icon" src="/assets/heart-active.svg" />
        <span className="counter">{ctx?.state.favorites.length ?? 0}</span>
      </div>
    </button>
  );
};
