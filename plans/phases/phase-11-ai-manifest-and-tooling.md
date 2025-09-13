# Phase 11: AI Manifest & Tooling

## Objective
Establish a portable “AI awareness” layer so any AI tool can reliably discover, understand, and generate correct usage for Forge components across Web, React (SSR/client), and other frameworks.

## Scope
- Define a stable `ai-manifest.json` format (derived from CEM + TS types + curated examples).
- Generate the manifest at build time and ship it with releases (root and `dist/`).
- Provide function-style tool schemas (e.g., `ai-tools/react/*.json`) to enable LLM function-calling workflows.
- Preview and validate in Storybook via an “AI” panel.
- Author contributor guidance and CI validation to keep manifest in sync.

Non-goals
- Shipping runtime-only AI logic. Keep AI metadata out of production bundles.
- Implementing full editor plugins (provide a minimal reference, not a full product).

## Deliverables
- `ai-manifest.schema.json` (schema + examples)
- Generator: `scripts/generate-ai-manifest.js` (merges `custom-elements.json`, TS types, examples)
- Build integration: `npm run build` emits `/ai-manifest.json` and (optionally) `/dist/ai-manifest.json`
- Tool specs: `ai-tools/react/<component>.json` for priority components
- Storybook addon/panel: panel that renders the manifest entry for the active component
- Docs: `docs/ai-manifest.md`, contributor guide for adding AI metadata per component
- CI: schema validation + broken-link checks for examples

## Milestones (2 weeks)
- Week 1
  - Define schema; implement generator POC
  - Seed 5 components (Button, Input, Select, Modal, Alert)
  - Add build step + CI validation
- Week 2
  - Emit React tool schemas; document mapping rules
  - Storybook AI panel + examples verification
  - Docs and contributor workflow finalized

## ADR Compliance
- ADR-014: AI-Ready Components — Manifest fields capture semantics, patterns, a11y, performance hints
- ADR-017: AI-Native Development Strategy — Canonical strategy and rollout phases
- ADR-007: Framework Integration — Provide React wrappers and examples; future Vue/Angular mappings
- ADR-018: Unified SSR Architecture — Include SSR fallback examples in manifest
- ADR-009: Documentation Strategy — Storybook central pane; docs auto-link from manifest
- ADR-010: Versioning & Release — Manifest versioned alongside package; no runtime coupling
- ADR-003: Theming — Reference tokens; avoid leaking runtime token values

## Acceptance Criteria (DoD)
- `npm run build` produces a validated `ai-manifest.json` (schema passes) and `ai-tools/react/*`
- Storybook AI panel shows correct props/events/slots and examples for the 5 seed components
- React examples compile and run (client + SSR sample)
- CI fails on manifest drift (schema or link validation errors)
- Docs explain how to add/extend AI metadata; contributors can follow without maintainers

## Risks & Mitigations
- Drift between code and manifest → Generate from sources + CI validation
- Overly broad scope → Start with 5 components; template for the rest
- Bundle size concerns → Keep manifest out of runtime imports; ship as artifact only
- Cross-framework differences → Begin with React; design schema to be framework-agnostic

## Work Items
- Schema + generator (+ tests)
- Build/CI wiring (validate + publish artifacts)
- Seed components (5) + examples
- Tool schemas (React) + Storybook panel
- Documentation + contributor guide

## Dependencies & Inputs
- Inputs: `custom-elements.json`, `dist/**/*.d.ts`, curated examples in `docs/components/*` (or `examples/<tag>/*`).
- Prereqs: type emit stable; CEM available or generator falls back gracefully.

## Schema & Contracts
- Versioned schema with `manifestVersion` and additive-only policy.
- React tool schema mapping rules documented (props/events/slots → parameters, children handling, enums).

## Generator Design
- Read CEM + d.ts, merge examples, produce `ai-manifest.json` in repo root (and optionally `dist/`).
- Validate against schema; skip gracefully if inputs missing.

## Storybook Panel (Preview)
- Local addon to render manifest for active component; copy Web/React/SSR examples.

## CI Validation
- `validate:ai` checks schema conformity and existence/compilation of referenced examples.

---

Related: ADR-014, ADR-017, ADR-007, ADR-018, ADR-009, ADR-010, ADR-003
