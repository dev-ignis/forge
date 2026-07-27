# Roadmap & Plans Assessment — @nexcraft/forge

**Purpose:** For an owner deciding whether/how to revive this project, this document answers three questions: (1) what did the team say it was building, (2) what does the code actually contain, and (3) where do those two diverge. All findings below are drawn from a full read of `plans/README.md`, `plans/implementation-roadmap.md`, all 18 files in `plans/adrs/`, all 16 files in `plans/phases/`, and all 4 files in `plans/priorities/`, cross-checked against `git log`, `npm view`, and targeted `find`/`grep` passes over `src/` and `packages/`. Repo HEAD is `73f3b59` (2025-10-15, the last commit before the project went dormant). Today is 2026-07-13 — roughly nine months of inactivity.

**Bottom line up front:** the plans tree is not a reliable map of the codebase. It over-reports failure in some areas (features shipped but the checklist was never flipped) and under-reports it in others (a master roadmap table that silently omits four phase docs, one of which — SSR — is a completed, published, headline feature). Anyone reviving this project should treat `plans/` as a rich but stale historical record, verify status against code/npm before acting on any single claim, and budget time to reconcile or delete the ~40% of planning docs that are now actively misleading.

---

## 1. ADR Index (18 ADRs + `plans/adrs/README.md`)

All ADRs live in `plans/adrs/ADR-0NN-*.md`. "Reality check" reflects whether the decision is actually implemented in the current codebase/package structure, not just whether the ADR text is internally coherent.

