import { render, screen, fireEvent, act } from '@testing-library/react';
import Card from './Card';
import { CharacterContext } from '../../context/CharacterContext';
import { addFavorite, removeFavorite } from '../../db/cache';

jest.mock('../../db/cache', () => ({
  addFavorite: jest.fn(() => Promise.resolve()),
  removeFavorite: jest.fn(() => Promise.resolve()),
}));

describe('Card Component', () => {
  const mockDispatch = jest.fn();
  const mockContextValue = {
    state: { favorites: [], characters: [] },
    dispatch: mockDispatch,
  };

  const setup = (isFavorite: boolean) => {
    render(
      <CharacterContext.Provider value={mockContextValue}>
        <Card
          id={1}
          image="/test.jpg"
          name="Test Character"
          isFavorite={isFavorite}
        />
      </CharacterContext.Provider>
    );
  };

  test('renders Card component correctly', () => {
    setup(false);
    expect(screen.getByText('Test Character')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test.jpg');
  });

  test('calls addFavorite when clicking on inactive heart', async () => {
    setup(false);
    const heartButton = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(heartButton);
    });

    expect(addFavorite).toHaveBeenCalledWith(1);
  });

  test('calls removeFavorite when clicking on active heart', async () => {
    setup(true);
    const heartButton = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(heartButton);
    });

    expect(removeFavorite).toHaveBeenCalledWith(1);
  });

  test('dispatches correct action after successful API call', async () => {
    setup(false);
    const heartButton = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(heartButton);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_FAVORITE',
      payload: 1,
    });
  });
});
