# Chandra Reddy — Markdown portfolio

A static portfolio for https://tchandrareddy21.github.io. Content lives in Markdown; the build generates HTML pages and a project listing. No browser framework or backend server is required on GitHub Pages.

## Preview locally

Use Node.js 24 (22 or newer supported).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321. After an edit, run `npm run build` and refresh the browser. Stop the preview with Ctrl+C.

## Add a project

1. Copy `templates/project.md` to `content/projects/my-project.md`.
2. Edit the YAML metadata between the `---` lines. `title` and `summary` are required; `tags`, `category`, `cover`, `repository`, `order`, and `slug` are optional.
3. Write the case study below the metadata. Use `##` headings, paragraphs, lists, tables, and fenced Python code blocks. Code is displayed with highlighting, not executed.
4. Put images in `public/images/my-project/`. Embed them with `![Descriptive alternative text](/images/my-project/result.png)`. Use URL-encoded spaces or simple hyphenated filenames.
5. Set `draft: false` (or remove it) when ready. Drafts are excluded from the website. The template is a draft by default.
6. Run `npm run build` and `npm test`. Commit and push to `main` to trigger GitHub Pages deployment.

The filename produces `/my-project/`. An optional `slug: my-custom-name` overrides it. Use lowercase letters, numbers, and hyphens. Lower `order` values appear first; ties sort by title. You do not edit any card or routing code when adding a project.

## Edit your profile

- `content/pages/profile.md`: name, role, headline, introduction, portrait, contact links, résumé, site URL, `featuredSkills` badges, and `quickFacts` overview cards.
- `content/pages/about.md`: biography and focus areas.
- `content/pages/experience.md`: work history and achievements.
- `content/pages/skills.md`: toolkit. Each `### Category` heading followed by comma-separated skills becomes a group of badges.
- `content/pages/education.md`: education.

## Source structure

- `content/`: all portfolio and project content.
- `templates/project.md`: reusable authoring template.
- `public/images/`: images used by the published content.
- `styles/site.css`: responsive visual design.
- `scripts/build.mjs`: Markdown rendering, shared layouts, project discovery, metadata, sitemap, and old APS URL redirect.
- `scripts/serve.mjs`: local static preview.
- `scripts/site.test.mjs`: generated link checks and content lifecycle tests.
- `.github/workflows/deploy.yml`: install, build, test, and publish to GitHub Pages.
- `dist/`: generated output, excluded from Git.

Raw HTML in Markdown is disabled. Standard Markdown links, images, tables, and code blocks are supported. All published pages contain their full content as HTML and work without JavaScript. The design uses system fonts and makes no external font requests.

## GitHub Pages

In repository Settings → Pages, choose **GitHub Actions** as the source. Pushes to `main` run the workflow; it can also be run manually. Each project generates a real directory with `index.html`, so direct visits and refreshes work. The previous `/project/aps-failure` address redirects to `/aps-failure-classification/`.

The existing biography and project claims were migrated from the prior source, not independently verified. The financial project had no numerical evaluation results; none were invented. The APS figures retain their original context and can be updated in Markdown.
