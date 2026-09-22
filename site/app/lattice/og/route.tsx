import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import models from "@/data/models.json";
import type { Model } from "@/lib/types";
import { parseIds } from "@/lib/lattice";
import { CATEGORIES, categoryByKey } from "@/lib/categories";

export const runtime = "nodejs";

const all = models as Model[];
const byId = new Map(all.map((m) => [m.id, m]));
const FONT_DIR = join(process.cwd(), "node_modules/@fontsource/geist-sans/files");

export async function GET(req: Request) {
  const ids = parseIds(new URL(req.url).searchParams.get("ids") ?? "", byId);
  const picked = ids.map((id) => byId.get(id)!);
  const [semi, medium] = await Promise.all([
    readFile(join(FONT_DIR, "geist-sans-latin-600-normal.woff")),
    readFile(join(FONT_DIR, "geist-sans-latin-500-normal.woff")),
  ]);
  const shown = picked.slice(0, 12);
  const rest = picked.length - shown.length;
  const cats = CATEGORIES.filter((c) => picked.some((m) => m.categoryKey === c.key));

  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#070a12", color: "#e8ebf4", padding: "56px 64px", fontFamily: "Geist", position: "relative" }}>
        <div style={{ position: "absolute", left: -80, top: -120, width: 520, height: 420, borderRadius: 999, background: "#22d3ee", opacity: 0.16, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", right: -60, top: 140, width: 460, height: 420, borderRadius: 999, background: "#a78bfa", opacity: 0.18, filter: "blur(80px)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, fontWeight: 600 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, border: "1.5px solid #22d3ee", background: "#0b0f1d", display: "flex" }} />
          <span>Mental Models</span>
          <span style={{ fontSize: 14, letterSpacing: 2, color: "#22d3ee", marginLeft: 10, fontWeight: 500 }}>MY LATTICEWORK</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: picked.length > 6 ? 46 : 54, lineHeight: 1.05, letterSpacing: -1.5, fontWeight: 600, maxWidth: 1000 }}>
            {`${picked.length} mental model${picked.length === 1 ? "" : "s"} to reason with`}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 1080 }}>
            {shown.map((m) => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 16px", borderRadius: 999, border: "1px solid #2b355a", background: "#0e1428", fontSize: 21, fontWeight: 500 }}>
                <div style={{ width: 10, height: 10, borderRadius: 999, background: categoryByKey[m.categoryKey].color }} />
                <span>{m.title.replace(/\s*\(.*?\)\s*/g, "")}</span>
              </div>
            ))}
            {rest > 0 && <div style={{ display: "flex", alignItems: "center", padding: "9px 16px", borderRadius: 999, border: "1px solid #2b355a", color: "#8f97ad", fontSize: 21 }}>{`+${rest} more`}</div>}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 17, color: "#8f97ad" }}>
          <div style={{ display: "flex", gap: 16 }}>
            {cats.slice(0, 4).map((c) => (
              <div key={c.key} style={{ display: "flex", alignItems: "center", gap: 7 }}><div style={{ width: 8, height: 8, borderRadius: 999, background: c.color }} /><span>{c.short}</span></div>
            ))}
            {cats.length > 4 && <span>{`+${cats.length - 4} disciplines`}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", flexShrink: 0, marginLeft: 24 }}>
            <span style={{ color: "#e8ebf4", fontWeight: 500 }}>mentalmodels.tuturama.com</span>
            <span>A Tuturama Open Source Initiative</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: [{ name: "Geist", data: semi, weight: 600, style: "normal" }, { name: "Geist", data: medium, weight: 500, style: "normal" }] },
  );
}
