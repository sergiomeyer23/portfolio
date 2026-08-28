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
"Trade Marketing"
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
    viewRepo: "Ver repositório"
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
    viewRepo: "View repository"
}
};

const projects = [
{
    title: "Olist Sales Performance Analysis",
    category: "Customer & Seller Segmentation Model",
    description:
    "Pipeline analítico com limpeza de 9 CSVs, cache em Parquet, 20 funções de análise e dashboard Streamlit com 6 abas para investigar sazonalidade, Pareto, frete, atraso e satisfação.",
    result: "R$ 13,2M analisados • 96k pedidos",
    technologies: [
    "Python",
    "Pandas",
    "Plotly",
    "Streamlit",
    "PostgreSQL"
    ],
    repository:
    "https://github.com/sergiomeyer23/olist-sales-performance-analysis",
    bars: [72, 48, 86, 62, 95, 53, 78]
},

{
    title: "Retail Sales Analyzer",
    category: "Predictive Sales Analysis Foundation",
    description:
    "Script Python para leitura de vendas em CSV, estatísticas gerais, ranking de produtos, filtros por valor e tratamento robusto de erros — base para automações e modelos de previsão.",
    result: "Relatórios automatizados em CSV",
    technologies: [
    "Python",
    "CSV",
    "Data Quality",
    "Automation"
    ],
    repository:
    "https://github.com/sergiomeyer23/retail-sales-analyzer",
    bars: [42, 68, 51, 84, 58, 73, 66]
},

{
    title: "Excel Dashboard Vendas & Estoque",
    category: "Financial Dashboard & Operational KPIs",
    description:
    "Dashboard para identificar produtos sem estoque, lojas abaixo da meta e categorias mais rentáveis, conectando análise financeira, estoque e desempenho comercial.",
    result: "Metas • Estoque • Rentabilidade",
    technologies: [
    "Excel",
    "Power Query",
    "Dashboard",
    "KPIs"
    ],
    repository:
    "https://github.com/sergiomeyer23/excel-dashboard-vendas-estoque-",
    bars: [55, 77, 45, 89, 70, 64, 92]
},

{
    title: "Pandas Fundamentos — Lab 12/12",
    category: "Healthcare Data Insights Ready Stack",
    description:
    "Laboratório prático cobrindo ciclo integral de dados: leitura, limpeza, filtros, groupby, merge, datas e exportação. Base técnica para análises setoriais, incluindo saúde, varejo e finanças.",
    result: "12/12 exercícios concluídos",
    technologies: [
    "Python",
    "Pandas",
    "Data Cleaning",
    "EDA"
    ],
    repository:
    "https://github.com/sergiomeyer23/pandas-fundamentos",
    bars: [67, 44, 75, 88, 52, 81, 69]
}
];

const services = [
{
    icon: "📊",
    title: "Data Visualization & Dashboards",
    description:
    "Dashboards claros, responsivos e orientados à decisão para acompanhar metas, cobertura, sell-out, ruptura e performance.",
    items: [
    "Power BI / Excel",
    "KPIs comerciais",
    "Storytelling executivo"
    ]
},

{
    icon: "🧠",
    title: "Statistical Data Analysis",
    description:
    "Análises exploratórias, segmentações, Pareto, correlações e leitura de drivers para priorizar ações de alto impacto.",
    items: [
    "Python / Pandas",
    "A/B Testing",
    "Modelagem de hipóteses"
    ]
},

{
    icon: "⚙️",
    title: "ETL & Data Pipeline Design",
    description:
    "Rotinas de extração, limpeza e organização de dados para reduzir trabalho manual e aumentar confiabilidade operacional.",
    items: [
    "SQL / PostgreSQL",
    "Automação de relatórios",
    "Qualidade de dados"
    ]
}
];


function renderSkills() {
const container = document.getElementById("skills");

container.innerHTML = skills
    .map(skill => `<span class="skill">${skill}</span>`)
    .join("");
}


function renderProjects() {
const container = document.getElementById("projects");

container.innerHTML = projects
    .map(project => {
    const bars = project.bars
        .map(height => `<div class="bar" style="height: ${height}%"></div>`)
        .join("");

    const tags = project.technologies
        .map(technology => `<span>${technology}</span>`)
        .join("");

    return `
        <article class="project glass">
        <div class="dash">
            ${bars}
            <span class="kpi">Live KPI</span>
        </div>

        <div class="project-body">
            <small>${project.category}</small>

            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <span class="metric">
            ${project.result}
            </span>

            <div class="tags">
            ${tags}
            </div>

            <a
            class="btn btn-primary"
            href="${project.repository}"
            target="_blank"
            rel="noopener noreferrer"
            >
            <span data-btnrepo></span> ↗
            </a>
        </div>
        </article>
    `;
    })
    .join("");
}


function renderServices() {
const container = document.getElementById("servicesGrid");

container.innerHTML = services
    .map(service => {
    const items = service.items
        .map(item => `<li>✓ ${item}</li>`)
        .join("");

    return `
        <article class="service glass">
        <div class="service-icon">
            ${service.icon}
        </div>

        <h3>${service.title}</h3>

        <p>${service.description}</p>

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

document
    .querySelectorAll("[data-btnrepo]")
    .forEach(element => {
    element.textContent = selectedCopy.viewRepo;
    });

document.documentElement.lang =
    language === "br" ? "pt-BR" : "en";
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

menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
});

mobileMenu
    .querySelectorAll("a")
    .forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });
    });
}


function setupContactForm() {
const form = document.getElementById("contactForm");

form.addEventListener("submit", event => {
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

    const mailto =
    "mailto:sergio.gabriel.meyer10@gmail.com" +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

    window.location.href = mailto;
});
}


renderPage();
setLanguage("br");

setupLanguageButtons();
setupMobileMenu();
setupContactForm();