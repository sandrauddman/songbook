import { errorResponse } from '@/lib/api-response';
import { getSong } from '@/lib/json-server-client';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    return Response.json(await getSong(id));
  } catch (error) {
    return errorResponse(error, 'Unable to load song.');
  }
}
