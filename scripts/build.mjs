import fs from "node:fs/promises";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
export const escape = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const md = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, lang) {
    return lang && hljs.getLanguage(lang)
      ? hljs.highlight(code, { language: lang }).value
      : escape(code);
  },
});
md.renderer.rules.heading_open = (tokens, i, options, env, self) => {
  const title = tokens[i + 1].content;
  const base =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "section";
  env.ids ??= new Map();
  const count = env.ids.get(base) || 0;
  env.ids.set(base, count + 1);
  const id = (env.prefix || "") + (count ? `${base}-${count}` : base);
  tokens[i].attrSet("id", id);
  if (tokens[i].tag === "h2") env.headings.push({ id, title });
  return self.renderToken(tokens, i, options);
};
export function render(content, prefix = "") {
  const env = { headings: [], prefix };
  return { html: md.render(content, env), headings: env.headings };
}
const read = async (file, prefix = "") => {
  const { data, content } = matter(await fs.readFile(file, "utf8"));
  return { ...data, content, ...render(content, prefix) };
};
const profile = await read("content/pages/profile.md");
const sections = await Promise.all(
  ["about", "experience", "skills", "education"].map(async (id) => ({
    id,
    ...(await read(`content/pages/${id}.md`, `${id}-`)),
  })),
);
const projects = [];
const slugs = new Set(["404", "images", "styles", "project"]);
for (const file of (await fs.readdir("content/projects")).filter((f) =>
  f.endsWith(".md"),
)) {
  const p = await read(`content/projects/${file}`);
  if (p.draft === true) continue;
  const slug = p.slug || file.slice(0, -3);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slugs.has(slug))
    throw Error(`Invalid or duplicate project slug: ${slug}`);
  if (
    typeof p.title !== "string" ||
    !p.title.trim() ||
    typeof p.summary !== "string" ||
    !p.summary.trim()
  )
    throw Error(`${file}: title and summary are required`);
  if (
    p.tags &&
    (!Array.isArray(p.tags) || p.tags.some((t) => typeof t !== "string"))
  )
    throw Error(`${file}: tags must be a list of strings`);
  if (p.repository && !/^https?:\/\//.test(p.repository))
    throw Error(`${file}: repository must be an HTTP(S) URL`);
  if (p.cover) {
    if (!p.cover.startsWith("/images/"))
      throw Error(`${file}: cover must start with /images/`);
    await fs.access(`public${decodeURIComponent(p.cover)}`);
  }
  slugs.add(slug);
  projects.push({ ...p, slug });
}
projects.sort(
  (a, b) =>
    (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title),
);
const tags = (p) =>
  `<div class="tags">${(p.tags || []).map((t) => `<span>${escape(t)}</span>`).join("")}</div>`;
const links = `<a href="${escape(profile.github)}">GitHub ↗</a><a href="${escape(profile.linkedin)}">LinkedIn ↗</a><a href="mailto:${escape(profile.email)}">Email ↗</a>`;
function layout(title, description, body, url = "/", image = profile.portrait) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} · ${escape(profile.shortName)}</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="${profile.site}${url}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:image" content="${profile.site}${escape(image)}"><meta property="og:type" content="website"><link rel="icon" href="/favicon.png"><link rel="stylesheet" href="/styles/site.css"><link rel="stylesheet" href="/styles/code.css"></head><body><a class="skip" href="#main">Skip to content</a><header class="header wrap"><a class="brand" href="/" aria-label="${escape(profile.name)} home"><span class="monogram">cr<span>.</span></span><span>${escape(profile.shortName)}</span></a><nav aria-label="Main navigation"><a href="/#projects">Projects</a><a href="/#skills">Skills</a><a href="/#experience">Experience</a><a href="/#education">Education</a></nav></header><main id="main">${body}</main><footer class="wrap"><div><strong>${escape(profile.name)}</strong><p>${escape(profile.role)} · ${escape(profile.location)}</p></div><div class="social">${links}</div><small>© ${new Date().getFullYear()} ${escape(profile.shortName)}</small></footer></body></html>`;
}
const cards = projects
  .map(
    (p, i) =>
      `<article class="project-card"><a href="/${p.slug}/" class="card-image" aria-label="Read ${escape(p.title)}">${p.cover ? `<img src="${escape(p.cover)}" alt="${escape(p.title)}" loading="lazy">` : `<span class="fallback">${String(i + 1).padStart(2, "0")} / ${escape(p.category || "Project")}</span>`}<span class="image-arrow" aria-hidden="true">↗</span></a><div class="card-body"><div class="card-meta"><span>${escape(p.category || "Project")}</span><span>${String(i + 1).padStart(2, "0")}</span></div><h3><a href="/${p.slug}/">${escape(p.title)}</a></h3><p>${escape(p.summary)}</p>${tags(p)}<a class="text-link" href="/${p.slug}/">Read case study <span>↗</span></a></div></article>`,
  )
  .join("");
// Skill headings and comma-separated entries remain editable in Markdown.
const skillContent = sections.find(section => section.id === "skills");
const skillGroups = skillContent.content.split(/^### /m).slice(1).map(group => {
  const [title, ...lines] = group.trim().split("\n");
  return { title, items: lines.join(" ").split(/,(?![^()]*\))/).map(item => item.trim()).filter(Boolean) };
});
const skillCards = skillGroups.map(group => `<article class="skill-card"><h3>${escape(group.title)}</h3><ul>${group.items.map(item => `<li>${escape(item)}</li>`).join("")}</ul></article>`).join("");
function backgroundSection(id) {
  const section = sections.find(section => section.id === id);
  return `<section id="${section.id}" class="wrap profile-section"><div class="section-label"><h2>${escape(section.title)}</h2></div><div class="prose">${section.html}</div></section>`;
}
const home = `
<section id="profile" class="hero wrap">
  <figure class="portrait"><img src="${escape(profile.portrait)}" alt="${escape(profile.name)}" fetchpriority="high"><figcaption><strong>${escape(profile.name)}</strong><span>${escape(profile.location)}</span></figcaption></figure>
  <div class="hero-copy">
    <p class="hello">${escape(profile.name)}</p>
    <h1>${escape(profile.headline)}</h1>
    <div class="intro">${profile.html}</div>
    <ul class="featured-skills" aria-label="Key skills">${(profile.featuredSkills || []).map(skill => `<li>${escape(skill)}</li>`).join("")}</ul>
    <div class="actions"><a class="button" href="${escape(profile.resume)}" target="_blank" rel="noopener noreferrer" aria-label="View Resume (opens in a new tab)">View Resume <span aria-hidden="true">↗</span></a><a class="button button-secondary" href="#projects">Explore projects ↓</a></div>
  </div>
