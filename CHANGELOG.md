# Changelog

All notable changes to the Forge UI Component Library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup and planning documentation
- Comprehensive Architecture Decision Records (12 ADRs)
- Technology stack selection (Lit 3.2.0, TypeScript 5.3.3, Vite 5.0.10)
- BaseElement class with accessibility and focus management utilities
- Component generator script for rapid development
- Button component with full feature set
- Quick Start Guide with Day 1 implementation steps
- Testing strategy with Web Test Runner, Playwright, and Chromatic
- Development workflow documentation
- 6-month implementation roadmap

### Documentation Structure
- Created `/plans` directory with organized documentation:
  - `/plans/architecture/` - Technical specifications
  - `/plans/process/` - Development workflows
  - `/plans/adrs/` - Architecture Decision Records
  - `/plans/research/` - Background research
- Main project README with clear entry points
- Contributing guidelines
- Component architecture patterns

### Infrastructure
- Project structure following atomic design principles
- Build configuration for multiple module formats (ESM, UMD)
- TypeScript configuration with decorators support
- CSS Custom Properties design token system
- Shadow DOM encapsulation strategy
- Testing infrastructure setup

## [0.0.1] - Planning Phase

### Added
- Initial repository creation
- Core planning documents:
  - Comprehensive research analysis comparing Web Component approaches
  - Technology evaluation (Lit vs Stencil vs Pure Web Components)
  - Framework integration strategies
  - Testing methodology
  - Documentation strategy
  - Accessibility standards
  - Performance benchmarks

### Decided
- Framework-agnostic approach using Web Components
- Lit as the core abstraction layer
- Shadow DOM for style encapsulation
- CSS Custom Properties for theming
- Properties down, events up data flow
- Storybook as documentation platform
- Semantic versioning strategy

---

## Version History Guidelines

### Version Format
- **MAJOR.MINOR.PATCH**
  - MAJOR: Breaking API changes
  - MINOR: New features (backwards compatible)
  - PATCH: Bug fixes (backwards compatible)

### Change Categories
- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Vulnerability fixes

### Release Schedule
- **Patch releases**: As needed for bug fixes
- **Minor releases**: Monthly with new components
- **Major releases**: Annually or for breaking changes

## Upcoming Releases

### [0.1.0] - Foundation Release (Target: Week 2)
- [ ] Complete Phase 0 implementation
- [ ] BaseElement class production-ready
- [ ] Button component with full test coverage
- [ ] Development environment setup
- [ ] CI/CD pipeline configuration

### [0.2.0] - Atomic Components (Target: Week 6)
- [ ] Input component
- [ ] Checkbox component
- [ ] Radio component
- [ ] Badge component
- [ ] Icon component
- [ ] Switch component

### [0.3.0] - Molecule Components (Target: Week 10)
- [ ] FormField component
- [ ] Select component
- [ ] Card component
- [ ] Modal component
- [ ] Tooltip component

### [1.0.0] - Production Release (Target: Week 26)
- [ ] Complete component suite
- [ ] Framework integration packages
- [ ] Full documentation
- [ ] 100% test coverage
- [ ] Performance optimizations
- [ ] Accessibility compliance