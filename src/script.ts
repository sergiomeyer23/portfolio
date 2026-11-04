import { caseStudies, copy, projects, services, skills } from "./data";
import type { CaseStudy, Lang, Project, ProjectArea, Service } from "./types";

function readStoredLanguage() {
  try {
    return window.localStorage.getItem("portfolio-lang");
  } catch (error) {
    return null;
  }
}

function storeLanguage(language: Lang): void {
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
  const icon = menuButton.querySelector<HTMLElement>(".menu-icon");
  if (icon) icon.textContent = mobileMenu.hidden ? "☰" : "×";
}

function isLang(value: string | null): value is Lang {
  return value === "br" || value === "en";
}

const storedLanguage = readStoredLanguage();
let currentLanguage: Lang = isLang(storedLanguage) ? storedLanguage : "br";

// Tudo que vem de dados (projetos, skills, etc.) entra no DOM via template string,
// então escape para não quebrar markup nem permitir XSS.
function escapeHtml(value: unknown): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function localized(item: Project | Service | CaseStudy, field: string): string {
  const record = item as unknown as Record<string, unknown>;
  if (currentLanguage === "en") {
    const english = record[`${field}En`];
    if (typeof english === "string" && english) return english;
  }
  return String(record[field] ?? "");
}

function renderSkills(): void {
  const container = document.getElementById("skills");
  if (!container) return;
  container.innerHTML = skills
    .map(skill => `<span class="skill">${escapeHtml(skill)}</span>`)
    .join("");
}

type Filter = "all" | ProjectArea;

let currentFilter: Filter = "all";

function applyProjectFilter(filter: Filter): void {
  currentFilter = filter;

  document.querySelectorAll<HTMLElement>("#projects .project").forEach(card => {
    const areas = (card.dataset.areas || "").split(" ");
    card.hidden = !(filter === "all" || areas.includes(filter));
  });

  document.querySelectorAll<HTMLElement>("[data-filter]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
  });
}

function renderProjects(): void {
  const container = document.getElementById("projects");
  if (!container) return;
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
      const badge = project.ci
        ? `<img class="ci-badge" src="${escapeHtml(project.ci)}" alt="${escapeHtml(selectedCopy.ciAlt)}: ${title}" height="20" loading="lazy" decoding="async">`
        : "";

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

          ${badge}

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
  document.querySelectorAll<HTMLElement>("[data-btnrepo]").forEach(element => {
    element.textContent = selectedCopy.viewRepo;
  });
  document.querySelectorAll<HTMLElement>("[data-btnlive]").forEach(element => {
    element.textContent = selectedCopy.viewDemo;
  });

  applyProjectFilter(currentFilter);
}

