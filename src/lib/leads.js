import { createClient } from '@supabase/supabase-js'

// Banco central de leads da One Impact, compartilhado com o LinkFlow e com a
// landing do cupom da Hostinger. Todo formulário de qualquer frente grava na
// mesma tabela `leads`, separado pela coluna `origem`.
//
// A chave abaixo é a chave pública (anon). Ela é pública por natureza, vai
// dentro do JavaScript que qualquer visitante baixa. O que protege os dados é o
// RLS no Supabase: essa chave só consegue inserir na tabela, nunca ler, editar
// ou apagar. A leitura é feita pelo painel do Supabase.
const SUPABASE_URL = 'https://avqoriulvndknmylowox.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2cW9yaXVsdm5ka25teWxvd294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NTg3ODEsImV4cCI6MjEwMjIzNDc4MX0.Y-5Rsg1tEK5_NDLhxVCqwZJKU_3EXzyDDlzRCLT2OME'

let _supabase = null

function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  }
  return _supabase
}

// As frentes aceitas pela tabela. Frente nova precisa ser liberada antes no
// check da coluna `origem`, no repositório do LinkFlow, senão o insert é
// recusado pelo banco.
export const ORIGENS = {
  contato: 'contato',
  diagnostico: 'diagnostico',
}

export function getUTMParams() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') || 'direct',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
  }
}

/**
 * Grava um lead na tabela central.
 *
 * Campos comuns a toda frente viram coluna. O que é específico de um
 * formulário vai em `extras`, para a tabela não precisar de uma coluna nova a
 * cada formulário criado.
 *
 * Importante: não encadear `.select()` no insert. A chave pública só tem
 * permissão de inserir, e pedir a linha de volta exige permissão de leitura,
 * o que faz o insert inteiro falhar com erro de RLS.
 */
export async function salvarLead({
  origem,
  nome,
  email = null,
  telefone = null,
  servico = null,
  mensagem = null,
  extras = {},
}) {
  const utm = getUTMParams()

  const { error } = await getSupabase()
    .from('leads')
    .insert({
      origem,
      nome,
      email,
      telefone,
      servico,
      mensagem,
      extras,
      pagina: typeof window === 'undefined' ? null : window.location.href,
      utm_source: utm.utm_source || null,
      utm_medium: utm.utm_medium || null,
      utm_campaign: utm.utm_campaign || null,
      utm_content: utm.utm_content || null,
    })

  if (error) {
    console.error('Erro ao gravar lead:', error.message)
    return { ok: false, error }
  }

  return { ok: true }
}
