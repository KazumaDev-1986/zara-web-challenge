import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToggleFavoriteButton } from './ToggleFavoriteButton';
import { CharacterContext } from '../../context/CharacterContext';
import { removeFavorite } from '../../db/cache';

jest.mock('../../db/cache', () => ({
  addFavorite: jest.fn(() => Promise.resolve()),
  removeFavorite: jest.fn(() => Promise.resolve()),
}));

describe('ToggleFavoriteButton Component', () => {
  const mockDispatch = jest.fn();
  const mockContextValue = {
    state: { characters: [], favorites: [1] },
    dispatch: mockDispatch,
  };

  it('renders correctly as a favorite', () => {
    render(
      <CharacterContext.Provider value={mockContextValue}>
        <ToggleFavoriteButton id={1} />
      </CharacterContext.Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/assets/heart-active.svg'
    );
  });

  it('toggles favorite status', async () => {
    render(
      <CharacterContext.Provider value={mockContextValue}>
        <ToggleFavoriteButton id={1} />
      </CharacterContext.Provider>
    );

    const button = screen.getByRole('button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(removeFavorite).toHaveBeenCalledWith(1);
  });
});
