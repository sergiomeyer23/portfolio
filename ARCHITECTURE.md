# Arquitetura do Portfólio

## Visão geral

Site estático (HTML/CSS/JS puro) servido pelo GitHub Pages. Sem build step e sem
backend: o formulário de contato usa o FormSubmit para entregar mensagens direto
no e-mail.

## Decisões principais

- **Sem framework frontend**: o site é pequeno e o custo de manutenção de um
  framework pesaria mais do que ajudaria. Vanilla mantém tudo legível e fácil de
  ajustar.
- **i18n por objeto `copy`**: termos estáticos (títulos, botões) vivem em
  `copy.br`/`copy.en`. Projetos e serviços têm campos `*En` opcionais para não
  duplicar toda a lista.
- **Renderização por template strings**: simples, suficiente para a quantidade
  de itens. Todo dado externo passa por `escapeHtml()` antes de entrar no DOM.
- **Formulário com duas vias**: FormSubmit quando `action` está configurado;
  fallback para `mailto:` quando não está. Assim o contato nunca fica indisponível
  mesmo sem JavaScript.

## Segurança

- Todo dado vindo de `projects`/`services`/`skills` é escapado em
  `renderProjects`, `renderServices` e `renderSkills`.
- O campo `_honey` do FormSubmit é armadilha anti-spam.

## Acessibilidade

- Link "Pular para o conteúdo", foco visível, menu mobile com `aria-expanded`,
  `role="dialog"` e fechamento por `Esc`/clique fora.
- `prefers-reduced-motion` desativa animações/transições pesadas.

## Persistência

- Idioma selecionado é salvo em `localStorage` (`portfolio-lang`).
- Caso o storage esteja indisponível, o padrão é `br`.
