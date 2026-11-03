const skills = [
  "Python",
  "Pandas",
  "SQL",
  "PostgreSQL",
  "ETL",
  "Java",
  "Spring Boot",
  "APIs REST",
  "TypeScript",
  "React",
  "Node.js",
  "Docker",
  "GitHub Actions",
  "Pytest",
  "JUnit 5",
  "Git & GitHub",
  "Streamlit",
  "Plotly",
  "Power BI",
  "DAX",
  "Power Query",
  "Data Visualization",
  "Data Storytelling",
  "Statistical Analysis",
  "A/B Testing",
  "Excel Avançado"
];

const copy = {
  br: {
    skipLink: "Pular para o conteúdo",
    mainNavLabel: "Navegação principal",
    languageLabel: "Idioma",
    available: "#OPENTOWORK • Remoto ou Cascavel/PR",
    navHome: "Início",
    navAbout: "Sobre",
    navPortfolio: "Projetos",
    navCases: "Estudos de caso",
    navServices: "Serviços",
    navContact: "Contato",
    menuOpen: "Abrir menu",
    menuLabel: "Menu de navegação",
    heroGreeting: "OLÁ, EU SOU SERGIO MEYER.",
    heroTitle: "DATA & SOFTWARE ENGINEER.",
    tagline: "Do dado bruto à decisão, com pipelines e APIs testados em CI.",
    heroDescription:
      "Construo pipelines de dados, automações e aplicações backend. Python e SQL de um lado, Java com Spring Boot e TypeScript do outro, sempre com testes automatizados e CI/CD.",

    ctaProjects: "VEJA MEUS PROJETOS",
    ctaContact: "Fale comigo",
    downloadCv: "Baixar currículo",

    heroStatLabel1: "PRs no MotherML (Bayer)",
    heroStatLabel2: "pedidos reais analisados",
    heroStatLabel3: "shards de coleta paralela",
    bubbleValue: "CI/CD",
    bubbleLabel: "Testes automatizados",

    aboutEyebrow: "Sobre mim",
    aboutTitle: "Engenharia de dados com visão de negócio.",
    aboutText1:
      "Sou Sérgio Meyer, profissional de análise comercial e inteligência de vendas com experiência em FMCG, distribuição e varejo. Atuei com gestão analítica de uma carteira de 4.000 clientes ativos e suporte estratégico para uma equipe de 50 vendedores.",
    aboutText2:
      "Hoje atuo com engenharia de dados e desenvolvimento: ETL, Python, SQL, Pandas e PostgreSQL de um lado, Java com Spring Boot, TypeScript e React do outro, com testes automatizados e CI/CD.",
    aboutText3:
      "Minha diferença está em conectar execução de loja, comportamento do shopper e métricas comerciais com soluções de BI que fazem sentido para quem toma decisão.",

    mini1: "pipelines automatizados",
    mini2: "extração e análise",
    mini3: "APIs e interfaces",

    skillsTitle: "Skills & Ferramentas",

    projectsEyebrow: "Portfolio",
    projectsTitle: "Projetos de dados e de software, testados em CI.",
    projectsDescription:
      "Seleção de pipelines, APIs e análises publicados no GitHub. Use os filtros para ver só a área que interessa.",
    filterGroupLabel: "Filtrar projetos por área",
    filterAll: "Todos",
    filterData: "Data & Analytics",
    filterSoftware: "Software & Backend",
    filterOss: "Open Source",

    ossEyebrow: "Open Source",
    ossTitle: "Contribuições no repositório da Bayer.",
    ossText:
      "O MotherML é um framework de Machine Learning em Python mantido pelo grupo Bayer, usado em predição de propriedades moleculares e dados de transcriptômica. Tenho dois PRs nele.",
    ossPr91: "Model Registry: descoberta e instanciação padronizada de modelos",
    ossPr106: "Murcko Scaffold Grouping: validação cruzada sem vazamento entre compostos parecidos",

    cmdButton: "Buscar",
    cmdTitle: "Navegar pelo portfólio",
    cmdInputLabel: "Buscar comando",
    cmdPlaceholder: "Digite um comando",
    cmdEmpty: "Nenhum comando encontrado.",
    cmdProjects: "Ir para Projetos",
    cmdOss: "Ir para Open Source",
    cmdCases: "Ir para Estudos de caso",
    cmdContact: "Ir para Contato",
    cmdFilterData: "Filtrar projetos: Data & Analytics",
    cmdFilterSoftware: "Filtrar projetos: Software & Backend",
    cmdFilterOss: "Filtrar projetos: Open Source",
    cmdFilterAll: "Mostrar todos os projetos",
    cmdLanguage: "Mudar idioma para English",
    cmdCopyEmail: "Copiar e-mail",
    cmdCv: "Baixar currículo (PDF)",
    toastEmailCopied: "E-mail copiado.",
    toastEmailManual: "Não foi possível copiar. O e-mail é sergio.gabriel.meyer10@gmail.com",

    servicesEyebrow: "Serviços",
    servicesTitle: "Como posso gerar valor para o seu negócio.",
    servicesDescription:
      "Do pipeline à API e ao dashboard: construo a camada de dados e a de aplicação, com testes e integração contínua.",
    casesEyebrow: "Estudos de caso",
    casesTitle: "De problema a decisão.",
    casesDescription:
      "Alguns exemplos de como transformei dados operacionais em ações concretas para times comerciais.",
    caseProblem: "Problema",
    caseApproach: "Abordagem",
    caseResult: "Resultado",

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
    namePlaceholder: "Seu nome",
    emailPlaceholder: "seuemail@empresa.com",
    messagePlaceholder: "Conte um pouco sobre seu desafio de dados, dashboard ou automação.",
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
    skipLink: "Skip to content",
    mainNavLabel: "Main navigation",
    languageLabel: "Language",
    available: "#OPENTOWORK • Remote or Cascavel/PR",
    navHome: "Home",
    navAbout: "About",
    navPortfolio: "Portfolio",
    navCases: "Case studies",
    navServices: "Services",
    navContact: "Contact",
    menuOpen: "Open menu",
    menuLabel: "Navigation menu",
    heroGreeting: "HI, I AM SERGIO MEYER.",
    heroTitle: "DATA & SOFTWARE ENGINEER.",
    tagline: "From raw data to decisions, with pipelines and APIs tested in CI.",
    heroDescription:
      "I build data pipelines, automations and backend applications. Python and SQL on one side, Java with Spring Boot and TypeScript on the other, always with automated tests and CI/CD.",

    ctaProjects: "VIEW MY PROJECTS",
    ctaContact: "Contact me",
    downloadCv: "Download résumé",

    heroStatLabel1: "PRs in MotherML (Bayer)",
    heroStatLabel2: "real orders analyzed",
    heroStatLabel3: "parallel collection shards",
    bubbleValue: "CI/CD",
    bubbleLabel: "Automated tests",

    aboutEyebrow: "About me",
    aboutTitle: "Data engineering with business sense.",
    aboutText1:
      "I am Sérgio Meyer, a sales intelligence and commercial analytics professional with experience across FMCG, distribution, and retail. I managed analytical routines for a 4,000-customer portfolio and supported a 50-person sales team.",
    aboutText2:
      "Today I work in data engineering and development: ETL, Python, SQL, Pandas and PostgreSQL on one side, Java with Spring Boot, TypeScript and React on the other, with automated tests and CI/CD.",
    aboutText3:
      "My edge is connecting store execution, shopper behavior, and commercial metrics with BI solutions that make sense for decision makers.",

    mini1: "automated pipelines",
    mini2: "extraction & analysis",
    mini3: "APIs and interfaces",

    skillsTitle: "Skills & Tools",

    projectsEyebrow: "Portfolio",
    projectsTitle: "Data and software projects, tested in CI.",
    projectsDescription:
      "A selection of pipelines, APIs and analyses published on GitHub. Use the filters to see only the area you care about.",
    filterGroupLabel: "Filter projects by area",
    filterAll: "All",
    filterData: "Data & Analytics",
    filterSoftware: "Software & Backend",
    filterOss: "Open Source",

    ossEyebrow: "Open Source",
    ossTitle: "Contributions to Bayer's repository.",
    ossText:
      "MotherML is a Python Machine Learning framework maintained by the Bayer group, used for molecular property prediction and transcriptomics data. I have two PRs in it.",
    ossPr91: "Model Registry: standard discovery and instantiation of models",
    ossPr106: "Murcko Scaffold Grouping: cross-validation without leakage between similar compounds",

    cmdButton: "Search",
    cmdTitle: "Navigate the portfolio",
    cmdInputLabel: "Search command",
    cmdPlaceholder: "Type a command",
    cmdEmpty: "No command found.",
    cmdProjects: "Go to Projects",
    cmdOss: "Go to Open Source",
    cmdCases: "Go to Case studies",
    cmdContact: "Go to Contact",
    cmdFilterData: "Filter projects: Data & Analytics",
    cmdFilterSoftware: "Filter projects: Software & Backend",
    cmdFilterOss: "Filter projects: Open Source",
    cmdFilterAll: "Show all projects",
    cmdLanguage: "Switch language to Português",
    cmdCopyEmail: "Copy email",
    cmdCv: "Download résumé (PDF)",
    toastEmailCopied: "Email copied.",
    toastEmailManual: "Could not copy. The email is sergio.gabriel.meyer10@gmail.com",

    servicesEyebrow: "Services",
    servicesTitle: "How I can create value for your business.",
    servicesDescription:
      "From pipeline to API to dashboard: I build the data layer and the application layer, with tests and continuous integration.",
    casesEyebrow: "Case studies",
    casesTitle: "From problem to decision.",
    casesDescription:
      "A few examples of turning operational data into concrete actions for sales teams.",
    caseProblem: "Problem",
    caseApproach: "Approach",
    caseResult: "Result",

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
    namePlaceholder: "Your name",
    emailPlaceholder: "you@company.com",
    messagePlaceholder: "Tell me a bit about your data, dashboard, or automation challenge.",
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
    title: "Mercavel — Comparador de Preços",
    titleEn: "Mercavel — Price Comparison",
    category: "Data Engineering & Full-Stack",
    categoryEn: "Data Engineering & Full-Stack",
    description:
      "Comparador e rastreador diário de preços entre supermercados de Cascavel/PR. A coleta roda em 4 shards paralelos no GitHub Actions e o pareamento de produtos acontece em duas etapas: EAN exato e uma heurística de marca, nome e gramatura normalizados.",
    descriptionEn:
      "Daily price tracker and comparison across supermarkets in Cascavel/PR. Collection runs in 4 parallel GitHub Actions shards and product matching happens in two steps: exact EAN, then a heuristic on normalized brand, name and weight.",
    result: "Coleta diária em 4 shards • Testes com Vitest",
    resultEn: "Daily collection in 4 shards • Vitest tests",
    technologies: ["TypeScript", "React", "Node.js", "Supabase", "Vitest", "GitHub Actions"],
    repository: "https://github.com/sergiomeyer23/Mercavel",
    live: "https://sergiomeyer23.github.io/Mercavel/",
    areas: ["data", "software"],
    featured: true,
    flow: ["4 shards · Actions", "EAN + heurística", "Supabase", "React + TypeScript"],
    flowEn: ["4 shards · Actions", "EAN + heuristic", "Supabase", "React + TypeScript"]
  },

  {
    title: "Expense Tracker API",
    titleEn: "Expense Tracker API",
    category: "Backend & REST API",
    categoryEn: "Backend & REST API",
    description:
      "API REST de gestão financeira pessoal em camadas (Controller, Service e Repository), com validação estrita por DTOs, tratamento global de exceções, persistência relacional e ambiente conteinerizado com Docker Compose.",
    descriptionEn:
      "Personal finance REST API in layers (Controller, Service and Repository), with strict DTO validation, global exception handling, relational persistence and a containerized Docker Compose environment.",
    result: "Java 21 • Spring Boot • JUnit 5",
    resultEn: "Java 21 • Spring Boot • JUnit 5",
    technologies: ["Java 21", "Spring Boot", "Spring Data JPA", "PostgreSQL", "Docker Compose", "JUnit 5"],
    repository: "https://github.com/sergiomeyer23/expense-tracker-api",
    areas: ["software"],
    flow: ["Controller", "Service", "Repository", "PostgreSQL"]
  },

  {
    title: "Olist Sales Performance Analysis",
    titleEn: "Olist Sales Performance Analysis",
    category: "E-commerce Analytics & Customer/Seller Insights",
    categoryEn: "E-commerce Analytics & Customer/Seller Insights",
    description:
      "Pipeline analítico com limpeza de 9 CSVs, cache em Parquet, 20 funções de análise e dashboard Streamlit com 6 abas para investigar sazonalidade, Pareto, frete, atraso e satisfação.",
    descriptionEn:
      "Analytical pipeline covering 9 CSVs, Parquet cache, 20 analysis functions and a 6-tab Streamlit dashboard to explore seasonality, Pareto, freight, delays and satisfaction.",
    result: "R$ 13,2M analisados • 96 mil pedidos",
    resultEn: "BRL 13.2M analyzed • 96k orders",
    technologies: ["Python", "Pandas", "Plotly", "Streamlit", "Pytest"],
    repository: "https://github.com/sergiomeyer23/olist-sales-performance-analysis",
    areas: ["data"],
    flow: ["9 CSVs", "Cache Parquet", "20 funções", "Streamlit"],
    flowEn: ["9 CSVs", "Parquet cache", "20 functions", "Streamlit"]
  },

  {
    title: "Print Guard: Impressão Agendada com Confirmação",
    titleEn: "Print Guard: Scheduled Printing with Confirmation",
    category: "Windows Automation & Failure Recovery",
    categoryEn: "Windows Automation & Failure Recovery",
    description:
      "CLI em Python que gera um relatório em PDF, imprime e só marca o dia como concluído depois que o job sai da fila de impressão. Cada tentativa é gravada num diário SQLite antes do envio, um lock do sistema operacional impede execuções simultâneas e, quando o resultado não pode ser confirmado, o estado fica unknown e nada é reimpresso sozinho. O backend do Windows foi validado numa fila de impressão real no CI, mas ainda não numa impressora física.",
    descriptionEn:
      "Python CLI that renders a PDF report, prints it and marks the day done only after the job leaves the print queue. Each attempt is written to a SQLite journal before sending, an OS-level lock blocks simultaneous runs and, when the outcome can't be confirmed, the state stays unknown and nothing is reprinted automatically. The Windows backend was validated against a real print queue in CI, but not yet on a physical printer.",
    result: "Testes com injeção de falhas • CI em Linux e Windows",
    resultEn: "Fault-injection tests • Linux and Windows CI",
    technologies: ["Python", "SQLite", "PowerShell", "ReportLab", "GitHub Actions"],
    repository: "https://github.com/sergiomeyer23/print-guard",
    areas: ["software"],
    flow: ["Relatório PDF", "Diário SQLite", "Impressão", "Job saiu da fila"],
    flowEn: ["PDF report", "SQLite journal", "Print", "Job left the queue"]
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
    areas: ["software"],
    flow: ["Texto livre", "LLM extrai", "Cálculo determinístico", "Diagnóstico"],
    flowEn: ["Free text", "LLM extracts", "Deterministic math", "Diagnosis"]
  },

  {
    title: "FalowAI",
    titleEn: "FalowAI",
    category: "Full-Stack & EdTech",
    categoryEn: "Full-Stack & EdTech",
    description:
      "Plataforma de aprendizado adaptativo de inglês com laboratório de pronúncia, dashboard de progresso e motor de gamificação. As regras anti-farming de XP são testadas no backend.",
    descriptionEn:
      "Adaptive English learning platform with a pronunciation lab, a progress dashboard and a gamification engine. The anti-farming XP rules are tested in the backend.",
    result: "Next.js no front • Spring Boot no back",
    resultEn: "Next.js frontend • Spring Boot backend",
    technologies: ["TypeScript", "Next.js", "Java", "Spring Boot"],
    repository: "https://github.com/sergiomeyer23/FalowAI",
    areas: ["software"],
    flow: ["Pronúncia", "Regras de XP", "Painel de progresso"],
    flowEn: ["Pronunciation", "XP rules", "Progress dashboard"]
  },

  {
    title: "WEG Equity Pipeline",
    titleEn: "WEG Equity Pipeline",
    category: "Data Engineering & Quantitative Finance",
    categoryEn: "Data Engineering & Quantitative Finance",
    description:
      "Pipeline ETL modular que extrai demonstrativos regulatórios da CVM e cotações do Yahoo Finance para a WEG (WEGE3.SA), calcula múltiplos fundamentalistas e roda valuation por Fluxo de Caixa Descontado (DCF). Publica um dashboard interativo e aceita execução determinística com --mock e --live.",
    descriptionEn:
      "Modular ETL pipeline that extracts regulatory statements from CVM and quotes from Yahoo Finance for WEG (WEGE3.SA), computes fundamental multiples and runs a Discounted Cash Flow (DCF) valuation. It publishes an interactive dashboard and supports deterministic runs with --mock and --live.",
    result: "ETL + DCF • Modos --mock e --live",
    resultEn: "ETL + DCF • --mock and --live modes",
    technologies: ["Python", "Pandas", "Streamlit", "Pytest", "GitHub Actions"],
    repository: "https://github.com/sergiomeyer23/weg_equity_pipeline",
    areas: ["data"],
    featured: true,
    flow: ["CVM + Yahoo Finance", "ETL", "Múltiplos + DCF", "Streamlit"],
    flowEn: ["CVM + Yahoo Finance", "ETL", "Multiples + DCF", "Streamlit"]
  },

  {
    title: "MotherML (Bayer-Group)",
    titleEn: "MotherML (Bayer-Group)",
    category: "Open Source & Machine Learning",
    categoryEn: "Open Source & Machine Learning",
    description:
      "Contribuições para o framework de Machine Learning em Python mantido pelo grupo Bayer, usado em predição de propriedades moleculares e dados de transcriptômica. O PR #91 implementa um registro unificado de modelos (CatBoost, Random Forest, Lasso, TabPFN e estimadores compatíveis com Scikit-Learn). O PR #106 agrupa compostos por scaffold de Murcko na validação cruzada, evitando vazamento de dados entre moléculas parecidas.",
    descriptionEn:
      "Contributions to the Python Machine Learning framework maintained by the Bayer group, used for molecular property prediction and transcriptomics data. PR #91 implements a unified model registry (CatBoost, Random Forest, Lasso, TabPFN and Scikit-Learn compatible estimators). PR #106 groups compounds by Murcko scaffold in cross-validation, preventing data leakage between similar molecules.",
    result: "PR #91 e PR #106 • Bayer-Group/MotherML",
    resultEn: "PR #91 and PR #106 • Bayer-Group/MotherML",
    technologies: ["Python", "Scikit-Learn", "CatBoost", "TabPFN", "Cross-validation"],
    repository: "https://github.com/Bayer-Group/MotherML",
    areas: ["oss", "data"],
    featured: true,
    flow: ["PR #91 Model Registry", "PR #106 Scaffold CV"]
  },

  {
    title: "Automação de Relatório de Vendas",
    titleEn: "Sales Report Automation",
    category: "Excel Automation & Data Quality",
    categoryEn: "Excel Automation & Data Quality",
    description:
      "Aplicação Java que lê planilhas de vendas, valida datas, quantidades e preços, filtra o mês de referência e gera um relatório Excel com resumo, vendas por produto e top 5. Linhas inválidas são reportadas em vez de contaminar os totais.",
    descriptionEn:
      "Java application that reads sales spreadsheets, validates dates, quantities and prices, filters the reference month and generates an Excel report with summary, sales by product and top 5. Invalid rows are reported instead of contaminating totals.",
    result: "3 abas • 13 testes • CI",
    resultEn: "3 tabs • 13 tests • CI",
    technologies: ["Java", "Apache POI", "Maven", "JUnit 5"],
    repository: "https://github.com/sergiomeyer23/automacao-planilha",
    areas: ["data", "software"],
    flow: ["Excel .xlsx", "Validação", "Relatório"],
    flowEn: ["Excel .xlsx", "Validation", "Report"]
  }
];

