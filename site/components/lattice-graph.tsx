"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Maximize2, RefreshCw } from "lucide-react";
import type { Graph, GraphLink, GraphNode } from "@/lib/types";
import { CATEGORIES, categoryByKey } from "@/lib/categories";
import { useModels } from "@/lib/store";
import { SectionHeader } from "./ui";

type SimNode = GraphNode & d3.SimulationNodeDatum;
type SimLink = d3.SimulationLinkDatum<SimNode> & { type: GraphLink["type"] };

export function LatticeGraph({ graph }: { graph: Graph }) {
  const ref = useRef<SVGSVGElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const { open, selected } = useModels();
  const [hover, setHover] = useState<GraphNode | null>(null);
  const api = useRef<{ reset: () => void; reheat: () => void; focus: (id: string | null) => void } | null>(null);

  useEffect(() => {
    const svgEl = ref.current, box = wrap.current;
    if (!svgEl || !box) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes: SimNode[] = graph.nodes.map((n) => ({ ...n }));
    const links: SimLink[] = graph.links.map((l) => ({ ...l }));
    const neighbours = new Map<string, Set<string>>();
    for (const l of graph.links) {
      (neighbours.get(l.source) ?? neighbours.set(l.source, new Set()).get(l.source)!).add(l.target);
      (neighbours.get(l.target) ?? neighbours.set(l.target, new Set()).get(l.target)!).add(l.source);
    }

    let width = box.clientWidth, height = box.clientHeight;
    const svg = d3.select(svgEl).attr("viewBox", [0, 0, width, height].join(" "));
    svg.selectAll("*").remove();
    const g = svg.append("g");
    const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.35, 3]).on("zoom", (e) => g.attr("transform", e.transform));
    svg.call(zoom);

    const sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink<SimNode, SimLink>(links).id((d) => d.id).distance((l) => (l.type === "counter" ? 170 : 115)).strength(0.45))
      .force("charge", d3.forceManyBody().strength(-520))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide<SimNode>().radius(36))
      .force("x", d3.forceX(width / 2).strength(0.04))
      .force("y", d3.forceY(height / 2).strength(0.06));

    const link = g.append("g").attr("stroke-linecap", "round").selectAll("line").data(links).join("line")
      .attr("stroke", (d) => (d.type === "paired" ? "#3b4a7a" : "#fb7185"))
      .attr("stroke-opacity", (d) => (d.type === "paired" ? 0.7 : 0.8))
      .attr("stroke-width", (d) => (d.type === "paired" ? 1.2 : 1.6))
      .attr("stroke-dasharray", (d) => (d.type === "counter" ? "4 5" : null));

    const node = g.append("g").selectAll<SVGGElement, SimNode>("g").data(nodes).join("g").attr("cursor", "pointer")
      .call(d3.drag<SVGGElement, SimNode>()
        .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.25).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

    node.append("circle").attr("r", 9).attr("fill", (d) => categoryByKey[d.categoryKey].color).attr("stroke", "#070a12").attr("stroke-width", 2);
    node.append("circle").attr("class", "halo").attr("r", 16).attr("fill", (d) => categoryByKey[d.categoryKey].color).attr("opacity", 0);
    const narrow = () => width < 640;
    node.append("text").text((d) => d.title.replace(/\s*\(.*?\)\s*/g, "")).attr("x", 14).attr("y", 4)
      .attr("opacity", () => (narrow() ? 0 : 1))
      .attr("font-size", 11).attr("font-weight", 500).attr("fill", "#e8ebf4").attr("stroke", "#070a12").attr("stroke-width", 3).attr("paint-order", "stroke")
      .attr("font-family", "var(--font-geist), system-ui, sans-serif");

    const focus = (id: string | null) => {
      if (!id) {
        node.attr("opacity", 1).select(".halo").attr("opacity", 0);
        node.select("text").attr("opacity", narrow() ? 0 : 1);
        link.attr("stroke-opacity", (d) => (d.type === "paired" ? 0.7 : 0.8)).attr("stroke", (d) => (d.type === "paired" ? "#3b4a7a" : "#fb7185"));
        return;
      }
      const near = neighbours.get(id) ?? new Set<string>();
      node.attr("opacity", (d) => (d.id === id || near.has(d.id) ? 1 : 0.18));
      node.select(".halo").attr("opacity", (d) => (d.id === id ? 0.28 : 0));
      node.select("text").attr("opacity", (d) => (!narrow() || d.id === id || near.has(d.id) ? 1 : 0));
      link.attr("stroke-opacity", (d) => touches(d, id) ? 1 : 0.06)
        .attr("stroke", (d) => touches(d, id) ? (d.type === "paired" ? "#22d3ee" : "#fb7185") : (d.type === "paired" ? "#3b4a7a" : "#fb7185"));
    };
    const touches = (d: SimLink, id: string) => (d.source as SimNode).id === id || (d.target as SimNode).id === id;

    node.on("mouseenter", (_, d) => { setHover(d); focus(d.id); })
      .on("mouseleave", () => { setHover(null); focus(currentSel.current); })
      .on("click", (_, d) => open(d.id));

    sim.on("tick", () => {
      link.attr("x1", (d) => (d.source as SimNode).x!).attr("y1", (d) => (d.source as SimNode).y!).attr("x2", (d) => (d.target as SimNode).x!).attr("y2", (d) => (d.target as SimNode).y!);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });
    if (reduce) { sim.stop(); sim.tick(300); sim.on("tick")!.call(sim); }

    const reset = () => svg.transition().duration(600).call(zoom.transform, d3.zoomIdentity);
    api.current = { reset, reheat: () => sim.alpha(0.9).restart(), focus };

    const ro = new ResizeObserver(() => {
      width = box.clientWidth; height = box.clientHeight;
      svg.attr("viewBox", [0, 0, width, height].join(" "));
      node.select("text").attr("opacity", narrow() ? 0 : 1);
      sim.force("center", d3.forceCenter(width / 2, height / 2)).alpha(0.3).restart();
    });
    ro.observe(box);
    return () => { ro.disconnect(); sim.stop(); };
  }, [graph, open]);

  // Highlight the model currently open in the drawer.
  const currentSel = useRef<string | null>(null);
  useEffect(() => { currentSel.current = selected?.id ?? null; api.current?.focus(currentSel.current); }, [selected]);

  return (
    <section className="container-x py-16 md:py-24" id="graph">
      <SectionHeader eyebrow="The Latticework Graph" title="No model works alone." lead={`${graph.nodes.length} nodes, ${graph.links.length} connections. Solid lines pair models that compound each other; dashed lines mark counter-balances. Hover to isolate a neighbourhood, click to open the playbook.`} />
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-dim">
            {CATEGORIES.map((c) => (
              <span key={c.key} className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: c.color }} />{c.short}</span>
            ))}
            <span className="inline-flex items-center gap-1.5"><span className="h-px w-5 bg-[#3b4a7a]" /> paired</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-px w-5 border-t border-dashed border-cat-psychology" /> counter</span>
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn btn-sm" onClick={() => api.current?.reset()}><Maximize2 size={13} /> Reset view</button>
            <button type="button" className="btn btn-sm" onClick={() => api.current?.reheat()}><RefreshCw size={13} /> Re-cluster</button>
          </div>
        </div>
        <div ref={wrap} className="relative h-[520px] md:h-[640px]">
          <svg ref={ref} className="h-full w-full touch-none" role="img" aria-label="Force-directed graph of the mental models and their connections" />
          {hover && (
            <div className="pointer-events-none absolute bottom-4 left-4 max-w-[360px] rounded-xl border border-line bg-bg-1/95 p-3.5 backdrop-blur" data-cat={hover.categoryKey}>
              <div className="badge mb-1">{categoryByKey[hover.categoryKey].short}</div>
              <div className="font-semibold">{hover.title}</div>
              <p className="mt-1 line-clamp-3 text-[12.5px] leading-snug text-dim">{hover.summary}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
