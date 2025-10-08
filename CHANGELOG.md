# Changelog

## 0.10.0

### Minor Changes

- e40659d: feat(core): expand design tokens and complete component exports

  **New Features:**
  - Expanded CSS custom properties (design tokens)
  - Additional component exports for better tree-shaking
  - Enhanced token coverage for theming

  **What Changed:**
  - Added more granular design tokens
  - Improved token organization
  - Better TypeScript types for exports

  **Impact:**
  - ✅ More theming flexibility with additional tokens
  - ✅ Better tree-shaking with specific component exports
  - ✅ Enhanced customization capabilities
  - ✅ No breaking changes - only additions

### Patch Changes

- e40659d: fix(forge-card): add padding to custom header slot

  **Bug Fix:**
  - Added proper padding to custom header slot in ForgeCard
  - Ensures consistent spacing when using slotted header content

  **What Changed:**
  - Custom header slot now has appropriate padding
  - Matches design system spacing standards

  **Usage:**

  ```html
  <!-- Header slot now has proper padding -->
  <forge-card>
    <div slot="header">Custom Header</div>
    <p>Card content</p>
  </forge-card>
  ```

  **Impact:**
  - ✅ Better visual consistency for custom headers
  - ✅ Matches other card sections' padding
  - ✅ No breaking changes - only adds missing padding

- e40659d: fix(tokens): export CSS design tokens for component styling

  **Bug Fix:**
  - Added missing `tokens.css` export to package.json
  - Users can now import CSS custom properties for theming

  **What Changed:**

  ```json
  // package.json exports
  "./tokens.css": "./dist/tokens.css"
  ```

  **Usage:**

  ```js
  // Before: Not available
  // After: Can import tokens
  import '@nexcraft/forge/tokens.css';
  ```

  **Impact:**
  - ✅ Design tokens now accessible via package export
  - ✅ Enables custom theming with CSS variables
  - ✅ Matches documented token bridge usage
  - ✅ No breaking changes

## 0.9.0

### Minor Changes

- 7a38d60: Add selective imports for all 28 components
  - Previously only 7 components had selective imports (button, input, checkbox, select, alert, card, modal)
  - Now all 28 components support selective imports for optimal tree-shaking
  - Auto-discovery system ensures new components automatically get exports
  - Fixes customer issue where ForgeProgress, ForgeBadge, ForgeAvatar, ForgeDropdown were missing

  **New selective imports available:**
  - ForgeAccordion, ForgeAspectRatio, ForgeAvatar, ForgeBadge
  - ForgeDataGrid, ForgeDataTable, ForgeDatePicker, ForgeDropdown
  - ForgeFormField, ForgeIcon, ForgeMultiSelect, ForgeNavigationBar
  - ForgePagination, ForgeProgress, ForgeRadioGroup, ForgeSkeleton
  - ForgeSwitch, ForgeTabs, ForgeToast, ForgeTooltip, ForgeTreeView

  **Usage:**

  ```typescript
  import { ForgeProgress } from '@nexcraft/forge/progress';
  import { ForgeBadge } from '@nexcraft/forge/badge';
  import { ForgeAvatar } from '@nexcraft/forge/avatar';
  ```

### Patch Changes

- 7a38d60: Refactor test suite to prevent resource contention and timeouts
  - Split tests into fast unit tests (1147 tests) and slow accessibility tests (35 tests)
  - Add `test:unit` and `test:a11y` npm scripts for separate execution
  - Update `test:coverage` to run both suites sequentially
  - Accessibility tests now run in single-fork mode to prevent timeouts
  - Coverage maintained at 87% (above 70% threshold)
  - All 1182 tests now pass reliably in CI without timeouts

  **Benefits:**
  - Faster test execution (unit ~13s, a11y ~3s vs previous 30s+ with timeouts)
  - No more flaky accessibility test failures due to resource contention
  - Better test organization for future maintenance

## 0.8.0

### Minor Changes

- 6515991: Phase 15.4: Complete React package extraction and framework separation
  - Extract React integration to separate @nexcraft/forge-react package
  - Remove all framework integrations from core @nexcraft/forge package
  - Update @nexcraft/forge-rhf to use new React package
  - Achieve pure web components core architecture
  - Set up linked package releases for coordinated versioning

## 0.9.0

### Minor Changes

- **Phase 15 Complete: Framework Integration Package Split**

  **BREAKING CHANGES**: All framework integrations moved to separate packages
  - **Angular**: `@nexcraft/forge-angular` - Complete Angular integration with pipes, directives, and reactive forms support
  - **Vue**: `@nexcraft/forge-vue` - Comprehensive Vue 3 composables and component wrappers
  - **React**: `@nexcraft/forge-react` - Full React integration with hooks and SSR support

  **Migration**: Install the dedicated package for your framework:

  ```bash
  # Angular users
  npm install @nexcraft/forge-angular

  # Vue users
  npm install @nexcraft/forge-vue

  # React users
  npm install @nexcraft/forge-react
  ```

  ```diff
  - import { ForgeButton } from '@nexcraft/forge/integrations/react';
  + import { ForgeButton } from '@nexcraft/forge-react';

  - import { ForgeButton } from '@nexcraft/forge/integrations/vue';
  + import { ForgeButton } from '@nexcraft/forge-vue';

  - import { ForgeButton } from '@nexcraft/forge/integrations/angular';
  + import { ForgeButton } from '@nexcraft/forge-angular';
  ```

  **Benefits**:
  - Pure web components core package (truly framework-agnostic)
  - Optional framework dependencies - install only what you need
  - Better maintenance by framework experts
  - Consistent modular architecture across all frameworks
  - Smaller bundle sizes for framework-specific apps

