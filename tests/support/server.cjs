const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const prefix = "/portfolio/";
const port = Number(process.env.PORTFOLIO_TEST_PORT || 4173);
const rootFiles = new Set(["index.html", "style.css", "script.js", "robots.txt", "sitemap.xml"]);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORTFOLIO_TEST_PORT deve ser uma porta válida.");
}

const server = http.createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (!pathname.startsWith(prefix)) {
      response.writeHead(404);
      response.end();
      return;
    }

    const relative = pathname.slice(prefix.length) || "index.html";
    if (!rootFiles.has(relative) && !relative.startsWith("assets/")) {
      response.writeHead(404);
      response.end();
      return;
    }

    const filename = path.resolve(root, relative);
    const realFilename = await fs.realpath(filename);
    const allowedDirectory = relative.startsWith("assets/") ? path.join(root, "assets") : root;
    if (!realFilename.startsWith(allowedDirectory + path.sep)) {
      response.writeHead(403);
      response.end();
      return;
    }

    const content = await fs.readFile(realFilename);
    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(realFilename).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" || error.code === "EISDIR" ? 404 : 400);
    response.end();
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Servidor de testes iniciado na porta ${port}.`);
});
