Forge Vanilla Demo
===================

Quick vanilla JS app demonstrating `@nexcraft/forge` components with Vite.

Run Locally
- From repo root, build the library once so the demo can alias to local output:
  - `npm run build`
- Then start the demo:
  - `cd demos/vanilla-app`
  - `npm install`
  - `npm run dev`

Notes
- Vite alias: `vite.config.ts` prefers the local workspace build (`../../dist/nexcraft-forge.es.js`) when present. If missing, it falls back to the package dependency.
- Toasts: The demo uses `<forge-toast-container>` and the `toast` helper for feedback instead of native `alert`.
- Performance: `<forge-performance-dashboard>` is included to visualize live component metrics during interactions.
- Theming: Toggle light/dark/auto via `data-forge-theme` and CSS variables.

