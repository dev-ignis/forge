# Changelog

## v0.5.2-beta.15 - 2025-09-12 (Beta Release)

### 🧪 Beta Changes
- fix: - lint;
- Merge branch 'develop' of https://github.com/dev-ignis/forge into develop
- fix: - createUnifiedWrapper;
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.14 - 2025-09-12 (Beta Release)

### 🧪 Beta Changes
- Merge branch 'develop' of https://github.com/dev-ignis/forge into develop
- fix(react): - complete unified SSR architecture by enabling server-side environment detection;
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.13 - 2025-09-12 (Beta Release)

### 🧪 Beta Changes
- fix: - createUnifiedWrapper;
- Merge branch 'develop' of https://github.com/dev-ignis/forge into develop
- docs: - components;
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.12 - 2025-09-12 (Beta Release)

### 🧪 Beta Changes
- fix: complete unified SSR architecture implementation
- fix: - complete unified SSR architecture implementation;
-  feat: implement unified SSR architecture for React components
- docs: - updated docs for components;
- Merge branch 'develop' of https://github.com/dev-ignis/forge into develop
- docs: - ssr architecture;
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.11 - 2025-09-11 (Beta Release)

### 🧪 Beta Changes
- Merge branch 'develop' of https://github.com/dev-ignis/forge into develop
- fix: - module resolution;
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.10 - 2025-09-11 (Beta Release)

### 🧪 Beta Changes
- Merge branch 'develop' of https://github.com/dev-ignis/forge into develop
- fix: - react wrappers;
- docs: - ai native dev.;
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.9 - 2025-09-11 (Beta Release)

### 🧪 Beta Changes
- Merge branch 'develop' of https://github.com/dev-ignis/forge into develop
- feat: complete React integration with automatic SSR support
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.8 - 2025-09-10 (Beta Release)

### 🧪 Beta Changes
- fix: - lint;
- Merge branch 'develop' of https://github.com/dev-ignis/forge into develop
- feat: - integrate framework builds into main Vite process;
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.7 - 2025-09-10 (Beta Release)

### 🧪 Beta Changes
- Merge branch 'develop' of https://github.com/dev-ignis/forge into develop
- fix: - package export paths;
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.6 - 2025-09-10 (Beta Release)

### 🧪 Beta Changes
- Merge branch 'develop' of https://github.com/dev-ignis/forge into develop
- feat: enhance React integration and clean up build artifacts
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.5 - 2025-09-09 (Beta Release)

### 🧪 Beta Changes
- Merge branch 'main' into develop
- feat: - implement Phase 4.1 React integration (resolves #17);
- feat: add comprehensive TypeScript JSX declarations for web components
- chore(release): v0.5.2 [skip ci]
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.4 - 2025-09-09 (Beta Release)

### 🧪 Beta Changes
- Merge branch 'develop' of https://github.com/dev-ignis/forge into develop
- fix: - ci node images;
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.3 - 2025-09-09 (Beta Release)

### 🧪 Beta Changes
- feat: avatar component;
- docs: - advanced features for data-grid;
- feat: - data-grid;
- feat: - improve TypeScript types;
- docs: - apect-ration / progress-circle / progress / skeleton / toast;
- sync: merge main into develop
- Merge pull request #16 from dev-ignis/develop
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2 - 2025-09-08

### Changes
- Merge pull request #16 from dev-ignis/develop

## v0.5.2-beta.2 - 2025-09-08 (Beta Release)

### 🧪 Beta Changes
- Merge branch 'main' into develop
- docs: - readme;
- fix: icon warnings;
- test: improve toast dismiss test reliability
- sync: merge main into develop
> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.1 - 2025-09-08 (Beta Release)

### 🧪 Beta Changes

> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.2-beta.0 - 2025-09-06 (Beta Release)

### 🧪 Beta Changes

> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.1 - 2025-09-06

### Changes
- Merge pull request #15 from dev-ignis/develop
- test: - form field performance;
- ci: - workflow;
- Merge pull request #14 from dev-ignis/develop
- test: - vitest config;
- Merge pull request #13 from dev-ignis/develop
- fix: - exclude integrations folder;
- Merge branch 'main' into develop
- fix: - sync job;
## v0.5.2-dev - 2025-09-06

### 🚀 Framework Integration Enhancement
- **React Integration Utilities**: Complete React hooks and utilities (`useForgeComponent`, `useForgeControlled`, `useForgeForm`)
- **Vue Integration Utilities**: Comprehensive Vue 3 composables (`useForgeVModel`, `useForgeTheme`, `useForgeDataTable`)
- **Angular Integration Utilities**: Full Angular directives and services (`ForgeComponentDirective`, `ForgeControlValueAccessor`)
- **Enhanced TypeScript Definitions**: Framework-specific type definitions with JSX support for React, Vue template support
- **Seamless Form Integration**: Built-in support for React Hook Form, Formik, VeeValidate, Angular Reactive Forms
- **Pre-built Components**: Ready-to-use wrapped components for each framework with proper event handling

### 🛠️ Build System Improvements
- **Integration File Handling**: Custom build script for framework-specific files excluded from main compilation
- **Test Coverage Optimization**: Excluded integration utilities from coverage metrics (framework-specific testing)
- **TypeScript Configuration**: Enhanced tsconfig with proper exclusions for external dependencies
- **ESLint Configuration**: Updated linting rules to handle framework integration files

### 🧪 Developer Experience
- **Comprehensive Documentation**: 67+ examples in React integration guide with real-world usage patterns
- **JSDoc Documentation**: Extensive inline documentation for all integration utilities
- **Type Safety**: Full TypeScript support across all framework integrations
- **Performance Optimized**: Tree-shaking friendly exports and minimal bundle impact

## v0.5.1-beta.0 - 2025-09-06 (Beta Release)

### 🧪 Beta Changes

> ⚠️ **This is a beta release** - use with caution in production environments

## v0.5.0 - 2025-09-06

### Changes
- Merge pull request #10 from dev-ignis/develop
- Merge branch 'main' into develop
- docs: - changelog;
- feat: - sync main and develop;
- docs: - roadmap;
All notable changes to @nexcraft/forge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.4.1] - 2025-09-05

