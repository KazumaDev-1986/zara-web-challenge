import { render } from '@testing-library/react';
import FavoriteLink from './FavoriteLink';

jest.mock('../../config/env', () => ({
  API_BASE_URL: 'http://localhost:3000',
  DB_NAME: 'test-db',
  DB_STORE_NAME: 'db-store',
  FAVORITES_STORE_NAM: 'favorites-store-name',
}));

jest.mock('wouter', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

describe('FavoriteLink', () => {
  it('renders the FavoriteLink correctly', () => {
    const { container } = render(<FavoriteLink />);

    const linkElement = container.firstChild as HTMLElement;
    expect(linkElement.tagName).toBe('A');

    const iconElement = linkElement.querySelector('.icon');
    expect(iconElement).toBeInTheDocument();

    const counterElement = linkElement.querySelector('.counter');
    expect(counterElement).toBeInTheDocument();
  });
});
