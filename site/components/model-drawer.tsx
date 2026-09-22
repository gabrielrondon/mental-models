"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { AlertTriangle, ArrowLeft, ArrowRight, Bot, ChevronDown, ExternalLink, GitBranch, ListChecks, RotateCcw, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import type { Model, Ref } from "@/lib/types";
import { categoryByKey } from "@/lib/categories";
import { useChecklist, useModels } from "@/lib/store";
import { CopyButton, CategoryBadge } from "./ui";
import { REPO_URL } from "@/lib/links";
import { FavButton } from "./fav-button";

type SectionKey = "checklist" | "mechanism" | "cases" | "failures" | "lattice" | "agent";
const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "mechanism", label: "Mechanism" },
  { key: "checklist", label: "Checklist" },
  { key: "cases", label: "Cases" },
  { key: "failures", label: "Failure modes" },
  { key: "lattice", label: "Lattice" },
  { key: "agent", label: "Agent" },
];
const NARROW = "(max-width: 640px)";

export function ModelDrawer() {
  const { selected, close, back, canGoBack } = useModels();
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <Dialog.Root open={!!selected} onOpenChange={(o) => { if (!o) close(); }}>
      <AnimatePresence>
        {selected && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]" />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div ref={scrollRef} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }} transition={{ type: "spring", stiffness: 380, damping: 36 }}
                className="scrollbar-thin fixed inset-y-0 right-0 z-50 flex w-full max-w-[760px] flex-col overflow-y-auto border-l border-line bg-bg-1 shadow-2xl outline-none" data-cat={selected.categoryKey}>
                <Body key={selected.id} model={selected} onBack={back} canGoBack={canGoBack} scrollRef={scrollRef} />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function Body({ model, onBack, canGoBack, scrollRef }: { model: Model; onBack: () => void; canGoBack: boolean; scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const cat = categoryByKey[model.categoryKey];
  const { state, toggle, reset } = useChecklist(model.id, model.checklist.length);
  const done = state.filter(Boolean).length;
  const { byId, open } = useModels();

  // Every section starts open; the chevrons let a reader fold what they have already read.
  const [narrow, setNarrow] = useState(false);
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({ checklist: true, mechanism: true, cases: true, failures: true, lattice: true, agent: true });
  useEffect(() => {
    setNarrow(window.matchMedia(NARROW).matches);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [scrollRef]);
  const expand = (k: SectionKey) => setOpenSections((s) => ({ ...s, [k]: true }));
  const toggleSection = (k: SectionKey) => setOpenSections((s) => ({ ...s, [k]: !s[k] }));

  // Section bar: jump within the drawer and track the section in view.
  const refs = useRef<Partial<Record<SectionKey, HTMLElement | null>>>({});
  const [active, setActive] = useState<SectionKey>("mechanism");
  const lock = useRef(0);
  const jump = (k: SectionKey) => {
    expand(k);
    setActive(k);
    lock.current = Date.now() + 900; // let the smooth scroll finish before tracking takes over
    requestAnimationFrame(() => {
      const box = scrollRef.current, el = refs.current[k];
      if (!box || !el) return;
      const top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - 112;
      box.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });
  };
  const onScroll = useCallback(() => {
    const box = scrollRef.current;
    if (!box || Date.now() < lock.current) return;
    const line = box.getBoundingClientRect().top + 130;
    let cur: SectionKey = "mechanism";
    for (const s of SECTIONS) {
      const el = refs.current[s.key];
      if (el && el.getBoundingClientRect().top <= line) cur = s.key;
    }
    setActive(cur);
  }, [scrollRef]);
  useEffect(() => {
    const box = scrollRef.current;
    if (!box) return;
    box.addEventListener("scroll", onScroll, { passive: true });
    return () => box.removeEventListener("scroll", onScroll);
  }, [onScroll, scrollRef]);

  const teaser = (html: string, n = 120) => { const t = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); return t.length > n ? t.slice(0, n).replace(/\s+\S*$/, "") + "…" : t; };
  const next = useMemo(() => {
    const seen = new Set<string>([model.id]);
    const pick = (refs: Ref[], tone: "paired" | "counter") => refs.flatMap((r) => { const m = r.id ? byId.get(r.id) : undefined; if (!m || seen.has(m.id)) return []; seen.add(m.id); return [{ m, tone, why: r.why }]; });
    return [...pick(model.paired, "paired"), ...pick(model.counters, "counter")].slice(0, 6);
  }, [model, byId]);

  return (
    <div>
      <div className="sticky top-0 z-10 border-b border-line bg-bg-1/92 backdrop-blur">
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            {canGoBack ? <button type="button" onClick={onBack} className="btn btn-sm btn-ghost" aria-label="Back to previous model"><ArrowLeft size={15} /> Back</button>
              : <span className="mono truncate text-[11px] text-faint">{model.id}</span>}
          </div>
          <div className="flex items-center gap-2">
            <FavButton id={model.id} label className="hidden sm:inline-flex" />
            <FavButton id={model.id} size={17} className="sm:hidden" />
            <a href={`${REPO_URL}/blob/main/${model.source}`} target="_blank" rel="noopener" className="btn btn-sm btn-ghost hidden sm:inline-flex"><ExternalLink size={14} /> Source</a>
            <Dialog.Close asChild><button type="button" className="btn btn-sm" aria-label="Close"><X size={15} /></button></Dialog.Close>
          </div>
        </div>
        <nav className="scrollbar-thin flex gap-1 overflow-x-auto px-3 pb-2 md:px-7" aria-label="Sections">
          {SECTIONS.map((s) => (
            <button key={s.key} type="button" onClick={() => jump(s.key)} aria-current={active === s.key ? "true" : undefined}
              className={clsx("whitespace-nowrap rounded-full px-3 py-1 text-[12.5px] transition", active === s.key ? "bg-bg-3 text-text" : "text-dim hover:text-text")}>
              {s.label}{s.key === "checklist" && model.checklist.length > 0 && <span className="mono ml-1.5 text-[10.5px] text-faint">{done}/{model.checklist.length}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="px-4 pb-16 pt-6 md:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryBadge catKey={model.categoryKey} name={cat.name} />
          <span className="text-[12px] text-faint">{model.domain}</span>
        </div>
        <Dialog.Title className="mt-3 text-[28px] font-semibold leading-[1.08] tracking-tight md:text-[36px]">{model.title}</Dialog.Title>
        {model.aphorism && (
          <blockquote className="mt-4 border-l-2 pl-4" style={{ borderColor: cat.color }}>
            <p className="aphorism text-[18.5px] md:text-[19px]">“{model.aphorism}”</p>
            {model.attribution && <cite className="mt-1 block text-[12.5px] not-italic text-dim">{model.attribution}</cite>}
          </blockquote>
        )}
        <p className="mt-5 text-[16px] leading-relaxed text-[#c9cee0]">{model.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {model.triggers.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>

        <Section k="mechanism" refs={refs} icon={<GitBranch size={15} />} title="Core mechanism" sub="The principle and the science behind it"
          collapsible open={openSections.mechanism} onToggle={() => toggleSection("mechanism")} teaser={teaser(model.mechanismHtml)}>
          <div className="prose-mm" dangerouslySetInnerHTML={{ __html: model.mechanismHtml }} />
        </Section>

        <Section k="checklist" refs={refs} icon={<ListChecks size={15} />} title="Diagnostic checklist" sub={model.checklistIntro ? undefined : "Work through it while you analyse the decision"}
          right={<span className="mono text-[12px] text-dim">{done}/{model.checklist.length}{done > 0 && <button type="button" onClick={reset} className="ml-3 inline-flex items-center gap-1 hover:text-text"><RotateCcw size={12} /> reset</button>}</span>}>
          {model.checklistIntro && <p className="mb-3 text-[14px] text-dim" dangerouslySetInnerHTML={{ __html: model.checklistIntro }} />}
          <ul className="flex flex-col gap-2.5">
            {model.checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-line bg-bg-2/60 px-3.5 py-3 text-[15px] leading-snug text-[#d5d9e6]">
                <input type="checkbox" className="checkbox" id={`dr-${model.id}-${i}`} checked={state[i] ?? false} onChange={() => toggle(i)} />
                <label htmlFor={`dr-${model.id}-${i}`} className="cursor-pointer" dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[12px] text-faint">Ticks are saved in this browser only.</p>
        </Section>

        <Section k="cases" refs={refs} icon={<ExternalLink size={15} />} title="Real-world case studies" sub="Technology, business, everyday"
          collapsible open={openSections.cases} onToggle={() => toggleSection("cases")} teaser={teaser(model.cases.tech)}>
          <Tabs.Root defaultValue="tech">
            <Tabs.List className="mb-4 flex gap-1 rounded-xl border border-line bg-bg-2/60 p-1" aria-label="Case study domain">
              {[["tech", "Technology"], ["business", "Business"], ["everyday", "Everyday"]].map(([v, l]) => (
                <Tabs.Trigger key={v} value={v} className="flex-1 rounded-lg px-3 py-1.5 text-[13.5px] text-dim transition data-[state=active]:bg-bg-3 data-[state=active]:text-text">{l}</Tabs.Trigger>
              ))}
            </Tabs.List>
            {(["tech", "business", "everyday"] as const).map((v) => (
              <Tabs.Content key={v} value={v} className="outline-none">
                <div className="prose-mm prose-case" dangerouslySetInnerHTML={{ __html: model.cases[v] }} />
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </Section>

        <Section k="failures" refs={refs} icon={<AlertTriangle size={15} className="text-cat-economics" />} title="Failure modes" sub="Where the abstraction breaks"
          collapsible open={openSections.failures} onToggle={() => toggleSection("failures")} teaser={teaser(model.failureModes[0] ?? "")}>
          <ul className="flex flex-col gap-2.5">
            {model.failureModes.map((f, i) => (
              <li key={i} className="prose-mm flex gap-3 rounded-xl border border-cat-economics/25 bg-cat-economics/[.06] px-3.5 py-3 text-[14.5px]">
                <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-cat-economics" aria-hidden="true" />
                <span dangerouslySetInnerHTML={{ __html: f }} />
              </li>
            ))}
          </ul>
        </Section>

        <Section k="lattice" refs={refs} icon={<GitBranch size={15} />} title="The latticework" sub="Complementary models compound it; counter-models keep it honest">
          <RefRow label="Pairs with" refs={model.paired} tone="paired" />
          <RefRow label="Counter-balanced by" refs={model.counters} tone="counter" />
          {model.latticework.length > 0 && (
            <ul className="mt-4 flex flex-col gap-2">
              {model.latticework.map((r) => (
                <li key={r.name} className="text-[14px] leading-snug text-[#c9cee0]">
                  <RefChip r={r} tone="paired" /> <span className="text-dim" dangerouslySetInnerHTML={{ __html: r.why ?? "" }} />
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section k="agent" refs={refs} icon={<Bot size={15} />} title="AI agent reasoning protocol" sub="Paste into Claude, ChatGPT or Cursor to debate the decision"
          right={<CopyButton text={protocolPrompt(model)} label="Copy prompt" />}
          collapsible open={openSections.agent} onToggle={() => toggleSection("agent")} teaser={model.protocol.split("\n")[0]}>
          {model.protocolIntro && <p className="mb-3 text-[14px] text-dim" dangerouslySetInnerHTML={{ __html: model.protocolIntro }} />}
          <pre className="codeblock">{model.protocol}</pre>
        </Section>

        {next.length > 0 && (
          <section className="mt-12 border-t border-line pt-8">
            <h3 className="text-[17px] font-semibold tracking-tight">Next in the lattice</h3>
            <p className="mt-0.5 text-[13px] text-faint">Keep reading where this model connects. Dashed cards are counter-balances.</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {next.map(({ m, tone, why }) => (
                <li key={m.id}>
                  <button type="button" onClick={() => open(m.id, true)} data-cat={m.categoryKey}
                    className={clsx("card card-hover flex w-full items-start gap-3 p-4 text-left", tone === "counter" && "border-dashed")}>
                    <span className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full" style={{ background: categoryByKey[m.categoryKey].color }} aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] uppercase tracking-wider text-faint">{tone === "counter" ? "Counter-balance" : "Pairs with"}</span>
                      <span className="mt-0.5 block font-semibold leading-tight">{m.title}</span>
                      <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-dim">{why || m.summary}</span>
                    </span>
                    <ArrowRight size={15} className="mt-1 flex-none text-faint" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
        {narrow && <p className="mt-6 text-center text-[12px] text-faint">Tap ✕ above to close</p>}
      </div>
    </div>
  );
}

function Section({ k, refs, icon, title, sub, right, children, collapsible, open = true, onToggle, teaser }: {
  k: SectionKey; refs: React.MutableRefObject<Partial<Record<SectionKey, HTMLElement | null>>>; icon: React.ReactNode; title: string; sub?: string; right?: React.ReactNode; children: React.ReactNode;
  collapsible?: boolean; open?: boolean; onToggle?: () => void; teaser?: string;
}) {
  const shown = !collapsible || open;
  return (
    <section className="mt-9" ref={(el) => { refs.current[k] = el; }} id={`sec-${k}`}>
      <div className="mb-3 flex items-end justify-between gap-3">
        {collapsible ? (
          <button type="button" onClick={onToggle} aria-expanded={open} className="flex min-w-0 flex-1 items-start gap-2 text-left">
            <span className="mt-0.5 text-accent">{icon}</span>
            <span className="min-w-0">
              <span className="flex items-center gap-2 text-[17px] font-semibold tracking-tight">{title}<ChevronDown size={15} className={clsx("text-faint transition-transform", open && "rotate-180")} /></span>
              {sub && <span className="mt-0.5 block text-[13px] text-faint">{sub}</span>}
            </span>
          </button>
        ) : (
          <div>
            <h3 className="flex items-center gap-2 text-[17px] font-semibold tracking-tight"><span className="text-accent">{icon}</span>{title}</h3>
            {sub && <p className="mt-0.5 text-[13px] text-faint">{sub}</p>}
          </div>
        )}
        {right}
      </div>
      {shown ? children : (
        <button type="button" onClick={onToggle} className="block w-full rounded-xl border border-dashed border-line px-3.5 py-3 text-left text-[14px] leading-snug text-dim hover:border-line-2 hover:text-text">
          {teaser} <span className="text-accent">Read</span>
        </button>
      )}
    </section>
  );
}

function RefRow({ label, refs, tone }: { label: string; refs: Ref[]; tone: "paired" | "counter" }) {
  if (!refs.length) return null;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-[12.5px] text-faint">{label}</span>
      {refs.map((r) => <RefChip key={r.name} r={r} tone={tone} />)}
    </div>
  );
}

function RefChip({ r, tone }: { r: Ref; tone: "paired" | "counter" }) {
  const { open, byId } = useModels();
  const target = r.id ? byId.get(r.id) : undefined;
  const style = tone === "counter" ? { borderStyle: "dashed" as const } : undefined;
  if (!target) return <span className="chip" style={style} title={r.why || "Not in the library yet"}>{r.name}</span>;
  return (
    <button type="button" onClick={() => open(target.id, true)} className="chip" data-link="true" data-cat={target.categoryKey} style={style} title={r.why || target.summary}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: categoryByKey[target.categoryKey].color }} aria-hidden="true" />{target.title}
    </button>
  );
}

/** A self-contained prompt: the model's definition, its checklist and its protocol. */
function protocolPrompt(m: Model) {
  const strip = (h: string) => h.replace(/<[^>]+>/g, "");
  return [
    `Apply the mental model "${m.title}" (${m.category}) to the decision I describe below.`,
    ``,
    `Definition: ${m.summary}`,
    m.aphorism ? `Aphorism: "${m.aphorism}"` : "",
    ``,
    `Diagnostic checklist:`,
    ...m.checklist.map((c, i) => `${i + 1}. ${strip(c)}`),
    ``,
    `Reasoning protocol:`,
    m.protocol,
    ``,
    `Counter-models to weigh against it: ${m.counters.map((c) => c.name).join("; ") || "none listed"}.`,
    ``,
    `My decision: [describe it here]`,
    ``,
    `Source: https://mentalmodels.tuturama.com/?m=${m.id}`,
  ].join("\n");
}
