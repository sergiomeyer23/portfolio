# Changelog

## v0.6 (2026-11-03)
- Reposiciona o site como Data & Software Engineer (título, hero, sobre, serviços, SEO)
- Novo visual: superfícies translúcidas, brilho esmeralda/ciano, Plus Jakarta Sans e JetBrains Mono nos dados técnicos
- Grid de projetos assimétrico com cards em destaque, fluxo de arquitetura em cada card e borda com spotlight no hover
- Filtros por área (Todos, Data & Analytics, Software & Backend, Open Source) que persistem na troca de idioma
- Nova seção Open Source com os PRs #91 e #106 do Bayer-Group/MotherML
- Paleta de comandos com Ctrl+K / ⌘K (navegação, filtros, idioma, copiar e-mail, currículo)
- Adiciona weg_equity_pipeline, expense-tracker-api, FalowAI e MotherML; remove pandas-fundamentos e retail-sales-analyzer
- Atualiza os testes E2E e adiciona testes para filtros e paleta de comandos

## v0.5 (2026-11-02)
- Adiciona o card e o case do Print Guard (automação de impressão agendada com confirmação)
- Adiciona teste de que o card aparece nos dois idiomas com o repositório correto

## v0.4 (2026-10-26)
- Remove cards de projetos sem repositório público (Pipoca, Personal Finance API) e do dashboard vazio
- Adiciona card da automação de relatórios de vendas em Java
- Corrige links e remove claims de PostgreSQL/Predictive Sales
- Protege leitura e escrita do `localStorage` com `try/catch`
- Traduz rótulos dos cases e placeholders do formulário
- Adiciona link para cases na navegação e melhora `aria-label` do menu mobile
- Carrega a fonte Inter e prioriza a imagem do hero
- Corrige a proporção da foto do hero e ajusta o espaçamento para manter o CTA acima da dobra
- Adiciona `scroll-margin-top` para o header fixo

## v0.3 (2026-10-14)
- Formulário de contato via FormSubmit com fallback para mailto
- Projetos e serviços agora traduzidos em inglês
- Persistência do idioma selecionado
- Melhorias de acessibilidade (skip link, foco visível, menu mobile)
- SEO (Open Graph, Twitter Card, favicon, sitemap, robots)
- Escape de HTML nas renderizações dinâmicas
- Botão voltar ao topo

## v0.2
- Migração para renderização dinâmica via `script.js`
- Versão bilíngue BR/EN dos textos principais
- Menu mobile

## v0.1
- Portfólio inicial com HTML/CSS/JS vanilla
- Projetos, habilidades e serviços estáticos
