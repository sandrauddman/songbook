import { Suspense } from 'react';

import { Header } from '@/components/layout/header';
import { CatalogHero } from '@/components/catalog/catalog-hero';
import { SearchAndFilter } from '@/components/catalog/search-and-filter';
import { SongGrid } from '@/components/catalog/song-grid';
import { getCategories, getSongs } from '@/lib/json-server-client';
import type { Category, Song } from '@/types/song';

interface HomePageProps {
  searchParams: Promise<{
    q?: string;
    categoryId?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { q = '', categoryId = '' } = await searchParams;

  let categories: Category[] = [];
  let songs: Song[] = [];
  let allSongs: Song[] = [];
  let error: string | null = null;

  try {
    const isFiltering = Boolean(q.trim() || categoryId);
    const queryParams = new URLSearchParams();
    if (q.trim()) queryParams.set('q', q.trim());
    if (categoryId) queryParams.set('categoryId', categoryId);

    const [fetchedCategories, fetchedAllSongs, fetchedFilteredSongs] = await Promise.all([
      getCategories(),
      getSongs(),
      isFiltering ? getSongs(queryParams) : Promise.resolve(null),
    ]);

    categories = fetchedCategories;
    allSongs = fetchedAllSongs;
    songs = fetchedFilteredSongs ?? fetchedAllSongs;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Kunde inte ladda sångkatalogen.';
  }

  const categoryCounts = allSongs.reduce<Record<string, number>>((counts, song) => {
    counts[song.categoryId] = (counts[song.categoryId] ?? 0) + 1;
    return counts;
  }, {});

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <CatalogHero />

        <Suspense fallback={null}>
          <SearchAndFilter
            initialQuery={q}
            selectedCategory={categoryId}
            categories={categories}
            categoryCounts={categoryCounts}
          />
        </Suspense>

        {error ? (
          <p className="mt-10 rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">
            {error}
          </p>
        ) : (
          <SongGrid songs={songs} categories={categories} />
        )}
      </main>
    </div>
  );
}
