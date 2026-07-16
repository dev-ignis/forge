# Component Inventory — @nexcraft/forge v0.10.0

Repo: `/home/air_buster/rollg/ignis/apps/forge`. Branch `develop`, last commit `73f3b594e` on
2025-10-15 (dormant ~9 months as of 2026-07-13). Single-author project
(`ignis <maildevcom+1@gmail.com>`) — effectively a solo effort, not a team-maintained library.

## TL;DR

Forge ships **30 distinct custom elements** (14 atoms, 9 molecule-tier elements across 8
directories, 7 organisms) — not the 27 the README claims (`README.md:434,520` says "12 atoms, 8
molecules, 7 organisms"; the atoms directory actually has 13 folders / 14 elements, and the
organism count is contradicted between two sections of the same README). Engineering quality is
genuinely uneven but not bad: **every component has a passing test file and a Storybook file**
except `data-grid`, which has zero stories despite being the single largest, most complex file in
the repo (1,189 LOC). All 528 atom tests pass; no `.skip`/`.only` tests exist anywhere in atoms or
molecules.

The headline risk for anyone reviving this project is **not code rot, it's trust in the
"AI-native" pitch**. Three things undercut it hard: (1) two real, unsanitized-HTML injection
points (`forge-icon`'s SVG loader, `forge-tooltip`'s `htmlContent` mode) that are live XSS vectors
if fed untrusted input; (2) the component docs (`docs/components/**/*.md`) are **systematically
fabricated** — across all 7 organisms, only 3 of 43 documented "public methods" actually exist and
match their documented signature; (3) the generated `ai-manifest.json` mis-categorizes every
molecule and organism as `"category": "atom"`, invents at least one ARIA role, and goes stale (it
wasn't regenerated after `forge-card`'s `border` prop was added). None of this is exotic — it's
the kind of drift you get from a solo project moving fast for ~6 weeks and then stopping cold.

Below: full inventory table, per-component notes (issues only — see the source analyst notes for
full behavioral descriptions), cross-cutting patterns, a severity-ranked bug list, and
recommendations.

## Component Inventory (all 30 elements)

