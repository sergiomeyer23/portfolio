const { defineConfig } = require("@playwright/test");

const port = Number(process.env.PORTFOLIO_TEST_PORT || 4173);
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 2,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${port}/portfolio/`,
    browserName: "chromium",
    viewport: { width: 1280, height: 800 },
    launchOptions: executablePath ? { executablePath } : {},
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  webServer: {
    command: "node tests/support/server.cjs",
    url: `http://127.0.0.1:${port}/portfolio/`,
    reuseExistingServer: false,
    timeout: 30_000
  }
});
