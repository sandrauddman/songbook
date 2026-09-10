import Link from 'next/link';

import { SongCard } from '@/components/song/song-card';
import type { Category, Song } from '@/types/song';

interface SongGridProps {
  songs: Song[];
  categories: Category[];
}

export function SongGrid({ songs, categories }: SongGridProps) {
  const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));

  return (
    <section aria-label="Sångkatalog" className="mt-10">
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
        <p className="text-sm font-semibold text-[var(--muted)]">
          {songs.length} {songs.length === 1 ? 'visa' : 'visor'}
        </p>
        <p className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:block">
          Sångbok 2026
        </p>
      </div>

      {songs.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] px-6 py-14 text-center">
          <p className="font-display text-3xl font-semibold text-[var(--ink)]">
            Inga visor hittades
          </p>
          <p className="mt-2 text-[var(--muted)]">
            Prova en annan sökning eller välj alla kategorier.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-bold text-[#171b1f] hover:bg-[var(--accent-deep)] transition"
          >
            Återställ sökning
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              category={categoryMap.get(song.categoryId)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
