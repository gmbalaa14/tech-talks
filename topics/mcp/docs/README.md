# docs/ for MCP under the hood

Reference material that is not shown on the site: research notes, spec links, speaker notes,
decisions about what to include. Keep company-specific details out of this repo, because the site is public.

Folder map for this topic:

| Folder / file | What lives there |
|---|---|
| `topic.json` | Title, summary, tags, accent colour. Drives the card on the home page. |
| `facts.json` | Everything that can go stale, plus `lastReviewed` and source links. |
| `changelog.json` | Dated "what changed since" entries shown at the bottom of the guide. |
| `theme.css` | This topic's colours and fonts (token values). |
| `diagram.css` and `diagrams/` | SVG diagrams, used by both the guide and the slides. |
| `snippets/` | Code samples shown on the site and slides. |
| `scripts/` | Demo helpers for the live session. |
| `site/` | The scrolling guide (Astro). Acts live in `site/src/content/acts/`. |
| `slides/` | The slide deck (Slidev). |
