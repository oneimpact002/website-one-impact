# Páginas desativadas

O Astro só publica o que está em `src/pages/`. O que fica aqui sai do ar sem
perder nada: o código continua inteiro, versionado, e volta quando quiser.

## diagnostico-primeira-parte.astro

Desativado em 03/09/2026 a pedido, temporariamente.

O componente que ele usa continua em `src/components/DiagnosticoPrimeiraParte/`
e continua gravando na tabela central de leads com origem `diagnostico`. Nada
foi apagado.

Para reativar:

1. Mova o arquivo de volta para `src/pages/`
2. Devolva o botão "Diagnóstico gratuito do seu digital" em `src/pages/links.astro`
3. Publique

## blog/

Desativado em 03/09/2026 a pedido, temporariamente.

As duas páginas do blog (a lista e o modelo de post) saíram de `src/pages/`.
Os quatro textos continuam em `src/content/blog/`, intactos, e a coleção
continua declarada em `src/content.config.ts`.

Nenhuma página do site linkava para o blog, então desativar não quebrou link
interno nenhum. Mas os endereços que já estavam no Google passam a dar 404.

Para reativar:

1. Mova `blog/` de volta para dentro de `src/pages/`
2. Publique

Vale aproveitar a volta para colocar o blog no menu do topo, em
`src/components/Header.astro`. Ele nunca esteve lá, e por isso quem entrava no
site nunca descobria que existia blog.
