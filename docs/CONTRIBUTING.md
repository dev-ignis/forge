# Contributing to Forge UI Component Library

Thank you for your interest in contributing to Forge UI! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Creating Components](#creating-components)
- [Testing Requirements](#testing-requirements)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and considerate in all interactions.

## Getting Started

### Prerequisites
- Node.js 18+ (20+ recommended) and npm 9+
- Git
- Basic knowledge of Web Components and Lit
- Familiarity with TypeScript

### Setup

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/forge.git
cd forge
```

3. Install dependencies:
```bash
npm install
```

4. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

5. Start development:
```bash
npm run dev        # Component development
npm run storybook  # Interactive documentation
```

## Development Process

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `chore/*` - Maintenance tasks

### Workflow
1. Create a feature branch from `develop`
2. Make your changes
3. Write/update tests
4. Update documentation
5. Submit a pull request to `develop`

## Creating Components

### Using the Generator
```bash
npm run generate:component MyComponent atoms
```

This creates:
- `src/components/atoms/my-component/my-component.ts`
- `src/components/atoms/my-component/my-component.test.ts`
- `src/components/atoms/my-component/my-component.stories.ts`
- `src/components/atoms/my-component/index.ts`

### Component Requirements

#### 1. Extend BaseElement
```typescript
import { BaseElement } from '../../../core/BaseElement';

@customElement('forge-my-component')
export class ForgeMyComponent extends BaseElement {
  // Component implementation
}
```

#### 2. Follow Naming Conventions
- Custom element: `forge-component-name`
- Class name: `ForgeComponentName`
- File name: `component-name.ts`
- Events: `forge-component-name-event`

#### 3. Implement Required Features
- ✅ Keyboard navigation
- ✅ ARIA attributes
- ✅ Focus management
- ✅ Screen reader announcements

#### 4. Use Design Tokens
```css
:host {
  color: var(--forge-color-text);
  font-size: var(--forge-font-size-base);
}
```

## Testing Requirements

### Coverage Minimums
- Statements: 70%
- Branches: 70%
- Functions: 70%
- Lines: 70%

### Test Types Required

#### Unit Tests
```typescript
describe('ForgeMyComponent', () => {
  it('renders with default properties', async () => {
    const el = await fixture<ForgeMyComponent>(html`
      <forge-my-component></forge-my-component>
    `);
    expect(el).to.exist;
  });
  
  // Test all props, events, and methods
});
```

#### Accessibility Tests
```typescript
it('is accessible', async () => {
  const el = await fixture<ForgeMyComponent>(html`
    <forge-my-component></forge-my-component>
  `);
  await expect(el).to.be.accessible();
});
```

#### Visual Tests (Storybook)
Create stories for all states and variants:
```typescript
export const Default: Story = { /* ... */ };
export const Disabled: Story = { /* ... */ };
export const Loading: Story = { /* ... */ };
```

### Running Tests
```bash
npm run test               # Unit tests (vitest)
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

## Submitting Changes

### Pre-submission Checklist
- [ ] Tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation updated
- [ ] Storybook stories created/updated
- [ ] Accessibility audit passes
- [ ] Bundle size checked
 - [ ] AI artifacts valid (`npm run validate:ai`)

### Commit Messages
Follow conventional commits:
```
type(scope): description

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code style
- refactor: Refactoring
- test: Tests
- chore: Maintenance

Examples:
feat(button): add loading state
fix(modal): correct focus trap
docs(readme): update installation
```

### Pull Request Process

1. **Title**: Use conventional commit format
2. **Description**: Explain what and why
3. **Testing**: Describe testing done
4. **Screenshots**: Include for UI changes
5. **Breaking Changes**: Clearly marked

#### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Testing
- [ ] Unit tests pass
- [ ] Visual tests pass
- [ ] E2E tests pass
- [ ] Accessibility audit passes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Storybook stories updated
```

## Style Guidelines

### TypeScript
- Use TypeScript strict mode
- Provide explicit types (no `any`)
- Document public APIs with JSDoc
- Use interfaces over type aliases

### CSS
- Use Shadow DOM for encapsulation
- Use CSS Custom Properties for theming
- Follow BEM-like naming in Shadow DOM
- Mobile-first responsive design

### General
- Keep components focused (single responsibility)
- Prefer composition over configuration

## AI-Native Requirements (Important)

All components in Forge are AI‑ready. When adding or modifying components:

- Implement AI methods in the component class (inherited from `BaseElement`):
  - `getPossibleActions()`
  - `explainState()`
  - Ensure `aiState` reflects meaningful state/attributes
- Annotate slots with JSDoc `@slot` for CEM extraction (used by the AI manifest)
- Provide semantic and a11y context where applicable:
  - `semantic-role`, `ai-context`, ARIA labels and descriptions
- Keep prop and event typings accurate (TypeScript) to drive correct manifest output
- Run `npm run build:local` locally when feasible to ensure AI artifacts generate and validate

### AI Artifact Debugging (Quick Tip)

If AI artifacts look empty or tools can’t find metadata:

- Generate and validate locally:
  - `npm run build:local` (runs CEM + AI generators)
  - `npm run validate:ai` (basic checks)
- Inspect outputs:
  - Repo root: `ai-manifest.json` (should list all components)
  - Dist: `dist/ai-manifest.json` (bundled types alongside)
  - Published package (node_modules/@nexcraft/forge): `ai-manifest.json`, `ai-index.json`, `ai-tools/*`
- Sanity checks:
  - `components.length` should be > 0 (expect ~30)
  - `custom-elements.json` should be present in the package
  - Exports resolve: `require.resolve('@nexcraft/forge/ai-manifest.json')`
- See also:
  - Docs: `docs/ai-manifest.md`, `docs/ai/metadata-reference.md`, `docs/ai/integration-guide.md`

## Pre-commit Hooks

We use Husky to run staged‑aware checks. The hook will skip expensive steps when non‑code files change, and will:
- Lint staged files (via lint‑staged)
- Type‑check on TS/config changes
- Run tests on source/test changes
- Build (core) only on build‑critical changes

You generally don’t need to run these manually; CI will re‑verify everything.
- Make components controlled when possible
- Emit CustomEvents for all state changes

## Questions?

- Check existing issues and discussions
- Join our Discord/Slack community
- Contact the maintainers

## Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Annual contributor spotlight

Thank you for helping make Forge UI better! 🎉
