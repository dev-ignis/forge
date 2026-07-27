# Forge — Core Architecture & AI-Native System

**Repo:** `@nexcraft/forge` v0.10.0 (Lit 3 web-component library), branch `develop`, dormant since 2025-10-15 (last commit). Published live on npm; verified against the actual 0.10.0 tarball, not just source.
**Scope of this section:** `src/core/`, `src/utils/`, `src/types/`, `src/tokens/`, `src/index.ts`, plus the AI-manifest generation pipeline (`scripts/generate-ai-manifest.js`, `generate-ai-index.js`, `validate-ai-manifest.js`, `ai-manifest.json`, `ai-index.json`, `custom-elements.json`).

---

## TL;DR

- **The core AI/perf/a11y contract in `BaseElement` is genuinely sound** — `checkPerformance()`, `aiState`, `getPossibleActions()`/`explainState()` are real, working, reusable APIs (`src/core/BaseElement.ts`, 240 lines). The problem is never the base class; it's that adoption across the 29–30 subclasses is 100% convention-based, with zero compiler or CI enforcement, and it has already fractured in practice.
- **Performance self-monitoring exists in four mutually incompatible forms** across components — 10 call it correctly, 3 override it with an incompatible signature, 4 bypass it with a parallel reimplementation, 1 ignores the contract entirely. Net effect: `aiState.performance.renderCount`/`violations` is unreliable for roughly 2/3 of components, including Button and Input — the two most likely to be inspected.
- **A meaningful slice of the published package is unreachable dead code.** `src/utils/**` (2,129 LOC: `TokenBridge`, `PerformanceDashboard`, debug console tools, error helpers) has no `exports["./utils"]` entry in `package.json` and is never bundled — despite being documented as a primary API surface in the README and six doc guides. `AIMetadataExporter`/`AIMetadataValidator` (1,295 LOC, ~43% of `src/core`) are fully built but called by nothing, including the manifest-generation scripts they were seemingly built for.
- **A published subpath export is actively broken.** `@nexcraft/forge/tooltip` throws `Error: ForgeTooltip not found` at runtime because `ForgeTooltip` was never added to `src/index.ts`'s barrel, so it never made it into the bundle the subpath script inspects.
- **The AI-manifest pipeline is real, automated, and CI-regenerated — but the shipped artifact undersells the runtime.** A brittle regex scraper (keyed on the TypeScript-only `override` keyword and one exact `return [...]` shape) silently degrades ~30% of components (≥9/31) to generic placeholder text in `ai-manifest.json`, even though every one of those components has a fully working `getPossibleActions()`/`explainState()` at runtime via `BaseElement`.
- **`ai-manifest.json`'s `category` field is uniformly wrong** — every component reports `"atom"`, including organisms like `forge-data-table`, due to a one-line logic bug in the generator.
- **A referenced feature directory (`ai-tools/`) does not exist anywhere in the repo or the published tarball**, despite being wired into `package.json`'s `files`/`exports` and into `ai-index.json`'s own generated output — a dead reference that will hard-fail on import.
- **Marketing claims ("FIRST AI-Native component library," "Every component can explain its state") are not fabricated but are measurably ahead of what ships.** The deepest architecture doc (`docs/ai/metadata-reference.md`) never reaches npm consumers; the schema file that's supposed to back validation is never loaded by the validator.

---

## 1. Core architecture

### 1.1 BaseElement — single class, no mixins

`src/core/BaseElement.ts` is a 240-line `abstract class BaseElement extends LitElement`. There is **no mixin composition** — AI metadata, performance monitoring, and accessibility helpers are all hard-baked into one class rather than composed from smaller pieces. At this size that's not unmanageable, but it means every future cross-cutting concern gets bolted onto the same file rather than getting its own extension point.

What it provides (all line-cited from `BaseElement.ts`):

