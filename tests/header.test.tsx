import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Header } from '@/components/layout/header';

describe('Header component', () => {
  it('renders branding title and subtitle', () => {
    render(<Header />);

    expect(screen.getByText(/sångbok/i)).toBeInTheDocument();
    expect(screen.getByText(/Uddmans bästa/i)).toBeInTheDocument();
    expect(screen.getByText(/Snapsvisor!/i)).toBeInTheDocument();
  });

  it('links to home page', () => {
    render(<Header />);

    const link = screen.getByRole('link', { name: /sångbokens startsida/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
