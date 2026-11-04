"use strict";

/*
 * terminal.js — console interativo embutido (CLI + SQL playground simulado)
 *
 * Isolado do restante da página: cria o próprio DOM, guarda o histórico em sessionStorage
 * e só intercepta a crase (`) quando o foco NÃO está em um campo editável. Ctrl/Cmd+K continua
 * pertencendo à paleta de comandos do site; o terminal também abre pelo botão no canto
 * inferior esquerdo e pelo comando "Abrir terminal" da paleta.
 *
 * ONDE ENRIQUECER OS DADOS (procure por "EDIT:"):
 *   - EXPERIENCE   → linhas da tabela "experiencia" consultada por `query`
 *   - STACK_SINCE  → ano de início por tecnologia (habilita o campo "anos" no `tech-stack`)
 */
(() => {
  const app = window.portfolio;
  if (!app) return;

  /**
   * @typedef {{ kind: "cmd" | "out" | "err" | "info", text: string }} Line
   * @typedef {{ history: string[], lines: Line[] }} Session
   * @typedef {(args: string) => string | string[] | void} Handler
   */

  const STORAGE_KEY = "portfolio-terminal";
  const MAX_LINES = 300;
  const MAX_HISTORY = 50;
  const PROMPT = "visitante@sergiomeyer:~$";

  /** @returns {"br" | "en"} */
  const lang = () => (app.getLanguage() === "en" ? "en" : "br");

  /** @param {string} br @param {string} en @returns {string} */
  const t = (br, en) => (lang() === "br" ? br : en);

  /* ------------------------------ sessão ------------------------------ */

  /** @returns {Session} */
  function loadSession() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return { history: [], lines: [] };
      const parsed = JSON.parse(raw);
      return {
        history: Array.isArray(parsed.history) ? parsed.history.slice(-MAX_HISTORY) : [],
        lines: Array.isArray(parsed.lines) ? parsed.lines.slice(-MAX_LINES) : []
      };
    } catch (error) {
      return { history: [], lines: [] };
    }
  }

  /** @type {Session} */
  const session = loadSession();

  function saveSession() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (error) {
      // Armazenamento indisponível (modo privado): o terminal segue funcionando sem persistência.
    }
  }

  /* -------------------------------- DOM -------------------------------- */

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "term-toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "term");
  toggle.innerHTML = `<span aria-hidden="true">&gt;_</span><span class="visually-hidden"></span>`;

  const drawer = document.createElement("section");
  drawer.id = "term";
  drawer.className = "term";
  drawer.hidden = true;
  drawer.setAttribute("role", "region");
  drawer.innerHTML = `
    <div class="term-bar">
      <span class="term-title" id="termTitle">sergiomeyer.dev — bash</span>
      <button class="term-close" type="button"></button>
    </div>
    <div class="term-out" id="termOut" role="log" aria-live="polite" tabindex="0"></div>
    <form class="term-form" autocomplete="off">
      <label class="term-prompt" for="termInput">${PROMPT}</label>
      <input class="term-input" id="termInput" type="text" spellcheck="false" autocapitalize="off" autocomplete="off" enterkeyhint="send">
    </form>`;

  document.body.append(toggle, drawer);

  const out = /** @type {HTMLElement} */ (drawer.querySelector("#termOut"));
  const form = /** @type {HTMLFormElement} */ (drawer.querySelector(".term-form"));
  const input = /** @type {HTMLInputElement} */ (drawer.querySelector("#termInput"));
  const closeButton = /** @type {HTMLButtonElement} */ (drawer.querySelector(".term-close"));

  function applyLabels() {
    const label = t("Abrir terminal interativo (atalho: `)", "Open interactive terminal (shortcut: `)");
    const hidden = toggle.querySelector(".visually-hidden");
    if (hidden) hidden.textContent = label;
    toggle.title = label;
    drawer.setAttribute("aria-label", t("Terminal interativo", "Interactive terminal"));
    out.setAttribute("aria-label", t("Saída do terminal", "Terminal output"));
    closeButton.textContent = t("Fechar", "Close");
    closeButton.setAttribute("aria-label", t("Fechar terminal", "Close terminal"));
    input.setAttribute("aria-label", t("Comando do terminal", "Terminal command"));
  }

  /** @param {string} text @param {Line["kind"]} kind @param {boolean} [persist] */
  function print(text, kind, persist = true) {
    const row = document.createElement("div");
    row.className = `term-line term-k-${kind}`;
    row.textContent = text;
    out.appendChild(row);
    out.scrollTop = out.scrollHeight;

    if (persist) {
      session.lines.push({ kind, text });
      if (session.lines.length > MAX_LINES) session.lines.splice(0, session.lines.length - MAX_LINES);
      saveSession();
    }
  }

  function restoreLines() {
    out.textContent = "";
    session.lines.forEach(line => print(line.text, line.kind, false));
  }

  /* --------------------------- dados do currículo --------------------------- */

  /*
   * EDIT: tabela "experiencia" consultada por `query`. Só há o que o próprio site afirma; os
   * períodos ficam em "—" até você preencher as datas reais (ex.: "2021–2024").
   */
  /** @type {readonly Record<string, string>[]} */
  const EXPERIENCE = [
    {
      periodo: "—",
      cargo: "Análise comercial e inteligência de vendas (FMCG, distribuição, varejo)",
      realizacao_chave: "Gestão analítica de carteira de 4.000 clientes ativos e suporte estratégico a 50 vendedores",
      tecnologia: "Excel; Power Query; DAX; Power BI"
    },
    {
      periodo: "—",
      cargo: "Engenharia de dados: Olist Sales Performance Analysis",
      realizacao_chave: "Pipeline de 9 CSVs com cache em Parquet, 20 funções de análise e dashboard Streamlit",
      tecnologia: "Python; Pandas; Plotly; Streamlit; Pytest"
    },
    {
      periodo: "—",
      cargo: "Engenharia de dados e full-stack: Mercavel",
      realizacao_chave: "Coleta diária de preços em 4 shards paralelos com pareamento por EAN e heurística",
      tecnologia: "TypeScript; React; Node.js; Supabase; GitHub Actions"
    },
    {
      periodo: "—",
      cargo: "Backend: Expense Tracker API",
      realizacao_chave: "API REST em camadas com Flyway, OpenAPI (Swagger), Actuator e CI",
      tecnologia: "Java 21; Spring Boot; PostgreSQL; Flyway; Docker"
    },
    {
      periodo: "—",
      cargo: "Open source: MotherML (Bayer-Group)",
      realizacao_chave: "2 PRs: Model Registry (#91) e Murcko Scaffold Grouping (#106)",
      tecnologia: "Python; Machine Learning"
    }
  ];

  const COLUMNS = ["periodo", "cargo", "realizacao_chave", "tecnologia"];

  /*
   * EDIT: informe o ano em que começou em cada tecnologia (ex.: { Python: 2022 }) e o campo
   * "anos" passa a aparecer no `tech-stack`. Vazio = o campo é omitido (nada é inventado).
   */
  /** @type {Record<string, number>} */
  const STACK_SINCE = {};

  const STACK_GROUPS = [
    { group: "languages", items: [["Python", /^python$/i], ["SQL", /sql/i], ["Java", /^java( |$)/i], ["TypeScript", /^typescript$/i]] },
    { group: "backend_and_data", items: [["Spring Boot", /^spring boot$/i], ["PostgreSQL", /^postgresql$/i], ["Pandas", /^pandas$/i], ["React", /^react$/i]] },
    { group: "delivery", items: [["Docker", /^docker/i], ["GitHub Actions", /^github actions$/i]] }
  ];

  /* ------------------------------ formatação ------------------------------ */

  /** @param {string[]} columns @param {string[][]} rows @returns {string[]} */
  function asciiTable(columns, rows) {
    const widths = columns.map((column, index) => Math.max(column.length, ...rows.map(row => row[index].length)));
    const line = `+${widths.map(width => "-".repeat(width + 2)).join("+")}+`;
    const format = (/** @type {string[]} */ cells) => `| ${cells.map((cell, index) => cell.padEnd(widths[index])).join(" | ")} |`;
    return [line, format(columns), line, ...rows.map(format), line];
  }

  /** @param {string[]} columns @param {string[][]} rows @returns {string[]} */
  function expandedTable(columns, rows) {
    const width = Math.max(...columns.map(column => column.length));
    return rows.flatMap((row, index) => [
      `-[ RECORD ${index + 1} ]-`,
      ...columns.map((column, position) => `${column.padEnd(width)} | ${row[position]}`)
    ]);
  }

  /** @returns {number} caracteres que cabem em uma linha do terminal */
  function lineCapacity() {
    const probe = document.createElement("span");
    probe.className = "term-line";
    probe.style.visibility = "hidden";
    probe.style.position = "absolute";
    probe.textContent = "0".repeat(20);
    out.appendChild(probe);
    const charWidth = probe.getBoundingClientRect().width / 20 || 8;
    probe.remove();
    return Math.floor((out.clientWidth - 28) / charWidth);
  }

  /* -------------------------------- query -------------------------------- */

  /** @param {string} pattern @returns {RegExp} */
  function likeToRegExp(pattern) {
    const source = pattern
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/%/g, ".*")
      .replace(/_/g, ".");
    return new RegExp(`^${source}$`, "i");
  }

  /** @param {string} sql @returns {string[]} */
  function runQuery(sql) {
    const match = /^select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(.+?))?(?:\s+limit\s+(\d+))?\s*;?\s*$/is.exec(sql.trim());
    if (!match) {
      return [t("erro de sintaxe. Exemplo:", "syntax error. Example:"), "SELECT periodo, cargo FROM experiencia WHERE tecnologia LIKE '%Java%';"];
    }

    const [, columnList, table, where, limit] = match;
    if (table.toLowerCase() !== "experiencia") {
      return [`ERROR: relation "${table}" does not exist`, t("Tabelas disponíveis: experiencia", "Available tables: experiencia")];
    }

    const columns = columnList.trim() === "*" ? COLUMNS : columnList.split(",").map(column => column.trim().toLowerCase());
    const unknown = columns.find(column => !COLUMNS.includes(column));
    if (unknown) {
      return [`ERROR: column "${unknown}" does not exist`, `${t("Colunas", "Columns")}: ${COLUMNS.join(", ")}`];
    }

    /** @type {{ column: string, test: (value: string) => boolean }[]} */
    const conditions = [];
    if (where) {
      for (const part of where.split(/\s+and\s+/i)) {
        const condition = /^(\w+)\s+(like|=)\s+'([^']*)'$/i.exec(part.trim());
        if (!condition || !COLUMNS.includes(condition[1].toLowerCase())) {
          return [`ERROR: ${t("condição WHERE não suportada", "unsupported WHERE condition")}: ${part.trim()}`, t("Use coluna LIKE '%texto%' ou coluna = 'texto'.", "Use column LIKE '%text%' or column = 'text'.")];
        }
        const expected = condition[3];
        const test = condition[2].toLowerCase() === "like" ? likeToRegExp(expected) : null;
        conditions.push({
          column: condition[1].toLowerCase(),
          test: value => (test ? test.test(value) : value.toLowerCase() === expected.toLowerCase())
        });
      }
    }

    let rows = EXPERIENCE.filter(row => conditions.every(condition => condition.test(row[condition.column])));
    if (limit) rows = rows.slice(0, Number(limit));

    const matrix = rows.map(row => columns.map(column => row[column]));
    const footer = `(${rows.length} ${rows.length === 1 ? t("linha", "row") : t("linhas", "rows")})`;
    if (!rows.length) return [footer];

    const flat = asciiTable(columns, matrix);
    const fits = Math.max(...flat.map(row => row.length)) <= lineCapacity();
    return [...(fits ? flat : expandedTable(columns, matrix)), footer];
  }

  /* ------------------------------- comandos ------------------------------- */

  /** @returns {string} */
  function techStackJson() {
    const projects = app.projects;
    const report = Object.fromEntries(
      STACK_GROUPS.map(({ group, items }) => [
        group,
        items.map(([name, pattern]) => {
          const entry = /** @type {Record<string, string | number>} */ ({
            name,
            projetos: projects.filter(project => project.technologies.some(technology => pattern.test(technology))).length
          });
          if (STACK_SINCE[name]) entry.anos = new Date().getFullYear() - STACK_SINCE[name];
          return entry;
        })
      ])
    );
    report.note = t(
      "projetos = repositórios do portfólio que declaram a tecnologia",
      "projetos = portfolio repositories that declare the technology"
    );
    return JSON.stringify(report, null, 2);
  }

  /** @returns {string[]} */
  function pipelineStatus() {
    const budgets = /** @type {{ name: string, p99: string, throughput: string }[]} */ (
      typeof app.dagBudgets === "function" ? app.dagBudgets() : []
    );
    const table = asciiTable(
      [t("estágio", "stage"), "p99", "throughput"],
      budgets.map(item => [item.name, item.p99, item.throughput])
    );
    const repositories = app.projects.filter(project => project.ci).map(project => `  - ${project.title}: ${project.repository}`);

    return [
      t("Pipeline de referência: orçamentos de projeto (alvos), não medições ao vivo.", "Reference pipeline: design budgets (targets), not live measurements."),
      ...table,
      "",
      t("CI (GitHub Actions) com status ao vivo nos cards de projeto:", "CI (GitHub Actions) with live status on the project cards:"),
      ...repositories
    ];
  }

  /** @type {Record<string, Handler>} */
  const commands = {
    help: () => [
      t("Comandos disponíveis:", "Available commands:"),
      `  help                 ${t("lista os comandos", "lists the commands")}`,
      `  tech-stack           ${t("tecnologias em JSON", "technologies as JSON")}`,
      `  query <SQL>          ${t("consulta a tabela experiencia", "queries the experiencia table")}`,
      `  pipeline --status    ${t("orçamentos do pipeline de referência", "reference pipeline budgets")}`,
      `  download cv [data|software]   ${t("baixa o currículo em PDF", "downloads the résumé PDF")}`,
      `  clear                ${t("limpa a tela", "clears the screen")}`,
      "",
      t("Exemplo:", "Example:"),
      "  query SELECT periodo, cargo, realizacao_chave FROM experiencia WHERE tecnologia LIKE '%Java%';",
      t("Dica: ↑/↓ percorrem o histórico, Tab completa o comando, Esc fecha.", "Tip: ↑/↓ browse history, Tab completes the command, Esc closes.")
    ],
    "tech-stack": () => techStackJson().split("\n"),
    query: args => (args.trim() ? runQuery(args) : [t("uso: query SELECT ... FROM experiencia ...;", "usage: query SELECT ... FROM experiencia ...;")]),
    pipeline: args => {
      if (args.trim() === "--status") return pipelineStatus();
      return [t("uso: pipeline --status", "usage: pipeline --status")];
    },
    download: args => {
      const [target, version = "software"] = args.trim().split(/\s+/);
      if (target !== "cv" || !["data", "software"].includes(version)) {
        return [t("uso: download cv [data|software]", "usage: download cv [data|software]")];
      }
      app.downloadResume(version);
      return [t(`Baixando currículo (${version})...`, `Downloading résumé (${version})...`)];
    },
    clear: () => {
      session.lines = [];
      saveSession();
      out.textContent = "";
    }
  };

  /** @param {string} raw */
  function execute(raw) {
    const command = raw.trim();
    if (!command) return;

    print(`${PROMPT} ${command}`, "cmd");
    if (session.history[session.history.length - 1] !== command) session.history.push(command);
    session.history = session.history.slice(-MAX_HISTORY);
    saveSession();

    // Atalho: um SELECT digitado direto é tratado como `query`.
    const normalized = /^select\s/i.test(command) ? `query ${command}` : command;
    const [name] = normalized.split(/\s+/);
    const handler = commands[name.toLowerCase()];

    if (!handler) {
      print(t(`comando não encontrado: ${name}. Digite help.`, `command not found: ${name}. Type help.`), "err");
      return;
    }

    const result = handler(normalized.slice(name.length).trim());
    if (result === undefined) return;
    (Array.isArray(result) ? result : [result]).forEach(text => print(text, "out"));
  }

  /* -------------------------- abrir, fechar e foco -------------------------- */

  /** @type {Element | null} */
  let returnFocus = null;

  function openTerminal() {
    if (!drawer.hidden) return;
    returnFocus = document.activeElement;
    drawer.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    if (!session.lines.length) print(t("Bem-vindo. Digite help para ver os comandos.", "Welcome. Type help to see the commands."), "info");
    out.scrollTop = out.scrollHeight;
    input.focus();
  }

  function closeTerminal() {
    if (drawer.hidden) return;
    drawer.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    const target = returnFocus instanceof HTMLElement && returnFocus !== document.body ? returnFocus : toggle;
    target.focus();
  }

  function toggleTerminal() {
    if (drawer.hidden) openTerminal();
    else closeTerminal();
  }

  /** @param {EventTarget | null} target @returns {boolean} */
  function isEditable(target) {
    return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
  }

  let historyIndex = -1;

  toggle.addEventListener("click", toggleTerminal);
  closeButton.addEventListener("click", closeTerminal);
  document.addEventListener("portfolio:toggle-terminal", toggleTerminal);

  form.addEventListener("submit", event => {
    event.preventDefault();
    const value = input.value;
    input.value = "";
    historyIndex = -1;
    execute(value);
  });

  input.addEventListener("keydown", event => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!session.history.length) return;
      historyIndex = historyIndex === -1 ? session.history.length - 1 : Math.max(0, historyIndex - 1);
      input.value = session.history[historyIndex];
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;
      historyIndex += 1;
      if (historyIndex >= session.history.length) {
        historyIndex = -1;
        input.value = "";
      } else {
        input.value = session.history[historyIndex];
      }
    } else if (event.key === "Tab" && input.value && !input.value.includes(" ")) {
      const matches = Object.keys(commands).filter(name => name.startsWith(input.value.toLowerCase()));
      if (matches.length === 1) {
        event.preventDefault();
        input.value = `${matches[0]} `;
      }
    }
  });

  drawer.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeTerminal();
    }
  });

  // Atalho global: só age fora de campos editáveis e nunca com modificadores.
  document.addEventListener("keydown", event => {
    const isBacktick = event.key === "`" || event.code === "Backquote";
    if (!isBacktick || event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return;

    if (event.target === input) {
      event.preventDefault();
      closeTerminal();
      return;
    }

    if (isEditable(event.target)) return;

    const palette = document.getElementById("cmd");
    if (palette && !palette.hidden) return;

    event.preventDefault();
    toggleTerminal();
  });

  document.addEventListener("portfolio:languagechange", applyLabels);

  applyLabels();
  restoreLines();
})();
