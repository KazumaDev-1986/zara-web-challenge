import { useEffect, useState } from 'react';
import { fetchCharacterById } from '../api/characters.api';
import { useRoute } from 'wouter';
import { urlCharactersById } from '../constants/appUrls';
import { CharacterDetailApiResponse } from '../types/CharacterDetail';

const CharacterDetailPage = () => {
  const [character, setCharacter] = useState<CharacterDetailApiResponse | null>(
    null
  );
  const params = useRoute<{ id: string }>(urlCharactersById)[1];

  useEffect(() => {
    if (params?.id) {
      fetchCharacterById(params.id).then(setCharacter).catch(console.error);
    }
  }, [params?.id]);

  return (
    <div>
      {character ? (
        <div>
          <h1>{character.name}</h1>
          <p>{character.description}</p>
        </div>
      ) : (
        <p>Loading character...</p>
      )}
    </div>
  );
};

export default CharacterDetailPage;