const services = [
  {
    icon: "ETL",
    title: "Data Pipelines & ETL",
    titleEn: "Data Pipelines & ETL",
    description:
      "Rotinas de extração, limpeza e organização de dados com testes e execução agendada, para reduzir trabalho manual e aumentar a confiabilidade.",
    descriptionEn:
      "Extraction, cleaning and data organization routines with tests and scheduled runs, to reduce manual work and increase reliability.",
    items: ["Python / Pandas", "SQL / PostgreSQL", "GitHub Actions"],
    itemsEn: ["Python / Pandas", "SQL / PostgreSQL", "GitHub Actions"]
  },

  {
    icon: "API",
    title: "Backend & APIs",
    titleEn: "Backend & APIs",
    description:
      "APIs REST em camadas, com validação, tratamento de erros e ambiente reproduzível em Docker, prontas para receber testes automatizados.",
    descriptionEn:
      "Layered REST APIs with validation, error handling and a reproducible Docker environment, ready for automated tests.",
    items: ["Java / Spring Boot", "PostgreSQL", "JUnit 5 / Docker Compose"],
    itemsEn: ["Java / Spring Boot", "PostgreSQL", "JUnit 5 / Docker Compose"]
  },

  {
    icon: "BI",
    title: "Analytics & Dashboards",
    titleEn: "Analytics & Dashboards",
    description:
      "Análises exploratórias, Pareto, segmentações e dashboards para acompanhar metas, cobertura, ruptura e performance comercial.",
    descriptionEn:
      "Exploratory analyses, Pareto, segmentation and dashboards to track targets, coverage, stockouts and commercial performance.",
    items: ["Power BI / Streamlit", "KPIs comerciais", "A/B Testing"],
    itemsEn: ["Power BI / Streamlit", "Commercial KPIs", "A/B Testing"]
  }
];

