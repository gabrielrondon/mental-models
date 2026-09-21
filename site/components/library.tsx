"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { Meta, Model } from "@/lib/types";
import { CATEGORIES, categoryByKey, type CategoryKey } from "@/lib/categories";
import { useModels } from "@/lib/store";
import { CategoryBadge, SectionHeader } from "./ui";

export function Library({ meta }: { meta: Meta }) {
  const { models, open } = useModels();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoryKey | "all">("all");
  const dq = useDeferredValue(q.trim().toLowerCase());

  const shown = useMemo(() => {
    const words = dq.split(/\s+/).filter(Boolean);
    return models.filter((m) => (cat === "all" || m.categoryKey === cat) && words.every((w) => m.search.includes(w)));
  }, [models, dq, cat]);

  return (
    <section className="container-x py-16 md:py-24" id="library">
      <SectionHeader eyebrow="The Library" title="Fifty models, eight disciplines, one latticework." lead="Every model ships with a diagnostic checklist, three case studies, its failure modes, its neighbours in the lattice and a reasoning protocol for AI agents." />

      <div className="card flex items-center gap-3 px-4 py-2">
        <Search size={17} className="text-faint" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title, discipline, summary or trigger…" aria-label="Search models"
          className="min-w-0 flex-1 bg-transparent py-2 text-[15.5px] outline-none placeholder:text-faint" />
        {q && <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="text-dim hover:text-text"><X size={16} /></button>}
        <span className="kbd hidden sm:inline">{shown.length} / {models.length}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by discipline">
        <button type="button" className="pill" aria-pressed={cat === "all"} onClick={() => setCat("all")}>All <span className="count">{meta.models}</span></button>
        {CATEGORIES.map((c) => (
          <button key={c.key} type="button" className="pill" data-cat={c.key} aria-pressed={cat === c.key} onClick={() => setCat(cat === c.key ? "all" : c.key)}>
            <span className="h-2 w-2 rounded-full" style={{ background: c.color }} aria-hidden="true" />
            {c.short} <span className="count">{meta.perCategory[c.key]}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((m) => <ModelCard key={m.id} model={m} onOpen={() => open(m.id)} />)}
      </motion.div>
      {shown.length === 0 && (
        <p className="mt-10 text-center text-dim">Nothing matches “{q}” in {cat === "all" ? "the library" : categoryByKey[cat].name}. Try a broader word.</p>
      )}
    </section>
  );
}

export function ModelCard({ model, onOpen }: { model: Model; onOpen: () => void }) {
  const cat = categoryByKey[model.categoryKey];
  return (
    <motion.article layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}
      className="card card-hover flex cursor-pointer flex-col p-5" data-cat={model.categoryKey} onClick={onOpen} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }} aria-label={`Open ${model.title}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <CategoryBadge catKey={model.categoryKey} name={cat.short} />
        <span className="mono text-[11px] text-faint">{model.id}</span>
      </div>
      <h3 className="text-[19px] font-semibold leading-tight tracking-tight">{model.title}</h3>
      {model.aphorism && <p className="aphorism mt-3 line-clamp-2 text-[15px]">“{model.aphorism}”</p>}
      <p className="mt-3 line-clamp-2 text-[13.5px] leading-relaxed text-dim">{model.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {model.triggers.slice(0, 2).map((t) => <span key={t} className="chip max-w-full truncate" title={t}>{shorten(t)}</span>)}
      </div>
      <div className="mt-auto pt-5">
        <span className="btn btn-sm">View playbook &amp; checklist <ArrowUpRight size={13} /></span>
      </div>
    </motion.article>
  );
}

/** Trigger phrases are sentences; keep the first clause for the chip. */
function shorten(t: string) {
  const s = t.replace(/^(when|whenever|before|after|during)\s+/i, "").split(/[,;:(]/)[0].trim();
  return s.length > 48 ? s.slice(0, 46).replace(/\s+\S*$/, "") + "…" : s;
}
