// =================================================================
// QUESTIONS — mesmas do Protocolo Advogado Silencioso
// =================================================================

export const QUESTIONS = [
  {
    id: 'q1',
    label: 'Área de atuação',
    help: 'Cada área tem um cliente bem diferente. Trabalhista chega com raiva. Família com vergonha. Cível com dúvida. Você atua mais com qual tipo?',
    microfeedback: '+12 pontos ao seu score',
    type: 'radio',
    options: [
      { value: 'trabalhista', label: 'Trabalhista' },
      { value: 'familia', label: 'Família e Sucessões' },
      { value: 'civel', label: 'Cível / Consumidor' },
      { value: 'criminal', label: 'Criminal' },
      { value: 'previdenciario', label: 'Previdenciário' },
      { value: 'empresarial', label: 'Empresarial' },
      { value: 'tributario', label: 'Tributário' },
      { value: 'outro', label: 'Outro' },
    ],
  },
  {
    id: 'q2',
    label: 'Tempo de atuação',
    help: 'Quanto tempo de carreira? Isso muda o que vamos recomendar depois.',
    microfeedback: '+8 pontos',
    type: 'radio',
    options: [
      { value: 'iniciante', label: 'Ainda me formando / até 2 anos' },
      { value: '2a5', label: '2 a 5 anos' },
      { value: '5a10', label: '5 a 10 anos' },
      { value: '10+', label: 'Mais de 10 anos' },
    ],
  },
  {
    id: 'q3',
    label: 'Como captam clientes hoje',
    help: 'Hoje, como chegam clientes no seu escritório? (pode escolher mais de uma)',
    microfeedback: 'Marcou só indicação? Isso é um risco que vamos mostrar no final.',
    type: 'checkbox',
    options: [
      { value: 'indicacao', label: 'Indicação (amigos, colegas, ex-clientes)' },
      { value: 'google', label: 'Google / Buscas orgânicas' },
      { value: 'instagram', label: 'Instagram ativo' },
      { value: 'anuncios', label: 'Anúncios pagos' },
      { value: 'parcerias', label: 'Parcerias com outros profissionais' },
      { value: 'eventos', label: 'Eventos / networking presencial' },
    ],
  },
  {
    id: 'q4',
    label: 'Volume de contatos novos',
    help: 'Em média, quantas pessoas NOVAS te procuram por mês? (WhatsApp, ligação, e-mail)',
    microfeedback: 'Esse número multiplica o impacto. Quanto maior, mais a gente tem a mostrar no final.',
    type: 'radio',
    options: [
      { value: 'menos10', label: 'Menos de 10' },
      { value: '10a30', label: '10 a 30' },
      { value: '30a60', label: '30 a 60' },
      { value: '60a100', label: '60 a 100' },
      { value: 'mais100', label: 'Mais de 100' },
    ],
  },
  {
    id: 'q5',
    label: 'Ticket médio do serviço',
    help: 'Qual o valor MÉDIO do seu serviço / causa? (se variar muito, pega uma média)',
    microfeedback: '+10 pontos: faltam 3 perguntas pra ver seu score',
    type: 'radio',
    options: [
      { value: 'ate2k', label: 'Até R$ 2.000' },
      { value: '2a5k', label: 'R$ 2.000 a R$ 5.000' },
      { value: '5a10k', label: 'R$ 5.000 a R$ 10.000' },
      { value: '10a20k', label: 'R$ 10.000 a R$ 20.000' },
      { value: 'acima20k', label: 'Acima de R$ 20.000' },
    ],
  },
  {
    id: 'q6',
    label: 'Tempo de resposta no WhatsApp',
    help: 'Quando alguém manda mensagem nova no seu WhatsApp, em quanto tempo você responde? (sendo honesto, sem maquiagem)',
    microfeedback: 'Cada hora a mais = X% a menos de conversão (dados de Harvard + Clio Trends)',
    type: 'radio',
    options: [
      { value: '5a30', label: '5 a 30 minutos' },
      { value: '30a60', label: '30 min a 1 hora' },
      { value: '1a3h', label: '1 a 3 horas' },
      { value: 'mais3h', label: 'Mais de 3 horas / só no dia seguinte' },
    ],
  },
  {
    id: 'q7',
    label: 'Canais digitais ativos',
    help: 'Quais desses canais você tem HOJE funcionando de verdade? (pode marcar vários)',
    microfeedback: 'Última técnica! Marcou poucos? Tem coisa importante pra reverter isso.',
    type: 'checkbox-matrix',
    options: [
      { value: 'site', label: 'Site institucional' },
      { value: 'gmb', label: 'Google Meu Negócio' },
      { value: 'instagram', label: 'Instagram ativo' },
      { value: 'linkedin', label: 'LinkedIn ativo' },
      { value: 'whatsapp_business', label: 'WhatsApp Business' },
      { value: 'email', label: 'E-mail marketing' },
      { value: 'anuncios', label: 'Anúncios pagos (Google/Meta)' },
      { value: 'isca', label: 'Isca digital / landing page' },
    ],
  },
  {
    id: 'q8',
    label: 'Cidade/estado',
    help: 'Pra personalizar o relatório com sua realidade regional.',
    microfeedback: 'Quase lá!',
    type: 'radio',
    options: [
      { value: 'SP', label: 'São Paulo' },
      { value: 'RJ', label: 'Rio de Janeiro' },
      { value: 'MG', label: 'Minas Gerais' },
      { value: 'GO', label: 'Goiás' },
      { value: 'PR', label: 'Paraná' },
      { value: 'RS', label: 'Rio Grande do Sul' },
      { value: 'BA', label: 'Bahia' },
      { value: 'PE', label: 'Pernambuco' },
      { value: 'CE', label: 'Ceará' },
      { value: 'SC', label: 'Santa Catarina' },
      { value: 'DF', label: 'Distrito Federal' },
      { value: 'outro', label: 'Outro estado' },
    ],
  },
]

