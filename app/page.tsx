import { Suspense } from 'react';

import { Catalog } from '@/app/Catalog';

export default function Home() {
  return <Suspense fallback={<main className="p-8">Laddar sångboken...</main>}><Catalog /></Suspense>;
}
