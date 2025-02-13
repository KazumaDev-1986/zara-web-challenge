import { render, screen } from '@testing-library/react';
import { Transformations } from './Transformations';
import { Transformation } from '../../types/characters';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../Title', () => ({
  Title: ({ text }: { text: string }) => <h1>{text}</h1>,
}));

describe('Transformations Component', () => {
  const mockTransformations: Transformation[] = [
    {
      id: 1,
      name: 'Super Saiyan',
      image: 'https://example.com/ss.jpg',
      ki: '5000',
      deletedAt: null,
    },
    {
      id: 2,
      name: 'Super Saiyan Blue',
      image: 'https://example.com/ssb.jpg',
      ki: '10000',
      deletedAt: null,
    },
  ];

  it('renders transformations correctly', () => {
    render(<Transformations data={mockTransformations} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'transformations'
    );
    expect(screen.getByText('Super Saiyan')).toBeInTheDocument();
    expect(screen.getByText('5000')).toBeInTheDocument();
    expect(screen.getByText('Super Saiyan Blue')).toBeInTheDocument();
    expect(screen.getByText('10000')).toBeInTheDocument();
  });

  it('renders message when no transformations are available', () => {
    render(<Transformations data={[]} />);
    expect(screen.getByText('notHaveTransformations')).toBeInTheDocument();
  });
});
