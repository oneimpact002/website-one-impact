// =================================================================
// QUESTIONS — Diagnóstico Geral One Impact
// =================================================================

export const QUESTIONS = [
  {
    id: 'segmento',
    label: 'Seu segmento de atuação',
    help: 'Cada segmento tem um cliente bem diferente. Escolha o que mais se aproxima do seu negócio hoje.',
    microfeedback: 'Segmento registrado',
    type: 'radio',
    options: [
      { value: 'juridico', label: 'Advocacia / Jurídico' },
      { value: 'saude', label: 'Saúde (médico, dentista, psicólogo, nutricionista...)' },
      { value: 'contabil', label: 'Contábil / Financeiro (contador, consultor, corretor...)' },
      { value: 'tech', label: 'Tecnologia / SaaS / Agência digital' },
      { value: 'educacao', label: 'Educação / Cursos / Coaching / Mentoria' },
      { value: 'imobiliario', label: 'Imobiliário (corretor, incorporadora, arquitetura...)' },
      { value: 'estetica', label: 'Estética / Beleza / Bem-estar' },
      { value: 'construcao', label: 'Engenharia / Construção / Arquitetura' },
      { value: 'varejo', label: 'Varejo / E-commerce / Produto físico' },
      { value: 'alimentacao', label: 'Alimentação (restaurante, delivery, franquia...)' },
      { value: 'industria', label: 'Indústria / Logística / Operacional' },
      { value: 'outro', label: 'Outro segmento' },
    ],
  },
  {
    id: 'tempoAtuacao',
    label: 'Tempo de atuação',
    help: 'Há quanto tempo você (ou seu negócio) atua no mercado? Isso muda o que vamos recomendar depois.',
    microfeedback: '+8 pontos',
    type: 'radio',
    options: [
      { value: 'ate2anos', label: 'Estou começando / até 2 anos' },
      { value: '2a5anos', label: '2 a 5 anos' },
      { value: '5a10anos', label: '5 a 10 anos' },
      { value: 'mais10anos', label: 'Mais de 10 anos' },
    ],
  },
  {
    id: 'canais',
    label: 'Como você conquista clientes hoje',
    help: 'Quais são os principais canais que trazem clientes novos pro seu negócio? (pode escolher mais de uma)',
    microfeedback: 'Marcou só indicação? Dependência de uma fonte só é um risco que vamos mostrar no final.',
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
    id: 'leads',
    label: 'Quantos contatos novos você recebe por mês?',
    help: 'Não precisa ser exato — uma estimativa já ajuda a calcular o impacto.',
    microfeedback: 'Esse número é o multiplicador do resultado final',
    type: 'radio',
    options: [
      { value: 'menos20', label: 'Menos de 20' },
      { value: '20a50', label: 'Entre 20 e 50' },
      { value: '50a100', label: 'Entre 50 e 100' },
      { value: 'mais100', label: 'Mais de 100' },
      { value: 'naossei', label: 'Não sei' },
    ],
  },
  {
    id: 'valorMedio',
    label: 'Valor médio do seu serviço',
    help: 'Quanto, em média, cada cliente paga pra fechar com você? (se variar muito, pega uma média aproximada)',
    microfeedback: '+10 pontos: faltam 3 perguntas pra ver seu score',
    type: 'radio',
    options: [
      { value: 'ate100',      label: 'Até R$ 100' },
      { value: '100a300',     label: 'R$ 100 – R$ 300' },
      { value: '300a500',     label: 'R$ 300 – R$ 500' },
      { value: '500a1000',    label: 'R$ 500 – R$ 1.000' },
      { value: '1000a3000',   label: 'R$ 1.000 – R$ 3.000' },
      { value: '3000a5000',   label: 'R$ 3.000 – R$ 5.000' },
      { value: '5000a10000',  label: 'R$ 5.000 – R$ 10.000' },
      { value: '10000a20000', label: 'R$ 10.000 – R$ 20.000' },
      { value: 'acima20000',  label: 'Acima de R$ 20.000' },
    ],
  },
  {
    id: 'tempoResposta',
    label: 'Tempo de resposta no WhatsApp',
    help: 'Quando alguém manda mensagem nova no seu WhatsApp, em quanto tempo você responde? (sendo honesto)',
    microfeedback: 'Cada hora a mais = queda na chance de fechar o cliente (dados de Harvard Business Review)',
    type: 'radio',
    options: [
      { value: '30min', label: '5 a 30 minutos' },
      { value: '1h', label: '30 min a 1 hora' },
      { value: '3h', label: '1 a 3 horas' },
      { value: 'mais', label: 'Mais de 3 horas / só no dia seguinte' },
    ],
  },
  {
    id: 'estrutura',
    label: 'Estrutura digital atual',
    help: 'Quais desses itens você tem HOJE funcionando de verdade no seu negócio? (pode marcar vários)',
    microfeedback: 'Marcou poucos? Tem coisa importante pra reverter isso.',
    type: 'checkbox',
    options: [
      { value: 'site', label: 'Site institucional' },
      { value: 'gmb', label: 'Google Meu Negócio' },
      { value: 'instagram', label: 'Instagram ativo' },
      { value: 'landing', label: 'Landing Page' },
      { value: 'whatsapp_business', label: 'WhatsApp Business' },
      { value: 'email_marketing', label: 'E-mail marketing' },
      { value: 'anuncios', label: 'Anúncios pagos (Google/Meta)' },
      { value: 'isca', label: 'Página com isca digital (quiz, aula gratuita, e-book)' },
    ],
  },
  {
    id: 'atualizacaoSite',
    label: 'Quando foi a última atualização do seu site ou landing page?',
    help: 'A última vez que você mexeu no design, conteúdo ou informações (não vale post de blog).',
    microfeedback: 'Site parado no tempo passa a impressão errada. Seu cliente nota.',
    type: 'radio',
    conditional: (answers) => {
      const estrutura = Array.isArray(answers.estrutura) ? answers.estrutura : []
      return estrutura.includes('site') || estrutura.includes('landing')
    },
    options: [
      { value: 'ate1ano', label: 'Atualizado nos últimos 12 meses' },
      { value: '1a2anos', label: '1 a 2 anos sem atualizar' },
      { value: 'mais3anos', label: '3+ anos sem mexer' },
      { value: 'naosei', label: 'Tenho site mas nem lembro a última vez que mexi' },
    ],
  },
  {
    id: 'automacao',
    label: 'Você tem alguma automação de atendimento hoje?',
    help: 'Pense no WhatsApp, Instagram, e-mail ou qualquer canal onde clientes te procuram. Tem algo respondendo por você quando tá ocupado?',
    microfeedback: 'Sem automação, cada lead depende do seu humor e horário.',
    type: 'radio',
    options: [
      { value: 'nenhuma', label: 'Nenhuma' },
      { value: 'padrao', label: 'Mensagem automática padrão do WhatsApp' },
      { value: 'chatbot', label: 'Automação estilo chatbot (clique 1 para, clique 2 para...)' },
      { value: 'ia', label: 'Automação com IA inteligente' },
      { value: 'naossei', label: 'Tenho automação, mas não sei dizer como funciona' },
    ],
  },
]

