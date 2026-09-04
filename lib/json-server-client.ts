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

async function requestJson<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${jsonServerUrl}${path}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
  } catch {
    throw new JsonServerError('JSON server is unavailable.', 503);
  }

  if (!response.ok) {
    throw new JsonServerError(`JSON server returned ${response.status}.`, response.status);
  }

  return response.json() as Promise<T>;
}

export function getSongs(searchParams?: URLSearchParams): Promise<Song[]> {
  const query = searchParams?.toString();
  return requestJson<Song[]>(query ? `/songs?${query}` : '/songs');
}

export function getSong(id: string): Promise<Song> {
  return requestJson<Song>(`/songs/${encodeURIComponent(id)}`);
}

export function getCategories(): Promise<Category[]> {
  return requestJson<Category[]>('/categories');
}
