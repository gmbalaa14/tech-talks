# tech-talks

Internal tech talks, one folder per topic, one home page on top.

- Home page: `https://gmbalaa14.github.io/tech-talks/`
- A topic's guide: `https://gmbalaa14.github.io/tech-talks/<slug>/` (for example `/mcp/`)
- A topic's slides: `https://gmbalaa14.github.io/tech-talks/<slug>/slides/`

Each topic is self-contained, so you can change and deploy one without touching the others.

## Layout

```
tech-talks/
├─ portal/                 Home page. Lists every topic with its icon, read from topics/*/topic.json
├─ topics/
│  └─ mcp/                 One topic. Everything about it lives here
│     ├─ topic.json        Title, summary, tags, accent colour, what to watch upstream
│     ├─ facts.json        Everything that can go stale, plus lastReviewed and sources
│     ├─ changelog.json    "What changed since" entries shown on the guide
│     ├─ theme.css         This topic's colours and fonts (token values)
│     ├─ diagram.css       Classes for the SVG diagrams
│     ├─ icon.svg          Icon for the home page card
│     ├─ site/             The scrolling guide (Astro). Acts are MDX files in src/content/acts/
│     ├─ slides/           The slide deck (Slidev)
│     ├─ diagrams/         SVG diagrams, used by both guide and slides
│     ├─ snippets/         Code samples, used by both guide and slides
│     ├─ docs/             Research notes and the review checklist
│     └─ scripts/          Demo helpers
├─ templates/topic/        Copied by `npm run new-topic`
├─ shared/tokens/          Design token NAMES only (see below)
├─ scripts/                Build, deploy and watch scripts, with tests
├─ repo.config.json        Owner, repo name, site origin
└─ .github/workflows/      deploy.yml, ci.yml, spec-watch.yml
```

## Quick start

Requires Node 22 or newer.

```bash
npm install

npm run dev -- mcp            # the scroll guide, with live reload
npm run dev -- mcp slides     # the slides in Slidev (use this to present)
npm run dev:portal            # the home page

npm run build:all             # builds everything into .out/ for a full preview
npm run check                 # token contract + tests
```

## Add a topic

```bash
npm run new-topic -- docker "Docker for developers"
npm install
npm run dev -- docker
```

This copies `templates/topic` to `topics/docker`. Edit `topic.json`, `theme.css`, `icon.svg`, write acts in
`site/src/content/acts/` and slides in `slides/slides.md`. The home page card appears automatically.

## Design tokens

`shared/tokens` holds token **names** (`--color-accent`, `--font-display`, ...) and neutral defaults. Each topic sets its own
**values** in `topics/<slug>/theme.css`, and the guide and slides both load that file, so they always match.
Add tokens freely, but never rename or remove one. `npm run check` enforces this.

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`:

1. It works out what changed. A change under `topics/mcp/` rebuilds only MCP. `portal/` or a `topic.json` change rebuilds the home page.
   `shared/` or the lockfile rebuilds everything.
2. It builds each affected topic in its own job.
3. One publish job copies each build into its own folder on the `gh-pages` branch and leaves every other folder alone.

To deploy by hand: Actions, Deploy, Run workflow, then enter `all`, `portal`, or topic slugs such as `mcp`.

### One-time setup

1. Create the repo `gmbalaa14/tech-talks` and push this code to `main`.
2. Run the Deploy workflow once. It creates the `gh-pages` branch.
3. Settings, Pages, Build and deployment: Source "Deploy from a branch", Branch `gh-pages`, folder `/ (root)`.

If you rename the repo, update `repo.config.json` and the `base` and `--base` values in each topic's
`site/astro.config.mjs` and `slides/package.json`.

### Public by default

A GitHub Pages site is public, even when the repo is private. Keep company-specific details (organisation names, project names,
URLs, tokens) out of the content. Private Pages needs an organisation on GitHub Enterprise Cloud.

## Keeping talks current

Each topic records what it was written against in `facts.json` (for example `specRevision`) and shows it on the guide and slides.
Pages and slides read those values with `<Fact k="..." />`, so one edit updates both.

`spec-watch.yml` runs monthly and opens a GitHub issue when:

- upstream has a newer release than the topic covers
- the topic has not been reviewed within `reviewIntervalDays`
- a source link in `facts.json` is broken

To update a talk: read the issue, edit `facts.json`, the affected acts and slides, add an entry to `changelog.json`, bump
`lastReviewed`, and merge. Only that topic redeploys. Tag each delivery (for example `mcp-2026-11-webinar`) so you can find
what a given audience saw. Run `npm run spec-watch` to check locally without opening issues.

## Presenting

Run `npm run dev -- mcp slides` and open the presenter view for notes. Export a PDF with
`npm run export -w @tech-talks/mcp-slides` (needs `playwright-chromium`, which Slidev prompts you to install).
