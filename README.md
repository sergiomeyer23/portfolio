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

**Technologies:** Python, Pandas, Plotly, Streamlit, Pytest

[View repository](https://github.com/sergiomeyer23/olist-sales-performance-analysis)

---

### Retail Sales Analyzer

Python project focused on automating basic sales analysis from CSV files.

The application performs statistical summaries, product rankings, value-based filtering and error handling.

**Technologies:** Python, CSV, Data Quality, Automation

[View repository](https://github.com/sergiomeyer23/retail-sales-analyzer)

---

### Sales Report Automation

Java application that reads raw sales spreadsheets, validates dates, quantities and prices, filters a reference month and generates an Excel report with three tabs: summary, sales by product and top 5 products.

Invalid rows are reported instead of silently contaminating totals, and the project includes JUnit 5 tests plus a GitHub Actions workflow.

**Technologies:** Java, Apache POI, Maven, JUnit 5

[View repository](https://github.com/sergiomeyer23/automacao-planilha)

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
- Case studies section
- Skills section
- Services section
- Contact form
- CV download
- Mobile navigation

### Local development and checks

The website itself does not need a build or runtime dependencies. For the development checks, use Node.js 22.22 or newer in the 22.x line, or Node.js 24.8 or newer, and npm:

```bash
npm ci
npx playwright install chromium
npm run check
```

`npm run check` runs the HTML, CSS and JavaScript checks plus the browser tests, including automated axe-core accessibility checks. These checks do not replace manual keyboard and screen-reader testing. Use `npm run lint` or `npm test` to run either part separately. The tests use a local server and intercept FormSubmit requests, so they never send a real message. If port 4173 is occupied, set `PORTFOLIO_TEST_PORT` to another port before running the tests. To use a compatible system Chromium instead of the Playwright download, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable.

To serve the site locally, run `python3 -m http.server 8000` and open `http://localhost:8000`.

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
