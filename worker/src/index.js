const ALLOWED_ORIGINS = new Set([
  'https://agenciaoneimpact.com.br',
  'https://www.agenciaoneimpact.com.br',
  'http://localhost:4321',
])

const RENVCHAT_URL = 'https://app.renvchat.com.br/api/v1'
const SECTOR_ID = '072d56e0-c26c-45f1-a100-2635415a61d3'
const COLUMN_ID = '8cc5624f-b380-44e0-8136-19bb740468e3'
const TAG_ID = 'e15235d7-4864-4070-bc7a-d6c2ff8c1e88'

// Mesmo mapa de labels usado em src/components/DiagnosticoPrimeiraParte/lib/api.js —
// mantenha os dois em sincronia se as perguntas do formulário mudarem.
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

function corsHeaders(origin) {
  const headers = { Vary: 'Origin' }
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Content-Type'
  }
  return headers
}

function json(data, status, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  })
}

function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') return 'Payload inválido'
  const { nome, whatsapp, email, answers } = payload

  if (!nome || typeof nome !== 'string' || nome.trim().length < 2 || nome.length > 200) {
    return 'Nome inválido'
  }

  const digits = typeof whatsapp === 'string' ? whatsapp.replace(/\D/g, '') : ''
  if (digits.length < 10 || digits.length > 13) return 'WhatsApp inválido'

  if (
    email !== undefined &&
    email !== '' &&
    (typeof email !== 'string' || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    return 'Email inválido'
  }

  if (answers !== undefined && (typeof answers !== 'object' || Array.isArray(answers))) {
    return 'Respostas inválidas'
  }
  if (answers && JSON.stringify(answers).length > 5000) return 'Respostas muito grandes'

  return null
}

async function createDeal(payload, key) {
  const { nome, whatsapp, email, answers } = payload
  const { notes, contactNotes } = formatAnswersForRenv(answers)
  const cleaned = whatsapp.replace(/\D/g, '')
  const phone = cleaned.startsWith('55') ? cleaned : `55${cleaned}`

  const res = await fetch(`${RENVCHAT_URL}/deals/create`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contact: {
        phone,
        name: nome || phone,
        ...(email ? { email } : {}),
        ...(contactNotes ? { notes: contactNotes } : {}),
      },
      kanban: { sector_id: SECTOR_ID, column_id: COLUMN_ID },
      deal: { lead_source: 'Diagnóstico - Site' },
      notes,
    }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(`RenvChat deals/create ${res.status}: ${JSON.stringify(data)}`)
  return data
}

async function applyTag(contactId, key) {
  const res = await fetch(`${RENVCHAT_URL}/contacts/tags`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ contact_id: contactId, tag_ids: [TAG_ID] }),
  })
  if (!res.ok) console.error('[Worker] Erro ao aplicar etiqueta:', res.status, await res.text())
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin')
    const cors = corsHeaders(origin)

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })

    const url = new URL(request.url)
    if (url.pathname !== '/submit' || request.method !== 'POST') {
      return json({ ok: false, error: 'Not found' }, 404, cors)
    }

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return json({ ok: false, error: 'Origin not allowed' }, 403, cors)
    }

    let payload
    try {
      payload = await request.json()
    } catch {
      return json({ ok: false, error: 'Invalid JSON' }, 400, cors)
    }

    const validationError = validatePayload(payload)
    if (validationError) return json({ ok: false, error: validationError }, 400, cors)

    try {
      const data = await createDeal(payload, env.RENVCHAT_KEY)
      const contactId = data.deal?.contact?.id
      if (contactId) {
        ctx.waitUntil(applyTag(contactId, env.RENVCHAT_KEY))
      }
      return json({ ok: true, dealId: data.deal?.id }, 200, cors)
    } catch (err) {
      console.error('[Worker] Erro RenvChat:', err)
      return json({ ok: false, error: 'Upstream error' }, 502, cors)
    }
  },
}
