import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SongCard } from '@/components/song/song-card';
import type { Category, Song } from '@/types/song';

const mockCategory: Category = {
  id: 'snapsvisor',
  name: 'Snapsvisor',
  emoji: '🥃',
  color: 'amber',
  order: 1,
};

const mockSong: Song = {
  id: 'helan-gar',
  slug: 'helan-gar',
  title: 'Helan går',
  melody: 'Helan går',
  categoryId: 'snapsvisor',
  lyrics: ['Helan går, sjung hopp faderallan lallan lej', 'helan går, sjung hopp faderallan lej.'],
  tags: ['snaps'],
  language: 'sv',
};

describe('SongCard component', () => {
  it('renders song title, melody, category emoji, and preview lyrics', () => {
    render(<SongCard song={mockSong} category={mockCategory} />);

    expect(screen.getByText('Helan går')).toBeInTheDocument();
    expect(screen.getByText(/Melodi: Helan går/)).toBeInTheDocument();
    expect(screen.getByText(/Snapsvisor/)).toBeInTheDocument();
    expect(screen.getByText(/sjung hopp faderallan/)).toBeInTheDocument();
  });

  it('invokes onToggleFavorite when clicking favorite button', () => {
    const handleToggle = vi.fn();
    render(
      <SongCard
        song={mockSong}
        category={mockCategory}
        isFavorite={false}
        onToggleFavorite={handleToggle}
      />,
    );

    const favoriteButton = screen.getByRole('button', { name: /Markera Helan går som favorit/i });
    fireEvent.click(favoriteButton);

    expect(handleToggle).toHaveBeenCalledWith('helan-gar');
  });
});
