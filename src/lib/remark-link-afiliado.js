// Plugin do Markdown dos artigos do blog.
//
// 1) Link de afiliado dentro do texto, sem colar o endereço:
//
//      [Ver os planos da Hostinger](afiliado:hostinger)
//      [Ver os planos da Hostinger](afiliado:hostinger/resumo)
//
//    O site troca pelo link verdadeiro (src/data/afiliados.js), com o parâmetro
//    "source" do artigo: blog-<nome-do-arquivo>-no-texto, ou
//    blog-<nome-do-arquivo>-<posição> quando você escreve /posição (resumo,
//    perfis...). Assim o painel de afiliados mostra quanto cada convite trouxe,
//    separado do botão do fim do artigo. O link abre em outra aba, vai marcado como
//    patrocinado para o Google e leva o rastreio do SiteLens.
//
// 2) Botão que copia o cupom de desconto:
//
//      [Copiar cupom ONEIMPACT](cupom:hostinger)
//      [Copiar cupom ONEIMPACT](cupom:hostinger/resumo)
//
//    Vira um botão com data-copiar, que o componente CopiarCupom.astro faz
//    funcionar na página. A posição só serve para o rastreio no SiteLens.
//
// Produto que não existir em afiliados.js (ou sem cupom) trava o build, para um
// erro de digitação não virar link quebrado no ar.
import { basename } from 'node:path'
import { AFILIADOS, linkAfiliado } from '../data/afiliados.js'

function percorrer(no, fazer) {
  fazer(no)
  if (Array.isArray(no.children)) no.children.forEach((filho) => percorrer(filho, fazer))
}

// "hostinger/resumo" -> { produto: 'hostinger', posicao: 'resumo' }
function separar(texto) {
  const [produto, posicao] = texto.split('/')
  return { produto, posicao: posicao || '' }
}

export default function remarkLinkAfiliado() {
  return (arvore, arquivo) => {
    const caminho = arquivo.path || (arquivo.history && arquivo.history[0]) || ''
    const slug = basename(caminho).replace(/\.[^.]+$/, '')

    percorrer(arvore, (no) => {
      if (no.type !== 'link' || typeof no.url !== 'string') return

      if (no.url.startsWith('cupom:')) {
        const { produto, posicao } = separar(no.url.slice('cupom:'.length))
        const cupom = AFILIADOS[produto] && AFILIADOS[produto].cupom
        if (!cupom) {
          throw new Error(`Cupom inexistente para o produto "${produto}" no artigo "${slug}".`)
        }

        no.url = '#cupom'
        no.data = {
          ...(no.data || {}),
          hProperties: {
            className: ['cupom-copiar'],
            dataCopiar: cupom.codigo,
            dataTrack: 'cupom-copiar-texto',
            dataTrackLabel: `Copiar cupom ${cupom.codigo} (${posicao || 'no texto'} de ${slug})`,
          },
        }
        return
      }

      if (!no.url.startsWith('afiliado:')) return

      const { produto, posicao } = separar(no.url.slice('afiliado:'.length))
      if (!AFILIADOS[produto]) {
        throw new Error(`Link de afiliado com produto desconhecido ("${produto}") no artigo "${slug}".`)
      }

      no.url = linkAfiliado(produto, `${slug}-${posicao || 'no-texto'}`)
      no.data = {
        ...(no.data || {}),
        hProperties: {
          target: '_blank',
          rel: ['sponsored', 'noopener'],
          className: ['cta-afiliado'],
          dataTrack: `afiliado-${produto}-texto`,
          dataTrackLabel: `${AFILIADOS[produto].nome} (${posicao || 'no texto'} de ${slug})`,
        },
      }
    })
  }
}
