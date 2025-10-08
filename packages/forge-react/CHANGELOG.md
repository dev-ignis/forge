# @nexcraft/forge-react

## 2.0.0

### Patch Changes

- e40659d: fix(docs): correct CDN URL to use nexcraft-forge.es.js instead of forge.js

  **Critical Documentation Fix:**
  - CDN URL was incorrect: `/dist/forge.js` does not exist in the package
  - Correct file: `/dist/nexcraft-forge.es.js`
  - Updated all integration guides (Next.js, Remix, SvelteKit)

  **What Changed:**
  - ❌ Old: `https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.js`
  - ✅ New: `https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/nexcraft-forge.es.js`

  **Files Updated:**
  - docs/integrations/nextjs-15-app-router.md
  - docs/integrations/remix.md
  - docs/integrations/sveltekit.md

  **Impact:**
  - ✅ CDN links now work correctly
  - ✅ Self-hosted instructions use correct filename
  - ✅ Import statements reference actual file
  - ✅ Fixes "404 Not Found" errors when using CDN

- e40659d: feat(forge-card): add border prop to control card border visibility

  **New Feature:**
  - Added `border` prop to ForgeCard component
  - Default: border shown (1px solid #e5e7eb)
  - Set `border={false}` to remove border

  **Usage:**

  ```tsx
  // With border (default)
  <ForgeCard>Content</ForgeCard>

  // Without border
  <ForgeCard border={false}>Clean borderless card</ForgeCard>
  ```

  **Implementation:**
  - Fallback renderer adds 'forge-card--no-border' class when border={false}
  - CSS: `.forge-card--no-border { border: none; }`
  - Attribute preserved during hydration to web component

  **Impact:**
  - ✅ Gives users control without custom CSS
  - ✅ Matches common UI patterns (cards with/without borders)
  - ✅ Simple API: `<ForgeCard border={false}>`
  - ✅ No breaking changes

- Updated dependencies [e40659d]
- Updated dependencies [e40659d]
- Updated dependencies [e40659d]
  - @nexcraft/forge@0.10.0

## 1.0.4

### Patch Changes

- 24e826f: feat(ssr): comprehensive fallback CSS for styled SSR components

  **Critical Fix for Unstyled Forms:**
  - ✅ New fallback CSS file provides styling for all SSR fallback components
  - ✅ Fixes issue where components rendered as unstyled HTML inputs
  - ✅ Matches web component visual appearance during SSR

  **What's Included:**
  - Comprehensive styles for all form components (Input, Select, Checkbox, Switch, DatePicker)
  - Button variants and sizes (primary, secondary, outline, ghost)
  - UI components (Card, Badge, LoadingSpinner)
  - Responsive and accessible design

  **How to Use:**

  ```tsx
  // Add to your app layout or root component
  import '@nexcraft/forge-react/fallbacks.css';
  ```

  **Styled Components:**
  - `.forge-input` - Text inputs with variants and sizes
  - `.forge-checkbox` - Checkbox with focus states
  - `.forge-switch` - Toggle switch with animations
  - `.forge-select` - Select dropdown with custom arrow
  - `.forge-date-picker` - Date input styling
  - `.forge-button` - Button variants (primary, secondary, outline, ghost)
  - `.forge-card` - Card with shadow and hover effects
  - `.forge-badge` - Badge variants (primary, success, warning, error)
  - `.forge-loading-spinner` - Animated spinner with sizes

  **Impact:**
  - ✅ Forms look styled immediately during SSR
  - ✅ No flash of unstyled content (FOUC)
  - ✅ Components visually upgrade when web components load
  - ✅ Better UX for users on slow connections

  **Related Issues Fixed:**
  - Gaming Highlight Reel unstyled forms (http://localhost:9001/register)
  - Multiple client reports of "blank/unstyled components"

- 24e826f: fix(ssr): improve hydration timing with customElements.whenDefined()

  **Critical Timing Fix:**
  - ✅ Components now properly upgrade from fallback to web component when loaded
  - ✅ Fixes issue where components stayed as fallback HTML indefinitely
  - ✅ Handles race condition between component render and web component registration

  **What Changed:**
  - Added `customElements.whenDefined()` detection in `createUnifiedWrapper`
  - Components wait for web component definition before upgrading
  - Graceful fallback if web components never load

  **Technical Details:**

  ```tsx
  // Before: Only checked if component was already defined
  const shouldUpgrade = customElements.get(tagName) !== undefined;

  // After: Waits for component to be defined
  if (shouldUpgrade) {
    upgradeToWebComponent();
  } else {
    customElements.whenDefined(tagName).then(() => {
      upgradeToWebComponent();
    });
  }
  ```

  **Impact:**
  - ✅ Components upgrade correctly after web components load
  - ✅ Handles dynamic import scenarios
  - ✅ Handles Next.js Script with `beforeInteractive` strategy
  - ✅ No hydration mismatches or warnings

  **Related Issues Fixed:**
  - "Components stay as fallbacks" - now properly upgrade
  - Race condition with dynamic `import('@nexcraft/forge')`
  - Timing issues with Next.js Script loading

- 24e826f: feat(ssr): automatic 'use client' directive for Next.js App Router compatibility

  **Critical SSR Fix:**
  - ✅ Automatic 'use client' directive added to all React components during build
  - ✅ Components work in Next.js App Router without manual 'use client' directives
  - ✅ Zero-config SSR support for all React frameworks

  **What Changed:**
  - Build script automatically prepends `'use client';` to all compiled components
  - 40 component files now have 'use client' directive
  - No changes needed in source files (framework-agnostic)

  **Impact:**
  - ✅ Next.js App Router: Components work automatically
  - ✅ Remix: Full SSR support
  - ✅ Gatsby: No changes needed
  - ✅ No breaking changes - existing code works better

  **Before (v1.0.3):**

  ```tsx
  'use client'; // User must add this
  import { ForgeButton } from '@nexcraft/forge-react';

  export function MyComponent() {
    return <ForgeButton>Click</ForgeButton>;
  }
  ```

  **After (v1.0.4):**

  ```tsx
  // No 'use client' needed - package handles it!
  import { ForgeButton } from '@nexcraft/forge-react';

  export function MyComponent() {
    return <ForgeButton>Click</ForgeButton>;
  }
  ```

  **Technical Details:**
  - Post-build script: `packages/forge-react/scripts/add-use-client.js`
  - Build command updated: `tsc && node scripts/add-use-client.js`
  - Follows industry standard pattern (Material UI approach)
  - @nexcraft/forge@0.9.0

## 1.0.3

### Patch Changes

- 2f08880: fix(fallback): pass through `id` prop in all form component fallbacks

  **Bug Fix:**
  - Fixed duplicate ID warning when multiple form components use the same `id` prop
  - All form input fallback renderers now properly pass through the `id` attribute

  **What Changed:**
  - `ForgeInput`: Now passes `id` prop to fallback `<input>` element
  - `ForgeSwitch`: Now passes `id` prop to fallback checkbox input
  - `ForgeSelect`: Now passes `id` prop to fallback `<select>` element
  - `ForgeDatePicker`: Now passes `id` prop to fallback date input

  **Impact:**
  - ✅ Fixes browser warning: "Found N elements with non-unique id"
  - ✅ Proper label associations with `htmlFor` attribute
  - ✅ Better accessibility for screen readers
  - ✅ No breaking changes

  **Before:**

  ```tsx
  <ForgeInput id="email" />
  // Fallback: <input /> (id ignored)
  ```

  **After:**

  ```tsx
  <ForgeInput id="email" />
  // Fallback: <input id="email" />
  ```

- 2f08880: refactor(types): improve TypeScript type safety across React integration

  **Type Safety Improvements:**
  - ✅ Replaced `any[]` with proper typed arrays (`GridSortConfig[]`, `DataTableRow[]`, `TreeNode[]`)
  - ✅ Added proper type definitions for data structures (GridSortConfig, DataTableRow, TreeNode)
  - ✅ Improved utility types (removed 20+ `any` casts)
  - ✅ Better DOM/React type annotations

  **What Changed:**
  - `ForgeDataGridProps.onSortChanged`: `any[]` → `GridSortConfig[]`
  - `ForgeDataTableProps.data`: `Record<string, any>[]` → `DataTableRow[]`
  - `ForgeDataTableProps.onSelectionChange`: `any[]` → `DataTableRow[]`
  - `ForgeTreeViewProps.data.children`: `any[]` → `TreeNode[]` (recursive)
  - `createUnifiedWrapper`: Improved type annotations for refs and props

  **Impact:**
  - ✅ Better IDE autocomplete and IntelliSense
  - ✅ Catch type errors at compile time
  - ✅ Improved developer experience
  - ✅ No breaking changes (compatible types)

  **Remaining Work:**
  Some component-specific fallback renderers still use `unknown` for flexibility. These are non-critical and will be addressed incrementally.
  - @nexcraft/forge@0.9.0

## 1.0.2

### Patch Changes

- d971b78: fix(ssr): proper SSR architecture - NO 'use client' in library files

  **Critical Architecture Fix:**
  - **REMOVED** 'use client' from all library files (was polluting all consumers)
  - Library files stay framework-agnostic (no Next.js-specific directives)
  - Consumers add 'use client' to their own files when needed
  - Matches industry standard (Radix UI, Headless UI, Framer Motion)

  **What Changed:**
  - ✅ ForgeProvider: NO 'use client' (consumers add it)
  - ✅ createUnifiedWrapper: NO 'use client' (consumers add it)
  - ✅ Added clear documentation: "add 'use client' to your file"
  - ✅ SSR demo shows correct usage pattern

  **Why This Matters:**
  - ❌ **Wrong**: Library has 'use client' → ALL consumers forced to client-side
  - ✅ **Correct**: Consumers add 'use client' → They control client boundaries

  **Usage Pattern (Correct):**

  ```tsx
  // ✅ YOUR file - add 'use client' here
  'use client';
  import { ForgeButton } from '@nexcraft/forge-react';

  export function MyComponent() {
    return <ForgeButton>Click</ForgeButton>;
  }
  ```

  **Impact:**
  - ✅ No forced client-side rendering for all consumers
  - ✅ Consumers control their own SSR/client boundaries
  - ✅ Better performance (only client components when needed)
  - ✅ Framework-agnostic library architecture
  - @nexcraft/forge@0.9.0

## 1.0.1

### Patch Changes

- c074759: fix(release): build workspace packages before publishing

  **Critical Fix:** v1.0.0 packages were published without compiled `dist/` folders, making them completely unusable.

  **Root Cause:**
  Release workflow only built main @nexcraft/forge package, not workspace packages (forge-react, forge-vue, forge-angular, forge-rhf).

  **Fix:**
  - Add build step for all workspace packages before `changeset publish`
  - Ensures dist/ folders exist for all packages
  - Validates packages are usable after installation

  **Impact:**
  - ✅ @nexcraft/forge-react@1.0.1 will include dist/ folder
  - ✅ @nexcraft/forge-vue@1.0.1 will include dist/ folder
  - ✅ @nexcraft/forge-angular@1.0.1 will include dist/ folder
  - ✅ @nexcraft/forge-rhf@1.0.1 will include dist/ folder

  **Affected Users:**
  Anyone who installed v1.0.0 packages encountered:

  ```
  Error: Cannot find module './dist/index.js'
  ```

  **Resolution:**
  Upgrade to v1.0.1 when released:

  ```bash
  npm install @nexcraft/forge-react@latest
  npm install @nexcraft/forge-vue@latest
  npm install @nexcraft/forge-angular@latest
  npm install @nexcraft/forge-rhf@latest
  ```

  **Apologies:**
  We sincerely apologize for this critical oversight. We've added additional validation to prevent this from happening again.
  - @nexcraft/forge@0.9.0

## 1.0.0

### Patch Changes

- Updated dependencies [7a38d60]
- Updated dependencies [7a38d60]
  - @nexcraft/forge@0.9.0

## 0.3.0

### Minor Changes

- 842b2e4: chore: increment beta versions to skip unpublished versions
  - Bump framework packages to 0.2.0-beta.0 to skip past unpublished 0.1.1-beta.0
  - Bump forge-mcp-figma to 0.2.0-beta.0 to skip past unpublished 0.1.1-beta.0
  - Bump forge-rhf to 0.4.0-beta.0 to skip past unpublished 0.3.1-beta.0 and 1.0.0-beta.0

- 6515991: Phase 15.4: Complete React package extraction and framework separation
  - Extract React integration to separate @nexcraft/forge-react package
  - Remove all framework integrations from core @nexcraft/forge package
  - Update @nexcraft/forge-rhf to use new React package
  - Achieve pure web components core architecture
  - Set up linked package releases for coordinated versioning

### Patch Changes

- Updated dependencies [6515991]
  - @nexcraft/forge@0.8.0

## 2.0.0

### Minor Changes

- Phase 15.4: React integration package split
  - Extract all React components and utilities to @nexcraft/forge-react package
  - Remove React integration from main @nexcraft/forge package
  - Achieve pure web components core package (truly framework-agnostic)
  - Update documentation and migration guides
  - Add comprehensive React integration documentation

  **Migration**: For React users, install the new dedicated package:

  ```bash
  npm install @nexcraft/forge-react
  ```

  ```diff
  - import { ForgeButton } from '@nexcraft/forge/integrations/react';
  + import { ForgeButton } from '@nexcraft/forge-react';
  ```

  **Benefits**:
  - Consistent modular architecture across all frameworks
  - Optional React dependency - install only what you need
  - Better maintenance by React experts
  - Architectural purity - core package is framework-agnostic

### Patch Changes

- Updated dependencies
  - @nexcraft/forge@0.9.0

## 1.0.0

### Major Changes

- Phase 15.4: React integration package split

  **BREAKING CHANGE**: React integration moved to separate @nexcraft/forge-react package
  - Extract all React components and utilities to @nexcraft/forge-react package
  - Remove React integration from main @nexcraft/forge package
  - Achieve pure web components core package (truly framework-agnostic)
  - Update documentation and migration guides

  **Migration**: Replace `@nexcraft/forge/integrations/react` imports with `@nexcraft/forge-react`

  ```diff
  - import { ForgeButton } from '@nexcraft/forge/integrations/react';
  + import { ForgeButton } from '@nexcraft/forge-react';
  ```

  **Benefits**:
  - Consistent modular architecture across all frameworks
  - Optional React dependency - install only what you need
  - Better maintenance by React experts
  - Architectural purity - core package is framework-agnostic

### Patch Changes

- Updated dependencies
  - @nexcraft/forge@0.8.0