// =================================================================
// TABELAS
// =================================================================
const TABELA_PERDA = {
  '5a30': 0.07,
  '30a60': 0.12,
  '1a3h': 0.14,
  'mais3h': 0.17,
}
const VOLUME_MEDIO = {
  menos10: 5,
  '10a30': 20,
  '30a60': 45,
  '60a100': 80,
  mais100: 120,
}
const TICKET_MEDIO = {
  ate2k: 1500,
  '2a5k': 3500,
  '5a10k': 7500,
  '10a20k': 15000,
  acima20k: 25000,
}

const SIGNALS = {
  1: {
    title: 'Site institucional fraco ou ausente',
    desc: '86% dos seus futuros clientes pesquisam online antes de te chamar. Seu site atual pode estar afastando quem já te indicou.',
    source: 'Martindale-Avvo 2023',
  },
  2: {
    title: 'Dependência de indicação',
    desc: '85% dos advogados recebem clientes só por indicação. Se essa fonte secar, seu escritório fica vulnerável.',
    source: 'LETS Marketing / Leaders League',
  },
  3: {
    title: 'Tempo de resposta alto',
    desc: 'Cada hora sem responder no WhatsApp = 7-15% de chance de perder o lead. Você tá perdendo leads todos os dias.',
    source: 'Harvard Business Review',
  },
  4: {
    title: 'Sem fluxo de triagem no WhatsApp',
    desc: 'Leads quentes esfriam esperando. Um lead Trabalhista vale R$ 5k+. Você perde 1 por semana?',
    source: 'Clio Legal Trends 2023',
  },
  5: {
    title: 'Maturidade digital baixa',
    desc: '61% dos escritórios têm dificuldade de se destacar. Seu digital tá te ajudando a fugir dessa estatística?',
    source: 'LETS Marketing / Leaders League',
  },
  6: {
    title: 'Google Meu Negócio ausente',
    desc: 'GMB otimizado aumenta 7x a chance de ser encontrado em buscas locais. Você não tem. Seus concorrentes sim.',
    source: 'Google Business Profile',
  },
  7: {
    title: 'Canais de atendimento frágeis',
    desc: '48% dos escritórios ficam inalcançáveis por telefone. WhatsApp Business bem configurado resolve isso em 48h.',
    source: 'Clio Trends 2023',
  },
  8: {
    title: 'Sem tráfego pago / demanda ativa',
    desc: '96% das oportunidades pró-ativas viram cliente. Quem te procura com intenção real, fecha. Você tá perdendo esse canal.',
    source: 'LETS Marketing',
  },
  9: {
    title: 'Sem calculadora de rescisão',
    desc: 'Calculadoras de rescisão viralizam no Google. Seus clientes procuram. Se você não tem, seu concorrente tem.',
    source: 'Google Trends',
  },
  10: {
    title: 'Reputação offline sem lastro digital',
    desc: '10+ anos de experiência sem estrutura digital = reputação construída que o digital não sustenta.',
    source: 'Análise One Impact',
  },
  11: {
    title: 'Fase decisiva sem estrutura',
    desc: '2-5 anos é a fase que decide: ou você vira referência, ou fica pra trás. Digital fraco puxa pro segundo caminho.',
    source: 'Análise One Impact',
  },
  12: {
    title: 'Redes sociais isoladas',
    desc: 'Só Instagram ou só LinkedIn não captam cliente. Você precisa de uma estrutura integrada que una tudo.',
    source: 'Análise One Impact',
  },
  13: {
    title: 'Volume alto, ticket baixo',
    desc: 'Você tá trocando volume por qualidade. Aumentar ticket é mais lucrativo que dobrar volume.',
    source: 'Análise One Impact',
  },
  14: {
    title: 'Ticket alto, volume baixo',
    desc: 'Cada lead vale muito. Cuidar do atendimento é crítico pra não perder os poucos que chegam.',
    source: 'Análise One Impact',
  },
  15: {
    title: 'Sem SEO local',
    desc: '76% das buscas jurídicas têm intenção local. Sem Google Meu Negócio, você não aparece.',
    source: 'Think with Google',
  },
}

