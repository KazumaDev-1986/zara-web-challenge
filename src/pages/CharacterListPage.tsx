import { useContext } from 'react';
import { CharacterContext } from '../context/CharacterContext';
import { Grid } from '../components/Grid';
import { Card } from '../components/Card';
import { SearchInput } from '../components/SearchInput';
import { Title } from '../components/Title/Title';

const CharacterListPage = () => {
  const ctx = useContext(CharacterContext);
  const search = location.search;
  const searchParams = new URLSearchParams(search);
  const isFavorites = searchParams.get('favorites');

  const characters = (ctx?.state.characters ?? []).sort((a, b) => a.id - b.id);
  const favorites = ctx?.state.favorites ?? [];
  return (
    <div className="global-container">
      {isFavorites ? <Title text="Favorites" /> : ''}
      <SearchInput />
      <Grid>
        {characters.map((character) => (
          <Card
            key={character.id}
            id={character.id}
            name={character.name}
            image={character.image}
            isFavorite={favorites.includes(character.id)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default CharacterListPage;
