import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseConfig.js'
import { rastrearLead } from './track.js'

// Banco central de leads da One Impact, compartilhado com o LinkFlow e com a
// landing do cupom da Hostinger. Todo formulário de qualquer frente grava na
// mesma tabela `leads`, separado pela coluna `origem`. A chave pública e a
// explicação do RLS estão em supabaseConfig.js.

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

  rastrearLead(origem)
  return { ok: true }
}