// =================================================================
// SCORE / IMPACTO / SINAIS / PLANO
// =================================================================
export function calculateScore(answers) {
  let score = 0
  if (answers.q7 && typeof answers.q7 === 'object') {
    const canaisMarcados = Object.values(answers.q7).filter(Boolean).length
    score += canaisMarcados * 10
  }
  if (answers.q2 === '10+') score += 10
  else if (answers.q2 === '5a10') score += 8
  else if (answers.q2 === '2a5') score += 5
  else if (answers.q2 === 'iniciante') score += 2
  if (answers.q6 === '5a30') score += 7
  else if (answers.q6 === '30a60') score += 4
  else if (answers.q6 === '1a3h') score += 2
  return Math.min(100, score)
}

export function calculateImpact(answers) {
  const leads = VOLUME_MEDIO[answers.q4] || 0
  const ticket = TICKET_MEDIO[answers.q5] || 0
  const taxa = TABELA_PERDA[answers.q6] || 0
  const impactoBruto = leads * ticket * taxa
  const impacto = Math.round(impactoBruto * 0.5)
  return { mensal: impacto, anual: impacto * 12, leads, ticket, taxa }
}

export function chooseSignals(answers) {
  const candidatos = []
  const canais = answers.q7 || {}
  const canaisMarcados = Object.values(canais).filter(Boolean).length
  const capta = Array.isArray(answers.q3) ? answers.q3 : []

  if (capta.length === 1 && capta[0] === 'indicacao') {
    candidatos.push({ id: 2, categoria: 'captação' })
  } else if (capta.length > 0 && !capta.includes('anuncios') && !capta.includes('google')) {
    candidatos.push({ id: 8, categoria: 'captação' })
  }
  if (answers.q6 === '1a3h' || answers.q6 === 'mais3h') candidatos.push({ id: 3, categoria: 'atendimento' })
  else if (answers.q6 === '30a60') candidatos.push({ id: 7, categoria: 'atendimento' })
  if (!canais.whatsapp_business) candidatos.push({ id: 4, categoria: 'atendimento' })
  if (!canais.site) candidatos.push({ id: 1, categoria: 'presença' })
  if (!canais.gmb) candidatos.push({ id: 6, categoria: 'presença' })
  if (canaisMarcados < 4) candidatos.push({ id: 5, categoria: 'presença' })
  if (answers.q1 === 'trabalhista' && !canais.site) candidatos.push({ id: 9, categoria: 'área' })
  if (answers.q2 === '10+' && canaisMarcados < 4) candidatos.push({ id: 10, categoria: 'experiência' })
  else if (answers.q2 === '2a5' && canaisMarcados < 4) candidatos.push({ id: 11, categoria: 'experiência' })
  const redes = ['instagram', 'linkedin'].filter((c) => canais[c]).length
  const canaisEstruturais = ['site', 'gmb', 'whatsapp_business'].filter((c) => canais[c]).length
  if (redes > 0 && canaisEstruturais === 0) candidatos.push({ id: 12, categoria: 'presença' })
  const volumeAlto = answers.q4 === '60a100' || answers.q4 === 'mais100'
  const volumeBaixo = answers.q4 === 'menos10' || answers.q4 === '10a30'
  const ticketBaixo = answers.q5 === 'ate2k'
  const ticketAlto = answers.q5 === '10a20k' || answers.q5 === 'acima20k'
  if (volumeAlto && ticketBaixo) candidatos.push({ id: 13, categoria: 'oportunidade' })
  else if (volumeBaixo && ticketAlto) candidatos.push({ id: 14, categoria: 'oportunidade' })
  if (canaisMarcados < 4 && !canais.gmb && (answers.q2 === '5a10' || answers.q2 === '10+')) {
    candidatos.push({ id: 15, categoria: 'presença' })
  }

  const resultado = []
  const usados = new Set()
  const c = candidatos.find((x) => x.categoria === 'captação' && !usados.has(x.id))
  if (c) { resultado.push(c); usados.add(c.id) }
  const a = candidatos.find((x) => x.categoria === 'atendimento' && !usados.has(x.id))
  if (a) { resultado.push(a); usados.add(a.id) }
  const p = candidatos.find((x) => x.categoria === 'presença' && !usados.has(x.id))
  if (p) { resultado.push(p); usados.add(p.id) }
  for (const cand of candidatos) {
    if (resultado.length >= 3) break
    if (!usados.has(cand.id)) { resultado.push(cand); usados.add(cand.id) }
  }
  return resultado.slice(0, 3).map((c) => ({ ...c, ...SIGNALS[c.id] }))
}

