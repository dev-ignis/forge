# Executive Summary — @nexcraft/forge Deep Analysis

**Date:** 2026-07-13 · **HEAD analyzed:** `73f3b59` (develop, 2025-10-15) · **Method:** 41 AI agents across deep-read, adversarial fact-check, gap-probe, and synthesis phases (~2.8M tokens, 1,300+ tool calls). See [README](./README.md) for the document map.

## The one-paragraph verdict

Forge is a **genuinely substantial, functionally healthy, but abandoned and over-marketed** solo project. In a ~6-week sprint (Aug 28 – Oct 8, 2025, ~700 commits, 60 npm releases) it shipped 30 real web components with 100% test-file coverage (1,182 tests, all passing today), a working automated AI-metadata pipeline, 6 published npm packages, and an 18-ADR planning corpus — then went dormant mid-firefight on 2025-10-15. Nine months later the toolchain still works end-to-end with zero fixes needed, but the README's headline claims are systematically false (coverage badge, "<10KB" bundle, "100% WCAG AA"), the "AI-native" differentiator is real at runtime but degraded in its shipped artifacts, distribution has a latent tree-shaking correctness hazard, 99 commits (including a security fix) were never released, and adoption is effectively zero (1 star, ~138 downloads/month). The project's own last planning doc candidly flagged the AI-native positioning as premature — the remediation it proposed is, in essence, what this analysis recommends.

## What's genuinely good

- **The toolchain survived 9 months of dormancy untouched.** On 2026-07-13: type-check ✅, lint ✅, 1,147 unit + 35 a11y tests ✅ (19s), full build ✅. `dist/`, `coverage/` are properly gitignored; git history is lean (16MB) with zero leaked secrets across 700 commits.
- **Every component implements real AI introspection.** `getPossibleActions()`/`explainState()`/`aiState` are meaningfully overridden in 30/30 components — state-gated actions, real transitions — and 19–26 test files assert on them. This is the claim that survives adversarial review.
- **The metadata pipeline is automated, not hand-typed.** custom-elements-manifest → ai-manifest.json → ai-index.json, regenerated in CI, with a min-component gate.
- **Pockets of excellence:** modal's focus trap, multi-select's live-region announcements, checkbox/switch/radio-group's native-input a11y pattern, button's full 170-line AI metadata (the existence proof the other 29 components never got).

## What's broken (ranked)