// =================================================================
// CONSTANTS
// =================================================================

const VALOR_MEDIO_MAP = {
  ate100:       70,
  '100a300':    200,
  '300a500':    400,
  '500a1000':   750,
  '1000a3000':  2000,
  '3000a5000':  4000,
  '5000a10000': 7500,
  '10000a20000': 15000,
  acima20000:   25000,
}

const RESPONSE_LOSS = {
  '30min': 0.25, '1h': 0.40, '3h': 0.60, mais: 0.80,
}

const AUTO_DISCOUNT = { ia: 0.15, chatbot: 0.10, padrao: 0.05, naossei: 0.05, nenhuma: 0 }

const BASE_LEADS = { micro: 30, pequena: 60, media: 100 }

const LEADS_MAP = { menos20: 15, '20a50': 35, '50a100': 75, mais100: 120 }

const RESPONSE_LABELS = {
  '30min': '5–30 min', '1h': '30min–1h', '3h': '1–3h', mais: '+3h',
}

// =================================================================
// CORE CALCULATION
// =================================================================

function getLeadsAndLoss(answers) {
  const canais = Array.isArray(answers.canais) ? answers.canais : []
  let leads = answers.leads !== 'naossei' && LEADS_MAP[answers.leads]
    ? LEADS_MAP[answers.leads]
    : BASE_LEADS[answers.porte] || 30
  if (answers.anuncia === 'sim') leads = Math.round(leads * 1.3)
  if (canais.length === 1 && canais.includes('indicacao')) leads = Math.round(leads * 0.6)

  const baseLoss = RESPONSE_LOSS[answers.tempoResposta] || 0.60
  const finalLoss = Math.max(0, baseLoss - (AUTO_DISCOUNT[answers.automacao] || 0))
  const valorMedio = VALOR_MEDIO_MAP[answers.valorMedio] || 300
  const potentialConv = 0.65
  const actualConv = potentialConv * (1 - finalLoss)
  const missedLeads = Math.round(leads * (potentialConv - actualConv))
  const mensal = Math.round(missedLeads * valorMedio)

  return { leads, finalLoss, valorMedio, missedLeads, mensal }
}

