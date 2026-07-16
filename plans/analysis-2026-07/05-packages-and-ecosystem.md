# Packages & Ecosystem — @nexcraft/forge Due-Diligence

Repo: `/home/air_buster/rollg/ignis/apps/forge` (`@nexcraft/forge` v0.10.0, npm workspaces:
`packages/{forge-react,forge-vue,forge-angular,forge-rhf,forge-tokens,forge-mcp-figma}` +
`demos/{nextjs-app,vue-app,vanilla-app}`). GitHub: `dev-ignis/forge`. Last commit 2025-10-15
(`develop`) / 2025-11-11 (`main`). Analysis date: 2026-07-13 — **9 months dormant**.

## TL;DR

This is a solo-built, AI-assisted "sprint and abandon" project: one human author (`ignis`,
`maildevcom+1@gmail.com`) plus heavy bot automation produced 700 commits and 60 published
`@nexcraft/forge` versions in ~6 weeks (Aug 28 – Oct 8, 2025), then the entire six-package
ecosystem froze simultaneously. The core library and its React wrapper are genuinely solid
engineering; everything downstream of that — Vue/Angular wrappers, the RHF adapter, the tokens
CLI, and especially the "MCP server" — ranges from lightly-tested to non-functional. The
headline finding is that **`@nexcraft/forge-mcp-figma`, published to npm and advertised as a
working MCP server, has never implemented the Model Context Protocol handshake at any point in
its history** — any real MCP client fails on the first message. Ownership is a hard bus-factor-of-1:
the same individual controls the GitHub repo (personal `User`, not an org), the npm account
(`rollg`, single maintainer on all six packages), and the sole `NPM_TOKEN` CI secret, with no
provenance/OIDC attestation on the stable release path. 99 commits sit unreleased on `develop`,
including a security fix (Vite/esbuild CVE) that never reached npm. Reviving this project is
feasible — the core is not rotten — but it requires deciding what to do with the two clearly-weak
links (forge-mcp-figma, forge-tokens) before presenting this as a serious multi-framework library
to new consumers.

---

## 1. The six workspace packages

### 1.1 State table

| Package | Local version | npm `latest` | Published | Downloads/mo¹ | Wrapper coverage | Verdict |
|---|---|---|---|---|---|---|
| `@nexcraft/forge` (core) | 0.10.0 | 0.10.0 | 2025-10-08 | 138 | — | **alive-but-frozen** |
| `@nexcraft/forge-react` | 1.0.5 | 1.0.5 | 2025-10-08 | 57 | 29/29 components (100%, per-component, typed) | **stale, most mature** |
| `@nexcraft/forge-vue` | 1.0.2 | 1.0.2 | 2025-10-08 | 41 | 100% by construction (generic composables, no typed bindings) | **stale, weak CI** |
| `@nexcraft/forge-angular` | 1.0.2 | 1.0.2 | 2025-10-08 | 45 | 100% by construction (generic directives, no typed bindings) | **stale, weak CI** |
| `@nexcraft/forge-rhf` | 1.0.2 | 1.0.2 | 2025-10-08 | 57 | 4 field adapters + factory | **stale-but-usable** |
| `@nexcraft/forge-tokens` | 0.2.0 | 0.2.0 | 2025-10-02 | 47 | Figma Variables CLI | **stale-but-usable** |
| `@nexcraft/forge-mcp-figma` | 0.2.0 | 0.2.0 | 2025-10-02 | 23 | 3 custom RPC methods | **broken** |

¹ npm downloads, window 2026-06-12 → 2026-07-11. Every published version's `dist-tags.latest`
exactly matches what's checked into the repo — there is no pending unshipped version bump; the
gap between disk and npm is entirely unreleased *feature* work on `develop` (§4.3), not a missed
publish.

All six packages published within the same two release windows (Oct 8 for
react/vue/angular/rhf/core; Oct 2 for tokens/mcp-figma) and nothing has shipped since — the
ecosystem froze as a unit, not gradually.

### 1.2 The `workspace:*` question

Root `package.json` carries `"@nexcraft/forge-react": "workspace:*"` as a devDependency — this is
Yarn/pnpm workspace-protocol syntax that npm's docs do not officially support. **Verified this does
not block a fresh `npm install`**: both a dry-run against the real repo and an isolated from-scratch
sandbox test succeeded (npm 10.9.2). npm's arborist workspace-linker matches the dependency name to
a local workspace package and symlinks it regardless of the version-range string being
non-standard; this is empirically reliable but undocumented behavior, not a guaranteed contract.

