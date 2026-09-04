import { JsonServerError, getSong } from '@/lib/json-server-client';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    return Response.json(await getSong(id));
  } catch (error) {
    if (error instanceof JsonServerError) {
      return Response.json({ error: error.message }, { status: error.status === 404 ? 404 : error.status });
    }

    return Response.json({ error: 'Unable to load song.' }, { status: 500 });
  }
}
