# ADR-009: Documentation and Developer Experience Strategy

## Status
**Accepted**

## Context
Documentation is critical for the adoption and success of a component library. Poor documentation leads to:
- Low adoption rates
- Increased support burden
- Misuse of components
- Developer frustration
- Slower development velocity

For a framework-agnostic component library, documentation challenges include:
- Multiple framework integration patterns to document
- Complex API surfaces (properties, events, slots, CSS variables)
- Interactive examples that work across frameworks
- Maintaining documentation synchronization with code
- Providing both reference and learning materials

Traditional documentation approaches often fail because:
- Static documentation becomes outdated
- Separate documentation sites lack interactivity
- Manual documentation is error-prone
- Framework-specific examples are hard to maintain

## Decision
We will use **Storybook as the central documentation platform**, augmented with automated API documentation generation and comprehensive guides.

### Documentation Architecture:
1. **Storybook**: Interactive component explorer and documentation
2. **Custom Elements Manifest**: Automated API documentation
3. **Framework Guides**: Specific integration documentation
4. **Example Applications**: Full working examples per framework

## Consequences

### Positive Consequences
- **Single Source of Truth**: Storybook serves as workshop and documentation
- **Always Current**: Documentation lives with code
- **Interactive**: Developers can experiment with components
- **Automated**: API docs generated from source code
- **Visual Testing**: Stories double as visual regression tests
- **Framework Examples**: Dedicated examples for each framework
- **Discoverability**: Easy to browse and search components

### Negative Consequences
- **Build Complexity**: Storybook adds to build pipeline
- **Learning Curve**: Contributors must learn Storybook
- **Maintenance**: Stories require updates with component changes
- **Performance**: Large Storybook builds can be slow
- **Hosting Costs**: Requires hosting for public documentation

## Storybook Configuration

### Structure and Organization
```typescript
// .storybook/main.ts
export default {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../docs/**/*.mdx'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  }
};
```

### Story Organization Pattern
```typescript
// button.stories.ts
export default {
  title: 'Components/Atoms/Button',
  component: 'my-button',
  parameters: {
    docs: {
      description: {
        component: 'Base button component with multiple variants'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    }
  }
};

// Interactive playground
export const Playground = {
  args: {
    variant: 'primary',
    disabled: false,
    loading: false
  }
};

// Specific states
export const AllVariants = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <my-button variant="primary">Primary</my-button>
      <my-button variant="secondary">Secondary</my-button>
      <my-button variant="danger">Danger</my-button>
    </div>
  `
};
```

## API Documentation Generation

### Custom Elements Manifest
```javascript
// custom-elements-manifest.config.js
export default {
  globs: ['src/components/**/*.ts'],
  exclude: ['**/*.stories.ts', '**/*.test.ts'],
  outdir: 'dist',
  plugins: [
    {
      name: 'storybook-integration',
      packageLinkPhase({ customElementsManifest }) {
        // Integrate with Storybook docs
      }
    }
  ]
};
```

### JSDoc Standards
```typescript
/**
 * @element my-button
 * @summary A flexible button component
 * 
 * @property {string} variant - Visual style variant
 * @property {boolean} disabled - Whether the button is disabled
 * @property {boolean} loading - Shows loading spinner
 * 
 * @event {CustomEvent} click - Fired when button is clicked
 * 
 * @slot - Default slot for button content
 * @slot icon - Slot for button icon
 * 
 * @csspart button - The button element
 * @csspart label - The button label
 * 
 * @cssproperty [--button-bg=var(--color-primary)] - Background color
 * @cssproperty [--button-color=white] - Text color
 */
export class Button extends LitElement {
  // Implementation
}
```

## Documentation Types

### 1. Component Documentation
```markdown
<!-- In Storybook MDX -->
# Button Component

## Overview
The Button component is the primary way users trigger actions...

## Usage
\`\`\`html
<my-button variant="primary" @click="handleClick">
  Click me
</my-button>
\`\`\`

## API Reference
<ArgsTable of={Button} />

## Accessibility
- Supports keyboard navigation (Enter/Space)
- ARIA attributes included
- Focus management built-in

## Examples
<Canvas>
  <Story id="components-atoms-button--playground" />
</Canvas>
```

### 2. Framework Integration Guides
```markdown
<!-- docs/frameworks/react.md -->
# Using Forge UI with React

## Installation
\`\`\`bash
npm install @forge/ui @forge/react
\`\`\`

## Setup
\`\`\`jsx
import { Button } from '@forge/react';

function App() {
  return <Button onClick={handleClick}>Click me</Button>;
}
\`\`\`

## Event Handling
\`\`\`jsx
<Button onClick={(e) => console.log(e.detail)}>
  Click me
</Button>
\`\`\`
```

### 3. Migration Guides
```markdown
<!-- docs/migration/from-material-ui.md -->
# Migrating from Material-UI

## Component Mapping
| Material-UI | Forge UI | Notes |
|------------|----------|-------|
| Button | my-button | Use variant prop |
| TextField | my-input | Includes validation |

## Code Examples
Before:
\`\`\`jsx
<Button variant="contained" color="primary">
  Click
</Button>
\`\`\`

After:
\`\`\`jsx
<my-button variant="primary">
  Click
</my-button>
\`\`\`
```

## Alternatives Considered

### 1. Custom Documentation Site
- **Pros**: Full control, custom features
- **Cons**: Maintenance burden, lacks interactivity

### 2. JSDoc Only
- **Pros**: Simple, lives with code
- **Cons**: No interactivity, poor discoverability

### 3. README Files
- **Pros**: Simple, version controlled
- **Cons**: No interactivity, gets outdated

### 4. Wiki
- **Pros**: Easy to edit, collaborative
- **Cons**: Separate from code, gets outdated

## Documentation Standards

### Component Story Requirements
Each component must have:
1. **Playground story**: Interactive with all props
2. **States story**: All visual states
3. **Sizes story**: All size variants
4. **Accessibility story**: Keyboard/screen reader demo
5. **Framework stories**: Usage in each framework

### Documentation Checklist
- [ ] Component overview and use cases
- [ ] Installation instructions
- [ ] Basic usage examples
- [ ] Complete API reference
- [ ] Accessibility notes
- [ ] Browser compatibility
- [ ] Performance considerations
- [ ] Common patterns
- [ ] Troubleshooting section

## Documentation Workflow

### Automated Updates
```yaml
# .github/workflows/docs.yml
on:
  push:
    branches: [main]
    
jobs:
  deploy-docs:
    steps:
      - run: npm run build-storybook
      - run: npm run build:manifest
      - deploy: storybook-static
```

### Version Management
- Documentation versioned with package
- Previous versions remain accessible
- Migration guides between versions
- Breaking changes clearly marked

## Success Metrics
- Documentation coverage: 100% of public API
- Time to first component usage: <10 minutes
- Documentation accuracy: 0 discrepancies
- Interactive examples: 100% of components
- Framework guide completion: All supported frameworks

## References
- [Storybook Documentation](https://storybook.js.org/docs)
- [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/)
- Development workflow plan: `/plans/development-workflow.md`
- Related: ADR-004 (Testing Strategy), ADR-008 (API Design)