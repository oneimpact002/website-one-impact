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