### 📚 Documentation
- **Storybook Stories**: Comprehensive Storybook stories for all components with interactive examples
- **Performance Dashboard**: Added performance monitoring and optimization documentation
- **AI Integration**: Complete AI metadata documentation for enhanced component discovery

### 🧪 Testing
- Improved test coverage across all component types
- Enhanced testing infrastructure and documentation

## [v0.4.0] - 2025-09-05

### 🧩 New Organism Components
- **DataTable**: Advanced data table with sorting, filtering, pagination, and selection
- **Tabs**: Tabbed interface with keyboard navigation, closeable tabs, and drag-to-reorder
- **Accordion**: Collapsible content panels with customizable behavior
- **TreeView**: Hierarchical data visualization with expand/collapse functionality
- **NavigationBar**: Responsive navigation component with dropdown menus
- **Pagination**: Comprehensive pagination with multiple modes (standard, infinite scroll, load-more)

### 📚 Documentation
- Complete organism component documentation
- Enhanced Storybook stories with real-world examples
- Comprehensive testing documentation

### ✅ Testing
- Full test coverage for organism components
- Integration tests for complex component interactions

## [v0.3.2] - 2025-09-03

### 🤖 AI Integration
- **Complete AI Metadata System**: All components now include semantic roles, AI context, and performance modes
- **Enhanced Component Discovery**: AI agents can better understand component purposes and usage patterns
- **Smart Component Recommendations**: AI-powered component suggestions based on context

## [v0.3.1] - 2025-09-03

### 📚 Documentation
- **Updated README**: Comprehensive project documentation with usage examples
- **Getting Started Guide**: Detailed setup and integration instructions
- **API Documentation**: Complete component API reference

## [v0.3.0] - 2025-09-03

### 🧱 New Molecule Components
- **DatePicker**: Full-featured date selection with calendar interface and keyboard navigation
- **MultiSelect**: Advanced multi-selection dropdown with search, grouping, and custom rendering
- **Dropdown**: Flexible dropdown component with nested menus and keyboard navigation
- **FormField**: Comprehensive form field wrapper with validation and accessibility
- **Card**: Versatile card component for content organization
- **Modal**: Feature-rich modal dialogs with backdrop control and focus management
- **Tooltip**: Smart tooltip positioning with multiple trigger modes

### ✨ Core Differentiators
- **Advanced Theming**: Token-based design system with CSS custom properties
- **Full Accessibility**: WCAG 2.1 AA compliance across all components
- **Keyboard Navigation**: Complete keyboard support for all interactive elements
- **Framework Agnostic**: Works with React, Vue, Angular, and vanilla JavaScript

### 🧪 Testing
- Comprehensive test suite for date picker component
- Enhanced testing infrastructure for molecule components

## [v0.2.0] - 2025-09-01

### 🏗️ AI-Ready Infrastructure
- **AI Metadata System**: Semantic roles and context attributes for AI agent interaction
- **Performance Monitoring**: Built-in performance tracking and optimization hints
- **Smart Component Discovery**: AI-powered component recommendation engine

### 🧱 Enhanced Molecule Components
- **FormField Component**: Production-ready form field with validation and accessibility
- **Improved Component Architecture**: Better separation of concerns and reusability

## [v0.1.1] - 2025-08-31

### 🔧 Build System Improvements
- **TypeScript Declarations**: Bundled and optimized TypeScript definitions
- **Enhanced Testing**: Improved testing documentation and coverage reporting
- **Build Optimization**: Streamlined build process with better tree-shaking

## [v0.1.0] - 2025-08-31

### 🎯 Atomic Design System Foundation
- **Complete Atomic Components**: Button, Input, Checkbox, Radio, Select, Switch, Badge, Alert, Icon
- **Design System Tokens**: Comprehensive token-based theming system
- **Base Architecture**: Solid foundation with BaseElement and shared utilities

### 🧪 Testing Infrastructure
- **Comprehensive Test Suite**: Unit tests for all atomic components
- **Testing Documentation**: Complete testing strategy and guidelines
- **CI/CD Integration**: Automated testing and deployment pipeline

### 📋 Project Structure
- **Phase Documentation**: Detailed implementation roadmap and architecture decisions
- **Development Workflow**: Established development and contribution guidelines

## [v0.0.2] - 2025-08-29

### 🏷️ Package Configuration
- **NPM Package**: Renamed to @nexcraft/forge for better organization
- **Version Management**: Fixed version tagging and release process
- **Publishing Setup**: Configured for NPM registry publication

## [v0.0.1] - 2025-08-29

### 🚀 Initial Release
- **Project Foundation**: Basic project structure and configuration
- **Core Infrastructure**: Build system, CI/CD pipeline, and development tools
- **Package Setup**: Initial NPM package configuration and publishing strategy

---

## Component Inventory

### 🔸 Atoms (9 components)
- Alert, Badge, Button, Checkbox, Icon, Input, Radio Group, Select, Switch

### 🔹 Molecules (8 components) 
- Card, DatePicker, Dropdown, FormField, Modal, MultiSelect, Tooltip

### 🔷 Organisms (6 components)
- Accordion, DataTable, NavigationBar, Pagination, Tabs, TreeView

**Total: 23+ Production-Ready Components**