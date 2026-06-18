// =================================================================
// QUESTIONS — mesmas do Protocolo Advogado Silencioso
// =================================================================

export const QUESTIONS = [
  {
    id: 'q1',
    label: 'Seu segmento de atuação',
    help: 'Cada segmento tem um cliente bem diferente. Escolha o que mais se aproxima do seu negócio hoje.',
    microfeedback: '+12 pontos ao seu score',
    type: 'radio',
    options: [
      { value: 'advocacia', label: 'Advocacia / Jurídico' },
      { value: 'saude', label: 'Saúde (médico, dentista, psicólogo, nutricionista...)' },
      { value: 'contabil', label: 'Contábil / Financeiro (contador, consultor, corretor...)' },
      { value: 'tecnologia', label: 'Tecnologia / SaaS / Agência digital' },
      { value: 'educacao', label: 'Educação / Cursos / Coaching / Mentoria' },
      { value: 'imobiliario', label: 'Imobiliário (corretor, incorporadora, arquitetura...)' },
      { value: 'estetica', label: 'Estética / Beleza / Bem-estar' },
      { value: 'engenharia', label: 'Engenharia / Construção / Arquitetura' },
      { value: 'varejo', label: 'Varejo / E-commerce / Produto físico' },
      { value: 'alimentacao', label: 'Alimentação (restaurante, delivery, franquia...)' },
      { value: 'industria', label: 'Indústria / Logística / Operacional' },
      { value: 'outro', label: 'Outro segmento' },
    ],
  },
  {
    id: 'q2',
    label: 'Tempo de atuação',
    help: 'Há quanto tempo você (ou seu negócio) atua no mercado? Isso muda o que vamos recomendar depois.',
    microfeedback: '+8 pontos',
    type: 'radio',
    options: [
      { value: 'iniciante', label: 'Estou começando / até 2 anos' },
      { value: '2a5', label: '2 a 5 anos' },
      { value: '5a10', label: '5 a 10 anos' },
      { value: '10+', label: 'Mais de 10 anos' },
    ],
  },
  {
    id: 'q3',
    label: 'Como você conquista clientes hoje',
    help: 'Hoje, quais são os principais canais que trazem clientes novos pro seu negócio? (pode escolher mais de uma)',
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
    label: 'Valor médio do seu serviço',
    help: 'Quanto, em média, cada cliente paga pra fechar com você? (se variar muito, pega uma média aproximada)',
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
    help: 'Quando alguém manda mensagem nova no seu WhatsApp, em quanto tempo você responde? (sendo honesto)',
    microfeedback: 'Cada hora a mais = queda na chance de fechar o cliente (dados de Harvard Business Review)',
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
    label: 'Estrutura digital atual',
    help: 'Quais desses itens você tem HOJE funcionando de verdade no seu negócio? (pode marcar vários)',
    microfeedback: 'Última técnica! Marcou poucos? Tem coisa importante pra reverter isso.',
    type: 'checkbox-matrix',
    options: [
      { value: 'site', label: 'Site institucional' },
      { value: 'gmb', label: 'Google Meu Negócio' },
      { value: 'instagram', label: 'Instagram ativo' },
      { value: 'landing_page', label: 'Landing Page' },
      { value: 'whatsapp_business', label: 'WhatsApp Business' },
      { value: 'email', label: 'E-mail marketing' },
      { value: 'anuncios', label: 'Anúncios pagos (Google/Meta)' },
      { value: 'isca', label: 'Página com isca digital (quiz, aula gratuita, e-book)' },
    ],
  },
  {
    id: 'q8',
    label: 'Quando foi a última atualização do seu site?',
    help: 'A última vez que você mexeu no design, conteúdo ou informações do site (não vale post de blog).',
    microfeedback: 'Site parado no tempo passa a impressão errada. Seu cliente nota.',
    type: 'radio',
    conditional: (answers) => !!(answers.q7 && answers.q7.site),
    options: [
      { value: 'atualizado', label: 'Atualizado nos últimos 12 meses' },
      { value: '1a2', label: '1 a 2 anos sem atualizar' },
      { value: '3mais', label: '3+ anos sem mexer' },
      { value: 'nao_lembro', label: 'Tenho site mas nem lembro a última vez que mexi' },
    ],
  },
  {
    id: 'q9',
    label: 'Você tem alguma automação de atendimento hoje?',
    help: 'Pense no WhatsApp, Instagram, e-mail ou qualquer canal onde clientes te procuram. Tem algo respondendo por você quando tá ocupado?',
    microfeedback: 'Sem automação, cada lead depende do seu humor e horário.',
    type: 'radio',
    options: [
      { value: 'nenhuma', label: 'Nenhuma' },
      { value: 'msg_auto', label: 'Só mensagem automática de primeira resposta' },
      { value: 'fluxo_ia', label: 'Tenho fluxo com IA / chatbot' },
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

// =================================================================
// PESQUISAS DE RISCO
// =================================================================
const temAnuncios = (answers) =>
  (answers.q7 && answers.q7.anuncios) ||
  (Array.isArray(answers.q3) && answers.q3.includes('anuncios'))
const temSite = (answers) => answers.q7 && answers.q7.site
const temGMB = (answers) => answers.q7 && answers.q7.gmb
const canaisMarcados = (answers) => {
  const c = answers.q7 || {}
  return Object.values(c).filter(Boolean).length
}
const siteVelho = (answers) =>
  answers.q8 === '1a2' || answers.q8 === '3mais' || answers.q8 === 'nao_lembro'
const capta = (answers) => (Array.isArray(answers.q3) ? answers.q3 : [])

export const PESQUISAS = [
  {
    id: 1,
    titulo: 'Sem site profissional, você não aparece no Google',
    descricao: '64% dos consumidores pesquisam no Google antes de contratar. Se você não tem um site profissional, quando alguém busca seu serviço, encontra o concorrente que fez esse básico.',
    fonte: 'Lyfe Marketing, 2024',
    mostrar: (answers) => !temSite(answers) || (temSite(answers) && siteVelho(answers)),
  },
  {
    id: 2,
    titulo: 'Anúncios sem estrutura é dinheiro jogado fora',
    descricao: 'Você paga pra aparecer no Google, mas o lead cai num WhatsApp pessoal, sem resposta automática, sem nada que organize o atendimento. 49% das vendas dependem da primeira resposta rápida. Sem estrutura, o anúncio só ajuda o concorrente.',
    fonte: 'HubSpot State of Sales, 2025',
    mostrar: (answers) => temAnuncios(answers) && !temSite(answers),
  },
  {
    id: 3,
    titulo: 'Atendimento lento perde clientes pro concorrente',
    descricao: 'Respondendo rápido, suas chances de fechar aumentam em até 49%. Cada hora de atraso é um cliente que foi pro concorrente. 80% das vendas que dão certo exigem 5 ou mais contatos de follow-up, e o primeiro precisa ser rápido.',
    fonte: 'HubSpot State of Sales, 2025',
    mostrar: (answers) => answers.q6 === '1a3h' || answers.q6 === 'mais3h',
  },
  {
    id: 4,
    titulo: 'Atendimento manual limita o crescimento',
    descricao: '60% dos consumidores preferem resposta imediata, mesmo que seja automática. Se o lead chega às 22h e só recebe resposta às 8h, ele já foi pro concorrente. Sem automação, você fica limitado ao próprio tempo.',
    fonte: 'Zendesk CX Trends, 2026',
    mostrar: (answers) => answers.q9 === 'nenhuma',
  },
  {
    id: 5,
    titulo: 'Sem Google Meu Negócio, você não aparece na busca local',
    descricao: '76% das buscas com intenção local levam a uma visita em 24h. Quem busca seu serviço na sua região não te encontra no Google Maps, encontra o concorrente que fez esse registro.',
    fonte: 'Think with Google',
    mostrar: (answers) => !temGMB(answers),
  },
  {
    id: 6,
    titulo: 'Quem tem mais canais digitais integrados fecha mais',
    descricao: '80% das empresas vão competir pela experiência do cliente. Empresas com 4 ou mais canais digitais funcionando bem convertem mais. Se sua presença digital é fraca, você está perdendo mercado todo mês.',
    fonte: 'Zendesk CX Trends, 2026',
    mostrar: (answers) => canaisMarcados(answers) < 4,
  },
  {
    id: 7,
    titulo: 'Sua experiência só vale se o digital mostra isso',
    descricao: '87% dos consumidores confiam mais em empresas com presença digital sólida. Seus anos de mercado, seu portfólio, sua experiência. Tudo isso perde valor se o digital não mostra quem você é. O cliente pesquisa antes de te chamar.',
    fonte: 'Zendesk CX Trends, 2026',
    mostrar: (answers) => canaisMarcados(answers) < 3,
  },
  {
    id: 8,
    titulo: 'Depender só de indicação é um risco pro negócio',
    descricao: '60% dos consumidores compram baseado no atendimento que esperam receber. Se sua única fonte de clientes é indicação, qualquer mudança nessa rede trava seu negócio. Ter 2-3 canais digitais funcionando junto com indicação é o que faz crescer.',
    fonte: 'Zendesk CX Trends, 2026',
    mostrar: (answers) => {
      const c = capta(answers)
      return c.length === 1 && c[0] === 'indicacao'
    },
  },
]

export function getPesquisasVisiveis(answers) {
  return PESQUISAS.filter((p) => p.mostrar(answers))
}

export function calculateScore(answers) {
  let score = 0
  if (answers.q7 && typeof answers.q7 === 'object') {
    const canaisMarcados = Object.values(answers.q7).filter(Boolean).length
    score += canaisMarcados * 7
  }
  if (answers.q2 === '10+') score += 10
  else if (answers.q2 === '5a10') score += 8
  else if (answers.q2 === '2a5') score += 5
  else if (answers.q2 === 'iniciante') score += 2
  if (answers.q6 === '5a30') score += 10
  else if (answers.q6 === '30a60') score += 6
  else if (answers.q6 === '1a3h') score += 2
  if (answers.q8 === 'atualizado') score += 8
  else if (answers.q8 === '1a2') score += 3
  if (answers.q9 === 'fluxo_ia') score += 10
  else if (answers.q9 === 'msg_auto') score += 5
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

export function calcularPotencial(answers) {
  const score = calculateScore(answers)
  let faixas
  if (score < 20) {
    faixas = [
      { label: 'Conservador', receitaMensal: 5000, clientesMensal: 10 },
      { label: 'Provável', receitaMensal: 9000, clientesMensal: 18 },
      { label: 'Otimista', receitaMensal: 15000, clientesMensal: 25 },
    ]
  } else if (score < 40) {
    faixas = [
      { label: 'Conservador', receitaMensal: 3000, clientesMensal: 5 },
      { label: 'Provável', receitaMensal: 6000, clientesMensal: 10 },
      { label: 'Otimista', receitaMensal: 10000, clientesMensal: 15 },
    ]
  } else if (score < 60) {
    faixas = [
      { label: 'Conservador', receitaMensal: 2000, clientesMensal: 3 },
      { label: 'Provável', receitaMensal: 4000, clientesMensal: 6 },
      { label: 'Otimista', receitaMensal: 7000, clientesMensal: 10 },
    ]
  } else if (score < 80) {
    faixas = [
      { label: 'Conservador', receitaMensal: 1000, clientesMensal: 1 },
      { label: 'Provável', receitaMensal: 2000, clientesMensal: 3 },
      { label: 'Otimista', receitaMensal: 3500, clientesMensal: 5 },
    ]
  } else {
    faixas = [
      { label: 'Conservador', receitaMensal: 500, clientesMensal: 0 },
      { label: 'Provável', receitaMensal: 1000, clientesMensal: 1 },
      { label: 'Otimista', receitaMensal: 2000, clientesMensal: 3 },
    ]
  }
  return faixas.map((f, i) => ({
    nome: ['conservador', 'provavel', 'otimista'][i],
    label: f.label,
    multiplicador: 1,
    receitaMensal: f.receitaMensal,
    receitaAnual: f.receitaMensal * 12,
    clientesMensal: f.clientesMensal,
    clientesAnual: f.clientesMensal * 12,
  }))
}

export function chooseSignals(answers) {
  return PESQUISAS.filter((p) => p.mostrar(answers))
}

export function generatePlano(answers, sinaisEscolhidos) {
  const sinaisIds = sinaisEscolhidos.map((s) => s.id)
  const canais = answers.q7 || {}
  const plano = { essenciais: [], impulsionar: [], conversao: [] }
  plano.essenciais.push('Definir posicionamento estratégico: quem você é, para quem fala e qual mensagem carrega')
  plano.essenciais.push('Identificar público-alvo exato e criar perfil do cliente ideal')
  plano.essenciais.push('Padronizar marca visual e tom de voz em todos os canais')
  if (sinaisIds.includes(5) || !canais.gmb) {
    plano.essenciais.push('Configurar Google Meu Negócio com informações completas e fotos profissionais')
  }
  if (sinaisIds.includes(8) || !canais.instagram) {
    plano.essenciais.push('Estruturar Instagram profissional com bio clara e conteúdo estratégico')
  }
  if (sinaisIds.includes(1) || !canais.site) {
    plano.essenciais.push('Desenvolver site profissional e estratégico, montado para vender com o texto correto')
  } else if (answers.q8 === '3mais' || answers.q8 === 'nao_lembro' || answers.q8 === '1a2') {
    plano.essenciais.push('Atualizar site com design atual e copy que converte')
  }
  plano.essenciais.push('Estruturar fluxo de atendimento profissional')
  if (sinaisIds.includes(3) || sinaisIds.includes(4)) {
    plano.essenciais.push('Configurar WhatsApp Business com resposta automática de primeira mensagem')
  }
  plano.impulsionar.push('Criar automações de mensagem: atender o cliente em menos de 2 minutos')
  plano.impulsionar.push('Configurar fluxo de triagem no WhatsApp: automática → menu → categorias → atendimento humano')
  if (canais.instagram) {
    plano.impulsionar.push('Definir estratégia de conteúdo para Instagram: o que publicar, quando e por quê')
  }
  if (canais.gmb) {
    plano.impulsionar.push('Criar rotina de posts no Google Meu Negócio para manter presença ativa')
  }
  if (sinaisIds.includes(2) || (canais.site && canais.gmb)) {
    plano.impulsionar.push('Estruturar presença digital completa ANTES de investir em anúncios pagos')
  }
  plano.conversao.push('Desenvolver estratégia de marketing de conversão personalizada para seu nicho')
  plano.conversao.push('Criar conteúdo que atrai o cliente certo e já o qualifica antes do primeiro contato')
  plano.conversao.push('Implementar ferramentas de captura e automação que trabalham 24/7')
  plano.conversao.push('Estruturar prova social: depoimentos, cases de sucesso e autoridade no nicho')
  return plano
}

export function recommendPackage(answers) {
  return {
    nome: 'Estrutura Completa',
    preco: 'Sob consulta',
    desc: 'Tudo que você precisa para ter presença digital que realmente convierte',
    features: [
      'Posicionamento estratégico → Definir quem sua empresa é, para quem fala e como se destacar no mercado',
      'Site planejado e estratégico → Focado em anúncios pagos ou posicionamento no Google (adaptado ao seu objetivo)',
      'Automação de WhatsApp → Atender, qualificar e direcionar leads 24/7, mesmo fora do horário',
      'Automação de Instagram → Manter presença ativa e capturar interessados automaticamente',
      'Suporte e ajustes → Acompanhamento para garantir que tudo funcione e traga resultados',
      'Estratégia secreta de pré-qualificação → Uma tática que quase ninguém está usando para atrair clientes que já estão prontos pra contratar',
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