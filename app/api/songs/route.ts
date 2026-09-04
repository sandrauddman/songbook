import { NextRequest } from 'next/server';

import { getSongs, JsonServerError } from '@/lib/json-server-client';

export async function GET(request: NextRequest) {
  const searchParams = new URLSearchParams();
  const query = request.nextUrl.searchParams.get('q');
  const categoryId = request.nextUrl.searchParams.get('categoryId');

  if (query) {
    searchParams.set('q', query);
  }

  if (categoryId) {
    searchParams.set('categoryId', categoryId === 'snaps' ? 'snapsvisor' : categoryId);
  }

  try {
    return Response.json(await getSongs(searchParams));
  } catch (error) {
    if (error instanceof JsonServerError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    return Response.json({ error: 'Unable to load songs.' }, { status: 500 });
  }
}
