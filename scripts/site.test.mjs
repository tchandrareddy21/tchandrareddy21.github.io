import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
const build = () =>
  execFileSync(process.execPath, ["scripts/build.mjs"], { stdio: "pipe" });
async function htmlFiles(dir) {
  let files = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await htmlFiles(p)));
    else if (p.endsWith(".html")) files.push(p);
  }
  return files;
}
test("published HTML has valid local asset, page, and anchor links", async () => {
  build();
  for (const file of await htmlFiles("dist")) {
    const html = await fs.readFile(file, "utf8");
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length, `${file}: duplicate section IDs`);
    assert.match(html, /<h1|http-equiv="refresh"/);
    for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (!url.startsWith("/") && !url.startsWith("#")) continue;
      const [pathname, anchor] = url.split("#");
      let target = pathname
        ? path.join("dist", decodeURIComponent(pathname))
        : file;
      const stat = await fs.stat(target);
      if (stat.isDirectory()) target = path.join(target, "index.html");
      await fs.access(target);
      if (anchor) {
        const text = await fs.readFile(target, "utf8");
        assert.ok(text.includes(`id="${anchor}"`), `${file}: missing ${url}`);
      }
    }
  }
});
test("new Markdown creates a card and highlighted detail page; drafts disappear; invalid metadata fails", async () => {
  const fixture = "content/projects/zz-test-project.md";
  try {
    await fs.writeFile(
      fixture,
      '---\ntitle: Test project\nsummary: Test summary\n---\n## Results\n\n```python\nprint("hello")\n```\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n',
    );
    build();
    assert.match(
      await fs.readFile("dist/index.html", "utf8"),
      /href="\/zz-test-project\/"/,
    );
    const html = await fs.readFile("dist/zz-test-project/index.html", "utf8");
    assert.match(html, /hljs-/);
    assert.match(html, /<table>/);
    assert.match(html, /id="results"/);
    await fs.writeFile(
      fixture,
      "---\ntitle: Draft\nsummary: Hidden\ndraft: true\n---\n",
    );
    build();
    await assert.rejects(fs.access("dist/zz-test-project/index.html"));
    assert.doesNotMatch(
      await fs.readFile("dist/index.html", "utf8"),
      /zz-test-project/,
    );
    await fs.writeFile(fixture, "---\ntitle: Broken\n---\n");
    assert.throws(build);
  } finally {
    await fs.rm(fixture, { force: true });
    build();
  }
});
