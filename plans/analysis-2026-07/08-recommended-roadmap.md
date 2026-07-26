# Recommended Roadmap (2026-07)

> Part of the [July 2026 deep analysis](./README.md). This replaces `plans/implementation-roadmap.md` as the actionable plan; see [07-roadmap-assessment](./07-roadmap-assessment.md) for what happened to the old roadmap. Items cite the analysis doc that substantiates them.

## Phase 0 — Do regardless of path (½ day) 🔴

| # | Action | Why |
|---|--------|-----|
| 0.1 | **Rotate the npm token + 3 Discord webhooks** found in `.env`; re-issue the matching GitHub Actions secrets (`NPM_TOKEN`, `DISCORD_WEBHOOK_*`). Delete `.env` or replace with `.env.example` | Live credentials in plaintext on disk; the npm token publishes all 6 packages. Never committed (verified), but treat as exposed |
| 0.2 | `git pull` — local develop is 4 commits behind origin | Working on a stale base |
| 0.3 | Decide: **Revive (A)**, **Freeze (B)**, or explicitly accept status quo (C) | Everything below depends on this |

## Path B — Freeze honestly (~2 days total)

If Forge isn't going to be used or maintained: 0.1–0.3, then:

1. Merge the 10 CI-green dependabot PRs (or close them), release develop → main so the Vite/esbuild security fix and 99 pending commits actually ship as a final `0.11.0`.
2. One honesty pass on README: fix/remove the coverage, bundle-size, and WCAG badges; fix the dead `github.com/nexcraft/forge` clone URL; note maintenance status at top.
3. Add `license: "MIT"` + LICENSE file to forge-tokens and forge-mcp-figma; publish patch versions (they're currently license-less on the registry).
4. `npm deprecate` the packages with a maintenance notice (or at minimum retire the stale `beta` dist-tag, which currently downgrades users to 0.8.0-beta.0).
5. Archive the GitHub repo; delete stale branches.

Done — a defensible, honest end-state.

## Path A — Revive

### Phase 1 — Truth reconciliation (~1 week) 🔴
*The project's own `priorities/01-immediate-priorities.md` (Oct 2025) already admitted the positioning was premature. Make every public claim generated-or-deleted.*

1. **README**: regenerate coverage badge from `coverage-summary.json` (85.5%, not 86.4/87.2); replace "<10KB" with measured sizes (91KB gzip full, until Phase 3 fixes selective imports); scope the WCAG badge to what's tested (or hold until Phase 4); reconcile component counts to one number (30 registered elements; add avatar + data-grid to the catalog); remove the 3 nonexistent npm scripts (`test:e2e`, `test:visual`, `test:all`) and the Chromatic claim; fix `nexcraft` → `dev-ignis` org links. *[09-fact-check]*
2. **package.json**: remove dead `files`/`exports` entries (`ai-tools/`, `docs/patterns/`) and the dead `ai.*` URLs; add `engines`; replace `workspace:*` with `*`; delete or fix the vestigial `publish-packages` script. *[04, 09]*
3. **AI instruction files**: fix the removed `@nexcraft/forge/integrations/react` import path in `.cursorrules` / `claude-instructions.md` / `.github/copilot-instructions.md` (→ `@nexcraft/forge-react`), then generate the three from one source. *[06]*
4. **Docs**: run a link checker in CI (52 dead links, one systemic cause — the atoms/molecules/organisms re-org); delete or rewrite `plans/README.md` (9 dead links); fix the phantom "2.0.0" CHANGELOG headings in all four wrapper packages. *[06, 07, 05]*
5. **Licenses**: forge-tokens + forge-mcp-figma (as in Path B item 3). *[05]*

### Phase 2 — Ship what exists + fix real bugs (~1 week) 🔴→🟠

1. Merge the 10 dependabot PRs, re-enable the auto-disabled `security-audit-nightly` workflow, fix `auto-label.yml` (16/16 runs failed on a one-line YAML bug), upgrade vitest to ≥3.2.6 (2 critical CVEs in the frozen version). *[04, 05]*
2. Fix shipped bugs, roughly in user-impact order: *[03]*
   - tree-view: selected/disabled CSS classes never match the stylesheet (visual bug) + delete the ~70-line orphaned `renderNode()`
   - multi-select: escape regex metacharacters in `highlightMatch()` (crash)
   - form-field: `getAriaDescribedBy()` hardcoded IDs → interpolate `${this.name}` (a11y)
   - select: move `filteredOptions`/`searchQuery` reassignment out of `updated()` (`select.ts:395-396`, root cause of the Lit warning, exactly traced) + fix `aria-labelledby`/`aria-describedby` pointing at nonexistent IDs
   - button: implement or remove `ghost`/`link` variants; reconcile `PerformanceMode` type with BaseElement's
   - icon: sanitize fetched SVG before `unsafeHTML` (or drop remote `src` support); same decision for tooltip's `htmlContent`
   - data-grid: remove stubbed features (column resize/reorder/pinning/aggregates/rich editors) from types + docs, or implement them
3. Release `0.11.0` from develop → main (ships the 99-commit backlog including the Vite/esbuild fix).

### Phase 3 — Make the differentiator real (~1–2 weeks) 🟠
*"AI-native" is the only reason this library stands out; it's currently ~70% real at runtime and ~50% real in shipped artifacts.*

1. **Fix distribution correctness (ADR-011, designed but never built):** per-component entry points that import only that component's module graph, `sideEffects: ["*.css", "./dist/exports/*.js"]` (or define.js pattern), kill the dead `globalThis.NexcraftForge` lookup, fix the `./tooltip` subpath (throws at runtime today) and add an exports entry for `src/utils` (2,129 LOC currently unreachable). The esbuild repro in [04] shows this is shipped breakage, not a hypothetical. This simultaneously fixes tree-shaking *and* makes "<10KB per component" achievable for real. *[04, 02]*
2. **Manifest generator**: replace the regex scraper with TS AST (ts-morph) so ~1/3 of components stop degrading to placeholders; derive `category` from the directory (everything is "atom" today); filter props to public API; wire `ai-manifest.schema.json` into the validator (it's decorative today); add a CI drift gate (`regenerate && git diff --exit-code`). *[02]*
3. **Runtime metadata**: backfill `aiMetadata` on the 10 components still returning the generic "UI Component" stub; fix button's rich static metadata never reaching the instance field; standardize on BaseElement's `checkPerformance` (today: 4 incompatible reimplementations, 10/29 correct users). *[02, 03]*
4. **Docs as data**: regenerate every component doc's Properties/Events/Methods tables from custom-elements.json (40/43 documented organism methods are fabricated — hand-fixing isn't sustainable). *[06]*
5. **forge-mcp-figma**: implement actual MCP (`@modelcontextprotocol/sdk` — initialize/tools.list/tools.call) or rename it; today a real MCP client's handshake fails. If implemented, register it in the AI docs as the flagship proof of "AI-native." *[05]*

### Phase 4 — Quality gates & credibility (~1–2 weeks) 🟡

1. axe-core a11y tests for all 29 components (today: 5), via `*.a11y.test.ts` naming instead of the fragile name-regex split; then the WCAG badge can return with evidence. *[04]*
2. Tests for the untested surfaces: all 6 workspace packages (currently zero tests), `ai-metadata-exporter/validator` (1,295 LOC, deliberately excluded from coverage), BaseElement itself (no dedicated spec; `trapFocus()` is dead code — use it in modal or delete it). *[02, 04, 05]*
3. CI: lint/typecheck forge-vue + forge-angular on PRs (today only forge-react is checked pre-release — this already caused a broken v1.0.0); npm publish provenance (`id-token: write` + `--provenance`); consider 2FA/automation tokens. *[04, 05]*
   - **Lint gate is vacuous for components (found 2026-07 during cleanup):** `lint:local`'s unquoted `src/**/*.ts` glob never matches nested component files (bash without globstar), so component lint has silently passed forever; the husky lint-staged hook *does* lint them by explicit path and fails on ~18 latent errors (`no-undef 'performance'`, unused imports) across many components. Fix the glob (e.g. `eslint src`), burn down the latent errors, then re-enable the hook path (the components bug-fix commit used `--no-verify` for this reason).
4. Dependency catch-up: TypeScript (2 majors), vite/vitest/storybook/eslint (1 major each); demos: fix vue-app's failing build (2 TS errors), un-pin stale core versions, fix or remove the dead `forge.ignis.dev` demo links. *[05]*
5. Housekeeping: retire the `beta` dist-tag, clean the anomalous `0.7.2-beta.0` version lineage before the next prerelease, delete stale branches, update `plans/` (mark this analysis as the current roadmap). *[05, 07]*

## What NOT to restart (from the old roadmap)

Per [07-roadmap-assessment](./07-roadmap-assessment.md): Phase 11 (0% started) and the never-built File Upload component shouldn't be revived until Phases 1–3 above are done; Phase 12's RHF conclusion is contradicted by reality (forge-rhf exists and is published — the doc needs rewriting, not the code); `plans/README.md` links 9 deleted files and should be replaced, not patched.

## Effort summary

| Path | Calendar effort | Outcome |
|---|---|---|
| B — Freeze | ~2 days | Honest, secure, archived |
| A Phase 1–2 | ~2 weeks | Honest claims, bugs fixed, backlog shipped |
| A Phase 3 | +1–2 weeks | "AI-native" and tree-shaking actually true |
| A Phase 4 | +1–2 weeks | Defensible quality claims, sustainable gates |