It exists for a narrow reason, not general workspace linking style: root itself never imports
`@nexcraft/forge-react` (the only repo hit is a `console.log` string literal in
`vite.config.ts:92`). The line was added in commit `c348b62` purely so npm's hoisting makes
`forge-react`'s types resolvable for `forge-rhf`'s `tsc` step in CI. **Recommendation**: replace it
with a plain `"*"` or `"file:packages/forge-react"` — npm workspace auto-linking works with either,
without relying on syntax npm's own documentation doesn't endorse.

### 1.3 Drift between core and wrappers

The three framework wrappers are architecturally split into two different strategies:

- **forge-react** is 100% handwritten and per-component: 29 `Forge*.tsx` files each call a shared
  `createUnifiedWrapper()` factory with per-component prop/event mapping and a hand-authored SSR
  fallback. This gives real typed props (`ForgeButtonProps`, etc.) but means **every new core
  component requires a human to hand-author a new wrapper file** — there is no codegen and no CI
  check enforcing sync between `src/components/` and the wrapper package. Two elements
  (`forge-toast-container`, `forge-performance-dashboard`) are unwrapped in all three packages, a
  defensible gap for utility/singleton elements.
- **forge-vue and forge-angular are generic**: composables/directives/services that work against
  any custom element, with zero per-component files. This achieves 100% coverage "by construction"
  but provides **no Vue/Angular equivalent of typed component props** — a real capability gap
  relative to forge-react, not just a documentation gap.
- **CI treatment is asymmetric and this is the more urgent drift**: forge-react is built and
  type-checked on every PR (`ci.yml`, `develop.yml`). forge-vue and forge-angular are **never
  linted, type-checked, or built on any PR or push to develop** — their `tsc` compile only runs for
  the first time in `release.yml`, right before publishing. This already caused one shipped-broken
  release (v1.0.0, silently missing compiled `dist/`, fixed in v1.0.1). None of the three wrapper
  packages has a single test file, and none is linted by any script in the repo (root's `lint`
  script only globs root `src/**/*.ts` plus forge-rhf).
- **CHANGELOG/version drift, confirmed and traced to root cause**: all four of forge-react,
  forge-vue, forge-angular, and forge-rhf have a `CHANGELOG.md` topped by a `## 2.0.0` heading that
  was never actually published. PR #69 (`fa2e3bb`, 2025-10-08) ran `changeset version`, bumped all
  four to 2.0.0, then a follow-up commit in the *same* PR walked the `package.json` versions back
  down to 1.0.5/1.0.2/1.0.2/1.0.2 (correct, patch-level) — but never renamed the already-generated
  changelog headings. For forge-vue and forge-angular, the string "1.0.2" (their real, live version)
  **never appears anywhere in their changelog file**. Anyone reading the changelog for the version
  they actually installed sees it filed under a version number that was never shipped.
- **Doc bug specific to Angular**: `docs/GETTING_STARTED.md:82-85` imports `ForgeModule`, which
  **does not exist** — the real export is `ForgeAngularModule`. Any user copy-pasting the official
  quick-start gets an import error immediately. `docs/integrations/angular.md` compounds this by
  hedging ("example names shown — adjust to your package exports") about features
  (`ForgeControlValueAccessor`, named directives) that are in fact concretely and correctly shipped
  — the doc is strictly worse than the package's own README.

### 1.4 forge-rhf, forge-tokens: quieter but real defects

- **forge-rhf** bundles the *entire* `@nexcraft/forge-react` package into its own `dist/index.js`
  (42,857 bytes, confirmed via `npm pack`) because its Rollup externals list still references a
  dead pre-split import path (`@nexcraft/forge/integrations/react`) instead of the real dependency.
  Every consumer of forge-rhf therefore gets a second, duplicated copy of forge-react baked in on
  top of their own peer-dependency install — bundle bloat and a latent risk of duplicate custom-element
  registration. The adapter logic itself (Controller wiring for 4 field types) is sound and builds
  cleanly; it simply has zero test coverage despite `vitest` being wired up as if it did.