| ID | Title | Status (as written) | One-line essence | Reality check |
|---|---|---|---|---|
| ADR-001 | Web Component Abstraction Layer Selection | Accepted | Use Lit 3.x, not Stencil/pure WC/wrappers/transpilers. | Holds — repo is built on Lit 3; no evidence of a framework switch. |
| ADR-002 | Shadow DOM for Style Encapsulation | Accepted | Shadow DOM by default, CSS Custom Properties as the theming escape hatch. | Holds — consistent with component structure across atoms/molecules/organisms. |
| ADR-003 | CSS Custom Properties for Theming System | Accepted | Hierarchical CSS-variable token system (foundation → semantic → component). | Holds for the token *system*; the Phase 11 "Brand Kit" build-out on top of it never shipped (see §2, §3). |
| ADR-004 | Comprehensive Testing Strategy | Revised (Vitest replaces Web Test Runner) | Vitest+Happy DOM (unit), Chromatic (visual), Playwright (e2e, future), a11y layer. Coverage threshold lowered 90%→80% in Jan 2025. | Partially stale — ADR's own "80% current coverage ~85%, 313 tests" snapshot (Jan 2025) is superseded by `priorities/01-immediate-priorities.md`'s later claim of "1147 fast unit tests + 35 a11y tests" (Oct 2025); ADR was never refreshed with the newer number. Not independently re-run in this pass. |
| ADR-005 | Build Tooling and Module Bundling Strategy | Accepted | Vite dev + Vite Library Mode (Rollup) for production builds. | Holds — no competing build tool found. |
| ADR-006 | State Management Architecture | Accepted | Strict "properties down, events up," no framework-specific state coupling. | Holds — consistent with the framework-wrapper pattern used across `packages/forge-{react,vue,angular}`. |
| ADR-007 | Framework Integration Strategy | Accepted | Thin framework-specific wrapper utilities around core Web Components. | Holds structurally, but the *packaging* of that strategy changed later: what ADR-007 describes as wrapper utilities became fully separate, independently versioned npm packages under Phase 15 (see below) — a reasonable evolution, but ADR-007 was never amended to say so. |
| ADR-008 | Component API Design Standards | Accepted, revised 2025-01-02 | Naming/attribute/event conventions; 2025-01-02 revision mandates native `<button>` internals for interactive components (Shadow DOM disabled-state workaround). | Holds; the revision is a legitimate, documented mid-course correction rather than a contradiction. |
| ADR-009 | Documentation and Developer Experience Strategy | Accepted | Storybook as the central docs platform + automated API doc generation. | Holds — Storybook tooling exists and was actively extended right up to dormancy (AI Panel addon, Oct 8 2025). |
| ADR-010 | Versioning and Release Strategy | Accepted | SemVer 2.0.0 + automated conventional-commit releases; later addendum adopts Changesets for the monorepo. | Holds and is functioning — CHANGELOG.md shows real releases through 0.10.0, contradicting the much gloomier picture painted by Phase 13/14's own unchecked checklists (see §2, §4). |
| ADR-011 | Package Distribution and Module Strategy | Accepted | Multi-package strategy (core + framework packages), ESM primary / UMD legacy. | Directionally correct but textually stale: body still uses placeholder `@forge/ui`/`@forge/react` naming from an early draft, and its own "Monorepo Update" addendum calls `@nexcraft/forge-angular` "planned" — it has since shipped to npm at `1.0.2`. |
| ADR-012 | Accessibility Standards and Implementation | Accepted | WCAG 2.1 AA minimum, AAA where feasible, ARIA APG patterns. | Not independently re-audited against components in this pass; no contradicting evidence found. |
| ADR-013 | TypeScript Interfaces and Type Definitions | Accepted, implemented Aug 29 2025 | Centralized `src/types/`, no inline prop types. | Holds; one of the cleanest, most current ADRs in the set. |
| ADR-014 | AI-Ready Components | Accepted | Per-component `aiMetadata`/`aiState`/`explainState()`/`getPossibleActions()`, ~2KB/component bundle cost. | Holds structurally — this is the foundation of the AI-native feature that did ship (`ai-manifest.json`, 31 components). See §3 for whether the *positioning* built on top of it holds up. |
| ADR-015 | Atomic Design Composition Pattern | Accepted | Molecules MUST reuse Atoms wherever an atom exists (triggered by a DatePicker/Lit templating bug). | Holds — consistent with the atom/molecule/organism directory structure actually present. |
| ADR-016 | Organism Components Design Pattern | Accepted | Organisms compose molecules+atoms into complete UI sections. | Holds — 7 organism directories exist matching the pattern. |
| ADR-017 | AI-Native Development Strategy | Accepted 2024-01-15 (typo, see below), updated 2025-09-12 | Strategic pivot to be "the FIRST AI-native component library"; defines `ai-manifest.json`, `ai-tools/react/*.json`, Storybook AI panel, CI validation. | **Mixed.** The manifest and Storybook panel shipped; `ai-tools/react/*.json` was never built (directory does not exist — confirmed via `find`). Also has a dead link to a phase doc renamed out from under it, and a "2024-01-15" accepted date that is almost certainly a copy/paste year error (every corroborating timestamp — git log, ADR-013/014's Aug 2025 dates — points to 2025). |
| ADR-018 | Unified SSR Architecture for React Components | Accepted, dated 2024-09-11 (same year-typo pattern) | Single component API auto-detects SSR vs client, replacing `ForgeButton`/`ForgeButtonSSR` split. | **Shipped and verified in code** (29 of 30 files in `packages/forge-react/src/components/*.tsx` call `createUnifiedWrapper`), but the ADR's own "Implementation Status" section is stale — it still shows the work as partially pending, and its code reference path (`src/integrations/react/utils/...`) is a location that no longer exists post-Phase-15 package split. |
| — | `plans/adrs/README.md` | Index/meta | Lists all 18 ADRs grouped by theme. | Accurate and current — the one navigation doc in the whole `plans/` tree that was kept in sync. |

**Read-through:** the ADR layer is the most trustworthy part of `plans/` — 14 of 18 hold up cleanly, and the failures are link rot / stale status snippets, not decisions the team walked back. The two real reversals worth flagging to a reviving owner are ADR-011 (packaging model changed shape, text never caught up) and the RHF decision covered under Phase 12 (§2, §4) — a decision that was made twice, in opposite directions, four commits apart.

---

## 2. Roadmap / Phases / Priorities — Claimed vs Verified Status

### 2a. Master roadmap table (`plans/implementation-roadmap.md`, last edited 2025-10-01)

| Phase | Roadmap's claim | Verified reality | Evidence |
|---|---|---|---|
| 0 — Foundation | Completed | Plausible / holds | BaseElement + tooling present; not deeply re-audited. |
| 1 — Atomic Components | Completed | **Confirmed** | 13 atom directories exist matching the plan's list. |
| 2 — Molecules & Differentiators | Completed | **Confirmed** | 8 molecule directories exist. |
| 3 — Organism Components | Completed | **Confirmed** | 7 organism directories exist. |
| 4 — Framework Integration | Completed | **Confirmed, superseded** | `packages/forge-{react,vue,angular}` all published; Phase 4's original wrapper approach was later replaced in structure by Phase 15's package split. |
| 5 — Advanced & Enterprise | Planned | **Confirmed not started** | Phase doc itself says "PLANNED"; no plugin architecture or micro-frontend support found in `src/`. |
| 6 — Production Readiness | Planned | **Contradicted** | Phase 6's own doc header says "IN PROGRESS (Enhanced Web Components Integration Complete)" — the master table understates it. |
| 7 — Competitive Component Gaps | *(not in table)* | **Substantially shipped, invisible in roadmap** | 4 of the doc's "missing core" components (Progress, Toast, Skeleton, Aspect Ratio) now exist in `src/components/`; a proposed File Upload component does not. |
| 8 — Advanced Components & Enterprise | *(not in table)* | **Mostly unstarted** | `ForgeDataGrid` exists; `ForgeCalendar`, `ForgeRichEditor`, VS Code extension, plugin architecture, and a generic component-generator CLI do not. |
| 9 — AI-Native Development | Core Complete | **Accurate for 9.1 only** | `ai-manifest.json` (31 components), schema, generator script, docs all exist. 9.2 (VS Code/Copilot/Cursor integration), 9.3, 9.4 (telemetry, ML training) are 0% started — roughly 26 weeks of planned work with no code evidence. |
| 10 — Unified SSR Architecture | *(not in table)* | **Complete, confirmed in code, but absent from the master roadmap entirely** | Phase 10's own doc says COMPLETE; 29/30 React wrapper components call `createUnifiedWrapper`. This is a shipped, headline differentiator (backed by ADR-018) that a reader of the master roadmap would never know exists. |
| 11 — Theming & Whitelabel | *(not in table)* | **0% started** | Every checkbox in the phase doc is unchecked (~140 sub-items across all components); no Brand Kit/TokenBridge CSS emitter found. Not verified against an actual `dist/` build output — flagged as a claim to double-check before relying on it. |
| 12 — RHF Adapters Split | Completed | **Contradicted by the phase doc's own prose** | Doc says the team rejected a separate `@nexcraft/forge-rhf` package in favor of subpath exports — but a real, separately versioned `packages/forge-rhf` package exists (npm `1.0.2`), created by a commit dated the day *before* the doc's last edit. The decision was reversed in code before the doc was saved, and the doc was never corrected. |
| 13 — Monorepo Platform & Publishing | In Progress | **Further along than the checklist implies** | Checklist is 10/10 unchecked, yet real workspaces, `packages/*` (6 real packages, all live on npm), and Changesets all exist and function. |
| 14 — Release Automation & Versioning | In Progress | **Functionally achieved, structurally different from the plan** | `.changeset/config.json` is fully configured and wired into `release.yml`; CHANGELOG shows successful releases to 0.10.0. The plan's proposal to split/rename workflow files into a dedicated `changesets-release.yml` plus an `archived/` folder was not followed — the automation was folded into the existing `release.yml` instead. Goal met, letter of the plan not. |
| 15 — Framework Integration Package Split | Completed | **Confirmed, and still maintained afterward** | `forge-react@1.0.5`, `forge-vue@1.0.2`, `forge-angular@1.0.2` all live on npm, versions well past what the doc records — evidence of continued work after this doc's last edit. |

### 2b. Priorities docs (`plans/priorities/`)

| Doc | Stated purpose / status | Verified reality |
|---|---|---|
| `priorities/README.md` | Index for 4 priority docs | Accurate as an index; footer date is a stale template artifact ("September 2024" vs actual Sep 16 2025 edit). |
| `priorities/00-security-and-quality.md` | Cross-cutting security/quality backlog | Mostly unstarted (SBOM, package signing, WCAG 2.2, i18n/RTL, cross-browser testing all unchecked). One item, "Developer Experience Quality," is marked complete with specific, plausible code references (`src/utils/errors.ts`, `src/utils/debug.ts`). |
| `priorities/01-immediate-priorities.md` | CI/CD firefighting log, ~10 days before dormancy | **The most operationally revealing doc in the tree.** Opens describing release-pipeline failures as unresolved ("No releases possible to npm"), but a later section in the *same document* reports 7 packages successfully published, and npm/CHANGELOG ground truth confirms releases continued all the way to `forge@0.10.0`. Also documents a real, resolved production incident: `@nexcraft/forge-react` missing `'use client'` directives broke Next.js App Router hydration for a named external client project, fixed and shipped in v1.0.4. Contains a candid self-critique (item 10) admitting the "AI-native" marketing may be premature relative to actual AI-tool consumption — a reframe that was proposed but never executed. |
| `priorities/02-short-term-roadmap.md` | Short-term feature backlog, last edited 2025-10-08 | Lists the Storybook AI Panel as an unchecked, barely-started item — but the *same commit* that last edited this doc also shipped the full 349-line AI Panel implementation, confirmed live in a later release commit. `forge-tokens` and `forge-mcp-figma` are correctly marked complete and confirmed on npm. "Advanced AI Integration" (AI code generation, smart suggestions) is marked "in progress" with no supporting code found — likely aspirational. |
| `priorities/03-long-term-vision.md` | Aspirational long-range vision (W3C standards, $10M ARR, Fortune 500 adoption) | Appropriately unchecked/aspirational throughout; not meant to be near-term-actionable. References an API-compatibility "critical gap" (ForgeNavigationBar/Avatar/Tabs) later addressed by a v0.9.0 selective-imports fix, but the doc's own "Immediate Actions Required" section was never updated to close the loop. |

### 2c. npm package reality check (ground truth, `npm view <pkg> version`)

Plan docs freeze version numbers at the moment they were written; npm doesn't. This table is the fastest way to see how much drift accumulated between "what the plan says shipped" and "what's actually live":

| Package | Roadmap/phase-doc claim | Actual published version |
|---|---|---|
| `@nexcraft/forge` | 0.10.0 (matches current task brief) | 0.10.0 — confirmed |
| `@nexcraft/forge-react` | "0.1.0 published" (Phase 15) | **1.0.5** |
| `@nexcraft/forge-vue` | "0.1.0 published" (Phase 15) | **1.0.2** |
| `@nexcraft/forge-angular` | "0.1.0 published" (Phase 15) | **1.0.2** |
| `@nexcraft/forge-rhf` | Phase 12 implies no separate package exists; Phase 15 says "0.3.0 (existing)" | **1.0.2** |
| `@nexcraft/forge-tokens` | "CLI published" (short-term roadmap) | **0.2.0** |
| `@nexcraft/forge-mcp-figma` | "MCP published" (short-term roadmap) | **0.2.0** |

Every package that has a version number recorded in a plan doc is now *further along* than that doc says. That's a consistent, one-directional drift — not random noise — and it's the clearest quantitative evidence that engineering execution kept outrunning documentation right up to the Oct 15, 2025 dormancy point, rather than the two ever being in sync at any snapshot in time.

### 2d. Claims flagged but not independently re-verified in this pass

Anyone reviving the project should treat these as open questions, not settled facts, before relying on them:

- **Component count** — cited as 27, 28, 30, 31, and 33 in different docs (roadmap metrics, ADR-017 changelog, Phase 9/10 language, `ai-manifest.json`'s actual populated count, and a Phase 15 draft, respectively). No single canonical number is used consistently across the plans tree; a revived project should pick one, document how it's counted (directories vs. files vs. framework-wrapped variants), and use it everywhere.
- **Bundle size ("7.8KB core")** — cited in the roadmap's metrics table, not independently rebuilt or measured in this pass.
- **Test count growth** ("313 tests" per ADR-004's Jan 2025 snapshot vs. "1147 fast unit tests + 35 a11y tests" per `priorities/01`'s Oct 2025 snapshot, roughly a 4x increase) — plausible given nine months of active work, but not confirmed by actually running the suite.
- **Phase 11 (Theming) deliverables** — `dist/styles/base.css`, `dist/styles/themes/{light,dark}.css`, and the Brand Kit script are not verified against an actual `dist/` build in this pass. The phase's checklist being 100% unchecked is suggestive that nothing shipped, but not conclusive proof — it's possible (if unlikely) that some of this landed under a different phase's banner without a doc update, the same pattern seen elsewhere in this tree.
- **Whether the AI-native reframe (`priorities/01` item 10) was acted on in the final 10 days** — commits between Oct 5 and Oct 15, 2025 (the last stretch before dormancy) were not individually reviewed for this; worth a targeted `git log` pass before assuming the reframe never happened at all.
- **ADR-017/018's "2024" dates** — flagged as likely year-typos based on pattern-matching against every other timestamp in the repo, but not provable without the original author or a `git blame` on those exact lines.

---

## 3. Narrative: what the team was building, and where it stopped

**Aug–Sep 2025 — core build-out.** ADRs 001–016 are written and substantially executed in the same window: Lit 3 foundation, Shadow DOM + CSS custom-property theming, the full atomic/molecule/organism component set (28 directories, ~30 components), and the AI-metadata system (ADR-014, Phase 9.1) that becomes the project's headline differentiator, shipping as `ai-manifest.json`.

**Mid-September 2025 — reorganization.** A single large commit (`0222a887`) restructures the phase numbering: the old "Phase 11: AI Manifest & Tooling" is renamed to "Phase 11: Theming & Whitelabel," with the AI-manifest content folded into Phase 9 instead. This single rename is the direct cause of a dead link in ADR-017 that was never fixed.

**Sep 15–16, 2025 — the monorepo pivot.** This is the most consequential and least-well-documented stretch. In quick succession: RHF support is split out into its own real, independently versioned package (`packages/forge-rhf`), directly reversing a decision that Phase 12's own doc still describes as rejected the very next day. Vue and Angular integrations are extracted into `packages/forge-vue` and `packages/forge-angular`. Phases 12, 13, 14, and 15 are all authored in this same batch, describing intents and checklists that the actual implementation immediately outran — by the time each doc was saved, code had often already moved past what the doc proposes.

**Late Sep–early Oct 2025 — plans cleanup.** A trio of commits four-to-nine minutes apart deletes 14+ obsolete planning files and two whole directories (`architecture/`, `research/`), and separately removes `plans/metrics/` and `plans/process/`. `plans/README.md`, the top-level index, is never touched by any of these commits and is left permanently describing a directory structure that stopped existing on Oct 1, 2025.

**Oct 3–8, 2025 — firefighting, then a final feature push.** `priorities/01-immediate-priorities.md` documents CI/CD release-pipeline breakage (artifact SHA mismatches, package-lock desync, a broken beta-release workflow) running in parallel with a genuine, well-handled production incident: a Next.js hydration bug reported by a real external client, fixed and shipped as `forge-react@1.0.4`. On Oct 8, in the same commit that touches `priorities/02-short-term-roadmap.md`, the team ships the Storybook AI Panel, and separately publishes `forge-tokens` and `forge-mcp-figma` (a Figma integration) — the last burst of net-new feature work. Forge core reaches `0.10.0`.

**Oct 15, 2025 — dormancy.** The final commit (`73f3b59`) is a routine dependency-bump merge, not a deliberate stopping point — there is no "wrapping up" commit, no final status update, no note explaining the pause. The project simply stops mid-stream.

**What was genuinely in-flight when work stopped:**
- Phase 11 (Theming & Whitelabel / Brand Kit) — 0% started, the one major planned surface with literally no code evidence.
- Phase 9.2–9.4 (AI tooling: VS Code/Copilot/Cursor integration, telemetry, ML-assisted generation) — proposed as ~26 weeks of work, never begun.
- The "AI-native" marketing reframe proposed in `priorities/01` item 10 (make AI methods tree-shakeable/opt-in, soften "AI-native" language to "Runtime Introspection") — explicitly flagged internally as needed, never executed.
- Phase 8's enterprise feature set (ForgeCalendar, ForgeRichEditor, plugin architecture, performance-monitoring dashboard UI) — essentially untouched.

**What was abandoned outright (decided against, not just unstarted):** the standalone RHF package idea was abandoned *in favor of* the subpath-export approach, and then that abandonment was itself abandoned days later when the team built the standalone package anyway — a decision reversed twice in the span of about a day, with the documentation only capturing the middle state.

### 3a. The Oct 1, 2025 "plans cleanup" — root cause of most dead links

Worth understanding in detail because it explains *why* the plans tree looks the way it does, and it's a cautionary pattern for anyone revising docs on a revived project. Three commits, four and nine minutes apart, cut `plans/` from 64 files across 10 directories down to 47 files across 8:

1. `79bd534` (2025-10-01 22:36:37) — "plans: clean up obsolete and redundant planning documentation." Deletes 14 files (component-specific implementation plans, three architecture docs, a deployment plan, CLI/semantic-release migration docs, metrics/risk-mitigation, team-structure, unique-value-proposition) and archives `research/*` to `docs/archive/research/` and `enterprise/*` to `plans/archive/future-features/`.
2. `be14978` (2025-10-01 22:40:07), four minutes later — "docs/plans: remove archive directories - obsolete historical content." Deletes the archive directories the previous commit had just created. Git history still holds the content; the working tree does not.
3. `a258f4c` (2025-10-01 22:45:42), five minutes after that — "docs: remove obsolete plans/metrics and plans/process folders." Deletes two more folders and claims in its own commit message to have "Updated implementation-roadmap.md to remove broken references" — but, as documented in §1/§4, it left a mangled truncated link and missed three further dead links in the same file's "Quick Reference" section.

The net effect: a fifteen-minute window of well-intentioned cleanup produced most of the dead links that persist in the tree today. `plans/README.md`, the top-level index, was not touched by any of these three commits — its last edit remains Sep 15, 2025, two weeks *before* the cleanup — which is why it is the single most stale file in the entire tree, still describing `architecture/`, `process/`, and `research/` subdirectories that stopped existing on Oct 1, 2025.

---

## 4. Contradictions between plans and code

These are the specific places where trusting the plan doc over the code (or vice versa) would give a materially wrong picture:

1. **RHF packaging (Phase 12 vs. `packages/forge-rhf` + npm).** Doc explicitly says a separate package was rejected; a separate package exists and is published (`@nexcraft/forge-rhf@1.0.2`). Trust the code.
2. **SSR completeness (Phase 10 vs. `packages/forge-react/src/components/*.tsx`).** Doc's own top-level banner says COMPLETE but its embedded checklists still show unchecked items and a "Next Steps" section listing conversion work as outstanding. Code confirms COMPLETE is correct (29/30 wrapper components use `createUnifiedWrapper`) — the checklist-level detail is what's stale, not the headline.
3. **Release pipeline health (`priorities/01` vs. CHANGELOG.md / npm).** Doc's opening section reads as an unresolved outage ("No releases possible to npm"); actual release history shows successful publishes continuing for another two weeks, through `forge@0.10.0`.
4. **Storybook AI Panel (`priorities/02` vs. commit `73acc2b`).** Doc describes the panel as barely started; the very commit that last touched the doc also shipped the full working implementation.
5. **Master roadmap completeness (`implementation-roadmap.md` vs. `plans/phases/`).** The roadmap table simply omits Phases 7, 8, 10, and 11. This isn't a status error, it's an *invisibility* error — Phase 10 (SSR), a completed and published differentiator, does not appear in the one document meant to give a bird's-eye view of the project.
6. **Component count.** No canonical number: 27 (roadmap metrics / ADR-017 changelog), 28 (measured leaf directories), 30 (Phase 9/10 language), 31 (`ai-manifest.json`'s actual populated count), 33 (long-term-vision.md, a Phase 15 draft). Not all wrong — some count directories vs. files vs. framework-wrapped variants — but no single number is used consistently, which matters for any external-facing claim ("30+ components") a revived project might want to keep making.
7. **Coverage target vs. governing ADR.** The roadmap's metrics table still cites a ">90%" test-coverage target; ADR-004, the document that actually governs the testing strategy, revised that threshold down to 80% in January 2025. The roadmap was never updated to match its own governing ADR.
8. **AI-native positioning vs. internal self-critique.** `ai-manifest.json`/`ai-index.json`/README all market the project as AI-native; `priorities/01` item 10 candidly flags that no AI tools currently consume these methods and that the positioning "may be premature" — an internal doubt that was never resolved one way or the other before the project went dormant.

---

## 5. Still worth doing vs. now obsolete

**Worth doing if reviving:**
- **Fix `plans/README.md`** — it is the single navigation entry point and is the most broken file in the tree (9 dead links, wrong directory structure, missing ADR 013–018 from its own index). Low effort, high leverage for anyone new picking this up.
- **Add Phases 7, 8, 10, 11 to the master roadmap table** and correct Phase 6's status — restores an accurate bird's-eye view; Phase 10 in particular should be promoted, not omitted, since it's a shipped differentiator.
- **Reconcile ADR-011's packaging narrative and ADR-017/018's stale paths/dead links** — quick fixes that remove real confusion for a new contributor.
- **Resolve the AI-native positioning question** (`priorities/01` item 10) — this is a genuine open strategic question, not a docs typo, and it's more urgent now: nine months on, whether "AI-native" is still a differentiator or table stakes should be re-evaluated against the current LLM-tooling landscape before continuing to lead with that claim.
- **Phase 11 (Theming & Whitelabel)** — 0% started but still a coherent, scoped, plausible next increment on top of the token system that *did* ship (ADR-003); worth keeping on a revived roadmap if the target market cares about white-labeling.
- **File Upload component (from Phase 7)** — the one concretely-scoped, still-missing "core gap" component from an otherwise-shipped phase; cheap to finish if reviving component work.

**Now obsolete / likely not worth pursuing as originally scoped:**
- **Phase 9.4** (ML model training, usage telemetry, feedback loops) — this was speculative even at the time (26 weeks of work with zero code evidence) and the AI tooling landscape has moved fast since Oct 2025; re-scope from scratch rather than resurrect the original plan.
- **VS Code / Copilot / Cursor extension work (Phase 8, Phase 9.2)** — the ecosystem for editor-native AI integration has changed substantially in nine months; the original plan's specifics are likely stale even if the goal is still valid.
- **The abandoned/reversed RHF subpath-export design** — code already moved on to the standalone package; no reason to revisit the rejected approach.
- **Long-term-vision.md's most speculative items** (patents, $10M ARR target, Fortune 500 named-account goals) — reasonable to keep as directional flavor but not as literal near-term planning input.
- **Workflow-file reorganization proposed in Phase 14** (rename to `changesets-release.yml`, archive old workflows to `.github/workflows/archived/`) — the functional goal (automated Changesets releases) was already achieved a different way; the literal reorg has no remaining value.

---

## 6. Document-hygiene issues worth knowing about before trusting any single plan file

- Two files have visible text corruption from bad edits/merges: `implementation-roadmap.md` (a mid-string truncated markdown link, `[Developmen---`) and `priorities/03-long-term-vision.md` (a duplicated, fused closing paragraph).
- `plans/README.md` and `priorities/README.md` both carry stale "Last Updated" footers off by a year or more (Sep 2024 vs. actual Sep 2025 edits) — likely template artifacts never filled in, not evidence of an actually-older document.
- ADR-017 and ADR-018 both carry "2024" acceptance dates that contradict every other timestamp signal in the repo (git log, ADR-013's Aug 2025 date) — almost certainly year typos, flagged but not provable without the original author.
- These are cosmetic, but collectively they signal that `plans/` was not treated as a maintained source of truth in its final months — status updates lagged shipped code by days to weeks throughout Sep–Oct 2025, and the gap was widening, not closing, right up to dormancy.

---

## 7. If reviving: a first-week checklist

In priority order, cheapest-and-highest-leverage first:

1. **Rebuild `plans/README.md` from scratch** rather than patching it — it's pointing at a directory structure that hasn't existed since Oct 1, 2025, and it's the first file anyone new will open.
2. **Regenerate the master roadmap table** (`implementation-roadmap.md`) to include Phases 7, 8, 10, and 11, and to correct Phase 6's status. This single fix would have prevented the biggest blind spot found in this review — a completed, published SSR architecture (Phase 10 / ADR-018) that's currently invisible to anyone reading only the top-level roadmap.
3. **Run the actual test suite and rebuild** to settle the open verification items in §2d (test count, bundle size, Phase 11 build artifacts) before quoting any of those numbers externally.
4. **Decide the AI-native positioning question** (`priorities/01` item 10) one way or the other — either invest in the tooling that would make the claim true (`ai-tools/react/*.json`, editor integrations) or soften the marketing language. Nine months of additional LLM-tooling market movement makes this more urgent now than when it was first raised, not less.
5. **Fix the ADR-017/018 dead link and stale file path**, and correct ADR-011's leftover `@forge/ui` naming — small, mechanical fixes that remove real friction for a new contributor trying to trust the ADR layer.
6. **Triage Phase 11 (Theming) as the next real feature increment** if white-labeling matters to the target market — it's the one substantial, well-scoped, 0%-started phase sitting directly on top of infrastructure (ADR-003's token system) that already shipped.

**Sources:** `plans/README.md`, `plans/implementation-roadmap.md`, `plans/adrs/ADR-001` through `ADR-018` + `plans/adrs/README.md`, `plans/phases/phase-0` through `phase-15` (16 files), `plans/priorities/README.md` + `00`–`03`, cross-checked against `git log`, `npm view <pkg> version` for all 7 published packages, and `find`/`grep` passes over `src/`, `packages/`, and `.github/workflows/`.
