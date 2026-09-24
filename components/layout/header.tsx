import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-center px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="group text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-lg"
          aria-label="Gå till sångbokens startsida"
        >
          <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
            sångbok
          </p>
          <p className="mt-1 text-center font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            Uddmans bästa <span className="text-[var(--accent)]">Snapsvisor!</span>
          </p>
        </Link>
        <Link
          href="/om"
          className="absolute right-5 rounded-lg px-2 py-1 text-sm font-bold text-[var(--muted)] transition hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:right-8"
        >
          Om
        </Link>
      </div>
    </header>
  );
}
