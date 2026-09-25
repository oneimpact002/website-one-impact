import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabaseConfig.js'

// Rastreio próprio de acessos e cliques, lido pelo SiteLens.
//
// Grava na tabela `site_events` do Supabase central. Não usa cookie, não guarda
// IP e não identifica ninguém: cada navegador recebe um código aleatório
// (guardado no localStorage) só para contar visitantes diferentes.
//
// Três tipos de evento:
//   pageview  a pessoa abriu uma página
//   click     a pessoa clicou em um botão ou link rastreado
//   lead      a pessoa enviou um formulário (chamado por leads.js)
//
// Quais cliques são rastreados:
//   1. Qualquer elemento com data-track="nome-do-botao" (e, se quiser, um nome
//      legível em data-track-label="Falar no WhatsApp").
//   2. Sem data-track, só links de saída (WhatsApp, Instagram, e-mail) e links
//      para /contato. O código do botão vira "destino@posição", por exemplo
//      "whatsapp@topo", para separar o botão do topo do botão do rodapé.

const SITE = 'one-impact'
const ENDPOINT = `${SUPABASE_URL}/rest/v1/site_events`
const CHAVE_VISITANTE = 'oi_vid'
const CHAVE_DESLIGADO = 'oi_notrack'

// Links de destino conhecidos ganham um nome curto no relatório.
const APELIDOS = {
  'link.oneimpact.com.br/contato-agencia-one-impact': 'whatsapp',
  'www.instagram.com/agenciaoneimpact': 'instagram',
}

function lerStorage(chave) {
  try {
    return window.localStorage.getItem(chave)
  } catch {
    return null
  }
}

function gravarStorage(chave, valor) {
  try {
    if (valor === null) window.localStorage.removeItem(chave)
    else window.localStorage.setItem(chave, valor)
  } catch {
    /* navegador sem storage: segue sem lembrar */
  }
}

/**
 * Rastreio fica desligado em desenvolvimento, em navegador automatizado e nas
 * visitas da própria equipe. Para a equipe se excluir das contas, abrir o site
 * uma vez com ?sl=off no endereço (e ?sl=on para voltar a contar).
 */
function rastreioDesligado() {
  if (!import.meta.env.PROD) return true
  if (navigator.webdriver) return true
  const comando = new URLSearchParams(window.location.search).get('sl')
  if (comando === 'off') gravarStorage(CHAVE_DESLIGADO, '1')
  if (comando === 'on') gravarStorage(CHAVE_DESLIGADO, null)
  return lerStorage(CHAVE_DESLIGADO) === '1'
}

function codigoDoVisitante() {
  let codigo = lerStorage(CHAVE_VISITANTE)
  if (!codigo) {
    codigo = crypto.randomUUID()
    gravarStorage(CHAVE_VISITANTE, codigo)
  }
  return codigo
}

function caminhoAtual() {
  const caminho = window.location.pathname.replace(/\/+$/, '')
  return caminho || '/'
}

function tipoDeAparelho() {
  const largura = window.innerWidth
  if (largura < 768) return 'mobile'
  if (largura < 1100) return 'tablet'
  return 'desktop'
}

function origemDoAcesso() {
  if (!document.referrer) return null
  try {
    const url = new URL(document.referrer)
    if (url.host === window.location.host) return null
    return (url.host + url.pathname).slice(0, 200)
  } catch {
    return null
  }
}

let desligado = true

function enviar(tipo, dados = {}) {
  if (desligado) return
  const params = new URLSearchParams(window.location.search)
  const corpo = {
    site: SITE,
    tipo,
    path: caminhoAtual(),
    visitor_id: codigoDoVisitante(),
    device: tipoDeAparelho(),
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    ...dados,
  }

  // keepalive deixa o envio terminar mesmo quando o clique já está saindo da página.
  fetch(ENDPOINT, {
    method: 'POST',
    keepalive: true,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(corpo),
  }).catch(() => {
    /* rastreio nunca pode atrapalhar o site */
  })
}

function posicaoDoElemento(elemento) {
  const bloco = elemento.closest('header, footer, .whatsapp-bar, section[id]')
  if (!bloco) return 'pagina'
  if (bloco.matches('header')) return 'topo'
  if (bloco.matches('footer')) return 'rodape'
  if (bloco.matches('.whatsapp-bar')) return 'barra'
  return bloco.id
}

function textoDe(elemento) {
  return (
    elemento.dataset.trackLabel ||
    elemento.getAttribute('aria-label') ||
    elemento.textContent.replace(/\s+/g, ' ').trim()
  ).slice(0, 80)
}

/** Descreve o clique, ou devolve null quando o elemento não deve ser rastreado. */
function descreverClique(elemento) {
  const explicito = elemento.dataset.track
  const destino = elemento.tagName === 'A' ? elemento.href : null
  let codigo = explicito

  if (!codigo) {
    if (!destino) return null
    const url = new URL(destino, window.location.href)
    if (url.protocol === 'mailto:') {
      codigo = 'email'
    } else if (url.host === window.location.host) {
      if (url.pathname.replace(/\/+$/, '') !== '/contato') return null
      codigo = 'contato'
    } else if (url.protocol === 'http:' || url.protocol === 'https:') {
      const chave = url.host + url.pathname.replace(/\/+$/, '')
      codigo = APELIDOS[chave] ?? chave
    } else {
      return null
    }
    codigo = `${codigo}@${posicaoDoElemento(elemento)}`
  }

  return {
    track_id: codigo.slice(0, 120),
    label: textoDe(elemento) || codigo,
    destino: destino ? destino.slice(0, 300) : null,
  }
}

/** Chamado por leads.js depois que o formulário foi gravado com sucesso. */
export function rastrearLead(origem) {
  enviar('lead', { track_id: origem, label: `Formulário ${origem}` })
}

if (typeof window !== 'undefined') {
  desligado = rastreioDesligado()

  if (!desligado) {
    enviar('pageview', {
      titulo: document.title.slice(0, 160),
      referrer: origemDoAcesso(),
    })

    // Captura no início da propagação para pegar o clique antes de qualquer
    // outro código do site parar o evento ou trocar de página.
    document.addEventListener(
      'click',
      (evento) => {
        const alvo = evento.target instanceof Element ? evento.target.closest('[data-track], a[href]') : null
        if (!alvo) return
        const clique = descreverClique(alvo)
        if (clique) enviar('click', clique)
      },
      true,
    )
  }
}
