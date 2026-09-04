export type CategoryColor = 'amber' | 'red' | 'green' | 'blue' | 'purple' | 'slate';

export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: CategoryColor;
  description?: string;
  order: number;
}

export interface Song {
  id: string;
  slug: string;
  title: string;
  melody?: string;
  categoryId: string;
  lyrics: string[];
  tags: string[];
  notes?: string;
  language: 'sv' | 'en';
  createdAt?: string;
  updatedAt?: string;
}

export interface SongFormData {
  title: string;
  slug?: string;
  melody?: string;
  categoryId: string;
  lyricsText: string;
  tagsText: string;
  notes?: string;
  language: 'sv' | 'en';
}

export interface CategoryFormData {
  name: string;
  slug?: string;
  emoji: string;
  color: CategoryColor;
  description?: string;
  order?: number;
}

export interface SongBooklet {
  id: string;
  slug: string;
  title: string;
  description?: string;
  eventDate?: string;
  songIds: string[];
  createdAt: string;
  updatedAt: string;
}
