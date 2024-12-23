import { render, screen } from '@testing-library/react';
import React from 'react';

import Home from '@/app/[locale]/page';

describe('Home Component', () => {
  it('renders the Home component with correct headings', () => {
    render(<Home />);

    // Check if the main heading is rendered
    const mainHeading = screen.getByText(/Next JS Template/i);
    expect(mainHeading).toBeInTheDocument();

    // Check if the subheading is rendered
    const subHeading = screen.getByText(
      /This is template is developed for Next JS Projects as a starting point/i,
    );
    expect(subHeading).toBeInTheDocument();

    // Check if the README link is rendered
    const readmeLink = screen.getByRole('link', {
      name: /Check out the README/i,
    });
    expect(readmeLink).toBeInTheDocument();
    expect(readmeLink).toHaveAttribute(
      'href',
      'https://gitlab.com/momenti/nextjs-boilerplate-by-salah/-/blob/main/README.md',
    );

    // Check if the ESLint link is rendered
    const eslintLink = screen.getByRole('link', {
      name: /This Project uses Momenti ESLint/i,
    });
    expect(eslintLink).toBeInTheDocument();
    expect(eslintLink).toHaveAttribute(
      'href',
      'https://gitlab.com/momenti/momenti-eslint',
    );
  });
});