| Component | Tier | LOC | Props / Events / Slots | AI metadata depth | Tests | Stories | Notable issues |
|---|---|---|---|---|---|---|---|
| `forge-alert` | atom | 485 | 16 / 1 / 2 | Stub (never sets `aiMetadata`) | 24 pass | yes | Duplicated perf-overlay code; not on project's own perf-warning TODO list but shares the root cause |
| `forge-aspect-ratio` | atom | 361 | 6 / 0 / 1 | Static + custom `aiState` | 45 pass | yes | JS-only object-fit application misses late-slotted content; no perf overlay at all |
| `forge-avatar` | atom | 437 | 10 / 1 / 0 | Reactive, populates `componentState` | 23 pass | yes | Dead `avatar/index.ts` barrel (127 B, unused) |
| `forge-badge` | atom | 503 | 18 / 0 / 1 | Stub | 34 pass | yes | Named in project's own unresolved Lit perf-warning TODO; imperative `style.transform` animation bypasses Lit |
| `forge-button` | atom | 568 | 15 / 1 / 1 | **Full static AI metadata (only atom)** | 47 pass | yes | `variant="ghost"/"link"` has no CSS; `PerformanceMode` type mismatch vs. `BaseElement`; ripple-id collision risk |
| `forge-checkbox` | atom | 538 | 20 / 2 / 0 | Stub | 32 pass | yes | Named in perf-warning TODO; largest prop count, 8 are duplicate `BaseElement` fields |
| `forge-icon` | atom | 588 | 14 / 0 / 0 | Stub (despite being the most-reused atom) | 20 pass | yes | **`unsafeHTML(svg)` from arbitrary fetched URL — real XSS vector** (icon.ts:400); named in perf-warning TODO |
| `forge-input` | atom | 645 | 21 / 7 / 2 | Reactive, populates `componentState` | 57 pass | yes | Incompatible `checkPerformance()` override signature vs. base class |
| `forge-progress` | atom | 351 | 6 / 0 / 1 | Static + custom `aiState` | 24 pass | yes | Slot-content detection via raw `innerHTML` string read, not `slotchange` |
| `forge-progress-circle` | atom | 420 | 9 / 0 / 1 | Static + custom `aiState` | 32 pass | yes | Same slot-detection smell as `progress`; awkward 2-boolean label API |
| `forge-radio-group` | atom | 564 | 12 / 2 / 0 | Static + `getAIDescription()` | 38 pass | yes | Correctly reuses base perf logic but still carries the dead duplicated CSS block |
| `forge-select` | atom | 830 (largest atom) | 15 / 4 / 0 | Static + `getAIDescription()` | 42 pass | yes | **`aria-labelledby`/`aria-describedby` reference IDs that don't exist in the template**; reproduced the live "scheduled update after completion" Lit warning during the test run |
| `forge-skeleton` | atom | 259 (smallest atom) | 6 / 0 / 0 | Static + custom `aiState` (incl. live computed size) | 33 pass | yes | Dead CSS `attr()` rule, confirmed non-functional by live browser test (Chrome 142, Firefox 136) — harmless, JS path overrides it |
| `forge-switch` | atom | 521 | 13 / 2 / 0 | Static + `getAIDescription()` | 46 pass | yes | Cleanest atom overall; still carries the dead duplicated perf-overlay CSS |
| `forge-card` | molecule | 528 | 14 / 2 / 5 | Rich static | 25 pass | yes | `expand` AI action hard-coded `available: false`; 4 dead "has-slot" state fields never consumed in render |
| `forge-date-picker` | molecule | 935 (largest molecule) | 14 / 1 / 0 | Rich static, **inaccurate** | 46 pass | yes | AI metadata claims `ArrowKeys` support that doesn't exist in code; no focus trap on calendar dialog; zero keyboard tests |
| `forge-dropdown` | molecule | 815 | 10 / 2 / 0 | Rich static, accurate | 71 pass (largest test suite) | yes | DOM focus never moves during keyboard nav, no `aria-activedescendant`; mismatched `combobox`+`menu` ARIA roles |
| `forge-form-field` | molecule | 549 | 20 / 4 / 0 | Thinner (2-entry `interactions`) | 35 pass | yes | **Hardcoded literal `aria-describedby` IDs shipped to every real instance regardless of `name`** — broken for real usage, tests pass only because the fixture is literally named "accessible" |
| `forge-modal` | molecule | 623 | 13 / 2+legacy / 3 | Rich static | 27 pass | yes | Best focus trap in the library; `getPossibleActions()` advertises a `toggle()` method that doesn't exist |
| `forge-multi-select` | molecule | 848 | 10 / 1 (5 dispatch sites) / 0 | Rich static, goes stale | 30 pass | yes | **Unescaped regex from user search input throws `SyntaxError`** on any regex metacharacter — untested |
| `forge-toast` | molecule | 604 | 8 / 2 / 3 | Thin `getPossibleActions()`, deepest `@csspart` docs | present | shared w/ container | Emoji default icons, no `aria-hidden`/text fallback; dual dismiss events (one deprecated, still current at v0.10.0) |
| `forge-toast-container` | molecule | 435 | 3 / — / — | Thin | present | shared w/ toast | Global `window.forgeToastContainer` singleton pattern |
| `forge-tooltip` | molecule | 586 | 10 / 1 / 1 | Rich static, accurate role | 28 pass | yes | **Unsanitized `.innerHTML=` bind when `htmlContent=true` — live XSS vector**, untested; duplicate/likely-dead `aria-describedby` on host |
| `forge-accordion` | organism | 263 (smallest organism) | 3 / 1 / — | `aiState` only (generic metadata) | 22 pass | yes | `expandAll()`/`collapseAll()` advertised as AI actions but never called anywhere (private, unreachable); docs 0/6 methods verified |
| `forge-data-grid` | organism | 1,189 (largest of all 30) | 16 / 9 / — | **Only organism with full static `aiMetadata`** | 54 pass (most of any organism) | **none — zero stories** | Missing from `organisms/index.ts` barrel; column resize is a no-op stub; own local `VirtualScroller` (2nd incompatible implementation in repo) goes stale on filter/sort; docs 0/9 methods verified |
| `forge-data-table` | organism | 926 | 16 / 2 / — | `aiState` only | 17 pass (thinnest ratio) | yes | Imperative DOM manipulation bypasses Lit render (hardcoded placeholder `<thead>` briefly visible); virtual scroller never told about data changes; docs: default value inverted, 3 fabricated events, 0/6 methods verified |
| `forge-navigation-bar` | organism | 668 | 9 / 2 / — | `aiState` only | 37 pass | yes | Docs 0/3 methods verified (2 exist but private) |
| `forge-pagination` | organism | 635 | 12 / 2 / — | `aiState` only | 23 pass | yes | Docs 0/6 methods verified (1 exists but private) |
| `forge-tabs` | organism | 626 | 7 / 3 / — | `aiState` only | 26 pass | yes | Drag-reorder and lazy-loading are genuinely implemented (not stubs); docs 0/4 methods verified |
| `forge-tree-view` | organism | 905 | 6 / 2 / — | `aiState` only | 30 pass | yes | **Selected/disabled visual states never render** — active template's CSS classes don't match any stylesheet rule; ~69 LOC of orphaned dead renderer; docs are the *most* accurate of the 7 (3/9 verified) |

