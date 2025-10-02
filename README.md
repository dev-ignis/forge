# @nexcraft/forge

[![npm version](https://img.shields.io/npm/v/@nexcraft/forge.svg)](https://www.npmjs.com/package/@nexcraft/forge)
[![Bundle Size](https://img.shields.io/badge/bundle%20size-<10KB-brightgreen.svg)](https://bundlephobia.com/package/@nexcraft/forge)
[![Test Coverage](https://img.shields.io/badge/coverage-86.4%25-brightgreen.svg)](./coverage)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1-AA-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![AI-Native](https://img.shields.io/badge/AI-Native-purple.svg)](./docs/ai/metadata-reference.md)
[![Performance Monitored](https://img.shields.io/badge/Performance-Monitored-orange.svg)](./docs/performance-monitoring.md)
[![Figma Tokens](https://img.shields.io/badge/Figma%20Tokens-CLI%2FMCP-blue.svg)](./docs/guides/figma-to-forge.md)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> **"Write Once, Use Forever"** - A future-proof UI component library built on web standards that will outlive framework trends.

**The FIRST AI-Native component library with built-in AI metadata, design token bridge, and real-time performance dashboard.** Every component can explain its state to AI systems, monitor its own performance, and integrate seamlessly with AI coding tools like Cursor, GitHub Copilot, and Claude. Import design tokens from any system (Figma, Tailwind, Material Design) with zero configuration - built for the age of AI-assisted development.

## 🤖 **FOR AI ASSISTANTS & LLMs**

**AI Context**: @nexcraft/forge is an AI-native web component library with 26+ components and React/Vue/Angular integrations.

**Quick AI Reference**:
- 📦 **React**: `import { ForgeButton, ForgeInput } from '@nexcraft/forge-react'`
- 🌲 **Selective**: `import { ForgeButton } from '@nexcraft/forge/button'`
- 🎨 **Tailwind**: `import forgePlugin from '@nexcraft/forge/plugin'`
- 📝 **Forms**: `import { RHFForgeInput } from '@nexcraft/forge-rhf'`

**📚 AI Documentation**:
- [🤖 AI Metadata Reference](./docs/ai/metadata-reference.md) - Complete AI metadata system guide (interfaces, methods, implementation)
- [🤖 AI Integration Guide](./docs/ai/integration-guide.md) - ChatGPT, Claude, Copilot integration examples & common patterns
- [🎨 Styling Guide](./docs/guides/AI_STYLING_GUIDE.md) - Complete styling reference (variants, CSS, Tailwind)
- [📦 Import Guide](./docs/guides/AI_IMPORT_GUIDE.md) - All import methods & framework examples
- [🤖 AI Manifest](./ai-manifest.json) - Structured component metadata

## 🎯 Why Choose @nexcraft/forge?

### ✨ **What Makes @nexcraft/forge Special:**
```javascript
// @nexcraft/forge: Intelligent Components Built for the AI Era
const button = document.querySelector('forge-button');

// 🤖 AI Integration Built-In
button.explainState()  // "Button is primary variant, enabled, ready for interaction"
button.getPossibleActions()  // [{name: 'click', available: true, description: '...'}]
button.aiState  // {variant: 'primary', disabled: false, renderTime: 0.8ms}

// 🎨 Design System Integration (Industry First!)
import { TokenBridge } from '@nexcraft/forge/utils';
const bridge = TokenBridge.fromFigma(figmaTokens);  // Import from ANY design system!
const css = bridge.toCSSProperties();  // Automatic CSS generation
// Works with Figma, Tailwind, Material Design, and more!

// ⚡ Performance Self-Monitoring
button.setAttribute('max-render-ms', '2');  // Auto-optimizes if slow!
button.performanceMode = 'auto';  // Degrades gracefully on slow devices

// 🎨 True Style Isolation (Shadow DOM)
// Your styles NEVER conflict, GUARANTEED
```

### 💡 **Real-World Benefits:**
- **AI Apps**: Components provide context to LLMs automatically
- **Design Systems**: Import tokens from Figma, Tailwind, Material Design automatically
- **Performance**: Self-optimizing components that never slow down
- **Migration**: Move from React to Vue to Angular without changing components
- **Micro-frontends**: Multiple versions coexist without conflicts
- **Future-proof**: Built on web standards, not framework trends

## 🚀 Quick Start (30 Seconds!)

### Option 1: Zero-Config CDN (Instant!)
```html
<!-- Just add and use - no build required -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge"></script>

<!-- Your AI-ready component with performance monitoring! -->
<forge-button 
  variant="primary" 
  ai-context="submit-form"
  max-render-ms="2">
  Click Me
</forge-button>
```

### Option 2: NPM Installation
```bash
npm install @nexcraft/forge
```

#### Works with EVERY Framework (Same Code!)
```javascript
// Import once, use everywhere
import '@nexcraft/forge';

// React Example
function App() {
  const button = useRef();
  
  useEffect(() => {
    // Access AI features!
    console.log(button.current.explainState());
  }, []);
  
  return <forge-button ref={button} onClick={handleClick}>Click</forge-button>
}

// Vue Example (with dedicated package)
npm install @nexcraft/forge-vue
<template>
  <forge-button @click="handleClick" :ai-context="context">Click</forge-button>
</template>

// Angular Example (with dedicated package)
npm install @nexcraft/forge-angular
// In Angular templates
<forge-button forgeComponent (click)="handleClick()" [aiContext]="context">Click</forge-button>

// Vanilla JS - Full Power!
const btn = document.querySelector('forge-button');
console.log(btn.getPossibleActions()); // AI-ready!
```

### Development Setup
```bash
# Clone and setup
git clone https://github.com/nexcraft/forge.git
cd forge
npm install

# Start development
npm run dev        # Component development
npm run storybook  # Interactive documentation
npm run test       # Run tests
```

## 📦 Framework Packages

### Core Package  
- **`@nexcraft/forge`** - Pure web components (truly framework-agnostic)

### Optional Framework Extensions
- **`@nexcraft/forge-react`** - React wrappers, hooks & SSR support
- **`@nexcraft/forge-vue`** - Vue composables, directives & plugin
- **`@nexcraft/forge-angular`** - Angular directives, services & reactive forms
- **`@nexcraft/forge-rhf`** - React Hook Form adapters

```bash
# Install what you need
npm install @nexcraft/forge                    # Pure web components
npm install @nexcraft/forge-react             # + React integration
npm install @nexcraft/forge-vue               # + Vue composables & plugin
npm install @nexcraft/forge-angular           # + Angular integration  
npm install @nexcraft/forge-rhf               # + React Hook Form
```

📖 **[View Integration Guides →](./docs/integrations/)** — React: [docs/integrations/react.md](./docs/integrations/react.md) • Angular: [docs/integrations/angular.md](./docs/integrations/angular.md) • Vue: [docs/integrations/vue.md](./docs/integrations/vue.md)

## 📋 Component Index

Quick reference to all 26 components with HTML tag names:

### Organisms (6 components)
`<forge-tabs>` • `<forge-pagination>` • `<forge-navigation-bar>` • `<forge-data-table>` • `<forge-accordion>` • `<forge-tree-view>`

### Molecules (8 components) 
`<forge-tooltip>` • `<forge-date-picker>` • `<forge-dropdown>` • `<forge-form-field>` • `<forge-modal>` • `<forge-multi-select>` • `<forge-card>` • `<forge-toast>`

### Atoms (12 components)
`<forge-button>` • `<forge-input>` • `<forge-icon>` • `<forge-alert>` • `<forge-checkbox>` • `<forge-badge>` • `<forge-switch>` • `<forge-radio-group>` • `<forge-select>` • `<forge-progress>` • `<forge-skeleton>` • `<forge-aspect-ratio>`

**Plus supporting components**: `<forge-progress-circle>` • `<forge-toast-container>` • `<forge-performance-dashboard>`

💡 **Can't find what you're looking for?** Try searching for keywords like "progress", "toast", "skeleton" in the [Component Showcase](#-components-showcase) section below.

## 📚 Documentation

### Getting Started
- **[Quick Start Guide](./docs/GETTING_STARTED.md)** - Get your first component running in 4 hours
- **[Component Architecture](./plans/adrs/ADR-015-atomic-composition-pattern.md)** - Atomic design patterns & composition
- **[Component API Design](./plans/adrs/ADR-008-component-api-design.md)** - API standards & conventions

### Core Features
- **[🤖 AI Metadata Reference](./docs/ai/metadata-reference.md)** - Complete AI metadata system guide (architecture, API, implementation)
- **[🤖 AI Integration Guide](./docs/ai/integration-guide.md)** - ChatGPT, Claude, Copilot examples & common patterns
- **[🤖 AI-Native Development](./docs/guides/ai-native-development.md)** - Building with AI coding assistants
- **[🎨 Theming Overview](./docs/guides/theming-overview.md)** - Core theming concepts and strategies
- **[🎨 Token Bridge Reference](./docs/theming/token-bridge.md)** - Complete guide and API for design token conversion
- **[🔄 Token Migration Guide](./docs/theming/token-migration-guide.md)** - Migrate from existing token systems
- **[⚡ Performance Dashboard Guide](./docs/guides/performance-dashboard-guide.md)** - Real-time performance monitoring
- **[⚡ Performance Monitoring](./docs/performance-monitoring.md)** - Advanced performance monitoring system
- **[Figma → Forge Tokens](./docs/guides/figma-to-forge.md)** - Pull tokens from Figma via CLI/MCP (no plugin required)

### Architecture & Planning
- **[Implementation Roadmap](./plans/implementation-roadmap.md)** - Complete development timeline with all differentiators
- **[🚀 Phase 9: AI-Native Development](./plans/phases/phase-9-ai-native-development.md)** - Strategic pivot to AI-first component library
- **[Architecture Decision Records](./plans/adrs/)** - 18 key technical decisions including AI-native components
- **[Build Tooling Strategy](./plans/adrs/ADR-005-build-tooling.md)** - Vite, Lit, TypeScript stack decisions

## ✨ The "Shiny" Stuff - What Makes Us Special

### 🤖 **AI-Native Components** (Industry First!)
The FIRST component library built for AI agents - every component can communicate with AI systems out of the box:
```javascript
const button = document.querySelector('forge-button');

// Ask component to explain itself
console.log(button.explainState());
// "Button is enabled and primary variant. Not loading. Ready for click interaction."

// Get possible actions for AI agents
console.log(button.getPossibleActions());
// [{ name: 'click', description: 'Trigger button action', available: true }]

// Access real-time state for AI context
console.log(button.aiState);
// { variant: 'primary', disabled: false, loading: false, renderTime: 0.8ms }
```

### 🎨 **Design Token Bridge** (Industry First!)
Import design tokens from ANY design system with zero configuration:
```javascript
import { TokenBridge } from '@nexcraft/forge/utils';

// Import from Figma, Tailwind, Material Design, or any design system
const bridge = TokenBridge.fromFigma(figmaTokens);
const css = bridge.toCSSProperties();

// Automatic CSS generation - always in sync with your design system!
// :root { --forge-brand-primary-500: #3b82f6; }
```

### ⚡ **Performance Dashboard** (Unique Feature!)
Real-time performance monitoring with visual dashboard:
```html
<!-- Instant performance dashboard - no setup required -->
<forge-performance-dashboard auto-refresh="true" show-violations="true">
</forge-performance-dashboard>

<!-- Components auto-monitor their performance -->
<forge-tooltip max-render-ms="2" performance-mode="auto">
  Self-optimizing tooltip with real-time metrics!
</forge-tooltip>
```

```javascript
// Programmatic access to performance data
import { performanceDashboard } from '@nexcraft/forge/utils';

const metrics = performanceDashboard.getAllMetrics();
const slowComponents = performanceDashboard.getSlowComponents(16);
// Real-time performance insights for every component!
```

### 🎯 **Core Differentiators**
| Feature | Description | Benefits |
|---------|-------------|-----------|
| **🤖 AI-Native Metadata** | First library built for AI agents | Components communicate with Cursor, Copilot, Claude automatically |
| **🧠 AI Code Generation** | Context-aware component suggestions | Faster development with AI-powered assistance |
| **🎨 Design Token Bridge** | Import from any design system | Zero-config integration with Figma, Tailwind, Material Design |
| **⚡ Performance Dashboard** | Real-time visual monitoring + auto-degradation | Self-optimizing components with performance insights |
| **🌐 Framework Independence** | True Web Components | Use with React, Vue, Angular, or vanilla JS |
| **🛡️ Style Isolation** | Shadow DOM guaranteed | Complete style encapsulation, zero CSS conflicts |
| **📦 Optimized Bundle** | <10KB per component | Lightweight, tree-shakeable, production-ready |
| **🔮 Future Proof** | Built on web standards | Will work in browsers for decades to come |

### 🚀 **Zero-Config Magic**
```html
<!-- Works instantly - no build, no config, no dependencies -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge"></script>
<forge-button variant="primary" ai-context="submit-form">
  Click Me
</forge-button>
```

## 🏗️ Architecture

### Core Technologies
- **[Lit 3.2.0](https://lit.dev/)** - Web Components framework
- **[TypeScript 5.3.3](https://www.typescriptlang.org/)** - Type safety
- **[Vite 5.0.10](https://vitejs.dev/)** - Build tool and dev server
- **[Storybook 7.x](https://storybook.js.org/)** - Component development environment

### Key Principles
1. **Web Standards First** - Built on Custom Elements, Shadow DOM, and CSS Custom Properties
2. **True Encapsulation** - Shadow DOM ensures style isolation
3. **Properties Down, Events Up** - Unidirectional data flow
4. **Composition Over Configuration** - Small, focused, composable components

## 📦 Components Showcase

### 🏛️ **Organism Components** (Phase 3 - Production Ready!)
Complex, full-featured components built from atoms and molecules:

| Component | AI Features | Performance Features | Unique Capabilities | Documentation |
|-----------|-------------|---------------------|-------------------|---------------|
| **📁 Tabs** | Tab prediction | Lazy panel loading | Drag-to-reorder, closeable tabs, keyboard nav | [📚 Docs](./docs/components/organisms/tabs.md) |
| **🔢 Pagination** | Page suggestion | Optimized renders | Multiple modes, customizable sizes | [📚 Docs](./docs/components/organisms/pagination.md) |
| **🦭 Navigation Bar** | Smart menus | Responsive modes | Mobile drawer, user actions, search | [📚 Docs](./docs/components/organisms/navigation-bar.md) |
| **📊 Data Table** | Sort prediction | Virtual scrolling | Multi-sort, selection, expandable rows | [📚 Docs](./docs/components/organisms/data-table.md) |
| **🏗️ Data Grid** | Cell editing AI | Advanced virtual scrolling | Inline editing, export, multi-column sort, filtering | [📚 Docs](./docs/components/organisms/data-grid.md) |
| **🎵 Accordion** | Panel management | Lazy content | Multi-expand, animations, icons | [📚 Docs](./docs/components/organisms/accordion.md) |
| **🌳 Tree View** | Node navigation | Lazy loading | Drag-drop, checkboxes, search | [📚 Docs](./docs/components/organisms/tree-view.md) |

### 🌟 **Molecule Components** (Advanced & Feature-Rich)
Advanced components that combine atoms:

| Component | AI Features | Performance Features | Unique Capabilities | Documentation |
|-----------|-------------|---------------------|-------------------|---------------|
| **🎯 Tooltip** | Self-positioning AI | <1ms render | Smart viewport detection, auto-repositioning | [📚 Docs](./docs/components/molecules/tooltip.md) |
| **📅 DatePicker** | Date prediction | Lazy calendar | i18n support, range selection, constraints | [📚 Docs](./docs/components/molecules/date-picker.md) |
| **🔽 Dropdown** | Action suggestions | Virtual scrolling | Nested menus, keyboard nav, groups | [📚 Docs](./docs/components/molecules/dropdown.md) |
| **📝 FormField** | Validation AI | Input optimization | Floating labels, inline variants | [📚 Docs](./docs/components/molecules/form-field.md) |
| **🎭 Modal** | Focus management | Stacking optimization | Focus trap, backdrop blur, size variants | [📚 Docs](./docs/components/molecules/modal.md) |
| **🗂️ MultiSelect** | Smart filtering | Bulk operations | Tag display, search highlighting | [📚 Docs](./docs/components/molecules/multi-select.md) |
| **🃏 Card** | Content analysis | Elevation shadows | 6 levels, media support, skeleton states | [📚 Docs](./docs/components/molecules/card.md) |
| **🆕 🔔 Toast** | State analysis | Queue management | Auto-dismiss, progress bars, global helpers | [📚 Docs](./docs/components/molecules/toast.md) |

### ⚙️ **Atomic Components** (Foundation + Essential)
Foundation components with comprehensive test coverage:

| Component | Test Coverage | Key Features | Documentation |
|-----------|--------------|--------------|---------------|
| **Button** | 92.38% | 5 variants, ripple effect, loading states | [📚 Docs](./docs/components/button.md) |
| **Input** | 84.56% | 7 types, validation, clearable | [📚 Docs](./docs/components/input.md) |
| **Icon** | 78.38% | Registry system, lazy loading | [📚 Docs](./docs/components/icon.md) |
| **Alert** | 97.02% | Auto-dismiss, animations | [📚 Docs](./docs/components/alert.md) |
| **Checkbox** | 98.50% | Indeterminate state | [📚 Docs](./docs/components/checkbox.md) |
| **Badge** | 100% | Count/dot modes, positions | [📚 Docs](./docs/components/badge.md) |
| **Switch** | 98.50% | Loading state, custom labels | [📚 Docs](./docs/components/switch.md) |
| **RadioGroup** | 93.79% | Group management, keyboard nav | [📚 Docs](./docs/components/radio-group.md) |
| **Select** | 84.69% | Search/filter, groups | [📚 Docs](./docs/components/select.md) |
| **🆕 Progress** | 100% | Linear & circular variants, indeterminate states | [📚 Docs](./docs/components/atoms/progress.md) |
| **🆕 Skeleton** | 100% | Shimmer animations, shape variants, accessibility | [📚 Docs](./docs/components/atoms/skeleton.md) |
| **🆕 AspectRatio** | 100% | Responsive containers, preset ratios, constraints | [📚 Docs](./docs/components/atoms/aspect-ratio.md) |

### 📊 **Component Stats**
- **Total Components**: 27 production-ready (12 atoms + 8 molecules + 7 organisms)
- **Overall Test Coverage**: 87.2% 
- **Total Tests**: 1140+ passing (99% pass rate)
- **Performance**: All components <2ms render
- **Accessibility**: 100% WCAG 2.1 AA compliant
- **AI Coverage**: 100% metadata implementation
- **ADR Compliance**: 100% compliant with all 16 ADRs
- **🎯 Phase 7 Complete**: Essential modern UI components for any application!

### Roadmap
See our **[Implementation Roadmap](./plans/implementation-roadmap.md)** for the complete component timeline.

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Visual regression
npm run test:visual

# All tests
npm run test:all
```

Our comprehensive testing strategy includes:
- ✅ Unit tests (90%+ coverage)
- ✅ Visual regression (Chromatic)
- ✅ Cross-framework E2E tests
- ✅ Accessibility audits
- ✅ Performance benchmarks

## 🤝 Contributing

We welcome contributions! Please see our **[Contributing Guide](./docs/CONTRIBUTING.md)** for details.

### Quick Commands
```bash
# Generate a new component
npm run generate:component MyComponent atoms

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run all tests
npm run test:all
```

## 📊 Performance & Quality Metrics

### 🏆 **Phase 8 Started - Enterprise Data Grid Delivered!**
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **ForgeDataGrid Implementation** | Full-featured | **✅ Complete** | 🎉 **NEW!** |
| **Virtual Scrolling Architecture** | 10,000+ rows | **✅ Implemented** | 🚀 **ACHIEVED** |
| **Advanced Data Management** | Editing, Export, Filtering | **✅ Complete** | 💪 **DELIVERED** |
| **AI Metadata Coverage** | 100% | **100%** | ✅ MAINTAINED |
| **Performance Monitoring** | Built-in | **Fully Implemented** | ✅ MAINTAINED |
| **Total Tests** | 1000+ | **1140+ passing** | 🆙 **IMPROVED** |
| **Component Count** | 26 → 27 | **27 components** | 📈 **EXPANDED** |

### 🏆 **Phase 7 Complete - Essential Components Foundation!**
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Atom Components** | 12 essential | **12/12** | ✅ COMPLETED |
| **Molecule Components** | 8 advanced | **8/8** | ✅ COMPLETED |
| **Organism Components** | 6 planned | **7/7** | 🆙 **EXCEEDED** |
| **Test Coverage** | >85% | **87.2%** | ✅ ACHIEVED |
| **Bundle Size (per component)** | <10KB | **<10KB** | ✅ ACHIEVED |
| **Component Render** | <2ms | **<1ms** | ✅ EXCEEDED |
| **Accessibility** | WCAG 2.1 AA | **100% Compliant** | ✅ ACHIEVED |
| **ADR Compliance** | Full | **100% Compliant** | ✅ ACHIEVED |

### 🚀 **Why This Matters**
- **🏗️ Enterprise Data Grid**: ForgeDataGrid handles 10,000+ rows with virtual scrolling
- **⚡ Advanced Features**: Inline editing, multi-column sorting, export, filtering
- **87.2% Test Coverage**: Your components won't break in production  
- **<1ms Render Time**: Faster than the human eye can perceive
- **100% AI Coverage**: Every component can talk to ChatGPT, Claude, Copilot
- **1140+ Tests**: More comprehensive testing than enterprise libraries
- **27 Production Components**: 12 atoms, 8 molecules, 7 organisms - enterprise-ready toolkit
- **🏆 Phase 8 Started**: Advanced data management components for complex applications

## 📄 License

MIT © Nexcraft Team

## 🔗 Links

- **[NPM Package](https://www.npmjs.com/package/@nexcraft/forge)** - Published package
- **[GitHub](https://github.com/nexcraft/forge)** - Source code  
- **[Storybook](https://nexcraft.github.io/forge)** - Live component playground (Coming Soon)
- **[Documentation](./plans/)** - Complete planning documentation

## 💡 Philosophy & Vision

> **"Write Once, Use Forever"**
> 
> In 2034, React might be legacy, Vue could be vintage, and Angular may be ancient. 
> But your @nexcraft/forge components? They'll still be running perfectly.

### 🎭 **The Problem We Solve**
Every 3-5 years, teams rewrite their UI components for the latest framework. It's a **$100B industry problem**.

### 🛡️ **Our Solution**
Build on **web standards** that browsers will support forever. Add **AI intelligence** and **performance monitoring** that no other library offers.

### 📈 **The Business Case**
```javascript
// Traditional Approach (2019-2034)
Year 2019: Build components in React 16      // Cost: $500K
Year 2022: Migrate to React 18                // Cost: $200K  
Year 2025: Rewrite for React Server Components // Cost: $400K
Year 2028: Migrate to NewFramework.js         // Cost: $500K
Year 2031: Rewrite again...                   // Cost: $500K
// Total: $2.1M + maintenance

// @nexcraft/forge Approach
Year 2024: Build components once              // Cost: $500K
Year 2034: Still working perfectly            // Cost: $0
// Total: $500K + minimal maintenance

// ROI: 320% cost savings + no technical debt
```

### 🚀 **Join the Revolution**
Stop rewriting. Start building components that outlive frameworks.

<!-- COMPONENT SEARCH KEYWORDS:
forge-progress linear circular progress-bar loading indicator spinner
forge-toast notification alert snackbar message popup banner
forge-skeleton loading placeholder shimmer ghost content-loader
forge-aspect-ratio responsive container layout ratio media embed
forge-toast-container global notification manager queue system
forge-progress-circle circular radial progress donut spinner
web-components lit typescript shadow-dom css-custom-properties
ai-ready ai-metadata performance-monitoring design-tokens
react vue angular vanilla javascript framework-agnostic
accessibility wcag aria keyboard-navigation screen-reader
-->
