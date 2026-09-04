'use client';

import { useEffect, useState } from 'react';

import type { Song } from '@/types/song';

interface UseSongsResult {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
}

export function useSongs(query = '', categoryId = ''): UseSongsResult {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const searchParams = new URLSearchParams();

    if (query) {
      searchParams.set('q', query);
    }

    if (categoryId) {
      searchParams.set('categoryId', categoryId);
    }

    void (async () => {
      await Promise.resolve();
      if (controller.signal.aborted) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/songs?${searchParams.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Unable to load songs.');
        }

        setSongs((await response.json()) as Song[]);
      } catch (requestError) {
        if (requestError instanceof Error && requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    })();

    return () => controller.abort();
  }, [query, categoryId]);

  return { songs, isLoading, error };
}
