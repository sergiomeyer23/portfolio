# Sérgio Meyer — Data Analyst Portfolio

Personal portfolio website for Sérgio Meyer, focused on data analysis, business intelligence and commercial insights.

The portfolio brings together my projects, technical skills and professional experience in commercial analytics, retail and sales intelligence.

## About

I am a Data Analyst focused on turning operational data into clear and useful business decisions.

My background combines commercial experience with data analysis, allowing me to look at problems from both the technical and business perspectives.

I have experience working with commercial routines, sales performance, customer portfolios and retail operations.

Currently, I am developing my skills in:

- Python
- Pandas
- SQL
- PostgreSQL
- Power BI
- DAX
- Excel
- Power Query
- ETL
- Plotly
- Streamlit
- Data Visualization
- Statistical Analysis
- Data Storytelling
- TypeScript
- React
- Node.js
- Java / Spring Boot

## Featured Projects

### Olist Sales Performance Analysis

Analytical pipeline built around the Olist dataset.

The project includes data cleaning, Parquet caching, exploratory analysis and an interactive Streamlit dashboard.

Main topics analyzed:

- Sales performance
- Customer segmentation
- Seller performance
- Pareto analysis
- Freight
- Delivery delays
- Customer satisfaction
- Seasonality

**Technologies:** Python, Pandas, Plotly, Streamlit, PostgreSQL

[View repository](https://github.com/sergiomeyer23/olist-sales-performance-analysis)

---

### Retail Sales Analyzer

Python project focused on automating basic sales analysis from CSV files.

The application performs statistical summaries, product rankings, value-based filtering and error handling.

**Technologies:** Python, CSV, Data Quality, Automation

[View repository](https://github.com/sergiomeyer23/retail-sales-analyzer)

---

### Excel Dashboard — Sales & Inventory

Commercial dashboard designed to analyze sales performance, inventory and profitability.

The project focuses on identifying products without stock, stores below target and more profitable categories.

**Technologies:** Excel, Power Query, Dashboards, KPIs

[View repository](https://github.com/sergiomeyer23/excel-dashboard-vendas-estoque-)

---

### Pandas Fundamentals

Practical laboratory covering the main stages of a data analysis workflow.

Topics include:

- Data loading
- Data cleaning
- Filtering
- GroupBy
- Merge
- Date manipulation
- Data export
- Exploratory analysis

**Technologies:** Python, Pandas, Data Cleaning, EDA

[View repository](https://github.com/sergiomeyer23/pandas-fundamentos)

---

### Mercavel — Supermarket Price Comparison

Web platform that compares supermarket prices in Cascavel/PR using data collected automatically from the retailers' own websites.

Each price keeps the collection date and the offer link, and the site shows a price table per market, an average per category, a shopping basket compared across markets and an overview dashboard.

Main features:

- Price table per market (price, type, source, collection date and difference)
- Average price per category
- Comparison of a full shopping basket per market (R$ and % difference)
- Separation between online and in-store prices

**Technologies:** React, TypeScript, Vite, Tailwind, Web Scraping

[View repository](https://github.com/sergiomeyer23/Mercavel)

---

### Mangos — Cash Management with AI

Web application that helps young micro-entrepreneurs manage their cash flow using natural language input.

It accepts sentences such as `vendi 6 bolos a 12 e gastei 40 de ingrediente` and converts them into structured entries, consolidating revenue, expenses, result per product and a suggested selling price.

Architectural highlight: the language model is used only to extract structured data and to write explanations, while every numeric calculation runs in deterministic, tested JavaScript functions (28 self-tests). Without an API key, a rules-based extractor keeps the application fully functional offline.

Developed for the NAUFest Challenge 2026 (#AIForImpact, Junior Achievement Americas and HP).

**Technologies:** JavaScript, Google Gemini, Chart.js, SheetJS, localStorage

[Live demo](https://sergiomeyer23.github.io/Mangos/) · [View repository](https://github.com/sergiomeyer23/Mangos)

---

### Pipoca — WhatsApp Bot with LLM

WhatsApp bot with its own personality, built on `whatsapp-web.js` and an OpenAI-compatible LLM API.

Features include persisted sessions (no repeated QR scan), automatic model fallback when the primary one fails, the persona kept in a data file separately from the logic, and a test suite covering the pipeline and the router.

**Technologies:** Node.js, whatsapp-web.js, LLM APIs, Docker

[View repository](https://github.com/sergiomeyer23/pipoca)

---

### Personal Finance API

REST API for personal finance management, built with Java and Spring Boot.

Organised in entity, repository and controller layers, with a Maven Wrapper for reproducible builds and automated tests — the backend foundation behind data solutions that need their own reliable source.

**Technologies:** Java, Spring Boot, REST API, Maven

[View repository](https://github.com/sergiomeyer23/personal-finance-api)

## Technologies

### Data Analysis

Python  
Pandas  
SQL  
PostgreSQL  
Excel  
Power Query  

### Business Intelligence

Power BI  
DAX  
Data Visualization  
Data Storytelling  
Commercial KPIs  

### Data Applications

Plotly  
Streamlit  
ETL  
Data Quality  

### Data Products & Engineering

React  
TypeScript  
Node.js  
Java  
Spring Boot  
REST APIs  
Web Scraping  
Git  
GitHub  

## Portfolio

The website was built using vanilla web technologies:

- HTML5
- CSS3
- JavaScript

No frontend framework is required.

The site includes:

- Responsive layout
- Portuguese and English versions
- Project showcase
- Skills section
- Services section
- Contact form
- CV download
- Mobile navigation

### Project data

Projects, skills and services are defined as plain JavaScript arrays at the top of `script.js`. Adding a project means appending one object:

```js
{
  title: "Project name",
  category: "Short category line",
  description: "What the project does and why it matters.",
  result: "Key result or highlight",
  technologies: ["Python", "SQL"],
  repository: "https://github.com/sergiomeyer23/repo",
  live: "https://example.com",   // optional: renders a "View demo" button
  bars: [72, 48, 86, 62, 95, 53, 78]  // decorative bar chart heights
}
```

Bilingual strings live in the `copy` object under the `br` and `en` keys. Both must keep the same set of keys.

### Contact form

The form posts directly to [FormSubmit](https://formsubmit.co), which forwards each submission by email. There is no backend and no account: the destination address is the one in the `action` attribute of `#contactForm`.

**One-time activation:** the first submission triggers a confirmation email to that address. Nothing is delivered until the link in it is clicked. Once confirmed, FormSubmit returns a random string that can replace the plain address in the `action`, keeping it hidden from spam bots.

Fields used:

| Field | Purpose |
|---|---|
| `_subject` | Email subject line |
| `_template` | `table` renders the submission as a table |
| `_next` | Returns the visitor to `?enviado=1#contact` after sending |
| `_honey` | Honeypot; hidden by `.honey` in the CSS. If filled, the submission is silently dropped |

`script.js` reads the `action` attribute: if it is filled, the browser performs a native POST (works even with JavaScript disabled); if it is empty, the form falls back to opening the visitor's email app via `mailto:`.

### Link preview

The `<head>` of `index.html` carries Open Graph and Twitter Card tags so the portfolio renders a proper preview card when shared on LinkedIn, WhatsApp or X. The `og:url`, `og:image` and `canonical` values assume the site is served at `https://sergiomeyer23.github.io/portfolio/`. If you move it to a custom domain, update those three URLs.

## Structure

```text
portfolio/
│
├── assets/
│   ├── curriculo-sergio-meyer.pdf
│   └── sergio-open-to-work.jpg
│
├── index.html
├── style.css
├── script.js
└── README.md
```