Atom-tier totals: 6,835 component LOC, 5,560 test LOC (528 tests, 0 skipped), 6,210 story LOC.
Molecule-tier totals: 5,928 / 3,928 / 3,600. Organism-tier totals: ~5,212 / ~3,599 / ~2,415
(data-grid contributes 0 to the stories figure). Grand total across all three tiers, tests, and
stories: **~44,700 LOC**.

## Atoms — issues worth a reviewer's attention

`forge-button` is the only atom that actually backs the "AI-native" marketing claim: a ~170-line
static `AIComponentMetadata` object with per-framework code samples, a11y guidance, and testing
patterns (`button.ts:14-186`). Every other atom uses the thinner `AIMetadata` shape, and four of
them (`alert`, `badge`, `checkbox`, `icon`) never set it at all — `getAIDescription()` on
`forge-checkbox` literally returns `BaseElement`'s generic fallback string despite having a
genuinely detailed `explainState()`. `forge-icon` is the most concerning of the fourteen: it
fetches an arbitrary URL, parses the response as SVG, and injects it via `unsafeHTML` with no
allow-list beyond "is there an `<svg>` tag" — a real stored/reflected XSS vector the moment any
caller passes a non-trusted `src`. `forge-select`, the largest and most complex atom (830 LOC,
effectively a full combobox), has a genuine accessibility bug: its `aria-labelledby`/
`aria-describedby` point at DOM ids that are never rendered anywhere in the template, so the
label/description association is silently broken; it's also the component that reproduced the
project's own self-documented, never-fixed "scheduled an update after completion" Lit performance
warning live during the test run. `forge-skeleton`'s CSS `attr()` custom-property trick was
fact-checked directly (live headless Chrome 142 and Firefox 136 tests) and confirmed
non-functional in any browser version the project targets — but it's dead code, not a live bug,
because a redundant JS path already sets the same value correctly.

## Molecules — issues worth a reviewer's attention

The two most serious findings in the whole codebase live here. `forge-form-field` hardcodes three
literal `aria-describedby` IDs (`error-accessible`, `warning-accessible`, `success-accessible`)
into every instance's markup, with a comment admitting it's "for test consistency" — the real,
template-generated IDs are name-interpolated, so this is broken for every field not literally
named `"accessible"` (which happens to be the test fixture's name). `forge-multi-select` builds a
`RegExp` directly from unescaped user search input; typing any regex metacharacter throws an
unhandled `SyntaxError` and breaks rendering — a crash triggerable by normal end-user typing, and
untested. `forge-tooltip`'s `htmlContent` mode binds `.innerHTML=` with zero sanitization — the
second live XSS vector in the library. `forge-date-picker` (the largest molecule at 935 LOC)
claims arrow-key calendar navigation in its AI metadata that simply isn't implemented, and its
calendar popover — despite `role="dialog"` — has no focus trap, unlike `forge-modal`, which has
the best-implemented focus management of any component in the repo. `forge-modal` itself has one
inconsistency: it advertises a `toggle()` action via `getPossibleActions()` that doesn't exist as
a callable method.

## Organisms — issues worth a reviewer's attention

`forge-data-grid` is the single largest, most complex file in the repository (1,189 LOC, richest
AI metadata of any organism) and yet is completely absent from `organisms/index.ts`'s barrel
export and has **zero Storybook stories** — the only component in the whole library without one.
Several of its advertised features are stubs: column resize is a literal no-op with a placeholder
comment, and its own locally-defined `VirtualScroller` class is a second, incompatible
implementation of the same windowing logic that `data-table` and `tree-view` already share from
`src/utils/virtual-scroller.ts` — worse, it goes stale after filter/sort because nothing calls
`updateData()` outside of resize events. `forge-data-table` bypasses Lit's declarative rendering
entirely for its header/body — `render()` emits a hardcoded placeholder `<thead>` with literal
columns ("ID/Name/Email/Status/Actions") that gets overwritten imperatively via manual DOM
mutation in `updated()`, which risks a visible flash on every render and makes the component's
real behavior invisible to anyone reading `render()`. `forge-tree-view` has a confirmed,
currently-broken visual bug: the live template's BEM-style classes (`tree-node--selected`,
`tree-node--disabled`, etc.) don't match anything in the component's own stylesheet, which was
never updated after a rewrite — so selection highlighting and disabled dimming render as if
unstyled. The biggest cross-cutting finding here isn't a code bug at all: **across all 7 organism
doc pages, only 3 of 43 documented "public methods" actually exist as callable public API**, all
three in `tree-view`. This is systemic enough (every single organism affected) to suggest the docs
were authored aspirationally rather than generated from source — and it directly undermines the
project's AI-tooling pitch, since an AI agent trusting these docs would write code calling
nonexistent methods for the vast majority of organism components.