// =================================================================
// EXPORTED FUNCTIONS
// =================================================================

export function calculateScore(answers) {
  const estrutura = Array.isArray(answers.estrutura) ? answers.estrutura : []
  const canais = Array.isArray(answers.canais) ? answers.canais : []
  let score = 0
  if (estrutura.includes('site') || estrutura.includes('landing')) score += 15
  if (estrutura.includes('gmb')) score += 15
  if (estrutura.includes('instagram') || canais.includes('instagram')) score += 10
  if (estrutura.includes('anuncios') || canais.includes('anuncios')) score += 15
  score += Math.min((estrutura.length > 2 ? estrutura.length - 2 : 0) * 3, 15)
  if (answers.automacao === 'ia') score += 15
  else if (answers.automacao === 'chatbot') score += 5
  if (canais.includes('google')) score += 8
  if (answers.tempoResposta === '30min') score += 10
  else if (answers.tempoResposta === '1h') score += 5
  return Math.min(score, 100)
}

export function calculateImpact(answers) {
  const { missedLeads, mensal } = getLeadsAndLoss(answers)
  return { mensal, anual: mensal * 12, missedLeads }
}

export function calcularPotencial(answers) {
  const { missedLeads, mensal } = getLeadsAndLoss(answers)
  return [
    { nome: 'conservador', label: 'Conservador', receitaMensal: Math.round(mensal * 0.5), receitaAnual: Math.round(mensal * 0.5 * 12), clientesMensal: Math.round(missedLeads * 0.3) },
    { nome: 'moderado', label: 'Moderado', receitaMensal: Math.round(mensal * 0.75), receitaAnual: Math.round(mensal * 0.75 * 12), clientesMensal: Math.round(missedLeads * 0.5) },
    { nome: 'otimista', label: 'Otimista', receitaMensal: mensal, receitaAnual: mensal * 12, clientesMensal: missedLeads },
  ]
}

export function chooseSignals(answers) {
  const estrutura = Array.isArray(answers.estrutura) ? answers.estrutura : []
  const canais = Array.isArray(answers.canais) ? answers.canais : []
  const signals = []
  if (!estrutura.includes('site') && !estrutura.includes('landing')) signals.push({ titulo: 'Sem página de destino', descricao: 'Sem site ou landing page, você depende de quem já te conhece. Clientes em pesquisa ativa no Google não te encontram.', fonte: 'HubSpot State of Sales, 2025' })
  if (!estrutura.includes('gmb')) signals.push({ titulo: 'Sem presença no Google', descricao: '93% das buscas locais passam pelo Google. Sem perfil, você é invisível para quem busca perto de você.', fonte: 'Google Local Search Study, 2025' })
  if (['3h', 'mais'].includes(answers.tempoResposta)) signals.push({ titulo: 'Tempo de resposta crítico', descricao: 'Leads respondidos em mais de 1h têm 60–80% de chance de fechar com o concorrente que respondeu primeiro.', fonte: 'Harvard Business Review' })
  if (answers.automacao === 'nenhuma') signals.push({ titulo: 'Sem automação de atendimento', descricao: '40% dos leads chegam fora do horário comercial. Sem automação, esses leads esfriam antes de você ver.', fonte: 'Leadconnect Research, 2024' })
  if (canais.length === 1 && canais.includes('indicacao')) signals.push({ titulo: 'Dependência de indicação', descricao: 'Depender só de indicação significa que seu crescimento está na mão dos outros — e pode parar a qualquer momento.', fonte: 'Digital Marketing Institute' })
  if (!estrutura.includes('anuncios') && !canais.includes('anuncios')) signals.push({ titulo: 'Sem tráfego pago', descricao: 'Alcance orgânico caiu mais de 70% nos últimos 3 anos. Sem tráfego pago, crescimento fica restrito a indicações.', fonte: 'Meta Business Insights, 2024' })
  return signals
}

