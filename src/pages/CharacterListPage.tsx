import { useContext } from 'react';
import { CharacterContext } from '../context/CharacterContext';
import Grid from '../components/Grid/Grid';
import Card from '../components/Card/Card';
import SearchInput from '../components/SearchInput/SearchInput';
import Title from '../components/Title/Title';

const CharacterListPage = () => {
  const ctx = useContext(CharacterContext);
  const search = location.search;
  const searchParams = new URLSearchParams(search);
  const isFavorites = searchParams.get('favorites');
  return (
    <div>
      {isFavorites ? <Title text="Favorites" /> : ''}
      <SearchInput />
      <Grid>
        {ctx?.state.characters?.map((character) => (
          <Card
            key={character.id}
            id={character.id}
            name={character.name}
            image={character.image}
            isFavorite={ctx?.state.favorites.includes(character.id)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default CharacterListPage;
