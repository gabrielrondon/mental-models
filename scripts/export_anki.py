#!/usr/bin/env python3
"""
Anki Spaced Repetition Exporter for The Mental Models Latticework.
Exports mental models into standard TSV flashcards ready for Anki import.
"""

import sys
import re
import csv
from pathlib import Path

# Add cli directory to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "cli"))
from mm_core import ModelRepository

def extract_checklist(raw_body: str) -> list[str]:
    items = []
    checklist_match = re.search(r"## 2\. When to Apply.*?\n(.*?)(?=\n## 3\.|\Z)", raw_body, re.DOTALL)
    if checklist_match:
        section = checklist_match.group(1)
        for line in section.splitlines():
            line = line.strip()
            if line.startswith("- [ ]") or line.startswith("* [ ]"):
                cleaned = line.replace("- [ ]", "").replace("* [ ]", "").strip()
                # strip bolding for clean card display
                cleaned = re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", cleaned)
                items.append(cleaned)
    return items

def extract_mechanism(raw_body: str) -> str:
    mech_match = re.search(r"## 1\. Core Intuition & Mechanism.*?\n(.*?)(?=\n---|\n## 2\.|\Z)", raw_body, re.DOTALL)
    if mech_match:
        paragraphs = [p.strip() for p in mech_match.group(1).split("\n\n") if p.strip()]
        if paragraphs:
            return "<br><br>".join(paragraphs[:2])
    return ""

def export_anki(repo: ModelRepository, output_path: Path):
    models = repo.get_all()
    cards = []
    
    for m in models:
        checklist = extract_checklist(m["raw_body"])
        mechanism = extract_mechanism(m["raw_body"])
        
        # Card 1: Conceptual Mechanism & Aphorism
        q1 = f"<b>[Mental Model]</b> What is the core intuition and mechanism behind <b>{m['title']}</b>?"
        quote_html = f"<blockquote style='color:#d97706;'>\"{m['aphorism']}\"</blockquote><br>" if m['aphorism'] else ""
        a1 = (
            f"<h3>{m['title']}</h3>"
            f"<p><i>{m['category']} | {m['domain']}</i></p><br>"
            f"{quote_html}"
            f"<p><b>Summary:</b> {m['summary']}</p><br>"
            f"<b>Mechanism:</b><br>{mechanism}"
        )
        tags1 = f"mental-models {m['category'].lower().replace(' ', '-').replace('&', 'and')}"
        cards.append((q1, a1, tags1))
        
        # Card 2: Situational Triggers & Diagnostic Checklist
        q2 = f"<b>[Decision Playbook]</b> When should you trigger <b>{m['title']}</b>, and what key questions should you ask?"
        
        triggers_html = "<ul>" + "".join(f"<li>{t}</li>" for t in m['triggers']) + "</ul>" if m['triggers'] else "<p>None listed</p>"
        checklist_html = "<ol>" + "".join(f"<li>{c}</li>" for c in checklist) + "</ol>" if checklist else "<p>Review model file for details.</p>"
        
        a2 = (
            f"<h3>{m['title']} — Diagnostic Checklist</h3><br>"
            f"<b>Situational Triggers:</b><br>{triggers_html}<br>"
            f"<b>Diagnostic Questions to Ask:</b><br>{checklist_html}"
        )
        tags2 = f"mental-models diagnostics {m['category'].lower().replace(' ', '-').replace('&', 'and')}"
        cards.append((q2, a2, tags2))
        
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f, delimiter="\t")
        for q, a, t in cards:
            writer.writerow([q, a, t])
            
    return len(cards)

def main():
    root_dir = Path(__file__).resolve().parent.parent
    export_file = root_dir / "exports" / "mental_models_anki.tsv"
    
    repo = ModelRepository()
    count = export_anki(repo, export_file)
    
    print(f"Successfully generated {count} Anki flashcards at:")
    print(f"  {export_file.resolve()}")
    print("\nHow to import into Anki:")
    print("  1. Open Anki Desktop -> File -> Import...")
    print("  2. Select 'mental_models_anki.tsv'")
    print("  3. Set Field Separator to 'Tab', and enable 'Allow HTML in fields'")
    print("  4. Map Field 1 -> Front, Field 2 -> Back, Field 3 -> Tags")

if __name__ == "__main__":
    main()