- **forge-tokens** works correctly for everything it actually implements (pull/normalize/validate/apply/diff
  against sample data, verified end-to-end offline). But its one documented customization mechanism,
  a `forge.figmaconfig.json` config file (documented in both the package README and
  `docs/guides/figma-to-forge.md`), **does not exist in code at all** — zero references outside the
  docs themselves. This is vaporware, not drift.

### 1.5 forge-mcp-figma: does not implement MCP, verified empirically

This is the most consequential finding in the packages area. `packages/forge-mcp-figma/bin/server.mjs`
is a 53-line hand-rolled newline-delimited JSON-RPC-over-stdio script — its own top comment admits
"Minimal MCP-like JSON-RPC over stdio." There is no `@modelcontextprotocol/sdk` dependency anywhere
in the repo (`grep -rl modelcontextprotocol` returns zero hits across the entire history). It never
implements the `initialize` handshake that the MCP spec (2024-11-05 and every revision since)
requires before any other method is valid, and it never implements `tools/list`/`tools/call`
discovery — it expects the literal tool name as the top-level JSON-RPC method, which no
spec-compliant client sends.

**Confirmed by spawning the real server and sending the literal first message any MCP client sends**:
an `initialize` request returns `{"error":{"code":-32000,"message":"Unknown method: initialize"}}`.
Any real MCP client — Claude Desktop, Claude Code, Cursor, VS Code Copilot — fails on connection,
full stop. The underlying tool logic (delegated to forge-tokens) does work when called directly with
its own custom method name, so this is purely a transport/protocol-compliance failure, not a logic
bug. It was scaffolded once (2025-09-29), published once (2025-10-02), and never touched again — this
isn't spec drift from a moving target, it never conformed at any point. It still receives 23
downloads/month, plausibly people discovering it doesn't work. The project's own roadmap doc
(`plans/priorities/02-short-term-roadmap.md:18-21`) marks "Forge MCP for Figma" as shipped (`[x]`) —
reflecting "a package was published," not "the feature works as designed."

---

## 2. Demo apps

| Demo | Pinned `@nexcraft/forge` | Verdict | Notes |
|---|---|---|---|
| `demos/nextjs-app` | `^0.9.0` (capped, cannot reach 0.10.0 without a manual bump) | **alive** | Builds successfully end-to-end (`next build --turbopack`, only lint warnings). Carries a "TEMPORARY" local-CSS workaround (`layout.tsx:3-4`) for a tokens.css export gap that was actually fixed upstream in 0.10.0 two days after the workaround was written — dependency was never bumped, workaround never removed. Own README instructs the now-fixed import path, contradicting the demo's actual source. Top-level `demos/README.md` also cites the wrong dev-server port (3000 vs actual 9091). |
| `demos/vue-app` | `^0.7.0` (3 minors behind) | **broken** | `npm run build` (`vue-tsc && vite build`) fails today with two permanent TypeScript errors (`TS6133`, `TS7006`) in `src/App.vue`, present since the file's last edit on 2025-10-08 — not flaky, not environmental. Has been unbuildable via its own documented command for the entire 9-month dormancy. The demo's own `AI_TESTING_FEEDBACK.md` self-rates the package experience "2/5" and documents 3 real bugs found against the published package at the time (empty AI manifest, raw TS syntax shipped in compiled `.js`, missing `exports` subpath) — src still carries defensive `try/catch` fallbacks distrusting the package. Top-level docs honestly flag this demo "In Progress," unlike Next.js's unqualified checkmark. |
| `demos/vanilla-app` | `0.7.1` (exact pin, oldest of the three) | **alive, with caveat** | Builds successfully, but only because `vite.config.ts` prefers a local `dist/nexcraft-forge.es.js` build when present, which existed in this checkout — the actual pinned-npm-dependency code path was not independently exercised. Code quality is solid (JSDoc `@ts-check`, wires up 10+ interactive components with real sample data). |

None of the three demos use workspace-protocol linking — all resolve against real published npm
versions, all are at least one release behind current.

---

## 3. Repo & ecosystem health

### 3.1 Git analytics

- **700 commits total** across all refs (525 reachable from `origin/develop`). Effectively
  single-author: `ignis` (435 commits, `maildevcom+1@gmail.com`), then bots —
  `github-actions[bot]` 150, `dependabot[bot]` 25 — plus `dev-ignis` (89 commits, ambiguous
  human-alias-or-CI-identity). No other human contributor appears anywhere in `--all` history.
