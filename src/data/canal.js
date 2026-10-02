// Dados do canal para a página /patrocinio (media kit).
//
// Preencha os números com os valores do YouTube Studio e a data da consulta.
// Todo campo que ficar como null NÃO aparece na página: melhor sem o número do
// que com um número desatualizado ou inventado. Confira a cada mês.
export const CANAL = {
  nome: 'Karol Christie',
  url: 'https://www.youtube.com/@karolchristie',
  inscreverUrl: 'https://www.youtube.com/@karolchristie?sub_confirmation=1',

  // Números do canal. Exemplo de preenchimento: inscritos: '12,5 mil'.
  numeros: {
    inscritos: '18,8 mil',
    visualizacoesTotais: '903 mil', // total desde o início do canal (903.154 em 01/10/2026)
    visualizacoes28dias: '7,5 mil',
    mediaVisualizacoesPorVideo: null,
    videosPublicados: null,
    frequencia: null, // ex.: '1 vídeo por semana'
  },
  numerosAtualizadosEm: '01/10/2026', // período das visualizações: 4 de set. a 1 de out. de 2026

  // Perfil do público (YouTube Studio > Público). Exemplo: principalFaixaEtaria: '25 a 44 anos'.
  publico: {
    principalFaixaEtaria: null,
    paisPrincipal: null, // ex.: 'Brasil (95%)'
    generos: null, // ex.: '60% mulheres, 40% homens'
  },

  // Vídeo mais visto do canal (seção própria na página). Atualize as visualizações
  // junto com os números acima.
  destaqueMaisVisto: {
    id: 'exBe9jr4_QM',
    titulo: 'Melhores Plataformas para Criar o seu Site [ Melhores Opções - 2022 ]',
    publicadoEm: 'maio de 2022',
    duracao: '40 minutos',
    visualizacoes: '72,6 mil', // 72.590 em 01/10/2026
  },

  // Vídeos de destaque: cada um tem um artigo no blog com link de afiliado rastreado.
  videosDestaque: [
    {
      id: 'aZdS_FIphxA',
      titulo: 'Qual plano da HOSTINGER é melhor para CRIAR SITE em 2026',
      artigo: '/blog/qual-plano-da-hostinger-para-criar-site',
    },
    {
      id: 'CK9_nYkOYZA',
      titulo: 'Hospedagem Hostinger Ainda Vale a Pena pra CRIAR SITES em 2026?',
      artigo: '/blog/hostinger-ainda-vale-a-pena-para-criar-sites',
    },
  ],
}

// Rótulos dos números, na ordem em que aparecem.
export const ROTULOS_NUMEROS = {
  inscritos: 'inscritos',
  visualizacoesTotais: 'visualizações acumuladas no canal',  visualizacoes28dias: 'visualizações nos últimos 28 dias',
  mediaVisualizacoesPorVideo: 'visualizações por vídeo, em média',
  videosPublicados: 'vídeos publicados',
  frequencia: 'frequência de publicação',
}

export const ROTULOS_PUBLICO = {
  principalFaixaEtaria: 'faixa etária principal',
  paisPrincipal: 'país principal',
  generos: 'gênero',
}
