import { FC, useContext, useState } from 'react';
import { CharacterContext } from '../../context/CharacterContext';
import { addFavorite, removeFavorite } from '../../db/cache';

interface TogglefavoriteButtonProps {
  id: number;
}

export const ToggleFavoriteButton: FC<TogglefavoriteButtonProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ctx = useContext(CharacterContext);
  const isFavorite = ctx?.state.favorites.includes(id);

  const onToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoading) {
      setIsLoading(true);

      const fetch = isFavorite ? removeFavorite : addFavorite;
      const actionName = isFavorite ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE';

      fetch(id)
        .then(() => {
          const search = location.search;
          const searchParams = new URLSearchParams(search);
          const isFavorites = searchParams.get('favorites');

          if (isFavorites) {
            ctx?.dispatch({
              type: 'REMOVE_FAVORITES_AND_UPDATE_CHARACTERS',
              payload: id,
            });
          } else {
            ctx?.dispatch({ type: actionName, payload: id });
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <button className="icon" onClick={onToggleFavorite}>
      <img src={`/assets/heart-${isFavorite ? 'active' : 'inactive'}.svg`} />
    </button>
  );
};
