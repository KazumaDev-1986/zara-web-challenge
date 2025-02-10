import { useEffect, useState } from 'react';
import { fetchCharacterById } from '../api/characters.api';
import { useRoute } from 'wouter';
import { urlCharactersById } from '../constants/appUrls';

interface CharacterDetailData {
  id: string;
  name: string;
  description: string;
}

const CharacterDetail = () => {
  const [character, setCharacter] = useState<CharacterDetailData | null>(null);
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

export default CharacterDetail;
