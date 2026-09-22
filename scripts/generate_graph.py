#!/usr/bin/env python3
"""
Interactive Knowledge Graph Generator for The Mental Models Latticework.
Generates a standalone, beautiful HTML/D3.js force-directed graph viewable in any browser.
"""

import re
import sys
import json
from pathlib import Path

# Add cli directory to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "cli"))
from mm_core import ModelRepository

# Titles in the library are longer than the names used in wikilinks and in
# paired_models/counter_models ("Ergodicity" for "Ergodicity & Absorbing
# Barriers", "Map vs Territory" for "Map vs. Territory", "Red Queen Effect" for
# "The Red Queen Effect"). Resolve by exact title, then by a short alias table,
# then by unique prefix of the normalised title.
ALIASES = {
    "game theory & prisoners dilemma": "nash-equilibrium",
    "bottlenecks & theory of constraints": "theory-of-constraints",
    "phase transitions & critical mass": "critical-mass",
    "pareto principle": "power-laws-pareto",
}


def normalise(name: str) -> str:
    name = name.lower().replace("[[", "").replace("]]", "")
    name = re.sub(r"\(.*?\)", "", name)
    name = re.sub(r"^the\s+", "", name)
    name = re.sub(r"[.'’]", "", name)
    return re.sub(r"\s+", " ", name).strip()


def make_resolver(models):
    by_title = {normalise(m["title"]): m["id"] for m in models}
    ids = {m["id"] for m in models}

    def resolve(name: str):
        n = normalise(name.split(" (")[0])
        if n.replace(" ", "-") in ids:
            return n.replace(" ", "-")
        if n in by_title:
            return by_title[n]
        if n in ALIASES:
            return ALIASES[n]
        prefixed = [t for t in by_title if t.startswith(n + " ")]
        if len(prefixed) == 1:
            return by_title[prefixed[0]]
        return None

    return resolve


def build_graph_data(repo: ModelRepository):
    models = repo.get_all()
    nodes = []
    links = []
    
    id_to_model = {m["id"]: m for m in models}
    resolve = make_resolver(models)

    # Category color mapping
    category_colors = {
        "Core Thinking & Reasoning": "#3b82f6",     # Blue
        "Systems & Complexity": "#10b981",          # Emerald
        "Probability & Mathematics": "#8b5cf6",     # Purple
        "Economics, Strategy & Games": "#f59e0b",   # Amber
        "Evolution & Biological Systems": "#06b6d4",# Cyan
        "Psychology & Human Behavior": "#ec4899",   # Pink
        "Physics & Engineering": "#64748b",         # Slate
        "Operations & High-Stakes Strategy": "#ef4444", # Red
    }
    
    for m in models:
        nodes.append({
            "id": m["id"],
            "title": m["title"],
            "category": m["category"],
            "domain": m["domain"],
            "summary": m["summary"],
            "aphorism": m["aphorism"],
            "triggers": m["triggers"],
            "color": category_colors.get(m["category"], "#94a3b8")
        })
        
        for p in m["paired_models"]:
            target_id = resolve(p)
            if target_id and target_id != m["id"]:
                links.append({"source": m["id"], "target": target_id, "type": "paired"})
                
        for c in m["counter_models"]:
            target_id = resolve(c)
            if target_id and target_id != m["id"]:
                links.append({"source": m["id"], "target": target_id, "type": "counter"})
                
    # Deduplicate links
    unique_links = []
    seen = set()
    for l in links:
        pair_key = tuple(sorted([l["source"], l["target"]])) + (l["type"],)
        if pair_key not in seen:
            seen.add(pair_key)
            unique_links.append(l)
            
    return {"nodes": nodes, "links": unique_links}

