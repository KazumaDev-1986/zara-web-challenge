import { render, screen } from '@testing-library/react';
import SearchInput from './SearchInput';

jest.mock('../../config/env', () => ({
  API_BASE_URL: 'http://localhost:3000',
  DB_NAME: 'test-db',
  DB_STORE_NAME: 'db-store',
  FAVORITES_STORE_NAM: 'favorites-store-name',
}));

describe('SearchInput Component', () => {
  test('renders input with placeholder', () => {
    render(<SearchInput />);
    const inputElement = screen.getByPlaceholderText('Search a character...');
    expect(inputElement).toBeInTheDocument();
  });
});