1. **False public claims** — coverage badge (real: 85.5%), bundle "<10KB" (real: 467KB / 91KB gzip; "selective imports" are shims that pull the whole bundle), "100% WCAG 2.1 AA" (real axe coverage: 5/29 components). These are refuted by the project's own artifacts. *Details: [09-fact-check](./09-fact-check.md).*
2. **Distribution correctness breakage** — `sideEffects: false` + top-level `customElements.define` lets bundlers tree-shake component registration away entirely; **reproduced empirically with esbuild**, which strips the shim import and makes selective imports throw at runtime. Independently: `@nexcraft/forge/tooltip` throws even without a bundler, `@nexcraft/forge/utils` (2,129 LOC of documented utilities) has no exports entry and is unreachable, and the shims' `globalThis.NexcraftForge` lookup is dead code. ADR-011 designed the fix; never implemented. *Details: [04-testing-build-cicd](./04-testing-build-cicd.md), [02-architecture-and-ai-system](./02-architecture-and-ai-system.md).*
3. **Shipped-artifact quality gaps in the flagship AI system** — ai-manifest categorizes every component as "atom"; a regex scraper silently degrades ~1/3 of components to placeholder actions; props conflate public API with private state; `ai-tools/` is exported in package.json but doesn't exist; the AI instruction files (`.cursorrules`, `claude-instructions.md`, copilot copy — byte-identical triplicates) teach an import path removed in v0.9.0. *Details: [02-architecture-and-ai-system](./02-architecture-and-ai-system.md).*
4. **Fabricated documentation API surface** — 40 of 43 "Public Methods" documented across the 7 organism doc pages don't exist; button/select/data-table docs contain invented props/events; 52 dead internal links (~22% of sample). *Details: [06-documentation-audit](./06-documentation-audit.md).*
5. **Real shipped bugs** — tree-view selected/disabled styling never applies (CSS/template class drift); multi-select crashes on regex metacharacters in search; form-field's `aria-describedby` points at hardcoded IDs shaped around a test fixture; select re-triggers Lit update-after-update on every options change; button's `ghost`/`link` variants are unstyled; icon renders fetched SVG via `unsafeHTML` with no sanitization (latent XSS sink, currently unreachable). *Details: [03-component-inventory](./03-component-inventory.md).*
6. **Abandonment debt** — 99 unreleased commits on develop incl. a Vite/esbuild security fix; 10 CI-green dependabot PRs open 5–7.5 months; the nightly security workflow auto-disabled itself after 60 days of inactivity; local checkout 4 commits behind origin; npm `beta` dist-tag would downgrade users; TypeScript 2 majors behind. `npm audit`: 4 critical / 16 high — **all confined to dev tooling and peer deps; zero ship in any published package's production tree** (verified). *Details: [05-packages-and-ecosystem](./05-packages-and-ecosystem.md).*
7. **Packaging/legal loose ends** — forge-tokens and forge-mcp-figma published with **no license field and no LICENSE file** (SCA tools will flag them); forge-rhf accidentally bundles all of forge-react; forge-mcp-figma **does not speak MCP at all** (a real `initialize` handshake returns "Unknown method") despite its name and README; no `engines` field anywhere.
8. **Bus factor = 1, no succession** — one personal npm account (`rollg`) owns all 6 packages; "dev-ignis" is a personal GitHub user, not an org; "Ignis Team" is a label; a single `NPM_TOKEN` secret publishes everything with no provenance. Live credentials (npm token + 3 Discord webhooks) sit in plaintext `.env` on disk — never committed, but **rotate them**.

## The numbers

| Metric | Value |
|---|---|
| Components (registered custom elements) | 30 (+1 dev-tool) — 14 atoms, 9 molecules, 7 organisms |
| Source / test / story LOC (components) | ~19.2K / ~13.1K / ~12.2K |
| Tests | 1,182 (all passing 2026-07-13); coverage 85.5% stmts |
| Published packages | 6 + core, all versions in sync with registry |
| Downloads (last month) | forge 138 · react 57 · rhf 57 · tokens 47 · angular 45 · vue 41 · mcp-figma 23 |
| GitHub | 1 star, 0 forks, 0 real issues, 10 stale dependabot PRs |
| Unreleased | 99 commits on develop (main is 1 ahead / 99 behind) |
| Activity | ~700 commits in 6 weeks by 1 human, then 0 human commits since 2025-10-15 (develop) / 2025-11-11 (main) |
| npm audit | 4C/16H/6M — 0 in production dependency trees |

## Decision framing

Three viable paths (the recommended roadmap details each in [08-recommended-roadmap](./08-recommended-roadmap.md)):

- **A. Revive properly** — ~2–4 weeks of focused work to make claims honest, fix the P0 bugs/packaging, ship the backlog, and make "AI-native" real where it's currently cosmetic. Worth it only if you'll actually use Forge in real projects or want it as a portfolio flagship.
- **B. Freeze honestly** — ~2 days: rotate secrets, ship the security-fix backlog as a final release, correct the README's false claims, archive the repo, deprecate or notice the npm packages. Cheapest defensible end-state.
- **C. Status quo (do nothing)** — costs nothing today, but leaves false advertising + a live npm token on disk + an unfixed security release sitting unpublished under your name.

The one action recommended under **every** path, today: **rotate the npm token and Discord webhooks in `.env`** and re-issue the GitHub Actions secrets.
