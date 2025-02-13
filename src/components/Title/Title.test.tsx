import { render, screen } from '@testing-library/react';
import { Title } from './Title';

describe('Title Component', () => {
  it('renders the title text correctly', () => {
    const testText = 'Test Title';
    render(<Title text={testText} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      testText
    );
  });
});
