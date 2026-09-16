import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

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
  beforeEach(() => {
    window.localStorage.clear();
  });

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

  it('changes lyric size through four steps and disables controls at the bounds', () => {
    render(<SongDetail song={mockSongWithNotes} category={mockCategory} />);

    const decreaseButton = screen.getByRole('button', { name: 'Minska textstorlek' });
    const increaseButton = screen.getByRole('button', { name: 'Öka textstorlek' });
    const lyrics = screen.getByText(/sjung hopp faderallan lallan lej/).closest('div[style]') as HTMLElement | null;

    expect(lyrics).not.toBeNull();
    expect(decreaseButton).toBeDisabled();
    expect(increaseButton).not.toBeDisabled();
    expect(lyrics?.style.fontSize).toBe('1.25rem');

    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);

    expect(increaseButton).toBeDisabled();
    expect(decreaseButton).not.toBeDisabled();
    expect(lyrics?.style.fontSize).toBe('2.25rem');
    expect(screen.getByLabelText('Textstorlek 4 av 4')).toBeInTheDocument();
  });

  it('restores the saved font size when another song is opened', async () => {
    const firstRender = render(<SongDetail song={mockSongWithNotes} category={mockCategory} />);
    fireEvent.click(screen.getByRole('button', { name: 'Öka textstorlek' }));
    firstRender.unmount();

    render(<SongDetail song={mockSongWithNotes} category={mockCategory} />);

    await waitFor(() => {
      expect(screen.getByLabelText('Textstorlek 2 av 4')).toBeInTheDocument();
    });
    expect(window.localStorage.getItem('songbook-font-size')).toBe('1');
  });
});
