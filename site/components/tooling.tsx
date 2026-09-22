"use client";

import { Bot, Download, Layers, Terminal } from "lucide-react";
import type { Meta } from "@/lib/types";
import { REPO_URL } from "@/lib/links";
import { CopyButton, SectionHeader } from "./ui";

const MCP_JSON = `{
  "mcpServers": {
    "mental-models": {
      "command": "python3",
      "args": ["/path/to/mental-models/mcp/server.py"]
    }
  }
}`;

const CLI = `git clone ${REPO_URL}.git && cd mental-models
./cli/mm diagnose "We want to rewrite a legacy billing module"
./cli/mm show chestertons-fence
./cli/mm search "uncertainty"
./cli/mm random`;

export function Tooling({ meta }: { meta: Meta }) {
  return (
    <section className="container-x py-16 md:py-24" id="tooling">
      <SectionHeader eyebrow="Developer & AI Tooling" title="Same library, four interfaces." lead="The Markdown files are the single source of truth. The CLI, the MCP server, the agent skill and the Anki deck are all generated from them, with zero external dependencies." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card icon={<Bot size={16} />} title="Model Context Protocol" sub="Claude Desktop, Claude Code, Cursor, Antigravity" action={<CopyButton text={MCP_JSON} label="Copy JSON" />}>
          <p className="text-[14px] text-dim">Clone the repo, then register the stdio server. The agent gets <code className="mono text-[12.5px]">list_mental_models</code>, <code className="mono text-[12.5px]">get_mental_model</code>, <code className="mono text-[12.5px]">search_mental_models</code> and <code className="mono text-[12.5px]">diagnose_dilemma</code> as tools.</p>
          <pre className="codeblock mt-3">{MCP_JSON}</pre>
        </Card>
        <Card icon={<Layers size={16} />} title="Agent skill" sub="Multi-model cross-examination before a refactor or a strategic call" action={<a className="btn btn-sm" href={`${REPO_URL}/blob/main/skills/mental-models/SKILL.md`} target="_blank" rel="noopener">Read SKILL.md</a>}>
          <p className="text-[14px] text-dim">The skill at <code className="mono text-[12.5px]">skills/mental-models/SKILL.md</code> tells an agent when to consult the library and how to structure a Mental Models Evaluation: situational diagnosis, cross-examination with a counter-perspective, a concrete checklist and a prescribed action. Copy the folder into your agent's skills directory (for Claude Code, <code className="mono text-[12.5px]">~/.claude/skills/</code>) or point the agent at the repo.</p>
        </Card>
        <Card icon={<Terminal size={16} />} title="Terminal CLI" sub="Python 3, standard library only" action={<CopyButton text={CLI} label="Copy" />}>
          <pre className="codeblock">{CLI}</pre>
        </Card>
        <Card icon={<Download size={16} />} title="Anki deck" sub={`${meta.ankiCards} flashcards, two per model`} action={<a className="btn btn-sm btn-primary" href="/downloads/mental_models_anki.tsv" download="mental_models_anki.tsv"><Download size={14} /> Download TSV</a>}>
          <p className="text-[14px] text-dim">One card for the core mechanism, one for the diagnostic playbook. Import in Anki with <span className="kbd">File → Import</span>, field separator <span className="kbd">Tab</span>, and “Allow HTML in fields” enabled. Regenerate any time with <code className="mono text-[12.5px]">python3 scripts/export_anki.py</code>.</p>
        </Card>
      </div>
    </section>
  );
}

function Card({ icon, title, sub, action, children }: { icon: React.ReactNode; title: string; sub: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <article className="card flex min-w-0 flex-col overflow-hidden p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-[17px] font-semibold tracking-tight"><span className="text-accent">{icon}</span>{title}</h3>
          <p className="mt-0.5 text-[13px] text-faint">{sub}</p>
        </div>
        {action}
      </div>
      {children}
    </article>
  );
}
