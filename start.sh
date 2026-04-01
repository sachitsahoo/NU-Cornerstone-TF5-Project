#!/bin/bash

# Trap EXIT and common signals to kill all child processes
cleanup() {
    echo ""
    echo "Shutting down..."
    kill "$BRIDGE_PID" "$NPM_PID" 2>/dev/null
    wait "$BRIDGE_PID" "$NPM_PID" 2>/dev/null
    echo "Done."
}
trap cleanup EXIT INT TERM HUP

# Save real terminal stdin before any subprocess can consume it
exec 3<&0

# Activate venv if present
if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
fi

# Start bridge.py in background (stdin redirected so it can't consume the terminal)
python bridge.py </dev/null &
BRIDGE_PID=$!
echo "Bridge started (PID $BRIDGE_PID)"

# Start npm run dev in background (stdin redirected)
cd web
npm install --silent </dev/null
npm run dev </dev/null &
NPM_PID=$!
cd ..
echo "npm dev started (PID $NPM_PID)"

# Watch the real terminal stdin (fd 3) for EOF — fires when the tab closes
( cat <&3 >/dev/null; kill -HUP $$ 2>/dev/null ) &

# Keep script alive until both processes exit (compatible with bash 3 on macOS)
while kill -0 "$BRIDGE_PID" 2>/dev/null || kill -0 "$NPM_PID" 2>/dev/null; do
    sleep 1
done
