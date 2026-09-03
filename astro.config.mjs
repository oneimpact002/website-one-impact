import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

export default defineConfig({
  // Endereço final do site. É obrigatório para o sitemap: sem ele o Astro não
  // tem como escrever a URL completa de cada página.
  site: 'https://agenciaoneimpact.com.br',

  integrations: [
    react(),
    tailwind(),
    sitemap({
      // Páginas que existem só para redirecionar endereços antigos ficam de
      // fora. Mandar o Google indexar um redirecionamento não ajuda ninguém, e
      // ainda gasta o orçamento de rastreio dele com página vazia.
      filter: (pagina) =>
        !pagina.includes('/clientes-atendidos-id-visual') &&
        !pagina.includes('/id-visual/'),
    }),
  ],

  output: 'static',
});
