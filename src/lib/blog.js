// Funções compartilhadas do blog (lista, páginas de tag e artigos).

export const fmtDate = (d) => new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(d)

export const readingTime = (body) =>
  Math.max(1, Math.round((body ? body.split(/\s+/).length : 0) / 200))

// "Planos Hostinger" -> "planos-hostinger". Sem acento, minúsculo, só letras, números e hífen.
export const slugTag = (tag) =>
  tag
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Mapa slug -> { nome, posts } só das tags com 2 ou mais artigos.
// Tag com um artigo só não ganha página própria: seria uma página fina, que o
// Google tende a ignorar. A tag continua aparecendo no artigo, só sem link.
export function tagsComPagina(posts) {
  const mapa = new Map()
  for (const post of posts) {
    for (const nome of post.data.tags) {
      const slug = slugTag(nome)
      if (!mapa.has(slug)) mapa.set(slug, { slug, nome, posts: [] })
      mapa.get(slug).posts.push(post)
    }
  }
  for (const [slug, tag] of mapa) {
    if (tag.posts.length < 2) mapa.delete(slug)
  }
  return mapa
}
