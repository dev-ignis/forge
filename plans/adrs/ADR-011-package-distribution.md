# ADR-011: Package Distribution and Module Strategy

## Status
**Accepted**

## Context
The distribution strategy for a component library affects:
- How developers install and import components
- Bundle size in consuming applications
- Tree-shaking effectiveness
- CDN usage capabilities
- TypeScript integration
- Framework-specific wrapper distribution

Key considerations:
- Modern bundlers expect ES modules
- Legacy applications may need CommonJS/UMD
- Some users want CDN usage without build tools
- Framework wrappers need separate packages
- Types must be distributed correctly
- Individual component imports should be possible

Poor distribution strategies result in:
- Large bundle sizes
- Poor tree-shaking
- Import confusion
- Type definition issues
- Version conflicts

## Decision
We will distribute the library as **multiple packages** with a core package and optional framework-specific packages, supporting multiple module formats.

### Distribution Strategy:
1. **Core Package**: `@forge/ui` - Pure Web Components
2. **Framework Packages**: `@forge/react`, `@forge/vue`, `@forge/angular`
3. **Module Formats**: ESM (primary), UMD (CDN/legacy)
4. **Entry Points**: Multiple for optimal tree-shaking
5. **Type Definitions**: Separate `.d.ts` files with source maps

## Consequences

### Positive Consequences
- **Optimal Tree-shaking**: Only imported components are bundled
- **Framework Choice**: Install only what you need
- **CDN Support**: UMD builds enable script tag usage
- **Type Safety**: Full TypeScript support
- **Clear Separation**: Core separate from framework integrations
- **Flexibility**: Multiple import strategies supported

### Negative Consequences
- **Package Management**: Multiple packages to maintain
- **Version Sync**: Framework packages must align with core
- **Build Complexity**: Multiple formats and entry points
- **Documentation**: More complex installation instructions
- **Publishing Overhead**: Multiple npm publishes required

## Package Structure

### Repository Structure
```
forge/
├── packages/
│   ├── core/              # @forge/ui
│   │   ├── src/
│   │   ├── dist/
│   │   └── package.json
│   ├── react/             # @forge/react
│   │   ├── src/
│   │   ├── dist/
│   │   └── package.json
│   ├── vue/               # @forge/vue
│   │   ├── src/
│   │   ├── dist/
│   │   └── package.json
│   └── angular/           # @forge/angular
│       ├── src/
│       ├── dist/
│       └── package.json
├── lerna.json             # Monorepo management
└── package.json           # Root package
```

### Core Package Configuration
```json
// packages/core/package.json
{
  "name": "@forge/ui",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/forge-ui.umd.js",
  "module": "./dist/forge-ui.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "src"
  ],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/forge-ui.js",
      "require": "./dist/forge-ui.umd.js",
      "default": "./dist/forge-ui.js"
    },
    "./button": {
      "types": "./dist/components/button/index.d.ts",
      "import": "./dist/components/button/index.js",
      "require": "./dist/components/button/index.umd.js"
    },
    "./modal": {
      "types": "./dist/components/modal/index.d.ts",
      "import": "./dist/components/modal/index.js",
      "require": "./dist/components/modal/index.umd.js"
    },
    "./styles": {
      "import": "./dist/styles/tokens.css"
    },
    "./styles/*": {
      "import": "./dist/styles/*.css"
    }
  },
  "sideEffects": [
    "*.css",
    "./dist/components/*/define.js"
  ],
  "peerDependencies": {
    "lit": "^3.0.0"
  }
}
```

### Framework Package Configuration
```json
// packages/react/package.json
{
  "name": "@forge/react",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "peerDependencies": {
    "@forge/ui": "^1.0.0",
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "dependencies": {
    "@lit/react": "^1.0.0"
  }
}
```

## Import Strategies

### 1. Full Library Import
```javascript
// Imports everything (not recommended)
import '@forge/ui';

// All components are now defined
document.createElement('my-button');
```

### 2. Individual Component Import (Recommended)
```javascript
// Only imports what you need
import '@forge/ui/button';
import '@forge/ui/modal';

// Or with named exports
import { Button, Modal } from '@forge/ui';
```

