#!/usr/bin/env python3
"""
Model Schema & Integrity Validator for The Mental Models Latticework.
Validates YAML frontmatter, required structural headings, and cross-references.
"""

import sys
import os
import re
from pathlib import Path

REQUIRED_FRONTMATTER = [
    "id",
    "title",
    "domain",
    "category",
    "summary",
    "triggers",
    "counter_models",
    "paired_models",
]

REQUIRED_HEADINGS = [
    "Core Intuition & Mechanism",
    "When to Apply",
    "Real-World Case Studies",
    "Failure Modes & Cognitive Blindspots",
    "The Latticework",
    "AI Agent Reasoning Protocol",
]

def parse_frontmatter(content: str):
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
    if not match:
        return None, "Missing opening/closing YAML frontmatter ('---')"
    
    yaml_text = match.group(1)
    data = {}
    current_key = None
    current_list = None
    
    for line in yaml_text.splitlines():
        line = line.rstrip()
        if not line or line.startswith("#"):
            continue
        
        # Check list item
        list_match = re.match(r"^\s+-\s+(.*)$", line)
        if list_match:
            if current_list is not None:
                current_list.append(list_match.group(1).strip().strip("'\""))
            continue
            
        # Key-value pair
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
    return data, None

def validate_model_file(path: Path):
    errors = []
    content = path.read_text(encoding="utf-8")
    
    frontmatter, err = parse_frontmatter(content)
    if err:
        return [err], {}
    
    # Validate required frontmatter keys
    for req in REQUIRED_FRONTMATTER:
        if req not in frontmatter:
            errors.append(f"Missing required frontmatter key: '{req}'")
        elif isinstance(frontmatter[req], list) and len(frontmatter[req]) == 0:
            errors.append(f"Frontmatter key '{req}' cannot be an empty list")
        elif isinstance(frontmatter[req], str) and not frontmatter[req].strip():
            errors.append(f"Frontmatter key '{req}' cannot be empty")
            
    # Validate required headings
    for heading in REQUIRED_HEADINGS:
        if not re.search(rf"^##.*{re.escape(heading)}", content, re.MULTILINE):
            errors.append(f"Missing required section heading matching: '## ... {heading}'")
            
    return errors, frontmatter

def main():
    root_dir = Path(__file__).resolve().parent.parent
    models_dir = root_dir / "models"
    
    if not models_dir.exists():
        print(f"Error: models directory '{models_dir}' not found.")
        sys.exit(1)
        
    model_files = list(models_dir.glob("**/*.md"))
    if not model_files:
        print(f"Warning: No model files found in '{models_dir}'.")
        sys.exit(0)
        
    print(f"Validating {len(model_files)} mental model files...")
    total_errors = 0
    all_models = {}
    
    for path in sorted(model_files):
        rel_path = path.relative_to(root_dir)
        errors, meta = validate_model_file(path)
        if errors:
            total_errors += len(errors)
            print(f"\n[FAIL] {rel_path}:")
            for e in errors:
                print(f"  - {e}")
        else:
            all_models[meta.get("id")] = meta.get("title")
            print(f"  [OK] {rel_path} ({meta.get('title')})")
            
    print("-" * 50)
    if total_errors > 0:
        print(f"Validation FAILED with {total_errors} error(s).")
        sys.exit(1)
    else:
        print(f"Validation PASSED! All {len(model_files)} models conform to specification.")
        sys.exit(0)

if __name__ == "__main__":
    main()
