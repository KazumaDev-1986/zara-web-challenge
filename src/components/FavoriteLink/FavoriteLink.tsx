import { FC, useContext } from 'react';
import './FavoriteLink.css';
import { Link } from 'wouter';
import { urlCharacters } from '../../constants/appUrls';
import { CharacterContext } from '../../context/CharacterContext';

const FavoriteLink: FC = () => {
  const ctx = useContext(CharacterContext);

  return (
    <Link href={`${urlCharacters}?favorites=1`}>
      <div className="favoriteLink">
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
        <span className="counter">{ctx?.state.favoritesCount ?? 0}</span>
      </div>
    </Link>
  );
};

export default FavoriteLink;