export function generatePlano(answers, sinaisEscolhidos) {
  const sinaisIds = sinaisEscolhidos.map((s) => s.id)
  const canais = answers.q7 || {}
  const plano = { curto: [], medio: [], longo: [] }

  if (sinaisIds.includes(3) || sinaisIds.includes(7)) {
    plano.curto.push('Configurar WhatsApp Business com mensagem automática de primeira resposta')
  }
  if (sinaisIds.includes(4)) {
    plano.curto.push('Criar fluxo de triagem administrativa no WhatsApp (menu → categorias → atendimento)')
  }
  if (sinaisIds.includes(1) || sinaisIds.includes(6) || sinaisIds.includes(15)) {
    plano.curto.push('Configurar/atualizar Google Meu Negócio com informações completas, fotos e horário')
  }
  if (sinaisIds.includes(2)) {
    plano.curto.push('Listar os 5 principais indicadores da sua experiência (formação, casos, áreas) pra reforçar o posicionamento')
  }
  if (plano.curto.length < 3) {
    if (!canais.whatsapp_business) plano.curto.push('Migrar do WhatsApp pessoal para o WhatsApp Business')
    if (!canais.gmb) plano.curto.push('Criar/otimizar Google Meu Negócio com posts semanais')
    if (plano.curto.length < 3) plano.curto.push('Definir os 3 diferenciais do seu escritório que vão aparecer em todo canal digital')
  }

  if (sinaisIds.includes(1) || sinaisIds.includes(5)) {
    plano.medio.push('Desenvolver site institucional com copy alinhada ao marketing jurídico (Provimento 205/2021)')
  }
  if (sinaisIds.includes(2) || sinaisIds.includes(12)) {
    plano.medio.push('Criar conteúdo educativo semanal (Instagram/LinkedIn) com narrativas de autoridade')
  }
  if (sinaisIds.includes(9)) {
    plano.medio.push('Implementar calculadora de rescisão interativa como isca no site (viraliza no Google)')
  }
  if (sinaisIds.includes(8)) {
    plano.medio.push('Avaliar investimento em Google Ads pra palavras-chave de captação local')
  }
  if (plano.medio.length < 3) {
    if (!canais.isca) plano.medio.push('Criar uma isca digital (quiz/calculadora) pra qualificar leads antes do WhatsApp')
    if (!canais.email) plano.medio.push('Implementar e-mail marketing com conteúdo educativo mensal')
    if (plano.medio.length < 3) plano.medio.push('Padronizar identidade visual e tom de voz em todos os canais')
  }

  plano.longo.push('Ativar o Sistema de Conversão Inteligente: atende, qualifica e agenda automaticamente, sem você precisar responder manualmente')
  plano.longo.push('Implantar o Monitor de Performance: análise contínua do funil pra identificar gargalos e oportunidades de otimização')
  plano.longo.push('Construir o Mapa de Vazamentos de Clientes: dashboard centralizado mostrando exatamente onde, quando e por que você tá perdendo leads')

  return plano
}

