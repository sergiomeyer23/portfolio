# Arquitetura do Portfólio

## Visão geral

Site estático (HTML/CSS/JS puro) servido pelo GitHub Pages. Sem build step e sem
backend: o formulário de contato usa o FormSubmit para entregar mensagens direto
no e-mail.

## Decisões principais

- **Sem framework frontend**: o site é pequeno e o custo de manutenção de um
  framework pesaria mais do que ajudaria. Vanilla mantém tudo legível e fácil de
  ajustar.
- **i18n por objeto `copy`**: termos estáticos (títulos, botões, rótulos dos
  cases) vivem em `copy.br`/`copy.en`. Projetos e serviços têm campos `*En`
  opcionais para não duplicar toda a lista. Placeholders de formulário usam
  `data-i18n-placeholder`.
- **Renderização por template strings**: simples, suficiente para a quantidade
  de itens. Todo dado externo passa por `escapeHtml()` antes de entrar no DOM.
- **Formulário com duas vias**: FormSubmit quando `action` está configurado;
  fallback para `mailto:` quando não está. Assim o contato nunca fica indisponível
  mesmo sem JavaScript.

- **Filtros e paleta de comandos em Vanilla JS**: cada projeto tem `areas`
  (`data`, `software`, `oss`); `applyProjectFilter()` alterna o atributo `hidden`
  dos cards e guarda o filtro atual entre trocas de idioma. A paleta (Ctrl+K /
  ⌘K) é um `dialog` com foco preso, `Esc` para fechar e retorno do foco ao
  elemento anterior.
- **Spotlight dos cards**: um único `pointermove` no container grava `--mx` e
  `--my` no card sob o cursor; o brilho é desenhado em CSS.

## Vitrine de engenharia

Três arquivos, todos vanilla e sem dependências, comunicando-se por uma API pública enxuta
(`window.portfolio`) e pelo evento `portfolio:languagechange`:

- `engineering.js`: barra de telemetria, DAG do pipeline (SVG puro + slide-over), ADR viewer e
  simulador de benchmark. Os dados editáveis ficam no topo de cada bloco, marcados com `EDIT:`.
- `terminal.js`: terminal embutido (`help`, `tech-stack`, `query`, `pipeline --status`,
  `download cv`, `clear`). Cria o próprio DOM, guarda histórico e saída em `sessionStorage`
  e só captura a crase fora de campos editáveis. Ctrl/Cmd+K continua sendo da paleta.
- Estilos em `style.css`, apenas com variáveis de tema existentes (sem cores novas).

Decisões:

- **Honestidade dos números**: telemetria usa só valores verificáveis do site. Orçamentos do DAG
  e o benchmark são rotulados como alvo/estimativa de modelo, nunca como medição.
- **Desempenho**: animação do fluxo do DAG roda só com o diagrama visível
  (`IntersectionObserver`); contadores animam uma vez; `prefers-reduced-motion` é respeitado.
- **Acessibilidade**: nós do DAG são `role="button"` com nome acessível iniciando pelo texto
  visível (WCAG 2.5.3); painel e terminal fecham com `Esc` e devolvem o foco.

## Segurança

- Todo dado vindo de `projects`/`services`/`skills`/`caseStudies` é escapado em
  `renderProjects`, `renderServices`, `renderSkills` e `renderCases`.
- O campo `_honey` do FormSubmit é armadilha anti-spam.

## Acessibilidade

- Link "Pular para o conteúdo", foco visível e menu mobile como navegação
  expansível não modal, com `aria-expanded`, rótulos traduzidos, fechamento por
  `Esc`/clique fora e retorno de foco ao botão ao usar `Esc` no menu.
- O painel do menu rola em telas baixas e é fechado ao trocar para o layout
  desktop; a navegação por `Tab` pode sair normalmente do painel.
- Navegação inclui link para `#cases` e `scroll-margin-top` compensa o header
  fixo. O link de atalho e o botão de voltar ao topo levam o foco ao conteúdo.
- O botão de voltar ao topo fica oculto e fora da navegação por teclado quando
  não está disponível; os seletores de idioma expõem o estado com `aria-pressed`.
- `prefers-reduced-motion` desativa animações/transições pesadas. Os testes
  automatizados com axe-core complementam, mas não substituem, a revisão manual.

## Persistência

- Idioma selecionado é salvo em `localStorage` (`portfolio-lang`).
- O acesso ao storage é protegido por `try/catch`; se estiver indisponível
  (modo privado ou política do navegador), o padrão é `br`.
