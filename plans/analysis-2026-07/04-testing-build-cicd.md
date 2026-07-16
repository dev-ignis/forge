# @nexcraft/forge — Testing, Build & Packaging, CI/CD, and Toolchain-Today Verdict

Repo: `/home/air_buster/rollg/ignis/apps/forge` · v0.10.0 · branch `develop` @ `73f3b59` (2025-10-15) ·
`origin/develop` is actually 4 commits ahead at `85238d0`; `origin/main` is at `164a357` (2025-11-11,
a Dependabot auto-merge — the true last activity on the project). Analysis date: 2026-07-13.

## TL;DR

The toolchain itself is in good shape: type-check, lint, the full unit-test suite, and the core
build all pass cleanly today, nine months untouched, with zero code changes required. That is the
good news, and it's a genuine, verifiable positive signal for reviving the project.

Everything the README uses to sell the library, however, is materially overstated or broken.
Coverage is 85.5%, not the 86.4%/87.2%/90%+ claimed in three different places in the same README.
The flagship "AI-native" export/validation subsystem (1,295 lines) is quietly excluded from the
coverage metric and has zero tests. The "under 10KB, tree-shakeable" bundle claim is off by roughly
40-90x — the real bundle is 467KB raw / 91KB gzip — and the entire "selective imports" feature (29
of ~38 export map entries) doesn't just fail to deliver savings, it throws a runtime error under any
bundler that honors the package's own `sideEffects: false` declaration. CI/CD has one workflow
(`auto-label.yml`) that has failed 16/16 times since introduction due to a YAML syntax error, two
competing and partially-broken beta-release mechanisms, a stale `publish-packages` script that would
silently under-publish if anyone ran it, and a GitHub Pages deployment pointing at a dead domain.
`npm audit` reports 4 critical / 16 high / 6 moderate vulnerabilities, though the criticals are
dev-only tooling (vitest) not shipped to consumers.

None of this is a "the codebase is rotten" story — it's a "the marketing and the packaging drifted
away from the engineering, and nobody was watching CI for the last eight months" story. The
underlying component code, tests, and build pipeline are sound; the public-facing promises about
that code are not.

---

## 1. Testing

### 1.1 Real coverage vs. the README badge

The README's coverage badge reads **86.4%** (`README.md:5`). It is contradicted twice more in the
same file — "Overall Test Coverage: 87.2%" (`README.md:435`) and a table entry claiming 87.2%
"ACHIEVED" against an ">85%" target (`README.md:507`). None of these three numbers match what's
actually on disk.

