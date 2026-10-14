const skills = [
  "Data Visualization",
  "A/B Testing",
  "Data Storytelling",
  "Statistical Analysis",
  "Python",
  "Pandas",
  "SQL",
  "PostgreSQL",
  "Power BI",
  "DAX",
  "ETL",
  "Excel Avançado",
  "Power Query",
  "Plotly",
  "Streamlit",
  "Git & GitHub",
  "SAP",
  "Trade Marketing",
  "TypeScript",
  "React",
  "Node.js",
  "Java",
  "Spring Boot",
  "APIs REST"
];

const copy = {
  br: {
    available: "#OPENTOWORK • Remoto ou Cascavel/PR",
    heroGreeting: "OLÁ, EU SOU SERGIO MEYER.",
    heroTitle: "DATA ANALYST & INSIGHTS STRATEGIST.",
    tagline: "Transformando dados em decisões estratégicas e insights acionáveis.",
    heroDescription:
      "Converto dados brutos em narrativas de negócio, dashboards executivos e análises que ajudam equipes comerciais a priorizar oportunidades, reduzir gargalos e vender melhor.",

    ctaProjects: "VEJA MEUS PROJETOS",
    ctaContact: "Fale comigo",
    downloadCv: "Baixar currículo",

    heroStatLabel1: "clientes analisados",
    heroStatLabel2: "vendedores suportados",
    heroStatLabel3: "anos em inteligência comercial",

    aboutEyebrow: "Sobre mim",
    aboutTitle: "Análise técnica com visão comercial de campo.",
    aboutText1:
      "Sou Sérgio Meyer, profissional de análise comercial e inteligência de vendas com experiência em FMCG, distribuição e varejo. Atuei com gestão analítica de uma carteira de 4.000 clientes ativos e suporte estratégico para uma equipe de 50 vendedores.",
    aboutText2:
      "Hoje aprofundo minha atuação em análise de dados, ETL, Python, SQL, Pandas, PostgreSQL, Power BI, Plotly e Streamlit para transformar dados operacionais em decisões claras, priorizadas e mensuráveis.",
    aboutText3:
      "Minha diferença está em conectar execução de loja, comportamento do shopper e métricas comerciais com soluções de BI que fazem sentido para quem toma decisão.",

    mini1: "rotina analítica",
    mini2: "extração e análise",
    mini3: "decisão acionável",

    skillsTitle: "Skills & Ferramentas",

    projectsEyebrow: "Portfolio",
    projectsTitle: "Projetos de dados com foco em decisão.",
    projectsDescription:
      "Seleção de análises, dashboards e laboratórios publicados no GitHub — com foco em performance, visualização, automação e leitura de negócio.",

    servicesEyebrow: "Serviços",
    servicesTitle: "Como posso gerar valor para o seu negócio.",
    servicesDescription:
      "Da extração ao insight: desenho pipelines, organizo indicadores e entrego visualizações acionáveis para líderes comerciais, operações e produto.",

    contactEyebrow: "Contato",
    contactTitle: "Vamos transformar seus dados em próximos passos?",
    contactDescription:
      "Envie uma mensagem sobre seu desafio de dados, dashboard ou automação. O formulário abre seu e-mail com a mensagem pronta para envio.",

    contact1: "Cascavel, Paraná, Brasil",
    contact2: "Português nativo • Inglês B1",
    contact3: "Aberto a oportunidades remotas",

    name: "Nome",
    email: "E-mail",
    message: "Mensagem",
    send: "Enviar mensagem",

    footer: "Todos os direitos reservados.",
    viewRepo: "Ver repositório",
    viewDemo: "Ver demo",

    backToTop: "Voltar ao topo",
    menuClose: "Fechar menu",
    mailtoLink: "sergio.gabriel.meyer10@gmail.com",
    emailBtn: "Enviar e-mail",
    formSuccess: "Mensagem enviada! Obrigado pelo contato — respondo em breve.",
    formSending: "Enviando...",
    formFallback: "Seu navegador abriu seu programa de e-mail com a mensagem pronta. Se nada aconteceu, escreva direto para sergio.gabriel.meyer10@gmail.com"
  },

  en: {
    available: "#OPENTOWORK • Remote or Cascavel/PR",
    heroGreeting: "HI, I AM SERGIO MEYER.",
    heroTitle: "DATA ANALYST & INSIGHTS STRATEGIST.",
    tagline: "Turning data into strategic decisions and actionable insights.",
    heroDescription:
      "I convert raw data into business narratives, executive dashboards, and analyses that help sales teams prioritize opportunities, remove bottlenecks, and sell smarter.",

    ctaProjects: "VIEW MY PROJECTS",
    ctaContact: "Contact me",
    downloadCv: "Download résumé",

    heroStatLabel1: "customers analyzed",
    heroStatLabel2: "sales reps supported",
    heroStatLabel3: "years in sales intelligence",

    aboutEyebrow: "About me",
    aboutTitle: "Technical analysis with field-driven commercial vision.",
    aboutText1:
      "I am Sérgio Meyer, a sales intelligence and commercial analytics professional with experience across FMCG, distribution, and retail. I managed analytical routines for a 4,000-customer portfolio and supported a 50-person sales team.",
    aboutText2:
      "I am expanding my work in data analysis, ETL, Python, SQL, Pandas, PostgreSQL, Power BI, Plotly, and Streamlit to turn operational data into clear, prioritized, measurable decisions.",
    aboutText3:
      "My edge is connecting store execution, shopper behavior, and commercial metrics with BI solutions that make sense for decision makers.",

    mini1: "analytics routine",
    mini2: "extraction & analysis",
    mini3: "actionable decision",

    skillsTitle: "Skills & Tools",

    projectsEyebrow: "Portfolio",
    projectsTitle: "Data projects focused on decisions.",
    projectsDescription:
      "A selection of analyses, dashboards, and labs published on GitHub — focused on performance, visualization, automation, and business interpretation.",

    servicesEyebrow: "Services",
    servicesTitle: "How I can create value for your business.",
    servicesDescription:
      "From extraction to insight: I design pipelines, organize KPIs, and deliver actionable visualizations for sales, operations, and product leaders.",

    contactEyebrow: "Contact",
    contactTitle: "Ready to turn data into next steps?",
    contactDescription:
      "Send a message about your data challenge, dashboard, or automation. The form opens your email with a ready-to-send message.",

    contact1: "Cascavel, Paraná, Brazil",
    contact2: "Native Portuguese • English B1",
    contact3: "Open to remote opportunities",

    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send message",

    footer: "All rights reserved.",
    viewRepo: "View repository",
    viewDemo: "View demo",

    backToTop: "Back to top",
    menuClose: "Close menu",
    mailtoLink: "sergio.gabriel.meyer10@gmail.com",
    emailBtn: "Send email",
    formSuccess: "Message sent! Thanks for reaching out — I will reply shortly.",
    formSending: "Sending...",
    formFallback: "Your browser opened your email app with the message ready to send. If nothing happened, write directly to sergio.gabriel.meyer10@gmail.com"
  }
};

