# Selective Component Imports

Selective imports allow you to import only the Forge components you need, resulting in smaller bundle sizes and better tree-shaking. This feature is available starting from @nexcraft/forge v0.5.2-beta.22+.

## Benefits

### 🚀 **Smaller Bundle Sizes**
```javascript
// Before: Import entire library (~300KB)
import '@nexcraft/forge';

// After: Import only what you need (~15KB)
import { ForgeButton } from '@nexcraft/forge/button';
import { ForgeInput } from '@nexcraft/forge/input';
```

### ⚡ **Faster Build Times**
- Reduced dependency graph processing
- Better tree-shaking optimization
- Smaller TypeScript compilation scope

### 🎯 **Explicit Dependencies**
- Clear visibility into which components are used
- Easier dependency tracking and auditing
- Better compatibility with bundler analysis tools

## Basic Usage

### Individual Component Imports

```javascript
// Import specific components with auto-registration
import { ForgeButton } from '@nexcraft/forge/button';
import { ForgeInput } from '@nexcraft/forge/input';
import { ForgeCheckbox } from '@nexcraft/forge/checkbox';

// Components are automatically registered as custom elements
// <forge-button>, <forge-input>, <forge-checkbox> are now available
```

### Manual Registration Pattern

```javascript
// Import without auto-registration
import ForgeButton from '@nexcraft/forge/button';

// Manually register with custom name
customElements.define('my-button', ForgeButton);

// Now use as <my-button>
```

## Available Selective Imports

### Atomic Components

```javascript
// Form components
import { ForgeButton } from '@nexcraft/forge/button';
import { ForgeInput } from '@nexcraft/forge/input'; 
import { ForgeCheckbox } from '@nexcraft/forge/checkbox';
import { ForgeSelect } from '@nexcraft/forge/select';

// Feedback components  
import { ForgeAlert } from '@nexcraft/forge/alert';

// Display components
// More components will be added in future releases
```

### Molecular Components

```javascript
// Layout components
import { ForgeCard } from '@nexcraft/forge/card';
import { ForgeModal } from '@nexcraft/forge/modal';

// More molecular components coming soon...
```

## Framework Integration

### React

```jsx
import { ForgeButton } from '@nexcraft/forge/button';
import { ForgeInput } from '@nexcraft/forge/input';

function LoginForm() {
  return (
    <form>
      <ForgeInput 
        type="email" 
        label="Email"
        required
      />
      <ForgeButton type="submit" variant="primary">
        Sign In
      </ForgeButton>
    </form>
  );
}
```

### React + TypeScript

```tsx
import { ForgeButton } from '@nexcraft/forge/button';
import type { ButtonVariant } from '@nexcraft/forge/button';

interface ActionButtonProps {
  variant: ButtonVariant;
  children: React.ReactNode;
  onClick: () => void;
}

function ActionButton({ variant, children, onClick }: ActionButtonProps) {
  return (
    <ForgeButton variant={variant} onClick={onClick}>
      {children}
    </ForgeButton>
  );
}
```

### Vue 3

```vue
<template>
  <form>
    <forge-input 
      type="email" 
      label="Email"
      :required="true"
    />
    <forge-button 
      type="submit" 
      variant="primary"
      @click="handleSubmit"
    >
      Sign In
    </forge-button>
  </form>
</template>

<script setup>
import { ForgeButton } from '@nexcraft/forge/button';
import { ForgeInput } from '@nexcraft/forge/input';

const handleSubmit = () => {
  console.log('Form submitted');
};
</script>
```

### Angular

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ForgeButton } from '@nexcraft/forge/button';
import { ForgeInput } from '@nexcraft/forge/input';

@Component({
  selector: 'app-root',
  template: `
    <form>
      <forge-input 
        type="email" 
        label="Email"
        [required]="true">
      </forge-input>
      <forge-button 
        type="submit" 
        variant="primary"
        (click)="handleSubmit()">
        Sign In
      </forge-button>
    </form>
  `
})
export class AppComponent {
  handleSubmit() {
    console.log('Form submitted');
  }
}
```

## Bundle Analysis

### Webpack Bundle Analyzer

```bash
# Install analyzer
npm install --save-dev webpack-bundle-analyzer

# Analyze your bundle to see component sizes
npm run build:analyze
```

**Expected Results:**
```
Before (bulk import):
├── @nexcraft/forge.es.js (300KB)

After (selective imports):
├── @nexcraft/forge/button (15KB)
├── @nexcraft/forge/input (18KB)  
├── @nexcraft/forge/checkbox (12KB)
Total: 45KB (85% reduction)
```

### Rollup Bundle Analyzer

```javascript
// rollup.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      filename: 'bundle-analysis.html',
      open: true
    })
  ]
};
```

## Advanced Patterns

### Conditional Loading

```javascript
// Load components only when needed
async function loadFormComponents() {
  const [
    { ForgeInput },
    { ForgeButton },
    { ForgeCheckbox }
  ] = await Promise.all([
    import('@nexcraft/forge/input'),
    import('@nexcraft/forge/button'), 
    import('@nexcraft/forge/checkbox')
  ]);
  
  return { ForgeInput, ForgeButton, ForgeCheckbox };
}

