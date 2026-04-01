# web/

React 18 + TypeScript SPA built with Vite. The game's entire UI lives here.

## Running

```bash
cd web
npm install
npm run dev        # dev server on :5173, proxies /ws /api /dev /assets → :8000
npm run build      # TypeScript check + Vite build → web/dist/
```

In production, `bridge.py` serves `web/dist/` as static files. In dev, Vite proxies hardware events from the bridge.

## File Map

```
src/
├── main.tsx                    # React root
├── App.tsx                     # Thin wrapper, renders GameShell
├── GameShell.tsx               # ★ Main game controller — start here
├── gameContent.ts              # Localized UI copy (EN/ES), fallback character data
├── gameTypes.ts                # TypeScript types mirroring characters.json
├── types.ts                    # Bridge WebSocket protocol types (v1)
├── hooks/
│   └── useBridgeWebSocket.ts  # WS connection + auto-reconnect every 1.2s
└── views/
    ├── LandingView.tsx
    ├── PlayingView.tsx
    ├── RiverAnimation.tsx      # ~400 lines canvas animation — modify carefully
    └── LanguagePickerOverlay.tsx
```

## Game State Flow

```
landing → (P key or Play button) → language_picker → playing → reveal → playing
```

All state lives in `GameShell.tsx`. Key state:

| Variable | Type | Description |
|----------|------|-------------|
| `lang` | `"en" \| "es"` | Current language |
| `view` | `"landing" \| "playing"` | Active screen |
| `scannedUid` | `string \| null` | Most recent RFID card UID |
| `confirmOpen` | `bool` | Accusation confirm modal open |
| `reveal` | `RevealState \| null` | Final reveal (correct/incorrect + explanation) |

## Bridge Communication

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/ws` | WebSocket | Receive hardware events (tag, button, tag_removed, status) |
| `/api/characters` | GET | Fetch suspects, tag_map, culprit list |
| `/api/led` | POST | Set Pico LED color `{r, g, b}` |
| `/dev/event` | POST | Inject fake hardware events (dev mode only) |

All WebSocket messages include `schema: {name: "pollution-mystery.bridge", version: 1}`. Version mismatch → `parseBridgeWsMessage()` returns `null`.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `P` | Start game from landing |
| `D` | Toggle dev control panel |
| `Esc` | Close dev panel or reveal modal |

Button hold: 1-second hold to confirm accusation (with animated progress).

## Localization

```ts
t(lang, "key")  // looks up in gameContent.ts
```

Add new strings to both `"en"` and `"es"` sections of `gameContent.ts`. Fallback characters are baked into `gameContent.ts` — app works without bridge for UI dev.

## Ref-Heavy State Patterns

`GameShell.tsx` uses many refs to avoid stale closures in keyboard/button handlers:

- `viewRef` — must be updated alongside `view` state
- `pickerLangRef` — tracks language selected in overlay
- `holdStartRef` / `holdProgressRef` — button hold-to-confirm tracking
- `awaitingButtonUpRef` — prevents double-fire on hold release
- `pickerOpenedThisPressRef` — ignores button release that opened the language picker

**Do not refactor these to state** without understanding the async event flow.

## Styling

- All styles in `src/index.css` (~600 lines), CSS variables for theme
- Theme: deep purple night sky, neon pink/mint accents
- Fonts: Nunito (primary), IBM Plex Sans (fallback)
- Uses `height: 100dvh` (dynamic viewport height) — kiosk-safe

## Dev Panel

Press `D` in-browser to open. Shows:
- WebSocket connection status + schema version
- Buttons to inject `tag`, `button`, `button_down`, `button_up`, `tag_removed`
- Last received WebSocket event

## Gotchas

- **`RiverAnimation.tsx` is ~400 lines of canvas code.** Treat it like a black box unless you need to change the visual.
- **No component library.** All UI (buttons, modals, overlays) is custom CSS.
- **Protocol versioning is strict.** Bumping `bridge_protocol.py` version requires updating `types.ts` in the frontend.
- **TypeScript types must mirror `characters.json`.** If you change the JSON schema, update `gameTypes.ts`.
- **Fallback characters in `gameContent.ts`** mean the UI works without a bridge — don't delete them.
- **Dev mode is controlled server-side** via `MYSTERY_DEV` env var; the frontend detects it from `schema.dev_mode` in status messages.
