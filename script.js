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
    mailtoLink: "sergio.gabriel.meyer10@gmail.com",
    emailBtn: "Enviar e-mail",
    formSuccess:
    "Mensagem enviada! Obrigado pelo contato — respondo em breve.",
    formFallback:
    "Seu navegador abriu seu programa de e-mail com a mensagem pronta. Se nada aconteceu, escreva direto para sergio.gabriel.meyer10@gmail.com"
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
    mailtoLink: "sergio.gabriel.meyer10@gmail.com",
    emailBtn: "Send email",
    formSuccess:
    "Message sent! Thanks for reaching out — I will reply shortly.",
    formFallback:
    "Your browser opened your email app with the message ready to send. If nothing happened, write directly to sergio.gabriel.meyer10@gmail.com"
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
},

{
    title: "Mercavel — Comparador de Preços",
    category: "Web Scraping & Retail Price Intelligence",
    description:
    "Plataforma web que compara preços de supermercados de Cascavel/PR a partir de dados coletados automaticamente nos sites dos mercados. Traz tabela de preços por mercado, média por categoria, cesta de compras comparada e dashboard geral — cada preço guarda a data da coleta e o link da oferta.",
    result: "Preços reais • Múltiplos mercados • Cesta comparada",
    technologies: [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind",
    "Web Scraping"
    ],
    repository:
    "https://github.com/sergiomeyer23/Mercavel",
    bars: [81, 56, 93, 64, 72, 88, 60]
},

{
    title: "Mangos — Gestão de Caixa com IA",
    category: "AI for Impact • Natural Language to Structured Data",
    description:
    "Aplicação web de gestão de caixa para jovens microempreendedores: aceita frases como “vendi 6 bolos a 12 e gastei 40 de ingrediente” e converte em lançamentos estruturados, com resultado por produto, sugestão de preço e diagnóstico em linguagem simples. Todo cálculo roda em funções determinísticas testadas (28 autotestes), com o LLM restrito à extração e à redação. Projeto do NAUFest Challenge 2026 (#AIForImpact).",
    result: "28 autotestes • Funciona offline sem IA",
    technologies: [
    "JavaScript",
    "Google Gemini",
    "Chart.js",
    "localStorage",
    "SheetJS"
    ],
    repository:
    "https://github.com/sergiomeyer23/Mangos",
    live:
    "https://sergiomeyer23.github.io/Mangos/",
    bars: [76, 91, 58, 83, 69, 95, 54]
},

{
    title: "Pipoca — Bot de WhatsApp com LLM",
    category: "Conversational AI & Automation",
    description:
    "Bot de WhatsApp com personalidade própria, construído sobre whatsapp-web.js e API compatível com OpenAI. Sessão persistida por QR Code, fallback automático de modelo, persona separada da lógica em arquivo de dados e suíte de testes de pipeline e roteamento.",
    result: "v0.2 • Fallback de modelo • Testes automatizados",
    technologies: [
    "Node.js",
    "whatsapp-web.js",
    "LLM APIs",
    "Docker"
    ],
    repository:
    "https://github.com/sergiomeyer23/pipoca",
    bars: [63, 85, 71, 49, 90, 66, 79]
},

{
    title: "Personal Finance API",
    category: "Backend Engineering & REST API Design",
    description:
    "API REST em Java e Spring Boot para gestão de finanças pessoais, com camadas de entidade, repositório e controller, Maven Wrapper para build reprodutível e testes automatizados — a base de backend por trás de soluções de dados que precisam de fonte própria e confiável.",
    result: "Java 17 • Spring Boot • Maven",
    technologies: [
    "Java",
    "Spring Boot",
    "REST API",
    "Maven"
    ],
    repository:
    "https://github.com/sergiomeyer23/personal-finance-api",
    bars: [58, 74, 87, 61, 79, 55, 84]
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

    const liveButton = project.live
        ? `
            <a
            class="btn btn-ghost"
            href="${project.live}"
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
            <small>${project.category}</small>

            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <span class="metric">
            ${project.result}
            </span>

            <div class="tags">
            ${tags}
            </div>

            <div class="project-actions">
            <a
            class="btn btn-primary"
            href="${project.repository}"
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

document
    .querySelectorAll("[data-btnlive]")
    .forEach(element => {
    element.textContent = selectedCopy.viewDemo;
    });

document
    .querySelectorAll("[data-i18n-href]")
    .forEach(element => {
    const key = element.dataset.i18nHref;

    if (selectedCopy[key]) {
        element.setAttribute(
            "href",
            "mailto:" + selectedCopy[key]
        );
    }
    });

document
    .querySelectorAll("[data-lang]")
    .forEach(button => {
    button.setAttribute(
        "aria-pressed",
        String(button.dataset.lang === language)
    );
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
    const isOpen = mobileMenu.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
});

mobileMenu
    .querySelectorAll("a")
    .forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    });
    });
}


/* Para receber as mensagens no seu e-mail sem abrir o programa de
   e-mail do visitante, crie um formulario gratis em https://formspree.io
   e cole a URL abaixo. Enquanto estiver vazia, o site usa o mailto:. */

const FORM_ENDPOINT = "";


function setupContactForm() {
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

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
    "mailto:" + copy.br.mailtoLink +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

    if (!FORM_ENDPOINT) {
        window.location.href = mailto;

        if (status) {
            status.textContent =
                copy[document.documentElement.lang === "en" ? "en" : "br"].formFallback;
        }

        return;
    }

    const button = form.querySelector("button[type='submit']");

    if (button) {
        button.disabled = true;
    }

    if (status) {
        status.textContent = "Enviando...";
    }

    fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Falha no envio");
            }

            form.reset();

            if (status) {
                status.textContent =
                    copy[document.documentElement.lang === "en" ? "en" : "br"].formSuccess;
            }
        })
        .catch(() => {
            window.location.href = mailto;

            if (status) {
                status.textContent =
                    copy[document.documentElement.lang === "en" ? "en" : "br"].formFallback;
            }
        })
        .finally(() => {
            if (button) {
                button.disabled = false;
            }
        });
});
}


renderPage();
setLanguage("br");

setupLanguageButtons();
setupMobileMenu();
setupContactForm();