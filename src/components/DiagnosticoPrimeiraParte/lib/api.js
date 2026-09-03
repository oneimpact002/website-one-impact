import { salvarLead, ORIGENS, getUTMParams } from '../../../lib/leads.js'

const LABELS = {
  segmento: { juridico: 'Advocacia / Jurídico', saude: 'Saúde', contabil: 'Contábil / Financeiro', tech: 'Tecnologia / SaaS / Agência digital', educacao: 'Educação / Cursos / Coaching / Mentoria', imobiliario: 'Imobiliário', estetica: 'Estética / Beleza / Bem-estar', construcao: 'Engenharia / Construção / Arquitetura', varejo: 'Varejo / E-commerce / Produto físico', alimentacao: 'Alimentação', industria: 'Indústria / Logística / Operacional', outro: 'Outro segmento' },
  tempoAtuacao: { ate2anos: 'Até 2 anos', '2a5anos': '2 a 5 anos', '5a10anos': '5 a 10 anos', mais10anos: 'Mais de 10 anos' },
  canais: { indicacao: 'Indicação', google: 'Google / Buscas orgânicas', instagram: 'Instagram ativo', anuncios: 'Anúncios pagos', parcerias: 'Parcerias', eventos: 'Eventos / networking presencial' },
  leads: { menos20: 'Menos de 20', '20a50': 'Entre 20 e 50', '50a100': 'Entre 50 e 100', mais100: 'Mais de 100', naossei: 'Não sei' },
  valorMedio: { ate100: 'Até R$ 100', '100a300': 'R$ 100 – R$ 300', '300a500': 'R$ 300 – R$ 500', '500a1000': 'R$ 500 – R$ 1.000', '1000a3000': 'R$ 1.000 – R$ 3.000', '3000a5000': 'R$ 3.000 – R$ 5.000', '5000a10000': 'R$ 5.000 – R$ 10.000', '10000a20000': 'R$ 10.000 – R$ 20.000', acima20000: 'Acima de R$ 20.000' },
  tempoResposta: { '30min': '5 a 30 minutos', '1h': '30 min a 1 hora', '3h': '1 a 3 horas', mais: 'Mais de 3 horas / só no dia seguinte' },
  estrutura: { site: 'Site institucional', gmb: 'Google Meu Negócio', instagram: 'Instagram ativo', landing: 'Landing Page', whatsapp_business: 'WhatsApp Business', email_marketing: 'E-mail marketing', anuncios: 'Anúncios pagos (Google/Meta)', isca: 'Isca digital' },
  atualizacaoSite: { ate1ano: 'Últimos 12 meses', '1a2anos': '1 a 2 anos sem atualizar', mais3anos: '3+ anos sem mexer', naosei: 'Não lembra' },
  automacao: { nenhuma: 'Nenhuma', padrao: 'Mensagem automática padrão', chatbot: 'Chatbot', ia: 'IA inteligente', naossei: 'Tem mas não sabe como funciona' },
}

function toLabels(answers) {
  if (!answers) return {}
  return Object.fromEntries(
    Object.entries(answers).map(([key, val]) => {
      const map = LABELS[key]
      if (!map) return [key, val]
      if (Array.isArray(val)) return [key, val.map((v) => map[v] || v)]
      return [key, map[val] || val]
    })
  )
}

// =================================================================
// Validações e formatação
// =================================================================

export function validateWhatsApp(value) {
  const cleaned = value.replace(/\D/g, '')
  return (cleaned.length === 11 && /^[1-9][1-9]9[0-9]{8}$/.test(cleaned)) || cleaned.length === 10
}

export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function validateNome(value) {
  const trimmed = value.trim()
  const parts = trimmed.split(/\s+/)
  return parts.length >= 2 && parts.every((p) => p.length >= 2)
}

export function formatWhatsApp(value) {
  const cleaned = value.replace(/\D/g, '').slice(0, 11)
  if (cleaned.length === 0) return ''
  if (cleaned.length <= 2) return `(${cleaned}`
  if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
  if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
}

export { getUTMParams }

export function trackEvent(event, data = {}) {
  if (typeof window === 'undefined') return
  const utm = getUTMParams()
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, ...data, ...utm, ts: Date.now() }),
  }).catch(() => {})
}

// Endereço público do Worker que faz proxy pra RenvChat (a chave da API fica só
// como secret no Worker, nunca aqui — ver worker/src/index.js). Preencher com a
// URL retornada por `wrangler deploy` antes do build final de produção.
const WORKER_URL = 'https://one-impact-renvchat-proxy.workers.dev'

async function submitToRenvChatViaWorker(payload) {
  const cleaned = payload.whatsapp ? payload.whatsapp.replace(/\D/g, '') : null
  if (!cleaned) return

  const res = await fetch(`${WORKER_URL}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: payload.nome,
      whatsapp: payload.whatsapp,
      email: payload.email,
      answers: payload.answers,
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(`RenvChat worker error: ${res.status} ${JSON.stringify(data)}`)
  }
}

export async function submitToRenvChat(payload) {
  // As respostas do diagnostico sao especificas desta frente, entao vao em
  // `extras` na tabela central em vez de virar coluna.
  const [supabaseResult, renvResult] = await Promise.allSettled([
    salvarLead({
      origem: ORIGENS.diagnostico,
      nome: payload.nome,
      email: payload.email,
      telefone: payload.whatsapp,
      extras: {
        respostas: toLabels(payload.answers),
        pessoal_confirm: payload.pessoalConfirm,
      },
    }),
    submitToRenvChatViaWorker(payload),
  ])

  if (supabaseResult.status === 'rejected' || supabaseResult.value?.error) {
    console.error('Erro Supabase:', supabaseResult.reason || supabaseResult.value?.error)
  }
  if (renvResult.status === 'rejected') {
    console.error('Erro RenvChat:', renvResult.reason)
  }

  return { ok: true }
}