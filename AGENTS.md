# Site da One Impact: regras para quem for mexer no código

Este arquivo é para pessoas e agentes de IA que forem editar o site. CLAUDE.md é espelho deste arquivo: edite aqui.

## Regra do rastreio (SiteLens)

Os acessos e cliques do site são medidos pelo SiteLens. Toda página do site precisa do rastreador ligado, senão ela não aparece no SiteLens e nada avisa que faltou.

Ao criar uma página nova em src/pages:

1. No topo do arquivo, dentro do bloco entre os traços, adicione: `import Rastreio from '../components/Rastreio.astro';` (em páginas dentro de uma subpasta, como src/pages/sites, use `../../components/Rastreio.astro`).
2. No fim da página, logo antes de `</body>`, adicione: `<Rastreio />`.

Copiar uma página existente já traz as duas linhas. Só páginas criadas do zero precisam disso. Páginas que apenas redirecionam (meta refresh) ficam sem rastreio de propósito.

Editar texto, imagem, cor ou uma página que já existe não muda nada no SiteLens.

## Botões rastreados

O rastreador registra sozinho os cliques em links de contato (o link curto), Instagram, e-mail e /contato. Para medir qualquer outro botão, coloque no elemento `data-track="nome-do-botao"` e, se quiser um nome legível no relatório, `data-track-label="Texto do botão"`.

## O que não mexer sem avisar

1. O código do site em src/lib/track.js (constante SITE). O SiteLens procura os números por esse código, então trocar o valor faz o site sumir do painel.
2. O link curto de contato (link.oneimpact.com.br/contato-agencia-one-impact). Ele redireciona para /contato, então os botões "WhatsApp" e "Falar com a gente" levam ao formulário, e não ao WhatsApp. Ele é rastreado com o apelido "contato-via-link". A conversão no SiteLens é só o formulário enviado.
