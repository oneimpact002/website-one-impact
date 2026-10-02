import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    // Tags do assunto (ex.: 'Hostinger'). Viram palavras-chave no Google e aparecem no artigo.
    tags: z.array(z.string()).default([]),
    author: z.string().default('Karoline Christie'),
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    // Vídeo do canal que originou o artigo. Aparece no topo e vira VideoObject no Google.
    video: z
      .object({
        id: z.string(),
        title: z.string(),
        uploadDate: z.coerce.date(),
        duration: z.string(), // formato ISO 8601, ex.: PT15M53S
      })
      .optional(),
    // Quando presente, o artigo mostra o aviso de afiliado e os botões. Valor = produto (ex.: 'hostinger').
    affiliate: z.enum(['hostinger']).optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
