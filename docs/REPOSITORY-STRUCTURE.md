# Repository Structure

This document describes the organization of the Forge UI Component Library repository.

## 📁 Directory Structure

```
forge/
├── README.md                    # Main project documentation
├── CHANGELOG.md                 # Version history and changes
├── LICENSE                      # MIT License
├── package.json                 # Project configuration
├── package-lock.json           # NPM lock file
├── yarn.lock                    # Yarn lock file
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
├── vitest.config.ts            # Vitest test configuration
├── eslint.config.js            # ESLint configuration
│
├── src/                        # Source code
│   ├── index.ts               # Main library entry point
│   ├── simple.test.ts         # Simple test file
│   ├── core/                  # Core utilities
│   │   └── BaseElement.ts    # Base class for all components
│   ├── components/            # Component library
│   │   └── atoms/            # Basic building blocks (9 components)
│   │       ├── alert/        # Alert component
│   │       ├── badge/        # Badge component
│   │       ├── button/       # Button component
│   │       ├── checkbox/     # Checkbox component
│   │       ├── icon/         # Icon component
│   │       ├── input/        # Input component
│   │       ├── radio-group/  # Radio group component
│   │       ├── select/       # Select component
│   │       └── switch/       # Switch component
│   ├── test/                 # Test utilities
│   │   ├── setup.ts         # Test setup
│   │   ├── test-helpers.ts  # Test helper functions
│   │   └── vitest-chai-fix.ts # Vitest-Chai compatibility
│   ├── tokens/               # Design tokens
│   │   ├── base.css         # CSS Custom Properties
│   │   └── index.css        # Token exports
│   └── types/               # TypeScript type definitions
│       ├── component-types.ts # Component type definitions
│       └── index.ts          # Type exports
│
├── docs/                      # User documentation
│   ├── README.md             # Documentation overview
│   ├── CONTRIBUTING.md       # Contribution guidelines
│   ├── REPOSITORY-STRUCTURE.md # This file
│   ├── TESTING.md            # Testing documentation
│   ├── api/                  # API documentation
│   └── guides/               # User guides
│
├── plans/                     # Planning and architecture
│   ├── README.md             # Planning overview
│   ├── quick-start-guide.md  # Day 1 implementation guide
│   ├── implementation-roadmap.md # Development timeline
│   ├── architecture/         # Technical specifications
│   │   ├── component-architecture.md
│   │   ├── technology-stack.md
│   │   └── testing-strategy.md
│   ├── process/              # Development processes
│   │   └── development-workflow.md
│   ├── adrs/                 # Architecture Decision Records
│   │   ├── ADR-001-web-components-abstraction.md
│   │   ├── ADR-002-shadow-dom-encapsulation.md
│   │   └── ... (12 ADRs total)
│   └── research/             # Background research
│       └── original-analysis.md
│
├── demo/                      # Demo files
├── scripts/                   # Build and utility scripts
│   └── generate-component.js # Component generator
│
├── coverage/                  # Test coverage reports (git-ignored)
├── storybook-static/         # Built Storybook (git-ignored)
│
├── .storybook/               # Storybook configuration
│   ├── main.ts              # Main configuration
│   └── preview.ts           # Preview configuration
│
├── .github/                  # GitHub configuration
│   ├── workflows/           # GitHub Actions
│   │   └── ci.yml          # CI/CD pipeline
│   └── ISSUE_TEMPLATE/      # Issue templates
│
├── .claude/                  # Claude AI configuration
│
└── dist/                     # Build output (git-ignored)
    ├── nexcraft-forge.es.js  # ES module build
    ├── nexcraft-forge.umd.js # UMD build
    └── types/               # TypeScript declarations
```

## 📋 Key Files

### Root Level
- **README.md** - Project overview and quick start
- **CHANGELOG.md** - Version history following Keep a Changelog
- **package.json** - Dependencies and scripts
- **tsconfig.json** - TypeScript configuration
- **vite.config.ts** - Build configuration

### Source Code (`/src`)
- **index.ts** - Main library exports
- **core/BaseElement.ts** - Base class with utilities
- **components/**/[name].ts** - Component implementations
- **tokens/base.css** - Design system tokens

### Documentation (`/docs`)
- **CONTRIBUTING.md** - How to contribute
- **README.md** - Documentation hub
- **guides/** - User and developer guides
- **api/** - API reference documentation

### Planning (`/plans`)
- **quick-start-guide.md** - Implementation guide with code
- **implementation-roadmap.md** - Development timeline
- **architecture/** - Technical specifications
- **adrs/** - Architecture decisions
- **research/** - Background analysis

## 🔧 Configuration Files

### Build Tools
- **vite.config.ts** - Development and production builds
- **vitest.config.ts** - Test runner configuration

### Code Quality
- **eslint.config.js** - ESLint linting rules
- **.gitignore** - Git ignore patterns
- **.npmignore** - NPM publish ignore patterns

### CI/CD
- **.github/workflows/ci.yml** - GitHub Actions pipeline
- **.chromatic.json** - Visual testing configuration
- **netlify.toml** - Deploy configuration (if using Netlify)

## 📝 File Naming Conventions

### Components
- Component file: `component-name.ts`
- Test file: `component-name.test.ts`
- Story file: `component-name.stories.ts`
- Index file: `index.ts`

### Documentation
- Guides: `guide-name.md` (kebab-case)
- ADRs: `ADR-XXX-decision-name.md`
- API docs: `ComponentName.md` (PascalCase)

### Scripts
- Build scripts: `build-*.js`
- Utility scripts: `*-generator.js`
- CI scripts: `ci-*.sh`

## 🚀 Getting Started

1. **New developers** → Start with `/plans/quick-start-guide.md`
2. **Contributors** → Read `/docs/CONTRIBUTING.md`
3. **Architects** → Review `/plans/adrs/`
4. **Users** → Check `/examples/` for integration

## 🔄 Workflow

### Component Development
1. Plan in `/plans/`
2. Implement in `/src/components/`
3. Test in `/tests/`
4. Document in `/docs/`
5. Example in `/examples/`

### Documentation Updates
1. API changes → Update `/docs/api/`
2. New patterns → Update `/plans/architecture/`
3. Process changes → Update `/plans/process/`
4. Decisions → Create new ADR in `/plans/adrs/`

## 📊 Repository Statistics

- **Total ADRs**: 12
- **Implemented Components**: 9 (all atoms)
- **Total Tests**: 314 (100% passing)
- **Test Coverage Target**: 90%
- **Component categories**: 1 implemented (atoms), 3 planned (molecules, organisms, templates)
- **Supported frameworks**: 4 planned (React, Vue, Angular, Vanilla)
- **Documentation sections**: 5 (guides, API, plans, ADRs, research)

---

**Last Updated**: 2024
**Maintained by**: Forge UI Team