function renderServices() {
  const container = document.getElementById("servicesGrid");
  if (!container) return;

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


function setLanguage(language: string): void {
  if (!isLang(language)) return;

  currentLanguage = language;
  storeLanguage(language);

  const selectedCopy = copy[language];

  document
    .querySelectorAll<HTMLElement>("[data-i18n]")
    .forEach(element => {
      const key = element.dataset.i18n ?? "";

      if (selectedCopy[key]) {
        element.textContent = selectedCopy[key];
      }
    });

  document
    .querySelectorAll<HTMLElement>("[data-i18n-placeholder]")
    .forEach(element => {
      const key = element.dataset.i18nPlaceholder ?? "";

      if (selectedCopy[key]) {
        element.setAttribute("placeholder", selectedCopy[key]);
      }
    });

  document
    .querySelectorAll<HTMLElement>("[data-i18n-aria-label]")
    .forEach(element => {
      const key = element.dataset.i18nAriaLabel ?? "";

      if (selectedCopy[key]) {
        element.setAttribute("aria-label", selectedCopy[key]);
      }
    });

  document
    .querySelectorAll<HTMLElement>("[data-lang]")
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

  document.querySelectorAll<HTMLElement>("[data-btnrepo]").forEach(element => {
    element.textContent = selectedCopy.viewRepo;
  });

  document.querySelectorAll<HTMLElement>("[data-btnlive]").forEach(element => {
    element.textContent = selectedCopy.viewDemo;
  });

  const backBtn = document.querySelector<HTMLElement>(".back-to-top");
  if (backBtn) backBtn.setAttribute("aria-label", selectedCopy.backToTop);

  document.dispatchEvent(new CustomEvent("portfolio:languagechange", { detail: { language } }));
}

function setupLanguageButtons() {
  document
    .querySelectorAll<HTMLElement>("[data-lang]")
    .forEach(button => {
      button.addEventListener("click", () => {
        setLanguage(button.dataset.lang ?? "");
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

  mobileMenu.querySelectorAll<HTMLElement>("a").forEach(link => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("click", event => {
    if (!mobileMenu.hidden && !mobileMenu.contains(event.target as Node) && !menuButton.contains(event.target as Node)) {
      closeMenu();
    }
  });

  document.addEventListener("focusin", event => {
    if (mobileMenu.hidden) return;
    focusWasInMenu = mobileMenu.contains(event.target as Node) || menuButton.contains(event.target as Node);
    if (!focusWasInMenu) closeMenu();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !mobileMenu.hidden) {
      const restoreFocus = mobileMenu.contains(document.activeElement) || document.activeElement === menuButton;
      closeMenu({ restoreFocus });
    }
  });

  const handleViewportChange = (event: MediaQueryListEvent): void => {
    if (event.matches || mobileMenu.hidden) return;
    // O navegador pode desfocar o menu assim que a media query o oculta.
    const hadFocus = focusWasInMenu || mobileMenu.contains(document.activeElement) || document.activeElement === menuButton;
    closeMenu();
    if (hadFocus) {
      const firstDesktopLink = document.querySelector<HTMLElement>(".nav-links a");
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
  const form = document.getElementById("contactForm") as HTMLFormElement | null;
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

    const button = form.querySelector<HTMLButtonElement>("button[type='submit']");

    if (button) {
      button.disabled = true;
    }

    if (status) {
      status.textContent = liveCopy.formSending;
    }
  });
}

function setupScrollSpy() {
  const links = Array.from(document.querySelectorAll<HTMLElement>(".nav-links a[href^='#']"));
  if (!links.length) return;

  const targets = links
    .map(link => {
      const id = link.getAttribute("href");
      const section = id ? document.querySelector<HTMLElement>(id) : null;
      return section ? { link, section } : null;
    })
    .filter((target): target is { link: HTMLElement; section: HTMLElement } => target !== null);

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

// Menus de currículo: fecham ao clicar fora, ao escolher uma opção e com Esc.
function setupResumeMenus() {
  const menus = Array.from(document.querySelectorAll<HTMLDetailsElement>(".cv-menu"));

  const closeAll = (except: HTMLDetailsElement): void => {
    menus.forEach(menu => {
      if (menu !== except) menu.open = false;
    });
  };

  menus.forEach(menu => {
    menu.addEventListener("toggle", () => {
      if (menu.open) closeAll(menu);
    });
    menu.querySelectorAll<HTMLElement>("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.open = false;
      });
    });
  });

  document.addEventListener("click", event => {
    menus.forEach(menu => {
      if (menu.open && !menu.contains(event.target as Node)) menu.open = false;
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    menus.forEach(menu => {
      if (!menu.open) return;
      const hadFocus = menu.contains(document.activeElement);
      menu.open = false;
      if (hadFocus) menu.querySelector<HTMLElement>("summary")?.focus();
    });
  });
}

function setupProjectFilters() {
  document.querySelectorAll<HTMLElement>("[data-filter]").forEach(button => {
    button.addEventListener("click", () => applyProjectFilter(button.dataset.filter as Filter));
  });
}

// Luz que segue o cursor na borda dos cards. A posição vai para variáveis CSS.
function setupSpotlight() {
  const container = document.getElementById("projects");
  if (!container) return;

  container.addEventListener("pointermove", event => {
    const card = (event.target as HTMLElement).closest<HTMLElement>(".project");
    if (!card) return;
    const box = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - box.left}px`);
    card.style.setProperty("--my", `${event.clientY - box.top}px`);
  });
}

let toastTimer: number | undefined;

function showToast(message: string): void {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

function scrollToSection(id: string): void {
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

function downloadResume(version: string): void {
  const link = document.createElement("a");
  link.href = `assets/curriculo-sergio-meyer-${version}.pdf`;
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
    { label: c.cmdCvData, run: () => downloadResume("data") },
    { label: c.cmdCvSoftware, run: () => downloadResume("software") },
    { label: c.cmdTerminal, run: () => document.dispatchEvent(new CustomEvent("portfolio:toggle-terminal")) }
  ];
}

interface Command {
  label: string;
  run: () => void;
}

function setupCommandPalette(): void {
  const root = document.getElementById("cmd");
  const input = document.getElementById("cmdInput") as HTMLInputElement | null;
  const list = document.getElementById("cmdList");
  const opener = document.getElementById("cmdOpen");
  if (!root || !input || !list) return;

  let visible: Command[] = [];
  let returnFocus: Element | null = null;

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
    if (returnFocus instanceof HTMLElement) returnFocus.focus();
  };

  const run = (command: Command | undefined): void => {
    close();
    if (command) command.run();
  };

  const items = () => Array.from(list.querySelectorAll<HTMLElement>(".cmd-item"));

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
      const focusable: HTMLElement[] = [input, ...items()];
      const index = focusable.indexOf(document.activeElement as HTMLElement);
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
    const index = buttons.indexOf(document.activeElement as HTMLElement);
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
    const button = (event.target as HTMLElement).closest<HTMLElement>(".cmd-item");
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
setupResumeMenus();
setupSpotlight();
setupCommandPalette();
setupMobileMenu();
setupContactForm();
setupScrollSpy();
setupBackToTop();

// Superfície pública para engineering.js e terminal.js (sem acoplamento por variáveis globais soltas).
window.portfolio = {
  getLanguage: () => currentLanguage,
  projects,
  skills,
  escapeHtml,
  downloadResume,
  showToast
};
