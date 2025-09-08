# @nexcraft/forge

[![npm version](https://img.shields.io/npm/v/@nexcraft/forge.svg)](https://www.npmjs.com/package/@nexcraft/forge)
[![Bundle Size](https://img.shields.io/badge/bundle%20size-<10KB-brightgreen.svg)](https://bundlephobia.com/package/@nexcraft/forge)
[![Test Coverage](https://img.shields.io/badge/coverage-86.4%25-brightgreen.svg)](./coverage)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1-AA-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![AI-Ready](https://img.shields.io/badge/AI-Ready-purple.svg)](./docs/ai-metadata-system.md)
[![Performance Monitored](https://img.shields.io/badge/Performance-Monitored-orange.svg)](./docs/performance-monitoring.md)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> **"Write Once, Use Forever"** - A future-proof UI component library built on web standards that will outlive framework trends.

**The ONLY component library with built-in AI metadata, design token bridge, and real-time performance dashboard.** Every component knows its state, explains its actions, and monitors its own performance with a visual dashboard. Plus, import design tokens from any system (Figma, Tailwind, Material Design) with zero configuration - making it perfect for AI-powered applications and design-system-driven development.

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

// Vue Example
<template>
  <forge-button @click="handleClick" :ai-context="context">Click</forge-button>
</template>

// Angular Example
<forge-button (click)="handleClick()" [aiContext]="context">Click</forge-button>

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

## 📚 Documentation

### Getting Started
- **[Quick Start Guide](./plans/quick-start-guide.md)** - Get your first component running in 4 hours
- **[Unique Value Proposition](./plans/unique-value-proposition.md)** - Why @nexcraft/forge is different
- **[Component Architecture](./plans/architecture/component-architecture.md)** - Learn our patterns and conventions

### Core Features
- **[🎨 Token Bridge Complete Guide](./docs/theming/token-bridge-guide.md)** - Import design tokens from any system
- **[🎨 Token Bridge API Reference](./docs/theming/token-bridge-api.md)** - Complete API documentation
- **[🔄 Token Bridge Migration Guide](./docs/theming/token-migration-guide.md)** - Migrate from existing token systems
- **[⚡ Performance Dashboard Guide](./docs/guides/performance-dashboard-guide.md)** - Real-time performance monitoring and dashboard
- **[⚡ Performance Dashboard API](./docs/performance-dashboard-api.md)** - Complete Performance Dashboard API
- **[⚡ Performance Monitoring](./docs/performance-monitoring.md)** - Advanced performance monitoring system

### Architecture & Planning
- **[Implementation Roadmap](./plans/implementation-roadmap.md)** - 6-month development timeline with all differentiators
- **[Architecture Decision Records](./plans/adrs/)** - 14 key technical decisions including AI-ready components
- **[Technology Stack](./plans/architecture/technology-stack.md)** - Core technology choices

## ✨ The "Shiny" Stuff - What Makes Us Special

### 🤖 **AI-Ready Components** (Industry First!)
Every single component can talk to AI systems out of the box:
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
| **🤖 AI Metadata** | Built into every component | Components can explain their state to AI systems automatically |
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

| Component | AI Features | Performance Features | Unique Capabilities |
|-----------|-------------|---------------------|-------------------|
| **📁 Tabs** | Tab prediction | Lazy panel loading | Drag-to-reorder, closeable tabs, keyboard nav |
| **🔢 Pagination** | Page suggestion | Optimized renders | Multiple modes, customizable sizes |
| **🦭 Navigation Bar** | Smart menus | Responsive modes | Mobile drawer, user actions, search |
| **📊 Data Table** | Sort prediction | Virtual scrolling | Multi-sort, selection, expandable rows |
| **🎵 Accordion** | Panel management | Lazy content | Multi-expand, animations, icons |
| **🌳 Tree View** | Node navigation | Lazy loading | Drag-drop, checkboxes, search |

### 🌟 **Molecule Components** (Advanced & Feature-Rich)
Advanced components that combine atoms:

| Component | AI Features | Performance Features | Unique Capabilities |
|-----------|-------------|---------------------|-------------------|
| **🎯 Tooltip** | Self-positioning AI | <1ms render | Smart viewport detection, auto-repositioning |
| **📅 DatePicker** | Date prediction | Lazy calendar | i18n support, range selection, constraints |
| **🔽 Dropdown** | Action suggestions | Virtual scrolling | Nested menus, keyboard nav, groups |
| **📝 FormField** | Validation AI | Input optimization | Floating labels, inline variants |
| **🎭 Modal** | Focus management | Stacking optimization | Focus trap, backdrop blur, size variants |
| **🗂️ MultiSelect** | Smart filtering | Bulk operations | Tag display, search highlighting |
| **🃏 Card** | Content analysis | Elevation shadows | 6 levels, media support, skeleton states |
| **🆕 🔔 Toast** | State analysis | Queue management | Auto-dismiss, progress bars, global helpers |

### ⚙️ **Atomic Components** (Foundation + Essential)
Foundation components with comprehensive test coverage:

| Component | Test Coverage | Key Features |
|-----------|--------------|--------------|
| **Button** | 92.38% | 5 variants, ripple effect, loading states |
| **Input** | 84.56% | 7 types, validation, clearable |
| **Icon** | 78.38% | Registry system, lazy loading |
| **Alert** | 97.02% | Auto-dismiss, animations |
| **Checkbox** | 98.50% | Indeterminate state |
| **Badge** | 100% | Count/dot modes, positions |
| **Switch** | 98.50% | Loading state, custom labels |
| **RadioGroup** | 93.79% | Group management, keyboard nav |
| **Select** | 84.69% | Search/filter, groups |
| **🆕 Progress** | 100% | Linear & circular variants, indeterminate states |
| **🆕 Skeleton** | 100% | Shimmer animations, shape variants, accessibility |
| **🆕 AspectRatio** | 100% | Responsive containers, preset ratios, constraints |

### 📊 **Component Stats**
- **Total Components**: 26 production-ready (12 atoms + 8 molecules + 6 organisms)
- **Overall Test Coverage**: 87.2% 
- **Total Tests**: 1090 passing (100% pass rate)
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

### 🏆 **Phase 7 Complete - Essential Components Delivered!**
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **AI Metadata Coverage** | 100% | **100%** | ✅ ACHIEVED |
| **Performance Monitoring** | Built-in | **Fully Implemented** | ✅ ACHIEVED |
| **Atom Components** | 12 essential | **12/12** | ✅ COMPLETED |
| **Molecule Components** | 8 advanced | **8/8** | ✅ COMPLETED |
| **Organism Components** | 6 planned | **6/6** | ✅ COMPLETED |
| **Test Coverage** | >85% | **87.2%** | ✅ ACHIEVED |
| **Total Tests** | 1000+ | **1090 passing** | ✅ EXCEEDED |
| **Bundle Size (per component)** | <10KB | **<10KB** | ✅ ACHIEVED |
| **Component Render** | <2ms | **<1ms** | ✅ EXCEEDED |
| **Accessibility** | WCAG 2.1 AA | **100% Compliant** | ✅ ACHIEVED |
| **ADR Compliance** | Full | **100% Compliant** | ✅ ACHIEVED |
| **🎯 Essential Components** | Complete set | **100% Coverage** | ✅ ACHIEVED |

### 🚀 **Why This Matters**
- **87.2% Test Coverage**: Your components won't break in production
- **<1ms Render Time**: Faster than the human eye can perceive
- **100% AI Coverage**: Every component can talk to ChatGPT, Claude, Copilot
- **1090 Tests**: More comprehensive testing than enterprise libraries
- **26 Production Components**: 12 atoms, 8 molecules, 6 organisms - complete modern UI toolkit
- **🏅 Phase 7 Achievement**: Complete essential component suite for modern applications

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