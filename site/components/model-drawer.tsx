"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { AlertTriangle, ArrowLeft, Bot, ExternalLink, GitBranch, ListChecks, RotateCcw, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Model, Ref } from "@/lib/types";
import { categoryByKey } from "@/lib/categories";
import { useChecklist, useModels } from "@/lib/store";
import { CopyButton, CategoryBadge } from "./ui";
import { REPO_URL } from "@/lib/links";
import { FavButton } from "./fav-button";

export function ModelDrawer() {
  const { selected, close, back, canGoBack } = useModels();
  return (
    <Dialog.Root open={!!selected} onOpenChange={(o) => { if (!o) close(); }}>
      <AnimatePresence>
        {selected && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]" />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }} transition={{ type: "spring", stiffness: 380, damping: 36 }}
                className="scrollbar-thin fixed inset-y-0 right-0 z-50 flex w-full max-w-[760px] flex-col overflow-y-auto border-l border-line bg-bg-1 shadow-2xl outline-none" data-cat={selected.categoryKey}>
                <Body model={selected} onClose={close} onBack={back} canGoBack={canGoBack} />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function Body({ model, onClose, onBack, canGoBack }: { model: Model; onClose: () => void; onBack: () => void; canGoBack: boolean }) {
  const cat = categoryByKey[model.categoryKey];
  const { state, toggle, reset } = useChecklist(model.id, model.checklist.length);
  const done = state.filter(Boolean).length;
  return (
    <div key={model.id}>
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-bg-1/90 px-5 py-3 backdrop-blur md:px-8">
        <div className="flex items-center gap-3">
          {canGoBack ? <button type="button" onClick={onBack} className="btn btn-sm btn-ghost" aria-label="Back to previous model"><ArrowLeft size={15} /> Back</button>
            : <span className="mono text-[11px] text-faint">{model.id}</span>}
        </div>
        <div className="flex items-center gap-2">
          <FavButton id={model.id} label className="hidden sm:inline-flex" />
          <FavButton id={model.id} size={17} className="sm:hidden" />
          <a href={`${REPO_URL}/blob/main/${model.source}`} target="_blank" rel="noopener" className="btn btn-sm btn-ghost"><ExternalLink size={14} /> Source</a>
          <Dialog.Close asChild><button type="button" className="btn btn-sm" aria-label="Close"><X size={15} /></button></Dialog.Close>
        </div>
      </div>

      <div className="px-5 pb-16 pt-6 md:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryBadge catKey={model.categoryKey} name={cat.name} />
          <span className="text-[12px] text-faint">{model.domain}</span>
        </div>
        <Dialog.Title className="mt-3 text-[30px] font-semibold leading-[1.08] tracking-tight md:text-[36px]">{model.title}</Dialog.Title>
        {model.aphorism && (
          <blockquote className="mt-4 border-l-2 pl-4" style={{ borderColor: cat.color }}>
            <p className="aphorism text-[19px]">“{model.aphorism}”</p>
            {model.attribution && <cite className="mt-1 block text-[12.5px] not-italic text-dim">{model.attribution}</cite>}
          </blockquote>
        )}
        <p className="mt-5 text-[16px] leading-relaxed text-[#c9cee0]">{model.summary}</p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {model.triggers.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>

        <Section icon={<GitBranch size={15} />} title="Core mechanism" sub="The principle and the science behind it">
          <div className="prose-mm" dangerouslySetInnerHTML={{ __html: model.mechanismHtml }} />
        </Section>

        <Section icon={<ListChecks size={15} />} title="Diagnostic checklist" sub={model.checklistIntro ? undefined : "Work through it while you analyse the decision"}
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

        <Section icon={<ExternalLink size={15} />} title="Real-world case studies" sub="Where the model explained a triumph or a failure">
          <Tabs.Root defaultValue="tech">
            <Tabs.List className="mb-4 flex gap-1 rounded-xl border border-line bg-bg-2/60 p-1" aria-label="Case study domain">
              {[["tech", "Technology"], ["business", "Business"], ["everyday", "Everyday"]].map(([v, l]) => (
                <Tabs.Trigger key={v} value={v} className="flex-1 rounded-lg px-3 py-1.5 text-[13.5px] text-dim transition data-[state=active]:bg-bg-3 data-[state=active]:text-text">{l}</Tabs.Trigger>
              ))}
            </Tabs.List>
            {(["tech", "business", "everyday"] as const).map((v) => (
              <Tabs.Content key={v} value={v} className="outline-none">
                <div className="prose-mm" dangerouslySetInnerHTML={{ __html: model.cases[v] }} />
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </Section>

        <Section icon={<AlertTriangle size={15} className="text-cat-economics" />} title="Failure modes" sub="Where the abstraction breaks">
          <ul className="flex flex-col gap-2.5">
            {model.failureModes.map((f, i) => (
              <li key={i} className="prose-mm flex gap-3 rounded-xl border border-cat-economics/25 bg-cat-economics/[.06] px-3.5 py-3 text-[14.5px]">
                <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-cat-economics" aria-hidden="true" />
                <span dangerouslySetInnerHTML={{ __html: f }} />
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={<GitBranch size={15} />} title="The latticework" sub="Complementary models compound it; counter-models keep it honest">
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

        <Section icon={<Bot size={15} />} title="AI agent reasoning protocol" sub="Paste into Claude, ChatGPT or Cursor to debate the decision"
          right={<CopyButton text={protocolPrompt(model)} label="Copy prompt" />}>
          {model.protocolIntro && <p className="mb-3 text-[14px] text-dim" dangerouslySetInnerHTML={{ __html: model.protocolIntro }} />}
          <pre className="codeblock">{model.protocol}</pre>
        </Section>
      </div>
    </div>
  );
}

function Section({ icon, title, sub, right, children }: { icon: React.ReactNode; title: string; sub?: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-[17px] font-semibold tracking-tight"><span className="text-accent">{icon}</span>{title}</h3>
          {sub && <p className="mt-0.5 text-[13px] text-faint">{sub}</p>}
        </div>
        {right}
      </div>
      {children}
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
  ].filter((l) => l !== undefined).join("\n");
}
