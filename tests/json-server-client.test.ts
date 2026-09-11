import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  JsonServerError,
  createCategory,
  createSong,
  deleteCategory,
  deleteSong,
  getCategories,
  getSong,
  getSongs,
  updateCategory,
  updateSong,
} from '@/lib/json-server-client';
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
  lyrics: ['Helan går', 'sjung hopp faderallan lallan lej'],
  tags: ['snaps'],
  language: 'sv',
};

describe('json-server-client', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches all songs successfully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [mockSong],
      }),
    );

    const songs = await getSongs();
    expect(songs).toEqual([mockSong]);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/songs', expect.any(Object));
  });

  it('passes search parameters when fetching songs', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [mockSong],
      }),
    );

    const params = new URLSearchParams({ q: 'helan', categoryId: 'snapsvisor' });
    await getSongs(params);

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/songs?q=helan&categoryId=snapsvisor',
      expect.any(Object),
    );
  });

  it('fetches a single song by ID', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockSong,
      }),
    );

    const song = await getSong('helan-gar');
    expect(song).toEqual(mockSong);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/songs/helan-gar',
      expect.any(Object),
    );
  });

  it('throws a JsonServerError when upstream returns 404', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      }),
    );

    await expect(getSong('unknown-song')).rejects.toThrow(JsonServerError);
  });

  it('throws a JsonServerError with status 503 when network fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network offline')),
    );

    await expect(getCategories()).rejects.toThrow(JsonServerError);
  });

  it('fetches categories successfully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [mockCategory],
      }),
    );

    const categories = await getCategories();
    expect(categories).toEqual([mockCategory]);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/categories',
      expect.any(Object),
    );
  });

  it('creates, updates, and deletes songs through the json-server client', async () => {
    const createdSong = { ...mockSong, id: 'ny-visa', slug: 'ny-visa', title: 'Ny visa' };
    const updatedSong = { ...createdSong, title: 'Uppdaterad visa' };

    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => createdSong,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => updatedSong,
      })
      .mockResolvedValueOnce({ ok: true, json: async () => undefined });

    vi.stubGlobal('fetch', fetchMock);

    const newSong = await createSong(createdSong);
    expect(newSong).toEqual(createdSong);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'http://localhost:3001/songs',
      expect.objectContaining({ method: 'POST' }),
    );

    const persistedSong = await updateSong('ny-visa', { title: 'Uppdaterad visa' });
    expect(persistedSong).toEqual(updatedSong);
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'http://localhost:3001/songs/ny-visa',
      expect.objectContaining({ method: 'PATCH' }),
    );

    await expect(deleteSong('ny-visa')).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      'http://localhost:3001/songs/ny-visa',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });

  it('creates, updates, and deletes categories through the json-server client', async () => {
    const createdCategory = { ...mockCategory, id: 'midsommar', name: 'Midsommar' };
    const updatedCategory = { ...createdCategory, name: 'Sommarfest' };

    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => createdCategory,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => updatedCategory,
      })
      .mockResolvedValueOnce({ ok: true, json: async () => undefined });

    vi.stubGlobal('fetch', fetchMock);

    const newCategory = await createCategory(createdCategory);
    expect(newCategory).toEqual(createdCategory);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'http://localhost:3001/categories',
      expect.objectContaining({ method: 'POST' }),
    );

    const persistedCategory = await updateCategory('midsommar', { name: 'Sommarfest' });
    expect(persistedCategory).toEqual(updatedCategory);
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'http://localhost:3001/categories/midsommar',
      expect.objectContaining({ method: 'PATCH' }),
    );

    await expect(deleteCategory('midsommar')).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      'http://localhost:3001/categories/midsommar',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