</section>
<section id="basic-info" class="wrap quick-facts" aria-label="Career at a glance">${(profile.quickFacts || []).map(fact => `<div><span>${escape(fact.label)}</span><strong>${escape(fact.value)}</strong><p>${escape(fact.detail)}</p></div>`).join("")}</section>
<nav class="section-nav" aria-label="Portfolio sections"><div class="wrap"><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#education">Education</a></div></nav>
${backgroundSection("about")}
<section id="skills" class="wrap skills-section"><div class="section-heading"><div><p class="eyebrow">Technical toolkit</p><h2>Skills at a glance.</h2></div><a class="text-link" href="#projects">See them in practice ↓</a></div><div class="skill-grid">${skillCards}</div></section>
<section id="projects" class="work"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Selected work</p><h2>Projects & case studies.</h2></div><span class="count">${String(projects.length).padStart(2, "0")} projects</span></div><div class="project-grid">${cards || "<p>Project case studies are coming soon.</p>"}</div></div></section>
${backgroundSection("experience")}
${backgroundSection("education")}`;
await fs.rm("dist", { recursive: true, force: true });
await fs.mkdir("dist/styles", { recursive: true });
await fs.cp("public", "dist", { recursive: true });
await fs.copyFile("styles/site.css", "dist/styles/site.css");
await fs.copyFile(
  "node_modules/highlight.js/styles/github-dark.css",
  "dist/styles/code.css",
);
await fs.writeFile(
  "dist/index.html",
  layout("Portfolio", profile.content.trim(), home),
);
for (const p of projects) {
  const body = `<div class="wrap project-header"><a class="text-link" href="/#projects">← All projects</a><p class="eyebrow">${escape(p.category || "Case study")}</p><h1>${escape(p.title)}</h1><p class="project-summary">${escape(p.summary)}</p>${tags(p)}${p.repository ? `<a class="button" href="${escape(p.repository)}">View repository ↗</a>` : ""}</div>${p.cover ? `<div class="wrap project-cover"><img src="${escape(p.cover)}" alt="${escape(p.title)}"></div>` : ""}<div class="wrap article-layout"><aside><nav aria-label="On this page"><p class="eyebrow">On this page</p>${p.headings.map((h) => `<a href="#${h.id}">${escape(h.title)}</a>`).join("")}</nav></aside><article class="prose article">${p.html}<a class="text-link back" href="/#projects">← Back to all projects</a></article></div>`;
  await fs.mkdir(`dist/${p.slug}`, { recursive: true });
  await fs.writeFile(
    `dist/${p.slug}/index.html`,
    layout(p.title, p.summary, body, `/${p.slug}/`, p.cover),
  );
}
await fs.writeFile(
  "dist/404.html",
  layout(
    "Page not found",
    "This page could not be found.",
    '<section class="wrap closing"><p class="eyebrow">404</p><h1>Page not found.</h1><p>Try the portfolio to find your project.</p><a class="button" href="/">Back to home</a></section>',
  ),
);
if (projects.some((p) => p.slug === "aps-failure-classification")) {
  await fs.mkdir("dist/project/aps-failure", { recursive: true });
  await fs.writeFile(
    "dist/project/aps-failure/index.html",
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>APS Failure Classification</title><meta http-equiv="refresh" content="0;url=/aps-failure-classification/"><link rel="canonical" href="' +
      profile.site +
      '/aps-failure-classification/"></head><body><a href="/aps-failure-classification/">Continue to APS Failure Classification</a></body></html>',
  );
}
await fs.writeFile("dist/.nojekyll", "");
await fs.writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", ...projects.map((p) => `/${p.slug}/`)].map((url) => `<url><loc>${profile.site}${url}</loc></url>`).join("")}</urlset>`,
);
await fs.writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${profile.site}/sitemap.xml\n`,
);
console.log(`Built homepage and ${projects.length} project pages.`);