| Concern | Members | Lines |
|---|---|---|
| Shared styling | `static styles` (box-sizing reset) | 17-25 |
| AI-ready properties (cites **ADR-014**) | `semanticRole`, `aiContext`, `ariaDescription` | 28-30 |
| Performance properties | `maxRenderMs` (default 16), `warnOnViolation` (default **false**), `performanceMode: 'auto'\|'fast'\|'balanced'\|'quality'` | 33-35 |
| DX properties | `devMode`, `showMetrics` (the latter never read anywhere in `BaseElement.ts`) | 38-39 |
| `aiMetadata` default | `{ purpose: 'UI Component', criticality: 'low' }` | 47-50 |
| `checkPerformance(startTime)` | computes render time, increments `renderCount`, warns if over budget, triggers auto-degrade | 61-93 |
| `applyPerformanceDegradation()` | no-op stub — subclasses must override to do anything | 96-98 |
| `get aiState()` | full AI-facing state snapshot | 101-129 |
| `getAIDescription()` / `getPossibleActions()` / `explainState()` | default implementations (`[]`, static stub) | 132-152 |
| `updateComponentState()` | writes to `componentState` Map, emits `ai-state-change` | 154-164 |
| `getSemanticAttributes()` | maps AI metadata to `data-*` attrs | 167-187 |
| `emit()` | `dispatchEvent` wrapper, `bubbles/composed/cancelable: true` by default | 189-198 |
| `announceToScreenReader()` | off-screen `aria-live` region on `document.body` | 201-213 |
| `firstUpdated()` | sets `data-ready="true"` | 216-219 |
| `trapFocus()` | Tab-key focus trap | 222-240 |

**`checkPerformance()` is a real, working, reusable API** — this is worth stating explicitly, because it's easy to misread the fractured adoption (§1.2) as "the base class doesn't provide performance monitoring." It does; components just don't consistently use it.

**No dedicated test exists for `BaseElement` itself.** `find . -iname "*BaseElement*"` turns up only the source file and generated coverage/storybook artifacts — no `BaseElement.test.ts`. The class shows 90.41% statement coverage (151/167) in the last pre-dormancy coverage run (2025-10-03, 12 days before the final commit), but that coverage is a **side effect** of 26 component test files exercising inherited methods incidentally, not a test that asserts `BaseElement`'s own contract (e.g., nothing directly verifies `checkPerformance`'s math or the auto-degrade trigger).

Two members are confirmed dead:
- **`trapFocus()` is never called by any component.** It's the one method marked "not covered" in the coverage report, and `grep -rln trapFocus src/components --include=*.ts | grep -v test` returns zero hits across all 29 components that inherit it.
- **`announceToScreenReader()` is called by exactly 1 of 29 components** (`button.ts`).

### 1.2 Performance monitoring — a sound contract, fractured adoption

`checkPerformance()` is opt-in: `BaseElement` never calls it automatically from its own lifecycle, so a subclass has to invoke it from its own `render()`/`updated()`. In practice, adoption split into **four incompatible patterns**, independently confirmed with file:line citations:

| Pattern | Behavior | Components |
|---|---|---|
| **A — Correct** | Calls inherited `checkPerformance(startTime)` with matching signature | `radio-group.ts:342,536`, `switch.ts:362,496`, `card.ts:456`, `select.ts:779`, `date-picker.ts:841`, `tooltip.ts:524`, `dropdown.ts:739`, `modal.ts:555`, `multi-select.ts:750`, `data-grid.ts:1083` (10 components) |
| **B — Signature-incompatible override** | Redefines `checkPerformance` to take an already-computed *duration* instead of a *start time* — TS doesn't catch it because both erase to `(number) => void`. Keeps its own `renderMetrics` object instead of `this.renderCount`, so the inherited counter never increments. | `button.ts:542` (called `button.ts:386`), `input.ts:478` (called `input.ts:364`), `form-field.ts:516` (called `form-field.ts:314`) (3 components) |
| **C — Parallel reimplementation, bypasses base entirely** | Own private `trackRenderPerformance(startTime)` duplicating the budget-check logic, with shadowed `maxRenderMs`/`renderTime` fields | `badge.ts`, `alert.ts`, `icon.ts`, `checkbox.ts` (4 components) |
| **D — Wholly custom scheme** | Own `performanceThreshold` property (not `maxRenderMs`), no-arg `trackRenderPerformance()`, never touches the base contract at all | `data-table.ts` (1 component) |

