#!/usr/bin/env python3
"""Emit web/src/characterEs.json from the canonical overlay file (single source of truth)."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "web" / "src" / "characterEs.json"
OUT = ROOT / "web" / "src" / "characterEs.json"


def main():
    if not SRC.exists():
        raise SystemExit(f"Missing {SRC}; edit characterEs.json directly.")
    data = json.loads(SRC.read_text(encoding="utf-8"))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Normalized {OUT} ({len(data)} characters)")


if __name__ == "__main__":
    main()