const projects = [
  {
    title: "Olist Sales Performance Analysis",
    titleEn: "Olist Sales Performance Analysis",
    category: "Customer & Seller Segmentation Model",
    categoryEn: "Customer & Seller Segmentation Model",
    description:
      "Pipeline analítico com limpeza de 9 CSVs, cache em Parquet, 20 funções de análise e dashboard Streamlit com 6 abas para investigar sazonalidade, Pareto, frete, atraso e satisfação.",
    descriptionEn:
      "Analytical pipeline covering 9 CSVs, Parquet cache, 20 analysis functions and a 6-tab Streamlit dashboard to explore seasonality, Pareto, freight, delays and satisfaction.",
    result: "R$ 13,2M analisados • 96k pedidos",
    resultEn: "R$ 13.2M analyzed • 96k orders",
    technologies: ["Python", "Pandas", "Plotly", "Streamlit", "PostgreSQL"],
    repository: "https://github.com/sergiomeyer23/olist-sales-performance-analysis",
    bars: [72, 48, 86, 62, 95, 53, 78]
  },

  {
    title: "Retail Sales Analyzer",
    titleEn: "Retail Sales Analyzer",
    category: "Predictive Sales Analysis Foundation",
    categoryEn: "Predictive Sales Analysis Foundation",
    description:
      "Script Python para leitura de vendas em CSV, estatísticas gerais, ranking de produtos, filtros por valor e tratamento robusto de erros — base para automações e modelos de previsão.",
    descriptionEn:
      "Python script reading sales from CSV, general stats, product ranking, value filters and robust error handling — base for automations and forecasting models.",
    result: "Relatórios automatizados em CSV",
    resultEn: "Automated CSV reports",
    technologies: ["Python", "CSV", "Data Quality", "Automation"],
    repository: "https://github.com/sergiomeyer23/retail-sales-analyzer",
    bars: [42, 68, 51, 84, 58, 73, 66]
  },

  {
    title: "Excel Dashboard Vendas & Estoque",
    titleEn: "Excel Sales & Inventory Dashboard",
    category: "Financial Dashboard & Operational KPIs",
    categoryEn: "Financial Dashboard & Operational KPIs",
    description:
      "Dashboard para identificar produtos sem estoque, lojas abaixo da meta e categorias mais rentáveis, conectando análise financeira, estoque e desempenho comercial.",
    descriptionEn:
      "Dashboard identifying out-of-stock products, stores below target and most profitable categories, connecting financial analysis, inventory and sales performance.",
    result: "Metas • Estoque • Rentabilidade",
    resultEn: "Targets • Inventory • Profitability",
    technologies: ["Excel", "Power Query", "Dashboard", "KPIs"],
    repository: "https://github.com/sergiomeyer23/excel-dashboard-vendas-estoque-",
    bars: [55, 77, 45, 89, 70, 64, 92]
  },

  {
    title: "Pandas Fundamentos — Lab 12/12",
    titleEn: "Pandas Fundamentals — Lab 12/12",
    category: "Healthcare Data Insights Ready Stack",
    categoryEn: "Healthcare Data Insights Ready Stack",
    description:
      "Laboratório prático cobrindo ciclo integral de dados: leitura, limpeza, filtros, groupby, merge, datas e exportação. Base técnica para análises setoriais, incluindo saúde, varejo e finanças.",
    descriptionEn:
      "Practical lab covering the full data cycle: reading, cleaning, filtering, groupby, merge, dates and export. Technical foundation for sector analyses including healthcare, retail and finance.",
    result: "12/12 exercícios concluídos",
    resultEn: "12/12 exercises completed",
    technologies: ["Python", "Pandas", "Data Cleaning", "EDA"],
    repository: "https://github.com/sergiomeyer23/pandas-fundamentos",
    bars: [67, 44, 75, 88, 52, 81, 69]
  },

  {
    title: "Mercavel — Comparador de Preços",
    titleEn: "Mercavel — Price Comparison",
    category: "Web Scraping & Retail Price Intelligence",
    categoryEn: "Web Scraping & Retail Price Intelligence",
    description:
      "Plataforma web que compara preços de supermercados de Cascavel/PR a partir de dados coletados automaticamente nos sites dos mercados. Traz tabela de preços por mercado, média por categoria, cesta de compras comparada e dashboard geral — cada preço guarda a data da coleta e o link da oferta.",
    descriptionEn:
      "Web platform comparing supermarket prices in Cascavel/PR automatically collected from market websites. Provides per-market price table, category averages, compared shopping basket and overall dashboard — each price stores its collection date and offer link.",
    result: "Preços reais • Múltiplos mercados • Cesta comparada",
    resultEn: "Real prices • Multiple markets • Compared basket",
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "Web Scraping"],
    repository: "https://github.com/sergiomeyer23/Mercavel",
    bars: [81, 56, 93, 64, 72, 88, 60]
  },

  {
    title: "Mangos — Gestão de Caixa com IA",
    titleEn: "Mangos — Cash Management with AI",
    category: "AI for Impact • Natural Language to Structured Data",
    categoryEn: "AI for Impact • Natural Language to Structured Data",
    description:
      "Aplicação web de gestão de caixa para jovens microempreendedores: aceita frases como “vendi 6 bolos a 12 e gastei 40 de ingrediente” e converte em lançamentos estruturados, com resultado por produto, sugestão de preço e diagnóstico em linguagem simples. Todo cálculo roda em funções determinísticas testadas (28 autotestes), com o LLM restrito à extração e à redação. Projeto do NAUFest Challenge 2026 (#AIForImpact).",
    descriptionEn:
      "Cash management web app for young micro-entrepreneurs: accepts sentences like “sold 6 cakes at 12 and spent 40 on ingredients” and converts them into structured entries with per-product result, suggested price and plain-language diagnosis. All calculations run in tested deterministic functions (28 self-tests), with the LLM restricted to extraction and wording. NAUFest Challenge 2026 (#AIForImpact) project.",
    result: "28 autotestes • Funciona offline sem IA",
    resultEn: "28 self-tests • Works offline without AI",
    technologies: ["JavaScript", "Google Gemini", "Chart.js", "localStorage", "SheetJS"],
    repository: "https://github.com/sergiomeyer23/Mangos",
    live: "https://sergiomeyer23.github.io/Mangos/",
    bars: [76, 91, 58, 83, 69, 95, 54]
  },

  {
    title: "Pipoca — Bot de WhatsApp com LLM",
    titleEn: "Pipoca — WhatsApp Bot with LLM",
    category: "Conversational AI & Automation",
    categoryEn: "Conversational AI & Automation",
    description:
      "Bot de WhatsApp com personalidade própria, construído sobre whatsapp-web.js e API compatível com OpenAI. Sessão persistida por QR Code, fallback automático de modelo, persona separada da lógica em arquivo de dados e suíte de testes de pipeline e roteamento.",
    descriptionEn:
      "WhatsApp bot with its own personality, built on whatsapp-web.js and an OpenAI-compatible API. Persisted QR session, automatic model fallback, persona separated from logic in a data file, and pipeline and routing test suite.",
    result: "v0.2 • Fallback de modelo • Testes automatizados",
    resultEn: "v0.2 • Model fallback • Automated tests",
    technologies: ["Node.js", "whatsapp-web.js", "LLM APIs", "Docker"],
    repository: "https://github.com/sergiomeyer23/pipoca",
    bars: [63, 85, 71, 49, 90, 66, 79]
  },

  {
    title: "Personal Finance API",
    titleEn: "Personal Finance API",
    category: "Backend Engineering & REST API Design",
    categoryEn: "Backend Engineering & REST API Design",
    description:
      "API REST em Java e Spring Boot para gestão de finanças pessoais, com camadas de entidade, repositório e controller, Maven Wrapper para build reprodutível e testes automatizados — a base de backend por trás de soluções de dados que precisam de fonte própria e confiável.",
    descriptionEn:
      "REST API in Java and Spring Boot for personal finance management, with entity, repository and controller layers, Maven Wrapper for reproducible builds and automated tests — the backend foundation behind data solutions needing their own reliable source.",
    result: "Java 17 • Spring Boot • Maven",
    resultEn: "Java 17 • Spring Boot • Maven",
    technologies: ["Java", "Spring Boot", "REST API", "Maven"],
    repository: "https://github.com/sergiomeyer23/personal-finance-api",
    bars: [58, 74, 87, 61, 79, 55, 84]
  }
];