const caseStudies = [
  {
    title: "Olist Sales Performance Analysis",
    titleEn: "Olist Sales Performance Analysis",
    challenge:
      "Entender onde estavam concentrados os R$ 13,2M de faturamento e por que alguns vendedores entregavam pior do que outros — sem criar relatório manual todo mês.",
    challengeEn:
      "Understand where the BRL 13.2M in revenue was concentrated and why some sellers underperformed others — without rebuilding a manual report every month.",
    approach:
      "Pipeline de 9 CSVs com cache em Parquet, 20 funções de análise e dashboard Streamlit com 6 abas (sazonalidade, Pareto, frete, atraso, satisfação).",
    approachEn:
      "Pipeline over 9 CSVs with Parquet cache, 20 analysis functions and a 6-tab Streamlit dashboard (seasonality, Pareto, freight, delays, satisfaction).",
    result: "Base analítica reutilizável + Pareto visual por vendedor e categoria.",
    resultEn: "Reusable analytics base + visual Pareto by seller and category.",
    technologies: ["Python", "Pandas", "Plotly", "Streamlit"]
  },
  {
    title: "Mercavel — Comparador de Preços",
    titleEn: "Mercavel — Price Comparison",
    challenge:
      "Consumidor de Cascavel não tinha visibilidade clara de qual mercado era mais barato na semana; comparação manual era inviável.",
    challengeEn:
      "Shoppers in Cascavel had no clear view of which supermarket was cheaper this week; manual comparison was infeasible.",
    approach:
      "Web scraping automático nos sites dos mercados, armazenando data da coleta e link da oferta; dashboard com tabela por mercado, média por categoria e cesta comparada.",
    approachEn:
      "Automated web scraping of market websites storing collection date and offer link; dashboard with per-market table, category averages and compared basket.",
    result: "Comparação real e auditável entre múltiplos mercados.",
    resultEn: "Real, auditable comparison across multiple markets.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "Web Scraping"]
  },
  {
    title: "Mangos — Gestão de Caixa com IA",
    titleEn: "Mangos — Cash Management with AI",
    challenge:
      "Microempreendedores jovens perdiam receita por não controlar caixa nem precificar corretamente; digitar formulários não funcionava.",
    challengeEn:
      "Young micro-entrepreneurs lost money by not tracking cash or pricing correctly; form-based entry did not work.",
    approach:
      "Entrada em linguagem natural convertida em lançamentos estruturados; cálculos determinísticos testados (28 autotestes) com LLM restrito à extração/redação.",
    approachEn:
      "Natural-language input turned into structured entries; deterministic, tested calculations (28 self-tests) with the LLM limited to extraction/wording.",
    result: "Funciona offline mesmo sem IA e sugere preço por produto.",
    resultEn: "Works offline without AI and suggests a price per product.",
    technologies: ["JavaScript", "Google Gemini", "Chart.js", "localStorage"]
  },
  {
    title: "Print Guard: Impressão Agendada com Confirmação",
    titleEn: "Print Guard: Scheduled Printing with Confirmation",
    challenge:
      "Uma tarefa agendada que imprime um relatório pode terminar com sucesso enquanto nada sai da impressora: o job fica preso na fila ou o computador reinicia no meio do envio. Reimprimir às cegas gera cópias duplicadas, e não reimprimir perde o relatório.",
    challengeEn:
      "A scheduled task that prints a report can finish successfully while nothing comes out of the printer: the job gets stuck in the queue or the computer restarts mid-send. Reprinting blindly creates duplicates, and not reprinting loses the report.",
    approach:
      "Cada tentativa vai para um diário SQLite antes de chamar a impressora e um lock do sistema operacional impede duas execuções ao mesmo tempo. O dia só vira ok quando o job sai da fila. Se o resultado não pode ser confirmado, fica unknown e só uma pessoa decide reimprimir.",
    approachEn:
      "Each attempt goes into a SQLite journal before the printer is called, and an OS-level lock prevents two runs at once. The day only becomes ok when the job leaves the queue. If the outcome can't be confirmed it stays unknown and only a person decides whether to reprint.",
    result: "Falhas viram alertas em vez de silêncio. Testado com injeção de falhas e contra uma fila de impressão real do Windows no CI.",
    resultEn: "Failures become alerts instead of silence. Tested with fault injection and against a real Windows print queue in CI.",
    technologies: ["Python", "SQLite", "PowerShell", "GitHub Actions"]
  }
];


