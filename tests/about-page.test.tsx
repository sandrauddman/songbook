import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AboutPage from '@/app/om/page';

describe('About page', () => {
  it('explains the app, features, etiquette, and version', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: 'Visor för goda stunder.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Det här kan du göra' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Snapsvisevett' })).toBeInTheDocument();
    expect(screen.getByText('Sångbok version 0.1.0')).toBeInTheDocument();
  });
});