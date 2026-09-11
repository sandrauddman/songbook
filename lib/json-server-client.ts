import type { Category, Song } from '@/types/song';

const jsonServerUrl = process.env.JSON_SERVER_URL ?? 'http://localhost:3001';

export class JsonServerError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'JsonServerError';
  }
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${jsonServerUrl}${path}`, {
      headers: { Accept: 'application/json', ...(init?.headers ?? {}) },
      cache: 'no-store',
      ...init,
    });
  } catch {
    throw new JsonServerError('JSON server is unavailable.', 503);
  }

  if (!response.ok) {
    throw new JsonServerError(`JSON server returned ${response.status}.`, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  if (typeof response.json === 'function') {
    try {
      return (await response.json()) as T;
    } catch {
      // Fall through to text fallback for mocked or partial Response objects.
    }
  }

  if (typeof response.text === 'function') {
    const rawBody = await response.text();
    if (!rawBody) {
      return undefined as T;
    }

    try {
      return JSON.parse(rawBody) as T;
    } catch {
      return undefined as T;
    }
  }

  return undefined as T;
}

export function getSongs(searchParams?: URLSearchParams): Promise<Song[]> {
  const query = searchParams?.toString();
  return requestJson<Song[]>(query ? `/songs?${query}` : '/songs');
}

export function getSong(id: string): Promise<Song> {
  return requestJson<Song>(`/songs/${encodeURIComponent(id)}`);
}

export function createSong(song: Song): Promise<Song> {
  return requestJson<Song>('/songs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(song),
  });
}

export function updateSong(id: string, updates: Partial<Song>): Promise<Song> {
  return requestJson<Song>(`/songs/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
}

export function deleteSong(id: string): Promise<void> {
  return requestJson<void>(`/songs/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

export function getCategories(): Promise<Category[]> {
  return requestJson<Category[]>('/categories');
}

export function createCategory(category: Category): Promise<Category> {
  return requestJson<Category>('/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
}

export function updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
  return requestJson<Category>(`/categories/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
}

export function deleteCategory(id: string): Promise<void> {
  return requestJson<void>(`/categories/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}
