import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SongDetail } from '@/components/song/song-detail';
import { Header } from '@/components/layout/header';
import { JsonServerError, getCategories, getSong } from '@/lib/json-server-client';

interface SongPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SongPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const song = await getSong(slug);
    return {
      title: `${song.title} | Sångbok`,
      description: song.melody ? `Sjung ${song.title}, melodi: ${song.melody}.` : `Sjung ${song.title} tillsammans.`,
    };
  } catch {
    return { title: 'Visa | Sångbok' };
  }
}

export default async function SongPage({ params }: SongPageProps) {
  const { slug } = await params;
  let song;

  try {
    song = await getSong(slug);
  } catch (error) {
    if (error instanceof JsonServerError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Header />
      <main>
        <SongDetail
          song={song}
          category={categories.find((category) => category.id === song.categoryId)}
        />
      </main>
    </div>
  );
}
