// Links de afiliado usados no blog.
// O parâmetro "source" aparece na coluna "Fonte" do painel de afiliados da
// Hostinger. Cada artigo manda "blog-<slug>", então dá para ver quanto cada
// artigo trouxe. A Hostinger troca os UTMs, então nunca use UTM aqui.
// offer_id=6 é a hospedagem comum, a que o canal divulga.
export const AFILIADOS = {
  hostinger: {
    nome: 'Hostinger',
    base: 'https://www.hostg.xyz/aff_c?offer_id=6&aff_id=101846',
    // Cupom que a pessoa cola no pagamento da Hostinger. É o mesmo da landing do cupom
    // (lp.oneimpact.com.br/indicacao-hostinger). Se a Hostinger mudar o desconto, mude aqui.
    cupom: { codigo: 'ONEIMPACT', desconto: '10%' },
  },
}

// prefixo: de onde veio o clique ('blog' para artigos, 'ferramentas' para a página de ferramentas).
export function linkAfiliado(produto, slug, prefixo = 'blog') {
  const source = `${prefixo}-${slug}`.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
  return `${AFILIADOS[produto].base}&source=${source}`
}

// Links curtos do LinkFlow, um por artigo (nome do arquivo do artigo -> link). Levam à
// página do cupom (lp.oneimpact.com.br/indicacao-hostinger) com o UTM campaign do artigo,
// que na Hostinger aparece na coluna Fonte. Todos os botões do artigo usam o mesmo link.
// Artigo que não está aqui continua com o link direto da Hostinger (linkAfiliado).
export const LINKS_CURTOS = {
  'problemas-de-ter-uma-hospedagem-ruim': 'https://link.oneimpact.com.br/blog-hospedagem-ruim',
  'qual-a-melhor-hospedagem-para-criar-sites': 'https://link.oneimpact.com.br/blog-qual-a-melhor-hospedagem',
  'qual-plano-da-hostinger-para-criar-site': 'https://link.oneimpact.com.br/blog-qual-plano-da-hostinger',
  'hostinger-ainda-vale-a-pena-para-criar-sites': 'https://link.oneimpact.com.br/blog-hostinger-ainda-vale-a-pena',
}

// Link de contratação de um artigo do blog: o curto do LinkFlow, ou o direto da Hostinger
// (com source do artigo e da posição) se o artigo ainda não tem link curto.
export function linkBlog(produto, slug, posicao = '') {
  return LINKS_CURTOS[slug] || linkAfiliado(produto, posicao ? slug + '-' + posicao : slug)
}