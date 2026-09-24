import type { Metadata } from 'next';

import { Header } from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'Om sångboken | Uddmans bästa snapsvisor',
  description: 'Läs om sångboken och lär dig mer om snapsvisor och snapsvisevett.',
};

const features = [
  ['Hitta rätt visa', 'Sök efter titel, melodi eller text och filtrera efter kategori.'],
  ['Sjung tillsammans', 'Öppna en visa med tydlig text, stor typografi och melodihänvisning.'],
  ['Spara favoriter', 'Markera dina säkra kort så att de finns nära till hands nästa gång.'],
  ['Dela med bordet', 'Visa en QR-kod så att alla snabbt kan öppna samma visa.'],
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Header />
      <main className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <section aria-labelledby="about-title" className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Om sångboken</p>
          <h1 id="about-title" className="mt-3 font-display text-5xl font-semibold leading-[0.95] text-[var(--ink)] sm:text-6xl">
            Visor för goda stunder.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Sångboken samlar svenska snapsvisor och festvisor på ett ställe, så att alla runt bordet kan hitta,
            läsa och sjunga med utan att leta efter ett tryckt häfte.
          </p>
        </section>

        <section aria-labelledby="features-title" className="mt-14 border-t border-[var(--line)] pt-8">
          <h2 id="features-title" className="font-display text-3xl font-semibold text-[var(--ink)]">Det här kan du göra</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {features.map(([title, description]) => (
              <article key={title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                <h3 className="font-display text-xl font-semibold text-[var(--ink)]">{title}</h3>
                <p className="mt-2 leading-7 text-[var(--muted)]">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="etiquette-title" className="mt-14 border-t border-[var(--line)] pt-8">
          <h2 id="etiquette-title" className="font-display text-3xl font-semibold text-[var(--ink)]">Snapsvisevett</h2>
          <ol className="mt-6 space-y-4 text-base leading-7 text-[var(--muted)]">
            <li><strong className="text-[var(--ink)]">1. Presentera visan.</strong> Säg gärna vilken visa ni ska sjunga och vilken melodi den följer.</li>
            <li><strong className="text-[var(--ink)]">2. Sjung tillsammans.</strong> Håll tempot så att alla hinner med och låt den som kan visan leda.</li>
            <li><strong className="text-[var(--ink)]">3. Skåla med omtanke.</strong> Vänta tills sista raden är sjungen och skåla i den takt som passar sällskapet.</li>
          </ol>
        </section>

        <footer className="mt-14 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
          <p>Sångbok version 0.1.0</p>
          <p className="mt-1">Skapad för svenska middagar, kräftskivor och andra goda stunder.</p>
        </footer>
      </main>
    </div>
  );
}