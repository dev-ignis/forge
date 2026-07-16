# Documentation Audit — @nexcraft/forge v0.10.0

Repo: `/home/air_buster/rollg/ignis/apps/forge` (branch `develop`, dormant since 2025-10-15)
Audience: project owner deciding whether/how to revive the project.

## TL;DR

The docs are extensive (71 markdown files under `docs/`, plus README, AGENTS.md, CHANGELOG, and AI-metadata JSON) and the folder taxonomy is sound in principle. But the corpus has visibly drifted out of sync with itself across two structural changes — the flat→`atoms/molecules/organisms` component-doc reorg and the monorepo framework-package split — and nobody ran a consistency pass afterward. Concretely: **22% of internal doc links are dead** (52/238), the README contradicts itself on component count five different ways in the same file, three of six spot-checked component API docs contain fabricated properties/events that don't exist in source, and — worst of all — the two files written specifically to steer AI coding assistants (`claude-instructions.md`, `.cursorrules`) instruct them to generate an import statement that was removed as a documented breaking change and structurally does not exist in `package.json`'s `exports` map. The "AI-native" pitch is the product's core differentiator, and it is the most broken part of the documentation. None of this is unfixable — it's mechanical drift, not conceptual rot — but a revival should not point new AI-assisted contributors at the current docs without a cleanup pass first.

## 1. Inventory

| Location | Files | Notes |
|---|---|---|
| `docs/` (root-level) | 14 | CONTRIBUTING, DEVELOPER_GUIDE, GETTING_STARTED, README, REPOSITORY-STRUCTURE, SECURITY, ai-manifest, component-annotation-guidelines, git-workflow, performance-dashboard-api, performance-monitoring, publishing-deployment-strategy, semantic-html-best-practices |
| `docs/guides/` | 14 | |
| `docs/integrations/` | 8 | react, vue, angular, react-hook-form, nextjs-integration, nextjs-15-app-router, remix, sveltekit |
| `docs/theming/` | 3 | token-bridge, token-migration-guide, token-reference |
| `docs/ai/` | 2 | integration-guide, metadata-reference |
| `docs/components/` | 30 | 1 hub README + atoms (14) + molecules (8) + organisms (7) |
| **`docs/` total** | **71** | matches `find docs -type f \| wc -l` |
| Repo root, docs-adjacent | 6 | README.md (580 lines), AGENTS.md, claude-instructions.md, .cursorrules, CODE_OF_CONDUCT.md, CHANGELOG.md |
| `plans/` (not under docs/, heavily cross-linked from it) | — | phases/, priorities/, adrs/ |
| Machine-readable AI metadata (repo root, shipped via `package.json` `files`) | — | `ai-index.json` (12KB), `ai-manifest.json` (157KB), `ai-manifest.schema.json`, `custom-elements.json` (1.38MB) |
| `storybook-static/` | — | a pre-built Storybook export committed to the repo, dated Oct 7 2025 |

Component doc **file-existence coverage is 100%**: all 29 real components (14 atoms, 8 molecules, 7 organisms — note `atoms/progress/` folder holds two components, `progress.ts` and `progress-circle.ts`) have a matching `docs/components/{category}/{name}.md`. Two additional shipped custom elements have no page: `forge-toast-container` (gets only a sub-section inside `toast.md`, acceptable) and `forge-performance-dashboard` (`src/utils/performance-dashboard.ts`, genuinely undocumented anywhere).

## 2. Accuracy findings, worst first

### 2.1 CRITICAL — AI-instruction files teach a broken, removed import path

`claude-instructions.md` and `.cursorrules` (byte-identical except the title line, confirmed via `diff`) instruct AI coding assistants, in five places (lines 14, 17, 108, 131, 158), to generate:

```javascript
import { ForgeButton, ForgeInput, ForgeCard } from '@nexcraft/forge/integrations/react'
import { RHFForgeInput, RHFForgeSelect } from '@nexcraft/forge/integrations/rhf'
```