The real, locally-generated coverage report (`coverage/index.html`, gitignored, timestamped
2025-10-04 — 11 days before the repo's last commit, so even this snapshot is slightly stale)
measures:

| Metric | Measured | README claims |
|---|---|---|
| Statements | 85.52% (8718/10193) | 86.4% (badge) / 87.2% (body, x2) |
| Branches | 84.56% (2132/2521) | — |
| Functions | 86.66% (650/750) | — |
| Lines | 85.52% (8718/10193) | 90%+ (`README.md:463`) |

The coverage config's own enforced threshold is only **70%** for branches/functions/lines/statements
(`vitest.config.ts`) — well below the ~85% actually achieved, so the gate wouldn't catch a
regression until coverage dropped roughly 15 points.

**Coverage by area** (statements %, from `coverage/index.html`):

| Area | Coverage | Note |
|---|---|---|
| `components/atoms/skeleton` | 100% | highest |
| `core` | 93.79% | |
| several molecules | >92% | |
| `components/atoms/icon` | 65.02% | lowest atom |
| `components/organisms/data-table` | 65.24% (functions 73.8%) | lowest organism |
| `components/organisms/data-grid` | 68.42% (functions **52.27%**) | weakest function coverage anywhere |
| `components/organisms/tree-view` | 72.26% | |
| `components/organisms/tabs` | 78.52% | |
| `components/atoms/checkbox` / `badge` | ~76% each | |
| `ai-metadata-exporter.ts` / `ai-metadata-validator.ts` | **not measured (excluded)** | see 1.2 |

The README's own per-component coverage table (`README.md:418-431`) is stale for a third of its
rows — Icon, Alert, Checkbox, and Badge are overstated by 13 to 24 percentage points versus the
current measured values (e.g. Badge claimed 100%, actually 75.92%). Input, Switch, RadioGroup, and
Skeleton match exactly, suggesting the table was accurate once and simply never regenerated.

### 1.2 The most consequential finding in this section: the AI export/validation subsystem is untested and hidden from the metric

`vitest.config.ts`'s coverage `exclude` list carves out `src/core/ai-metadata-exporter.ts` (734
lines) and `src/core/ai-metadata-validator.ts` (561 lines) — 1,295 lines total, with **zero test
files anywhere**. This exclusion was added silently in commit `9e8c88b` ("fix(test): resolve
coverage threshold failures by fixing configuration", 2025-09-29); the commit message justifies
excluding `packages/**` and `src/index.ts` but says nothing about these two files. This is the code
underpinning the library's flagship "AI training dataset export" and "AI metadata quality
validation" system — the core of its "AI-native" positioning — and it is both untested and
deliberately removed from the metric used to justify the coverage badge.

By contrast, per-component AI methods are genuinely well tested: `getPossibleActions()` appears in
26/30 component test files, `explainState()` in 25/30, `.aiState` assertions in 19/30, with
meaningful field-level checks (not just existence checks). The gap is specifically the
export/validation layer, not the per-component AI surface.

### 1.3 test:unit / test:a11y split — fragile, but not broken today

```
"test:unit": "vitest run -t \"^((?!WCAG|Accessibility Compliance).)*$\"",
"test:a11y": "vitest run -t \"WCAG|Accessibility Compliance\" --pool=forks --poolOptions.forks.singleFork=true"
```

The split is a pure Vitest `-t` name-regex filter against the full `describe`+`it` string — no
dedicated config, project, or file-naming convention. Verified by actually running both:
`test:unit` → 36 files, 1147 passed, 35 skipped (of 1182), 22.2s; `test:a11y` → 6 files matched
(all organism-tier: data-grid, tree-view, navigation-bar, pagination, accordion, tabs), 35 passed,
5.7s.

This is fragile in a way that hasn't yet caused a problem but easily could:

- Only 6 of 30 component test files match the `test:a11y` regex — zero atoms, zero molecules. 18
  other files *do* have accessibility-focused blocks, just named `describe('Accessibility', ...)`
  (singular, no "Compliance") — invisible to the regex, so those tests silently run under
  `test:unit` instead. Functionally harmless (everything still runs under `npm test`) but means
  `npm run test:a11y` alone is not a meaningful "run all accessibility tests" command — it only
  captures the 5 real axe-core scans (`.to.be.accessible()`, used in tabs, navigation-bar,
  accordion, pagination, tree-view).
- The whole mechanism depends on developers remembering an exact string ("WCAG" or "Accessibility
  Compliance," not "Accessibility" or "ARIA"), with no lint rule or CI check enforcing it. A rename
  silently reshuffles which bucket a test lands in.
- `test:coverage` runs `test:unit -- --coverage && test:a11y` — no `--coverage` on the second
  invocation, so whatever branches the 35 a11y-named tests uniquely exercise are invisible to the
  coverage numbers reported to CI/PRs.

### 1.4 Test quality spot-checks

The majority pattern is genuine behavior testing, not smoke tests: `button.test.ts` exercises real
DOM clicks, event-suppression on disabled/loading states, CSS class application, and a substantial
AI-methods block that calls `getPossibleActions()`/`explainState()` and asserts on structured
returned data with specific substrings.

Two categories of real quality problems were found, both narrow but worth knowing about before
trusting the suite as a safety net for a rewrite:

- **Tautological tests.** `button.test.ts:19-21` is a literal `expect(true).to.be.true` that tests
  nothing. `toast.test.ts:204-229` has two tests that only assert "no exception was thrown" for
  hover-pause and mouse interaction, explicitly commented as unable to test the real behavior.
- **Tests that duplicate rather than exercise production logic.** `icon.test.ts:138-184` sets a
  private field, then re-implements the exact performance-degradation `if` condition from
  `icon.ts` inline in the test itself, rather than triggering the real code path — meaning a
  regression in the actual render-timing logic would not be caught. Confirmed identical in **4
  files** (`icon.test.ts`, `badge.test.ts`, `switch.test.ts`, `checkbox.test.ts`), all in their
  "Performance Monitoring" blocks, likely because happy-dom renders are sub-millisecond and nobody
  mocked `performance.now()`.

**Flakiness risk:** real (non-fake) timers drive async assertions in `data-grid.test.ts` (6×
`setTimeout(..., 350)`, ≥2.1s of real wait) and `performance-dashboard.test.ts` (7×
`setTimeout(..., 150)`, ≥1.05s) — a documented historical flakiness source (commit `8537b73`:
"data-grid timeouts, WCAG tests with Axe race conditions"). Three other files use
`vi.useFakeTimers()` correctly, so the codebase knows the right pattern but applies it
inconsistently.

### 1.5 Untested components / packages

At the component level there is no gap: all 29 component source files under
`src/components/{atoms,molecules,organisms}` have a corresponding test file (100% file-level
coverage). The real gap is structural and much larger:

**All 6 npm workspace packages have zero test files** — `forge-angular`, `forge-mcp-figma`,
`forge-react`, `forge-rhf`, `forge-tokens`, `forge-vue`. These are separately published to npm with
no automated tests whatsoever for the React hooks, Vue composables, Angular directives,
react-hook-form integration, token generation, or the Figma MCP server. The root `vitest.config.ts`
never scans `packages/**`, so this isn't visible in any coverage number.

Two smaller items: `test-performance.js` is a dead, unintegrated performance-check script (not in
any npm script or CI workflow — the only place it's referenced is an exclusion in the coverage
config); and the README documents three test commands that don't exist in `package.json`
(`test:e2e`, `test:visual`, `test:all`) plus a "Visual regression (Chromatic)" claim that's aspirational
(only a Storybook addon is registered, no token, no CI job).

---

## 2. Build & Packaging

### 2.1 Exports map integrity

Walking every entry in `package.json`'s `exports` map against the filesystem: the core entries
(`.`, `./tokens.css`, `./plugin`, `./custom-elements.json`, `./ai-manifest.json`,
`./ai-index.json`) and all 29 component subpaths (`./button`, `./modal`, `./data-grid`, etc.)
resolve to real files. Two entries do not:

- **`./types/framework-integration` → `./dist/types/framework-integration.d.ts` does not exist.**
  `scripts/cleanup-types.js` unconditionally deletes `dist/types` after the `.d.ts` bundling step,
  but the exports map still points a subpath at a file inside that now-deleted directory. Any
  consumer importing this type errors with `TS2307: Cannot find module`.
- **`./ai-tools/* → ./ai-tools/*` — the directory doesn't exist anywhere in the repo.** It was
  deliberately deleted (commit `cc3f367`, "remove incomplete ai-tools/ folder ... Redundant with
  existing AI metadata systems"), but the `package.json` `files`/`exports` entries were never
  cleaned up, and `scripts/generate-ai-index.js` still writes `functionCalling: './ai-tools/'` into
  the published `ai-index.json` — the machine-readable metadata this library ships specifically
  for AI tooling consumption points at a path that was intentionally deleted nine months earlier.

Both were confirmed present in the exact broken form in the real published npm tarball for
`@nexcraft/forge@0.10.0` (byte-identical to the local `dist/`, per §2.2), so these are live issues
for anyone installing the package today, not local artifacts.

### 2.2 Actual bundle sizes vs. the <10KB claim

The README asserts `<10KB` bundle size in three places: the top badge (linking to bundlephobia),
`README.md:360` ("📦 Optimized Bundle | <10KB per component"), and `README.md:508` ("Bundle Size
(per component) | <10KB | <10KB | ✅ ACHIEVED"). Measured reality:

| Artifact | Raw | Gzip | vs. <10KB claim |
|---|---|---|---|
| `dist/nexcraft-forge.es.js` (main ESM) | 467,403 B (~467KB) | 91,239 B (~91KB) | ~46x / ~9x over |
| `dist/nexcraft-forge.umd.js` (main UMD) | 409,307 B (~409KB) | 84,362 B (~82KB) | ~41x / ~8x over |
| `dist/exports/button.js` (per-component shim) | 796 B | 426 B | technically under, but see below |
| `dist/exports/data-table.js` | 832 B | 435 B | " |
| `dist/exports/tree-view.js` | 821 B | 433 B | " |

The per-component shim files are individually tiny, but every one of them does a bare
`import '../nexcraft-forge.es.js'` — a side-effect-only import with zero bound specifiers — which
pulls in and evaluates the *entire* 467KB/91KB-gzip main bundle before extracting one class off the
global custom-element registry. So the effective cost of `import { ForgeButton } from
'@nexcraft/forge/button'` is not ~800 bytes, it's the full 91KB gzip, identical to importing
everything. This was verified byte-for-byte against the real npm registry tarball
(`@nexcraft/forge-0.10.0.tgz`) — not a stale local artifact.

### 2.3 sideEffects:false vs. custom-element registration — the tree-shaking claim is broken, empirically

`package.json:171` declares `"sideEffects": false` as a flat boolean (package-wide, no per-file
exceptions). This tells any conforming bundler it may drop any import whose bindings appear
unused. But every component self-registers via Lit's `@customElement` decorator
(`src/components/atoms/button/button.ts:11`, and 29 more like it), which compiles to an
unconditional, synchronous `customElements.define(tag, Class)` call at module-evaluation time — a
genuine, irreversible, application-wide side effect that the `sideEffects: false` declaration
explicitly denies exists.

This was reproduced empirically with esbuild (the engine Vite uses for pre-bundling, and one of the
most common production bundlers): bundling an entry that imports `{ ForgeButton }` from
`dist/exports/button.js` with tree-shaking enabled produces the warning `Ignoring this import
because ".../nexcraft-forge.es.js" was marked as having no side effects [ignored-bare-import] ...
"sideEffects" is false in the enclosing "package.json" file: package.json:171`, and strips the
side-effect import out entirely. The resulting bundle **unconditionally throws** `"ForgeButton not
found. Make sure @nexcraft/forge is properly loaded."` at import time. This affects all 29
per-component subpath exports — the entire "selective imports" feature the docs advertise with
numbers like "~15KB per component" and "85% reduction" (`docs/guides/selective-imports.md`,
`CHANGELOG.md`). Webpack 5's production `optimization.usedExports` + `sideEffects` handling and
Vite/Rollup's `moduleSideEffects` resolution both derive from the same package.json field, so this
is not an esbuild-specific quirk.

Notably, the project's own ADR anticipated exactly this problem and specified the correct fix — a
scoped `sideEffects` array plus a dedicated `define.js` registration file per component
(`plans/adrs/ADR-011-package-distribution.md:121-124`) — but that design was never carried into the
shipped `package.json`. The fix is either scoping `sideEffects` to the files that actually register
elements, or redesigning the export shims per the ADR's original plan.

No demo app in `demos/` actually exercises the selective-import path (only `dist/tokens.css` and
JSON metadata files are imported by path), which is consistent with this bug going unnoticed for
nine months — the one thing that would have caught it was never wired up.

### 2.4 dts pipeline

The type-declaration bundling pipeline itself works correctly: `tsc --emitDeclarationOnly` →
`rollup -c rollup.dts.config.js` (via `rollup-plugin-dts`) → `dist/index.d.ts` (89KB), a
well-formed single-file aggregation of all component/prop/event/AI-metadata types. No defects found
in this part.

One cleanup gap: `dist/utils/` ships 14 orphaned `.d.ts` files with **no matching `.js` files** and
**no exports-map entry**, because `cleanup-types.js`'s deletion list (`components`, `core`, `test`,
`types`) never includes `utils`. ~24KB of dead, unreachable type-only cruft shipped in every
install (confirmed in the real npm tarball). Low severity — bloat, not breakage.

Two other packaging issues: `lit` is declared as both a `dependency` and a `peerDependency`, but the
build bundles its own copy anyway (`rollupOptions.external: []`) — the peerDependency declaration is
functionally inert, and any consumer who also imports `lit` directly ends up with two Lit instances
on the page. And `./plugin` (the Tailwind plugin subpath) imports `tailwindcss/plugin` at runtime,
but `tailwindcss` is only in `devDependencies` — a consumer using `@nexcraft/forge/plugin` without
independently installing Tailwind gets `Cannot find module` at build/config-load time.

---

## 3. CI/CD & Release

### 3.1 Workflow map (7 workflows)

| Workflow | Trigger | Purpose |
|---|---|---|
| `ci.yml` | push/PR to `main`, manual | Gate: changeset-check, lint, typecheck, test:coverage, security-audit (blocking), build |
| `develop.yml` | push/PR to `develop`, manual (+publish input) | Same gates scoped to `develop`, plus the **real** changesets-based beta publish path |
| `release.yml` | on `ci.yml` completing (branch `main`) | Security gate → `changesets/action` → `npx changeset publish` (the actual production release mechanism) → sync-develop → update-examples |
| `beta-release.yml` | manual dispatch only, any branch | Competing, hand-rolled beta release (no changesets) — publishes main package + (buggy) forge-rhf only |
| `deploy.yml` | on `release.yml`/Release workflow completing, push to `demos/**`/`docs/**`, manual | Builds Storybook + Next.js demo, deploys to GitHub Pages |
| `auto-label.yml` | PR opened/synchronize/reopened/ready_for_review/converted_to_draft | PR labeling by path/size/WIP-status/title — **100% broken, see 3.2** |
| `security-audit-nightly.yml` | daily 02:00 UTC, manual | `npm audit` wrapper → Discord webhook, non-blocking (`--no-fail`) |

### 3.2 auto-label.yml — confirmed 100%-failing since introduction

`.github/workflows/auto-label.yml` lines 44 and 50 contain an unquoted YAML scalar with an internal
unescaped colon (`--add-label "status: wip"` inside a plain `run:` value) — invalid YAML.
Independently confirmed two ways: `python3 -c "import yaml; yaml.safe_load(...)"` fails with
`mapping values are not allowed here` at line 44, and live GitHub Actions history
(`gh run list --workflow=auto-label.yml`) shows **16 out of 16 recorded runs failed**, every one
with `0s` duration and `jobs: []` — GitHub's diagnostic for an unparseable workflow file. This
automation, introduced in commit `3c5dffe` on 2025-10-15, has never labeled a single PR in its
entire existence, despite a fully-written `.github/labeler.yml` config sitting ready to use. Fix is
a one-line quoting change per occurrence.

### 3.3 End-to-end release path — what actually happens

A PR merges to `main` (mostly Dependabot auto-merges since Nov 2025) → `ci.yml` runs on the push,
but **only the `smoke-test` job** (`npm audit`, `npm run build`, `npm run validate:ai`) —
`lint`/`typecheck`/`test`/`build` are all `if: github.event_name == 'pull_request'` and skip on
plain pushes → `release.yml` fires on `ci.yml` completing: security-audit gate (blocking on
critical vulns) → downloads the CI build artifact or rebuilds if missing (this fallback always
triggers in practice, since push-triggered CI never produces the artifact release.yml looks for) →
explicitly rebuilds `forge-react`/`forge-vue`/`forge-angular`/`forge-rhf` → `changesets/action` runs
`npx changeset version` + `npx changeset publish`, which publishes **every non-private workspace
package with a pending changeset** — the real mechanism, and it does correctly publish all 7
targets together (confirmed via matching npm registry timestamps to the automated release-PR
commits).

### 3.4 Which packages actually publish — and the stale script that would mislead you

Root `package.json`'s `publish-packages` script only lists 4 targets: root, `forge-rhf`,
`forge-tokens`, `forge-mcp-figma` — **it never mentions `forge-react`, `forge-vue`, or
`forge-angular`**. This script is never invoked by any workflow, hook, or CI step
(`grep -rn "publish-packages"` finds only its own definition). Yet all 7 packages (root + all 6
workspace packages) genuinely are live and current on the npm registry, published via the
changesets mechanism in `release.yml`, not this script:

| Package | Latest on npm | Last publish |
|---|---|---|
| `@nexcraft/forge` | 0.10.0 | 2025-10-08 |
| `@nexcraft/forge-react` | 1.0.5 | 2025-10-08 |
| `@nexcraft/forge-vue` | 1.0.2 | 2025-10-08 |
| `@nexcraft/forge-angular` | 1.0.2 | 2025-10-08 |
| `@nexcraft/forge-rhf` | 1.0.2 | 2025-10-08 |
| `@nexcraft/forge-tokens` | 0.2.0 | 2025-10-02 |
| `@nexcraft/forge-mcp-figma` | 0.2.0 | 2025-10-02 |

`publish-packages` is therefore dead/orphaned documentation-as-code: anyone reading `package.json`
scripts to understand "how do I publish this" would run it and silently under-publish 3 of 7
packages.

`beta-release.yml` compounds this with its own bug: its "smart publishing" check for whether
`forge-rhf` needs publishing (`git diff --quiet HEAD~1 packages/forge-rhf/`) always evaluates true,
because the immediately preceding commit always touches `forge-rhf/package.json` (an unconditional
version bump two steps earlier in the same workflow) — so forge-rhf publishes on every single beta
run regardless of whether it changed, exactly contradicting the stated intent of the commit that
added this logic. The other 4 workspace packages have no publish steps in this workflow at all.
`develop.yml`'s changesets-based `publish` job is the only complete/correct beta mechanism; these
two beta paths can drift out of sync with each other.

### 3.5 Other stale/broken workflow findings

- **No branch protection on `main`** (`404 "Branch not protected"` from the GitHub API) — no
  required checks, no required review, direct pushes allowed (consistent with `release.yml`'s own
  jobs pushing straight to `main`/`develop`).
- **Deployed site is unreachable.** `deploy.yml` reports success, but the configured custom domain
  `forge.ignis.dev` doesn't resolve (`NXDOMAIN`); the GitHub Pages URL 301-redirects into that dead
  domain. The `gh-pages` branch is a stale relic from before the modern Pages-via-Actions method,
  last touched 2025-09-08.
- **`PAT_TOKEN` fallback masks a missing secret** — `sync-develop` uses `secrets.PAT_TOKEN ||
  secrets.GITHUB_TOKEN`; `PAT_TOKEN` doesn't exist, so it silently always falls back. Not currently
  broken, but shows an intended setup step was never completed.
- **No CI coverage for `forge-vue`/`forge-angular`** — `ci.yml`'s `typecheck` job only builds
  `forge-react`; the other two are first compiled anywhere in the pipeline inside `release.yml`,
  after CI has already gone green and a release is about to publish.
- **No workspace package's own tests run anywhere** — `ci.yml`'s `test` job only invokes the root
  `vitest.config.ts` (`src/**`); `forge-rhf` has its own `test` script but nothing ever calls it.
- **Lint scope is narrow** — root `lint` covers only `src/**` and `forge-rhf`; the other 5 workspace
  packages have no lint script and are never linted.
- **No `actionlint`/`yamllint` anywhere** in CI or the pre-commit hook — the root-cause enabler for
  `auto-label.yml`'s bug surviving undetected for nine months (prettier round-trips the YAML fine
  without validating GitHub-Actions semantics).

### 3.6 CI health signal / dormancy state

`origin/main`'s true last commit is 2025-11-11 (a Dependabot auto-merge). Since then: **10 open
Dependabot PRs** (oldest ~7.5 months old), zero human commits, zero non-Dependabot PRs. The only
workflow that has run reliably every day through the dormant period is `security-audit-nightly.yml`
(145+ consecutive successful runs) — but "success" here just means the non-blocking `--no-fail`
script completed, not that it found nothing (§4). A batch of Dependabot major-version-bump PRs from
2025-11-24 (storybook 9→10, vitest 3→4) already fail Lint/TypeCheck/Test/SecurityAudit and remain
open — concrete evidence the toolchain has started bit-rotting against newer majors of its own
dependencies, even though the pinned-lockfile toolchain still works fine today (§4).

---

## 4. Toolchain-today verdict (2026-07-13, this checkout, read-only, `node_modules` already installed)

| Step | Command | Result |
|---|---|---|
| Type-check | `npm run type-check:local` (`tsc --noEmit`) | **PASS** — exit 0, zero errors |
| Lint | `npm run lint:local` (`eslint src/**/*.ts`) | **PASS** — exit 0, zero warnings/errors (scope: `src/**` only, not workspace packages) |
| Unit tests | `npm run test:unit` | **PASS** — 36/36 test files, 1147 passed / 35 skipped (1182 total), 19.4s |
| Build | `npm run build:core` | **PASS** — vite build (68 modules, 1.05s), `build:types`, `bundle:types`, `cleanup:types`, `build:exports` all succeeded; output matches §2 sizes exactly (467.40 KB / 91.38 KB gzip) |
| `git status` | before and after all steps | **clean**, no stray artifacts (`dist/` is gitignored) |

Zero code changes were required to get a fully green local toolchain run nine months after the last
commit — a genuinely positive signal for anyone considering reviving this project. The only rot is
at the dependency-security layer.

### npm audit severity breakdown

`npm audit --json`: **26 total** (0 info, 0 low, 6 moderate, 16 high, 4 critical), across 49 prod /
624 dev / 18 optional / 19 peer dependencies (678 total).

| Severity | Count | Packages |
|---|---|---|
| Critical | 4 | `vitest`, `@vitest/browser`, `@vitest/coverage-v8`, `@vitest/ui` |
| High | 16 | `@angular/common`, `@angular/core`, `@angular/forms`, `@angular/platform-browser`, `@isaacs/brace-expansion`, `flatted`, `glob`, `happy-dom`, `koa`, `minimatch`, `picomatch`, `playwright`, `rollup`, `storybook`, `vite`, `ws` |
| Moderate | 6 | `ajv`, `brace-expansion`, `js-yaml`, `postcss`, `qs`, `yaml` |

The 4 criticals are concentrated entirely in the vitest toolchain: `vitest` (GHSA-5xrq-8626-4rwp,
CVSS 9.8, arbitrary file read/execute when the Vitest UI server is listening — installed version
3.2.4 confirmed in the vulnerable `<3.2.6` range) and `@vitest/browser` (GHSA-g8mr-85jm-7xhm, CVSS
9.8, RCE via CDP proxy/config overwrite when Browser Mode is exposed). Both require the vitest
dev/UI/browser server to actually be running and reachable — running `npm run test:unit` (a plain
`vitest run`, as done here) does not trigger these conditions. All 4 criticals and most of the highs
are **devDependencies only** — not shipped in the published `@nexcraft/forge` npm package — but they
are real risk for anyone running `vitest --ui` locally against this lockfile, and the Angular/
Playwright/Storybook highs are relevant to anyone building the `forge-angular` workspace package or
running the demo/Storybook tooling. `npm audit fix` / manual bumps have not been applied since
around the October 2025 freeze.

---

## Ranked risks

1. **Bundle-size/tree-shaking claims are false, and "selective imports" actively throws in
   production** under any bundler that honors `sideEffects: false` (esbuild, Vite prod, Webpack 5
   default settings) — the single most damaging finding for existing consumers. (§2.2, §2.3)
2. **The AI export/validation subsystem — core of the "AI-native" pitch — has zero tests and is
   deliberately excluded from the coverage metric used to justify marketing claims.** (§1.2)
3. **`auto-label.yml` has been 100% broken since introduction (16/16 failed runs), uncaught for 9
   months**, symptomatic of no `actionlint`/`yamllint` anywhere in CI or hooks. (§3.2, §3.5)
4. **Two competing beta-release mechanisms, a stale `publish-packages` script that would
   silently under-publish 3 of 7 packages, and a no-op "smart publish" check in `beta-release.yml`**
   — real risk of package-version drift for a new maintainer. (§3.4)
5. **10 open Dependabot PRs, some already failing CI (major version bumps)** — the "toolchain works
   today" verdict (§4) reflects the frozen Oct 2025 lockfile, not what happens the moment
   dependencies move. (§3.6)
6. **4 critical / 16 high npm audit findings**, dev-tooling-scoped but unaddressed for 9 months. (§4)
7. **README numeric claims (coverage, component count, bundle size, Chromatic, three non-existent
   test scripts) are stale/aspirational across the board** — individually low severity, but
   collectively mean nothing in the README's stats can be trusted without re-verification. (§1.1, §1.5, §2.2)
8. **Two broken exports-map entries and ~24KB of orphaned `.d.ts`-only cruft** — low severity, easy
   fixes. (§2.1, §2.4)
9. **GitHub Pages resolves to a dead custom domain; `main` has no branch protection.** Cosmetic but
   visible if anyone follows the docs-site link today. (§3.5)

## Recommendations

- **Fix the `sideEffects` scoping before any revival announcement** — either the ADR-011 array
  approach with a per-component `define.js`, or drop "selective imports" and be honest the main
  bundle is ~91KB gzip. This is a live bug affecting real installs today.
- **Correct or remove every unverified README claim** (coverage/bundle-size badges, component
  count, Chromatic checkmark, three non-existent `test:*` scripts) before using the README to pitch
  continued investment.
- **Add tests for `ai-metadata-exporter.ts`/`ai-metadata-validator.ts`** and drop their coverage
  exclusion — either the feature matters (test it) or it doesn't (remove it).
- **Fix `auto-label.yml`'s one-line YAML bug** and add `actionlint` to CI/pre-commit so the next
  workflow-syntax error doesn't go 9 months unnoticed.
- **Consolidate to one beta-release mechanism** (`develop.yml`'s changesets path is correct) and
  delete or fix `beta-release.yml` plus the stale `publish-packages` script, then reconcile the
  Dependabot backlog — several are major-version bumps needing real compatibility fixes, not just merges.
- **Point or remove the dead `forge.ignis.dev` domain** and enable basic branch protection on `main`
  now that no one is watching direct pushes.
