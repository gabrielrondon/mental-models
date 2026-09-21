"""
Core engine for the Mental Models Latticework CLI.
Loads, parses, searches, and matches models using standard library only.
"""

import os
import re
import random
from pathlib import Path
from typing import Dict, List, Optional, Any

REPO_ROOT = Path(__file__).resolve().parent.parent
MODELS_DIR = REPO_ROOT / "models"

def parse_frontmatter(content: str) -> tuple[dict, str]:
    """Parse YAML frontmatter and return (metadata_dict, markdown_body)."""
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", content, re.DOTALL)
    if not match:
        return {}, content
    
    yaml_text = match.group(1)
    body = match.group(2)
    data = {}
    current_key = None
    current_list = None
    
    for line in yaml_text.splitlines():
        line = line.rstrip()
        if not line or line.startswith("#"):
            continue
        
        list_match = re.match(r"^\s+-\s+(.*)$", line)
        if list_match:
            if current_list is not None:
                current_list.append(list_match.group(1).strip().strip("'\""))
            continue
            
        kv_match = re.match(r"^([a-zA-Z0-9_]+):\s*(.*)$", line)
        if kv_match:
            key, val = kv_match.group(1), kv_match.group(2).strip()
            if not val:
                current_list = []
                data[key] = current_list
                current_key = key
            else:
                data[key] = val.strip("'\"")
                current_key = key
                current_list = None
                
    return data, body

class ModelRepository:
    def __init__(self, models_dir: Path = MODELS_DIR):
        self.models_dir = models_dir
        self._models: Dict[str, Dict[str, Any]] = {}
        self.load_models()

    def load_models(self):
        self._models.clear()
        if not self.models_dir.exists():
            return
            
        for file_path in sorted(self.models_dir.glob("**/*.md")):
            content = file_path.read_text(encoding="utf-8")
            meta, body = parse_frontmatter(content)
            model_id = meta.get("id") or file_path.stem
            
            # Extract aphorism/quote if present
            quote_match = re.search(r"^>\s*\"(.*?)\"", body, re.MULTILINE)
            aphorism = quote_match.group(1) if quote_match else ""
            
            self._models[model_id] = {
                "id": model_id,
                "title": meta.get("title", file_path.stem),
                "domain": meta.get("domain", "General"),
                "category": meta.get("category", file_path.parent.name),
                "summary": meta.get("summary", ""),
                "triggers": meta.get("triggers", []),
                "counter_models": meta.get("counter_models", []),
                "paired_models": meta.get("paired_models", []),
                "aphorism": aphorism,
                "file_path": file_path,
                "raw_body": body,
                "full_content": content,
            }

    def get_all(self) -> List[Dict[str, Any]]:
        return list(self._models.values())

    def get(self, model_id: str) -> Optional[Dict[str, Any]]:
        # Match by ID or exact title (case-insensitive)
        if model_id in self._models:
            return self._models[model_id]
        
        clean_target = model_id.lower().replace("-", " ").strip()
        for m in self._models.values():
            if m["id"].lower() == model_id.lower():
                return m
            if m["title"].lower() == clean_target:
                return m
        return None

    def search(self, query: str) -> List[Dict[str, Any]]:
        query_words = query.lower().split()
        results = []
        
        for m in self._models.values():
            searchable_text = f"{m['title']} {m['domain']} {m['category']} {m['summary']} {' '.join(m['triggers'])} {m['raw_body']}".lower()
            
            # Simple relevance scoring
            score = 0
            if query.lower() in m["title"].lower():
                score += 10
            if query.lower() in m["summary"].lower():
                score += 5
            
            all_match = True
            for word in query_words:
                if word in searchable_text:
                    score += 1
                else:
                    all_match = False
            
            if all_match or score >= 5:
                results.append((score, m))
                
        results.sort(key=lambda x: x[0], reverse=True)
        return [item[1] for item in results]

    def diagnose(self, dilemma: str) -> List[Dict[str, Any]]:
        """Match a problem description against situational triggers and core themes."""
        dilemma_lower = dilemma.lower()
        scored_models = []
        
        keyword_weights = {
            "legacy": ["chestertons-fence", "first-principles"],
            "rewrite": ["chestertons-fence", "first-principles", "second-order-thinking"],
            "slow": ["theory-of-constraints", "feedback-loops"],
            "bottleneck": ["theory-of-constraints"],
            "queue": ["theory-of-constraints", "margin-of-safety"],
            "outage": ["inversion", "margin-of-safety", "antifragility"],
            "crash": ["inversion", "margin-of-safety", "ergodicity"],
            "risk": ["ergodicity", "expected-value", "asymmetric-payoffs", "margin-of-safety"],
            "loss": ["loss-aversion", "asymmetric-payoffs"],
            "cost": ["opportunity-cost", "first-principles"],
            "priority": ["opportunity-cost", "theory-of-constraints"],
            "competition": ["red-queen-effect", "ooda-loop", "network-effects"],
            "fast": ["ooda-loop"],
            "growth": ["feedback-loops", "network-effects"],
            "viral": ["network-effects", "feedback-loops"],
            "bias": ["base-rate-fallacy", "loss-aversion", "map-vs-territory"],
            "estimate": ["base-rate-fallacy", "margin-of-safety", "map-vs-territory"],
            "conflict": ["hanlons-razor"],
            "malice": ["hanlons-razor"],
            "simple": ["occams-razor", "first-principles"],
            "complex": ["occams-razor", "second-order-thinking", "feedback-loops"],
            "fail": ["inversion", "antifragility", "ergodicity"],
        }
        
        for m in self._models.values():
            score = 0
            # Check trigger matches
            for trig in m["triggers"]:
                trig_words = [w for w in trig.lower().split() if len(w) > 3]
                matches = sum(1 for w in trig_words if w in dilemma_lower)
                if matches > 0:
                    score += matches * 2
            
            # Check keyword map
            for kw, target_ids in keyword_weights.items():
                if kw in dilemma_lower and m["id"] in target_ids:
                    score += 4
                    
            if score > 0:
                scored_models.append((score, m))
                
        scored_models.sort(key=lambda x: x[0], reverse=True)
        return [item[1] for item in scored_models[:5]]

    def random_model(self) -> Dict[str, Any]:
        return random.choice(list(self._models.values()))