const services = [
  {
    icon: "📊",
    title: "Data Visualization & Dashboards",
    titleEn: "Data Visualization & Dashboards",
    description:
      "Dashboards claros, responsivos e orientados à decisão para acompanhar metas, cobertura, sell-out, ruptura e performance.",
    descriptionEn:
      "Clear, responsive, decision-oriented dashboards to track targets, coverage, sell-out, stockouts and performance.",
    items: ["Power BI / Excel", "KPIs comerciais", "Storytelling executivo"],
    itemsEn: ["Power BI / Excel", "Commercial KPIs", "Executive storytelling"]
  },

  {
    icon: "🧠",
    title: "Statistical Data Analysis",
    titleEn: "Statistical Data Analysis",
    description:
      "Análises exploratórias, segmentações, Pareto, correlações e leitura de drivers para priorizar ações de alto impacto.",
    descriptionEn:
      "Exploratory analyses, segmentation, Pareto, correlations and driver reading to prioritize high-impact actions.",
    items: ["Python / Pandas", "A/B Testing", "Modelagem de hipóteses"],
    itemsEn: ["Python / Pandas", "A/B Testing", "Hypothesis modeling"]
  },

  {
    icon: "⚙️",
    title: "ETL & Data Pipeline Design",
    titleEn: "ETL & Data Pipeline Design",
    description:
      "Rotinas de extração, limpeza e organização de dados para reduzir trabalho manual e aumentar confiabilidade operacional.",
    descriptionEn:
      "Extraction, cleaning and data organization routines to reduce manual work and increase operational reliability.",
    items: ["SQL / PostgreSQL", "Automação de relatórios", "Qualidade de dados"],
    itemsEn: ["SQL / PostgreSQL", "Report automation", "Data quality"]
  }
];

