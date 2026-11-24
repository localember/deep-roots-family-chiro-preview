#!/usr/bin/env python3
from pathlib import Path
import base64

src = Path("assets-b64")
dest = Path("assets")
dest.mkdir(exist_ok=True)
for p in sorted(src.glob("*.b64")):
    (dest / p.name[:-4]).write_bytes(base64.b64decode(p.read_text()))
    print("decoded", p.name)
parts = sorted(src.glob("welcome.mp4.part*"))
if parts:
    data = b"".join(base64.b64decode(p.read_text()) for p in parts)
    (dest / "welcome.mp4").write_bytes(data)
    print("decoded welcome.mp4", len(data), "from", len(parts), "parts")
