# Phase 14: Monorepo Platform & Publishing

## Objective
Evolve the repository into a stable monorepo that can build, test, version, and publish multiple packages independently (e.g., `@nexcraft/forge`, `@nexcraft/forge-rhf`) with minimal friction and strong Next.js/Turbopack compatibility.

## Scope
- Adopt npm workspaces for package management.
- Standardize ESM builds and `exports` fields across packages.
- Introduce Changesets for independent versioning and automated npm publishing.
- Add CI workflows for build/test and release.
- Author developer ergonomics (scripts, docs) for local dev and releases.

## Progress Checklist
- [ ] Root set to `private: true` with `workspaces` configured
- [ ] `packages/` directory created and wired into workspaces
- [ ] Packages import each other by name (no relative cross-imports)
- [ ] All packages ESM-only with explicit `exports` and `types`
- [ ] Shared TypeScript/ESLint/Vitest config validated across workspaces
- [ ] CI builds and type-checks all workspaces
- [ ] Next.js guidance documented (`transpilePackages`)
- [ ] Developer scripts added (build/test/type-check across workspaces)
- [ ] Changesets initialized (or link to Phase 15 for release setup)
- [ ] Monorepo docs finalized and linked from README

## Rationale (Why Monorepo)
- Shared tooling (TS, ESLint, Storybook, Vitest) reduces drift and maintenance.
- Local iteration across packages is fast and reliable.
- Clear ownership and visibility when multiple packages evolve together.

## Target Repository Layout
```
.
├─ package.json                # workspaces root (private)
├─ packages/
│  ├─ forge/                   # @nexcraft/forge (existing codebase or kept at root via workspace entry ".")
│  └─ forge-rhf/               # @nexcraft/forge-rhf (new package)
└─ shared configs (tsconfig, eslint, vitest, storybook)
```

Note: For a minimal migration, keep the existing package at root (`"."` in workspaces) and place new packages under `packages/*`. We can later move `@nexcraft/forge` into `packages/forge/` if desired.

## Work Plan (Step‑By‑Step)
1) Enable npm Workspaces
- Root `package.json` changes:
  - `"private": true`
  - `"workspaces": [".", "packages/*"]`
- Ensure each package has its own `package.json`, `build`, `type-check`, and `files/exports`.

2) Package Isolation & Imports
- Import across workspaces by package name (no relative cross-imports).
- Example: `@nexcraft/forge-rhf` imports `@nexcraft/forge/integrations/react`.
- Keep packages ESM-only and define explicit `exports` maps.

3) Standardized Build Outputs
- ESM only (`type: module`).
- Emit `.d.ts` and map via `exports` (`types` path included).
- Avoid mixing `main/module`; prefer `exports` as canonical.

4) Versioning & Releases (Changesets)
- Initialize Changesets:
  - `npm i -D @changesets/cli && npx changeset init`
- Flow:
  - Dev runs `npx changeset` → selects changed packages + bump type.
  - A “Version Packages” PR updates versions and changelogs.
  - On merge to `main`, CI runs `npx changeset publish` (publishes only changed packages).
- Configure `publishConfig.access: public` in each scoped package.

5) CI Workflows
- CI: Build & Test (on PR/Push)
  - `npm ci`
  - `npm run type-check --workspaces`
  - `npm run lint --workspaces` (optional)
  - `npm run test --workspaces` (optional or coverage in nightly)
  - `npm run build --workspaces`
- Release (on push to main)
  - Use NPM_TOKEN secret.
  - Build all workspaces.
  - `npx changeset publish`.

6) Node/Next.js Compatibility
- Node 18+ baseline.
- Next.js/Turbopack consumers: document `transpilePackages: ['@nexcraft/forge', '@nexcraft/forge-rhf']`.
- Keep packages pure ESM for smoother interop.

7) Optional Build Orchestration
- Turborepo or Nx can speed up builds/tests via caching and parallelization. Not required initially.

8) Developer Ergonomics
- Root scripts shortcuts (examples):
  - `build`: `npm run build --workspaces`
  - `type-check`: `npm run type-check --workspaces`
  - `test`: `npm run test --workspaces`
 - `release`: `npx changeset` (author changeset)
- Local publish testing:
  - `npm pack --workspace @nexcraft/forge-rhf`
  - `npm publish --workspace @nexcraft/forge-rhf --dry-run`

9) Security & Access
- Never commit tokens. Use `NPM_TOKEN` as a GitHub secret.
- Ensure `publishConfig.registry` points to npmjs unless overridden.

## Deliverables
- Workspace-enabled root `package.json`.
- `packages/forge-rhf` scaffolded and built.
- Changesets initialized with basic config.
- Release GitHub Action committed (uses Changesets publish).
- Updated docs for consumer apps (Next.js transpile guidance).

## Acceptance Criteria
- `npm run build --workspaces` succeeds locally and in CI.
- `npx changeset` produces a version PR that bumps only changed packages.
- On merge, `npx changeset publish` publishes changed packages to npm.
- Consumer Next.js app can import both packages with `transpilePackages` configured.

## Risks & Mitigations
- Version sprawl: Use Changesets and PR review discipline; keep adapters thin.
- Turbopack quirks: Keep ESM-only and explicit `exports`; document `transpilePackages`.
- Cross-package type drift: CI type-check all workspaces; pin peer ranges thoughtfully.

## References
- Phase 13 (Adapters Split): plans/phases/phase-13-react-hook-form-adapters-split.md
- Changesets: https://github.com/changesets/changesets