let currentLanguage = localStorage.getItem("portfolio-lang") || "br";
if (!copy[currentLanguage]) currentLanguage = "br";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function localized(item, field) {
  if (currentLanguage === "en") {
    const enKey = field + "En";
    if (item[enKey]) return item[enKey];
  }
  return item[field];
}

function renderSkills() {
  const container = document.getElementById("skills");
  container.innerHTML = skills
    .map(skill => `<span class="skill">${escapeHtml(skill)}</span>`)
    .join("");
}

function renderProjects() {
  const container = document.getElementById("projects");
  const selectedCopy = copy[currentLanguage];

  container.innerHTML = projects
    .map(project => {
      const title = escapeHtml(localized(project, "title"));
      const category = escapeHtml(localized(project, "category"));
      const description = escapeHtml(localized(project, "description"));
      const result = escapeHtml(localized(project, "result"));
      const repository = escapeHtml(project.repository);
      const live = project.live ? escapeHtml(project.live) : "";

      const bars = project.bars
        .map(height => `<div class="bar" style="height: ${Number(height)}%"></div>`)
        .join("");

      const tags = project.technologies
        .map(technology => `<span>${escapeHtml(technology)}</span>`)
        .join("");

      const liveButton = project.live
        ? `
            <a
              class="btn btn-ghost"
              href="${live}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span data-btnlive></span> ↗
            </a>
            `
        : "";

      return `
        <article class="project glass">
          <div class="dash">
            ${bars}
            <span class="kpi">Live KPI</span>
          </div>

          <div class="project-body">
            <small>${category}</small>

            <h3>${title}</h3>

            <p>${description}</p>

            <span class="metric">
              ${result}
            </span>

            <div class="tags">
              ${tags}
            </div>

            <div class="project-actions">
              <a
                class="btn btn-primary"
                href="${repository}"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span data-btnrepo></span> ↗
              </a>
              ${liveButton}
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  // Refresh translated button labels after rebuild
  document.querySelectorAll("[data-btnrepo]").forEach(element => {
    element.textContent = selectedCopy.viewRepo;
  });
  document.querySelectorAll("[data-btnlive]").forEach(element => {
    element.textContent = selectedCopy.viewDemo;
  });
}

function renderServices() {
  const container = document.getElementById("servicesGrid");

  container.innerHTML = services
    .map(service => {
      const title = escapeHtml(localized(service, "title"));
      const description = escapeHtml(localized(service, "description"));
      const items = (currentLanguage === "en" && service.itemsEn ? service.itemsEn : service.items)
        .map(item => `<li>✓ ${escapeHtml(item)}</li>`)
        .join("");

      return `
        <article class="service glass">
          <div class="service-icon">
            ${escapeHtml(service.icon)}
          </div>

          <h3>${title}</h3>

          <p>${description}</p>

          <ul>
            ${items}
          </ul>
        </article>
      `;
    })
    .join("");
}

function renderPage() {
  renderSkills();
  renderProjects();
  renderServices();
}

function setLanguage(language) {
  if (!copy[language]) return;

  currentLanguage = language;
  localStorage.setItem("portfolio-lang", language);

  const selectedCopy = copy[language];

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {
      const key = element.dataset.i18n;

      if (selectedCopy[key]) {
        element.textContent = selectedCopy[key];
      }
    });

  document
    .querySelectorAll("[data-lang]")
    .forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.lang === language
      );
    });

  document.documentElement.lang =
    language === "br" ? "pt-BR" : "en";

  renderProjects();
  renderServices();

  document.querySelectorAll("[data-btnrepo]").forEach(element => {
    element.textContent = selectedCopy.viewRepo;
  });

  document.querySelectorAll("[data-btnlive]").forEach(element => {
    element.textContent = selectedCopy.viewDemo;
  });

  const menuButton = document.getElementById("menuBtn");
  if (menuButton) {
    menuButton.setAttribute("aria-label", selectedCopy.menuClose === "Fechar menu" ? "Abrir menu" : "Open menu");
  }

  const backBtn = document.querySelector(".back-to-top");
  if (backBtn) backBtn.setAttribute("aria-label", selectedCopy.backToTop);
}

function setupLanguageButtons() {
  document
    .querySelectorAll("[data-lang]")
    .forEach(button => {
      button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
      });
    });
}

function setupMobileMenu() {
  const menuButton = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!menuButton || !mobileMenu) return;

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    mobileMenu.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
  };

  menuButton.addEventListener("click", event => {
    event.stopPropagation();
    if (mobileMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenu
    .querySelectorAll("a")
    .forEach(link => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

  document.addEventListener("click", event => {
    if (
      mobileMenu.classList.contains("open") &&
      !mobileMenu.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form) return;

  const selectedCopy = copy[currentLanguage];

  if (/[?&]enviado=1/.test(window.location.search)) {
    if (status) {
      status.textContent = selectedCopy.formSuccess;
    }

    if (window.history && window.history.replaceState) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + "#contact"
      );
    }
  }

  form.addEventListener("submit", event => {
    const liveCopy = copy[currentLanguage];
    const action = form.getAttribute("action") || "";

    if (!action.trim()) {
      event.preventDefault();

      const formData = new FormData(form);

      const name = formData.get("name") || "Novo lead";
      const email = formData.get("email") || "";
      const message = formData.get("message") || "";

      const subject =
        "Contato pelo portfólio — " + name;

      const body =
        message +
        "\n\nNome: " + name +
        "\nE-mail: " + email;

      window.location.href =
        "mailto:" + copy.br.mailtoLink +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      if (status) {
        status.textContent = liveCopy.formFallback;
      }

      return;
    }

    const button = form.querySelector("button[type='submit']");

    if (button) {
      button.disabled = true;
    }

    if (status) {
      status.textContent = liveCopy.formSending;
    }
  });
}

function setupScrollSpy() {
  const links = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
  if (!links.length) return;

  const targets = links
    .map(link => {
      const id = link.getAttribute("href");
      const section = id ? document.querySelector(id) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        targets.forEach(({ link, section }) => {
          link.classList.toggle("active", section === entry.target);
        });
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

  targets.forEach(({ section }) => observer.observe(section));
}

function setupBackToTop() {
  const backBtn = document.createElement("button");
  backBtn.type = "button";
  backBtn.className = "back-to-top";
  backBtn.textContent = "↑";
  backBtn.setAttribute("aria-label", copy[currentLanguage].backToTop);
  document.body.appendChild(backBtn);

  backBtn.addEventListener("click", () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  const toggle = () => {
    backBtn.classList.toggle("visible", window.scrollY > 320);
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
}

renderPage();
setLanguage(currentLanguage);

setupLanguageButtons();
setupMobileMenu();
setupContactForm();
setupScrollSpy();
setupBackToTop();