def generate_html(graph_data):
    graph_json = json.dumps(graph_data, indent=2)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Mental Models Latticework | Interactive Graph</title>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      overflow: hidden;
      display: flex;
      height: 100vh;
      width: 100vw;
    }}
    #graph-container {{
      flex: 1;
      height: 100%;
      position: relative;
    }}
    svg {{
      width: 100%;
      height: 100%;
      cursor: grab;
    }}
    svg:active {{ cursor: grabbing; }}
    
    /* Sidebar */
    #sidebar {{
      width: 380px;
      height: 100%;
      background: #1e293b;
      border-left: 1px solid #334155;
      padding: 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: -4px 0 24px rgba(0,0,0,0.4);
      z-index: 10;
    }}
    .badge {{
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 8px;
      border-radius: 6px;
      background: #334155;
      color: #94a3b8;
    }}
    h1 {{ font-size: 20px; font-weight: 700; color: #38bdf8; }}
    h2 {{ font-size: 22px; font-weight: 700; color: #f8fafc; line-height: 1.3; }}
    .aphorism {{
      font-style: italic;
      color: #fbbf24;
      border-left: 3px solid #fbbf24;
      padding-left: 12px;
      font-size: 14px;
      line-height: 1.5;
    }}
    .summary {{
      font-size: 14px;
      line-height: 1.6;
      color: #cbd5e1;
    }}
    .section-title {{
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
      margin-top: 8px;
    }}
    .triggers-list {{
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }}
    .triggers-list li {{
      font-size: 13px;
      background: #0f172a;
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid #334155;
      color: #94a3b8;
      line-height: 1.4;
    }}
    .controls {{
      position: absolute;
      top: 16px;
      left: 16px;
      display: flex;
      gap: 8px;
      z-index: 5;
    }}
    .btn {{
      background: #1e293b;
      color: #f8fafc;
      border: 1px solid #475569;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }}
    .btn:hover {{ background: #334155; border-color: #94a3b8; }}
    .legend {{
      position: absolute;
      bottom: 16px;
      left: 16px;
      background: rgba(30, 41, 59, 0.9);
      backdrop-filter: blur(8px);
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid #334155;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      z-index: 5;
    }}
    .legend-item {{ display: flex; align-items: center; gap: 8px; }}
    .legend-dot {{ width: 10px; height: 10px; border-radius: 50%; }}
  </style>
</head>
<body>

  <div id="graph-container">
    <div class="controls">
      <button class="btn" onclick="resetZoom()">Reset View</button>
      <button class="btn" onclick="reheatSimulation()">Re-cluster</button>
    </div>
    
    <div class="legend">
      <div style="font-weight: 700; margin-bottom: 4px; color: #94a3b8;">DISCIPLINES</div>
      <div class="legend-item"><div class="legend-dot" style="background: #3b82f6;"></div> Core Thinking & Reasoning</div>
      <div class="legend-item"><div class="legend-dot" style="background: #10b981;"></div> Systems & Complexity</div>
      <div class="legend-item"><div class="legend-dot" style="background: #8b5cf6;"></div> Probability & Math</div>
      <div class="legend-item"><div class="legend-dot" style="background: #f59e0b;"></div> Economics & Strategy</div>
      <div class="legend-item"><div class="legend-dot" style="background: #06b6d4;"></div> Evolution & Biology</div>
      <div class="legend-item"><div class="legend-dot" style="background: #ec4899;"></div> Psychology & Cognition</div>
      <div class="legend-item"><div class="legend-dot" style="background: #64748b;"></div> Physics & Engineering</div>
      <div class="legend-item"><div class="legend-dot" style="background: #ef4444;"></div> Operations & Strategy</div>
      <div style="margin-top: 6px; font-size: 11px; color: #64748b;">
        Solid link = Paired | Dashed link = Counter-balance
      </div>
    </div>

    <svg id="canvas"></svg>
  </div>

  <div id="sidebar">
    <div>
      <span class="badge" id="side-category">SELECT A NODE</span>
      <span class="badge" id="side-domain" style="margin-left: 4px;"></span>
    </div>
    <h2 id="side-title">The Mental Models Latticework</h2>
    <div class="aphorism" id="side-aphorism">"Click any node in the graph to inspect its core mechanism, diagnostic checklist, and triggers."</div>
    <div class="summary" id="side-summary">Models do not operate in isolation. They form an interconnected latticework across physics, evolutionary biology, mathematics, and cognitive science.</div>
    
    <div class="section-title">Situational Triggers</div>
    <ul class="triggers-list" id="side-triggers">
      <li>Explore links to see how models reinforce each other.</li>
      <li>Use the CLI (`./cli/mm diagnose`) for interactive terminal queries.</li>
    </ul>
  </div>

  <script>
    const data = {graph_json};
    const container = document.getElementById("graph-container");
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select("#canvas")
      .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g");

    const zoom = d3.zoom()
      .scaleExtent([0.2, 4])
      .on("zoom", (event) => {{
        g.attr("transform", event.transform);
      }});

    svg.call(zoom);

    function resetZoom() {{
      svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(width / 4, height / 4).scale(0.85));
    }}

    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-350))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(45));

    function reheatSimulation() {{
      simulation.alpha(1).restart();
    }}

    // Draw links
    const link = g.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", d => d.type === "paired" ? "#38bdf8" : "#ec4899")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => d.type === "paired" ? 1.5 : 2)
      .attr("stroke-dasharray", d => d.type === "counter" ? "5,5" : "none");

    // Draw nodes
    const node = g.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .attr("cursor", "pointer")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", 14)
      .attr("fill", d => d.color)
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 2)
      .attr("filter", "drop-shadow(0 2px 6px rgba(0,0,0,0.5))");

    node.append("text")
      .text(d => d.title)
      .attr("x", 18)
      .attr("y", 5)
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("fill", "#f8fafc")
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 2.5)
      .attr("paint-order", "stroke");

    node.on("click", (event, d) => {{
      selectNode(d);
    }});

    function selectNode(d) {{
      document.getElementById("side-category").textContent = d.category;
      document.getElementById("side-domain").textContent = d.domain;
      document.getElementById("side-title").textContent = d.title;
      document.getElementById("side-aphorism").textContent = d.aphorism ? `"${{d.aphorism}}"` : `[${{d.title}}]`;
      document.getElementById("side-summary").textContent = d.summary;
      
      const triggersEl = document.getElementById("side-triggers");
      triggersEl.innerHTML = "";
      if (d.triggers && d.triggers.length > 0) {{
        d.triggers.forEach(t => {{
          const li = document.createElement("li");
          li.textContent = t;
          triggersEl.appendChild(li);
        }});
      }} else {{
        triggersEl.innerHTML = "<li>No specific triggers listed.</li>";
      }}
    }}

    simulation.on("tick", () => {{
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${{d.x}},${{d.y}})`);
    }});

    function dragstarted(event, d) {{
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }}

    function dragged(event, d) {{
      d.fx = event.x;
      d.fy = event.y;
    }}

    function dragended(event, d) {{
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }}

    // Select first node by default
    if (data.nodes.length > 0) {{
      selectNode(data.nodes[0]);
    }}
  </script>
</body>
</html>
"""

def main():
    root_dir = Path(__file__).resolve().parent.parent
    docs_dir = root_dir / "docs"
    docs_dir.mkdir(parents=True, exist_ok=True)
    
    repo = ModelRepository()
    graph_data = build_graph_data(repo)
    html_content = generate_html(graph_data)
    
    out_file = docs_dir / "graph.html"
    out_file.write_text(html_content, encoding="utf-8")
    print(f"Generated interactive knowledge graph at: {out_file.resolve()}")
    print(f"  Nodes: {len(graph_data['nodes'])}, Links: {len(graph_data['links'])}")

if __name__ == "__main__":
    main()
