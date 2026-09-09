import Link from 'next/link';

import type { Category, Song } from '@/types/song';

interface SongCardProps {
  song: Song;
  category?: Category;
}

export function SongCard({ song, category }: SongCardProps) {
  return (
    <Link
      href={`/visa/${song.slug}`}
      className="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_10px_26px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_16px_34px_rgba(0,0,0,0.34)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-[var(--accent)] opacity-10 blur-2xl transition duration-300 group-hover:opacity-25" />
      <div>
        <div className="flex items-start justify-between gap-3">
          <h2 className="line-clamp-2 min-h-14 max-w-[calc(100%-2rem)] font-display text-2xl font-semibold leading-[1.05] text-[var(--ink)]">{song.title}</h2>
          <span aria-hidden="true" className="mt-1 text-xl text-[var(--muted)] transition group-hover:translate-x-1 group-hover:text-[var(--accent)]">→</span>
        </div>
        {song.melody && <p className="mt-2 line-clamp-1 text-sm font-medium text-[var(--ink)]/85">Melodi: {song.melody}</p>}
        <span className="mt-4 inline-flex max-w-full items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
          <span aria-hidden="true">{category?.emoji}</span> {category?.name ?? 'Visa'}
        </span>
      </div>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <p className="line-clamp-2 text-sm leading-6 text-[var(--muted)]">{song.lyrics.slice(0, 2).join(' ')}</p>
        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[var(--accent)]">
          <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-lg">★</span>
          <span>Favorit</span>
        </div>
      </div>
    </Link>
  );
}
