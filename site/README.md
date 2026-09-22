# mentalmodels.tuturama.com

Web interface for the Mental Models Latticework. Next.js 16 (App Router, static export), Tailwind v4, Radix Dialog/Tabs, Motion, D3, Lucide. Deployed on Vercel as project `mentalmodels-site` with **Root Directory = `site`**, so the build can read `../models`.

## How data gets in

`scripts/build-models.mjs` runs before every `next dev` / `next build` (see `package.json` scripts). It reads:

- `../models/**/*.md`: YAML front matter (parsed with a port of `cli/mm_core.py`'s parser, same rules) and the six numbered sections. Sections are rendered to HTML at build time with `marked`; the checklist, failure modes and latticework bullets are split into arrays.
- `../README.md`: the problem-to-model matrix table (the 15 curated dilemma rows).
- `../exports/mental_models_anki.tsv`: counted (TSV records, quoted fields may span lines) and copied to `public/downloads/`.

and writes `data/models.json`, `data/graph.json`, `data/matrix.json`, `data/meta.json`. LaTeX in the sections (`$H_2O$`, `$$\\mathbb{E}[X] = \\sum ...$$`) is rendered to HTML with KaTeX at build time, before Markdown, so `_` and `*` inside formulas never reach `marked`; escaped dollars (`\\$250`) stay literal. Plain-text fields (aphorism, agent protocol) get a Unicode fallback (`n²`, `→`, `∞`). The build fails on invalid LaTeX. The build fails if a matrix row does not resolve to a model id.

Wikilinks and list entries are resolved to model ids by exact title, an alias table, then unique prefix match (so `[[Ergodicity]]` reaches "Ergodicity & Absorbing Barriers" and `[[Map vs Territory]]` reaches "Map vs. Territory"). Refs that resolve to nothing render as plain chips. Unresolved ones are printed at build time.

Counts on the site come from `meta.json`, not from copy. The graph currently has more links than `docs/graph.html` (140 vs 114) because the resolver above catches the shortened wikilinks that `scripts/generate_graph.py` misses.

## Structure

```
app/            layout (fonts, metadata, OG), page (composes the sections), globals.css (tokens, components)
components/     nav, hero, diagnoser, library, model-drawer, lattice-graph, tooling, footer, ui
lib/            categories (keys, labels, colours), diagnose (mirror of mm_core.diagnose), store (drawer state,
                ?m= deep link, checklist persistence), types, links
scripts/        build-models.mjs
data/           generated JSON (committed so the site builds without Python)
assets-src/     og.html, rendered to public/og.png
public/         favicon.svg, og.png, downloads/mental_models_anki.tsv
```

## Behaviour worth knowing

- **Diagnoser.** The five quick chips and the "all curated dilemmas" list use the README matrix, so the triad is hand-picked. Free text runs `lib/diagnose.ts`, a line-for-line mirror of `ModelRepository.diagnose` in `cli/mm_core.py` (trigger word overlap plus the keyword map). The triad is then primary + first resolvable paired model + first resolvable counter-model of the primary. If the primary's counter-models are not in the library the third slot says so and names them.
- **Drawer.** `?m=<id>` opens a model on load and the URL is kept in sync, so any model is linkable. Latticework chips push onto a back stack. Checklist ticks persist per model in `localStorage` (per browser, never sent anywhere).
- **Rendered HTML.** The model sections are injected with `dangerouslySetInnerHTML`. The source is the repository's own Markdown, reviewed in PRs; nothing user-supplied reaches those strings.
- **Graph.** D3 force simulation; hover isolates a neighbourhood, click opens the drawer, the open model is highlighted. Labels are hidden below 640px except for the focused neighbourhood. Reduced motion is respected (simulation settles before paint).

## Commands

```bash
npm install
npm run dev        # rebuilds data, then next dev
npm run build      # rebuilds data, then static export to out/
npm run lint
```

Re-render the OG image after changing `assets-src/og.html`:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=4000 \
  --screenshot="$PWD/public/og.png" "file://$PWD/assets-src/og.html"
```

## Deploy

From the repository root (the project's root directory setting points at `site/`):

```bash
vercel deploy --prod --yes --scope gabrielrondons-projects
```

DNS: `mentalmodels CNAME cname.vercel-dns.com` at Hostinger; domain attached with `vercel domains add mentalmodels.tuturama.com mentalmodels-site`.
