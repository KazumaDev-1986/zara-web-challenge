import { useEffect, useState } from 'react';
import { fetchCharacters } from '../api/characters.api';
import { Link } from 'wouter';
import { Character } from '../types/CharacterList';
import { urlCharactersByIdBuilder } from '../constants/appUrls';

const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[] | null>([]);

  useEffect(() => {
    fetchCharacters().then(setCharacters).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Character List</h1>
      <ul>
        {characters?.map((character) => (
          <li key={character.id}>
            <Link href={urlCharactersByIdBuilder(character.id.toString())}>
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
