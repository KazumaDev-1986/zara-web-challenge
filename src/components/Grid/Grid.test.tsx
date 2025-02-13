import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid Component', () => {
  it('should render children inside the grid container', () => {
    render(
      <Grid>
        <div>Test Item 1</div>
        <div>Test Item 2</div>
      </Grid>
    );

    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
  });

  it('should have the correct class for grid-container', () => {
    const { container } = render(
      <Grid>
        <div>Test Item</div>
      </Grid>
    );

    const gridContainer = container.querySelector('.grid-container');
    expect(gridContainer).toBeInTheDocument();
  });
});
