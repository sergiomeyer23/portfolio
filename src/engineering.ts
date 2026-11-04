"use strict";

/*
 * Barra de telemetria, DAG do pipeline, ADRs e simulador de benchmark.
 *
 * Sem dependências. Os estilos estão em style.css e usam só as variáveis de tema que o
 * site já tinha. A animação do DAG pausa fora do viewport (IntersectionObserver) e todas
 * respeitam prefers-reduced-motion.
 *
 * Para trocar os dados, procure "EDIT:" neste arquivo:
 *   TELEMETRY_STATIC  números que você consegue comprovar
 *   DAG_NODES         contratos, falhas e orçamentos de cada nó
 *   ADRS              registros de decisão
 *   BENCH_MODEL       substitua a estimativa por medições da sua máquina
 *   BENCH_CODE        trechos exibidos nas abas
 */
import type { Lang } from "./types";

(() => {
  const app = window.portfolio;
  if (!app) return;

  interface Bi {
    br: string;
    en: string;
  }

  interface Contract {
    label: Bi;
    code: string;
  }

  interface DagNode {
    id: string;
    tag: string;
    short: Bi;
    title: Bi;
    stack: string;
    summary: Bi;
    input: Contract;
    output: Contract;
    faults: Bi[];
    p99: string;
    throughput: Bi;
  }

  interface Adr {
    id: string;
    title: Bi;
    status: Bi;
    context: Bi;
    decision: Bi;
    alternatives: Bi[];
  }

  type TelemetryKey = "telemetryOrders" | "telemetryShards" | "telemetryPrs";
  type BenchTab = "java" | "python" | "sql";

  const bi = (br: string, en: string): Bi => ({ br, en });

  const lang = (): Lang => (app.getLanguage() === "en" ? "en" : "br");

  const esc = (value: unknown): string => app.escapeHtml(String(value));

  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const formatNumber = (value: number): string => value.toLocaleString(lang() === "br" ? "pt-BR" : "en-US");

  const UI = {
    br: {
      telemetryTitle: "Indicadores de engenharia",
      telemetryOrders: "pedidos reais analisados (Olist)",
      telemetryShards: "shards de coleta paralela (Mercavel)",
      telemetryCi: "repositórios com CI no GitHub Actions",
      telemetryPrs: "PRs no MotherML (Bayer)",
      dagTitle: "Topologia do pipeline",
      dagIntro: "Arquitetura de referência que consolida os padrões usados nos projetos abaixo. Clique em um nó para ver contratos, tolerância a falhas e orçamentos.",
      dagLabel: "Diagrama do pipeline de dados em quatro estágios",
      dagNote: "Os orçamentos de latência e throughput são alvos de dimensionamento do projeto, não medições de produção.",
      nodeLabel: "abrir detalhes",
      close: "Fechar painel",
      contracts: "Contratos de dados",
      input: "Entrada",
      output: "Saída",
      faults: "Tolerância a falhas",
      budget: "Orçamento do nó",
      p99: "Latência p99 (alvo)",
      throughput: "Throughput (estimado)",
      adrTitle: "Registros de decisão arquitetural",
      adrIntro: "Cada decisão segue o formato ADR: contexto, decisão e o que foi descartado, com os trade-offs.",
      adrStatus: "Status",
      adrContext: "Contexto",
      adrDecision: "Decisão",
      adrAlternatives: "Alternativas rejeitadas e trade-offs",
      benchEyebrow: "Performance",
      benchTitle: "Quanto custa processar um bilhão de linhas?",
      benchIntro: "Simulador inspirado no One Billion Row Challenge. Ajuste o volume e o paralelismo e compare três abordagens.",
      benchVolume: "Volume de amostragem",
      benchMode: "Modo de paralelismo",
      benchTime: "Tempo total (escala logarítmica)",
      benchMemory: "Pegada de memória",
      benchFastest: "Mais rápido neste cenário",
      benchLeanest: "Menor memória",
      benchNote: "Estimativa de um modelo de custo (8 núcleos, NVMe, arquivo em cache de página). Não é uma medição ao vivo: rode o código das abas na sua máquina para obter números reais.",
      benchCode: "Implementação",
      benchResults: "Resultados da simulação",
      volumes: ["100 mil", "10 milhões", "100 milhões", "1 bilhão"],
      modes: ["Núcleo único", "Multi-core", "SIMD / Arrow"],
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

  const ui = (): typeof UI.br => UI[lang()];

  /* ------------------------------------------------------------------ */
  /* 1. Telemetria                                                       */
  /* ------------------------------------------------------------------ */

  /*
   * EDIT: só publique números que você consegue comprovar. Os valores abaixo vêm do próprio
   * site (cards dos projetos). Quando tiver medições reais de produção (eventos/dia, p95,
   * ganho de desempenho em consultas), adicione novos itens aqui com { id, value, label }.
   */
  const TELEMETRY_STATIC: { id: string; value: number; labelKey: TelemetryKey }[] = [
    { id: "orders", value: 96000, labelKey: "telemetryOrders" },
    { id: "shards", value: 4, labelKey: "telemetryShards" },
    { id: "prs", value: 2, labelKey: "telemetryPrs" }
  ];

  function telemetryItems(): { id: string; value: number; label: string }[] {
    const text = ui();
    const ciCount = app.projects.filter(project => Boolean(project.ci)).length;
    const items = TELEMETRY_STATIC.map(item => ({
      id: item.id,
      value: item.value,
      label: text[item.labelKey]
    }));
    items.splice(2, 0, { id: "ci", value: ciCount, label: text.telemetryCi });
    return items;
  }

  function compact(value: number): string {
    return value >= 1000 ? `${Math.round(value / 1000)}K` : String(Math.round(value));
  }

  function renderTelemetry() {
    const root = document.getElementById("telemetryRoot");
    if (!root) return;

    root.innerHTML = `
      <h2 class="visually-hidden">${esc(ui().telemetryTitle)}</h2>
      <dl class="tele-grid">
        ${telemetryItems()
          .map(
            item => `
          <div class="tele">
            <dt class="tele-label">${esc(item.label)}</dt>
            <dd class="tele-value" data-target="${item.value}">${compact(item.value)}</dd>
          </div>`
          )
          .join("")}
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

    const tick = (now: number): void => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      targets.forEach(element => {
        if (!element.isConnected) return;
        element.textContent = compact(Number(element.getAttribute("data-target")) * eased);
      });

      if (progress < 1) requestAnimationFrame(tick);
    };

    targets.forEach(element => {
      element.textContent = "0";
    });
    requestAnimationFrame(tick);
  }

  function setupTelemetryObserver() {
    const root = document.getElementById("telemetryRoot");
    if (!root || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries, self) => {
        if (entries.some(entry => entry.isIntersecting)) {
          animateCounters();
          self.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(root);
  }

  /* ------------------------------------------------------------------ */
  /* 2. DAG                                                              */
  /* ------------------------------------------------------------------ */

  /*
   * EDIT: contratos, mecanismos de falha e orçamentos de cada nó. Os valores de p99 e
   * throughput são alvos de dimensionamento; ajuste-os para o que você realmente mediu.
   */
  const DAG_NODES: readonly DagNode[] = [
    {
      id: "ingest",
      tag: "01",
      short: bi("Ingestão", "Ingestion"),
      title: bi("Ingestão & Streaming", "Ingestion & Streaming"),
      stack: "Java 21 · Apache Kafka",
      summary: bi(
        "Ingestão orientada a eventos com particionamento por chave e garantias de entrega.",
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
        label: bi("Tópico Kafka", "Kafka topic"),
        code: `topic:      orders.v1
key:        customer_id   -- ordem por cliente
value:      order-event.v1
partitions: 12
acks:       all
idempotent: true`
      },
      faults: [
        bi("Dead Letter Queue (orders.v1.dlq) para eventos que violam o contrato.", "Dead Letter Queue (orders.v1.dlq) for events that violate the contract."),
        bi("Produtor idempotente (enable.idempotence) e acks=all contra duplicação e perda.", "Idempotent producer (enable.idempotence) and acks=all against duplication and loss."),
        bi("Retry com backoff exponencial e limite de tentativas antes de enviar à DLQ.", "Exponential-backoff retry with an attempt cap before routing to the DLQ.")
      ],
      p99: "≤ 25 ms",
      throughput: bi("~50 mil msg/s por partição", "~50k msg/s per partition")
    },
    {
      id: "process",
      tag: "02",
      short: bi("Processamento", "Processing"),
      title: bi("Processamento & Transformação", "Processing & Transformation"),
      stack: "Python · Polars · PyArrow",
      summary: bi(
        "Transformação colunar vetorizada, validação contratual e enriquecimento em micro-lotes.",
        "Vectorized columnar transformation, contract validation and enrichment in micro-batches."
      ),
      input: {
        label: bi("Lote lido do tópico", "Batch read from the topic"),
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
        bi("Linhas inválidas vão para quarentena com o motivo; o lote continua.", "Invalid rows go to quarantine with the reason; the batch continues."),
        bi("Idempotência por event_id: reprocessar o mesmo lote não duplica resultados.", "Idempotency by event_id: reprocessing the same batch does not duplicate results."),
        bi("Commit de offset só depois da gravação bem-sucedida (at-least-once + dedupe).", "Offset commit only after a successful write (at-least-once + dedupe).")
      ],
      p99: "≤ 120 ms / micro-lote",
      throughput: bi("~200 mil linhas/s por núcleo", "~200k rows/s per core")
    },
    {
      id: "store",
      tag: "03",
      short: bi("Persistência", "Storage"),
      title: bi("Persistência Analítica & Armazenamento", "Analytical Persistence & Storage"),
      stack: "SQL · PostgreSQL · Parquet · DuckDB",
      summary: bi(
        "Modelagem analítica, particionamento temporal e índices para consultas de baixa latência.",
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
        bi("UPSERT idempotente (ON CONFLICT) torna a gravação segura para reentrega.", "Idempotent UPSERT (ON CONFLICT) makes the write safe for redelivery."),
        bi("Parquet imutável por partição diária: recomputar é trocar o arquivo, não editar.", "Immutable Parquet per daily partition: recompute by swapping the file, not editing it."),
        bi("WAL e backup com recuperação pontual (PITR) para o PostgreSQL.", "WAL and point-in-time recovery (PITR) backups for PostgreSQL.")
      ],
      p99: "≤ 40 ms (consulta pontual)",
      throughput: bi("~20 mil inserts/s em lote", "~20k batched inserts/s")
    },
    {
      id: "serve",
      tag: "04",
      short: bi("Serviço", "Serving"),
      title: bi("Camada de Serviço & Telemetria", "Service Layer & Telemetry"),
      stack: "REST · gRPC · OpenTelemetry",
      summary: bi(
        "Gateway de microsserviços com rastreamento distribuído ponta a ponta.",
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
        bi("Circuit Breaker e timeout por dependência para isolar falhas em cascata.", "Circuit breaker and per-dependency timeout to isolate cascading failures."),
        bi("Bulkhead e limite de taxa protegem o armazenamento de picos de consulta.", "Bulkheads and rate limiting protect storage from query spikes."),
        bi("Spans OpenTelemetry com traceparent permitem rastrear uma requisição por todos os nós.", "OpenTelemetry spans with traceparent let you trace a request across every node.")
      ],
      p99: "≤ 50 ms",
      throughput: bi("~2 mil req/s por instância", "~2k req/s per instance")
    }
  ];

  /** Arestas do grafo: o nó de processamento também alimenta a camada de serviço (visão materializada). */
  const DAG_EDGES = [
    ["ingest", "process"],
    ["process", "store"],
    ["store", "serve"],
    ["process", "serve"]
  ];

  const nodeById = (id: string): DagNode => DAG_NODES.find(node => node.id === id) || DAG_NODES[0];

  const narrowQuery = window.matchMedia("(max-width: 720px)");

  interface Position {
    id: string;
    x: number;
    y: number;
  }

  // Desktop em fluxo horizontal e mobile em fluxo vertical, para o texto do SVG não encolher.
  function dagGeometry(narrow: boolean) {
    if (!narrow) {
      const nodeW = 196;
      const nodeH = 92;
      const top = 118;
      const gap = (960 - 24 - nodeW * 4) / 3;
      const positions = DAG_NODES.map((node, index) => ({ id: node.id, x: 12 + index * (nodeW + gap), y: top }));
      const at = (id: string): Position => positions.find(position => position.id === id) ?? positions[0];

      const edges = DAG_EDGES.map(([from, to]) => {
        const a = at(from);
        const b = at(to);
        const adjacent = Math.abs(DAG_NODES.findIndex(n => n.id === from) - DAG_NODES.findIndex(n => n.id === to)) === 1;
        if (adjacent) {
          return { from, to, d: `M${a.x + nodeW} ${a.y + nodeH / 2} L${b.x} ${b.y + nodeH / 2}` };
        }
        const ax = a.x + nodeW / 2;
        const bx = b.x + nodeW / 2;
        return { from, to, d: `M${ax} ${a.y} C${ax} 36, ${bx} 36, ${bx} ${b.y}` };
      });

      return { width: 960, height: 230, nodeW, nodeH, positions, edges };
    }

    const nodeW = 296;
    const nodeH = 80;
    const gapY = 40;
    const positions = DAG_NODES.map((node, index) => ({ id: node.id, x: 16, y: 12 + index * (nodeH + gapY) }));
    const at = (id: string): Position => positions.find(position => position.id === id) ?? positions[0];

    const edges = DAG_EDGES.map(([from, to]) => {
      const a = at(from);
      const b = at(to);
      const adjacent = Math.abs(DAG_NODES.findIndex(n => n.id === from) - DAG_NODES.findIndex(n => n.id === to)) === 1;
      if (adjacent) {
        return { from, to, d: `M${a.x + nodeW / 2} ${a.y + nodeH} L${b.x + nodeW / 2} ${b.y}` };
      }
      const ay = a.y + nodeH / 2;
      const by = b.y + nodeH / 2;
      return { from, to, d: `M${a.x + nodeW} ${ay} C352 ${ay}, 352 ${by}, ${b.x + nodeW} ${by}` };
    });

    return { width: 360, height: 12 + DAG_NODES.length * nodeH + (DAG_NODES.length - 1) * gapY + 12, nodeW, nodeH, positions, edges };
  }

  function dagSvg(): string {
    const geo = dagGeometry(narrowQuery.matches);
    const L = lang();
    const text = ui();

    const edges = geo.edges
      .map(
        edge => `
        <path class="dag-edge" d="${edge.d}" marker-end="url(#dagArrow)"></path>
        <path class="dag-flow" d="${edge.d}"></path>`
      )
      .join("");

    const nodes = geo.positions
      .map(position => {
        const node = nodeById(position.id);
        // WCAG 2.5.3: o nome acessível começa com o texto visível do nó e só depois acrescenta a ação.
        const label = `${node.tag} ${node.short[L]} ${node.stack}, ${text.nodeLabel}`;
        return `
        <g class="dag-node" role="button" tabindex="0" data-node="${esc(node.id)}" aria-label="${esc(label)}" aria-haspopup="dialog" aria-controls="dagPanel" aria-expanded="false" transform="translate(${position.x} ${position.y})">
          <rect width="${geo.nodeW}" height="${geo.nodeH}" rx="14"></rect>
          <text class="dag-node-index" x="16" y="26">${esc(node.tag)}</text>
          <text class="dag-node-title" x="16" y="${geo.nodeH / 2 + 4}">${esc(node.short[L])}</text>
          <text class="dag-node-stack" x="16" y="${geo.nodeH - 18}">${esc(node.stack)}</text>
        </g>`;
      })
      .join("");

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

  let panel: HTMLElement | null = null;
  let openNodeId: string | null = null;

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

    panel.addEventListener("click", event => {
      if ((event.target as HTMLElement).closest(".dag-close")) closeDagPanel(true);
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
          <p class="eyebrow">${esc(node.tag)} · ${esc(node.stack)}</p>
          <h3 id="dagPanelTitle" tabindex="-1">${esc(node.title[L])}</h3>
        </div>
        <button class="dag-close" type="button" aria-label="${esc(text.close)}">×</button>
      </div>
      <p class="dag-panel-summary">${esc(node.summary[L])}</p>

      <h4>${esc(text.contracts)}</h4>
      <p class="dag-code-label">${esc(text.input)}: ${esc(node.input.label[L])}</p>
      <pre tabindex="0"><code>${esc(node.input.code)}</code></pre>
      <p class="dag-code-label">${esc(text.output)}: ${esc(node.output.label[L])}</p>
      <pre tabindex="0"><code>${esc(node.output.code)}</code></pre>

      <h4>${esc(text.faults)}</h4>
      <ul class="dag-faults">${node.faults.map(fault => `<li>${esc(fault[L])}</li>`).join("")}</ul>

      <h4>${esc(text.budget)}</h4>
      <dl class="dag-budget">
        <div><dt>${esc(text.p99)}</dt><dd>${esc(node.p99)}</dd></div>
        <div><dt>${esc(text.throughput)}</dt><dd>${esc(node.throughput[L])}</dd></div>
      </dl>
      <p class="dag-budget-note">${esc(text.dagNote)}</p>`;
  }

  function openDagPanel(id: string, trigger: Element | null): void {
    const element = ensurePanel();
    openNodeId = id;
    element.hidden = false;
    renderPanelContent();
    markOpenNode();
    const title = element.querySelector("#dagPanelTitle");
    if (title instanceof HTMLElement) title.focus();
    if (trigger) element.dataset.returnTo = id;
  }

  function closeDagPanel(restoreFocus: boolean): void {
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
    document.querySelectorAll("#dagRoot [data-node]").forEach(node => {
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

    root.addEventListener("click", event => {
      const node = (event.target as HTMLElement).closest("[data-node]");
      if (!node) return;
      const id = node.getAttribute("data-node") || "";
      if (openNodeId === id) closeDagPanel(true);
      else openDagPanel(id, node);
    });

    root.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const node = (event.target as HTMLElement).closest("[data-node]");
      if (!node) return;
      event.preventDefault();
      const id = node.getAttribute("data-node") || "";
      if (openNodeId === id) closeDagPanel(true);
      else openDagPanel(id, node);
    });

    document.addEventListener("keydown", event => {
      if (event.key !== "Escape" || !panel || panel.hidden) return;
      const palette = document.getElementById("cmd");
      if (palette && !palette.hidden) return;
      event.preventDefault();
      closeDagPanel(true);
    });

    document.addEventListener("click", event => {
      if (!panel || panel.hidden) return;
      const target = (event.target as HTMLElement);
      if (target.closest("#dagPanel") || target.closest("[data-node]")) return;
      closeDagPanel(false);
    });

    narrowQuery.addEventListener("change", renderDag);

    // O fluxo animado só roda enquanto o diagrama está visível.
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => root.classList.toggle("is-live", entry.isIntersecting));
        },
        { threshold: 0.2 }
      );
      observer.observe(root);
    }
  }

  window.portfolio.dagBudgets = () =>
    DAG_NODES.map(node => ({ id: node.id, name: node.short[lang()], p99: node.p99, throughput: node.throughput[lang()] }));

  /* ------------------------------------------------------------------ */
  /* 3. ADR viewer                                                       */
  /* ------------------------------------------------------------------ */

  /*
   * EDIT: revise a fundamentação de cada registro. ADR-001 e ADR-002 descrevem decisões
   * presentes nos repositórios (Mercavel e Print Guard); o raciocínio dos trade-offs é uma
   * proposta de redação, ajuste conforme o que você pesou de fato. O ADR-003 é um exemplo de
   * referência: se ele descreve um sistema seu em produção, troque o status por
   * bi("Aprovado · Em produção", "Approved · In production").
   */
  const ADRS: readonly Adr[] = [
    {
      id: "ADR-001",
      title: bi("Coleta de preços em 4 shards paralelos e pareamento em duas etapas", "Price collection in 4 parallel shards with two-step matching"),
      status: bi("Aceito", "Accepted"),
      context: bi(
        "O Mercavel precisa coletar diariamente os preços de vários supermercados de Cascavel/PR. Um único job sequencial soma o tempo de todos os sites e uma falha em um deles trava o restante.",
        "Mercavel must collect prices daily from several supermarkets in Cascavel/PR. A single sequential job adds up the time of every site and one failure stalls the rest."
      ),
      decision: bi(
        "A coleta roda em 4 shards paralelos no GitHub Actions. O pareamento de produtos acontece em duas etapas: EAN exato primeiro e, só para o que sobrar, uma heurística de marca, nome e gramatura normalizados.",
        "Collection runs in 4 parallel shards on GitHub Actions. Product matching happens in two steps: exact EAN first and, only for what is left, a heuristic on normalized brand, name and weight."
      ),
      alternatives: [
        bi("Job único sequencial: mais simples, porém o tempo total é a soma de todos os sites e uma falha bloqueia a coleta inteira.", "Single sequential job: simpler, but total time is the sum of every site and one failure blocks the whole run."),
        bi("Pareamento fuzzy direto em todos os produtos: cobre mais itens, porém aumenta falsos positivos; o EAN exato primeiro preserva a precisão.", "Fuzzy matching on every product: covers more items but raises false positives; exact EAN first preserves precision.")
      ]
    },
    {
      id: "ADR-002",
      title: bi("Diário SQLite antes da impressora e estado unknown no Print Guard", "SQLite journal before the printer and an unknown state in Print Guard"),
      status: bi("Aceito", "Accepted"),
      context: bi(
        "Uma tarefa agendada que imprime um relatório pode terminar com sucesso enquanto nada sai da impressora. Reimprimir às cegas gera cópias duplicadas; não reimprimir perde o relatório.",
        "A scheduled task that prints a report can finish successfully while nothing comes out of the printer. Reprinting blindly creates duplicates; not reprinting loses the report."
      ),
      decision: bi(
        "Cada tentativa é gravada em um diário SQLite antes de chamar a impressora, e um lock do sistema operacional impede duas execuções simultâneas. O dia só vira ok quando o job sai da fila; sem confirmação, fica unknown e uma pessoa decide.",
        "Each attempt is written to a SQLite journal before calling the printer, and an OS-level lock prevents two simultaneous runs. The day only becomes ok when the job leaves the queue; without confirmation it stays unknown and a person decides."
      ),
      alternatives: [
        bi("Reimprimir automaticamente na dúvida: evita perda, porém gera duplicatas silenciosas.", "Reprint automatically when in doubt: avoids loss but creates silent duplicates."),
        bi("Confiar no código de saída do spooler: simples, mas reporta sucesso mesmo com o job preso na fila.", "Trust the spooler exit code: simple, but reports success even with the job stuck in the queue.")
      ]
    },
    {
      id: "ADR-003",
      title: bi("De batch reativo para streaming contínuo com Virtual Threads no Java 21", "From reactive batch to continuous streaming with Virtual Threads on Java 21"),
      status: bi("Exemplo de referência", "Reference example"),
      context: bi(
        "Concorrência saturada em cenários de I/O bloqueante sob alta carga de solicitações analíticas: o pool de threads de plataforma se esgota esperando o armazenamento.",
        "Saturated concurrency under blocking I/O with a high volume of analytical requests: the platform thread pool runs out while waiting on storage."
      ),
      decision: bi(
        "Adotar threads virtuais (Project Loom) com código bloqueante simples, aliadas a pipelines de agregação vetorizada em DuckDB chamados de forma otimizada.",
        "Adopt virtual threads (Project Loom) with plain blocking code, combined with vectorized aggregation pipelines in DuckDB called in an optimized way."
      ),
      alternatives: [
        bi("Cluster Spark dedicado: escala horizontalmente, mas o custo operacional e a latência de inicialização superam o ganho para este volume.", "Dedicated Spark cluster: scales horizontally, but operational cost and startup latency outweigh the gain at this volume."),
        bi("Programação reativa (WebFlux): evita bloquear threads, porém complica depuração e rastreamento; threads virtuais entregam escala com código direto.", "Reactive programming (WebFlux): avoids blocking threads but complicates debugging and tracing; virtual threads deliver scale with direct code."),
        bi("Instância monolítica bem dimensionada: economiza memória e operação; o trade-off é o teto de escala vertical.", "Well-sized monolithic instance: saves memory and operations; the trade-off is the vertical scaling ceiling.")
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
                <dd><ul>${adr.alternatives.map(item => `<li>${esc(item[L])}</li>`).join("")}</ul></dd>
              </dl>
            </div>
          </article>`;
        }).join("")}
      </div>`;
  }

  function setupAdr() {
    const root = document.getElementById("adrRoot");
    if (!root) return;

    root.addEventListener("click", event => {
      const trigger = (event.target as HTMLElement).closest(".adr-trigger");
      if (!trigger) return;
      const id = trigger.getAttribute("data-adr") || "";
      const expanded = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!expanded));
      const panelElement = document.getElementById(trigger.getAttribute("aria-controls") || "");
      if (panelElement) panelElement.hidden = expanded;
      openAdrId = expanded ? "" : id;
    });
  }

  /* ------------------------------------------------------------------ */
  /* 4. Benchmark                                                        */
  /* ------------------------------------------------------------------ */

  /*
   * EDIT: modelo de custo ilustrativo (nanossegundos por registro). Substitua pelos valores
   * que você medir na sua máquina para transformar a estimativa em resultado real.
   * Memória (MB) = base + porThread * threads + bytesPorRegistro * registros / 1e6.
   */
  const BENCH_VOLUMES = [100_000, 10_000_000, 100_000_000, 1_000_000_000];
  const BENCH_THREADS = [1, 8, 8];

  const BENCH_MODEL = [
    { id: "java", name: "Java 21", detail: "mmap + hash primitivo", startupMs: 120, nsPerRecord: [26, 3.6, 1.9], baseMb: 40, mbPerThread: 12, bytesPerRecord: 0 },
    { id: "python", name: "Python", detail: "Polars + multiprocessing", startupMs: 280, nsPerRecord: [58, 8.2, 5.1], baseMb: 105, mbPerThread: 18, bytesPerRecord: 0.55 },
    { id: "sql", name: "SQL", detail: "DuckDB", startupMs: 40, nsPerRecord: [41, 6.4, 4.0], baseMb: 62, mbPerThread: 10, bytesPerRecord: 0.22 }
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
      label: "Python · Polars",
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
      label: "SQL · DuckDB",
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

  const benchState: { volume: number; mode: number; tab: BenchTab } = { volume: 2, mode: 1, tab: "java" };

  type BenchEngine = (typeof BENCH_MODEL)[number];

  function estimate(engine: BenchEngine): { seconds: number; memoryMb: number } {
    const records = BENCH_VOLUMES[benchState.volume];
    const nanos = engine.nsPerRecord[benchState.mode];
    const threads = BENCH_THREADS[benchState.mode];
    return {
      seconds: engine.startupMs / 1000 + (records * nanos) / 1e9,
      memoryMb: engine.baseMb + engine.mbPerThread * threads + (engine.bytesPerRecord * records) / 1e6
    };
  }

  function formatDuration(seconds: number): string {
    const text = ui();
    if (seconds < 1) return `${Math.round(seconds * 1000)} ms`;
    if (seconds < 60) return `${seconds.toFixed(seconds < 10 ? 2 : 1)} ${text.seconds}`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${text.minutes} ${Math.round(seconds - minutes * 60)} ${text.seconds}`;
  }

  // Largura da barra em porcentagem, em escala logarítmica.
  function logWidth(seconds: number): number {
    const min = Math.log10(0.05);
    const max = Math.log10(120);
    const ratio = (Math.log10(Math.max(seconds, 0.05)) - min) / (max - min);
    return Math.round(8 + Math.min(Math.max(ratio, 0), 1) * 92);
  }

  function benchResultsHtml() {
    const text = ui();
    const rows = BENCH_MODEL.map(engine => ({ engine, ...estimate(engine) }));
    const maxMemory = Math.max(...rows.map(row => row.memoryMb));
    const fastest = rows.reduce((best, row) => (row.seconds < best.seconds ? row : best));
    const leanest = rows.reduce((best, row) => (row.memoryMb < best.memoryMb ? row : best));

    const label = (id: string): string => {
      const engine = BENCH_MODEL.find(item => item.id === id) ?? BENCH_MODEL[0];
      return `<span class="bench-name"><strong>${esc(engine.name)}</strong><small>${esc(engine.detail)}</small></span>`;
    };

    const timeBars = rows
      .map(
        row => `
        <li class="bench-row bench-${row.engine.id}">
          ${label(row.engine.id)}
          <span class="bench-track" aria-hidden="true"><span class="bench-fill" style="--w:${logWidth(row.seconds)}%"></span></span>
          <span class="bench-value">${esc(formatDuration(row.seconds))}</span>
        </li>`
      )
      .join("");

    const memoryBars = rows
      .map(
        row => `
        <li class="bench-row bench-${row.engine.id}">
          ${label(row.engine.id)}
          <span class="bench-track" aria-hidden="true"><span class="bench-fill" style="--w:${Math.max(4, Math.round((row.memoryMb / maxMemory) * 100))}%"></span></span>
          <span class="bench-value">${esc(formatNumber(Math.round(row.memoryMb)))} MB</span>
        </li>`
      )
      .join("");

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

    const tabs: BenchTab[] = ["java", "python", "sql"];

    root.innerHTML = `
      <div class="bench-controls">
        <div class="bench-control">
          <label for="benchVolume">${esc(text.benchVolume)}: <output id="benchVolumeOut" for="benchVolume"></output></label>
          <input id="benchVolume" type="range" min="0" max="3" step="1" value="${benchState.volume}">
          <div class="bench-ticks" aria-hidden="true">${text.volumes.map(item => `<span>${esc(item)}</span>`).join("")}</div>
        </div>
        <div class="bench-control">
          <label for="benchMode">${esc(text.benchMode)}: <output id="benchModeOut" for="benchMode"></output></label>
          <input id="benchMode" type="range" min="0" max="2" step="1" value="${benchState.mode}">
          <div class="bench-ticks" aria-hidden="true">${text.modes.map(item => `<span>${esc(item)}</span>`).join("")}</div>
        </div>
      </div>

      <div class="bench-results" id="benchResults" role="group" aria-live="polite" aria-label="${esc(text.benchResults)}"></div>
      <p class="eng-note">${esc(text.benchNote)}</p>

      <h3 class="bench-code-title">${esc(text.benchCode)}</h3>
      <div class="bench-tabs" role="tablist" aria-label="${esc(text.benchCode)}">
        ${tabs
          .map(
            tab => `<button class="bench-tab" type="button" role="tab" id="benchTab-${tab}" aria-controls="benchPanel-${tab}" aria-selected="${tab === benchState.tab}" tabindex="${tab === benchState.tab ? 0 : -1}" data-tab="${tab}">${esc(BENCH_CODE[tab].label)}</button>`
          )
          .join("")}
      </div>
      ${tabs
        .map(
          tab => `<div class="bench-panel" role="tabpanel" id="benchPanel-${tab}" aria-labelledby="benchTab-${tab}"${tab === benchState.tab ? "" : " hidden"}><pre tabindex="0"><code>${esc(BENCH_CODE[tab].code)}</code></pre></div>`
        )
        .join("")}`;

    updateBenchResults();
  }

  function selectBenchTab(tab: BenchTab): void {
    benchState.tab = tab;
    document.querySelectorAll("#benchRoot .bench-tab").forEach(button => {
      const selected = button.getAttribute("data-tab") === tab;
      button.setAttribute("aria-selected", String(selected));
      button.setAttribute("tabindex", selected ? "0" : "-1");
    });
    document.querySelectorAll("#benchRoot .bench-panel").forEach(element => {
      element.toggleAttribute("hidden", element.id !== `benchPanel-${tab}`);
    });
  }

  function setupBenchmark() {
    const root = document.getElementById("benchRoot");
    if (!root) return;

    root.addEventListener("input", event => {
      const target = (event.target as HTMLInputElement);
      if (target.id === "benchVolume") benchState.volume = Number(target.value);
      else if (target.id === "benchMode") benchState.mode = Number(target.value);
      else return;
      updateBenchResults();
    });

    root.addEventListener("click", event => {
      const button = (event.target as HTMLElement).closest(".bench-tab");
      if (button) selectBenchTab((button.getAttribute("data-tab") as BenchTab));
    });

    root.addEventListener("keydown", event => {
      const button = (event.target as HTMLElement).closest(".bench-tab");
      if (!button || (event.key !== "ArrowRight" && event.key !== "ArrowLeft")) return;
      event.preventDefault();
      const order: BenchTab[] = ["java", "python", "sql"];
      const current = order.indexOf((button.getAttribute("data-tab") as BenchTab));
      const next = order[(current + (event.key === "ArrowRight" ? 1 : order.length - 1)) % order.length];
      selectBenchTab(next);
      const nextButton = document.getElementById(`benchTab-${next}`);
      if (nextButton) nextButton.focus();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Inicialização                                                       */
  /* ------------------------------------------------------------------ */

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