- **Cadence is a single 2.5-month sprint**: 41 commits Aug 2025, 508 in Sep 2025 (peak, ~17/day),
  140 in Oct 2025, 10 in Nov 2025, then 1 lone dependabot-triggered commit in Feb 2026 and nothing
  since. First commit 2025-08-28; 60 published core-package versions (including ~30 betas) shipped
  in under 6 weeks.
- **Tags**: last tag of any kind is `2025-10-08` (`@nexcraft/forge@0.10.0` and sibling 1.0.x/0.2.0
  tags). 28 separate `0.5.2-beta.N` tags were cut within a single 9-day span (Sep 6–15) —
  indicative of a rough, iterate-in-production release process during the initial burn.
- **Local checkout caveat**: at analysis time, local `develop` was 4 commits behind
  `origin/develop` (trivial: a merge, an auto-labeler PR, two dependabot merges) — worth a `git
  pull` before anyone resumes work, though it doesn't change the substantive picture.

### 3.2 main ↔ develop divergence: unreleased work

`origin/main...origin/develop` = **1 commit ahead on main, 99 commits ahead on develop**. The 1
main-only commit is the last thing that happened to the repo pre-dormancy (a dependabot bump merged
2025-11-11). The 99 develop-only commits include real, shippable work that never reached npm because
no release was ever cut after 0.10.0/1.0.5 (2025-10-08):
- `137b562` "security: upgrade vite to 7.1.7 to fix esbuild vulnerabilities" — **an unshipped
  security fix**, meaning current npm consumers are missing a real CVE remediation.
- `fae863a` selective imports for all 28 components; `9e89a75` forge-card border prop; `cbf3881`
  tokens.css export fix; `83d4fcf` expanded design tokens; ADR-008 native-button-pattern compliance
  work across several commits; Storybook AI-panel addon; developer debugging utilities; SSR
  architecture fix; changeset-requirement CI check.

Anyone evaluating "what does the published package do" from npm alone is looking at a snapshot that
is missing nine months of accumulated (if unreleased) fixes.

### 3.3 GitHub repository state

- **1 star, 0 forks, 0 subscribers** — negligible external adoption.
- **10 open PRs, 0 open issues** (GitHub's `open_issues_count` of 10 conflates PRs; filtering
  confirms zero real issues). All 10 open PRs are Dependabot branches, all green CI, sitting
  unmerged for **154–231 days** as of 2026-07-13. Nobody has triaged a dependency PR since Nov 2025.
- **`Security Audit (Nightly)` workflow is now `disabled_inactivity`** — GitHub's automatic 60-day
  disabler fired, with the last successful run 2026-04-10. Combined with `pushed_at` = 2026-02-09
  (last git push of any kind, a dependabot branch) and `updated_at` = 2025-11-11 (last human-relevant
  repo activity), this gives a precisely dated abandonment signature: dependabot → CI → nightly
  security scan kept functioning correctly on autopilot for ~3 months after the human left, and is
  only now starting to shut itself down from disuse.

### 3.4 npm ecosystem reality

Total monthly downloads across all seven packages (core + 6 workspace packages) sum to roughly
408/month — low, roughly proportional to each package's complexity/usefulness, and flat (no growth
signal available without a paid trend API, but consistent with 1 star / 0 forks). Two additional
footguns found in registry metadata:
- **`beta` dist-tag is stale and would downgrade a user**: `npm dist-tag` shows
  `{"beta": "0.8.0-beta.0", "latest": "0.10.0"}` — installing `@nexcraft/forge@beta` today pulls an
  *older* version than stable.
- A chaotic, numerically-inconsistent `0.7.2-beta.0` version appears in the history of all six
  workspace packages simultaneously (all timestamped within seconds on 2025-09-30), consistent with
  a botched Changesets pre-release exit — these versions remain resolvable on the registry.

### 3.5 Dependency drift (installed vs. latest available, 2026-07-13)

