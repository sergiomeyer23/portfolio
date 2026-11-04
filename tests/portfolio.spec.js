const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test.beforeEach(async ({ page }, testInfo) => {
  const localOrigin = new URL(testInfo.project.use.baseURL).origin;

  // Nenhuma chamada externa é necessária para testar o portfólio.
  await page.route("**/*", async route => {
    const url = new URL(route.request().url());
    if (url.origin === localOrigin) {
      await route.continue();
    } else if (url.hostname === "formsubmit.co") {
      await route.fulfill({
        status: 200,
        contentType: "text/html; charset=utf-8",
        body: "<p>Envio simulado; nenhuma mensagem foi enviada.</p>"
      });
    } else {
      await route.abort();
    }
  });
});

test("renderiza o conteúdo principal e os links internos", async ({ page }) => {
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));

  await page.goto("./");

  await expect(page).toHaveTitle(/Sérgio Meyer \| Data & Software Engineer/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("DATA & SOFTWARE ENGINEER");
  await expect(page.locator("#projects article").first()).toBeVisible();
  await expect(page.locator("#projects").getByRole("heading", { name: "Olist Sales Performance Analysis" })).toBeVisible();
  await expect(page.locator("#casesGrid article").first()).toBeVisible();
  await expect(page.locator("#servicesGrid article").first()).toBeVisible();
  await expect(page.locator("#skills .skill").first()).toBeVisible();

  const missingTargets = await page.locator('a[href^="#"]').evaluateAll(links =>
    links.map(link => link.getAttribute("href"))
      .filter(href => href.length > 1 && !document.getElementById(href.slice(1)))
  );
  expect(missingTargets).toEqual([]);
  expect(pageErrors).toEqual([]);
});

