import { FC, useContext } from 'react';
import './FavoriteLink.css';
import { urlCharacters } from '../../constants/appUrls';
import { CharacterContext } from '../../context/CharacterContext';
import { fetchCharacters } from '../../api/characters.api';

const FavoriteLink: FC = () => {
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
        <svg
          className="icon"
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3.63869L6 -0.00292969L0 3.63869V11.4422L12 21.6734L24 11.4422V3.63869L18 -0.00292969L12 3.63869Z"
            fill="#EC1D24"
          />
        </svg>
        <span className="counter">{ctx?.state.favorites.length ?? 0}</span>
      </div>
    </button>
  );
};

export default FavoriteLink;
