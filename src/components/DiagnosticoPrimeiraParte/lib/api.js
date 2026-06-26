import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://nhbpvmfrdsttbnbdsqlo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oYnB2bWZyZHN0dGJuYmRzcWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODQ3OTAsImV4cCI6MjA5ODA2MDc5MH0.a07JFkGNRjTKPxFtj0O0gQpY4JiW1ANH90rdBP8Ti7U'
)

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

export function trackEvent(event, data = {}) {
  if (typeof window === 'undefined') return
  const utm = getUTMParams()
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, ...data, ...utm, ts: Date.now() }),
  }).catch(() => {})
}

const RENVCHAT_KEY = 'crz_jKyX6g0OSa7Bh-yvwfNpfX5J_gk6K9n0'
const RENVCHAT_URL = 'https://app.renvchat.com.br/api/v1'

function formatAnswersForRenv(answers) {
  if (!answers || typeof answers !== 'object') return { notes: [], contactNotes: '' }
  const labeled = toLabels(answers)
  const lines = Object.entries(labeled)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([key, value]) => {
      const vals = Array.isArray(value) ? value.join(', ') : value
      return `${key}: ${vals}`
    })
  return { notes: lines, contactNotes: lines.join('\n') }
}

async function submitToRenvChatDirect(payload) {
  const { nome, whatsapp, email, answers } = payload
  const { notes, contactNotes } = formatAnswersForRenv(answers)
  const cleaned = whatsapp ? whatsapp.replace(/\D/g, '') : null
  const phone = cleaned ? (cleaned.startsWith('55') ? cleaned : `55${cleaned}`) : null
  if (!phone) return

  const res = await fetch(`${RENVCHAT_URL}/deals/create`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RENVCHAT_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contact: { phone, name: nome || phone, ...(email ? { email } : {}), ...(contactNotes ? { notes: contactNotes } : {}) },
      kanban: { sector_id: '072d56e0-c26c-45f1-a100-2635415a61d3', column_id: '8cc5624f-b380-44e0-8136-19bb740468e3' },
      deal: { lead_source: 'Diagnóstico - Site' },
      notes,
    }),
  })

  const data = await res.json()
  if (!res.ok) { console.error('[RenvChat] Erro ao criar deal:', data); return }

  const contactId = data.deal?.contact?.id
  if (contactId) {
    fetch(`${RENVCHAT_URL}/contacts/tags`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RENVCHAT_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact_id: contactId, tag_ids: ['e15235d7-4864-4070-bc7a-d6c2ff8c1e88'] }),
    }).catch((e) => console.error('[RenvChat] Erro ao aplicar etiqueta:', e))
  }
}

export async function submitToRenvChat(payload) {
  const utm = getUTMParams()

  const [supabaseResult, renvResult] = await Promise.allSettled([
    supabase.from('leads').insert({
      nome: payload.nome,
      whatsapp: payload.whatsapp,
      email: payload.email,
      pessoal_confirm: payload.pessoalConfirm,
      answers: toLabels(payload.answers),
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_content: utm.utm_content,
    }),
    submitToRenvChatDirect(payload),
  ])

  if (supabaseResult.status === 'rejected' || supabaseResult.value?.error) {
    console.error('Erro Supabase:', supabaseResult.reason || supabaseResult.value?.error)
  }
  if (renvResult.status === 'rejected') {
    console.error('Erro RenvChat:', renvResult.reason)
  }

  return { ok: true }
}