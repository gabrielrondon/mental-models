#!/usr/bin/env node
/**
 * Build-time ingestion for mentalmodels.tuturama.com.
 *
 * Reads ../models/** /*.md (YAML front matter + six numbered sections), the
 * README problem-to-model matrix and the Anki export, and writes:
 *   data/models.json   one record per model, sections pre-rendered to HTML
 *   data/graph.json    nodes + links (paired = solid, counter = dashed)
 *   data/matrix.json   curated dilemma -> triad rows from the README
 *   data/meta.json     counts shown in the hero
 *   public/downloads/mental_models_anki.tsv
 *
 * Front matter parsing mirrors cli/mm_core.py (parse_frontmatter) on purpose:
 * the library's YAML is a strict subset (scalars + string lists) and the Python
 * tooling is the reference implementation.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, copyFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const SITE = dirname(dirname(fileURLToPath(import.meta.url)));
const REPO = dirname(SITE);
const MODELS = join(REPO, "models");
const OUT = join(SITE, "data");
mkdirSync(OUT, { recursive: true });
marked.setOptions({ gfm: true, breaks: false });

// Category keys, order and short labels used by the UI filter pills.
export const CATEGORIES = [
  { key: "core", name: "Core Thinking & Reasoning", short: "Core Thinking" },
  { key: "systems", name: "Systems & Complexity", short: "Systems & Complexity" },
  { key: "probability", name: "Probability & Mathematics", short: "Probability & Math" },
  { key: "economics", name: "Economics, Strategy & Games", short: "Economics & Strategy" },
  { key: "evolution", name: "Evolution & Biological Systems", short: "Evolution & Biology" },
  { key: "psychology", name: "Psychology & Human Behavior", short: "Psychology & Cognition" },
  { key: "physics", name: "Physics & Engineering", short: "Physics & Engineering" },
  { key: "operations", name: "Operations & High-Stakes Strategy", short: "Operations & Strategy" },
];
const catKey = (name) => CATEGORIES.find((c) => c.name === name)?.key ?? "core";

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".md") ? [p] : [];
  });
}

const unquote = (v) => (/^"(.*)"$/.test(v) || /^'(.*)'$/.test(v) ? v.slice(1, -1) : v);

/** Port of mm_core.parse_frontmatter: scalars and "- item" lists only. */
function parseFrontmatter(content) {
  const m = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!m) return [{}, content];
  const data = {};
  let list = null;
  for (let line of m[1].split("\n")) {
    line = line.replace(/\s+$/, "");
    if (!line || line.startsWith("#")) continue;
    const li = line.match(/^\s+-\s+(.*)$/);
    if (li) { if (list) list.push(unquote(li[1].trim())); continue; }
    const kv = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (kv) {
      const [, k, v] = kv;
      if (!v.trim()) { list = []; data[k] = list; }
      else { data[k] = unquote(v.trim()); list = null; }
    }
  }
  return [data, m[2]];
}

