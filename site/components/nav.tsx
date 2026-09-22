"use client";

import { REPO_URL } from "@/lib/links";
import { GithubIcon } from "./ui";
import { useModels } from "@/lib/store";
import { Heart } from "lucide-react";
import meta from "@/data/meta.json";

const LINKS = [
  { href: "/#diagnose", label: "Diagnose" },
  { href: "/#library", label: "Library" },
  { href: "/#graph", label: "Graph" },
  { href: "/#tooling", label: "AI & Dev" },
];

export function Nav() {
  const { favorites, favsReady } = useModels();
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-bg/70 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Mark />
          <span>Mental Models</span>
          <span className="kbd hidden sm:inline">{meta.models} models</span>
        </a>
        <nav className="hidden items-center gap-6 text-[14.5px] text-dim md:flex" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-text">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/#lattice" className="btn btn-sm btn-ghost" aria-label="My latticework">
            <Heart size={15} className={favsReady && favorites.length ? "fill-cat-psychology text-cat-psychology" : ""} />
            <span className="hidden sm:inline">My lattice</span>
            {favsReady && favorites.length > 0 && <span className="mono text-[11px] text-dim">{favorites.length}</span>}
          </a>
          <a href={REPO_URL} target="_blank" rel="noopener" className="btn btn-sm">
            <GithubIcon size={15} /> <span className="hidden sm:inline">Star on GitHub</span><span className="sm:hidden">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="mm-g" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="29" height="29" rx="8" fill="#0b0f1d" stroke="url(#mm-g)" strokeWidth="1.5" />
      <g stroke="url(#mm-g)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M9 22 L16 10 L23 22" fill="none" />
        <path d="M9 10 L23 22 M23 10 L9 22" fill="none" opacity=".55" />
      </g>
      <g fill="#e8ebf4">
        <circle cx="9" cy="10" r="1.7" /><circle cx="23" cy="10" r="1.7" /><circle cx="16" cy="10" r="1.7" />
        <circle cx="9" cy="22" r="1.7" /><circle cx="23" cy="22" r="1.7" />
      </g>
    </svg>
  );
}