export function generatePlano() { return [] }

export function recommendPackage() {
  return {
    nome: 'Presença Digital Completa',
    desc: 'Site estratégico + automação + gestão de presença digital',
    features: ['Site profissional', 'Automação WhatsApp com IA', 'Google Meu Negócio otimizado', 'Estratégia de conteúdo'],
  }
}

export function getScoreFaixa(score) {
  if (score <= 30) return { label: 'Invisível', emoji: '🔴', cor: 'text-red-400', color: '#dc2626' }
  if (score <= 50) return { label: 'Frágil', emoji: '🟠', cor: 'text-orange-400', color: '#ea580c' }
  if (score <= 70) return { label: 'Atenção', emoji: '🟡', cor: 'text-yellow-400', color: '#ca8a04' }
  if (score <= 85) return { label: 'Bom', emoji: '🟢', cor: 'text-green-400', color: '#16a34a' }
  return { label: 'Competitivo', emoji: '🔵', cor: 'text-blue-400', color: '#0284c7' }
}

export function calculateDashboard(answers) {
  const score = calculateScore(answers)
  const faixa = getScoreFaixa(score)

  const leadsVal = LEADS_MAP[answers.leads] || BASE_LEADS[answers.porte] || 30
  const valorVal = VALOR_MEDIO_MAP[answers.valorMedio] || 300

  const AUTO_LOSS = { ia: 0.10, chatbot: 0.20, padrao: 0.35, naossei: 0.40, nenhuma: 0.45 }
  const RESP_MOD  = { '30min': -0.10, '1h': -0.05, '3h': 0.10, mais: 0.20 }
  const baseLoss  = AUTO_LOSS[answers.automacao] ?? 0.40
  const respMod   = RESP_MOD[answers.tempoResposta] ?? 0
  const lossRate  = Math.min(Math.max(baseLoss + respMod, 0.10), 0.80)

  const missedLeads = Math.round(leadsVal * lossRate)
  const monthlyLoss = missedLeads * valorVal
  const yearlyLoss  = monthlyLoss * 12
  const costPerDay  = Math.round(monthlyLoss / 30)

  const estrutura = Array.isArray(answers.estrutura) ? answers.estrutura : []
  const canais = Array.isArray(answers.canais) ? answers.canais : []
  const temSite = estrutura.includes('site') || estrutura.includes('landing')
  const temGmb = estrutura.includes('gmb')
  const temAnuncios = estrutura.includes('anuncios') || canais.includes('anuncios')
  const respostaLenta = answers.tempoResposta === '3h' || answers.tempoResposta === 'mais'

  // Velocidade — score baseado em automacao (+ bônus tempo quando sem automação boa)
  const AUTOMACAO_BASE = { ia: 82, chatbot: 62, naossei: 32, padrao: 15, nenhuma: 0 }
  const RESPOSTA_BONUS = { '30min': 22, '1h': 12, '3h': 3, mais: 0 }
  const semAutomacaoBoa = answers.automacao === 'nenhuma' || answers.automacao === 'padrao'
  const velocidadeScore = Math.min(
    (AUTOMACAO_BASE[answers.automacao] || 0) + (semAutomacaoBoa ? (RESPOSTA_BONUS[answers.tempoResposta] || 0) : 0),
    100
  )

  // Confiança digital — score baseado nos itens de estrutura
  const ESTRUTURA_PESO = { site: 20, gmb: 20, anuncios: 18, instagram: 12, landing: 12, whatsapp_business: 8, email_marketing: 5, isca: 5 }
  const confiancaScore = Math.min(estrutura.reduce((acc, item) => acc + (ESTRUTURA_PESO[item] || 0), 0), 100)

  const automacaoRuim = semAutomacaoBoa

  // Canais de divulgação — score e leitura contextual
  const canaisAtivos = canais.filter(c => c !== 'indicacao')
  const somenteIndicacao = canais.length > 0 && canaisAtivos.length === 0
  const canaisScore = canais.length === 0 ? 0
    : somenteIndicacao ? 12
    : Math.min(canaisAtivos.length * 22 + (canais.includes('indicacao') ? 5 : 0), 90)

  let canaisReading
  if (canais.length === 0)
    canaisReading = 'Você não marcou nenhum canal ativo. Sem ponto de entrada, novos clientes não têm como te encontrar.'
  else if (somenteIndicacao)
    canaisReading = 'Depender só de indicação é arriscado — seu crescimento está nas mãos dos outros. Um mês bom, um mês sem nada.'
  else if (canaisAtivos.length === 1 && !temAnuncios)
    canaisReading = 'Você tem um canal ativo, mas poucos pontos de contato limitam muito o volume de novos clientes que você pode alcançar.'
  else if (canaisAtivos.length >= 2 && !temAnuncios)
    canaisReading = 'Você diversifica, mas sem tráfego pago o alcance fica dependente de algoritmo. Anúncios colocariam combustível no que já funciona.'
  else
    canaisReading = 'Boa diversificação de canais. O próximo passo é garantir que cada canal está ativo e gerando oportunidades reais — não só presença.'

  // Velocidade — leitura baseada em automacao
  let velocidadeReading
  if (answers.automacao === 'ia')
    velocidadeReading = 'Você tem automação inteligente — isso é diferencial real. A maioria dos concorrentes ainda responde manualmente e perde leads fora do horário.'
  else if (answers.automacao === 'chatbot')
    velocidadeReading = 'Chatbot ajuda, mas fluxos fixos têm limite. Uma automação com IA responderia, qualificaria e conduziria o lead de forma muito mais natural.'
  else if (answers.automacao === 'naossei')
    velocidadeReading = 'Ter automação sem entender como funciona é um risco — se ela não qualifica o lead, está só adiando o problema e passando uma impressão ruim.'
  else if (answers.automacao === 'padrao')
    velocidadeReading = 'Mensagem automática de boas-vindas não qualifica o lead — ele ainda precisa esperar você aparecer para avançar. Isso esfria o interesse.'
  else if (respostaLenta)
    velocidadeReading = 'Sem automação, cada lead depende do seu humor e horário. O concorrente com IA já está respondendo enquanto você está ocupado ou dormindo.'
  else
    velocidadeReading = 'Você é rápido, mas isso não escala. Fora do horário comercial, leads entram e ficam sem resposta — e interesse que esfria raramente volta.'

  // Confiança digital — leitura baseada em estrutura
  let confiancaReading
  if (estrutura.length === 0)
    confiancaReading = 'Você não tem nenhuma estrutura digital ativa. Para qualquer cliente que te pesquisa online, você simplesmente não existe.'
  else if (!temSite && temAnuncios)
    confiancaReading = 'Você anuncia, mas manda o lead pra onde? Sem site ou landing page estratégica, o tráfego pago não tem onde converter.'
  else if (!temSite && estrutura.length <= 2)
    confiancaReading = 'Só rede social não sustenta credibilidade. Sem site, falta a âncora que transforma visitante curioso em cliente convicto.'
  else if (!temSite)
    confiancaReading = 'Você tem presença em vários canais, mas sem site profissional falta o ponto central que une tudo e passa autoridade de verdade.'
  else
    confiancaReading = 'Ter site não garante resultado — uma página sem estratégia pode passar uma imagem mais amadora do que não ter nada. O que importa é se ela convence.'

  return {
    scoreLabel: faixa.label,
    scoreColor: faixa.color,
    missedLeads,
    monthlyLoss,
    yearlyLoss,
    costPerDay,
    goalMetrics: [
      {
        label: 'Canais de divulgação', value: canaisScore, target: 100,
        gap: canaisScore >= 100 ? 'Meta atingida' : `Faltam ${100 - canaisScore} pontos`,
        reading: canaisReading,
      },
      {
        label: 'Velocidade de resposta', value: velocidadeScore, target: 100,
        gap: velocidadeScore >= 100 ? 'Meta atingida' : `Faltam ${100 - velocidadeScore} pontos`,
        reading: velocidadeReading,
      },
      {
        label: 'Confiança digital', value: confiancaScore, target: 100,
        gap: confiancaScore >= 100 ? 'Meta atingida' : `Faltam ${100 - confiancaScore} pontos`,
        reading: confiancaReading,
      },
    ],
  }
}
