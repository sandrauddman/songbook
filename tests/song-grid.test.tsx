import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SongGrid } from '@/components/catalog/song-grid';
import type { Category, Song } from '@/types/song';

const mockCategories: Category[] = [
  {
    id: 'snapsvisor',
    name: 'Snapsvisor',
    emoji: '🥃',
    color: 'amber',
    order: 1,
  },
];

const mockSongs: Song[] = [
  {
    id: 'helan-gar',
    slug: 'helan-gar',
    title: 'Helan går',
    melody: 'Helan går',
    categoryId: 'snapsvisor',
    lyrics: ['Helan går, sjung hopp faderallan'],
    tags: ['snaps'],
    language: 'sv',
  },
  {
    id: 'halvan',
    slug: 'halvan',
    title: 'Halvan',
    melody: 'Hurra hurra',
    categoryId: 'snapsvisor',
    lyrics: ['Hurra nu tar vi halvan'],
    tags: ['snaps'],
    language: 'sv',
  },
];

describe('SongGrid component', () => {
  it('renders song count and song cards when songs exist', () => {
    render(<SongGrid songs={mockSongs} categories={mockCategories} />);

    expect(screen.getByText('2 visor')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Helan går' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Halvan' })).toBeInTheDocument();
  });

  it('renders singular "1 visa" when single song is passed', () => {
    render(<SongGrid songs={[mockSongs[0]]} categories={mockCategories} />);

    expect(screen.getByText('1 visa')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Helan går' })).toBeInTheDocument();
  });

  it('renders empty state with reset link when no songs match', () => {
    render(<SongGrid songs={[]} categories={mockCategories} />);

    expect(screen.getByText('0 visor')).toBeInTheDocument();
    expect(screen.getByText('Inga visor hittades')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Återställ sökning/i })).toHaveAttribute('href', '/');
  });
});