| Dependency | Installed | Latest | Drift |
|---|---|---|---|
| `typescript` | 5.9.3 | 7.0.2 | **2 majors behind** |
| `vite` | 7.1.9 | 8.1.4 | 1 major behind |
| `vitest` | 3.2.4 | 4.1.10 | 1 major behind |
| `storybook` (+ addons) | 9.1.10 | 10.5.0 | 1 major behind |
| `eslint` | 9.37.0 | 10.7.0 | 1 major behind |
| `lit` | 3.3.1 | 3.3.3 | 2 patches behind (low risk) |
| `tailwindcss` | 4.1.14 | 4.3.2 | same major, several minors |
| `happy-dom` | 20.0.2 | 20.10.6 | same major, several minors/patches |

Every major-version gap already has a corresponding open, CI-green, unmerged dependabot PR — this
is explained entirely by 9 months of nobody clicking merge, not by unusual internal neglect.

### 3.6 Committed-artifact bloat: none found

`dist/`, `coverage/`, `storybook-static/`, `custom-elements.json`, and `node_modules/` all exist on
disk as local leftovers but **none are git-tracked** — confirmed via `.gitignore` coverage and
`git ls-files`/`git log --all -- <path>` returning empty for all four across all of history. Pack
health is clean: 1,511 objects, 9.25 MiB, zero garbage/dangling objects, 16M total `.git`. This is
the one unambiguously healthy signal in an otherwise stale picture.

### 3.7 `.env` finding

An untracked, correctly `.gitignore`d `.env` (486 bytes, dated 2025-09-30) sits at repo root
containing `DISCORD_WEBHOOK_URL`, `DISCORD_WEBHOOK_CRITICAL`, `DISCORD_WEBHOOK_OPS`, and
`NPM_TOKEN` keys. Confirmed never committed at any point in git history. Not an incident, but it
means a live npm-publish token and Discord webhooks sit unencrypted on disk for a project whose
GitHub side is otherwise fully dormant — worth rotating/securing before any revival work resumes on
this machine or a shared one. A repo-wide secret-pattern grep over tracked files found no actual
hardcoded secrets (only legitimate `${{ secrets.* }}` GitHub Actions references and doc placeholders).

### 3.8 npm registry ownership: bus factor of 1

