import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useSongs } from '@/hooks/use-songs';
import type { Song } from '@/types/song';

const mockSongs: Song[] = [
  {
    id: 'helan-gar',
    slug: 'helan-gar',
    title: 'Helan går',
    categoryId: 'snapsvisor',
    lyrics: ['Helan går'],
    tags: ['snaps'],
    language: 'sv',
  },
];

describe('useSongs hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads songs successfully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockSongs,
      }),
    );

    const { result } = renderHook(() => useSongs());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.songs).toEqual(mockSongs);
    expect(result.current.error).toBeNull();
  });

  it('passes query and categoryId to API endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSongs,
    });
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useSongs('helan', 'snapsvisor'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/api/songs?q=helan&categoryId=snapsvisor'),
      expect.any(Object),
    );
  });

  it('handles fetch failure gracefully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    );

    const { result } = renderHook(() => useSongs());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.songs).toEqual([]);
    expect(result.current.error).toBe('Unable to load songs.');
  });
});
