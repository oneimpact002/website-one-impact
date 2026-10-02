// Ferramentas da página /ferramentas.
// Para incluir uma ferramenta nova, adicione um item neste array. Só entram
// ferramentas que a One Impact realmente usa e recomenda.
//
// afiliado: nome do produto em src/data/afiliados.js (omita se não houver link de afiliado).
// planos: o que a pessoa precisa saber para escolher (nome, preço, para quem).
// videos: vídeos do canal sobre a ferramenta (id do YouTube).
export const FERRAMENTAS = [
  {
    id: 'hostinger',
    nome: 'Hostinger',
    categoria: 'Hospedagem de sites e domínios',
    resumo: 'A hospedagem que usamos nos projetos da agência e da maioria dos clientes, desde 2023.',
    afiliado: 'hostinger',
    botao: 'Ver os planos da Hostinger',
    // Valores do contrato de 24 meses, conferidos na tela da Hostinger. Atualize junto com os artigos.
    precosConferidosEm: '25/09/2026',
    planos: [
      {
        nome: 'Single',
        preco: 'R$ 9,99',
        texto: 'Para começar ou testar uma ideia. Sem domínio grátis e sem e-mail profissional. Não indicamos para quem vai anunciar.',
      },
      {
        nome: 'Premium',
        preco: 'R$ 12,99',
        texto: 'Site corporativo, portfólio ou blog. Domínio grátis no primeiro ano, e-mail profissional e capacidade para anúncios com investimento inicial.',
      },
      {
        nome: 'Unlimited',
        preco: 'R$ 16,99',
        destaque: 'Nossa indicação',
        texto: 'O plano que usamos na agência. Mais desempenho para anunciar e escalar, com domínio grátis e e-mail profissional.',
      },
      {
        nome: 'Cloud Startup',
        preco: 'R$ 44,99',
        texto: 'Loja grande, sistema próprio ou lançamento com muito tráfego. Para a maioria dos sites não é necessário.',
      },
    ],
    porQueRecomendamos: [
      'Painel fácil, até para quem nunca mexeu em hospedagem.',
      'Suporte por chat que passa para atendente humano quando você pede.',
      'Garantia de reembolso de 30 dias.',
    ],
    videos: [
      { id: 'aZdS_FIphxA', titulo: 'Qual plano da HOSTINGER é melhor para CRIAR SITE em 2026' },
      { id: 'CK9_nYkOYZA', titulo: 'Hospedagem Hostinger Ainda Vale a Pena pra CRIAR SITES em 2026?' },
    ],
    guia: {
      titulo: 'Ver a comparação completa dos planos',
      href: '/blog/qual-plano-da-hostinger-para-criar-site',
    },
  },
]