`CHANGELOG.md`'s own 0.9.0 entry ("Phase 15 Complete: Framework Integration Package Split") documents this exact path as a **BREAKING CHANGE**, replaced by `@nexcraft/forge-react`. `package.json`'s `exports` map has no `./integrations/react` or `./integrations/rhf` key at all — the path is not deprecated, it structurally does not resolve. Any AI assistant (Cursor, Claude) following these files verbatim generates code that fails to import. The same broken path also appears inside `docs/components/atoms/button.md` (lines 33, 260, 278). By contrast, root `README.md` (L21, L239-242) correctly documents `@nexcraft/forge-react` — so the fix is known and already written down elsewhere, it just wasn't propagated to the files AI tools are told to read first.

The same two files also point at `./docs/ai-methods.md` (line 7), which doesn't exist, and reference an `./ai-tools/` directory (lines 216-217, 241) that is wired into `package.json`'s `exports`/`files` config but was never built — confirmed absent from the real published npm tarball (`npm pack @nexcraft/forge --dry-run`, 0.10.0, 136 files, no `ai-tools/*` entries).

### 2.2 HIGH — Component API docs contain fabricated properties and events

Spot-checked 6 of 29 components by diffing `@property()` declarations in source against each doc's Properties/Events table:

| Component | Verdict | Detail |
|---|---|---|
| `button.ts` vs `atoms/button.md` | **Inaccurate** | Doc lists `rippleDisabled`, `autoFocus` (0 hits in source) and events `forge-click`, `loading-start`, `loading-end` (source only emits plain `click`). Real props `iconStart`/`iconEnd` (button.ts:314-315) are missing from the doc; every doc example instead uses `<ForgeIcon slot="start">`, which the component's own internal warning explicitly discourages (button.ts:156). |
| `select.ts` vs `atoms/select.md` | **Inaccurate** | Doc lists 7 properties with zero occurrences in source (`clearable`, `helpText`, `maxHeight`, `multiple`, `searchPlaceholder`, `success`, `warning`). Real properties are missing entirely, including `options` — the list of selectable options, arguably the component's most important prop. |
| `data-table.ts` vs `organisms/data-table.md` | **Inaccurate** | Doc documents `dataError`, `expandedRows`, `selectedRows`, `sortColumn`, `sortDirection` as public settable properties; source declares all five `@state() private` (internal Lit state, not public API). Real public props `pageSize`, `selectionMode`, `showPagination`, `responsiveMode` are absent from the doc. |
| `toast.ts`/`toast-container.ts` vs `molecules/toast.md` | **Mixed** | `ForgeToast` half matches source exactly. `ForgeToastContainer` sub-table documents `spacing`/`autoRemoveDelay`, neither a real `@property`; real prop `stackNewest` is undocumented. |
| `tree-view.ts` vs `organisms/tree-view.md` | Accurate | All 6 properties match, including kebab-case attribute names. |
| `avatar.ts` vs `atoms/avatar.md` | Accurate | All properties match. |

**3 of 6 have concrete, verifiable inaccuracies.** These are exactly the docs the "AI-native" pitch says agents should read to generate code — a reader (human or AI) trusting these tables produces components with nonexistent attributes and dead event listeners.

### 2.3 HIGH — Component count contradicts itself five ways within README.md

- L18: "26+ components"
- L128: "31 components"
- L257: "26 components"
- L265 + L434: "Atoms (12 components)" / "Total: 27 (12+8+7)" — undercounts the real 14 atoms by omitting `forge-avatar` and `forge-progress-circle`
- L499: "27 components"
- `ai-index.json`'s `summary.totalComponents`: **31** — the only rigorously computed number, and it agrees with none of the prose

`forge-avatar` has full source and a complete, accurate doc page but is never mentioned anywhere in README.md (`grep -c avatar README.md` → 0) — absent from the Component Index, the Atoms showcase table, and the count math.

### 2.4 MEDIUM-HIGH — 22% of internal doc links are dead (52 of 238 checked)

A full scan of `[text](target)` links across README, AGENTS.md, claude-instructions.md, .cursorrules, CODE_OF_CONDUCT.md, CHANGELOG.md, and everything under `docs/**` found 52 confirmed-dead internal links, in four patterns:

- **README → flat component paths (9 links, README.md L420-431):** links to `docs/components/{name}.md` for button/input/icon/alert/checkbox/badge/switch/radio-group/select — the files live under `docs/components/atoms/{name}.md`. The next 3 rows in the same table correctly use the `atoms/` prefix, showing the reorg happened mid-table and the older rows were never fixed.
- **Component-to-component "Related Components" links (~30 links across ≥13 files):** every one still points at the pre-reorg flat structure, e.g. `docs/components/atoms/avatar.md` links to `../button.md` instead of `./button.md`; `docs/components/organisms/data-table.md`, `tree-view.md`, `accordion.md`, `pagination.md`, `tabs.md`, `navigation-bar.md`, and `docs/components/molecules/multi-select.md` all have the same issue.
- **Dangling `./spinner.md` references (3 links):** `progress.md`, `progress-circle.md`, `skeleton.md` all link to a component that doesn't exist in `src/` either — likely planned/renamed but never shipped.
- **Named-but-missing peripheral docs:** `docs/troubleshooting.md`, `docs/api-reference.md`, `docs/accessibility-testing-guide.md`, `plans/architecture/component-architecture.md`, `docs/examples/` are referenced but don't exist; `docs/performance-monitoring-guide.md` and `docs/theming/migration-guide.md` are referenced under the wrong filename (real files: `performance-monitoring.md`, `token-migration-guide.md`).

### 2.5 MEDIUM — `docs/patterns/` is referenced everywhere and exists nowhere

`package.json`'s `files` array (line 24) lists `docs/patterns/` for publishing; it does not exist. Cross-referenced from `package.json`'s `examples`/`patterns` URLs (lines 268, 271), `claude-instructions.md`/`.cursorrules` (line 243), `.github/copilot-instructions.md` (line 243), and the deployed site's own nav (`.github/workflows/deploy.yml` emits a `<a href="./patterns/">` button that 404s). `plans/priorities/01-immediate-priorities.md` (line 407) checks this off as done — "✅ Fix documentation shipping issues (added docs/patterns/ to package.json)" — but only the package.json entry was added, never the directory. `AI_COMPONENT_CATALOG.md` and `AI_COMMON_PATTERNS.md`, which CHANGELOG's 0.8.0 entry claims were created, don't exist anywhere in the repo.

### 2.6 MEDIUM — README points at a GitHub org that doesn't exist

`package.json`, `claude-instructions.md`, `.cursorrules`, and `demos/README.md` all correctly reference `github.com/dev-ignis/forge`. But README.md — the most user-facing doc — uses `github.com/nexcraft/forge` twice (L223 clone command, L530 GitHub link), matching the npm scope but not the actual org. Verified live: `nexcraft/forge` → 404, `dev-ignis/forge` → 200.

### 2.7 MEDIUM — Storybook link is dead by three different routes, and "Coming Soon" is false

README.md L531 says Storybook is "Coming Soon" at `nexcraft.github.io/forge`. In reality a `gh-pages` branch was last deployed 2025-09-08, a month before README's Oct 8 edit — so "Coming Soon" was already stale when written. All three plausible URLs are currently dead: the README's own URL (wrong org, 404), the CNAME'd custom domain `forge.ignis.dev` from the gh-pages branch (DNS resolution failure), and the org-correct `dev-ignis.github.io/forge/` (301-redirects into the dead custom domain). A full Storybook build sits in the repo (`storybook-static/`, Oct 7 2025) and the deploy pipeline (`.github/workflows/deploy.yml`) is coherent — it's just serving a domain that no longer resolves.

### 2.8 MEDIUM — AGENTS.md describes the pre-monorepo-split architecture

AGENTS.md (last touched Sep 16 2025) says framework bindings live at `src/integrations/{react|vue|angular}` (L7) — that directory doesn't exist; per CHANGELOG, framework integrations were extracted into standalone packages (`packages/forge-react`, etc.) before AGENTS.md's last edit. It also says examples live in `examples/` and `demo/` (L9); the real directory is `demos/` (plural). This matters more than typical staleness because `docs/REPOSITORY-STRUCTURE.md` explicitly defers all structural authority to AGENTS.md ("single source of truth"), so the staleness propagates to the one doc whose entire job is describing repo layout.

