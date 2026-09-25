// Banco central da One Impact, compartilhado com o LinkFlow e com a landing do
// cupom da Hostinger. Usado pelos formulários (leads.js) e pelo rastreio de
// acessos e cliques (track.js).
//
// A chave abaixo é a chave pública (anon). Ela é pública por natureza, vai
// dentro do JavaScript que qualquer visitante baixa. O que protege os dados é o
// RLS no Supabase: essa chave só consegue inserir nas tabelas de leads e de
// eventos, nunca ler, editar ou apagar. A leitura é feita pelo painel do
// Supabase e pelo SiteLens, com login.
export const SUPABASE_URL = 'https://avqoriulvndknmylowox.supabase.co'
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2cW9yaXVsdm5ka25teWxvd294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NTg3ODEsImV4cCI6MjEwMjIzNDc4MX0.Y-5Rsg1tEK5_NDLhxVCqwZJKU_3EXzyDDlzRCLT2OME'
