import { render } from '@testing-library/react';
import NavBar from './NavBar';

jest.mock('../../config/env', () => ({
  API_BASE_URL: 'http://localhost:3000',
  DB_NAME: 'test-db',
  DB_STORE_NAME: 'db-store',
  FAVORITES_STORE_NAM: 'favorites-store-name',
}));

jest.mock('wouter', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

describe('NavBar', () => {
  it('renders the navbar correctly', () => {
    const { container } = render(<NavBar />);

    const logo = container.querySelector('.logo');
    expect(logo).toBeInTheDocument();

    const favoriteLink = container.querySelector('.favorite-link');
    expect(favoriteLink).toBeInTheDocument();
  });
});
