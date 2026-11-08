/* Gerado a partir de src/*.ts por npm run build. Edite os arquivos em src/. */
"use strict";
(() => {
  // src/terminal.ts
  (() => {
    const app = window.portfolio;
    if (!app) return;
    const STORAGE_KEY = "portfolio-terminal";
    const MAX_LINES = 300;
    const MAX_HISTORY = 50;
    const PROMPT = "visitante@sergiomeyer:~$";
    const lang = () => app.getLanguage() === "en" ? "en" : "br";
    const t = (br, en) => lang() === "br" ? br : en;
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
    const session = loadSession();
    function saveSession() {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } catch (error) {
      }
    }
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
      <span class="term-title" id="termTitle">sergiomeyer.dev (bash)</span>
      <button class="term-close" type="button"></button>
    </div>
    <div class="term-out" id="termOut" role="log" aria-live="polite" tabindex="0"></div>
    <form class="term-form" autocomplete="off">
      <label class="term-prompt" for="termInput">${PROMPT}</label>
      <input class="term-input" id="termInput" type="text" spellcheck="false" autocapitalize="off" autocomplete="off" enterkeyhint="send">
    </form>`;
    document.body.append(toggle, drawer);
    const out = drawer.querySelector("#termOut");
    const form = drawer.querySelector(".term-form");
    const input = drawer.querySelector("#termInput");
    const closeButton = drawer.querySelector(".term-close");
    function applyLabels() {
      const label = t("Abrir terminal interativo (atalho: `)", "Open interactive terminal (shortcut: `)");
      const hidden = toggle.querySelector(".visually-hidden");
      if (hidden) hidden.textContent = label;
      toggle.title = label;
      drawer.setAttribute("aria-label", t("Terminal interativo", "Interactive terminal"));
      out.setAttribute("aria-label", t("Sa\xEDda do terminal", "Terminal output"));
      closeButton.textContent = t("Fechar", "Close");
      closeButton.setAttribute("aria-label", t("Fechar terminal", "Close terminal"));
      input.setAttribute("aria-label", t("Comando do terminal", "Terminal command"));
    }
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
      session.lines.forEach((line) => print(line.text, line.kind, false));
    }
    const EXPERIENCE = [
      {
        periodo: "n/d",
        cargo: "An\xE1lise comercial e intelig\xEAncia de vendas (FMCG, distribui\xE7\xE3o, varejo)",
        realizacao_chave: "Gest\xE3o anal\xEDtica de carteira de 4.000 clientes ativos e suporte estrat\xE9gico a 50 vendedores",
        tecnologia: "Excel; Power Query; DAX; Power BI"
      },
      {
        periodo: "n/d",
        cargo: "Engenharia de dados: Olist Sales Performance Analysis",
        realizacao_chave: "Pipeline de 9 CSVs com cache em Parquet, 20 fun\xE7\xF5es de an\xE1lise e dashboard Streamlit",
        tecnologia: "Python; Pandas; Plotly; Streamlit; Pytest"
      },
      {
        periodo: "n/d",
        cargo: "Engenharia de dados e full-stack: Mercavel",
        realizacao_chave: "Coleta di\xE1ria de pre\xE7os em 4 shards paralelos com pareamento por EAN e heur\xEDstica",
        tecnologia: "TypeScript; React; Node.js; Supabase; GitHub Actions"
      },
      {
        periodo: "n/d",
        cargo: "Backend: Expense Tracker API",
        realizacao_chave: "API REST em camadas com Flyway, OpenAPI (Swagger), Actuator e CI",
        tecnologia: "Java 21; Spring Boot; PostgreSQL; Flyway; Docker"
      },
      {
        periodo: "n/d",
        cargo: "Open source: MotherML (Bayer-Group)",
        realizacao_chave: "2 PRs: corre\xE7\xE3o no Model Registry (#91) e Murcko Scaffold Grouping (#106)",
        tecnologia: "Python; Machine Learning"
      }
    ];
    const COLUMNS = ["periodo", "cargo", "realizacao_chave", "tecnologia"];
    const STACK_SINCE = {};
    const STACK_GROUPS = [
      { group: "languages", items: [["Python", /^python$/i], ["SQL", /sql/i], ["Java", /^java( |$)/i], ["TypeScript", /^typescript$/i]] },
      { group: "backend_and_data", items: [["Spring Boot", /^spring boot$/i], ["PostgreSQL", /^postgresql$/i], ["Pandas", /^pandas$/i], ["React", /^react$/i]] },
      { group: "delivery", items: [["Docker", /^docker/i], ["GitHub Actions", /^github actions$/i]] }
    ];
    function asciiTable(columns, rows) {
      const widths = columns.map((column, index) => Math.max(column.length, ...rows.map((row) => row[index].length)));
      const line = `+${widths.map((width) => "-".repeat(width + 2)).join("+")}+`;
      const format = (cells) => `| ${cells.map((cell, index) => cell.padEnd(widths[index])).join(" | ")} |`;
      return [line, format(columns), line, ...rows.map(format), line];
    }
    function expandedTable(columns, rows) {
      const width = Math.max(...columns.map((column) => column.length));
      return rows.flatMap((row, index) => [
        `-[ RECORD ${index + 1} ]-`,
        ...columns.map((column, position) => `${column.padEnd(width)} | ${row[position]}`)
      ]);
    }
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
    function likeToRegExp(pattern) {
      const source = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*").replace(/_/g, ".");
      return new RegExp(`^${source}$`, "i");
    }
    function runQuery(sql) {
      const match = /^select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(.+?))?(?:\s+limit\s+(\d+))?\s*;?\s*$/is.exec(sql.trim());
      if (!match) {
        return [t("erro de sintaxe. Exemplo:", "syntax error. Example:"), "SELECT periodo, cargo FROM experiencia WHERE tecnologia LIKE '%Java%';"];
      }
      const [, columnList, table, where, limit] = match;
      if (table.toLowerCase() !== "experiencia") {
        return [`ERROR: relation "${table}" does not exist`, t("Tabelas dispon\xEDveis: experiencia", "Available tables: experiencia")];
      }
      const columns = columnList.trim() === "*" ? COLUMNS : columnList.split(",").map((column) => column.trim().toLowerCase());
      const unknown = columns.find((column) => !COLUMNS.includes(column));
      if (unknown) {
        return [`ERROR: column "${unknown}" does not exist`, `${t("Colunas", "Columns")}: ${COLUMNS.join(", ")}`];
      }
      const conditions = [];
      if (where) {
        for (const part of where.split(/\s+and\s+/i)) {
          const condition = /^(\w+)\s+(like|=)\s+'([^']*)'$/i.exec(part.trim());
          if (!condition || !COLUMNS.includes(condition[1].toLowerCase())) {
            return [`ERROR: ${t("condi\xE7\xE3o WHERE n\xE3o suportada", "unsupported WHERE condition")}: ${part.trim()}`, t("Use coluna LIKE '%texto%' ou coluna = 'texto'.", "Use column LIKE '%text%' or column = 'text'.")];
          }
          const expected = condition[3];
          const test = condition[2].toLowerCase() === "like" ? likeToRegExp(expected) : null;
          conditions.push({
            column: condition[1].toLowerCase(),
            test: (value) => test ? test.test(value) : value.toLowerCase() === expected.toLowerCase()
          });
        }
      }
      let rows = EXPERIENCE.filter((row) => conditions.every((condition) => condition.test(row[condition.column])));
      if (limit) rows = rows.slice(0, Number(limit));
      const matrix = rows.map((row) => columns.map((column) => row[column]));
      const footer = `(${rows.length} ${rows.length === 1 ? t("linha", "row") : t("linhas", "rows")})`;
      if (!rows.length) return [footer];
      const flat = asciiTable(columns, matrix);
      const fits = Math.max(...flat.map((row) => row.length)) <= lineCapacity();
      return [...fits ? flat : expandedTable(columns, matrix), footer];
    }
    function techStackJson() {
      const projects = app.projects;
      const report = Object.fromEntries(
        STACK_GROUPS.map(({ group, items }) => [
          group,
          items.map(([name, pattern]) => {
            const entry = {
              name,
              projetos: projects.filter((project) => project.technologies.some((technology) => pattern.test(technology))).length
            };
            if (STACK_SINCE[name]) entry.anos = (/* @__PURE__ */ new Date()).getFullYear() - STACK_SINCE[name];
            return entry;
          })
        ])
      );
      report.note = t(
        "projetos = reposit\xF3rios do portf\xF3lio que declaram a tecnologia",
        "projetos = portfolio repositories that declare the technology"
      );
      return JSON.stringify(report, null, 2);
    }
    function pipelineStatus() {
      const budgets = app.dagBudgets?.() ?? [];
      const table = asciiTable(
        [t("est\xE1gio", "stage"), "p99", "throughput"],
        budgets.map((item) => [item.name, item.p99, item.throughput])
      );
      const repositories = app.projects.flatMap(
        (project) => project.ci && project.repository ? [`  - ${project.title}: ${project.repository}`] : []
      );
      return [
        t("Pipeline de refer\xEAncia: or\xE7amentos de projeto (alvos), n\xE3o medi\xE7\xF5es ao vivo.", "Reference pipeline: design budgets (targets), not live measurements."),
        ...table,
        "",
        t("CI (GitHub Actions) com status ao vivo nos cards de projeto:", "CI (GitHub Actions) with live status on the project cards:"),
        ...repositories
      ];
    }
    const commands = {
      help: () => [
        t("Comandos dispon\xEDveis:", "Available commands:"),
        `  help                 ${t("lista os comandos", "lists the commands")}`,
        `  tech-stack           ${t("tecnologias em JSON", "technologies as JSON")}`,
        `  query <SQL>          ${t("consulta a tabela experiencia", "queries the experiencia table")}`,
        `  pipeline --status    ${t("or\xE7amentos do pipeline de refer\xEAncia", "reference pipeline budgets")}`,
        `  download cv [data|software]   ${t("baixa o curr\xEDculo em PDF", "downloads the r\xE9sum\xE9 PDF")}`,
        `  clear                ${t("limpa a tela", "clears the screen")}`,
        "",
        t("Exemplo:", "Example:"),
        "  query SELECT periodo, cargo, realizacao_chave FROM experiencia WHERE tecnologia LIKE '%Java%';",
        t("Dica: \u2191/\u2193 percorrem o hist\xF3rico, Tab completa o comando, Esc fecha.", "Tip: \u2191/\u2193 browse history, Tab completes the command, Esc closes.")
      ],
      "tech-stack": () => techStackJson().split("\n"),
      query: (args) => args.trim() ? runQuery(args) : [t("uso: query SELECT ... FROM experiencia ...;", "usage: query SELECT ... FROM experiencia ...;")],
      pipeline: (args) => {
        if (args.trim() === "--status") return pipelineStatus();
        return [t("uso: pipeline --status", "usage: pipeline --status")];
      },
      download: (args) => {
        const [target, version = "software"] = args.trim().split(/\s+/);
        if (target !== "cv" || !["data", "software"].includes(version)) {
          return [t("uso: download cv [data|software]", "usage: download cv [data|software]")];
        }
        app.downloadResume(version);
        return [t(`Baixando curr\xEDculo (${version})...`, `Downloading r\xE9sum\xE9 (${version})...`)];
      },
      clear: () => {
        session.lines = [];
        saveSession();
        out.textContent = "";
      }
    };
    function execute(raw) {
      const command = raw.trim();
      if (!command) return;
      print(`${PROMPT} ${command}`, "cmd");
      if (session.history[session.history.length - 1] !== command) session.history.push(command);
      session.history = session.history.slice(-MAX_HISTORY);
      saveSession();
      const normalized = /^select\s/i.test(command) ? `query ${command}` : command;
      const [name] = normalized.split(/\s+/);
      const handler = commands[name.toLowerCase()];
      if (!handler) {
        print(t(`comando n\xE3o encontrado: ${name}. Digite help.`, `command not found: ${name}. Type help.`), "err");
        return;
      }
      const result = handler(normalized.slice(name.length).trim());
      if (result === void 0) return;
      (Array.isArray(result) ? result : [result]).forEach((text) => print(text, "out"));
    }
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
    function isEditable(target) {
      return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
    }
    let historyIndex = -1;
    toggle.addEventListener("click", toggleTerminal);
    closeButton.addEventListener("click", closeTerminal);
    document.addEventListener("portfolio:toggle-terminal", toggleTerminal);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value;
      input.value = "";
      historyIndex = -1;
      execute(value);
    });
    input.addEventListener("keydown", (event) => {
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
        const matches = Object.keys(commands).filter((name) => name.startsWith(input.value.toLowerCase()));
        if (matches.length === 1) {
          event.preventDefault();
          input.value = `${matches[0]} `;
        }
      }
    });
    drawer.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeTerminal();
      }
    });
    document.addEventListener("keydown", (event) => {
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
})();
