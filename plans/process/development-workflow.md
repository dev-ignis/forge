# Development Workflow Plan

## Project Structure

```
forge/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── button/
│   │   │   │   ├── button.ts
│   │   │   │   ├── button.styles.ts
│   │   │   │   ├── button.stories.ts
│   │   │   │   ├── button.test.ts
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── core/
│   │   ├── BaseElement.ts
│   │   ├── mixins/
│   │   └── utils/
│   ├── tokens/
│   │   ├── colors.css
│   │   ├── spacing.css
│   │   ├── typography.css
│   │   └── index.css
│   ├── types/
│   └── index.ts
├── dist/
├── docs/
├── examples/
│   ├── react-app/
│   ├── vue-app/
│   ├── angular-app/
│   └── vanilla/
├── .storybook/
├── scripts/
└── tests/
    ├── e2e/
    └── integration/
```

## Development Setup

### Initial Setup Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Run tests
npm run test

# Build library
npm run build

# Lint and format
npm run lint
npm run format
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && npm run build:types",
    "build:types": "tsc --emitDeclarationOnly",
    "build:manifest": "custom-elements-manifest analyze",
    "preview": "vite preview",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test": "web-test-runner",
    "test:watch": "web-test-runner --watch",
    "test:e2e": "playwright test",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.{ts,css,html}",
    "analyze": "rollup-plugin-visualizer"
  }
}
```

## Git Workflow

### Branch Strategy
```
main (stable, release-ready)
├── develop (integration branch)
│   ├── feature/button-component
│   ├── feature/modal-dialog
│   ├── fix/accessibility-issue
│   └── chore/update-dependencies
```

### Commit Convention
```
type(scope): description

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code style changes
- refactor: Code refactoring
- test: Test additions/changes
- chore: Build/tooling changes

Examples:
feat(button): add loading state
fix(modal): correct focus trap behavior
docs(readme): update installation guide
```

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

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
- [ ] No console errors/warnings
```

## Storybook Configuration

### Main Configuration
```typescript
// .storybook/main.ts
export default {
  stories: ['../src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@storybook/addon-measure',
    '@storybook/addon-outline'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  }
};
```

### Story Structure
```typescript
// button.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';
import './button';

const meta: Meta = {
  title: 'Atoms/Button',
  component: 'my-button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg']
    }
  }
};

export default meta;

export const Default: StoryObj = {
  args: {
    variant: 'primary',
    size: 'md'
  }
};

export const AllVariants: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <my-button variant="primary">Primary</my-button>
      <my-button variant="secondary">Secondary</my-button>
      <my-button variant="danger">Danger</my-button>
    </div>
  `
};
```

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      
      # Bundle size check
      - name: Check bundle size
        run: npm run analyze
      
      # Visual regression testing
      - name: Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
      
      # Cross-framework testing
      - run: npm run test:e2e

  publish:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Code Quality Tools

### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:lit/recommended',
    'plugin:wc/recommended'
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    'lit/no-invalid-html': 'error',
    'wc/no-self-class': 'error'
  }
};
```

### Prettier Configuration
```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "semi": true,
  "tabWidth": 2
}
```

## Documentation Generation

### Custom Elements Manifest
```javascript
// custom-elements-manifest.config.js
export default {
  globs: ['src/components/**/*.ts'],
  exclude: ['**/*.stories.ts', '**/*.test.ts'],
  outdir: 'dist',
  dev: false,
  packagejson: true,
  plugins: [
    // Generate README for each component
    {
      name: 'generate-readme',
      packageLinkPhase({ customElementsManifest }) {
        // Auto-generate component docs
      }
    }
  ]
};
```

## Release Process

### Semantic Release Configuration
```json
{
  "release": {
    "branches": ["main"],
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      "@semantic-release/npm",
      "@semantic-release/github",
      "@semantic-release/git"
    ]
  }
}
```

### Version Management
1. All commits to main trigger analysis
2. Conventional commits determine version bump
3. Automatic CHANGELOG.md generation
4. NPM package publication
5. GitHub release creation
6. Git tag creation

## Developer Onboarding

### Quick Start Guide
```bash
# Clone repository
git clone https://github.com/org/forge.git
cd forge

# Install dependencies
npm install

# Start development
npm run dev        # Component development
npm run storybook  # Documentation/testing

# Create new component
npm run generate:component my-component
```

### Component Generator Script (Complete Implementation)
```javascript
// scripts/generate-component.js
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get component name from command line
const componentName = process.argv[2];
if (!componentName) {
  console.error('❌ Please provide a component name');
  console.log('Usage: npm run generate:component MyComponent');
  process.exit(1);
}

// Parse component name variants
const kebabCase = componentName
  .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  .toLowerCase();
const pascalCase = componentName.charAt(0).toUpperCase() + componentName.slice(1);
const camelCase = componentName.charAt(0).toLowerCase() + componentName.slice(1);

// Determine component type (atom, molecule, organism)
const componentType = process.argv[3] || 'atoms';
const componentDir = path.join('src', 'components', componentType, kebabCase);

// Create component directory
if (fs.existsSync(componentDir)) {
  console.error(`❌ Component ${componentName} already exists`);
  process.exit(1);
}
fs.mkdirSync(componentDir, { recursive: true });

// Component template
const componentTemplate = `import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseElement } from '../../../core/BaseElement';

