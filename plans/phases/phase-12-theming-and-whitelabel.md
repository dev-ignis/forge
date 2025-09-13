# Phase 12: Theming & Whitelabel

## Objective
Deliver a token‑first theming system that ships base tokens and theme packs (light/dark), supports scoped brand overrides, and exposes stable styling surfaces (tokens + parts) without breaking Shadow DOM encapsulation.

## Scope
- Export token CSS: `dist/styles/base.css` and `dist/styles/themes/{light,dark}.css`.
- Scoped theming via `[data-forge-theme]` and CSS variables that pierce shadow roots.
- Component styling surfaces: ensure CSS is token‑pure and expose `part` where needed.
- Brand/whitelabel path: “Brand Token Kit” using TokenBridge to emit brand CSS.
- Storybook theme switcher and examples for overrides.
- Documentation updates and migration notes.

Non-goals
- Removing Shadow DOM or moving component CSS to external files per component.
- Theme logic in runtime JS beyond applying attributes/variables.

## Deliverables
- CSS artifacts: base + theme packs published and exported via `package.json` (`./styles/*`).
- Storybook toolbar toggle for `data-forge-theme` with per‑component demos.
- Component parts audit + additions (e.g., input: `part=input container prefix suffix helper`).
- Brand Kit template: `tokens/brand-template.json` + script using TokenBridge producing `brand.css`.
- Docs: theming quick‑start, whitelabel guide, parts reference.

## Milestones (2 weeks)
- Week 1
  - Export `base.css` and create `light.css` / `dark.css`; wire build + exports
  - Audit 10 priority components; add `part` attributes where needed
  - Storybook theme switcher MVP
- Week 2
  - Brand Kit + TokenBridge script and example brand
  - Docs and examples; add component stories showing overrides
  - Finalize acceptance tests and thresholds

## ADR Compliance
- ADR‑003 (Theming via CSS Custom Properties)
- ADR‑007 (Framework Integration; attribute application in React/Vue/Angular helpers)
- ADR‑014 (AI‑Ready; manifest references tokens, not concrete colors)
- ADR‑017 (AI Manifest lists token hooks; no runtime coupling)
- ADR‑018 (SSR works; theming applied via attributes/vars)

## Acceptance Criteria (DoD)
- `@nexcraft/forge/styles/base.css` and `@nexcraft/forge/styles/themes/{light,dark}.css` are importable and switch visuals when toggling `data-forge-theme`.
- At least 10 components are token‑pure and expose documented parts; stories demonstrate per‑component overrides and brand scoping.
- Brand Kit script generates a `brand.css` consumable via `[data-forge-theme="brand-x"]`.
- Docs include quick‑start, whitelabel, and parts reference; examples compile in Storybook.

## Risks & Mitigations
- Token gaps in components → Audit and replace literals with `--forge-*` tokens.
- Specificity issues → Keep component CSS minimal; recommend container scoping for brands.
- Bundle bloat → Reuse variables; keep theme packs small and declarative.

## Work Items
- Build: copy tokens to `dist/styles`; add exports map
- Create light/dark CSS packs with `[data-forge-theme]` selectors
- Add parts to priority components and document
- Storybook theme switcher and override stories
- Brand Kit template + TokenBridge script and sample output
- Documentation updates (guides + API/parts tables)

## Component Checklist (Organisms)
Source: `src/components/organisms/index.ts` — track progress per component.

- [ ] Accordion (`forge-accordion`)
  - [ ] Exported in index.ts
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (container, header, panel)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Data Table (`forge-data-table`)
  - [ ] Exported in index.ts
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (table, header, row, cell)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Navigation Bar (`forge-navigation-bar`)
  - [ ] Exported in index.ts
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (container, item)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Pagination (`forge-pagination`)
  - [ ] Exported in index.ts
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (container, item, button)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Tabs (`forge-tabs`)
  - [ ] Exported in index.ts
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (list, tab, panel)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Tree View (`forge-tree-view`)
  - [ ] Exported in index.ts
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (tree, item, toggle)
  - [ ] Stories/docs updated
- [ ] AI Manifest entry

Note: `data-grid/` exists but isn’t exported from organisms/index.ts.
- [ ] Decide export for `forge-data-grid`
- [ ] Token‑pure CSS
- [ ] Parts exposed (grid, header, row, cell)
- [ ] Stories/docs updated
- [ ] AI Manifest entry

## Component Checklist (Molecules)

- [ ] Card (`forge-card`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (container, header, body, footer)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Date Picker (`forge-date-picker`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (input, calendar, day, nav)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Dropdown (`forge-dropdown`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (trigger, menu, item)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Form Field (`forge-form-field`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (label, control, helper, error)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Modal (`forge-modal`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (overlay, dialog, header, body, footer)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Multi Select (`forge-multi-select`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (control, tag, menu, item)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Toast (`forge-toast`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (container, message, action)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Tooltip (`forge-tooltip`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (trigger, content, arrow)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry

## Component Checklist (Atoms)

- [ ] Alert (`forge-alert`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (container, icon, title, description)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Aspect Ratio (`forge-aspect-ratio`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (container)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Avatar (`forge-avatar`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (image, fallback)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Badge (`forge-badge`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (container)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Button (`forge-button`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (button, icon)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Checkbox (`forge-checkbox`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (control, label)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Icon (`forge-icon`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (svg)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Input (`forge-input`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (container, input, prefix, suffix, helper)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Progress (`forge-progress`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (track, indicator, label)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Progress Circle (`forge-progress-circle`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (svg, track, indicator, label)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Radio Group (`forge-radio-group`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (group, item, input, label)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Select (`forge-select`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (control, trigger, listbox, option)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Skeleton (`forge-skeleton`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (container)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
- [ ] Switch (`forge-switch`)
  - [ ] Token‑pure CSS
  - [ ] Parts exposed (track, thumb, label)
  - [ ] Stories/docs updated
  - [ ] AI Manifest entry
