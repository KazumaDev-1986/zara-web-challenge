import { FC, useRef, useCallback, useContext } from 'react';
import './SearchInput.css';
import {
  fetchCharacters,
  fetchCharactersByName,
} from '../../api/characters.api';
import { CharacterContext } from '../../context/CharacterContext';
import { useTranslation } from 'react-i18next';

export const SearchInput: FC = () => {
  const ctx = useContext(CharacterContext);
  const callbackRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation();

  const onSearch = useCallback(
    (value: string) => {
      if (value) {
        fetchCharactersByName(value).then((data) => {
          ctx?.dispatch({ type: 'SET_CHARACTERS', payload: data });
        });
      } else {
        fetchCharacters().then((data) => {
          ctx?.dispatch({ type: 'SET_CHARACTERS', payload: data ?? [] });
        });
      }
    },
    [ctx]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (callbackRef.current) {
        clearTimeout(callbackRef.current);
      }
      callbackRef.current = setTimeout(() => onSearch(e.target.value), 500);
    },
    [onSearch]
  );

  return (
    <div className="search-form">
      <div className="search-container">
        <img className="search-icon" src="/assets/search.svg" />

        <input
          className="search-input"
          type="text"
          placeholder={t('searchACharacter')}
          onChange={onChange}
        />
      </div>
      <span className="search-result">
        {t('result', { count: (ctx?.state.characters ?? []).length })}
      </span>
    </div>
  );
};
