// Projetos de identidade visual.
// Para adicionar um projeto: criar a pasta public/id-visual/<slug>/ com as pranchas
// (prancha-1.webp, prancha-2.webp...) e acrescentar um bloco aqui.
export const projects = [
  {
    slug: 'katiuscia-souza',
    name: 'Dra. Katiuscia Souza',
    tag: 'Saúde · Endocrinologia',
    desc: 'Identidade visual para endocrinologista em Atibaia e São Paulo. Marca elegante e acolhedora em verde-sálvia, com monograma autoral e aplicações em papelaria, brochuras e materiais de consultório.',
    chips: ['Logo e monograma', 'Paleta e tipografia', 'Papelaria completa'],
    cover: '/id-visual/katiuscia-souza/capa.webp',
    slides: Array.from({ length: 9 }, (_, i) => `/id-visual/katiuscia-souza/prancha-${i + 1}.webp`),
  },
  {
    slug: 'mundo-automatik',
    name: 'Mundo Automatik',
    tag: 'Tecnologia · Automação',
    desc: 'Identidade visual para o Automatik, ecossistema de automação open source. Marca tech em roxo vibrante, com símbolo hexagonal, tipografia ZT Nature e aplicações digitais e impressas.',
    chips: ['Marca do zero', 'Logo e símbolo', 'Paleta e tipografia'],
    cover: '/id-visual/mundo-automatik/prancha-11.webp',
    slides: Array.from({ length: 15 }, (_, i) => `/id-visual/mundo-automatik/prancha-${i + 1}.webp`),
  },
  {
    slug: 'casa-tres-arquitetura',
    name: 'Casa Três Arquitetura',
    tag: 'Arquitetura · Tijuca, RJ',
    desc: 'Identidade visual para escritório de arquitetura com mais de 35 anos de atuação. Marca acolhedora em tons terrosos — areia quente, sálvia azulada e terracota — refletindo a estética natural e fluida dos projetos da Casa Três.',
    chips: ['Rebranding', 'Logo e paleta', 'Aplicações da marca'],
    cover: '/id-visual/casa-tres-arquitetura/prancha-13.webp',
    slides: Array.from({ length: 13 }, (_, i) => `/id-visual/casa-tres-arquitetura/prancha-${i + 1}.webp`),
  },
  {
    slug: 'dra-karina-morgarbel',
    name: 'Dra. Karina Morgarbel',
    tag: 'Saúde · Dermatologia',
    desc: 'Identidade visual para dermatologista, unindo beleza com identidade e ciência com alma. Monograma autoral em terracota, serifa elegante Playfair Display e paleta em oliva, terracota e off-white.',
    chips: ['Logo e monograma', 'Paleta e tipografia', 'Aplicações da marca'],
    cover: '/id-visual/dra-karina-morgarbel/prancha-6.webp',
    slides: [3, 4, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => `/id-visual/dra-karina-morgarbel/prancha-${n}.webp`),
  },
]
