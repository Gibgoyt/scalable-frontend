import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: 'Hello from Cloudflare Workers!',
      timestamp: new Date().toISOString(),
      url: request.url
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};