# @nexcraft/forge

[![npm version](https://img.shields.io/npm/v/@nexcraft/forge.svg)](https://www.npmjs.com/package/@nexcraft/forge)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1-AA-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![AI‑Native](https://img.shields.io/badge/AI‑Native-purple.svg)](./docs/ai-metadata-system.md)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

Future‑proof, AI‑native web components with first‑class React/Vue/Angular integrations, a design token bridge, and built‑in performance monitoring.

## Quick Start

- CDN
  ```html
  <script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge"></script>
  <forge-button variant="primary">Click Me</forge-button>
  ```
- NPM
  ```bash
  npm install @nexcraft/forge
  ```
  ```ts
  import '@nexcraft/forge';
  ```

## Framework Integrations

- React: `npm install @nexcraft/forge-react` — docs: `docs/integrations/react.md`
- Vue: `npm install @nexcraft/forge-vue` — docs: `docs/integrations/vue.md`
- Angular: `npm install @nexcraft/forge-angular` — docs: `docs/integrations/angular.md`

Selective imports and Tailwind plugin:
- Selective: `import { ForgeButton } from '@nexcraft/forge/button'`
- Tailwind: `import forgePlugin from '@nexcraft/forge/plugin'`

## Documentation

- Getting Started: `docs/GETTING_STARTED.md`
- AI Metadata: `docs/ai-metadata-system.md`, `docs/ai-methods.md`, `ai-manifest.json`
- Theming (Token Bridge): `docs/theming/token-bridge-guide.md`
- Performance: `docs/performance-monitoring.md`
- Full docs index: `docs/README.md`

## Contributing

We welcome contributions! See `docs/CONTRIBUTING.md` and run:
```bash
npm run dev
npm run test
npm run lint
```

## License

MIT © Nexcraft Team