## Cross-cutting patterns

**Inconsistent AI-metadata depth is the through-line of the whole library.** Of 30 components,
only `forge-button` (atom) and `forge-data-grid` (organism) implement the full static metadata
contract the "AI-native" pitch promises; most atoms/molecules use a thinner variant, and 6 of 7
organisms never set `aiMetadata` at all (only overriding the `aiState` getter), so
`aiState.metadata.purpose` returns `BaseElement`'s literal default `"UI Component"` at runtime for
the majority of organism components. Static `ai-manifest.json`, separately, mis-categorizes every
molecule and organism as `"category": "atom"`, conflates private/internal state fields with
public props (confirmed for `forge-card`: 4 private `@state` fields listed, the real `border` prop
omitted), and fabricates at least one ARIA role (`forge-date-picker` listed as
`role: "combobox"`, which the source never sets).

**Performance-monitoring code is reimplemented four different, incompatible ways** across the 13
atom directories: 3 atoms correctly call the inherited `BaseElement.checkPerformance()`; 4 atoms
(`alert`, `badge`, `checkbox`, `icon`) fully reimplement it with shadowed reactive state (this is
also the confirmed root cause of the project's own unresolved "scheduled update after completion"
Lit warning); 2 atoms (`button`, `input`) override it with an incompatible method signature and a
separate parallel tracking object; 5 atoms implement nothing at all, making the inherited
`show-metrics`/`dev-mode` properties silent no-ops. Net effect: identical public API properties,
inherited by all 14 atoms, behave differently depending on which atom you're looking at. A
verbatim ~25-line `.performance-overlay` CSS block is duplicated across 7 files regardless of
which perf-tracking approach each one uses.

