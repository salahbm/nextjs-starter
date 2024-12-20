import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/[locale]/page';

describe('Home Component', () => {
  it('renders the Home component with correct content', () => {
    render(<Home />);
    const headingElement = screen.getByText(/Home/i);
    expect(headingElement).toBeInTheDocument();
  });
});
