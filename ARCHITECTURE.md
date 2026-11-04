# Arquitetura do Portfólio

## Visão geral

Site estático servido pelo GitHub Pages. O código-fonte é TypeScript em `src/` e o
esbuild gera `script.js`, `engineering.js` e `terminal.js` na raiz, que ficam commitados.
Não há backend: o formulário de contato usa o FormSubmit para entregar mensagens direto
no e-mail.

## Decisões principais

- **Sem framework frontend**: o site é pequeno e um framework custaria mais
  manutenção do que devolve. O único passo de build é a compilação do TypeScript.
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

## TypeScript e build

O código está em `src/`: `script.ts` (interface, i18n, filtros e paleta), `engineering.ts`,
`terminal.ts`, os dados em `data.ts` e os tipos em `types.ts`. O `tsc` roda em modo estrito
sem emitir nada, e o esbuild empacota cada entrada num arquivo com o mesmo nome de antes.

- `npm run build` gera os três arquivos JS. Não edite os JS da raiz, o build sobrescreve.
- `npm run typecheck` checa os tipos.
- `npm run verify:build` falha se os JS commitados não batem com o que o build produz.
- `npm test` roda o build antes dos testes.

Os JS gerados ficam no repositório de propósito. O GitHub Pages publica a branch como
está, então nenhuma configuração extra é necessária.

## Vitrine de engenharia

`engineering.ts` e `terminal.ts` conversam com `script.ts` por `window.portfolio` (idioma,
projetos, download do currículo) e pelo evento `portfolio:languagechange`.

`engineering.ts` cuida da barra de telemetria, do DAG do pipeline (SVG puro com painel
lateral), dos ADRs e do simulador de benchmark. Os dados editáveis ficam no começo de cada
bloco, marcados com `EDIT:`.

`terminal.ts` implementa `help`, `tech-stack`, `query`, `pipeline --status`, `download cv` e
`clear`. Guarda histórico e saída em `sessionStorage` e só captura a crase quando o foco não
está num campo editável. Ctrl/Cmd+K continua abrindo a paleta de comandos.

Os estilos novos usam só as variáveis de tema que já existiam.

- A telemetria mostra apenas números que dá para conferir no próprio site. Os orçamentos do
  DAG e o benchmark aparecem na tela como alvo e estimativa, nunca como medição.
- A animação do fluxo do DAG só roda com o diagrama visível. Os contadores animam uma vez e
  `prefers-reduced-motion` é respeitado.
- Os nós do DAG são `role="button"` e o nome acessível começa pelo texto visível (WCAG
  2.5.3). O painel e o terminal fecham com Esc e devolvem o foco.

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
