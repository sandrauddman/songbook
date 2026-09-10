import { errorResponse } from '@/lib/api-response';
import { getCategories } from '@/lib/json-server-client';

export async function GET() {
  try {
    const categories = await getCategories();
    return Response.json([...categories].sort((left, right) => left.order - right.order));
  } catch (error) {
    return errorResponse(error, 'Unable to load categories.');
  }
}
