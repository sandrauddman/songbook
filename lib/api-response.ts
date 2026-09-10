import { JsonServerError } from '@/lib/json-server-client';

export function errorResponse(error: unknown, fallbackMessage: string): Response {
  if (error instanceof JsonServerError) {
    return Response.json({ error: error.message }, { status: error.status });
  }

  return Response.json({ error: fallbackMessage }, { status: 500 });
}


