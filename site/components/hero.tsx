"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";
import type { Meta } from "@/lib/types";
import { REPO_URL } from "@/lib/links";
import { GithubIcon } from "./ui";

function useCountUp(target: number, ms = 1100) {
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) { setN(target); return; }
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms); const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * e)); if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, reduce]);
  return n;
}

function Stat({ value, suffix = "", label, delay = 0 }: { value: number; suffix?: string; label: string; delay?: number }) {
  const n = useCountUp(value);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: .5 }}>
      <div className="mono text-[34px] font-semibold leading-none tracking-tight tabular-nums md:text-[40px]">{n}{suffix}</div>
      <div className="mt-2 text-[13px] text-dim">{label}</div>
    </motion.div>
  );
}

export function Hero({ meta }: { meta: Meta }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="glow left-[10%] top-[-120px] h-[420px] w-[520px] rounded-full bg-cat-core/40" aria-hidden="true" />
      <div className="glow right-[5%] top-[40px] h-[380px] w-[420px] rounded-full bg-cat-probability/35" aria-hidden="true" />
      <div ref={ref} className="container-x relative pb-16 pt-20 md:pb-24 md:pt-28">
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="eyebrow mb-5 flex items-center gap-2">
          <Sparkles size={13} /> Open source · MIT · MCP-ready
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .05 }}
          className="max-w-[14ch] text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[60px] md:text-[76px]">
          The Mental Models <span className="bg-gradient-to-r from-cat-core via-cat-physics to-cat-probability bg-clip-text text-transparent">Latticework</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .12 }} className="lead mt-6 text-[18px] md:text-[19px]">
          A multidisciplinary open-source decision-support system and AI reasoning engine. {meta.models} foundational models synthesized across physics, economics, evolutionary biology, and cognition.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .2 }} className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#library" className="btn btn-primary">Explore Library <ArrowDown size={15} /></a>
          <a href="#diagnose" className="btn">Diagnose a Dilemma</a>
          <a href={REPO_URL} target="_blank" rel="noopener" className="btn btn-ghost"><GithubIcon size={15} /> Star on GitHub</a>
        </motion.div>
        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 sm:grid-cols-3 lg:grid-cols-5">
          <Stat value={meta.models} suffix={meta.models > 50 ? "+" : ""} label="Models" delay={.25} />
          <Stat value={meta.disciplines} label="Disciplines" delay={.3} />
          <Stat value={meta.links} label="Latticework connections" delay={.35} />
          <Stat value={meta.ankiCards} label="Anki cards" delay={.4} />
          <Stat value={100} suffix="%" label="Free & open source" delay={.45} />
        </div>
      </div>
    </section>
  );
}
