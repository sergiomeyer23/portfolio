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
  fixo.
- `prefers-reduced-motion` desativa animações/transições pesadas.

## Persistência

- Idioma selecionado é salvo em `localStorage` (`portfolio-lang`).
- O acesso ao storage é protegido por `try/catch`; se estiver indisponível
  (modo privado ou política do navegador), o padrão é `br`.
