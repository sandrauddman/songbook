import type { Metadata } from 'next';
import Image from 'next/image';

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
            Hejsan!
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Under många år har jag och min fru Gun försökt glädja många vänner och bekanta med en liten sång i samband med födelsedagar och interna fester. Ofta har det visat sig med ett sånghäfte passande för tillfället.
            En liten specialitet har bland annat varit snapsvisor som vi under årens lopp har lärt oss och försökt delat med oss vid olika tillfällen. Gitarren har förstås varit med vid många tillfällen och vi tror att det har varit till glädje för många.
            Många av er har vid andra tillfällen försökt sjunga dessa sånger men tyvärr har man då glömt bort texten. Nu när jag har pensionerat mig har jag försökt samman ställa några av våra favoritsnaps låtar genom att göra lite häfte som vi kallar Uddmans bästa som vi vill gärna dela med oss för fram tiden.
            Sjung och le och tänk på alla fina och roliga stunder vi har haft tillsammans.
            Kenneth & Gun
          </p>
        </section>

        <section aria-labelledby="features-title" className="mt-14 border-t border-[var(--line)] pt-8">
          
          <Image src="/kenneth.jpg" alt="Kenneth och Gun" width={600} height={400} className="mt-6 rounded-lg border border-[var(--line)]" />


        </section>

        
        <footer className="mt-14 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
          <p>Enköping 2022-11-18</p>
          <p>Sångbok version 0.1.0</p>
          <p className="mt-1">Skapad för svenska middagar, kräftskivor och andra goda stunder.</p>
        </footer>
      </main>
    </div>
  );
}