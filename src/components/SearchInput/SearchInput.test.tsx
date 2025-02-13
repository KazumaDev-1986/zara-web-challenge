import { render, screen } from '@testing-library/react';
import { SearchInput } from './SearchInput';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

jest.mock('../../config/env', () => ({
  API_BASE_URL: 'http://localhost:3000',
  DB_NAME: 'test-db',
  DB_STORE_NAME: 'db-store',
  FAVORITES_STORE_NAM: 'favorites-store-name',
}));

beforeAll(() => {
  i18n.init({
    lng: 'en',
    resources: {
      en: {
        translation: {},
      },
    },
  });
});

describe('SearchInput Component', () => {
  test('renders input with placeholder', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <SearchInput />
      </I18nextProvider>
    );
    const inputElement = screen.getByRole('img');
    expect(inputElement).toBeInTheDocument();
  });
});
