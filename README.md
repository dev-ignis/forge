# Forge UI Component Library

A production-ready, framework-agnostic UI component library built with Web Components and Lit, designed to work seamlessly across React, Vue, Angular, and vanilla JavaScript applications.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Run Storybook
npm run storybook

# Run tests
npm run test
```

**Want to start coding immediately?** → See our **[Quick Start Guide](./plans/quick-start-guide.md)**

## 📚 Documentation

### For Developers
- **[Quick Start Guide](./plans/quick-start-guide.md)** - Get your first component running in 4 hours
- **[Component Architecture](./plans/architecture/component-architecture.md)** - Learn our patterns and conventions
- **[Development Workflow](./plans/process/development-workflow.md)** - Git flow, tooling, and processes
- **[API Documentation](./docs/api/)** - Component API reference (coming soon)

### Planning & Architecture
- **[Implementation Roadmap](./plans/implementation-roadmap.md)** - 6-month development timeline
- **[Architecture Decision Records](./plans/adrs/)** - Key technical decisions
- **[Technology Stack](./plans/architecture/technology-stack.md)** - Core technology choices

## 🎯 Project Goals

### Technical Excellence
- **Framework Agnostic**: Works with React, Vue, Angular, and vanilla JS
- **Performance First**: <1ms component render, <50KB core bundle
- **Accessibility**: WCAG 2.1 AA compliant out of the box
- **Developer Experience**: Modern tooling, TypeScript, hot reload

### Business Value
- **Single Source of Truth**: One component library for all projects
- **Reduced Development Time**: Reusable, tested components
- **Consistent UX**: Unified design system across applications
- **Future Proof**: Built on web standards, not framework trends

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

## 📦 Components

### Available (Phase 0)
- 🔘 **Button** - Full-featured button with variants, sizes, and states

### Coming Soon (Phase 1)
- 📝 Input - Text input with validation
- ✅ Checkbox - Accessible checkbox
- 🔘 Radio - Radio button groups
- 🏷️ Badge - Status indicators
- 🎨 Icon - SVG icon system
- 🔀 Switch - Toggle switches

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

### Development Setup

1. Clone the repository
```bash
git clone https://github.com/your-org/forge.git
cd forge
```

2. Install dependencies
```bash
npm install
```

3. Start development
```bash
npm run dev        # Component development
npm run storybook  # Interactive documentation
```

4. Create a new component
```bash
npm run generate:component MyComponent atoms
```

## 📊 Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Bundle Size (core) | <10KB | **7.8KB** ✅ |
| Bundle Size (full) | <50KB | **31.16KB** ✅ |
| Component Render | <1ms | **<1ms** ✅ |
| Test Coverage | >90% | **90.69%** ✅ |
| Lighthouse Score | >95 | *Pending* |
| Accessibility | 100% WCAG 2.1 AA | *In Progress* |

## 📄 License

MIT © [Your Organization]

## 🔗 Links

- **[Storybook](https://forge.ignis.dev)** - Live component playground (Coming Soon)
- **[NPM Package](https://www.npmjs.com/package/forge-ui)** - Published package
- **[GitHub](https://github.com/yourusername/ignis)** - Source code
- **[Documentation](./plans/)** - Complete planning documentation

## 💡 Philosophy

> "Build once, use everywhere. True framework agnosticism through web standards."

This library represents a strategic investment in creating a unified, maintainable, and future-proof UI component system that transcends individual framework lifecycles.

---

**Ready to start?** → **[Quick Start Guide](./plans/quick-start-guide.md)** 🚀