const norm = (s) => s.toLowerCase().replace(/\[\[|\]\]/g, "").replace(/\(.*?\)/g, "").replace(/^the\s+/, "").replace(/[.’']/g, "").replace(/\s+/g, " ").trim();
const ALIASES = { "game theory & prisoners dilemma": "nash-equilibrium" };

/** Body text of "## n. Heading" up to the next "## " heading, trailing rule removed. */
function section(body, n) {
  const parts = body.split(/^(?=## \d+\.)/m);
  const part = parts.find((p) => p.startsWith(`## ${n}.`));
  if (!part) return "";
  return part.replace(/^## [^\n]*\n/, "").replace(/\n---\s*$/, "").trim();
}
const sub = (text, heading) => {
  const re = new RegExp(`### ${heading.replace(/[&]/g, "\\$&")}\\s*\\n([\\s\\S]*?)(?=\\n### |$)`);
  const m = text.match(re);
  return m ? m[1].trim() : "";
};
const inline = (md) => marked.parseInline(md);
const block = (md) => marked.parse(md);

const files = walk(MODELS).sort();
const raw = files.map((file) => {
  const content = readFileSync(file, "utf8");
  const [meta, body] = parseFrontmatter(content);
  return { file, meta, body, id: meta.id || basename(file, ".md") };
});
const byId = new Map(raw.map((r) => [r.id, r]));
const byTitle = new Map(raw.map((r) => [norm(r.meta.title), r.id]));

/** Resolve a wikilink or list entry to a model id. Exact title, alias, then unique prefix. */
function resolve(name) {
  const n = norm(name.split(" (")[0]);
  if (byId.has(n.replace(/\s+/g, "-"))) return n.replace(/\s+/g, "-");
  if (byTitle.has(n)) return byTitle.get(n);
  if (ALIASES[n]) return ALIASES[n];
  const pref = [...byTitle.entries()].filter(([t]) => t.startsWith(n + " ") || t.startsWith(n + " &"));
  return pref.length === 1 ? pref[0][1] : null;
}

const models = raw.map(({ meta, body, id, file }) => {
  const q = body.match(/^>\s*[“"](.*?)[”"]\s*(?:[—–-]\s*(.*))?$/m);
  const mech = section(body, 1);
  const checklistMd = section(body, 2);
  const cases = section(body, 3);
  const failures = section(body, 4);
  const lattice = section(body, 5);
  const protocolSec = section(body, 6);
  const checklist = [...checklistMd.matchAll(/^[-*] \[ \] (.*)$/gm)].map((m) => inline(m[1]));
  const checklistIntro = checklistMd.split("\n").find((l) => l.trim() && !l.startsWith("- [") && !l.startsWith("* [")) || "";
  const protocol = (protocolSec.match(/```(?:text)?\n([\s\S]*?)```/) || [, ""])[1].trim();
  const protocolIntro = protocolSec.split("```")[0].trim();
  const latticeItems = [...lattice.matchAll(/^[-*] \*\*\[\[(.+?)\]\]\*\*:?\s*(.*)$/gm)].map((m) => ({ name: m[1], id: resolve(m[1]), why: inline(m[2]) }));
  const paired = (meta.paired_models || []).map((p) => ({ name: p.replace(/\[\[|\]\]/g, ""), id: resolve(p) }));
  const counters = (meta.counter_models || []).map((c) => {
    const why = (c.match(/\((.*)\)\s*$/) || [, ""])[1];
    return { name: c.split(" (")[0].replace(/\[\[|\]\]/g, "").trim(), id: resolve(c), why };
  });
  const failureItems = [...failures.matchAll(/^[-*] (.*)$/gm)].map((m) => inline(m[1]));
  return {
    id,
    title: meta.title,
    category: meta.category,
    categoryKey: catKey(meta.category),
    domain: meta.domain,
    summary: meta.summary,
    aphorism: q ? q[1] : "",
    attribution: q && q[2] && /[A-Za-z]/.test(q[2]) ? q[2].trim().replace(/^[—–-]+\s*/, "") : "",
    triggers: meta.triggers || [],
    paired,
    counters,
    checklistIntro: inline(checklistIntro),
    checklist,
    mechanismHtml: block(mech),
    cases: {
      tech: block(sub(cases, "Technology & Engineering")),
      business: block(sub(cases, "Business & Strategy")),
      everyday: block(sub(cases, "Everyday High-Stakes Decisions")),
    },
    failureModes: failureItems,
    latticework: latticeItems,
    protocolIntro: inline(protocolIntro),
    protocol,
    source: `models/${file.slice(MODELS.length + 1)}`,
    search: [meta.title, meta.domain, meta.category, meta.summary, ...(meta.triggers || []), q ? q[1] : ""].join(" ").toLowerCase(),
  };
});

// Graph: same rules as scripts/generate_graph.py, with the resolver above.
const links = [];
const seen = new Set();
for (const m of models) {
  for (const [list, type] of [[m.paired, "paired"], [m.counters, "counter"]]) {
    for (const t of list) {
      if (!t.id || t.id === m.id) continue;
      const key = [...[m.id, t.id].sort(), type].join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      links.push({ source: m.id, target: t.id, type });
    }
  }
}
const nodes = models.map((m) => ({ id: m.id, title: m.title, categoryKey: m.categoryKey, summary: m.summary }));

// Curated matrix from README.
const readme = readFileSync(join(REPO, "README.md"), "utf8");
const matrix = [...readme.matchAll(/^\| \*\*(.+?)\*\* \| \[\[(.+?)\]\] \| \[\[(.+?)\]\] \| \[\[(.+?)\]\] \|$/gm)].map((m) => ({
  dilemma: m[1],
  primary: resolve(m[2]),
  complementary: resolve(m[3]),
  counter: resolve(m[4]),
}));
const unresolvedMatrix = matrix.filter((r) => !r.primary || !r.complementary || !r.counter);
if (unresolvedMatrix.length) throw new Error("Unresolved matrix rows: " + JSON.stringify(unresolvedMatrix));

// Anki cards: count TSV records (fields may span lines inside quotes).
const anki = readFileSync(join(REPO, "exports/mental_models_anki.tsv"), "utf8");
let cards = 0, inQ = false;
for (const ch of anki) { if (ch === '"') inQ = !inQ; else if (ch === "\n" && !inQ) cards++; }
if (!anki.endsWith("\n")) cards++;
copyFileSync(join(REPO, "exports/mental_models_anki.tsv"), join(SITE, "public/downloads/mental_models_anki.tsv"));

const meta = {
  models: models.length,
  disciplines: CATEGORIES.length,
  links: links.length,
  paired: links.filter((l) => l.type === "paired").length,
  counter: links.filter((l) => l.type === "counter").length,
  ankiCards: cards,
  perCategory: Object.fromEntries(CATEGORIES.map((c) => [c.key, models.filter((m) => m.categoryKey === c.key).length])),
  builtAt: new Date().toISOString().slice(0, 10),
};

writeFileSync(join(OUT, "models.json"), JSON.stringify(models));
writeFileSync(join(OUT, "graph.json"), JSON.stringify({ nodes, links }));
writeFileSync(join(OUT, "matrix.json"), JSON.stringify(matrix, null, 1));
writeFileSync(join(OUT, "meta.json"), JSON.stringify(meta, null, 1));

const unresolved = models.flatMap((m) => [...m.paired, ...m.latticework].filter((x) => !x.id).map((x) => `${m.id} -> ${x.name}`));
console.log(`models ${meta.models}  links ${meta.links} (paired ${meta.paired}, counter ${meta.counter})  anki ${meta.ankiCards}`);
if (unresolved.length) console.log("unresolved paired/latticework refs (rendered as plain chips):\n  " + unresolved.join("\n  "));
