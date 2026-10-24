// Cálculo do ranking de hospedagens. Mantido separado da página para poder ser testado.

// Média ponderada das notas, com uma casa decimal. null se faltar nota de algum critério.
export function notaGeral(notas, criterios) {
  if (!notas) return null
  let soma = 0
  let pesos = 0
  for (const c of criterios) {
    const valor = notas[c.id]
    if (typeof valor !== 'number') return null
    soma += valor * c.peso
    pesos += c.peso
  }
  return pesos === 0 ? null : Math.round((soma / pesos) * 10) / 10
}

// Separa o que entra no ranking do que está "em avaliação".
// Em produção, só entra no ranking quem tem notas completas E confirmadas.
export function montarRanking(hospedagens, criterios, { producao }) {
  const ranking = []
  const emAvaliacao = []

  for (const h of hospedagens) {
    const nota = notaGeral(h.notas, criterios)
    const liberada = nota !== null && (h.notasConfirmadas || !producao)
    if (liberada) ranking.push({ ...h, nota, rascunho: !h.notasConfirmadas })
    else emAvaliacao.push(h)
  }

  // Maior nota primeiro; empate resolve pelo nome para a ordem ser estável.
  ranking.sort((a, b) => b.nota - a.nota || a.nome.localeCompare(b.nome, 'pt-BR'))
  return { ranking, emAvaliacao }
}

// Vídeos de todas as hospedagens mais os vídeos gerais, do mais novo para o mais antigo,
// sem repetir o mesmo vídeo.
export function ultimosVideos(hospedagens, limite = 6, gerais = []) {
  const todos = [
    ...hospedagens.flatMap((h) => h.videos.map((v) => ({ ...v, hospedagem: h.nome }))),
    ...gerais.map((v) => ({ ...v, hospedagem: '' })),
  ]
  const vistos = new Set()
  return todos
    .filter((v) => (vistos.has(v.id) ? false : vistos.add(v.id)))
    .sort((a, b) => b.data.localeCompare(a.data))
    .slice(0, limite)
}
