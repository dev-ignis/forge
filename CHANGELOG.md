# Changelog

## 0.8.0-beta.0

### Minor Changes

- **Phase 15.4: Complete React package extraction and framework separation**
  - Extract React integration to separate @nexcraft/forge-react package
  - Remove all framework integrations from core @nexcraft/forge package
  - Update @nexcraft/forge-rhf to use new React package
  - Achieve pure web components core architecture
  - Set up linked package releases for coordinated versioning

- **New Figma Design Tokens Integration**
  - **`@nexcraft/forge-tokens`**: CLI for pulling design tokens from Figma and generating CSS/themes
  - **`@nexcraft/forge-mcp-figma`**: MCP server for integrating Figma workflows with AI tools

### Package Updates

- **Framework packages use patch-level beta versioning**: All framework integration packages (`@nexcraft/forge-react`, `@nexcraft/forge-vue`, `@nexcraft/forge-angular`) receive patch-level updates (0.1.1-beta.0) to avoid premature major version bumps
- **Coordinated beta releases**: All workspace packages are versioned and published together with proper dependency management
- **Improved CI/CD**: Switched from manual versioning to Changesets-based automatic versioning for reliability and consistency

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
