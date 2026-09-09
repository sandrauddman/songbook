'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Header } from '@/components/Header';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { SongCard } from '@/components/SongCard';
import { useCategories } from '@/hooks/useCategories';
import { useSongs } from '@/hooks/useSongs';

export function Catalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const initialCategory = searchParams.get('categoryId') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { songs: allSongs } = useSongs();
  const { songs, isLoading, error } = useSongs(debouncedQuery, selectedCategory);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const categoryCounts = useMemo(
    () => allSongs.reduce<Record<string, number>>((counts, song) => {
      counts[song.categoryId] = (counts[song.categoryId] ?? 0) + 1;
      return counts;
    }, {}),
    [allSongs],
  );

  function updateFilters(nextQuery: string, nextCategory: string) {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set('q', nextQuery.trim());
    if (nextCategory) params.set('categoryId', nextCategory);
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }

  function handleCategoryChange(categoryId: string) {
    setSelectedCategory(categoryId);
    updateFilters(query, categoryId);
  }

  function resetFilters() {
    setQuery('');
    setDebouncedQuery('');
    setSelectedCategory('');
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <section className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Välj en visa</p>
          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-[var(--ink)] sm:text-6xl">Sången börjar här.</h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-[var(--muted)]">Bläddra bland visor för kräftskivan, midsommarbordet och alla kvällar däremellan.</p>
        </section>

        <SearchAndFilter
          query={query}
          selectedCategory={selectedCategory}
          categories={categories}
          categoryCounts={categoryCounts}
          onQueryChange={(nextQuery) => {
            setQuery(nextQuery);
            updateFilters(nextQuery, selectedCategory);
          }}
          onCategoryChange={handleCategoryChange}
          onReset={resetFilters}
        />

        <div className="mt-10 flex items-center justify-between border-b border-[var(--line)] pb-4">
          <p className="text-sm font-semibold text-[var(--muted)]">{isLoading ? 'Laddar visor...' : `${songs.length} ${songs.length === 1 ? 'visa' : 'visor'}`}</p>
          <p className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:block">Sångbok 2026</p>
        </div>

        {error && <p className="mt-10 rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">{error}</p>}
        {!error && !isLoading && songs.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] px-6 py-14 text-center">
            <p className="font-display text-3xl font-semibold text-[var(--ink)]">Inga visor hittades</p>
            <p className="mt-2 text-[var(--muted)]">Prova en annan sökning eller välj alla kategorier.</p>
            <button type="button" onClick={resetFilters} className="mt-6 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-bold text-[#171b1f] hover:bg-[var(--accent-deep)]">Återställ sökning</button>
          </div>
        )}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} category={categories.find((category) => category.id === song.categoryId)} />
          ))}
        </div>
        {categoriesLoading && <p className="sr-only">Laddar kategorier</p>}
      </main>
    </div>
  );
}