### 2.9 LOW-MEDIUM — Generated AI metadata has a categorization bug

`ai-index.json`'s `summary.categories` reports `{"atom": 31}` — every component, including organisms (`forge-data-table`, `forge-tree-view`) and molecules (`forge-modal`, `forge-toast`), is mistagged "atom." This is shipped data (published to npm, importable as `@nexcraft/forge/ai-index.json`), not prose — a bug in `scripts/generate-ai-index.js`'s categorization logic, not a typo.

### 2.10 LOW — CHANGELOG has duplicate version headers and a stale trailing inventory

`## 0.9.0` appears twice as a top-level header (line 79: tree-shaking/test refactor; line 130: framework-package split + Figma tokens) and `## 0.8.0` appears twice (line 119 brief; line 196 longer, different content) — likely an artifact of the Changesets tool merging `main`/`develop` release trains without consolidation. The trailing "Component Inventory" section (lines 323-329) claims "23+ Production-Ready Components... Atoms (9), Molecules (8), Organisms (6)" — a v0.4.0-era snapshot that was never updated as atoms grew 9→14 and organisms 6→7, sitting directly below accurate 0.10.0 entries at the top of the same file.

## 3. Consistency and duplication

- The "AI Manifest Files" narrative (README L33-130) is substantially re-told across 5 files — README.md, `docs/ai/integration-guide.md`, `docs/ai/metadata-reference.md`, `docs/guides/ai-native-development.md`, `claude-instructions.md`/`.cursorrules` — with the same ChatGPT/Claude/Copilot code samples repeated rather than referenced from one source. There is no single canonical source for the 3 AI methods, and changes evidently aren't propagated consistently — this is exactly how the broken import path in §2.1 survived while README's own copy was fixed.
- The "Design Token Bridge" (`TokenBridge.fromFigma(...)`) pitch is duplicated word-for-word **within README.md itself** (L144-148 and L316-327).
- `docs/components/README.md` (the component hub) and root README's "Components Showcase" maintain two independently stale component listings that don't agree with each other or with `src/` (see §2.3). The hub specifically omits `aspect-ratio.md`, `progress.md`, `progress-circle.md`, `skeleton.md`, and `data-grid.md` from its category lists (Atoms list has 10/14, Organisms 6/7) even though the doc files exist on disk — they're simply undiscoverable from the index.
- `docs/README.md` (the docs/ index) doesn't link to `docs/components/` at all, nor to `component-annotation-guidelines.md`, `semantic-html-best-practices.md`, or 4 of the 8 integration guides (`nextjs-15-app-router.md`, `react-hook-form.md`, `remix.md`, `sveltekit.md`). Root `CHANGELOG.md` has no link from `docs/README.md` either — it's fully disconnected from the docs index.

## 4. What's missing

- `docs/patterns/` directory (§2.5) — referenced from `package.json`, both AI-instruction files, and the deployed site nav; never created.
- `ai-tools/` directory (§2.1) — wired into `package.json` exports/files but never built; a whole promised layer of per-component, per-framework JSON schemas that doesn't exist.
- `AI_COMPONENT_CATALOG.md`, `AI_COMMON_PATTERNS.md` — claimed created in CHANGELOG 0.8.0, absent from the repo entirely.
- `docs/troubleshooting.md`, `docs/api-reference.md`, `docs/accessibility-testing-guide.md`, `plans/architecture/` — referenced from multiple docs, never created.
- A doc page for `forge-performance-dashboard` (`src/utils/performance-dashboard.ts`) — the one genuinely undocumented shipped component.
- A working, resolvable Storybook URL (§2.7).

## 5. Marketing claims vs. reality

