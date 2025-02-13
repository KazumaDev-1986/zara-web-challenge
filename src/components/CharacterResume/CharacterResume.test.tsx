import { render, screen } from '@testing-library/react';
import { CharacterResume } from './CharacterResume';
import { Character } from '../../types/characters';

jest.mock('../ToggleFavoriteButton', () => ({
  ToggleFavoriteButton: jest.fn(() => <button>Toggle Favorite</button>),
}));

describe('CharacterResume Component', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Goku',
    image: 'https://example.com/image.jpg',
    description: 'El protagonista de la serie, conocido...',
    ki: '60.000.000',
    maxKi: '90 Septillion',
    race: 'Saiyan',
    gender: 'Male',
    affiliation: 'Z Fighter',
    deletedAt: null,
    originPlanet: null,
    transformations: null,
  };

  it('renders character information correctly', () => {
    render(<CharacterResume character={mockCharacter} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      `alt of ${mockCharacter.name}`
    );
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.description)).toBeInTheDocument();
    expect(screen.getByText('Toggle Favorite')).toBeInTheDocument();
  });
});
