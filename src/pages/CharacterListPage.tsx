import { useEffect, useState } from 'react';
import { fetchCharacters } from '../api/characters.api';
import { Character } from '../types/CharacterList';
import Grid from '../components/Grid/Grid';

const CharacterListPage = () => {
  const [characters, setCharacters] = useState<Character[] | null>([]);

  useEffect(() => {
    fetchCharacters().then(setCharacters).catch(console.error);
  }, []);

  return (
    <>
      <h1>Character List</h1>
      <Grid>{characters?.map((character) => <div>{character.name}</div>)}</Grid>
    </>
  );
};

export default CharacterListPage;
