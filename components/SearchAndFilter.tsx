'use client';

import type { Category } from '@/types/song';

interface SearchAndFilterProps {
  query: string;
  selectedCategory: string;
  categories: Category[];
  categoryCounts: Record<string, number>;
  onQueryChange: (query: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onReset: () => void;
}

export function SearchAndFilter({
  query,
  selectedCategory,
  categories,
  categoryCounts,
  onQueryChange,
  onCategoryChange,
  onReset,
}: SearchAndFilterProps) {
  return (
    <section aria-label="Sök och filtrera visor" className="space-y-5">
      <div className="relative">
        <label htmlFor="song-search" className="sr-only">Sök bland visor</label>
        <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[var(--muted)]">⌕</span>
        <input
          id="song-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Sök titel, melodi eller text..."
          className="h-14 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-12 pr-24 text-base text-[var(--ink)] shadow-[0_8px_24px_rgba(0,0,0,0.16)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]"
        />
        {query && (
          <button
            type="button"
            onClick={onReset}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm font-semibold text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--ink)]"
          >
            Rensa
          </button>
        )}
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="list" aria-label="Kategorier">
        <button
          type="button"
          onClick={() => onCategoryChange('')}
          aria-pressed={!selectedCategory}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${!selectedCategory ? 'border-[var(--accent)] bg-[var(--accent)] text-[#171b1f]' : 'border-[var(--accent)] bg-transparent text-[var(--accent)] hover:bg-[var(--accent-soft)]'}`}
        >
          Alla <span className="ml-1 opacity-60">{Object.values(categoryCounts).reduce((sum, count) => sum + count, 0)}</span>
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            aria-pressed={selectedCategory === category.id}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedCategory === category.id ? 'border-[var(--accent)] bg-[var(--accent)] text-[#171b1f]' : 'border-[var(--accent)] bg-transparent text-[var(--accent)] hover:bg-[var(--accent-soft)]'}`}
          >
            <span aria-hidden="true">{category.emoji}</span> {category.name}
            <span className="ml-1 opacity-60">{categoryCounts[category.id] ?? 0}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
