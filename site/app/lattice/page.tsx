import type { Metadata } from "next";
import Link from "next/link";
import models from "@/data/models.json";
import type { Model } from "@/lib/types";
import { ModelProvider } from "@/lib/store";
import { parseIds, MAX_LATTICE } from "@/lib/lattice";
import { SITE_URL } from "@/lib/links";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ModelDrawer } from "@/components/model-drawer";
import { SharedLatticeActions, SharedModelList } from "@/components/my-lattice";
import meta from "@/data/meta.json";

type Search = Promise<{ ids?: string | string[] }>;
const all = models as Model[];
const byId = new Map(all.map((m) => [m.id, m]));

export async function generateMetadata({ searchParams }: { searchParams: Search }): Promise<Metadata> {
  const ids = parseIds((await searchParams).ids, byId);
  if (!ids.length) return { title: "A latticework", robots: { index: false } };
  const titles = ids.map((id) => byId.get(id)!.title);
  const title = `${ids.length} mental models: ${titles.slice(0, 3).join(", ")}${titles.length > 3 ? "…" : ""}`;
  const description = `A personal latticework of ${ids.length} mental models: ${titles.join(", ")}.`;
  const og = `${SITE_URL}/lattice/og?ids=${ids.join(",")}`;
  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: `${SITE_URL}/lattice?ids=${ids.join(",")}` },
    openGraph: { title, description, url: `${SITE_URL}/lattice?ids=${ids.join(",")}`, images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export default async function LatticePage({ searchParams }: { searchParams: Search }) {
  const ids = parseIds((await searchParams).ids, byId);
  return (
    <ModelProvider models={all}>
      <Nav />
      <main className="container-x py-14 md:py-20">
        {ids.length === 0 ? (
          <div className="card p-8">
            <p className="eyebrow mb-3">Shared latticework</p>
            <h1 className="h2">Nothing to show.</h1>
            <p className="lead mt-3">This link carries no known model ids. Build your own from the library and share it with the “Share link” button.</p>
            <Link href="/#library" className="btn btn-primary mt-6">Browse the library</Link>
          </div>
        ) : (
          <>
            <p className="eyebrow mb-3">Shared latticework · {ids.length} of {MAX_LATTICE}</p>
            <h1 className="h2 max-w-[24ch]">Someone reasons with these {ids.length} models.</h1>
            <p className="lead mt-4">Open any of them for the mechanism, the checklist and the failure modes. Save the set to keep it in your own latticework on this device.</p>
            <div className="mt-7"><SharedLatticeActions ids={ids} /></div>
            <div className="mt-10"><SharedModelList ids={ids} /></div>
            <p className="mt-10 text-[13.5px] text-dim">Part of <Link href="/" className="text-text underline decoration-line-2 underline-offset-4">The Mental Models Latticework</Link>, {meta.models} open-source models across {meta.disciplines} disciplines.</p>
          </>
        )}
      </main>
      <Footer builtAt={meta.builtAt} />
      <ModelDrawer />
    </ModelProvider>
  );
}
