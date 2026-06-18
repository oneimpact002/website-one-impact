// =================================================================
// API: track - registra eventos do funil
// =================================================================

export const prerender = false;

export async function POST({ request }) {
  try {
    const body = await request.json();
    console.log('[One Impact - Track]', body);
    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
