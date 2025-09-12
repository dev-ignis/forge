# Repository Guidelines

## Project Structure & Module Organization
- Source code lives in `src/`:
  - Components: `src/components/{atoms|molecules|organisms}/<component>/<component>.ts`
  - Core utilities and types: `src/core/`, `src/utils/`, `src/types/`
  - Framework bindings: `src/integrations/{react|vue|angular}`
  - Tests alongside code: `src/**/*.{test,spec}.ts`
- Documentation in `docs/`; examples in `examples/` and `demo/`.
- Build artifacts in `dist/` (do not edit by hand).

## Build, Test, and Development Commands
- `npm run dev` — Start Vite dev server.
- `npm run build` — Build library + generate and bundle types.
- `npm run preview` — Preview built output.
- `npm run storybook` / `npm run build-storybook` — UI docs locally / static build.
- `npm run test` / `npm run test:watch` — Run Vitest once / watch mode.
- `npm run test:coverage` — Run tests with coverage.
- `npm run type-check` — Strict TypeScript checks.
- `npm run lint` / `npm run format` — ESLint checks / Prettier format.
- `npm run generate:component` — Scaffold a new component.

## Coding Style & Naming Conventions
- Language: TypeScript (ES2020 modules), strict mode.
- Linting: ESLint with `@typescript-eslint`; formatting via Prettier.
- Web Components use kebab-case selectors (e.g., `nc-button`). Classes/types use PascalCase.
- Files and folders in components use kebab-case; tests end with `.test.ts` or `.spec.ts`.
- Do not modify generated files (`*.d.ts`, `dist/**`).

## Testing Guidelines
- Framework: Vitest (`happy-dom` env). Setup at `src/test/setup.ts`.
- Location: colocated tests under `src/**`.
- Coverage thresholds: 70% for branches, functions, lines, statements.
- Example: `npm run test:coverage` then open `coverage/index.html`.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, etc.
- Commits should be concise and scoped to one change.
- PRs must include: clear description, linked issues, test evidence (output or screenshots), Storybook notes/screenshots for UI changes, and updated docs when applicable.
- Before opening a PR: `npm run lint && npm run test:coverage && npm run build`.

## Security & Configuration Tips
- Node 18+ recommended (Vite 5). Never commit secrets.
- Prefer `npm run generate:component` to ensure structure and metadata are consistent.
- When integrating frameworks, keep changes within `src/integrations/` and avoid leaking DOM globals.

