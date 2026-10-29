const { test, expect } = require("@playwright/test");

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

  await expect(page).toHaveTitle(/Sérgio Meyer \| Analista de Dados/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ANALISTA DE DADOS");
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

  const cv = await request.get("assets/curriculo-sergio-meyer.pdf");
  expect(cv.ok()).toBeTruthy();
  expect(cv.headers()["content-type"]).toContain("application/pdf");
});

test("troca o idioma e o mantém após recarregar", async ({ page }) => {
  await page.goto("./");

  await page.locator('.actions [data-lang="en"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle(/Sérgio Meyer \| Data Analyst/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("DATA ANALYST");
  await expect(page.locator("#projects [data-btnrepo]").first()).toHaveText("View repository");
  expect(await page.evaluate(() => localStorage.getItem("portfolio-lang"))).toBe("en");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("DATA ANALYST");

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

    await expect(page.getByRole("heading", { level: 1 })).toContainText("ANALISTA DE DADOS");
    await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
    await expect(page.locator("#contactForm")).toHaveAttribute("action", /^https:\/\/formsubmit\.co\//);
    await expect(page.locator("#contactForm")).toHaveAttribute("method", "POST");
  });
});
