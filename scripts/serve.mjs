import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
execFileSync(process.execPath, ["scripts/build.mjs"], { stdio: "inherit" });
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
const root = path.resolve("dist");
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let file = path.resolve(root, "." + pathname);
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403);
        return res.end();
      }
      try {
        if ((await fs.stat(file)).isDirectory())
          file = path.join(file, "index.html");
      } catch {
        res.statusCode = 404;
        file = path.join(root, "404.html");
      }
      res.setHeader(
        "Content-Type",
        types[path.extname(file)] || "application/octet-stream",
      );
      res.end(await fs.readFile(file));
    } catch {
      res.writeHead(400);
      res.end("Bad request");
    }
  })
  .listen(4321, "127.0.0.1", () =>
    console.log(
      "Local: http://127.0.0.1:4321 — run npm run build after content edits.",
    ),
  );