export function recommendPackage(answers) {
  const leads = VOLUME_MEDIO[answers.q4] || 0
  const ticketAlto = answers.q5 === '10a20k' || answers.q5 === 'acima20k'
  if (leads >= 80 || ticketAlto) {
    return {
      nome: 'Premium',
      preco: 'R$ 5.997',
      desc: 'Análise de Perdas Ocultas personalizada pra sua área + Sistema de Conversão Inteligente + estrutura completa',
      features: [
        'Site institucional sobrio e otimizado pra SEO',
        'Análise de Perdas Ocultas (sua isca interativa: quiz, calculadora ou diagnóstico específico do seu nicho)',
        'Sistema de Conversão Inteligente configurado (atende/qualifica/agenda 24/7)',
        'Calculadora personalizada pra sua área de atuação',
        'Mapa de Vazamentos de Clientes (dashboard em tempo real)',
        'Monitor de Performance + 30 dias de suporte',
      ],
    }
  }
  if (leads >= 20) {
    return {
      nome: 'Profissional',
      preco: 'R$ 3.000',
      desc: 'Site + Sistema de Conversão Inteligente com fluxo de triagem (sem Análise de Perdas no primeiro momento)',
      features: [
        'Site institucional responsivo',
        'WhatsApp Business configurado',
        'Sistema de Conversão Inteligente com fluxo de triagem',
        'Mensagens-modelo prontas',
        'Integração com Google Meu Negócio',
        'Treinamento básico',
      ],
    }
  }
  return {
    nome: 'Essencial',
    preco: 'R$ 1.497',
    desc: 'Site institucional + setup WhatsApp Business (porta de entrada)',
    features: [
      'Landing page profissional',
      'WhatsApp Business configurado',
      'Mensagem automática de primeira resposta',
      'Google Meu Negócio básico',
      'Suporte por 30 dias',
    ],
  }
}

export function getScoreFaixa(score) {
  if (score >= 80) return { label: 'Excelente', emoji: '🟢', cor: 'text-emerald-400' }
  if (score >= 60) return { label: 'Bem estruturado', emoji: '🔵', cor: 'text-blue-400' }
  if (score >= 40) return { label: 'Precisa de atenção', emoji: '🟡', cor: 'text-yellow-400' }
  if (score >= 20) return { label: 'Estrutura frágil', emoji: '🟠', cor: 'text-orange-400' }
  return { label: 'Estrutura crítica', emoji: '🔴', cor: 'text-red-400' }
}