for (const width of [320, 375, 768, 981, 1440]) {
  test(`mantém a proporção natural da foto Sobre em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./");

    const portrait = page.locator(".portrait-card img");
    await portrait.scrollIntoViewIfNeeded();
    await expect.poll(() => portrait.evaluate(image => image.naturalWidth)).toBe(1024);

    const dimensions = await portrait.evaluate(image => {
      const rect = image.getBoundingClientRect();
      const style = getComputedStyle(image);
      return {
        width: rect.width,
        height: rect.height,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        objectFit: style.objectFit,
        objectPosition: style.objectPosition
      };
    });

    expect(dimensions.naturalHeight).toBe(1003);
    expect(dimensions.width).toBeGreaterThan(0);
    expect(dimensions.height).toBeGreaterThan(0);
    const renderedRatio = dimensions.width / dimensions.height;
    const naturalRatio = dimensions.naturalWidth / dimensions.naturalHeight;
    expect(Math.abs(renderedRatio / naturalRatio - 1)).toBeLessThan(0.01);
    expect(dimensions.objectFit).toBe("cover");
    expect(dimensions.objectPosition).toBe("50% 35%");
  });
}

test("os projetos apontam para repositórios HTTPS e o currículo está disponível", async ({ page, request }) => {
  await page.goto("./");

  const repositoryLinks = page.locator("#projects .project-actions a:has([data-btnrepo])");
  expect(await repositoryLinks.count()).toBeGreaterThan(0);
  for (const link of await repositoryLinks.all()) {
    await expect(link).toHaveAttribute("href", /^https:\/\/github\.com\//);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  }

  for (const version of ["data", "software"]) {
    const cv = await request.get(`assets/curriculo-sergio-meyer-${version}.pdf`);
    expect(cv.ok()).toBeTruthy();
    expect(cv.headers()["content-type"]).toContain("application/pdf");
  }

  const preview = await request.get("assets/og-image.png");
  expect(preview.ok()).toBeTruthy();
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /assets\/og-image\.png$/);
});

test("o menu de currículo oferece as duas versões e fecha com Esc", async ({ page }) => {
  await page.goto("./");
  const menu = page.locator(".hero .cv-menu");
  const links = menu.locator("a");

  await expect(links.first()).toBeHidden();
  await menu.locator("summary").click();
  await expect(links).toHaveCount(2);
  await expect(links.nth(0)).toHaveAttribute("href", "assets/curriculo-sergio-meyer-data.pdf");
  await expect(links.nth(1)).toHaveAttribute("href", "assets/curriculo-sergio-meyer-software.pdf");

  await page.keyboard.press("Escape");
  await expect(links.first()).toBeHidden();
  await expect(menu.locator("summary")).toBeFocused();

  await page.locator('.actions [data-lang="en"]').click();
  await menu.locator("summary").click();
  await expect(links.nth(0)).toContainText("Data & Analytics (PDF)");
});

test("os cards mostram o badge de CI e o Expense Tracker cita Flyway, Swagger e Actuator", async ({ page }) => {
  await page.goto("./");
  const card = page.locator("#projects article", { hasText: "Expense Tracker API" });

  await expect(card).toHaveCount(1);
  await expect(card).toContainText("Flyway");
  await expect(card).toContainText("Swagger");
  await expect(card).toContainText("Actuator");
  await expect(card.locator("img.ci-badge")).toHaveAttribute("src", /expense-tracker-api\/actions\/workflows\/ci\.yml\/badge\.svg$/);
  await expect(card.locator("img.ci-badge")).toHaveAttribute("alt", /Status do CI/);
  await expect(page.locator("#projects img.ci-badge").first()).toBeAttached();
});

test("a lista de projetos tem os destaques de engenharia e não tem exercícios básicos", async ({ page }) => {
  await page.goto("./");
  const projects = page.locator("#projects");

  for (const name of ["Mercavel", "WEG Equity Pipeline", "MotherML", "Expense Tracker API", "FalowAI"]) {
    await expect(projects.getByRole("heading", { name: new RegExp(name) })).toHaveCount(1);
  }
  await expect(projects.getByRole("heading", { name: /Pandas Fundamentos/ })).toHaveCount(0);
  await expect(projects.getByRole("heading", { name: /Retail Sales Analyzer/ })).toHaveCount(0);
  await expect(page.locator("#opensource a[href='https://github.com/Bayer-Group/MotherML']")).toHaveCount(2);
  await expect(page.locator("#opensource")).toContainText("PR #91");
  await expect(page.locator("#opensource")).toContainText("PR #106");
});

test("os filtros por área reorganizam o grid e sobrevivem à troca de idioma", async ({ page }) => {
  await page.goto("./");
  const cards = page.locator("#projects article:visible");
  const total = await cards.count();
  expect(total).toBeGreaterThan(5);

  await page.getByRole("button", { name: "Open Source", exact: true }).click();
  await expect(page.getByRole("button", { name: "Open Source", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText("MotherML");

  await page.locator('.actions [data-lang="en"]').click();
  await expect(cards).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Open Source", exact: true })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Software & Backend" }).click();
  await expect(cards.first()).toBeVisible();
  for (const card of await cards.all()) {
    const areas = await card.getAttribute("data-areas");
    expect(areas.split(" ")).toContain("software");
  }

  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(cards).toHaveCount(total);
});

test("a paleta de comandos abre com Ctrl+K, filtra, executa e devolve o foco", async ({ page }) => {
  await page.goto("./");
  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeHidden();
  await page.locator("#cmdOpen").focus();
  await page.keyboard.press("Control+K");
  await expect(dialog).toBeVisible();
  await expect(page.locator("#cmdInput")).toBeFocused();

  await page.keyboard.type("filtrar projetos: data");
  await expect(page.locator("#cmdList .cmd-item")).toHaveCount(1);
  await page.keyboard.press("Enter");
  await expect(dialog).toBeHidden();
  await expect(page.locator("#cmdOpen")).toBeFocused();
  await expect(page.getByRole("button", { name: "Data & Analytics", exact: true })).toHaveAttribute("aria-pressed", "true");

  await page.keyboard.press("Control+K");
  await page.keyboard.type("zzzz");
  await expect(page.locator("#cmdList")).toContainText("Nenhum comando encontrado.");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("a paleta de comandos troca o idioma", async ({ page }) => {
  await page.goto("./");
  await page.locator("#cmdOpen").click();
  await page.getByRole("button", { name: "Mudar idioma para English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("o card do Print Guard aparece nos dois idiomas com o repositório correto", async ({ page }) => {
  await page.goto("./");

  const card = page.locator("#projects article", { hasText: "Print Guard" });
  await expect(card).toHaveCount(1);
  await expect(card.locator("[data-btnrepo]").locator("xpath=ancestor::a")).toHaveAttribute(
    "href",
    "https://github.com/sergiomeyer23/print-guard"
  );
  await expect(card).toContainText("Testes com injeção de falhas");

  await page.locator('.actions [data-lang="en"]').click();
  await expect(card).toContainText("Fault-injection tests");
  await expect(card).toContainText("Scheduled Printing with Confirmation");
  await expect(page.locator("#casesGrid article", { hasText: "Print Guard" })).toHaveCount(1);
});

test("troca o idioma e o mantém após recarregar", async ({ page }) => {
  await page.goto("./");

  await expect(page.locator('.actions [data-lang="br"]')).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('.actions [data-lang="en"]')).toHaveAttribute("aria-pressed", "false");
  await page.locator('.actions [data-lang="en"]').click();
  await expect(page.locator('.actions [data-lang="br"]')).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator('.actions [data-lang="en"]')).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".actions .lang")).toHaveAccessibleName("Language");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle(/Sérgio Meyer \| Data & Software Engineer/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("DATA & SOFTWARE ENGINEER");
  await expect(page.locator("#projects [data-btnrepo]").first()).toHaveText("View repository");
  expect(await page.evaluate(() => localStorage.getItem("portfolio-lang"))).toBe("en");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("DATA & SOFTWARE ENGINEER");

  await page.locator('.actions [data-lang="br"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator("#projects [data-btnrepo]").first()).toHaveText("Ver repositório");
});

test("continua funcionando quando o armazenamento está indisponível", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Armazenamento indisponível no teste");
      }
    });
  });

  await page.goto("./");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator("#projects article").first()).toBeVisible();
  await page.locator('.actions [data-lang="en"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("ignora um idioma salvo que não existe", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("portfolio-lang", "es"));
  await page.goto("./");

  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator("#projects [data-btnrepo]").first()).toHaveText("Ver repositório");
});

test("valida o contato e envia apenas para o serviço simulado", async ({ page }) => {
  await page.goto("./");
  const form = page.locator("#contactForm");
  const submit = form.getByRole("button", { name: "Enviar mensagem" });

  expect(await form.evaluate(element => element.checkValidity())).toBe(false);
  await form.locator('input[name="name"]').fill("Pessoa de teste");
  await form.locator('input[name="email"]').fill("teste@example.com");
  await form.locator('textarea[name="message"]').fill("Mensagem simulada para os testes.");
  expect(await form.evaluate(element => element.checkValidity())).toBe(true);

  const submission = page.waitForRequest(request =>
    request.url().startsWith("https://formsubmit.co/") && request.method() === "POST"
  );
  await submit.click();
  const sentRequest = await submission;
  const fields = new URLSearchParams(sentRequest.postData());

  expect(fields.get("name")).toBe("Pessoa de teste");
  expect(fields.get("email")).toBe("teste@example.com");
  expect(fields.get("message")).toBe("Mensagem simulada para os testes.");
  await expect(page.getByText("Envio simulado; nenhuma mensagem foi enviada.")).toBeVisible();
});

test("o atalho para o conteúdo transfere o foco ao conteúdo principal", async ({ page }) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#home")).toBeFocused();
  await page.keyboard.press("Tab");
  const firstAction = page.locator(".hero .btn-primary");
  await expect(firstAction).toBeFocused();
  expect(await firstAction.evaluate(element => element.matches(":focus-visible"))).toBe(true);
  expect(await firstAction.evaluate(element => parseFloat(getComputedStyle(element).outlineWidth))).toBeGreaterThanOrEqual(2);
});

test("o botão voltar ao topo só recebe foco quando visível", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const button = page.locator(".back-to-top");

  await expect(button).toBeHidden();
  await expect(button).toHaveAttribute("hidden", "");
  await page.keyboard.press("Tab");
  await page.evaluate(() => window.scrollTo(0, 900));
  await expect(button).toBeVisible();
  await button.focus();
  await expect(button).toBeFocused();
  expect(await button.evaluate(element => element.matches(":focus-visible"))).toBe(true);
  await page.keyboard.press("Enter");
  await expect(page.locator("main#home")).toBeFocused();
  await expect(button).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("preserva o foco ao ocultar o botão por rolagem", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await page.evaluate(() => window.scrollTo(0, 900));
  const button = page.locator(".back-to-top");
  await expect(button).toBeVisible();
  await button.focus();
  await expect(button).toBeFocused();
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(button).toBeHidden();
  await expect(page.locator("main#home")).toBeFocused();
});

for (const width of [320, 1440]) {
  test(`o botão de voltar ao topo não cobre os links do rodapé em ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 720 });
    await page.goto("./");
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    const button = page.locator(".back-to-top");
    await expect(button).toBeVisible();
    const buttonBox = await button.boundingBox();

    for (const name of ["GitHub", "LinkedIn", "E-mail"]) {
      const link = page.locator("footer").getByRole("link", { name, exact: true });
      await expect(link).toBeVisible();
      const linkBox = await link.boundingBox();
      const overlap = linkBox.x < buttonBox.x + buttonBox.width &&
        linkBox.x + linkBox.width > buttonBox.x &&
        linkBox.y < buttonBox.y + buttonBox.height &&
        linkBox.y + linkBox.height > buttonBox.y;
      expect(overlap, `${name} não deve ficar coberto pelo botão`).toBe(false);
    }
  });
}