// Use in React with Suspense
function FormSection() {
  const [components, setComponents] = useState(null);
  
  useEffect(() => {
    loadFormComponents().then(setComponents);
  }, []);
  
  if (!components) return <div>Loading...</div>;
  
  return (
    <form>
      <components.ForgeInput label="Name" />
      <components.ForgeButton variant="primary">Submit</components.ForgeButton>
    </form>
  );
}
```

### Custom Component Registry

```javascript
// Create a custom component registry
class ForgeComponentRegistry {
  static async loadComponent(name) {
    const componentMap = {
      'button': () => import('@nexcraft/forge/button'),
      'input': () => import('@nexcraft/forge/input'),
      'checkbox': () => import('@nexcraft/forge/checkbox'),
      'select': () => import('@nexcraft/forge/select'),
      'alert': () => import('@nexcraft/forge/alert'),
      'card': () => import('@nexcraft/forge/card'),
      'modal': () => import('@nexcraft/forge/modal')
    };
    
    const loader = componentMap[name];
    if (!loader) {
      throw new Error(`Component ${name} not found`);
    }
    
    return await loader();
  }
  
  static async loadComponents(names) {
    const promises = names.map(name => this.loadComponent(name));
    return await Promise.all(promises);
  }
}

// Usage
const [buttonModule, inputModule] = await ForgeComponentRegistry.loadComponents(['button', 'input']);
```

### Micro-frontend Integration  

```javascript
// Module federation with selective imports
// webpack.config.js
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      exposes: {
        // Expose individual components
        './ForgeButton': '@nexcraft/forge/button',
        './ForgeInput': '@nexcraft/forge/input'
      }
    })
  ]
};

// Consumer app
const { ForgeButton } = await import('shell/ForgeButton');
const { ForgeInput } = await import('shell/ForgeInput');
```

## Migration Guide

### From Bulk Imports

**Before:**
```javascript
// Old pattern - loads entire library
import '@nexcraft/forge';

// All components available globally
```

**After:**
```javascript
// New pattern - selective imports  
import { ForgeButton } from '@nexcraft/forge/button';
import { ForgeInput } from '@nexcraft/forge/input';

// Only imported components are available
```

### From Framework Integration Imports

**Before:**
```javascript  
// Load React integration (includes all components)
import { ForgeButton, ForgeInput, ForgeCheckbox } from '@nexcraft/forge/integrations/react';
```

**After:**
```javascript
// Mix selective imports with React integration for best performance
import { ForgeButton } from '@nexcraft/forge/button';
import { ForgeInput } from '@nexcraft/forge/input'; 
import { RHFForgeCheckbox } from '@nexcraft/forge/integrations/rhf';
```

### Gradual Migration

```javascript
// Step 1: Identify most used components
import { ForgeButton, ForgeInput } from '@nexcraft/forge/integrations/react'; // Remove this
import { ForgeButton } from '@nexcraft/forge/button'; // Add this
import { ForgeInput } from '@nexcraft/forge/input';   // Add this

// Step 2: Replace other components gradually  
// Keep using integration imports for less common components
import { ForgeTooltip, ForgeModal } from '@nexcraft/forge/integrations/react';

// Step 3: Eventually move to full selective imports
import { ForgeTooltip } from '@nexcraft/forge/tooltip'; // When available
import { ForgeModal } from '@nexcraft/forge/modal';     // Available now
```

## Performance Benchmarks

### Bundle Size Comparison

| Import Pattern | Bundle Size | Components Included |
|---------------|-------------|-------------------|
| Full Library | ~300KB | All 27 components |
| Framework Integration | ~150KB | Framework + components |
| Selective (5 components) | ~75KB | Only imported components |
| Selective (1 component) | ~15KB | Single component |

### Real-world Example

**E-commerce Form:**
```javascript
// Selective imports for checkout form
import { ForgeInput } from '@nexcraft/forge/input';     // 18KB
import { ForgeSelect } from '@nexcraft/forge/select';   // 16KB  
import { ForgeCheckbox } from '@nexcraft/forge/checkbox'; // 12KB
import { ForgeButton } from '@nexcraft/forge/button';   // 15KB
// Total: 61KB vs 300KB full library (80% savings)
```

## Troubleshooting

### Import Errors

```javascript
// ❌ Wrong - component not available for selective import yet
import { ForgeTooltip } from '@nexcraft/forge/tooltip';

// ✅ Correct - use integration import for now  
import { ForgeTooltip } from '@nexcraft/forge/integrations/react';
```

### TypeScript Errors

```typescript
// ❌ Wrong - importing from wrong path
import type { ButtonVariant } from '@nexcraft/forge';

// ✅ Correct - import types from component path
import type { ButtonVariant } from '@nexcraft/forge/button';
```

### Bundle Not Shrinking

1. **Check bundler configuration:**
   ```javascript
   // Ensure tree-shaking is enabled
   optimization: {
     usedExports: true,
     sideEffects: false
   }
   ```

2. **Verify imports:**
   ```javascript
   // ✅ Good - selective import
   import { ForgeButton } from '@nexcraft/forge/button';
   
   // ❌ Bad - still imports everything
   import '@nexcraft/forge';
   ```

3. **Check for mixed patterns:**
   ```javascript
   // Don't mix bulk and selective imports
   import '@nexcraft/forge'; // ❌ This loads everything
   import { ForgeButton } from '@nexcraft/forge/button'; // ✅ This is redundant now
   ```

## Version Requirements

- **Minimum Version:** @nexcraft/forge v0.5.2-beta.22+
- **Node.js:** v16.0.0+
- **Bundler:** Webpack 5+, Rollup 3+, Vite 4+, or esbuild 0.17+

## Roadmap

**Planned Selective Imports:**
- `@nexcraft/forge/tooltip` 
- `@nexcraft/forge/dropdown`
- `@nexcraft/forge/date-picker`
- `@nexcraft/forge/multi-select`
- `@nexcraft/forge/form-field`
- `@nexcraft/forge/toast`
- `@nexcraft/forge/tabs`
- `@nexcraft/forge/accordion`
- `@nexcraft/forge/data-table`
- `@nexcraft/forge/navigation-bar`
- `@nexcraft/forge/pagination`

All selective imports will be available by v0.6.0.