'use client';

import Link from 'next/link';

import type { Category, Song } from '@/types/song';

interface SongDetailProps {
  song: Song;
  category?: Category;
}

function splitIntoStanzas(lyrics: string[]): string[][] {
  const stanzas: string[][] = [];
  let stanza: string[] = [];

  for (const line of lyrics) {
    if (line.trim() === '') {
      if (stanza.length > 0) {
        stanzas.push(stanza);
        stanza = [];
      }
      continue;
    }

    stanza.push(line);
  }

  if (stanza.length > 0) {
    stanzas.push(stanza);
  }

  return stanzas;
}

export function SongDetail({ song, category }: SongDetailProps) {
  const stanzas = splitIntoStanzas(song.lyrics);

  return (
    <article className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
      <nav aria-label="Brödsmulor" className="pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          <span aria-hidden="true">←</span> Till sångboken
        </Link>
      </nav>

      <header className="pt-10 sm:pt-14">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
          <span aria-hidden="true">{category?.emoji}</span>
          {category?.name ?? 'Visa'}
        </span>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-tight text-[var(--ink)] sm:text-7xl">
          {song.title}
        </h1>
        {song.melody && (
          <p className="mt-6 border-l-2 border-[var(--accent)] pl-4 text-lg font-semibold text-[var(--accent)] sm:text-xl">
            Melodi: {song.melody}
          </p>
        )}
      </header>

      <div className="mt-12 max-w-2xl border-t border-[var(--line)] pt-10 sm:mt-16 sm:pt-14">
        <div className="space-y-10 text-xl leading-[1.75] text-[var(--ink)] sm:text-2xl sm:leading-[1.8]">
          {stanzas.map((stanza, stanzaIndex) => (
            <p key={stanzaIndex} className="whitespace-pre-line">
              {stanza.join('\n')}
            </p>
          ))}
        </div>

        {song.notes && (
          <aside className="mt-12 rounded-2xl border border-[var(--accent)]/35 bg-[var(--accent-soft)] p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
              Toastmästarens notis
            </p>
            <p className="mt-2 text-lg font-semibold leading-7 text-[var(--ink)]">
              {song.notes}
            </p>
          </aside>
        )}
      </div>
    </article>
  );
}