### 3. Framework Wrapper Import
```jsx
// React
import { Button, Modal } from '@forge/react';

function App() {
  return <Button variant="primary">Click me</Button>;
}
```

### 4. CDN Usage
```html
<!-- Full library -->
<script src="https://cdn.jsdelivr.net/npm/@forge/ui/dist/forge-ui.umd.js"></script>

<!-- Individual component -->
<script src="https://cdn.jsdelivr.net/npm/@forge/ui/dist/components/button/index.umd.js"></script>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@forge/ui/dist/styles/tokens.css">
```

## Project-Specific Update (Monorepo)

In @nexcraft/forge, we apply the above principles with npm workspaces and scoped packages:

- Core Web Components and React wrappers are shipped from `@nexcraft/forge` (ESM-first, explicit `exports`).
- Framework-specific integrations that bring heavy peer dependencies are split into dedicated packages to keep the core lightweight, e.g.:
  - `@nexcraft/forge-rhf` (React Hook Form adapters)
  - `@nexcraft/forge-angular` (Angular directives/forms; planned)

Release automation (Changesets) publishes only changed packages in the correct order to satisfy peer dependencies. CI validates tarball contents (export resolution) and artifact integrity before publish.

## Alternatives Considered

### 1. Single Package with Everything
- **Pros**: Simple installation, one version to track
- **Cons**: Larger install size, forces framework code on everyone

### 2. Component-per-Package
- **Pros**: Ultimate modularity
- **Cons**: Package management nightmare, version sync issues

### 3. Build-Time Generation
- **Pros**: Optimal bundles, customization
- **Cons**: Complex build process, slow installs

### 4. Git Submodules
- **Pros**: Separate repositories
- **Cons**: Complex for users, version management difficult

## Build Output Structure

### Distribution Files
```
dist/
├── forge-ui.js           # ESM bundle
├── forge-ui.umd.js       # UMD bundle
├── forge-ui.min.js       # Minified ESM
├── forge-ui.umd.min.js   # Minified UMD
├── index.d.ts            # Type definitions
├── components/
│   ├── button/
│   │   ├── index.js      # ESM
│   │   ├── index.umd.js  # UMD
│   │   ├── index.d.ts    # Types
│   │   └── define.js     # Registration only
│   └── modal/
│       └── ...
├── styles/
│   ├── tokens.css        # CSS custom properties
│   ├── reset.css         # Optional reset
│   └── utilities.css     # Optional utilities
└── custom-elements.json  # Component manifest
```

## Module Format Details

### ES Modules (ESM)
```javascript
// Modern, tree-shakeable
export { Button } from './button/index.js';
export { Modal } from './modal/index.js';
```

### Universal Module Definition (UMD)
```javascript
// For CDN and legacy environments
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ForgeUI = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  // Component definitions
  return { Button, Modal };
}));
```

## Publishing Strategy

### NPM Configuration
```json
// .npmrc
@forge:registry=https://registry.npmjs.org/
access=public
```

### Publishing Workflow
```yaml
# Automated via CI/CD
steps:
  - name: Build packages
    run: npm run build:all
  
  - name: Publish core
    run: npm publish packages/core
    
  - name: Publish React wrapper
    run: npm publish packages/react
    
  - name: Publish Vue wrapper
    run: npm publish packages/vue
```

### Version Synchronization
```javascript
// lerna.json
{
  "version": "independent",
  "packages": ["packages/*"],
  "command": {
    "version": {
      "allowBranch": "main",
      "conventionalCommits": true
    }
  }
}
```

## CDN Strategy

### Provider Support
- jsDelivr (automatic npm mirroring)
- unpkg (automatic npm mirroring)
- cdnjs (manual submission)

### Optimization
- Pre-minified versions
- Brotli compression support
- SRI (Subresource Integrity) hashes

## Success Metrics
- Tree-shaking effectiveness: >80% reduction possible
- Package install size: <100KB for core
- CDN load time: <500ms
- Type definition accuracy: 100%
- Framework wrapper overhead: <5KB each

## References
- [Node.js Package Entry Points](https://nodejs.org/api/packages.html#package-entry-points)
- [TypeScript Publishing](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
- Build tooling: ADR-005
- Related: ADR-010 (Versioning), ADR-007 (Framework Integration)