function readStoredLanguage() {
  try {
    return window.localStorage.getItem("portfolio-lang");
  } catch (error) {
    return null;
  }
}

function storeLanguage(language) {
  try {
    window.localStorage.setItem("portfolio-lang", language);
  } catch (error) {
    // localStorage pode estar bloqueado (modo privado ou política do navegador).
  }
}

function updateMenuButtonLabel() {
  const menuButton = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!menuButton || !mobileMenu) return;

  const key = mobileMenu.hidden ? "menuOpen" : "menuClose";
  menuButton.setAttribute("aria-label", copy[currentLanguage][key]);
  const icon = menuButton.querySelector(".menu-icon");
  if (icon) icon.textContent = mobileMenu.hidden ? "☰" : "×";
}

let currentLanguage = readStoredLanguage() || "br";
if (!copy[currentLanguage]) currentLanguage = "br";

// Tudo que vem de dados (projetos, skills, etc.) entra no DOM via template string,
// então escape para não quebrar markup nem permitir XSS.
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

let currentFilter = "all";

function applyProjectFilter(filter) {
  currentFilter = filter;

  document.querySelectorAll("#projects .project").forEach(card => {
    const areas = (card.dataset.areas || "").split(" ");
    card.hidden = !(filter === "all" || areas.includes(filter));
  });

  document.querySelectorAll("[data-filter]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
  });
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
      const areas = escapeHtml(project.areas.join(" "));
      const featured = project.featured ? " featured" : "";

      const flowSteps = currentLanguage === "en" && project.flowEn ? project.flowEn : project.flow;
      const flow = flowSteps
        .map(step => `<span>${escapeHtml(step)}</span>`)
        .join('<i class="arrow" aria-hidden="true">→</i>');

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
        <article class="project glass${featured}" data-areas="${areas}">
          <small>${category}</small>

          <h3>${title}</h3>

          <div class="flow">${flow}</div>

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

  applyProjectFilter(currentFilter);
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

