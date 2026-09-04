import { getCategories, JsonServerError } from '@/lib/json-server-client';

export async function GET() {
  try {
    const categories = await getCategories();
    return Response.json([...categories].sort((left, right) => left.order - right.order));
  } catch (error) {
    if (error instanceof JsonServerError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    return Response.json({ error: 'Unable to load categories.' }, { status: 500 });
  }
}