All six published `@nexcraft/*` packages list an **identical single npm maintainer**: `rollg
<maildevcom@gmail.com>` — no co-maintainer, no npm org/team account, on any package. The GitHub
identity everything points to, `dev-ignis`, is confirmed via the GitHub API to be a **personal User
account, not an Organization**. The dominant git commit author, `ignis <maildevcom+1@gmail.com>`
(435 commits), is a Gmail plus-alias of the exact same base address as the npm maintainer email —
and that address is also this analysis session's own configured user email, confirming the current
owner and the original builder are the same person. `package.json`'s `"author": "Ignis Team"` is
the only place a "team" is asserted anywhere, and every other data source (npm maintainers, GitHub
org lookup, git shortlog) contradicts it. No `CODEOWNERS`, `SECURITY.md`, `GOVERNANCE.md`, or
`CONTRIBUTING.md` exists anywhere in the repo. Publishing runs through a single shared `NPM_TOKEN`
GitHub Actions secret with **no provenance/OIDC attestation** on the stable release path
(`release.yml` lacks `id-token: write`; the beta workflow has the permission but never passes
`--provenance`, so it's vestigial). This is a genuine single-point-of-failure for the entire public
surface of the library.

### 3.9 License consistency: not consistent, two packages are unlicensed on npm

Root and 4 of 6 packages (forge-react, forge-vue, forge-angular, forge-rhf) declare `"license":
"MIT"`, matching the root `LICENSE` file exactly. **`forge-mcp-figma` and `forge-tokens` have no
`license` field at all** — not `"UNLICENSED"`, simply absent — confirmed both in the local
`package.json` files and live on the npm registry (`license: undefined` via the registry API for
both). Neither package ships a `LICENSE` file in its `files[]` allowlist, and npm workspaces do not
auto-copy the monorepo root LICENSE into sub-package tarballs. Traced via git log: the field was
never present from the packages' inception commit (`40c3631`) through their actual publish
(`3c95e51`) — not stripped later, never added. Practical effect: automated SCA/license-compliance
tooling (FOSSA, Snyk, license-checker) will flag both packages as unlicensed/unknown for anyone who
runs a compliance scan against them today.

---

## 4. Ranked risks

1. **Bus factor of 1 with no succession plan.** One person controls the GitHub repo (personal
   account, not an org), the npm account, and the sole CI publish token, with no provenance
   attestation and no governance docs. If this person becomes unavailable, there is no path for
   anyone else to ship a patch to any of the six packages.
2. **`forge-mcp-figma` is non-functional as advertised and still being downloaded.** It has never
   implemented the MCP handshake; every real MCP client fails on connection. It's live on npm,
   documented as working, and marked "done" on the roadmap.
3. **forge-vue and forge-angular ship with zero automated quality gates** (no lint, no tests, no
   PR-time type-check or build) — verification only happens in the release workflow itself, which
   already produced one broken release (v1.0.0). A silent regression on the next release is a live
   possibility with no CI to catch it.
4. **A real, unshipped security fix sits on `develop`.** The Vite/esbuild CVE upgrade (`137b562`) is
   one of 99 commits never released to npm; current consumers of the published packages don't have it.
5. **The public-facing surface actively misleads a new user.** Wrong GitHub org in the README's own
   clone command (`nexcraft/forge`, 404) contradicting the correct `package.json` metadata
   (`dev-ignis/forge`); dead GitHub Pages/Storybook links in both the "correct" and "incorrect" org;
   a broken `ForgeModule` import in the official Angular quick-start; four packages' changelogs
   permanently headed by a `2.0.0` release that was never actually published; a stale `beta` dist-tag
   that downgrades on install.
6. **Two publicly-installable packages have no license metadata**, which will fail automated
   compliance scanning for any downstream adopter with SCA tooling in their pipeline.
7. **Both non-React demos have real problems**: `vue-app` has been unbuildable via its own
   documented command since the day it was last touched; `nextjs-app` carries a superseded
   "TEMPORARY" workaround and points users at an import path its own dependency pin can't yet supply.
8. **`forge-rhf` silently bundles all of `forge-react`** into its output due to a stale externals
   config, doubling consumers' bundle weight for a package that only uses 4 of forge-react's 29
   components.
9. **Ten open, green-CI dependabot PRs sit unmerged for 5–7.5 months**, with `typescript` now two
   majors and `vite`/`vitest`/`storybook`/`eslint` each one major behind current.

---

## 5. Recommendations

**If reviving, do these first (cheap, high-signal-to-cost):**
- Merge or triage the 10 open dependabot PRs; they're already green.
- Cut a real release from `develop` to ship the 99 pending commits, prioritizing the Vite/esbuild
  security fix.
- Fix the four stale `CHANGELOG.md` "2.0.0" headings and the `ForgeModule` → `ForgeAngularModule`
  doc bug; both are minutes of work and both currently mislead real users.
- Fix the README's wrong GitHub org / dead Pages links, and the stale `beta` npm dist-tag.
- Add `"license": "MIT"` to `forge-tokens` and `forge-mcp-figma` and republish; trivial and closes a
  real compliance gap.
- Make an explicit call on `forge-mcp-figma`: either implement the actual MCP SDK/handshake, or pull
  it from npm / clearly mark it non-functional. Leaving it live and undocumented-as-broken is the
  single most reputationally risky item in the repo given it's the "AI-native" headline feature.

**Medium effort, before treating this as production-ready:**
- Wire forge-vue and forge-angular into the existing PR-time lint/type-check/build pipeline that
  forge-react already has; add at least smoke tests for both.
- Fix forge-rhf's Vite externals so it stops bundling all of forge-react.
- Fix `demos/vue-app`'s two TypeScript errors and bump `demos/nextjs-app`'s pinned versions,
  removing the superseded "TEMPORARY" CSS workaround.
- Replace the `workspace:*` devDependency with a real npm-supported range (`"*"` or `file:`).

**Structural, before depending on this long-term:**
- Address the bus-factor-of-1 directly: add a second npm co-maintainer and GitHub collaborator,
  rotate the shared `NPM_TOKEN`, and add `--provenance`/OIDC to the stable release workflow.
- Decide whether `forge-tokens` and `forge-mcp-figma` are worth continued investment given their low
  usage (47 and 23 downloads/month) relative to their gaps, or whether narrowing scope to the core
  library + React/Vue/Angular wrappers is the more defensible footprint to maintain going forward.

---

*Sources: analyst notes at `pkg-frameworks.md`, `pkg-tooling.md`, `health.md`,
`npm-registry-ownership.md`, `license-consistency-check.md` (this job's `tmp/forge-analysis/`
directory). All figures cited are as captured in those notes on 2026-07-13; repo access was
read-only throughout.*
