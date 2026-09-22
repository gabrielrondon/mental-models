"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Compass, RotateCcw, Search } from "lucide-react";
import type { MatrixRow, Model, Triad } from "@/lib/types";
import { triadFor } from "@/lib/diagnose";
import { useChecklist, useModels } from "@/lib/store";
import { SectionHeader, CategoryBadge } from "./ui";
import { categoryByKey } from "@/lib/categories";

/** Quick chips map to curated README rows so the triad is hand-picked, not heuristic. */
const CHIPS: { label: string; dilemma: string }[] = [
  { label: "Legacy Code Rewrite", dilemma: "Deleting or refactoring legacy systems" },
  { label: "Prioritizing Roadmap", dilemma: "Prioritizing roadmap or capital allocation" },
  { label: "Uncertain Risk", dilemma: "High-stakes risk with asymmetric downside" },
  { label: "Fast Competitor", dilemma: "Rapid competitor adaptation or arms race" },
  { label: "Team Conflict", dilemma: "Interpersonal friction or vendor breakages" },
];

export function Diagnoser({ matrix }: { matrix: MatrixRow[] }) {
  const { models } = useModels();
  const [text, setText] = useState("");
  const [query, setQuery] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const triad = useMemo(() => (query ? triadFor(models, query, matrix) : null), [models, query, matrix]);

  const run = (q: string) => { setText(q); setQuery(q); };
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (text.trim()) setQuery(text.trim()); };

  return (
    <section className="container-x py-16 md:py-24" id="diagnose">
      <SectionHeader eyebrow="Problem-to-Model Engine" title="Describe the dilemma. Get the triad." lead="A primary lens, the model that compounds it, and the counter-balance that keeps it from becoming dogma. Same matcher as `mm diagnose` in the CLI; the quick picks are hand-curated." />

      <form onSubmit={submit} className="card flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:p-2 sm:pl-4">
        <Search size={18} className="hidden text-faint sm:block" />
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="What problem or dilemma are you facing?" aria-label="Describe your dilemma"
          className="min-w-0 flex-1 bg-transparent px-2 py-2 text-[16px] outline-none placeholder:text-faint sm:px-0" />
        <button type="submit" className="btn btn-primary">Diagnose <ArrowRight size={15} /></button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {CHIPS.map((c) => (
          <button key={c.label} type="button" onClick={() => run(c.dilemma)} className="pill" aria-pressed={query === c.dilemma}>{c.label}</button>
        ))}
        <button type="button" onClick={() => setShowAll((s) => !s)} className="pill">{showAll ? "Fewer" : `All ${matrix.length} curated dilemmas`}</button>
      </div>
      <AnimatePresence initial={false}>
        {showAll && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="mt-3 flex flex-wrap gap-2">
              {matrix.filter((r) => !CHIPS.some((c) => c.dilemma === r.dilemma)).map((r) => (
                <button key={r.dilemma} type="button" onClick={() => run(r.dilemma)} className="pill" aria-pressed={query === r.dilemma}>{r.dilemma}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {query && (
          <motion.div key={query} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .3 }} className="mt-8">
            {triad ? <TriadView triad={triad} /> : (
              <div className="card p-6 text-dim">
                <p>No trigger matched that wording. Try naming the mechanism: <em>legacy</em>, <em>bottleneck</em>, <em>risk</em>, <em>competition</em>, <em>estimate</em>, <em>conflict</em>, or pick a curated dilemma above.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function TriadView({ triad }: { triad: Triad }) {
  const slots: { role: string; hint: string; model: Model | null }[] = [
    { role: "Primary model", hint: "The lens that explains the mechanism", model: triad.primary },
    { role: "Complementary", hint: "Compounds the primary", model: triad.complementary },
    { role: "Counter-balance", hint: "Where the primary breaks", model: triad.counter },
  ];
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-[13px] text-dim">
        <Compass size={14} className="text-accent" />
        {triad.source === "curated" ? "Curated triad from the problem-to-model matrix." : "Diagnosed from situational triggers. Complementary and counter come from the primary model's latticework."}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {slots.map((s) => s.model ? <TriadCard key={s.role} role={s.role} hint={s.hint} model={s.model} /> : (
          <div key={s.role} className="card p-5 text-dim">
            <div className="eyebrow mb-2 text-faint">{s.role}</div>
            {triad.primary.counters.length > 0 ? (
              <p className="text-[14px]">The playbook names {triad.primary.counters.map((c) => c.name).join(", ")} as counter-balances; none of them is in the library yet. Open the primary model for its failure modes.</p>
            ) : <p className="text-[14px]">No counter-model listed for this primary. Open it for its failure modes.</p>}
          </div>
        ))}
      </div>
      {triad.alsoConsider.length > 0 && (
        <p className="mt-4 text-[13.5px] text-dim">Also consider: {triad.alsoConsider.map((m, i) => (
          <span key={m.id}>{i > 0 && ", "}<OpenLink id={m.id}>{m.title}</OpenLink></span>
        ))}</p>
      )}
    </div>
  );
}

function OpenLink({ id, children }: { id: string; children: React.ReactNode }) {
  const { open } = useModels();
  return <button type="button" onClick={() => open(id)} className="text-text underline decoration-line-2 underline-offset-4 hover:decoration-accent">{children}</button>;
}

function TriadCard({ role, hint, model }: { role: string; hint: string; model: Model }) {
  const { open } = useModels();
  const { state, toggle, reset } = useChecklist(model.id, model.checklist.length);
  const done = state.filter(Boolean).length;
  const cat = categoryByKey[model.categoryKey];
  return (
    <article className="card card-hover flex flex-col p-5" data-cat={model.categoryKey}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="eyebrow text-faint">{role}</span>
        <CategoryBadge catKey={model.categoryKey} name={cat.short} />
      </div>
      <h3 className="text-[20px] font-semibold leading-tight tracking-tight">{model.title}</h3>
      <p className="mt-1 text-[12.5px] text-faint">{hint}</p>
      {model.aphorism && <p className="aphorism mt-3 text-[15.5px]">“{model.aphorism}”</p>}
      <div className="mt-4 flex items-center justify-between text-[12px] text-dim">
        <span className="mono">Diagnostic checklist · {done}/{model.checklist.length}</span>
        {done > 0 && <button type="button" onClick={reset} className="flex items-center gap-1 hover:text-text"><RotateCcw size={12} /> reset</button>}
      </div>
      <ul className="mt-2 flex flex-col gap-2">
        {model.checklist.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[#c9cee0]">
            <input type="checkbox" className="checkbox" checked={state[i] ?? false} onChange={() => toggle(i)} id={`${role}-${model.id}-${i}`} />
            <label htmlFor={`${role}-${model.id}-${i}`} className="cursor-pointer" dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => open(model.id)} className="btn btn-sm mt-5 self-start">View playbook <ArrowRight size={13} /></button>
    </article>
  );
}
