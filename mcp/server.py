#!/usr/bin/env python3
"""
Model Context Protocol (MCP) Server for The Mental Models Latticework.
Exposes tools via JSON-RPC over stdio for LLM agents (Cursor, Claude, Antigravity, etc.).
"""

import sys
import json
from pathlib import Path

# Add cli directory to sys.path to reuse mm_core
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "cli"))
from mm_core import ModelRepository

repo = ModelRepository()

TOOLS = [
    {
        "name": "list_mental_models",
        "description": "List all mental models in the library categorized by discipline.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "description": "Optional category filter (e.g., 'Core Thinking & Reasoning', 'Systems & Complexity')"
                }
            }
        }
    },
    {
        "name": "get_mental_model",
        "description": "Retrieve full details, summary, diagnostic checklist, and AI protocol for a specific mental model.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "The unique ID or title of the model (e.g., 'chestertons-fence', 'first-principles')"
                }
            },
            "required": ["id"]
        }
    },
    {
        "name": "search_mental_models",
        "description": "Search mental models by keyword across definitions, triggers, and full markdown content.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "Search query string"
                }
            },
            "required": ["query"]
        }
    },
    {
        "name": "diagnose_dilemma",
        "description": "Match a strategic or technical dilemma to a recommended triad of complementary mental models.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "dilemma": {
                    "type": "string",
                    "description": "Description of the problem, architectural choice, or strategic conflict."
                }
            },
            "required": ["dilemma"]
        }
    }
]

def handle_call_tool(params):
    name = params.get("name")
    args = params.get("arguments", {})
    
    if name == "list_mental_models":
        category_filter = args.get("category")
        models = repo.get_all()
        if category_filter:
            models = [m for m in models if category_filter.lower() in m["category"].lower()]
        
        output = []
        for m in models:
            output.append({
                "id": m["id"],
                "title": m["title"],
                "category": m["category"],
                "domain": m["domain"],
                "summary": m["summary"],
                "triggers": m["triggers"][:3]
            })
        return {"content": [{"type": "text", "text": json.dumps(output, indent=2)}]}
        
    elif name == "get_mental_model":
        model_id = args.get("id")
        model = repo.get(model_id)
        if not model:
            return {"content": [{"type": "text", "text": f"Error: Mental model '{model_id}' not found."}], "isError": True}
        
        return {"content": [{"type": "text", "text": model["full_content"]}]}
        
    elif name == "search_mental_models":
        query = args.get("query", "")
        results = repo.search(query)
        output = [{
            "id": m["id"],
            "title": m["title"],
            "category": m["category"],
            "summary": m["summary"]
        } for m in results]
        return {"content": [{"type": "text", "text": json.dumps(output, indent=2)}]}
        
    elif name == "diagnose_dilemma":
        dilemma = args.get("dilemma", "")
        results = repo.diagnose(dilemma)
        output = [{
            "id": m["id"],
            "title": m["title"],
            "domain": m["domain"],
            "summary": m["summary"],
            "triggers": m["triggers"],
            "paired_models": m["paired_models"],
            "counter_models": m["counter_models"]
        } for m in results]
        return {"content": [{"type": "text", "text": json.dumps(output, indent=2)}]}
        
    else:
        return {"content": [{"type": "text", "text": f"Unknown tool: {name}"}], "isError": True}

def main():
    while True:
        line = sys.stdin.readline()
        if not line:
            break
        try:
            req = json.loads(line)
            req_id = req.get("id")
            method = req.get("method")
            
            if method == "tools/list":
                res = {"jsonrpc": "2.0", "id": req_id, "result": {"tools": TOOLS}}
            elif method == "tools/call":
                tool_res = handle_call_tool(req.get("params", {}))
                res = {"jsonrpc": "2.0", "id": req_id, "result": tool_res}
            elif method == "initialize":
                res = {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "protocolVersion": "2024-11-05",
                        "capabilities": {"tools": {}},
                        "serverInfo": {"name": "mental-models-mcp", "version": "1.0.0"}
                    }
                }
            else:
                res = {"jsonrpc": "2.0", "id": req_id, "error": {"code": -32601, "message": "Method not found"}}
                
            sys.stdout.write(json.dumps(res) + "\n")
            sys.stdout.flush()
        except Exception as e:
            err_res = {"jsonrpc": "2.0", "id": None, "error": {"code": -32603, "message": str(e)}}
            sys.stdout.write(json.dumps(err_res) + "\n")
            sys.stdout.flush()

if __name__ == "__main__":
    main()
