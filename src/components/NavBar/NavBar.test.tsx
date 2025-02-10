import { render } from '@testing-library/react';
import NavBar from './NavBar';

jest.mock('wouter', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

describe('NavBar', () => {
  it('renders the navbar correctly', () => {
    const { container } = render(<NavBar />);

    const logo = container.querySelector('.logo');
    expect(logo).toBeInTheDocument();

    const favoriteLink = container.querySelector('.favoriteLink');
    expect(favoriteLink).toBeInTheDocument();
  });
});
