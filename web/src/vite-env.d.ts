/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** When "true", hide dev hardware strip even in dev server (kiosk / exhibit). */
  readonly VITE_HIDE_DEV_UI?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