function renderCases() {
  const container = document.getElementById("casesGrid");
  if (!container) return;

  const selectedCopy = copy[currentLanguage];

  container.innerHTML = caseStudies
    .map(item => {
      const title = escapeHtml(localized(item, "title"));
      const challenge = escapeHtml(localized(item, "challenge"));
      const approach = escapeHtml(localized(item, "approach"));
      const result = escapeHtml(localized(item, "result"));
      const tech = item.technologies
        .map(t => `<span>${escapeHtml(t)}</span>`)
        .join("");

      return `
        <article class="case glass">
          <h3>${title}</h3>

          <div class="case-block">
            <span class="case-label">${escapeHtml(selectedCopy.caseProblem)}</span>
            <p>${challenge}</p>
          </div>

          <div class="case-block">
            <span class="case-label">${escapeHtml(selectedCopy.caseApproach)}</span>
            <p>${approach}</p>
          </div>

          <div class="case-block">
            <span class="case-label">${escapeHtml(selectedCopy.caseResult)}</span>
            <p>${result}</p>
          </div>

          <div class="tags">${tech}</div>
        </article>
      `;
    })
    .join("");
}


function setLanguage(language) {
  if (!copy[language]) return;

  currentLanguage = language;
  storeLanguage(language);

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
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(element => {
      const key = element.dataset.i18nPlaceholder;

      if (selectedCopy[key]) {
        element.setAttribute("placeholder", selectedCopy[key]);
      }
    });

  document
    .querySelectorAll("[data-i18n-aria-label]")
    .forEach(element => {
      const key = element.dataset.i18nAriaLabel;

      if (selectedCopy[key]) {
        element.setAttribute("aria-label", selectedCopy[key]);
      }
    });

  document
    .querySelectorAll("[data-lang]")
    .forEach(button => {
      const selected = button.dataset.lang === language;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

  document.documentElement.lang =
    language === "br" ? "pt-BR" : "en";

  document.title = language === "br"
    ? "Sérgio Meyer | Data & Software Engineer — Python · SQL · Java"
    : "Sérgio Meyer | Data & Software Engineer — Python · SQL · Java";

  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.setAttribute("aria-label", selectedCopy.menuLabel);
  }

  renderProjects();
  renderServices();
  renderCases();
  updateMenuButtonLabel();

  document.querySelectorAll("[data-btnrepo]").forEach(element => {
    element.textContent = selectedCopy.viewRepo;
  });

  document.querySelectorAll("[data-btnlive]").forEach(element => {
    element.textContent = selectedCopy.viewDemo;
  });

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

  const mobileViewport = window.matchMedia("(max-width: 980px)");
  let focusWasInMenu = false;

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (mobileMenu.hidden) return;
    mobileMenu.hidden = true;
    focusWasInMenu = false;
    menuButton.setAttribute("aria-expanded", "false");
    updateMenuButtonLabel();
    if (restoreFocus && mobileViewport.matches) menuButton.focus();
  };

  const openMenu = () => {
    if (!mobileViewport.matches) return;
    mobileMenu.hidden = false;
    focusWasInMenu = mobileMenu.contains(document.activeElement) || document.activeElement === menuButton;
    menuButton.setAttribute("aria-expanded", "true");
    updateMenuButtonLabel();
  };

  menuButton.addEventListener("click", () => {
    if (mobileMenu.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("click", event => {
    if (!mobileMenu.hidden && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("focusin", event => {
    if (mobileMenu.hidden) return;
    focusWasInMenu = mobileMenu.contains(event.target) || menuButton.contains(event.target);
    if (!focusWasInMenu) closeMenu();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !mobileMenu.hidden) {
      const restoreFocus = mobileMenu.contains(document.activeElement) || document.activeElement === menuButton;
      closeMenu({ restoreFocus });
    }
  });

  const handleViewportChange = event => {
    if (event.matches || mobileMenu.hidden) return;
    // O navegador pode desfocar o menu assim que a media query o oculta.
    const hadFocus = focusWasInMenu || mobileMenu.contains(document.activeElement) || document.activeElement === menuButton;
    closeMenu();
    if (hadFocus) {
      const firstDesktopLink = document.querySelector(".nav-links a");
      if (firstDesktopLink) firstDesktopLink.focus({ preventScroll: true });
    }
  };

  if (mobileViewport.addEventListener) {
    mobileViewport.addEventListener("change", handleViewportChange);
  } else {
    mobileViewport.addListener(handleViewportChange);
  }
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

      const isEnglish = currentLanguage === "en";
      const subject =
        (isEnglish ? "Portfolio contact — " : "Contato pelo portfólio — ") + name;

      const body =
        message +
        (isEnglish ? "\n\nName: " : "\n\nNome: ") + name +
        (isEnglish ? "\nEmail: " : "\nE-mail: ") + email;

      window.location.href =
        "mailto:" + liveCopy.mailtoLink +
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
  const main = document.getElementById("home");
  const backBtn = document.createElement("button");
  backBtn.type = "button";
  backBtn.className = "back-to-top";
  backBtn.textContent = "↑";
  backBtn.hidden = true;
  backBtn.setAttribute("aria-label", copy[currentLanguage].backToTop);
  document.body.appendChild(backBtn);

  backBtn.addEventListener("click", () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (main) main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  const toggle = () => {
    const visible = window.scrollY > 320;
    if (!visible && document.activeElement === backBtn && main) main.focus({ preventScroll: true });
    backBtn.hidden = !visible;
    backBtn.classList.toggle("visible", visible);
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
}

function setupProjectFilters() {
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => applyProjectFilter(button.dataset.filter));
  });
}

// Luz que segue o cursor na borda dos cards. A posição vai para variáveis CSS.
function setupSpotlight() {
  const container = document.getElementById("projects");
  if (!container) return;

  container.addEventListener("pointermove", event => {
    const card = event.target.closest(".project");
    if (!card) return;
    const box = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - box.left}px`);
    card.style.setProperty("--my", `${event.clientY - box.top}px`);
  });
}

let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

function copyEmail() {
  const selectedCopy = copy[currentLanguage];
  const address = selectedCopy.mailtoLink;
  const clipboard = navigator.clipboard;

  if (!clipboard || !clipboard.writeText) {
    showToast(selectedCopy.toastEmailManual);
    return;
  }

  clipboard.writeText(address).then(
    () => showToast(selectedCopy.toastEmailCopied),
    () => showToast(selectedCopy.toastEmailManual)
  );
}

function downloadResume() {
  const link = document.createElement("a");
  link.href = "assets/curriculo-sergio-meyer.pdf";
  link.download = "";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function getCommands() {
  const c = copy[currentLanguage];
  return [
    { label: c.cmdProjects, run: () => scrollToSection("portfolio") },
    { label: c.cmdOss, run: () => scrollToSection("opensource") },
    { label: c.cmdCases, run: () => scrollToSection("cases") },
    { label: c.cmdContact, run: () => scrollToSection("contact") },
    { label: c.cmdFilterData, run: () => { applyProjectFilter("data"); scrollToSection("portfolio"); } },
    { label: c.cmdFilterSoftware, run: () => { applyProjectFilter("software"); scrollToSection("portfolio"); } },
    { label: c.cmdFilterOss, run: () => { applyProjectFilter("oss"); scrollToSection("portfolio"); } },
    { label: c.cmdFilterAll, run: () => { applyProjectFilter("all"); scrollToSection("portfolio"); } },
    { label: c.cmdLanguage, run: () => setLanguage(currentLanguage === "br" ? "en" : "br") },
    { label: c.cmdCopyEmail, run: copyEmail },
    { label: c.cmdCv, run: downloadResume }
  ];
}

function setupCommandPalette() {
  const root = document.getElementById("cmd");
  const input = document.getElementById("cmdInput");
  const list = document.getElementById("cmdList");
  const opener = document.getElementById("cmdOpen");
  if (!root || !input || !list) return;

  let visible = [];
  let returnFocus = null;

  const render = () => {
    const query = input.value.trim().toLowerCase();
    visible = getCommands().filter(command => command.label.toLowerCase().includes(query));

    list.innerHTML = visible.length
      ? visible
          .map((command, index) => `<li><button type="button" class="cmd-item" data-cmd="${index}">${escapeHtml(command.label)}</button></li>`)
          .join("")
      : `<li class="cmd-empty">${escapeHtml(copy[currentLanguage].cmdEmpty)}</li>`;
  };

  const open = () => {
    if (!root.hidden) return;
    returnFocus = document.activeElement;
    root.hidden = false;
    input.value = "";
    render();
    input.focus();
  };

  const close = () => {
    if (root.hidden) return;
    root.hidden = true;
    if (returnFocus && returnFocus.focus) returnFocus.focus();
  };

  const run = command => {
    close();
    if (command) command.run();
  };

  const items = () => Array.from(list.querySelectorAll(".cmd-item"));

  if (opener) opener.addEventListener("click", open);

  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (root.hidden) open(); else close();
      return;
    }

    if (root.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "Tab") {
      const focusable = [input, ...items()];
      const index = focusable.indexOf(document.activeElement);
      const next = event.shiftKey ? index - 1 : index + 1;
      event.preventDefault();
      focusable[(next + focusable.length) % focusable.length].focus();
    }
  });

  input.addEventListener("input", render);

  input.addEventListener("keydown", event => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const first = items()[0];
      if (first) first.focus();
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(visible[0]);
    }
  });

  list.addEventListener("keydown", event => {
    const buttons = items();
    const index = buttons.indexOf(document.activeElement);
    if (index === -1) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      buttons[Math.min(index + 1, buttons.length - 1)].focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (index === 0) input.focus(); else buttons[index - 1].focus();
    }
  });

  list.addEventListener("click", event => {
    const button = event.target.closest(".cmd-item");
    if (button) run(visible[Number(button.dataset.cmd)]);
  });

  root.addEventListener("mousedown", event => {
    if (event.target === root) close();
  });
}

renderSkills();
setLanguage(currentLanguage);

setupLanguageButtons();
setupProjectFilters();
setupSpotlight();
setupCommandPalette();
setupMobileMenu();
setupContactForm();
setupScrollSpy();
setupBackToTop();