- "The FIRST AI-Native component library" / "Industry First!" (README L14, L298, L316, L354) — unverifiable superlative, not checkable from the repo.
- Component count claims (§2.3) — directly checkable, directly contradicted 5 ways in one file.
- "<10KB per component" / "<10KB" bundle size badge (README L4, L360, L508) — not verified in this pass; would require building and measuring chunks.
- Test coverage: badge says **86.4%** (L5), body text says **87.2%** (L435) and "**90%+**" (L463) — three different numbers in one file; `coverage/index.html` on disk (dated 2025-10-03) was never used to reconcile them.
- "Storybook (Coming Soon)" — already deployed (to what is now a dead URL) a month before this line's last edit (§2.7).
- The `.storybook/addons/ai-panel/` custom Storybook addon appears to be a genuine, non-trivial AI-metadata panel — a legitimately distinctive feature, not just copy — but wasn't evaluated for correctness in this pass.

**Overall honesty assessment:** the underlying "AI-native" concept (machine-readable `ai-index.json`/`ai-manifest.json`, a JSON Schema, a custom Storybook AI panel) is real and reasonably well-executed as an idea. But the docs oversell its current state (dead Storybook link marked "Coming Soon," an `ai-tools/` layer that doesn't exist, a categorization field that's 100% wrong) and — critically — the two files whose entire purpose is steering AI assistants contain a broken import path that would cause those exact tools to generate non-functional code. That gap between pitch and reality is the single most damaging finding for a project marketing itself on AI-friendliness.

## 6. Recommendations

If reviving, fix in this order — each is small in isolation but they compound:

1. **Fix `claude-instructions.md` and `.cursorrules`** (§2.1) first — they're identical, so one edit fixes both. Replace `@nexcraft/forge/integrations/react` and `/integrations/rhf` with `@nexcraft/forge-react`, remove the `./ai-tools/` and `./docs/ai-methods.md` references (or build `ai-tools/` and follow through). This is the highest-leverage fix: it's actively misleading the exact audience (AI coding assistants) the project claims to serve.
2. **Re-verify and fix the 3 inaccurate component docs found here** (button, select, data-table — §2.2), then extend the same source-vs-doc diff to the remaining 23 components before trusting any of them for AI-assisted code generation.
3. **Run a link-check pass** across README + docs/** and fix the two structural patterns driving 39 of 52 dead links: the 9 flat-path links in README's showcase table, and the ~30 un-migrated "Related Components" links left over from the atoms/molecules/organisms reorg (§2.4). Both are single find-and-replace-shaped fixes, not one-off edits.
4. **Reconcile the component count** to one number (the AI-manifest's rigorously-computed 31, or 29 if toast-container/performance-dashboard are excluded) and propagate it to README's 5 conflicting locations and `docs/components/README.md`'s hub lists (§2.3).
5. **Decide on `docs/patterns/`** (§2.5): either build it (it's referenced from `package.json`, the AI-instruction files, and the live site nav) or strip every reference to it. Currently it's a checked-off TODO that was never actually done.
6. **Fix the GitHub org** (`nexcraft/forge` → `dev-ignis/forge`) in README.md (§2.6) and either fix the CNAME/deploy the correct domain or drop the dead Storybook link and claim (§2.7) — a live Storybook is a strong asset for reviving interest and the build already exists in the repo.
7. **Update AGENTS.md** to reflect the post-monorepo-split layout (§2.8) — this is the doc `docs/REPOSITORY-STRUCTURE.md` defers to, so fixing it fixes a second doc for free.
8. Lower priority, do during a broader cleanup: consolidate the CHANGELOG's duplicate 0.8.0/0.9.0 headers and delete or update the stale trailing inventory (§2.10); fix the `ai-index.json` categorization bug in `scripts/generate-ai-index.js` (§2.9); pick one canonical location for the AI-methods narrative instead of 5 (§3); reconcile the three different coverage-badge numbers (§5).

None of these require architectural decisions — they're consistency and truth-in-labeling fixes on top of a docs structure that's fundamentally reasonable. The AI-instruction fix (#1) and component-doc accuracy fixes (#2) should happen before any AI-assisted development resumes on this codebase, since the current docs would actively steer an AI agent toward broken code.
