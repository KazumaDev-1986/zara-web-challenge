import { useContext, useEffect, useState } from 'react';
import { fetchCharacters } from '../api/characters.api';
import { Character } from '../types/CharacterList';
import Grid from '../components/Grid/Grid';
import Card from '../components/Card/Card';
import { CharacterContext } from '../context/CharacterContext';

const CharacterListPage = () => {
  const ctx = useContext(CharacterContext);
  const [characters, setCharacters] = useState<Character[] | null>([]);

  const search = location.search;
  const searchParams = new URLSearchParams(search);
  const isFavorites = searchParams.get('favorites');
  const favorites = ctx?.state.favorites ?? [];

  useEffect(() => {
    fetchCharacters().then(setCharacters).catch(console.error);
  }, []);

  const data = isFavorites
    ? characters?.filter((character) => favorites.includes(character.id))
    : characters;

  return (
    <Grid>
      {data?.map((character) => (
        <Card
          key={character.id}
          id={character.id}
          name={character.name}
          image={character.image}
          isFavorite={favorites.includes(character.id)}
        />
      ))}
    </Grid>
  );
};

export default CharacterListPage;
