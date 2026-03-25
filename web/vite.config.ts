import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Bridge: /api, /ws, /dev/* (e.g. POST /dev/event), /assets from repo root
    proxy: {
      "/ws": { target: "ws://127.0.0.1:8000", ws: true },
      "/api": "http://127.0.0.1:8000",
      "/dev": "http://127.0.0.1:8000",
      "/assets": "http://127.0.0.1:8000",
    },
  },
});
