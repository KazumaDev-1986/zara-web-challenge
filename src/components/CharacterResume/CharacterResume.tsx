import { FC } from 'react';
import { Character } from '../../types/characters';
import './CharacterResume.css';
import { ToggleFavoriteButton } from '../ToggleFavoriteButton';

interface CharacterResumeProps {
  character: Character;
}

export const CharacterResume: FC<CharacterResumeProps> = ({ character }) => {
  return (
    <div className="resume-container">
      <img
        className="resume-image"
        src={character.image}
        alt={`alt of ${character.name}`}
      />
      <div className="info-container">
        <div className="info-name-container">
          <h1 className="info-name">{character.name}</h1>
          <ToggleFavoriteButton id={character.id} />
        </div>
        <p className="info-description">{character.description}</p>
      </div>
    </div>
  );
};