That's 18 of ~29-30 components touching performance tracking in *some* form; the rest wire up nothing. **Root cause is structural, not accidental**: nothing enforces subclasses call `checkPerformance` from `render`/`updated`, and TypeScript's structural typing permits any `(number) => void` override to silently replace the base method.

**Concrete consequence — the `aiState.performance.violations` bug.** `BaseElement.ts:110` hardcodes `violations: 0` in the `aiState` getter; it never reads an actual violation counter. 12 components override the `aiState` getter and presumably fix this locally. The 10 components using Pattern B or C (`switch`, `icon`, `badge`, `radio-group`, `alert`, `select`, `button`, `checkbox`, `input`, `form-field`) do **not** override `aiState`, so `component.aiState.performance.violations` reports `0` for them even when the component's own template shows a live, correct violation count (`button.ts:395` renders `${this.renderMetrics.violations}` in its dev UI while `button.aiState.performance.violations` — the value any AI agent or the dashboard would actually consume — always says 0). This directly undermines the "AI-native, machine-readable state" pitch for exactly the components (Button, Input, FormField) most likely to be inspected first.

### 1.3 AI metadata layer — convention-enforced, not type-enforced

`getPossibleActions()`, `explainState()`, and the `aiState` getter are all **non-abstract members with working default implementations**. `BaseElement` is "abstract" only in the sense that it can't be instantiated directly — nothing stops a new subclass from never overriding these and silently shipping an AI-native-labeled component with `possibleActions: []` and a generic `'default'` state description.

- **Today, discipline holds**: all 30 current `BaseElement` subclasses override both methods, and git history shows this was a deliberate, tracked milestone (`c46d3c1 feat: complete AI methods implementation for all components`).
- **But it's unenforced going forward**: no lint rule, no abstract method, no test scanning registered custom elements for AI-method coverage. `scripts/generate-ai-manifest.js` parses source via regex — it doesn't validate or gate (see §2).
- **`aiMetadata` fallback**: of 29 direct `BaseElement` subclasses, **10 never override the protected `aiMetadata` field** and keep the literal default `{ purpose: 'UI Component', criticality: 'low' }` at runtime: `checkbox.ts`, `tree-view.ts`, `navigation-bar.ts`, `pagination.ts`, `badge.ts`, `icon.ts`, `alert.ts`, `accordion.ts`, `tabs.ts`, `data-table.ts`.
- **Button's static/instance metadata disconnect (a genuine, verified bug)**: `button.ts:14-~90` declares a rich `static aiMetadata: AIComponentMetadata` field (purpose string, usage patterns, anti-patterns, contextual rules, AI prompts) — clearly meant as Button's real AI-facing metadata. But `BaseElement.aiState`, `getAIDescription()`, and `getSemanticAttributes()` all read the **instance** field `this.aiMetadata` (`BaseElement.ts:47,119,134,178-184`), and Button never bridges the two (it only mutates `this.aiMetadata.semanticRole` at runtime, `button.ts:434`). Net effect: `document.querySelector('forge-button').aiState.metadata.purpose` returns the generic "UI Component" fallback, not Button's carefully authored purpose text — despite that text sitting in the same file, unused by the runtime API this whole system is supposedly built around.

### 1.4 Export surface — components and utilities that don't reach consumers

Three separate, independently-verified breakages, all confirmed against the actual published npm tarball for 0.10.0 (not just source):

