import json
import os

with open(".firecrawl/okrs_2027_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

axes = data["AXES"]
objs = data["OBJ"]

lines = []
lines.append("# OKRs Ciberseguridad 2027\n")
lines.append("> **Resumo**: 4 bloques estratégicos + 2 ejes transversales · objetivos cuantitativos, KPI y dependencias cruzadas (Cyber y DT&D)")
lines.append("> **Fonte Original**: https://claude.ai/artifact/LRGKyyAP8pN879w18iRiLA")
lines.append("> **Extraído via**: Firecrawl (Full Scrape & Extraction de todas as partes)\n")

lines.append("## Índice de Ejes y Bloques\n")
for aid, axis in axes.items():
    count = sum(1 for o in objs.values() if o["axis"] == aid)
    label = axis["label"]
    name = axis["name"]
    lines.append(f"- **{label}: {name}** ({count} objetivos)")

lines.append("\n---\n")

for aid, axis in axes.items():
    label = axis["label"]
    name = axis["name"]
    para_que = axis["paraQue"]
    lines.append(f"## {label}: {name}\n")
    lines.append(f"**Propósito / Para qué:**\n> {para_que}\n")
    lines.append(f"### Objetivos de {label}\n")
    
    axis_objs = [(oid, o) for oid, o in objs.items() if o["axis"] == aid]
    for oid, o in axis_objs:
        title = o["title"]
        desc = o["desc"]
        kpi = o["kpi"]
        lines.append(f"#### `[{oid}]` {title}\n")
        lines.append(f"- **Descripción**: {desc}")
        lines.append(f"- **KPI 2027**: {kpi}")
        
        deps = o.get("deps", [])
        if deps:
            lines.append("- **Dependencias**:")
            for d in deps:
                if d.startswith("dtd:"):
                    lines.append(f"  - 🔷 **DT&D**: {d[4:]}")
                elif d in objs:
                    dep_title = objs[d]["title"]
                    lines.append(f"  - 🔒 **Cyber [{d}]**: {dep_title}")
                else:
                    lines.append(f"  - 🔗 {d}")
        else:
            lines.append("- **Dependencias**: *Sin dependencias registradas*")
        lines.append("")
    lines.append("---\n")

lines.append("## Tabla Consolidada de Todos los Objetivos (36 OKRs)\n")
lines.append("| ID | Eje / Bloque | Objetivo | KPI 2027 | Dependencias |")
lines.append("|---|---|---|---|---|")

for oid, o in objs.items():
    ax = axes[o["axis"]]
    ax_label = ax["label"]
    title = o["title"]
    kpi = o["kpi"]
    dep_list = []
    for d in o.get("deps", []):
        if d.startswith("dtd:"):
            dep_list.append("DT&D: " + d[4:])
        else:
            dep_list.append(d)
    dep_str = "; ".join(dep_list) if dep_list else "-"
    lines.append(f"| `{oid}` | {ax_label} | {title} | {kpi} | {dep_str} |")

content = "\n".join(lines) + "\n"

os.makedirs(".firecrawl", exist_ok=True)
os.makedirs("exports", exist_ok=True)

with open(".firecrawl/okrs_ciberseguridad_2027_completo.md", "w", encoding="utf-8") as f:
    f.write(content)

with open("exports/okrs_ciberseguridad_2027.md", "w", encoding="utf-8") as f:
    f.write(content)

print("Exported files successfully!")
