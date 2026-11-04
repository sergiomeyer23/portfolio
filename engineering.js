/* Gerado a partir de src/*.ts por npm run build. Edite os arquivos em src/. */
"use strict";
(() => {
  // src/engineering.ts
  (() => {
    const app = window.portfolio;
    if (!app) return;
    const bi = (br, en) => ({ br, en });
    const lang = () => app.getLanguage() === "en" ? "en" : "br";
    const esc = (value) => app.escapeHtml(String(value));
    const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const formatNumber = (value) => value.toLocaleString(lang() === "br" ? "pt-BR" : "en-US");
    const UI = {
      br: {
        telemetryTitle: "Indicadores de engenharia",
        telemetryOrders: "pedidos reais analisados (Olist)",
        telemetryShards: "shards de coleta paralela (Mercavel)",
        telemetryCi: "reposit\xF3rios com CI no GitHub Actions",
        telemetryPrs: "PRs no MotherML (Bayer)",
        dagTitle: "Topologia do pipeline",
        dagIntro: "Arquitetura de refer\xEAncia que consolida os padr\xF5es usados nos projetos abaixo. Clique em um n\xF3 para ver contratos, toler\xE2ncia a falhas e or\xE7amentos.",
        dagLabel: "Diagrama do pipeline de dados em quatro est\xE1gios",
        dagNote: "Os or\xE7amentos de lat\xEAncia e throughput s\xE3o alvos de dimensionamento do projeto, n\xE3o medi\xE7\xF5es de produ\xE7\xE3o.",
        nodeLabel: "abrir detalhes",
        close: "Fechar painel",
        contracts: "Contratos de dados",
        input: "Entrada",
        output: "Sa\xEDda",
        faults: "Toler\xE2ncia a falhas",
        budget: "Or\xE7amento do n\xF3",
        p99: "Lat\xEAncia p99 (alvo)",
        throughput: "Throughput (estimado)",
        adrTitle: "Registros de decis\xE3o arquitetural",
        adrIntro: "Cada decis\xE3o segue o formato ADR: contexto, decis\xE3o e o que foi descartado, com os trade-offs.",
        adrStatus: "Status",
        adrContext: "Contexto",
        adrDecision: "Decis\xE3o",
        adrAlternatives: "Alternativas rejeitadas e trade-offs",
        benchEyebrow: "Performance",
        benchTitle: "Quanto custa processar um bilh\xE3o de linhas?",
        benchIntro: "Simulador inspirado no One Billion Row Challenge. Ajuste o volume e o paralelismo e compare tr\xEAs abordagens.",
        benchVolume: "Volume de amostragem",
        benchMode: "Modo de paralelismo",
        benchTime: "Tempo total (escala logar\xEDtmica)",
        benchMemory: "Pegada de mem\xF3ria",
        benchFastest: "Mais r\xE1pido neste cen\xE1rio",
        benchLeanest: "Menor mem\xF3ria",
        benchNote: "Estimativa de um modelo de custo (8 n\xFAcleos, NVMe, arquivo em cache de p\xE1gina). N\xE3o \xE9 uma medi\xE7\xE3o ao vivo: rode o c\xF3digo das abas na sua m\xE1quina para obter n\xFAmeros reais.",
        benchCode: "Implementa\xE7\xE3o",
        benchResults: "Resultados da simula\xE7\xE3o",
        volumes: ["100 mil", "10 milh\xF5es", "100 milh\xF5es", "1 bilh\xE3o"],
        modes: ["N\xFAcleo \xFAnico", "Multi-core", "SIMD / Arrow"],
        seconds: "s",
        minutes: "min"
      },
      en: {
        telemetryTitle: "Engineering indicators",
        telemetryOrders: "real orders analyzed (Olist)",
        telemetryShards: "parallel collection shards (Mercavel)",
        telemetryCi: "repositories with CI on GitHub Actions",
        telemetryPrs: "PRs on MotherML (Bayer)",
        dagTitle: "Pipeline topology",
        dagIntro: "Reference architecture that consolidates the patterns used in the projects below. Click a node to see contracts, fault tolerance and budgets.",
        dagLabel: "Diagram of a four-stage data pipeline",
        dagNote: "Latency and throughput budgets are design targets, not production measurements.",
        nodeLabel: "open details",
        close: "Close panel",
        contracts: "Data contracts",
        input: "Input",
        output: "Output",
        faults: "Fault tolerance",
        budget: "Node budget",
        p99: "p99 latency (target)",
        throughput: "Throughput (estimated)",
        adrTitle: "Architecture decision records",
        adrIntro: "Each decision follows the ADR format: context, decision, and what was rejected, with the trade-offs.",
        adrStatus: "Status",
        adrContext: "Context",
        adrDecision: "Decision",
        adrAlternatives: "Rejected alternatives and trade-offs",
        benchEyebrow: "Performance",
        benchTitle: "What does it cost to process a billion rows?",
        benchIntro: "Simulator inspired by the One Billion Row Challenge. Adjust volume and parallelism and compare three approaches.",
        benchVolume: "Sample volume",
        benchMode: "Parallelism mode",
        benchTime: "Total time (logarithmic scale)",
        benchMemory: "Memory footprint",
        benchFastest: "Fastest in this scenario",
        benchLeanest: "Lowest memory",
        benchNote: "Estimate from a cost model (8 cores, NVMe, file in page cache). Not a live measurement: run the code in the tabs on your machine for real numbers.",
        benchCode: "Implementation",
        benchResults: "Simulation results",
        volumes: ["100 thousand", "10 million", "100 million", "1 billion"],
        modes: ["Single core", "Multi-core", "SIMD / Arrow"],
        seconds: "s",
        minutes: "min"
      }
    };
    const ui = () => UI[lang()];
    const TELEMETRY_STATIC = [
      { id: "orders", value: 96e3, labelKey: "telemetryOrders" },
      { id: "shards", value: 4, labelKey: "telemetryShards" },
      { id: "prs", value: 2, labelKey: "telemetryPrs" }
    ];
    function telemetryItems() {
      const text = ui();
      const ciCount = app.projects.filter((project) => Boolean(project.ci)).length;
      const items = TELEMETRY_STATIC.map((item) => ({
        id: item.id,
        value: item.value,
        label: text[item.labelKey]
      }));
      items.splice(2, 0, { id: "ci", value: ciCount, label: text.telemetryCi });
      return items;
    }
    function compact(value) {
      return value >= 1e3 ? `${Math.round(value / 1e3)}K` : String(Math.round(value));
    }
    function renderTelemetry() {
      const root = document.getElementById("telemetryRoot");
      if (!root) return;
      root.innerHTML = `
      <h2 class="visually-hidden">${esc(ui().telemetryTitle)}</h2>
      <dl class="tele-grid">
        ${telemetryItems().map(
        (item) => `
          <div class="tele">
            <dt class="tele-label">${esc(item.label)}</dt>
            <dd class="tele-value" data-target="${item.value}">${compact(item.value)}</dd>
          </div>`
      ).join("")}
      </dl>`;
    }
    let countersDone = false;
    function animateCounters() {
      if (countersDone) return;
      countersDone = true;
      if (reducedMotion()) return;
      const duration = 1100;
      const start = performance.now();
      const targets = Array.from(document.querySelectorAll("#telemetryRoot [data-target]"));
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        targets.forEach((element) => {
          if (!element.isConnected) return;
          element.textContent = compact(Number(element.getAttribute("data-target")) * eased);
        });
        if (progress < 1) requestAnimationFrame(tick);
      };
      targets.forEach((element) => {
        element.textContent = "0";
      });
      requestAnimationFrame(tick);
    }
    function setupTelemetryObserver() {
      const root = document.getElementById("telemetryRoot");
      if (!root || !("IntersectionObserver" in window)) return;
      const observer = new IntersectionObserver(
        (entries, self) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            animateCounters();
            self.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(root);
    }
    const DAG_NODES = [
      {
        id: "ingest",
        tag: "01",
        short: bi("Ingest\xE3o", "Ingestion"),
        title: bi("Ingest\xE3o & Streaming", "Ingestion & Streaming"),
        stack: "Java 21 \xB7 Apache Kafka",
        summary: bi(
          "Ingest\xE3o orientada a eventos com particionamento por chave e garantias de entrega.",
          "Event-driven ingestion with key partitioning and delivery guarantees."
        ),
        input: {
          label: bi("JSON Schema do evento (v1)", "Event JSON Schema (v1)"),
          code: `{
  "$id": "order-event.v1",
  "type": "object",
  "required": ["event_id", "occurred_at", "customer_id", "amount_cents"],
  "properties": {
    "event_id":     { "type": "string", "format": "uuid" },
    "occurred_at":  { "type": "string", "format": "date-time" },
    "customer_id":  { "type": "integer" },
    "amount_cents": { "type": "integer", "minimum": 0 }
  }
}`
        },
        output: {
          label: bi("T\xF3pico Kafka", "Kafka topic"),
          code: `topic:      orders.v1
key:        customer_id   -- ordem por cliente
value:      order-event.v1
partitions: 12
acks:       all
idempotent: true`
        },
        faults: [
          bi("Dead Letter Queue (orders.v1.dlq) para eventos que violam o contrato.", "Dead Letter Queue (orders.v1.dlq) for events that violate the contract."),
          bi("Produtor idempotente (enable.idempotence) e acks=all contra duplica\xE7\xE3o e perda.", "Idempotent producer (enable.idempotence) and acks=all against duplication and loss."),
          bi("Retry com backoff exponencial e limite de tentativas antes de enviar \xE0 DLQ.", "Exponential-backoff retry with an attempt cap before routing to the DLQ.")
        ],
        p99: "\u2264 25 ms",
        throughput: bi("~50 mil msg/s por parti\xE7\xE3o", "~50k msg/s per partition")
      },
      {
        id: "process",
        tag: "02",
        short: bi("Processamento", "Processing"),
        title: bi("Processamento & Transforma\xE7\xE3o", "Processing & Transformation"),
        stack: "Python \xB7 Polars \xB7 PyArrow",
        summary: bi(
          "Transforma\xE7\xE3o colunar vetorizada, valida\xE7\xE3o contratual e enriquecimento em micro-lotes.",
          "Vectorized columnar transformation, contract validation and enrichment in micro-batches."
        ),
        input: {
          label: bi("Lote lido do t\xF3pico", "Batch read from the topic"),
          code: `source:   orders.v1  (micro-batch 5 s | 50k linhas)
format:   order-event.v1
guarantee: at-least-once`
        },
        output: {
          label: bi("Schema Arrow", "Arrow schema"),
          code: `event_id:     string        not null
occurred_at:  timestamp[us, UTC]
customer_id:  int64
amount_cents: int64
status:       dictionary<string>`
        },
        faults: [
          bi("Linhas inv\xE1lidas v\xE3o para quarentena com o motivo; o lote continua.", "Invalid rows go to quarantine with the reason; the batch continues."),
          bi("Idempot\xEAncia por event_id: reprocessar o mesmo lote n\xE3o duplica resultados.", "Idempotency by event_id: reprocessing the same batch does not duplicate results."),
          bi("Commit de offset s\xF3 depois da grava\xE7\xE3o bem-sucedida (at-least-once + dedupe).", "Offset commit only after a successful write (at-least-once + dedupe).")
        ],
        p99: "\u2264 120 ms / micro-lote",
        throughput: bi("~200 mil linhas/s por n\xFAcleo", "~200k rows/s per core")
      },
      {
        id: "store",
        tag: "03",
        short: bi("Persist\xEAncia", "Storage"),
        title: bi("Persist\xEAncia Anal\xEDtica & Armazenamento", "Analytical Persistence & Storage"),
        stack: "SQL \xB7 PostgreSQL \xB7 Parquet \xB7 DuckDB",
        summary: bi(
          "Modelagem anal\xEDtica, particionamento temporal e \xEDndices para consultas de baixa lat\xEAncia.",
          "Analytical modeling, time partitioning and indexes for low-latency queries."
        ),
        input: {
          label: bi("Lote validado (Arrow)", "Validated batch (Arrow)"),
          code: `INSERT INTO fact_orders
SELECT * FROM staging_batch
ON CONFLICT (event_id) DO NOTHING;`
        },
        output: {
          label: bi("DDL da tabela de fatos", "Fact table DDL"),
          code: `CREATE TABLE fact_orders (
  event_id     uuid        PRIMARY KEY,
  occurred_at  timestamptz NOT NULL,
  customer_id  bigint      NOT NULL,
  amount_cents bigint      NOT NULL
) PARTITION BY RANGE (occurred_at);

CREATE INDEX ON fact_orders (customer_id, occurred_at);`
        },
        faults: [
          bi("UPSERT idempotente (ON CONFLICT) torna a grava\xE7\xE3o segura para reentrega.", "Idempotent UPSERT (ON CONFLICT) makes the write safe for redelivery."),
          bi("Parquet imut\xE1vel por parti\xE7\xE3o di\xE1ria: recomputar \xE9 trocar o arquivo, n\xE3o editar.", "Immutable Parquet per daily partition: recompute by swapping the file, not editing it."),
          bi("WAL e backup com recupera\xE7\xE3o pontual (PITR) para o PostgreSQL.", "WAL and point-in-time recovery (PITR) backups for PostgreSQL.")
        ],
        p99: "\u2264 40 ms (consulta pontual)",
        throughput: bi("~20 mil inserts/s em lote", "~20k batched inserts/s")
      },
      {
        id: "serve",
        tag: "04",
        short: bi("Servi\xE7o", "Serving"),
        title: bi("Camada de Servi\xE7o & Telemetria", "Service Layer & Telemetry"),
        stack: "REST \xB7 gRPC \xB7 OpenTelemetry",
        summary: bi(
          "Gateway de microsservi\xE7os com rastreamento distribu\xEDdo ponta a ponta.",
          "Microservice gateway with end-to-end distributed tracing."
        ),
        input: {
          label: bi("Consulta ao armazenamento", "Storage query"),
          code: `SELECT date_trunc('day', occurred_at) AS day, sum(amount_cents)
FROM fact_orders
WHERE customer_id = $1 AND occurred_at >= $2
GROUP BY 1 ORDER BY 1;`
        },
        output: {
          label: bi("Contrato REST (OpenAPI)", "REST contract (OpenAPI)"),
          code: `GET /v1/customers/{id}/orders?from=&to=
200 -> { "items": [...], "next_cursor": "..." }
header: traceparent  (W3C Trace Context / OpenTelemetry)`
        },
        faults: [
          bi("Circuit Breaker e timeout por depend\xEAncia para isolar falhas em cascata.", "Circuit breaker and per-dependency timeout to isolate cascading failures."),
          bi("Bulkhead e limite de taxa protegem o armazenamento de picos de consulta.", "Bulkheads and rate limiting protect storage from query spikes."),
          bi("Spans OpenTelemetry com traceparent permitem rastrear uma requisi\xE7\xE3o por todos os n\xF3s.", "OpenTelemetry spans with traceparent let you trace a request across every node.")
        ],
        p99: "\u2264 50 ms",
        throughput: bi("~2 mil req/s por inst\xE2ncia", "~2k req/s per instance")
      }
    ];
    const DAG_EDGES = [
      ["ingest", "process"],
      ["process", "store"],
      ["store", "serve"],
      ["process", "serve"]
    ];
    const nodeById = (id) => DAG_NODES.find((node) => node.id === id) || DAG_NODES[0];
    const narrowQuery = window.matchMedia("(max-width: 720px)");
    function dagGeometry(narrow) {
      if (!narrow) {
        const nodeW2 = 196;
        const nodeH2 = 92;
        const top = 118;
        const gap = (960 - 24 - nodeW2 * 4) / 3;
        const positions2 = DAG_NODES.map((node, index) => ({ id: node.id, x: 12 + index * (nodeW2 + gap), y: top }));
        const at2 = (id) => positions2.find((position) => position.id === id) ?? positions2[0];
        const edges2 = DAG_EDGES.map(([from, to]) => {
          const a = at2(from);
          const b = at2(to);
          const adjacent = Math.abs(DAG_NODES.findIndex((n) => n.id === from) - DAG_NODES.findIndex((n) => n.id === to)) === 1;
          if (adjacent) {
            return { from, to, d: `M${a.x + nodeW2} ${a.y + nodeH2 / 2} L${b.x} ${b.y + nodeH2 / 2}` };
          }
          const ax = a.x + nodeW2 / 2;
          const bx = b.x + nodeW2 / 2;
          return { from, to, d: `M${ax} ${a.y} C${ax} 36, ${bx} 36, ${bx} ${b.y}` };
        });
        return { width: 960, height: 230, nodeW: nodeW2, nodeH: nodeH2, positions: positions2, edges: edges2 };
      }
      const nodeW = 296;
      const nodeH = 80;
      const gapY = 40;
      const positions = DAG_NODES.map((node, index) => ({ id: node.id, x: 16, y: 12 + index * (nodeH + gapY) }));
      const at = (id) => positions.find((position) => position.id === id) ?? positions[0];
      const edges = DAG_EDGES.map(([from, to]) => {
        const a = at(from);
        const b = at(to);
        const adjacent = Math.abs(DAG_NODES.findIndex((n) => n.id === from) - DAG_NODES.findIndex((n) => n.id === to)) === 1;
        if (adjacent) {
          return { from, to, d: `M${a.x + nodeW / 2} ${a.y + nodeH} L${b.x + nodeW / 2} ${b.y}` };
        }
        const ay = a.y + nodeH / 2;
        const by = b.y + nodeH / 2;
        return { from, to, d: `M${a.x + nodeW} ${ay} C352 ${ay}, 352 ${by}, ${b.x + nodeW} ${by}` };
      });
      return { width: 360, height: 12 + DAG_NODES.length * nodeH + (DAG_NODES.length - 1) * gapY + 12, nodeW, nodeH, positions, edges };
    }
    function dagSvg() {
      const geo = dagGeometry(narrowQuery.matches);
      const L = lang();
      const text = ui();
      const edges = geo.edges.map(
        (edge) => `
        <path class="dag-edge" d="${edge.d}" marker-end="url(#dagArrow)"></path>
        <path class="dag-flow" d="${edge.d}"></path>`
      ).join("");
      const nodes = geo.positions.map((position) => {
        const node = nodeById(position.id);
        const label = `${node.tag} ${node.short[L]} ${node.stack}, ${text.nodeLabel}`;
        return `
        <g class="dag-node" role="button" tabindex="0" data-node="${esc(node.id)}" aria-label="${esc(label)}" aria-haspopup="dialog" aria-controls="dagPanel" aria-expanded="false" transform="translate(${position.x} ${position.y})">
          <rect width="${geo.nodeW}" height="${geo.nodeH}" rx="14"></rect>
          <text class="dag-node-index" x="16" y="26">${esc(node.tag)}</text>
          <text class="dag-node-title" x="16" y="${geo.nodeH / 2 + 4}">${esc(node.short[L])}</text>
          <text class="dag-node-stack" x="16" y="${geo.nodeH - 18}">${esc(node.stack)}</text>
        </g>`;
      }).join("");
      return `
      <svg class="dag-svg" viewBox="0 0 ${geo.width} ${geo.height}" role="group" aria-label="${esc(text.dagLabel)}">
        <defs>
          <marker id="dagArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path class="dag-arrow" d="M0 0 L10 5 L0 10 z"></path>
          </marker>
        </defs>
        <g aria-hidden="true">${edges}</g>
        ${nodes}
      </svg>`;
    }
    let panel = null;
    let openNodeId = null;
    function ensurePanel() {
      if (panel) return panel;
      panel = document.createElement("aside");
      panel.className = "dag-panel";
      panel.id = "dagPanel";
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "false");
      panel.setAttribute("aria-labelledby", "dagPanelTitle");
      panel.hidden = true;
      panel.tabIndex = -1;
      document.body.appendChild(panel);
      panel.addEventListener("click", (event) => {
        if (event.target.closest(".dag-close")) closeDagPanel(true);
      });
      return panel;
    }
    function renderPanelContent() {
      if (!panel || !openNodeId) return;
      const node = nodeById(openNodeId);
      const L = lang();
      const text = ui();
      panel.innerHTML = `
      <div class="dag-panel-head">
        <div>
          <p class="eyebrow">${esc(node.tag)} \xB7 ${esc(node.stack)}</p>
          <h3 id="dagPanelTitle" tabindex="-1">${esc(node.title[L])}</h3>
        </div>
        <button class="dag-close" type="button" aria-label="${esc(text.close)}">\xD7</button>
      </div>
      <p class="dag-panel-summary">${esc(node.summary[L])}</p>

      <h4>${esc(text.contracts)}</h4>
      <p class="dag-code-label">${esc(text.input)}: ${esc(node.input.label[L])}</p>
      <pre tabindex="0"><code>${esc(node.input.code)}</code></pre>
      <p class="dag-code-label">${esc(text.output)}: ${esc(node.output.label[L])}</p>
      <pre tabindex="0"><code>${esc(node.output.code)}</code></pre>

      <h4>${esc(text.faults)}</h4>
      <ul class="dag-faults">${node.faults.map((fault) => `<li>${esc(fault[L])}</li>`).join("")}</ul>

      <h4>${esc(text.budget)}</h4>
      <dl class="dag-budget">
        <div><dt>${esc(text.p99)}</dt><dd>${esc(node.p99)}</dd></div>
        <div><dt>${esc(text.throughput)}</dt><dd>${esc(node.throughput[L])}</dd></div>
      </dl>
      <p class="dag-budget-note">${esc(text.dagNote)}</p>`;
    }
    function openDagPanel(id, trigger) {
      const element = ensurePanel();
      openNodeId = id;
      element.hidden = false;
      renderPanelContent();
      markOpenNode();
      const title = element.querySelector("#dagPanelTitle");
      if (title instanceof HTMLElement) title.focus();
      if (trigger) element.dataset.returnTo = id;
    }
    function closeDagPanel(restoreFocus) {
      if (!panel || panel.hidden) return;
      const returnTo = openNodeId;
      panel.hidden = true;
      openNodeId = null;
      markOpenNode();
      if (restoreFocus && returnTo) {
        const node = document.querySelector(`#dagRoot [data-node="${returnTo}"]`);
        if (node instanceof SVGElement || node instanceof HTMLElement) node.focus();
      }
    }
    function markOpenNode() {
      document.querySelectorAll("#dagRoot [data-node]").forEach((node) => {
        const open = node.getAttribute("data-node") === openNodeId;
        node.setAttribute("aria-expanded", String(open));
        node.classList.toggle("is-open", open);
      });
    }
    function renderDag() {
      const root = document.getElementById("dagRoot");
      if (!root) return;
      const text = ui();
      root.innerHTML = `
      <div class="eng-head">
        <h3>${esc(text.dagTitle)}</h3>
        <p>${esc(text.dagIntro)}</p>
      </div>
      ${dagSvg()}
      <p class="eng-note">${esc(text.dagNote)}</p>`;
      markOpenNode();
      if (panel && !panel.hidden) renderPanelContent();
    }
    function setupDag() {
      const root = document.getElementById("dagRoot");
      if (!root) return;
      root.addEventListener("click", (event) => {
        const node = event.target.closest("[data-node]");
        if (!node) return;
        const id = node.getAttribute("data-node") || "";
        if (openNodeId === id) closeDagPanel(true);
        else openDagPanel(id, node);
      });
      root.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        const node = event.target.closest("[data-node]");
        if (!node) return;
        event.preventDefault();
        const id = node.getAttribute("data-node") || "";
        if (openNodeId === id) closeDagPanel(true);
        else openDagPanel(id, node);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || !panel || panel.hidden) return;
        const palette = document.getElementById("cmd");
        if (palette && !palette.hidden) return;
        event.preventDefault();
        closeDagPanel(true);
      });
      document.addEventListener("click", (event) => {
        if (!panel || panel.hidden) return;
        const target = event.target;
        if (target.closest("#dagPanel") || target.closest("[data-node]")) return;
        closeDagPanel(false);
      });
      narrowQuery.addEventListener("change", renderDag);
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => root.classList.toggle("is-live", entry.isIntersecting));
          },
          { threshold: 0.2 }
        );
        observer.observe(root);
      }
    }
    window.portfolio.dagBudgets = () => DAG_NODES.map((node) => ({ id: node.id, name: node.short[lang()], p99: node.p99, throughput: node.throughput[lang()] }));
    const ADRS = [
      {
        id: "ADR-001",
        title: bi("Coleta de pre\xE7os em 4 shards paralelos e pareamento em duas etapas", "Price collection in 4 parallel shards with two-step matching"),
        status: bi("Aceito", "Accepted"),
        context: bi(
          "O Mercavel precisa coletar diariamente os pre\xE7os de v\xE1rios supermercados de Cascavel/PR. Um \xFAnico job sequencial soma o tempo de todos os sites e uma falha em um deles trava o restante.",
          "Mercavel must collect prices daily from several supermarkets in Cascavel/PR. A single sequential job adds up the time of every site and one failure stalls the rest."
        ),
        decision: bi(
          "A coleta roda em 4 shards paralelos no GitHub Actions. O pareamento de produtos acontece em duas etapas: EAN exato primeiro e, s\xF3 para o que sobrar, uma heur\xEDstica de marca, nome e gramatura normalizados.",
          "Collection runs in 4 parallel shards on GitHub Actions. Product matching happens in two steps: exact EAN first and, only for what is left, a heuristic on normalized brand, name and weight."
        ),
        alternatives: [
          bi("Job \xFAnico sequencial: mais simples, por\xE9m o tempo total \xE9 a soma de todos os sites e uma falha bloqueia a coleta inteira.", "Single sequential job: simpler, but total time is the sum of every site and one failure blocks the whole run."),
          bi("Pareamento fuzzy direto em todos os produtos: cobre mais itens, por\xE9m aumenta falsos positivos; o EAN exato primeiro preserva a precis\xE3o.", "Fuzzy matching on every product: covers more items but raises false positives; exact EAN first preserves precision.")
        ]
      },
      {
        id: "ADR-002",
        title: bi("Di\xE1rio SQLite antes da impressora e estado unknown no Print Guard", "SQLite journal before the printer and an unknown state in Print Guard"),
        status: bi("Aceito", "Accepted"),
        context: bi(
          "Uma tarefa agendada que imprime um relat\xF3rio pode terminar com sucesso enquanto nada sai da impressora. Reimprimir \xE0s cegas gera c\xF3pias duplicadas; n\xE3o reimprimir perde o relat\xF3rio.",
          "A scheduled task that prints a report can finish successfully while nothing comes out of the printer. Reprinting blindly creates duplicates; not reprinting loses the report."
        ),
        decision: bi(
          "Cada tentativa \xE9 gravada em um di\xE1rio SQLite antes de chamar a impressora, e um lock do sistema operacional impede duas execu\xE7\xF5es simult\xE2neas. O dia s\xF3 vira ok quando o job sai da fila; sem confirma\xE7\xE3o, fica unknown e uma pessoa decide.",
          "Each attempt is written to a SQLite journal before calling the printer, and an OS-level lock prevents two simultaneous runs. The day only becomes ok when the job leaves the queue; without confirmation it stays unknown and a person decides."
        ),
        alternatives: [
          bi("Reimprimir automaticamente na d\xFAvida: evita perda, por\xE9m gera duplicatas silenciosas.", "Reprint automatically when in doubt: avoids loss but creates silent duplicates."),
          bi("Confiar no c\xF3digo de sa\xEDda do spooler: simples, mas reporta sucesso mesmo com o job preso na fila.", "Trust the spooler exit code: simple, but reports success even with the job stuck in the queue.")
        ]
      },
      {
        id: "ADR-003",
        title: bi("De batch reativo para streaming cont\xEDnuo com Virtual Threads no Java 21", "From reactive batch to continuous streaming with Virtual Threads on Java 21"),
        status: bi("Exemplo de refer\xEAncia", "Reference example"),
        context: bi(
          "Concorr\xEAncia saturada em cen\xE1rios de I/O bloqueante sob alta carga de solicita\xE7\xF5es anal\xEDticas: o pool de threads de plataforma se esgota esperando o armazenamento.",
          "Saturated concurrency under blocking I/O with a high volume of analytical requests: the platform thread pool runs out while waiting on storage."
        ),
        decision: bi(
          "Adotar threads virtuais (Project Loom) com c\xF3digo bloqueante simples, aliadas a pipelines de agrega\xE7\xE3o vetorizada em DuckDB chamados de forma otimizada.",
          "Adopt virtual threads (Project Loom) with plain blocking code, combined with vectorized aggregation pipelines in DuckDB called in an optimized way."
        ),
        alternatives: [
          bi("Cluster Spark dedicado: escala horizontalmente, mas o custo operacional e a lat\xEAncia de inicializa\xE7\xE3o superam o ganho para este volume.", "Dedicated Spark cluster: scales horizontally, but operational cost and startup latency outweigh the gain at this volume."),
          bi("Programa\xE7\xE3o reativa (WebFlux): evita bloquear threads, por\xE9m complica depura\xE7\xE3o e rastreamento; threads virtuais entregam escala com c\xF3digo direto.", "Reactive programming (WebFlux): avoids blocking threads but complicates debugging and tracing; virtual threads deliver scale with direct code."),
          bi("Inst\xE2ncia monol\xEDtica bem dimensionada: economiza mem\xF3ria e opera\xE7\xE3o; o trade-off \xE9 o teto de escala vertical.", "Well-sized monolithic instance: saves memory and operations; the trade-off is the vertical scaling ceiling.")
        ]
      }
    ];
    let openAdrId = ADRS[0].id;
    function renderAdr() {
      const root = document.getElementById("adrRoot");
      if (!root) return;
      const L = lang();
      const text = ui();
      root.innerHTML = `
      <div class="eng-head">
        <h3>${esc(text.adrTitle)}</h3>
        <p>${esc(text.adrIntro)}</p>
      </div>
      <div class="adr-list">
        ${ADRS.map((adr, index) => {
        const open = adr.id === openAdrId;
        return `
          <article class="adr">
            <h4 class="adr-heading">
              <button class="adr-trigger" type="button" id="adrBtn${index}" aria-expanded="${open}" aria-controls="adrPanel${index}" data-adr="${esc(adr.id)}">
                <span class="adr-id">${esc(adr.id)}</span>
                <span class="adr-title">${esc(adr.title[L])}</span>
                <span class="adr-status">${esc(adr.status[L])}</span>
              </button>
            </h4>
            <div class="adr-panel" id="adrPanel${index}" role="region" aria-labelledby="adrBtn${index}"${open ? "" : " hidden"}>
              <dl>
                <dt>${esc(text.adrStatus)}</dt><dd>${esc(adr.status[L])}</dd>
                <dt>${esc(text.adrContext)}</dt><dd>${esc(adr.context[L])}</dd>
                <dt>${esc(text.adrDecision)}</dt><dd>${esc(adr.decision[L])}</dd>
                <dt>${esc(text.adrAlternatives)}</dt>
                <dd><ul>${adr.alternatives.map((item) => `<li>${esc(item[L])}</li>`).join("")}</ul></dd>
              </dl>
            </div>
          </article>`;
      }).join("")}
      </div>`;
    }
    function setupAdr() {
      const root = document.getElementById("adrRoot");
      if (!root) return;
      root.addEventListener("click", (event) => {
        const trigger = event.target.closest(".adr-trigger");
        if (!trigger) return;
        const id = trigger.getAttribute("data-adr") || "";
        const expanded = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!expanded));
        const panelElement = document.getElementById(trigger.getAttribute("aria-controls") || "");
        if (panelElement) panelElement.hidden = expanded;
        openAdrId = expanded ? "" : id;
      });
    }
    const BENCH_VOLUMES = [1e5, 1e7, 1e8, 1e9];
    const BENCH_THREADS = [1, 8, 8];
    const BENCH_MODEL = [
      { id: "java", name: "Java 21", detail: "mmap + hash primitivo", startupMs: 120, nsPerRecord: [26, 3.6, 1.9], baseMb: 40, mbPerThread: 12, bytesPerRecord: 0 },
      { id: "python", name: "Python", detail: "Polars + multiprocessing", startupMs: 280, nsPerRecord: [58, 8.2, 5.1], baseMb: 105, mbPerThread: 18, bytesPerRecord: 0.55 },
      { id: "sql", name: "SQL", detail: "DuckDB", startupMs: 40, nsPerRecord: [41, 6.4, 4], baseMb: 62, mbPerThread: 10, bytesPerRecord: 0.22 }
    ];
    const BENCH_CODE = {
      java: {
        label: "Java 21",
        code: `// 1BRC-style: memory-mapped chunks, one primitive open-addressing table per worker.
// Illustrative skeleton: a collision-safe version also compares the station bytes.
final class Stats {
    static final int SIZE = 1 << 15;
    final long[] keys = new long[SIZE];        // hash of the station name, no boxing
    final int[] min = new int[SIZE], max = new int[SIZE], count = new int[SIZE];
    final long[] sum = new long[SIZE];

    void add(long hash, int tenths) {
        int i = (int) (hash ^ (hash >>> 15)) & (SIZE - 1);
        while (keys[i] != 0 && keys[i] != hash) i = (i + 1) & (SIZE - 1);
        if (keys[i] == 0) { keys[i] = hash; min[i] = Integer.MAX_VALUE; max[i] = Integer.MIN_VALUE; }
        min[i] = Math.min(min[i], tenths);
        max[i] = Math.max(max[i], tenths);
        sum[i] += tenths;
        count[i]++;
    }
}

try (FileChannel ch = FileChannel.open(path, StandardOpenOption.READ);
     var pool = Executors.newVirtualThreadPerTaskExecutor()) {
    long size = ch.size(), chunk = Math.max(1 << 24, size / Runtime.getRuntime().availableProcessors());
    List<Future<Stats>> parts = new ArrayList<>();
    for (long start = 0; start < size; start += chunk) {
        long from = start, len = Math.min(chunk, size - start);
        parts.add(pool.submit(() -> scan(ch.map(FileChannel.MapMode.READ_ONLY, from, len))));
    }
    // merge the per-worker tables, then print min/mean/max per station
}`
      },
      python: {
        label: "Python \xB7 Polars",
        code: `import polars as pl

def scan(path: str) -> pl.LazyFrame:
    return pl.scan_csv(
        path, separator=";", has_header=False,
        schema={"station": pl.Utf8, "temp": pl.Float64},
    )

# Polars is already multi-threaded and columnar (Arrow memory layout).
result = (
    scan("measurements.txt")
    .group_by("station")
    .agg(
        pl.col("temp").min().alias("min"),
        pl.col("temp").mean().round(1).alias("mean"),
        pl.col("temp").max().alias("max"),
    )
    .sort("station")
    .collect(engine="streaming")   # bounded memory on large files
)

# Sharding by file: one process per shard, then a final aggregation.
from multiprocessing import Pool

def partial(path: str) -> pl.DataFrame:
    return (scan(path).group_by("station")
            .agg(pl.col("temp").min().alias("min"), pl.col("temp").sum().alias("sum"),
                 pl.col("temp").count().alias("n"), pl.col("temp").max().alias("max"))
            .collect())

with Pool() as pool:
    merged = pl.concat(pool.map(partial, shard_paths))`
      },
      sql: {
        label: "SQL \xB7 DuckDB",
        code: `SELECT station, min(temp), round(avg(temp), 1), max(temp)
FROM read_csv('measurements.txt', delim=';', header=false,
              columns={'station': 'VARCHAR', 'temp': 'DOUBLE'})
GROUP BY station
ORDER BY station;

-- EXPLAIN (illustrative plan)
ORDER_BY          station ASC
  HASH_GROUP_BY   groups: station | min(temp), avg(temp), max(temp)
    READ_CSV      measurements.txt | projection pushdown: station, temp
                  parallel scan: 1 morsel per ~122k rows`
      }
    };
    const benchState = { volume: 2, mode: 1, tab: "java" };
    function estimate(engine) {
      const records = BENCH_VOLUMES[benchState.volume];
      const nanos = engine.nsPerRecord[benchState.mode];
      const threads = BENCH_THREADS[benchState.mode];
      return {
        seconds: engine.startupMs / 1e3 + records * nanos / 1e9,
        memoryMb: engine.baseMb + engine.mbPerThread * threads + engine.bytesPerRecord * records / 1e6
      };
    }
    function formatDuration(seconds) {
      const text = ui();
      if (seconds < 1) return `${Math.round(seconds * 1e3)} ms`;
      if (seconds < 60) return `${seconds.toFixed(seconds < 10 ? 2 : 1)} ${text.seconds}`;
      const minutes = Math.floor(seconds / 60);
      return `${minutes} ${text.minutes} ${Math.round(seconds - minutes * 60)} ${text.seconds}`;
    }
    function logWidth(seconds) {
      const min = Math.log10(0.05);
      const max = Math.log10(120);
      const ratio = (Math.log10(Math.max(seconds, 0.05)) - min) / (max - min);
      return Math.round(8 + Math.min(Math.max(ratio, 0), 1) * 92);
    }
    function benchResultsHtml() {
      const text = ui();
      const rows = BENCH_MODEL.map((engine) => ({ engine, ...estimate(engine) }));
      const maxMemory = Math.max(...rows.map((row) => row.memoryMb));
      const fastest = rows.reduce((best, row) => row.seconds < best.seconds ? row : best);
      const leanest = rows.reduce((best, row) => row.memoryMb < best.memoryMb ? row : best);
      const label = (id) => {
        const engine = BENCH_MODEL.find((item) => item.id === id) ?? BENCH_MODEL[0];
        return `<span class="bench-name"><strong>${esc(engine.name)}</strong><small>${esc(engine.detail)}</small></span>`;
      };
      const timeBars = rows.map(
        (row) => `
        <li class="bench-row bench-${row.engine.id}">
          ${label(row.engine.id)}
          <span class="bench-track" aria-hidden="true"><span class="bench-fill" style="--w:${logWidth(row.seconds)}%"></span></span>
          <span class="bench-value">${esc(formatDuration(row.seconds))}</span>
        </li>`
      ).join("");
      const memoryBars = rows.map(
        (row) => `
        <li class="bench-row bench-${row.engine.id}">
          ${label(row.engine.id)}
          <span class="bench-track" aria-hidden="true"><span class="bench-fill" style="--w:${Math.max(4, Math.round(row.memoryMb / maxMemory * 100))}%"></span></span>
          <span class="bench-value">${esc(formatNumber(Math.round(row.memoryMb)))} MB</span>
        </li>`
      ).join("");
      return `
      <h4>${esc(text.benchTime)}</h4>
      <ul class="bench-bars">${timeBars}</ul>
      <h4>${esc(text.benchMemory)}</h4>
      <ul class="bench-bars">${memoryBars}</ul>
      <p class="bench-summary">
        <strong>${esc(text.benchFastest)}:</strong> ${esc(fastest.engine.name)} (${esc(formatDuration(fastest.seconds))}).
        <strong>${esc(text.benchLeanest)}:</strong> ${esc(leanest.engine.name)} (${esc(formatNumber(Math.round(leanest.memoryMb)))} MB).
      </p>`;
    }
    function updateBenchResults() {
      const text = ui();
      const results = document.getElementById("benchResults");
      const volumeOut = document.getElementById("benchVolumeOut");
      const modeOut = document.getElementById("benchModeOut");
      const volumeInput = document.getElementById("benchVolume");
      const modeInput = document.getElementById("benchMode");
      if (results) results.innerHTML = benchResultsHtml();
      if (volumeOut) volumeOut.textContent = text.volumes[benchState.volume];
      if (modeOut) modeOut.textContent = text.modes[benchState.mode];
      if (volumeInput) volumeInput.setAttribute("aria-valuetext", text.volumes[benchState.volume]);
      if (modeInput) modeInput.setAttribute("aria-valuetext", text.modes[benchState.mode]);
    }
    function renderBenchmark() {
      const root = document.getElementById("benchRoot");
      const head = document.getElementById("benchHead");
      if (!root || !head) return;
      const text = ui();
      head.innerHTML = `
      <span class="eyebrow">${esc(text.benchEyebrow)}</span>
      <h2>${esc(text.benchTitle)}</h2>
      <p>${esc(text.benchIntro)}</p>`;
      const tabs = ["java", "python", "sql"];
      root.innerHTML = `
      <div class="bench-controls">
        <div class="bench-control">
          <label for="benchVolume">${esc(text.benchVolume)}: <output id="benchVolumeOut" for="benchVolume"></output></label>
          <input id="benchVolume" type="range" min="0" max="3" step="1" value="${benchState.volume}">
          <div class="bench-ticks" aria-hidden="true">${text.volumes.map((item) => `<span>${esc(item)}</span>`).join("")}</div>
        </div>
        <div class="bench-control">
          <label for="benchMode">${esc(text.benchMode)}: <output id="benchModeOut" for="benchMode"></output></label>
          <input id="benchMode" type="range" min="0" max="2" step="1" value="${benchState.mode}">
          <div class="bench-ticks" aria-hidden="true">${text.modes.map((item) => `<span>${esc(item)}</span>`).join("")}</div>
        </div>
      </div>

      <div class="bench-results" id="benchResults" role="group" aria-live="polite" aria-label="${esc(text.benchResults)}"></div>
      <p class="eng-note">${esc(text.benchNote)}</p>

      <h3 class="bench-code-title">${esc(text.benchCode)}</h3>
      <div class="bench-tabs" role="tablist" aria-label="${esc(text.benchCode)}">
        ${tabs.map(
        (tab) => `<button class="bench-tab" type="button" role="tab" id="benchTab-${tab}" aria-controls="benchPanel-${tab}" aria-selected="${tab === benchState.tab}" tabindex="${tab === benchState.tab ? 0 : -1}" data-tab="${tab}">${esc(BENCH_CODE[tab].label)}</button>`
      ).join("")}
      </div>
      ${tabs.map(
        (tab) => `<div class="bench-panel" role="tabpanel" id="benchPanel-${tab}" aria-labelledby="benchTab-${tab}"${tab === benchState.tab ? "" : " hidden"}><pre tabindex="0"><code>${esc(BENCH_CODE[tab].code)}</code></pre></div>`
      ).join("")}`;
      updateBenchResults();
    }
    function selectBenchTab(tab) {
      benchState.tab = tab;
      document.querySelectorAll("#benchRoot .bench-tab").forEach((button) => {
        const selected = button.getAttribute("data-tab") === tab;
        button.setAttribute("aria-selected", String(selected));
        button.setAttribute("tabindex", selected ? "0" : "-1");
      });
      document.querySelectorAll("#benchRoot .bench-panel").forEach((element) => {
        element.toggleAttribute("hidden", element.id !== `benchPanel-${tab}`);
      });
    }
    function setupBenchmark() {
      const root = document.getElementById("benchRoot");
      if (!root) return;
      root.addEventListener("input", (event) => {
        const target = event.target;
        if (target.id === "benchVolume") benchState.volume = Number(target.value);
        else if (target.id === "benchMode") benchState.mode = Number(target.value);
        else return;
        updateBenchResults();
      });
      root.addEventListener("click", (event) => {
        const button = event.target.closest(".bench-tab");
        if (button) selectBenchTab(button.getAttribute("data-tab"));
      });
      root.addEventListener("keydown", (event) => {
        const button = event.target.closest(".bench-tab");
        if (!button || event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const order = ["java", "python", "sql"];
        const current = order.indexOf(button.getAttribute("data-tab"));
        const next = order[(current + (event.key === "ArrowRight" ? 1 : order.length - 1)) % order.length];
        selectBenchTab(next);
        const nextButton = document.getElementById(`benchTab-${next}`);
        if (nextButton) nextButton.focus();
      });
    }
    function renderAll() {
      renderTelemetry();
      renderDag();
      renderAdr();
      renderBenchmark();
    }
    renderAll();
    setupTelemetryObserver();
    setupDag();
    setupAdr();
    setupBenchmark();
    document.addEventListener("portfolio:languagechange", renderAll);
  })();
})();
