import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SongDetail } from '@/components/song/song-detail';
import type { Category, Song } from '@/types/song';

const mockCategory: Category = {
  id: 'snapsvisor',
  name: 'Snapsvisor',
  emoji: '🥃',
  color: 'amber',
  order: 1,
};

const mockSongWithNotes: Song = {
  id: 'helan-gar',
  slug: 'helan-gar',
  title: 'Helan går',
  melody: 'Helan går',
  categoryId: 'snapsvisor',
  lyrics: [
    'Helan går,',
    'sjung hopp faderallan lallan lej,',
    '',
    'Och den som inte helan tar,',
    'han ej heller halvan får.',
  ],
  tags: ['snaps'],
  notes: 'Skålas efter sista raden!',
  language: 'sv',
};

describe('SongDetail component', () => {
  it('renders song title, melody, and stanzas separated properly', () => {
    render(<SongDetail song={mockSongWithNotes} category={mockCategory} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Helan går' })).toBeInTheDocument();
    expect(screen.getByText(/Melodi: Helan går/)).toBeInTheDocument();
    expect(screen.getByText(/sjung hopp faderallan lallan lej/)).toBeInTheDocument();
    expect(screen.getByText(/han ej heller halvan får/)).toBeInTheDocument();
  });

  it('renders ritual notes when provided', () => {
    render(<SongDetail song={mockSongWithNotes} category={mockCategory} />);

    expect(screen.getByText('Toastmästarens notis')).toBeInTheDocument();
    expect(screen.getByText('Skålas efter sista raden!')).toBeInTheDocument();
  });
});
