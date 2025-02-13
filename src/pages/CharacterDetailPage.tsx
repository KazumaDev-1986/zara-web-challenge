import { FC, useEffect, useState } from 'react';
import { CharacterResume } from '../components/CharacterResume';
import { fetchCharacterById } from '../api/characters.api';
import { useRoute } from 'wouter';
import { urlCharactersById } from '../constants/appUrls';
import { Character } from '../types/characters';
import { Transformations } from '../components/Transformations';

const CharacterDetailPage: FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const params = useRoute<{ id: string }>(urlCharactersById)[1];

  useEffect(() => {
    if (params?.id) {
      fetchCharacterById(params.id)
        .then((data) => {
          setCharacter(data);
        })
        .catch(console.error);
    }
  }, [params?.id]);

  return (
    <div className="character-detail-page">
      {character ? (
        <>
          <CharacterResume character={character} />
          <Transformations data={character.transformations ?? []} />
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default CharacterDetailPage;
