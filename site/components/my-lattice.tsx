"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Bot, Check, FileText, Heart, Link2, Trash2 } from "lucide-react";
import { useModels } from "@/lib/store";
import { categoryByKey } from "@/lib/categories";
import { latticeMarkdown, latticePrompt, latticeUrl, MAX_LATTICE } from "@/lib/lattice";
import { CategoryBadge, CopyButton, SectionHeader } from "./ui";
import { FavButton } from "./fav-button";

export function MyLattice() {
  const { favorites, favsReady, byId, open, clearFavs } = useModels();
  const models = useMemo(() => favorites.map((id) => byId.get(id)).filter((m) => !!m), [favorites, byId]);
  const [copiedLink, setCopiedLink] = useState(false);
  const shareUrl = latticeUrl(favorites.slice(0, MAX_LATTICE));
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); setCopiedLink(true); setTimeout(() => setCopiedLink(false), 1600); } catch { /* no clipboard */ }
  };

  return (
    <section className="container-x py-16 md:py-24" id="lattice">
      <SectionHeader eyebrow="My latticework" title="The models you actually reason with." lead="Tap the heart on any model to keep it here. Export the set to Obsidian, hand it to an agent as a prompt, or share it as a link. Stored in this browser only; no account." />
      {!favsReady ? null : models.length === 0 ? (
        <div className="card flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <p className="text-dim">Nothing saved yet. Start with the classics: <Quick id="inversion" /> <Quick id="second-order-thinking" /> <Quick id="margin-of-safety" /> <Quick id="opportunity-cost" /></p>
          <a href="#library" className="btn">Browse the library <ArrowRight size={15} /></a>
        </div>
      ) : (
        <>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <CopyButton text={latticeMarkdown(models)} label="Copy as Markdown (Obsidian)" className="[&_svg]:hidden" />
            <CopyButton text={latticePrompt(models)} label="Copy agent prompt" className="[&_svg]:hidden" />
            <button type="button" onClick={copyLink} className="btn btn-sm">{copiedLink ? <Check size={14} className="text-cat-systems" /> : <Link2 size={14} />}{copiedLink ? "Link copied" : "Share link"}</button>
            <a href={`/lattice?ids=${favorites.join(",")}`} className="btn btn-sm btn-ghost">Open share page <ArrowRight size={13} /></a>
            <button type="button" onClick={() => { if (confirm("Clear your latticework?")) clearFavs(); }} className="btn btn-sm btn-ghost text-dim"><Trash2 size={14} /> Clear</button>
            <span className="ml-auto mono text-[12px] text-faint">{models.length} of {MAX_LATTICE} in a share link</span>
          </div>
          <motion.ul layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {models.map((m) => (
                <motion.li key={m.id} layout initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .2 }}
                  className="card card-hover flex cursor-pointer items-start gap-3 p-4" data-cat={m.categoryKey} onClick={() => open(m.id)} role="button" tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter") open(m.id); }}>
                  <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full" style={{ background: categoryByKey[m.categoryKey].color }} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold leading-tight">{m.title}</span>
                    <span className="mt-1 block text-[12.5px] text-dim">{categoryByKey[m.categoryKey].short}</span>
                  </span>
                  <FavButton id={m.id} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          <p className="mt-4 flex items-center gap-2 text-[12.5px] text-faint"><Bot size={13} /> The agent prompt includes each model's summary and checklist. <FileText size={13} className="ml-2" /> The Markdown uses <code className="mono">[[wikilinks]]</code>, ready for Obsidian or Logseq.</p>
        </>
      )}
    </section>
  );
}

function Quick({ id }: { id: string }) {
  const { byId, toggleFav, isFav } = useModels();
  const m = byId.get(id);
  if (!m) return null;
  return (
    <button type="button" onClick={() => toggleFav(id)} className="chip mr-1" data-link="true" data-cat={m.categoryKey}>
      <Heart size={12} className={isFav(id) ? "fill-current" : ""} /> {m.title}
    </button>
  );
}

export function SharedLatticeActions({ ids }: { ids: string[] }) {
  const { addFavs, favorites } = useModels();
  const missing = ids.filter((id) => !favorites.includes(id));
  const [done, setDone] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" className="btn btn-primary" disabled={missing.length === 0} onClick={() => { addFavs(ids); setDone(true); }}>
        {done || missing.length === 0 ? <><Check size={15} /> In my latticework</> : <><Heart size={15} /> Save {missing.length === ids.length ? "all" : `${missing.length} new`} to my latticework</>}
      </button>
      <a href="/#lattice" className="btn">Open mine <ArrowRight size={15} /></a>
    </div>
  );
}

export function SharedModelList({ ids }: { ids: string[] }) {
  const { byId, open } = useModels();
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {ids.map((id) => { const m = byId.get(id)!; return (
        <li key={id} className="card card-hover cursor-pointer p-5" data-cat={m.categoryKey} onClick={() => open(id)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") open(id); }}>
          <div className="mb-2 flex items-center justify-between gap-3"><CategoryBadge catKey={m.categoryKey} name={categoryByKey[m.categoryKey].short} /><FavButton id={id} /></div>
          <h2 className="text-[19px] font-semibold leading-tight tracking-tight">{m.title}</h2>
          {m.aphorism && <p className="aphorism mt-2 text-[15px]">“{m.aphorism}”</p>}
          <p className="mt-2 line-clamp-2 text-[13.5px] text-dim">{m.summary}</p>
        </li>
      ); })}
    </ul>
  );
}