1. **`@nexcraft/forge/tooltip` is broken.** `ForgeTooltip` (`src/components/molecules/tooltip/tooltip.ts`) is a complete, tested component — but it's absent from `src/index.ts`'s molecule export block (lines 74-103), so it's never in the main bundle. `package.json`'s `exports` map still has a `"./tooltip"` subpath whose generated shim (`scripts/build-exports.cjs`) does `customElements.get('forge-tooltip') || throw new Error('ForgeTooltip not found...')`. Confirmed: zero occurrences of `ForgeTooltip`/`forge-tooltip` in the actual `dist/nexcraft-forge.es.js` bundle. Importing this subpath from the published package throws at runtime.
2. **`@nexcraft/forge/utils` doesn't exist as an export, despite being the documented way to import core utilities.** README.md (lines 145, 319, 344) and six doc guides tell users to import `TokenBridge`, `performanceDashboard`, `enableGlobalDebug`/`debugComponent`/`watchComponent`, `showToast` from `@nexcraft/forge/utils`. There is no `"./utils"` key in `package.json`'s `exports` map (verified against the live registry too), and `vite.config.ts`'s single-entry build never pulls from `src/utils/**`. `dist/utils/` only has `.d.ts` files — zero runtime `.js`. Everything in `src/utils/**` (`TokenBridge`, `PerformanceDashboard`, debug tools, `errors.ts` helpers — 2,129 non-test LOC, unit-tested, described as "critical for developer experience" and a "key UVP differentiator" in their own file headers) is **completely unreachable from the published package.**
3. **`AIMetadataExporter` (734 LOC) and `AIMetadataValidator` (561 LOC) — 1,295 LOC, ~43% of all non-test `src/core` code — are dead from every angle**: not exported from `src/index.ts`, not called by `scripts/generate-ai-manifest.js` (which does its own independent regex parsing instead of calling `AIMetadataExporter.exportTrainingDataset()`), not called by `scripts/validate-ai-manifest.js` (which does its own shallow 3-field check instead of `AIMetadataValidator.validateComponentMetadata()`), and not imported by any test file. Well-designed, substantial, and entirely disconnected from anything that runs.

### 1.5 Design-token bridge — three uncoordinated implementations

