import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    fs: {
      allow: [repoRoot],
    },
    // Bridge: /api, /ws, /dev/* (e.g. POST /dev/event), /assets from repo root
    proxy: {
      // Use http target so the dev server can upgrade to WebSocket reliably.
      "/ws": { target: "http://127.0.0.1:8000", ws: true, changeOrigin: true },
      "/api": "http://127.0.0.1:8000",
      "/dev": "http://127.0.0.1:8000",
      "/assets": "http://127.0.0.1:8000",
    },
  },
});