/**
 * @element forge-${kebabCase}
 * @fires forge-${kebabCase}-change - Fired when the component value changes
 */
@customElement('forge-${kebabCase}')
export class Forge${pascalCase} extends BaseElement {
  static styles = css\`
    :host {
      display: block;
      /* Add component-specific CSS variables here */
    }
    
    .${kebabCase} {
      /* Component styles */
    }
  \`;

  @property({ type: String }) variant: 'default' | 'primary' | 'secondary' = 'default';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean }) disabled = false;
  
  @state() private _internalState = '';

  render() {
    return html\`
      <div class="${kebabCase}" part="${kebabCase}">
        <slot></slot>
      </div>
    \`;
  }

  private _handleChange() {
    this.emit('forge-${kebabCase}-change', {
      value: this._internalState
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-${kebabCase}': Forge${pascalCase};
  }
}
`;

// Test template
const testTemplate = `import { fixture, expect, html } from '@open-wc/testing';
import sinon from 'sinon';
import './${kebabCase}';
import type { Forge${pascalCase} } from './${kebabCase}';

describe('Forge${pascalCase}', () => {
  it('renders with default properties', async () => {
    const el = await fixture<Forge${pascalCase}>(html\`
      <forge-${kebabCase}>Content</forge-${kebabCase}>
    \`);

    expect(el.variant).to.equal('default');
    expect(el.size).to.equal('md');
    expect(el.disabled).to.be.false;
  });

  it('renders slot content', async () => {
    const el = await fixture<Forge${pascalCase}>(html\`
      <forge-${kebabCase}>Test Content</forge-${kebabCase}>
    \`);

    expect(el).to.have.text('Test Content');
  });

  it('emits change event', async () => {
    const el = await fixture<Forge${pascalCase}>(html\`
      <forge-${kebabCase}></forge-${kebabCase}>
    \`);
    const changeSpy = sinon.spy();
    el.addEventListener('forge-${kebabCase}-change', changeSpy);

    // Trigger change
    // Add test implementation

    expect(changeSpy).to.have.been.calledOnce;
  });

  it('respects disabled state', async () => {
    const el = await fixture<Forge${pascalCase}>(html\`
      <forge-${kebabCase} disabled></forge-${kebabCase}>
    \`);

    expect(el.disabled).to.be.true;
    expect(el).to.have.attribute('disabled');
  });
});
`;

// Story template
const storyTemplate = `import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './${kebabCase}';

const meta: Meta = {
  title: '${componentType.charAt(0).toUpperCase() + componentType.slice(1)}/${pascalCase}',
  component: 'forge-${kebabCase}',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary']
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: { type: 'boolean' }
    }
  },
  parameters: {
    docs: {
      description: {
        component: '${pascalCase} component description'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    disabled: false
  },
  render: (args) => html\`
    <forge-${kebabCase}
      variant=\${args.variant}
      size=\${args.size}
      ?disabled=\${args.disabled}
    >
      ${pascalCase} Content
    </forge-${kebabCase}>
  \`
};

export const AllVariants: Story = {
  render: () => html\`
    <div style="display: flex; gap: 1rem; flex-direction: column;">
      <forge-${kebabCase} variant="default">Default</forge-${kebabCase}>
      <forge-${kebabCase} variant="primary">Primary</forge-${kebabCase}>
      <forge-${kebabCase} variant="secondary">Secondary</forge-${kebabCase}>
    </div>
  \`
};

export const AllSizes: Story = {
  render: () => html\`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <forge-${kebabCase} size="sm">Small</forge-${kebabCase}>
      <forge-${kebabCase} size="md">Medium</forge-${kebabCase}>
      <forge-${kebabCase} size="lg">Large</forge-${kebabCase}>
    </div>
  \`
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
`;

// Index template
const indexTemplate = `export { Forge${pascalCase} } from './${kebabCase}';
`;

// Write files
fs.writeFileSync(path.join(componentDir, `${kebabCase}.ts`), componentTemplate);
fs.writeFileSync(path.join(componentDir, `${kebabCase}.test.ts`), testTemplate);
fs.writeFileSync(path.join(componentDir, `${kebabCase}.stories.ts`), storyTemplate);
fs.writeFileSync(path.join(componentDir, 'index.ts'), indexTemplate);

console.log(`✅ Component created successfully at ${componentDir}`);
console.log(`
Files created:
  - ${kebabCase}.ts
  - ${kebabCase}.test.ts
  - ${kebabCase}.stories.ts
  - index.ts

Next steps:
1. Update src/index.ts to export the new component
2. Run 'npm test' to verify the component works
3. Run 'npm run storybook' to see it in action
`);
```

### NPM Script Addition
Add to package.json:
```json
{
  "scripts": {
    "generate:component": "node scripts/generate-component.js"
  }
}

## Performance Monitoring

### Bundle Size Tracking
- Maximum bundle size: 50KB for core components
- Individual component max: 10KB
- Automated checks in CI/CD
- Weekly bundle size reports

### Performance Metrics
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Cumulative Layout Shift < 0.1
- Lighthouse score > 95