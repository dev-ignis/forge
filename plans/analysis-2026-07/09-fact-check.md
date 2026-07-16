# Fact-Check: Public Claims vs. Reality

> Part of the [July 2026 deep analysis](./README.md). Sixteen claims — ten seeded from the README/package.json, six harvested during deep-read — were each given to an independent adversarial verifier instructed to refute them with concrete evidence. Verdicts below. Every number was measured on 2026-07-13 against `develop` HEAD `73f3b59` (2025-10-15) and the live npm registry / GitHub API.

## Scoreboard

| # | Claim | Verdict | Reality in one line |
|---|-------|---------|---------------------|
| 1 | README badge: **86.4% test coverage** | ❌ REFUTED | No committed coverage data exists (`coverage/` is gitignored); the local artifact measures **85.52%** statements; README elsewhere says 87.2% — three mutually inconsistent numbers, none correct |
| 2 | README badge: **bundle size <10KB** | ❌ REFUTED | Main ES bundle is **467KB raw / 91KB gzip** (~9× over). Per-component "selective imports" are <1KB shims that each `import '../nexcraft-forge.es.js'` — the full 91KB — so real per-component cost is 91KB gzip |
| 3 | README: **"26+ components"** | ✅ CONFIRMED | Actually 30 registered custom elements in `src/components` (+1 dev-tool dashboard = 31). "26+" is literally true but README self-contradicts (26, 27, 31 all appear) and omits `forge-avatar` and `forge-data-grid` from its own catalog |
| 4 | README badge: **WCAG 2.1 AA, "100% compliant"** | ❌ REFUTED | Real axe-core audits cover **5 of 29 components (~17%)**, all organisms. Zero atoms, zero molecules have any a11y-labeled test. ADR-004's planned `@axe-core/playwright` E2E layer was never implemented |
| 5 | package.json ships `ai-tools/` and `docs/patterns/` | ⚠️ PARTIAL | Both are declared in `files` but **neither exists** — deleted 2025-10-01 (commits `f839f00`, `cc3f767`) without updating package.json. Published 0.10.0 tarball (136 files, verified by hash) contains neither. The `ai` metadata block also links a nonexistent `AI_COMPONENT_CATALOG.md` |
| 6 | `sideEffects: false` is safe for tree-shaking | ❌ REFUTED | All 30 components register via top-level `customElements.define` (a side effect). The 28 `dist/exports/*.js` shims are bare side-effect imports — the textbook pattern bundlers eliminate under `sideEffects:false`. ADR-011 specified the correct fix (`sideEffects` array + per-component `define.js`); never implemented. Bonus bug: `globalThis.NexcraftForge` lookup in every shim is dead code (only the UMD build sets it) |
| 7 | `"@nexcraft/forge-react": "workspace:*"` works under npm | ⚠️ PARTIAL | npm has **no** `workspace:` protocol support (would throw `EUNSUPPORTEDPROTOCOL`) — it works only because arborist synthesizes a workspace edge first, so the spec text is never parsed. Fragile coincidence, verified working in CI today |
| 8 | Release pipeline publishes all 6 packages | ⚠️ PARTIAL | True end-state (all 6 live on npm at stated versions), but the `publish-packages` script covers only 4/6 and is dead code; the real path is changesets via `release.yml`; **beta-release covers only 2/6** packages |
| 9 | `.env` at repo root contains real secrets | ✅ CONFIRMED | Live-format **npm granular token + 3 Discord webhook URLs**, mirroring the repo's GitHub Actions secret names. Properly gitignored, never committed in any of 700 commits (pickaxe-verified). Still: rotate them |
| 10 | Components implement real `getPossibleActions`/`explainState`/`aiState` | ✅ CONFIRMED | 30/30 component classes override the methods with genuine state-dependent logic (verified by reading 5+ implementations + the ai-metadata test suite). This claim holds up well |
| 11 | forge-select "scheduled update after update" warning has ambiguous cause | ❌ REFUTED (ambiguity) | Root cause is exact: `this.filteredOptions`/`this.searchQuery` reassignment inside `updated()` at `select.ts:395-396`. The `setTimeout` focus call is provably unrelated. Never fixed since authored 2025-08-30 |
| 12 | skeleton.ts CSS `attr()` pattern never worked | ✅ CONFIRMED | Empirically reproduced failure in Chrome 142 and Firefox 136; the pattern was non-functional in every browser the library targets. Masked by a redundant JS inline-style path, so user impact ≈ 0 (dead code) |
| 13 | Some consumer passes untrusted URLs into `<forge-icon src>` (XSS reachable) | ❌ REFUTED | The unsanitized `unsafeHTML` SVG sink is real, but exhaustive search found only 3 hardcoded literal `src` usages (test + stories). No demo, wrapper, or internal component wires dynamic input to `src`. Latent, not exploitable in-repo |
| 14 | AI manifest is treated as ground truth despite hardcoded a11y boilerplate | ⚠️ PARTIAL | The `a11yMappings` table is 100% hand-authored, with a generic "WCAG AA compliant" fallback (applied to `forge-performance-dashboard`, which has zero ARIA in source). Three byte-identical AI-instruction files do tell agents to trust it — but actual downstream reliance is negligible (1 star, 138 downloads/mo), and the committed manifest is provably out of sync with its own source (`forge-card.border` missing) |
| 15 | README says 27 components (12 atoms) but atoms has 13 dirs | ✅ CONFIRMED | Avatar was added 2025-09-09 and never entered the README table or stats. True totals: 28 dirs / 30 registered elements |
| 16 | Molecule docs exist 1:1 and are linked correctly | ✅ CONFIRMED | All 8 exist and link fine — but git dates show 5 of 8 source dirs changed *after* their doc's last commit, so content staleness is likely (and confirmed elsewhere: fabricated API tables in button/select/data-table docs) |

## Themes

1. **The engineering is better than the marketing.** The three claims that survived cleanly (component count, AI methods, secrets hygiene) are about code. The three worst refutations (coverage badge, bundle size, WCAG) are marketing numbers in the README that were never generated from any source of truth.
2. **Docs/config drift is systemic, not incidental.** Dead `files` entries, dead links, phantom npm scripts, fabricated method tables, three contradictory component counts — all trace to a fast Aug–Oct 2025 sprint where cleanup commits (esp. 2025-10-01) deleted things without updating references.
3. **The distribution story is broken at both ends.** `sideEffects:false` risks components being tree-shaken out entirely, while "selective imports" secretly cost the full 91KB gzip. The project's own ADR-011 documents the correct design; it was never implemented.
4. **Security posture is fine in git, weak on disk/process.** Nothing leaked into history, but live credentials sit in a plaintext `.env` (rotate them), npm publishing has no provenance, and the account is a single personal login for all 6 packages.

## Sources

Adversarial verifier transcripts and raw measurements: `~/.claude/jobs/68655e73/tmp/forge-analysis/` (`sideeffects-claim.md`, `bundle-size-claim.md`, `skeleton-attr-claim.md`, `npm-registry-ownership.md`, `license-consistency-check.md`, plus per-area notes).