- **New Figma Design Tokens Integration**
  - **`@nexcraft/forge-tokens`**: CLI for pulling design tokens from Figma and generating CSS/themes
  - **`@nexcraft/forge-mcp-figma`**: MCP server for integrating Figma workflows with AI tools

  ```bash
  # Install the tokens CLI
  npm install -g @nexcraft/forge-tokens

  # Pull tokens from Figma
  forge-tokens pull --file-key=your-figma-file-key
  ```

- **Enhanced Security & Release Infrastructure**
  - Added comprehensive npm audit workflows with Discord notifications
  - Implemented automated security gates for releases
  - Enhanced CI/CD pipeline with performance monitoring
  - Added automated dependency vulnerability scanning

- **Beta Publishing Infrastructure (develop branch)**
  - Implemented independent beta versioning for workspace packages
  - Added Changesets-based beta publishing workflow
  - Framework packages use coordinated beta releases
  - Automated version bumping based on changeset files

## 0.8.0

### Minor Changes

- **Enhanced AI Discoverability and Documentation System**
  - Comprehensive AI metadata system for component discovery
  - Added structured ai-manifest.json with component metadata
  - Created AI-focused documentation (AI_COMPONENT_CATALOG.md, AI_COMMON_PATTERNS.md)
  - Enhanced package.json with AI-focused keywords and metadata
  - Added .cursorrules for Cursor IDE integration

- **Monorepo & Package Management Infrastructure**
  - Implemented npm workspaces for monorepo structure
  - Added Changesets for automated versioning and publishing
  - Split React Hook Form adapters into separate `@nexcraft/forge-rhf` package
  - Added Husky pre-commit hooks for code quality validation
  - Updated CI workflows to support workspace builds

- **Component Imports & Tailwind Integration**
  - Added Tailwind CSS plugin at `@nexcraft/forge/plugin`
  - Implemented selective component imports for optimal tree-shaking
  - Individual imports: `button`, `input`, `checkbox`, `select`, `alert`, `card`, `modal`
  - Significantly reduces bundle size for applications

## 0.7.1

### Patch Changes

- Fix auto-changeset script to prevent incorrect version bumps
- Fix AI manifest generation build ordering and add validation gates
- Ensure CEM is generated before AI manifest generation
- Added validation that generated manifest has at least 25 components
- Enhanced prepublish checks for AI artifacts validation

## 0.7.0

### Minor Changes

- Enhanced CI/CD workflows with performance and reliability improvements
- Consolidated workflows into single main-branch workflow
- Fixed Next.js example build errors and configured GitHub Pages
- Resolved auto-changeset infinite loop and cleaned up changelog
- Aligned package versions with npm registry for stable release

## 0.6.0

### Minor Changes

- **Framework Integration Enhancement**
  - Complete React hooks and utilities (`useForgeComponent`, `useForgeControlled`, `useForgeForm`)
  - Comprehensive Vue 3 composables (`useForgeVModel`, `useForgeTheme`, `useForgeDataTable`)
  - Full Angular directives and services (`ForgeComponentDirective`, `ForgeControlValueAccessor`)
  - Enhanced TypeScript definitions with framework-specific types
  - Seamless form integration support for React Hook Form, Formik, VeeValidate, Angular Reactive Forms

### Patch Changes

- Build system improvements for framework-specific files
- Enhanced TypeScript configuration with proper exclusions
- Comprehensive documentation with 67+ examples in React integration guide

## 0.5.0

### Minor Changes

- Initial framework integration architecture
- Core component system stabilization
- Documentation improvements

## 0.4.0

### Minor Changes

- **New Organism Components**
  - DataTable: Advanced data table with sorting, filtering, pagination, and selection
  - Tabs: Tabbed interface with keyboard navigation and drag-to-reorder
  - Accordion: Collapsible content panels with customizable behavior
  - TreeView: Hierarchical data visualization with expand/collapse functionality
  - NavigationBar: Responsive navigation component with dropdown menus
  - Pagination: Comprehensive pagination with multiple modes

### Patch Changes

- Enhanced Storybook stories with real-world examples
- Full test coverage for organism components
- Complete organism component documentation

## 0.3.0

### Minor Changes

- **New Molecule Components**
  - DatePicker: Full-featured date selection with calendar interface
  - MultiSelect: Advanced multi-selection dropdown with search and grouping
  - Dropdown: Flexible dropdown component with nested menus
  - FormField: Comprehensive form field wrapper with validation
  - Card: Versatile card component for content organization
  - Modal: Feature-rich modal dialogs with backdrop control
  - Tooltip: Smart tooltip positioning with multiple trigger modes

- **Core Framework Features**
  - Advanced theming with token-based design system
  - Full WCAG 2.1 AA accessibility compliance
  - Complete keyboard navigation support
  - True framework agnostic architecture

## 0.2.0

### Minor Changes

- AI-Ready Infrastructure with metadata system
- Performance monitoring and optimization hints
- Smart component discovery for AI agents
- Enhanced FormField component architecture

## 0.1.0

### Minor Changes

- **Atomic Design System Foundation**
  - Complete atomic components: Button, Input, Checkbox, Radio, Select, Switch, Badge, Alert, Icon
  - Comprehensive design system tokens
  - Base architecture with BaseElement and shared utilities
  - Full testing infrastructure and CI/CD integration

---

## Component Inventory

**Total: 23+ Production-Ready Components**

- **Atoms (9)**: Alert, Badge, Button, Checkbox, Icon, Input, Radio Group, Select, Switch
- **Molecules (8)**: Card, DatePicker, Dropdown, FormField, Modal, MultiSelect, Tooltip
- **Organisms (6)**: Accordion, DataTable, NavigationBar, Pagination, Tabs, TreeView
