// =================================================================
// API: submit - recebe o lead do formulário de diagnóstico
// =================================================================

export const prerender = false;

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { nome, whatsapp, email, pessoalConfirm } = body;

    if (!nome || !whatsapp || !email) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Campos obrigatórios faltando' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Aqui você pode integrar com RenvChat, HubSpot, etc.
    // Por enquanto apenas loga e retorna sucesso
    console.log('[One Impact - Diagnóstico] Lead recebido:', { nome, whatsapp, email, pessoalConfirm });

    return new Response(
      JSON.stringify({ ok: true, message: 'Lead recebido com sucesso' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