**Dead code is widespread but low-severity individually.** Unused barrel files
(`avatar/index.ts`, `button/index.ts`, `input/index.ts`); slot-presence state tracked via
`slotchange` listeners but never consumed in `render()` (`card`'s 4 fields, `modal`'s
`hasFooter`); AI actions advertised for methods that are private/unreachable or don't exist
(`accordion`'s `expandAll`/`collapseAll`, `modal`'s `toggle`, `card`'s `expand`); a fully orphaned
~69-line duplicate tree renderer in `tree-view.ts` left over from a pre-virtualization
implementation.

**`data-grid` vs. `data-table` overlap is real but not pure duplication** — the two serve
genuinely different tiers (simple/read-oriented vs. editable/enterprise-grade) and neither is a
strict subset of the other, but they duplicate an entire virtual-scrolling subsystem with
incompatible APIs, and nothing in the docs tells a consumer when to pick one over the other beyond
a single README table row.

**Two independent, confirmed unsanitized-HTML injection points** exist in the codebase:
`forge-icon`'s remote SVG loader (`icon.ts:400`, `unsafeHTML`) and `forge-tooltip`'s `htmlContent`
mode (`tooltip.ts:516-519`, raw `.innerHTML=`). Both are real if any consuming application ever
passes non-trusted content through them; neither has any test coverage exercising a malicious
payload.

## Known bugs, ranked by severity

1. **`forge-icon` SVG XSS** — `unsafeHTML(this.iconData.svg)` from an arbitrary fetched `src` URL,
   no sanitization beyond checking for an `<svg>` tag (`icon.ts:263-317,400`).
2. **`forge-tooltip` innerHTML XSS** — raw `.innerHTML=${this.content}` bind when
   `htmlContent=true`, no sanitization (`tooltip.ts:516-519`).
3. **`forge-multi-select` search crash** — unescaped `RegExp` built from user input throws
   `SyntaxError` on any regex metacharacter, breaking rendering (`multi-select.ts:565-574`).
4. **`forge-form-field` broken `aria-describedby` for all real usage** — hardcoded literal IDs
   never match rendered elements except in the test fixture (`form-field.ts:378-389`).
5. **Organism docs are 93% fabricated** — 3 of 43 documented public methods actually exist across
   all 7 `docs/components/organisms/*.md` pages; would cause AI-tool-generated code to call
   nonexistent APIs almost universally.
6. **`forge-tree-view` selected/disabled states unstyled** — live template classes don't match any
   CSS rule after an unfinished rewrite; visually broken in the shipped component.
7. **`forge-select` broken label/description ARIA association** — `aria-labelledby`/
   `aria-describedby` reference IDs that don't exist in the template (`select.ts:712-713`).
8. **`forge-data-table` bypasses Lit rendering** — hardcoded placeholder header rendered by
   `render()`, then overwritten imperatively in `updated()`; risks a visible flash and hides real
   behavior from static reading of the component.
9. **`forge-dropdown` keyboard nav invisible to assistive tech** — DOM focus never moves, no
   `aria-activedescendant`; mismatched `combobox`+`menu` ARIA roles.
10. **`forge-data-grid` untested, unbarreled, unstoried** — largest/most complex component in the
    repo has zero Storybook coverage and is missing from the organisms barrel export; several
    advertised features (column resize, reorder, pinned columns, aggregates, typed cell editors)
    are stubs or unwired types.
11. **`forge-date-picker` AI metadata overclaims** — advertises arrow-key navigation that doesn't
    exist; its modal-like calendar popover has no focus trap, unlike every other overlay-style
    component in the library.
12. **Lit "scheduled update after completion" warning** — self-documented, unresolved in the
    project's own TODO doc; confirmed live during the test run for `forge-select`; also affects
    `forge-icon`, `forge-checkbox`, `forge-badge` per the project's own notes.
13. **`forge-modal` / `forge-accordion` / `forge-card` fabricated AI actions** — each advertises at
    least one action (`toggle`, `expandAll`/`collapseAll`, `expand`) that is either unreachable
    (private) or nonexistent.
14. **`ai-manifest.json` staleness and mis-categorization** — every molecule/organism mislabeled
    `category: "atom"`; at least one fabricated ARIA role; went stale after `forge-card`'s
    `border` prop shipped.
15. **`forge-button` type/CSS mismatch** — `variant="ghost"|"link"` compiles but has no CSS;
    `PerformanceMode` type differs from the actual runtime property type.
16. **`forge-skeleton` dead CSS `attr()` rule** — confirmed non-functional by live browser test;
    zero user impact because a JS path already overrides it correctly. Lowest-severity item on
    this list, included for completeness/fact-check provenance.

## Recommendations

**If reviving the project:** treat this less as "fix bugs" and more as "close the gap between
marketing and reality" — the codebase is structurally sound (100% test coverage by file,
consistent `BaseElement` inheritance, real and mostly-correct ARIA patterns in the stronger
components like `modal`, `multi-select`, `progress`) but the AI-native/documentation layer was
clearly built faster than it was verified. Priority order: (1) patch the two XSS vectors and the
multi-select crash — these are exploitable today with zero configuration changes; (2) regenerate
or hand-fix the organism docs from source rather than trust the existing "Public Methods" tables,
given the 3/43 verification rate; (3) either implement or delete `data-grid`'s stub features and
get it into the barrel/Storybook before shipping it as a "production" component; (4) pick one
performance-monitoring implementation and retrofit all 14 atoms to use it, closing the project's
own long-open Lit warning TODO in the process; (5) decide whether `ai-manifest.json` generation
should introspect actual component state (accurate but harder) or stay hand-authored boilerplate
(cheap but currently actively misleading) — right now it's neither reliable enough to trust nor
cheap enough to ignore.

**If not reviving the project:** the atoms tier (14 components, full test/story coverage,
`forge-button`'s metadata as a template) is the most reusable/extractable subset if any individual
components get salvaged elsewhere; `forge-modal`'s focus-trap implementation and
`forge-multi-select`'s live-region announcer are the two standout a11y implementations worth
lifting into a future component library regardless of what happens to the rest of Forge.
