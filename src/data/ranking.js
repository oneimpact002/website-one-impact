// Ranking de hospedagens de sites (página /ranking).
//
// Para atualizar a cada vídeo novo do canal:
//   1. Adicione a hospedagem em HOSPEDAGENS (ou preencha as notas de uma que já está em avaliação).
//   2. Coloque o vídeo em `videos` e o link do artigo em `artigo`.
//   3. Mude `notasConfirmadas` para true quando as notas forem as definitivas.
//   4. Atualize ATUALIZADO_EM.
//
// Notas vão de 0 a 10. A nota geral é a média dos critérios, ponderada pelos pesos abaixo.

export const ATUALIZADO_EM = '2026-10-15'

// Data em que os preços do plano de referência foram conferidos na tela da hospedagem.
// Preço muda: atualize junto com os valores abaixo.
export const PRECOS_CONFERIDOS_EM = '2026-09-25'

export const CRITERIOS = [
  {
    id: 'painel',
    nome: 'Painel',
    curto: 'Painel',
    peso: 1,
    descricao: 'Quanto é fácil usar no dia a dia, para quem tem experiência e para quem nunca mexeu em hospedagem.',
  },
  {
    id: 'suporte',
    nome: 'Suporte',
    curto: 'Suporte',
    peso: 1,
    descricao: 'Se dá para falar com uma pessoa de verdade e se o atendimento resolve o que está ao alcance da hospedagem.',
  },
  {
    id: 'entrega',
    nome: 'Qualidade de entrega',
    curto: 'Entrega',
    peso: 1,
    descricao: 'Velocidade e disponibilidade do site, segurança e espaço de armazenamento.',
  },
  {
    id: 'preco',
    nome: 'Preço',
    curto: 'Preço',
    peso: 1,
    descricao: 'O que cada plano inclui pelo valor que se paga, no contrato e na renovação.',
  },
]

// notasConfirmadas: false = rascunho. No site publicado, hospedagem com
// notasConfirmadas false aparece só como "em avaliação", sem nota. Assim um
// número ainda não validado nunca vai ao ar por engano.
//
// afiliado: nome do produto em src/data/afiliados.js (omita se não houver link).
export const HOSPEDAGENS = [
  {
    id: 'hostinger',
    nome: 'Hostinger',
    resumo: 'A hospedagem que usamos nos projetos da agência e da maioria dos clientes, desde 2023.',
    afiliado: 'hostinger',
    botao: 'Contratar a Hostinger',
    notasConfirmadas: false,
    // PROPOSTA a partir do que foi dito no vídeo. Confirmar antes de publicar.
    notas: { painel: 9.5, suporte: 9.5, entrega: 9.0, preco: 8.5 },
    // Plano de referência: o de entrada que já inclui domínio e e-mail, no contrato mais longo.
    // Valores do print de 25/09/2026 (Premium, 24 meses). Confirmar antes de publicar.
    plano: { nome: 'Premium', porMes: 12.99, renovacao: 38.99, dominioGratis: true, conferidoEm: '2026-09-25' },
    idealPara: 'site corporativo, portfólio e anúncios com investimento inicial',
    artigo: { titulo: 'A Hostinger ainda vale a pena para criar sites em 2026?', href: '/blog/hostinger-ainda-vale-a-pena-para-criar-sites' },
    videos: [
      { id: 'CK9_nYkOYZA', titulo: 'Hospedagem Hostinger Ainda Vale a Pena pra CRIAR SITES em 2026?', data: '2026-09-16' },
      { id: 'aZdS_FIphxA', titulo: 'Qual plano da HOSTINGER é melhor para CRIAR SITE em 2026', data: '2026-09-23' },
    ],
  },
  {
    id: 'turbocloud',
    nome: 'Turbo Cloud',
    resumo: 'Empresa brasileira, com servidores no Brasil, cPanel e suporte por WhatsApp 24 horas.',
    notasConfirmadas: false,
    // PROPOSTA a partir do vídeo da comparação (2/10/2026). Confirmar antes de publicar.
    // Painel: cPanel, familiar e fácil. Suporte: WhatsApp 24h e boa experiência, mas a nota no
    // Reclame Aqui é menor (7,4) e há relatos de demora. Entrega: LiteSpeed e NVMe, "lado a lado"
    // com a Hostinger. Preço: não é a mais barata do mercado.
    notas: { painel: 8.0, suporte: 8.5, entrega: 9.0, preco: 6.5 },
    // Plano de referência: One (print de 18/09/2026). Renovação e domínio grátis ainda não conferidos.
    plano: { nome: 'One', porMes: 35.9, renovacao: null, dominioGratis: null, conferidoEm: '2026-09-18' },
    idealPara: 'WordPress e sites com anúncios',
    artigo: { titulo: 'Qual a melhor hospedagem para criar sites em 2026', href: '/blog/qual-a-melhor-hospedagem-para-criar-sites' },
    videos: [],
  },
  {
    id: 'kinghost',
    nome: 'KingHost',
    resumo: 'Empresa brasileira, com mais de uma década de mercado, suporte por WhatsApp e telefone 24 horas.',
    notasConfirmadas: false,
    // PROPOSTA a partir do vídeo da comparação (2/10/2026). Confirmar antes de publicar.
    // Painel: próprio, parecido com o cPanel. Suporte: ponto forte, única com telefone, 8,9 no
    // Reclame Aqui e cerca de 96% resolvidas. Entrega: infraestrutura confiável, mas sem NVMe
    // confirmado. Preço: R$ 12,99 no plano anual, renovação ainda não conferida.
    notas: { painel: 8.0, suporte: 9.5, entrega: 8.5, preco: 8.0 },
    // Plano de referência: Hospedagem I, cobrança anual (print de 22/09/2026). Renovação não conferida.
    plano: { nome: 'Hospedagem I', porMes: 12.99, renovacao: null, dominioGratis: true, conferidoEm: '2026-09-22' },
    idealPara: 'quem dá peso ao suporte, inclusive por telefone',
    artigo: { titulo: 'Qual a melhor hospedagem para criar sites em 2026', href: '/blog/qual-a-melhor-hospedagem-para-criar-sites' },
    videos: [],
  },
]

// Vídeos que falam de hospedagem em geral, e não de uma só. Entram em "Últimos vídeos".
export const VIDEOS_GERAIS = [
  { id: 'TH3eamYdjUM', titulo: 'Qual a melhor HOSPEDAGEM para CRIAR SITES em 2026', data: '2026-10-02' },
  { id: 'BKfJYxspVP0', titulo: 'Hospedagem ruim: o que ela faz com seu site, seu anúncio e seu Google', data: '2026-10-13' },
]