- `src/tokens/base.css` (129 LOC) is the one static artifact that actually ships and works end-to-end: hard-coded `--forge-color-*` custom properties, copied to `dist/tokens.css` by a Vite `writeBundle` hook (`vite.config.ts:78-90`), exposed via the `"./tokens.css"` export. It also documents a past naming migration in-line (both `--forge-color-danger-500` and legacy `--forge-color-error` coexist).
- `src/utils/token-bridge.ts`'s `TokenBridge` class (613 LOC) is a separate converter (Figma/Tailwind/Material Design JSON → Forge token shape) targeting the same `--forge-${name}` naming convention conceptually, but with no test asserting the two agree, and — per §1.4 — entirely unreachable from the published package anyway.
- A third, standalone published package, `packages/forge-tokens`, has its own CLI (`bin/forge-tokens.mjs`) and Figma integration (`lib/figma.mjs`), duplicating the same "convert design tokens into Forge tokens" problem a third time (out of this section's scope, flagged for whoever covers `packages/**`).

### 1.6 SSR, types, and event-naming — smaller but real issues

- **SSR is a keyword, not a capability.** `package.json` lists `"ssr"` only in the marketing `keywords` array; `@lit-labs/ssr` is not a dependency. `ForgeIntegrationConfig.enableSSRFallbacks?: boolean` (`src/types/framework-integration.ts:24`) is declared and JSDoc'd but never read anywhere in `src/**`. The one actively SSR-unsafe piece of code that does exist — `PerformanceDashboard`'s constructor eagerly touching `document.body` at **module-evaluation time**, not inside a lifecycle hook (`performance-dashboard.ts:50-77`) — is currently moot only because `src/utils` is unreachable from the package (§1.4); it would resurface the moment someone "fixes" the missing `./utils` export.
- **`ForgeElement` interface is structurally unsatisfiable by `BaseElement`.** `ForgeElement` (`types/component-types.ts:10-17`) declares `emit`/`announceToScreenReader` as implicitly-public members; `BaseElement` implements both as `protected`. No real subclass instance can be assigned to a `ForgeElement`-typed variable without a compile error — confirmed never attempted anywhere in `src/**`, so the incompatibility has never been caught.
- **Duplicate `debounce`/`throttle`**, and the worse one ships. `src/types/component-types.ts:98-126` has a basic version (no `immediate`, no `raf`); `src/utils/debounce.ts` has a fuller version — but it's unreachable (§1.4), so the public `src/index.ts` re-exports the simpler one.
- **`Forge*Events` TypeScript interfaces don't describe what components actually emit.** They declare a `forge-`-prefixed convention (`forge-click`, `forge-open`, `forge-dismiss`, etc.), but grepped runtime behavior shows: `ForgeButton` emits `'click'`; `ForgeModal` emits a single unprefixed `'modaltoggle'`; `ForgeAlert` dispatches `'close'` via a hand-rolled `CustomEvent` at `alert.ts:328-335`, bypassing `BaseElement.emit()` entirely. Only two literal `forge-`-prefixed events exist anywhere in the codebase (`forge-change`, `forge-select`). Any consumer relying on the exported `Forge*Events` types for typed `addEventListener` gets wrong autocomplete with no compile-time safety.

### 1.7 Coupling and residual dead code

- **`PerformanceDashboard` depends on an undocumented `BaseElement` contract.** Its auto-discovery (`performance-dashboard.ts:80`) scans for `[data-ready="true"]` plus `instanceof BaseElement` — `data-ready` is set exactly once, in `BaseElement.firstUpdated()` (`BaseElement.ts:216-219`). This coupling is real and functional but is discoverable only by reading `performance-dashboard.ts`; nothing in `BaseElement.ts` itself documents that another module depends on this attribute.
- **`ai-manifest.json` generation is coupled to source text, not to the type system.** `scripts/generate-ai-manifest.js` depends on the exact textual shape of `getPossibleActions`/`explainState` overrides (regex against raw `.ts` source) rather than on the typed `AIAction`/`AIStateExplanation` contracts already defined in `ai-metadata.types.ts` — an out-of-band coupling between build tooling and source formatting that a normal refactor (e.g., reformatting a `return` statement) can silently break.
- **Duplicate AI-metadata test suites.** `src/core/ai-metadata.test.ts` (683 LOC) and `src/test/ai-metadata.test.ts` (295 LOC) both `describe('AI Metadata System', ...)` and both test `AIMetadataUtils` — overlapping coverage in two different directories, suggesting a stale draft left alongside its replacement rather than a deliberate split. Not determined which (if either) is authoritative.
- **`warnDeprecated()`** (`src/utils/errors.ts:177-194`) is a built, generic deprecation-warning helper with zero call sites anywhere in `src/components` — built for a future deprecation cycle that never arrived, consistent with a young API surface rather than a bug.
- **`src/simple.test.ts`** sits directly under `src/`, outside both `src/core` and `src/test` — a minor stray/misplaced test file, not investigated further.

---

## 2. AI-native metadata system

### 2.1 Pipeline — genuinely automated, with two hand-maintained pockets

```
custom-elements-manifest analyze   →  custom-elements.json   (real AST-based CEM output, git-ignored, rebuilt at publish)
scripts/generate-ai-manifest.js    →  ai-manifest.json        (regex re-shapes CEM output; fails hard if <30 components found)
scripts/generate-ai-index.js       →  ai-index.json           (compact summary of the manifest)
scripts/validate-ai-manifest.js    →  exit 0/1                (checks only that 3 top-level fields have the right JS type)
```

This is real, tool-derived output, not hand-typed JSON — `custom-elements.json` is a legitimate CEM/Lit-plugin AST analysis (1.38MB, captures real `@property` fields, JSDoc, `privacy`, `attribute` names, `default` values). But two large pieces are hand-authored and structurally disconnected from source:

- **`a11yMappings`** (`generate-ai-manifest.js:110-381`) — a ~270-line hardcoded per-component ARIA lookup table, unconnected to each component's actual rendered template.
- **`ssrFallbacks`** (lines 452-568) — hardcoded HTML strings per component tag, likewise hand-authored.
- **`extractAIMethodImplementations`** (lines 20-103) — a regex scraper of raw `.ts` source text, not an AST pass (see §2.2).

`validate-ai-manifest.js` never loads `ai-manifest.schema.json` — confirmed by grep — despite the README calling it "Schema validation." It's a ~35-line script whose own header comment says it "exits 0 to avoid breaking CI initially."

### 2.2 The extraction gap — ~30% of components silently degrade

`extractAIMethodImplementations` requires the literal substring `override getPossibleActions()` (a TypeScript-only compile-time keyword with zero runtime effect) followed by a specific `return [ {...} ];` array-literal shape:

```js
const actionsMatch = sourceContent.match(/override getPossibleActions\(\)[^{]*\{([\s\S]*?)\n  \}/);
```

- Of 30 files with a real `getPossibleActions(` implementation, only 21 use the `override` keyword. The other **9** (`date-picker.ts`, `multi-select.ts`, `card.ts`, `input.ts`, `tooltip.ts`, `modal.ts`, `dropdown.ts`, `button.ts`, `form-field.ts`) get silently replaced with generic placeholder text in the shipped manifest, despite having real, richer runtime behavior. **`button.ts` — the most commonly inspected component — is one of them.**
- Even when `override` is present, the second regex requires a literal `return [...]` array. `forge-data-table.ts:821` has `override getPossibleActions()` but builds its actions dynamically (`push()` in loops/conditionals) — arguably the more idiomatic pattern for a data-heavy component — and gets zero extracted actions anyway.
- Only 2 of 5 spot-checked components (`checkbox`, `alert`) extracted faithfully; `button` and `modal` fell back to generic text (missing `override`); `data-table` fell back despite having `override` (dynamic-array shape).
- **This is purely a static-manifest problem.** At runtime, every component's `getPossibleActions()`/`explainState()`/`aiState` genuinely work (they all extend `BaseElement`). An AI agent driving a live DOM gets correct data; an AI tool statically reading `ai-manifest.json` — which the README explicitly recommends ("AI: [Reads ai-manifest.json] → Gets forge-button props") — gets the degraded version for ~30% of components.

### 2.3 Other manifest defects

| Defect | Detail |
|---|---|
| **`category` always `"atom"`** | `generate-ai-manifest.js:585`: `category: d.customElement ? 'atom' : undefined` — `d.customElement` is truthy for every CEM entry reaching that branch, so it's always `"atom"`, including `forge-modal` (molecule), `forge-data-table` (organism). The repo's own atoms/molecules/organisms taxonomy is never consulted. `ai-index.json`'s category summary is consequently meaningless. |
| **Props conflate public/private** | `generate-ai-manifest.js:586-588` filters CEM members only on `kind === 'field'/'property'`, never on `privacy`. Checked `forge-alert`: 8 of 25 listed "props" are `private`/`protected` internals (`closing`, `dismissTimer`, `iconMap`, `performanceStartTime`, `renderTime`, `renderCount`, `aiMetadata`, `componentState`), indistinguishable in the manifest from real public props like `severity`/`message`. |
| **`default`/`required`/`description` dropped** | `custom-elements.json` has this data (verified: `severity default='info'`, etc.), and `ai-manifest.schema.json` defines a `default` field per prop — but the `.map()` never copies it over. 0/31 components have a populated schema-promised field. |
| **a11y table drift + gaps** | `forge-button`'s hardcoded entry claims `aria-pressed` and `aria-describedby`; the actual template (`button.ts:352-371`) has neither — it emits `aria-description` (nonstandard) instead. The table has exactly 30 entries for 31 shipped components; the 31st (`forge-performance-dashboard`, picked up because the CEM glob is broad) silently falls to a generic default. |
| **`ai-tools/` doesn't exist** | Referenced in `package.json` `files` and `exports["./ai-tools/*"]`, and in `ai-index.json`'s own `aiIntegration.functionCalling: './ai-tools/'` field — but the directory exists nowhere in the repo, `dist/`, or the published tarball (verified via both `npm pack --dry-run` and the real downloaded 0.10.0 tarball). `import '@nexcraft/forge/ai-tools/whatever'` hard-fails. Consistent with a rushed buildout — the AI infra commits cluster in a single week, 2025-09-17. |
| **`docs/ai/` never ships** | `docs/ai/metadata-reference.md` (678 lines) and `docs/ai/integration-guide.md` (1,063 lines) — the deepest architecture explanation of this whole system — are absent from `package.json`'s `files` allowlist, confirmed absent from the real tarball. What ships instead (`docs/guides/ai-native-development.md` etc.) is a shallower usage guide. |

### 2.4 CI — regenerates fresh, but doesn't gate on fidelity

`.github/workflows/ci.yml` and `develop.yml` both run the full `build:manifest → build:ai → validate:ai` chain on every push, so `custom-elements.json`/`ai-manifest.json`/`ai-index.json` are freshly regenerated from current source each time, and the generator's `expectedMinComponents = 30` gate (`generate-ai-manifest.js:633-650`) would catch total extraction failure. But:
- `validate:ai` only type-checks 3 top-level fields — it never checks per-component content (it would never flag Button's empty actions array).
- No workflow step diffs the regenerated manifest against the committed one (`grep -n "git diff\|--exit-code" .github/workflows/*.yml` → nothing).
- `ai-manifest.json`/`ai-index.json` are committed to git; `custom-elements.json` is git-ignored but rebuilt at publish. The last manifest commit (2025-10-08) does line up correctly with the 0.10.0 publish date, so *this* release was regenerated properly before shipping — but nothing forces that discipline going forward, and the `override`-keyword gap has evidently existed silently since the September 2025 buildout with no fix.

### 2.5 Marketing vs. verified reality

README claims: "**The FIRST AI-Native component library**," "Every component can explain its state to AI systems," "AI-Native Components (Industry First!)" with a badge linking to `docs/ai/metadata-reference.md` — which, per §2.3, never reaches npm consumers, so the badge only works for people browsing GitHub directly. Line-count claims for `ai-index.json`/`ai-manifest.json` ("465 lines" / "2000+ lines") are stale/imprecise (actual: 473 / 5,465) but not false. "Browse all 31 components" is accurate.

**Verdict**: not vaporware. There's a real, automated, source-derived generation pipeline, and every one of the 31 shipped components genuinely has working runtime AI introspection via `BaseElement`. But the specific artifact given its own npm subpath and positioned as the AI-native centerpiece — `ai-manifest.json` — is measurably less complete than its own README and JSON schema promise: ~30% of components have degraded action data, `category` is wrong for everything, props don't distinguish public from private, a referenced feature directory doesn't exist, and the deepest documentation of the system doesn't ship. The gap is specifically between two consumption modes: an AI tool that **instantiates a live component and calls `.explainState()` directly** gets accurate data; an AI tool that **statically reads the shipped JSON** (the mode the README recommends) does not.

---

## 3. Strengths

- **The core contract is well-designed.** `BaseElement`'s `checkPerformance`/`aiState`/`getPossibleActions`/`explainState` API is coherent, reasonably sized, and — where adopted correctly — works as advertised. This is not a case of the architecture being broken; it's a case of adoption discipline having nothing to enforce it.
- **The AI-manifest pipeline is real engineering, not a mock.** AST-based CEM analysis, a hard-fail component-count gate, CI regeneration on every push — this is a legitimate automated toolchain, unusual for a project at this stage.
- **In-practice discipline was genuinely good while the project was active.** All 30 current components implement the AI-method convention; git history shows it was a deliberate, tracked milestone, not an accident.
- **The static CSS token layer (`src/tokens/base.css` → `dist/tokens.css`) is a small, simple, fully-working deliverable** with no dependency on the more ambitious (and broken) `TokenBridge`/`ai-tools` layers.
- **No TODO/FIXME/HACK markers anywhere in `src/core`, `src/utils`, `src/types`.** The staleness here is structural (dead exports, drifted metadata) rather than abandoned inline work — a dormant codebase that was left in a deliberately-committed state, not mid-edit.

## 4. Weaknesses & risks (ranked)

1. **No CI/type-level enforcement of the AI-method contract.** A dormant project resuming development has zero automated signal telling a new contributor to implement `getPossibleActions`/`explainState`, or telling them their implementation doesn't match the manifest generator's regex shape. This is the highest-leverage fix relative to effort — it protects the project's entire stated value proposition.
2. **The shipped `ai-manifest.json` misrepresents ~30% of components and the category of all of them**, while a fully accurate runtime alternative already exists (`BaseElement.aiState`). This is a credibility risk specifically for the "AI-native" positioning: it's the artifact most likely to be evaluated first by anyone doing exactly the kind of due diligence this document represents.
3. **`@nexcraft/forge/utils` and `@nexcraft/forge/tooltip` are broken/unreachable in the currently-published package**, contradicting the README. Anyone following the docs today hits a runtime error or silent 404. This is a trust-eroding first-contact bug for new adopters, cheap to fix (add the missing `exports` entries and confirm the tooltip barrel export).
4. **Performance self-monitoring's 4-pattern fracture** means `aiState.performance` is untrustworthy for the majority of components, including the ones most likely to be profiled (Button, Input, FormField). Low urgency for typical usage, but directly undermines a headline feature if anyone actually wires up the dashboard.
5. **1,295 LOC of well-built, fully dead code** (`AIMetadataExporter`, `AIMetadataValidator`) and **2,129 LOC of fully-implemented-but-unreachable utilities** represent real sunk engineering that isn't currently delivering value and will rot further the longer the project stays dormant (APIs drift from whatever calls them once someone tries to wire them back in).
6. **Three uncoordinated "design token" implementations** (`base.css`, in-repo `TokenBridge`, standalone `packages/forge-tokens`) — a maintainability risk if revival work touches tokens without first deciding which one is canonical.
7. **`ai-tools/` is a dead reference that will hard-fail on import** — low probability of anyone hitting it today (nothing documents *using* it directly), but it's exactly the kind of stale pointer that causes confusing bug reports months into a revival.
8. **Type-soundness gaps (`ForgeElement` interface, duplicate `debounce`/throttle, inconsistent event names) are pre-existing technical debt**, not urgent, but will surface as confusing compiler errors or wrong autocomplete the moment someone tries to use the public types as documented.

## 5. Section-specific recommendations

**If reviving the AI-native positioning as the core value proposition:**
- Rewrite `extractAIMethodImplementations` as an AST-based extraction (the CEM analyzer already parses the file — reuse its AST instead of re-scraping raw text with regex) rather than patching the regex; the current approach will keep breaking on any code-style change.
- Fix the one-line `category` bug (`generate-ai-manifest.js:585`) by consulting the actual `src/components/{atoms,molecules,organisms}` directory structure.
- Wire `validate-ai-manifest.js` to actually load `ai-manifest.schema.json` (the comment already says this was the plan) and add a CI step that diffs the regenerated manifest against the committed one, failing the build on drift.
- Decide whether `AIMetadataExporter`/`AIMetadataValidator` are worth resurrecting (call them from the actual generation/validation scripts) or worth deleting — right now they're 1,295 LOC of maintenance liability with no dependents.

**If reviving the component library as a general-purpose Lit library (AI story secondary):**
- Prioritize #3 above (`./utils` and `./tooltip` exports) — these are the cheapest, highest-visibility fixes and directly contradict current documentation.
- Consolidate performance monitoring onto Pattern A before adding any new components; either delete `applyPerformanceDegradation()`'s no-op default or make `checkPerformance` abstract-like via a lint rule so new components can't silently skip it.
- Pick one of the three token systems as canonical and deprecate the other two explicitly, rather than letting a fourth "helpful" implementation get added later.

**Either way:**
- Add a `BaseElement.test.ts` that asserts the base contract directly (perf math, `aiState` shape, the `violations` field) — current coverage is 100% incidental, so any refactor of `BaseElement` itself has no dedicated safety net.
- Treat the gap between "runtime introspection works" and "shipped static manifest is degraded" as the single most important fact to communicate to any future contributor or evaluator — it's the difference between a legitimate technical claim and a misleading one, and right now the misleading version is what's on npm.