const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const scenario of [
  "desktop em português com botão destacado",
  "desktop em inglês com botão destacado",
  "mobile em português com menu aberto",
  "mobile em inglês com menu aberto"
]) {
  test(`não apresenta violações automáticas WCAG em ${scenario}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const isMobile = scenario.startsWith("mobile");
    const isEnglish = scenario.includes("inglês");
    if (isMobile) await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("./");
    if (isMobile) {
      await page.locator("#menuBtn").click();
      if (isEnglish) await page.locator('#mobileMenu [data-lang="en"]').click();
    } else {
      if (isEnglish) await page.locator('.actions [data-lang="en"]').click();
      await page.locator(".hero .btn-primary").hover();
    }

    const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
    const violations = results.violations.map(violation => ({
      id: violation.id,
      targets: violation.nodes.map(node => node.target)
    }));
    expect(violations).toEqual([]);
  });
}

test.describe("em telas móveis", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("abre e fecha o menu pelo teclado e pelos links", async ({ page }) => {
    await page.goto("./");
    const button = page.locator("#menuBtn");
    const menu = page.locator("#mobileMenu");

    await expect(button).toHaveAccessibleName("Abrir menu");
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(button).toHaveAccessibleName("Fechar menu");
    await expect(button.locator(".menu-icon")).toHaveText("×");
    await expect(menu).toBeVisible();
    await expect(menu).toHaveRole("navigation");
    await expect(button).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(menu.getByRole("link", { name: "Início" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button.locator(".menu-icon")).toHaveText("☰");
    await expect(button).toBeFocused();

    await button.click();
    await menu.getByRole("link", { name: "Projetos" }).click();
    await expect(page).toHaveURL(/#portfolio$/);
    await expect(menu).toBeHidden();
    await expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("traduz os nomes acessíveis do menu", async ({ page }) => {
    await page.goto("./");
    const button = page.locator("#menuBtn");
    const menu = page.locator("#mobileMenu");

    await button.click();
    await menu.getByRole("button", { name: "EN" }).click();
    await expect(menu.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
    await expect(menu.getByRole("button", { name: "BR" })).toHaveAttribute("aria-pressed", "false");
    await expect(menu.locator(".mobile-lang")).toHaveAccessibleName("Language");
    await expect(page.locator("header nav")).toHaveAccessibleName("Main navigation");
    await expect(menu).toHaveAccessibleName("Navigation menu");
    await expect(button).toHaveAccessibleName("Close menu");

    await page.keyboard.press("Escape");
    await expect(button).toBeFocused();
    await expect(button).toHaveAccessibleName("Open menu");
  });

  test("fecha o menu ao clicar fora", async ({ page }) => {
    await page.goto("./");
    await page.locator("#menuBtn").click();
    await expect(page.locator("#mobileMenu")).toBeVisible();
    await page.locator("header .logo").click();
    await expect(page.locator("#mobileMenu")).toBeHidden();
  });

  test("fecha ao sair com Tab sem prender o foco", async ({ page }) => {
    await page.goto("./");
    const button = page.locator("#menuBtn");
    const menu = page.locator("#mobileMenu");

    await button.click();
    await menu.getByRole("button", { name: "EN" }).focus();
    await page.keyboard.press("Tab");

    await expect(menu).toBeHidden();
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByRole("link", { name: "VEJA MEUS PROJETOS" })).toBeFocused();
  });

  test("fecha ao mudar para o layout de desktop", async ({ page }) => {
    await page.goto("./");
    const button = page.locator("#menuBtn");
    const menu = page.locator("#mobileMenu");

    await button.click();
    await menu.getByRole("link", { name: "Sobre" }).focus();
    await page.setViewportSize({ width: 981, height: 900 });

    await expect(menu).toBeHidden();
    await expect(menu).toHaveAttribute("hidden", "");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator(".nav-links a").first()).toBeFocused();

    await page.setViewportSize({ width: 375, height: 812 });
    await expect(menu).toBeHidden();
  });

  test("permite alcançar todo o menu em uma tela de pouca altura", async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 320 });
    await page.goto("./");
    await page.locator("#menuBtn").click();
    const menu = page.locator("#mobileMenu");
    const lastButton = menu.getByRole("button", { name: "EN" });

    await expect(menu).toBeVisible();
    const menuBox = await menu.boundingBox();
    expect(menuBox.y + menuBox.height).toBeLessThanOrEqual(320);
    expect(await menu.evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true);

    await lastButton.focus();
    const buttonBox = await lastButton.boundingBox();
    expect(buttonBox.y).toBeGreaterThanOrEqual(menuBox.y);
    expect(buttonBox.y + buttonBox.height).toBeLessThanOrEqual(menuBox.y + menuBox.height + 1);
  });
});

test.describe("sem JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("mantém o contato direto e o formulário disponíveis", async ({ page }) => {
    await page.goto("./");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("DATA & SOFTWARE ENGINEER");
    await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
    await expect(page.locator("#contactForm")).toHaveAttribute("action", /^https:\/\/formsubmit\.co\//);
    await expect(page.locator("#contactForm")).toHaveAttribute("method", "POST");
  });
});

test.describe("vitrine de engenharia", () => {
  test("a barra de telemetria mostra números verificáveis do próprio site", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");

    const values = page.locator("#telemetryRoot .tele-value");
    await expect(values).toHaveCount(4);
    await expect(values.nth(0)).toHaveText("96K");
    await expect(values.nth(1)).toHaveText("4");
    await expect(values.nth(3)).toHaveText("2");
  });

  test("o nó do DAG abre o painel com contratos, falhas e orçamento, e Esc devolve o foco", async ({ page }) => {
    await page.goto("./");

    const node = page.locator('#dagRoot [data-node="process"]');
    await node.scrollIntoViewIfNeeded();
    await node.focus();
    await page.keyboard.press("Enter");

    const panel = page.locator("#dagPanel");
    await expect(panel).toBeVisible();
    await expect(panel.getByRole("heading", { name: /Processamento & Transformação/ })).toBeFocused();
    await expect(panel).toContainText("Schema Arrow");
    await expect(panel).toContainText("Idempotência por event_id");
    await expect(panel).toContainText("≤ 120 ms");
    await expect(node).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(node).toBeFocused();
  });

  test("o fluxo animado do DAG só roda enquanto o diagrama está visível", async ({ page }) => {
    await page.goto("./");

    const root = page.locator("#dagRoot");
    await root.scrollIntoViewIfNeeded();
    await expect(root).toHaveClass(/is-live/);

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(root).not.toHaveClass(/is-live/);
  });

  test("o painel do DAG cabe no mobile sem rolagem horizontal", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("./");

    await page.locator('#dagRoot [data-node="ingest"]').click();
    const panel = page.locator("#dagPanel");
    await expect(panel).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("o ADR viewer expande e recolhe os registros", async ({ page }) => {
    await page.goto("./");

    const first = page.locator("#adrRoot .adr-trigger").first();
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", "false");

    const third = page.locator("#adrRoot .adr-trigger", { hasText: "ADR-003" });
    await third.click();
    await expect(page.locator("#adrRoot .adr-panel:visible")).toContainText("Project Loom");
    await expect(page.locator("#adrRoot .adr-panel:visible")).toContainText("Exemplo de referência");
  });

  test("o simulador de benchmark reage aos controles e troca as abas de código", async ({ page }) => {
    await page.goto("./");

    const volume = page.locator("#benchVolume");
    await volume.scrollIntoViewIfNeeded();
    await volume.fill("3");
    await expect(page.locator("#benchVolumeOut")).toHaveText("1 bilhão");

    await page.locator("#benchMode").fill("0");
    await expect(page.locator("#benchModeOut")).toHaveText("Núcleo único");
    await expect(page.locator("#benchResults")).toContainText("Mais rápido neste cenário");
    await expect(page.locator("#benchResults")).toContainText("MB");

    await page.getByRole("tab", { name: "SQL · DuckDB" }).click();
    await expect(page.locator("#benchPanel-sql")).toBeVisible();
    await expect(page.locator("#benchPanel-sql")).toContainText("read_csv");
    await expect(page.locator("#benchPanel-java")).toBeHidden();
  });

  test("a vitrine acompanha a troca de idioma", async ({ page }) => {
    await page.goto("./");
    await page.locator('.actions [data-lang="en"]').click();

    await expect(page.locator("#dagRoot h3")).toHaveText("Pipeline topology");
    await expect(page.locator("#adrRoot h3")).toHaveText("Architecture decision records");
    await expect(page.locator("#benchVolumeOut")).toHaveText("100 million");
  });

  test.describe("terminal", () => {
    test("abre com a crase, executa comandos e mantém o histórico na sessão", async ({ page }) => {
      await page.goto("./");

      await page.keyboard.press("`");
      const terminal = page.locator("#term");
      await expect(terminal).toBeVisible();
      await expect(page.locator("#termInput")).toBeFocused();

      await page.locator("#termInput").fill("tech-stack");
      await page.keyboard.press("Enter");
      await expect(page.locator("#termOut")).toContainText('"languages"');
      await expect(page.locator("#termOut")).toContainText('"name": "Java"');

      await page.locator("#termInput").fill("clear");
      await page.keyboard.press("Enter");
      await expect(page.locator("#termOut .term-line")).toHaveCount(0);

      await page.locator("#termInput").fill("help");
      await page.keyboard.press("Enter");
      await expect(page.locator("#termOut")).toContainText("pipeline --status");

      await page.reload();
      await page.locator(".term-toggle").click();
      await expect(page.locator("#termOut")).toContainText("pipeline --status");

      await page.keyboard.press("ArrowUp");
      await expect(page.locator("#termInput")).toHaveValue("help");
    });

    test("query filtra a tabela experiencia e informa erros de SQL", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto("./");
      await page.locator(".term-toggle").click();

      await page.locator("#termInput").fill("query SELECT periodo, cargo FROM experiencia WHERE tecnologia LIKE '%Java%';");
      await page.keyboard.press("Enter");
      await expect(page.locator("#termOut")).toContainText("Expense Tracker API");
      await expect(page.locator("#termOut")).toContainText("(1 linha)");

      await page.locator("#termInput").fill("query SELECT salario FROM experiencia;");
      await page.keyboard.press("Enter");
      await expect(page.locator("#termOut")).toContainText('column "salario" does not exist');

      await page.locator("#termInput").fill("pipeline --status");
      await page.keyboard.press("Enter");
      await expect(page.locator("#termOut")).toContainText("orçamentos de projeto");

      await page.locator("#termInput").fill("comando-inexistente");
      await page.keyboard.press("Enter");
      await expect(page.locator("#termOut")).toContainText("comando não encontrado");
    });

    test("download cv dispara o PDF do currículo", async ({ page }) => {
      await page.goto("./");
      await page.locator(".term-toggle").click();

      const downloadPromise = page.waitForEvent("download");
      await page.locator("#termInput").fill("download cv data");
      await page.keyboard.press("Enter");
      const download = await downloadPromise;
      expect(download.suggestedFilename()).toContain("curriculo-sergio-meyer-data");
    });

    test("a crase não abre o terminal enquanto o foco está em um campo de texto", async ({ page }) => {
      await page.goto("./");

      const name = page.locator('#contactForm input[name="name"]');
      await name.scrollIntoViewIfNeeded();
      await name.focus();
      await page.keyboard.type("a`b");

      await expect(name).toHaveValue("a`b");
      await expect(page.locator("#term")).toBeHidden();
    });

    test("Ctrl+K continua abrindo a paleta e Esc fecha o terminal devolvendo o foco", async ({ page }) => {
      await page.goto("./");

      await page.keyboard.press("Control+k");
      await expect(page.locator("#cmd")).toBeVisible();
      await expect(page.locator("#term")).toBeHidden();
      await page.keyboard.press("Escape");

      const toggle = page.locator(".term-toggle");
      await toggle.focus();
      await page.keyboard.press("Enter");
      await expect(page.locator("#term")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator("#term")).toBeHidden();
      await expect(toggle).toBeFocused();
    });

    test("a paleta de comandos oferece abrir o terminal", async ({ page }) => {
      await page.goto("./");
      await page.keyboard.press("Control+k");
      await page.locator("#cmdInput").fill("terminal");
      await page.keyboard.press("Enter");
      await expect(page.locator("#term")).toBeVisible();
    });
  });

  for (const scenario of ["terminal aberto", "painel do DAG aberto"]) {
    test(`não apresenta violações WCAG com ${scenario}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("./");

      if (scenario === "terminal aberto") {
        await page.locator(".term-toggle").click();
      } else {
        await page.locator('#dagRoot [data-node="store"]').click();
      }

      const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
      expect(results.violations.map(violation => ({ id: violation.id, targets: violation.nodes.map(node => node.target) }))).toEqual([]);
    });
  }
});
