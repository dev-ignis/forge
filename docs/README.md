# Forge UI Documentation

Welcome to the Forge UI Component Library documentation. This directory contains all developer guides, API references, and supporting documentation.

## 📚 Documentation Structure

### Getting Started
- **[Quick Start Guide](../plans/quick-start-guide.md)** - Get running in 4 hours
- **[Installation Guide](./guides/installation.md)** - Package installation and setup
- **[First Component](./guides/first-component.md)** - Build your first component

### Developer Guides
- **[Component Development](./guides/component-development.md)** - Creating new components
- **[Testing Guide](./guides/testing.md)** - Writing and running tests
- **[Styling Guide](./guides/styling.md)** - CSS and theming patterns
- **[Accessibility Guide](./guides/accessibility.md)** - WCAG compliance

### AI‑Native
- **[AI Metadata System](./ai-metadata-system.md)** - System overview (ADR‑014)
- **[AI Methods](./ai-methods.md)** - getPossibleActions, explainState, aiState
- **[AI Manifest](./ai-manifest.md)** - Generated artifacts and validation
- **[AI Integration Examples](./ai-integration-examples.md)** - Using Forge with ChatGPT/Claude/Copilot
 - Quick tip: If AI artifacts look empty, see “AI Artifact Debugging” in [Contributing](./CONTRIBUTING.md#ai-artifact-debugging-quick-tip)

### API Reference
- **[Components](./api/components/)** - Component API documentation
- **[Utilities](./api/utilities/)** - Helper functions and utilities
- **[Types](./api/types/)** - TypeScript type definitions

### Framework Integration
- **[React Integration](./guides/react-integration.md)** - Using with React
- **[Vue Integration](./guides/vue-integration.md)** - Using with Vue
- **[Angular Integration](./guides/angular-integration.md)** - Using with Angular
- **[Vanilla JS](./guides/vanilla-js.md)** - Using without a framework

### Publishing & Release Management
- **[Release Process](./guides/release-process.md)** - Complete release workflow
- **[NPM Publishing](./guides/npm-publishing.md)** - Package publishing guide
- **[Beta Releases](./guides/beta-releases.md)** - Beta/alpha release process
- **[Git Workflow](./git-workflow.md)** - Branch strategy and synchronization

### Contributing
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute
- **[Code of Conduct](./CODE_OF_CONDUCT.md)** - Community guidelines
- **[Development Setup](./guides/development-setup.md)** - Local environment

### Architecture
- **[Planning Documents](../plans/)** - Detailed planning and architecture
- **[ADRs](../plans/adrs/)** - Architecture Decision Records
- **[Technology Stack](../plans/architecture/technology-stack.md)** - Core technologies

## 🧪 Examples

- **Next.js App**: `examples/nextjs-app` (SSR + RHF)  
  Commands: `npm run example:install:nextjs`, `npm run example:dev:nextjs`
- **Vue 3 App**: `examples/vue-app`  
  Commands: `npm run example:install:vue`, `npm run example:dev:vue`
- **Vanilla JS App**: `examples/vanilla-app`  
  Commands: `npm run example:install:vanilla`, `npm run example:dev:vanilla`

## 🔍 Quick Links

### For Component Users
1. Storybook (run `npm run storybook`) — interactive docs
2. Design Tokens: CSS Custom Properties theme system (`src/`)
3. AI Artifacts (in published package):
   - `@nexcraft/forge/ai-manifest.json`
   - `@nexcraft/forge/ai-index.json`
   - `@nexcraft/forge/ai-tools/*`

### For Contributors
1. [Setup Guide](./CONTRIBUTING.md#setup) - Get started
2. [Implementation Sessions](./implementation-sessions/) - Development history and decisions
3. [ADR Compliance](./IMPLEMENTATION_STATUS.md#adr-compliance-matrix) - Standards status

### For Architects
1. [Architecture Overview](../plans/architecture/component-architecture.md) - System design
2. [Decision Records](../plans/adrs/) - Key decisions
3. [Roadmap](../plans/implementation-roadmap.md) - Development timeline

## 📖 Documentation Standards

### Writing Style
- Clear and concise
- Code examples for every concept
- Progressive disclosure (basic → advanced)
- Accessibility-first examples

### Code Examples
All code examples should:
- Be runnable and tested
- Include TypeScript types
- Show best practices
- Include accessibility features

### Maintenance
- Documentation reviewed with each PR
- Automated link checking
- Version-specific documentation
- Regular user feedback incorporation

## 🚀 Getting Help

### Resources
- **GitHub Issues** - Bug reports and feature requests
- **Discussions** - Questions and ideas
- **Stack Overflow** - Tag: `forge-ui`
- **Discord/Slack** - Real-time chat

### Common Topics
- [Troubleshooting](./guides/troubleshooting.md)
- [FAQ](./FAQ.md)
- [Migration Guide](./guides/migration.md)
- [Performance Tips](./guides/performance.md)

## 📝 Documentation TODO

### High Priority
- [ ] Complete API reference for Button component
- [ ] React integration guide with examples
- [ ] Video tutorials for common tasks
- [ ] Troubleshooting guide

### Medium Priority
- [ ] Vue integration guide
- [ ] Angular integration guide
- [ ] Performance optimization guide
- [ ] Advanced theming guide

### Low Priority
- [ ] Internationalization guide
- [ ] Server-side rendering guide
- [ ] Testing best practices
- [ ] Design system principles

---

**Need something not covered here?** [Open an issue](https://github.com/your-org/forge/issues) or [contribute](./CONTRIBUTING.md)!
