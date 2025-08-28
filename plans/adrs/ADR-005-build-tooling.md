# ADR-005: Build Tooling and Module Bundling Strategy

## Status
**Accepted**

## Context
The choice of build tooling significantly impacts:
- Developer experience during development
- Build performance and optimization capabilities
- Bundle size and tree-shaking effectiveness
- Module format support (ESM, CJS, UMD)
- Development server capabilities (HMR, transpilation)
- Integration with other tools (TypeScript, testing, linting)

For a component library, we need tooling that:
- Produces highly optimized, tree-shakeable bundles
- Supports multiple module formats for different consumption scenarios
- Provides fast development feedback loops
- Handles TypeScript compilation efficiently
- Generates proper type definitions
- Supports Web Component-specific optimizations

## Decision
We will use **Vite** for development and its **Library Mode** (powered by Rollup) for production builds.

### Tool Stack:
- **Vite 5.x**: Development server and build orchestration
- **Rollup** (via Vite): Production bundling with superior tree-shaking
- **TypeScript 5.x**: Type checking and declaration generation
- **PostCSS**: CSS processing and optimization
- **@custom-elements-manifest/analyzer**: API documentation generation

## Consequences

### Positive Consequences
- **Fast Development**: Native ES modules in development for instant HMR
- **Optimal Bundles**: Rollup's superior tree-shaking and code splitting
- **Zero Config**: Vite provides sensible defaults for library development
- **Framework Agnostic**: No bias toward any particular framework
- **Modern Standards**: First-class support for ES modules and Web Components
- **Excellent DX**: Fast startup, hot reload, and error overlay
- **Unified Tooling**: Single tool for both development and production

### Negative Consequences
- **Newer Tool**: Less mature ecosystem compared to Webpack
- **Rollup Complexity**: Advanced configurations require Rollup knowledge
- **Breaking Changes**: Vite is still evolving, may have breaking changes
- **Plugin Ecosystem**: Smaller plugin ecosystem than Webpack

## Build Configuration

### Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ForgeUI',
      formats: ['es', 'umd'],
      fileName: (format) => `forge-ui.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        // Preserve module structure for tree-shaking
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    },
    // Optimize for library distribution
    minify: 'terser',
    sourcemap: true,
    // Multiple entry points for better tree-shaking
    emptyOutDir: true
  },
  // Development optimizations
  optimizeDeps: {
    include: ['lit', '@lit/reactive-element'],
    exclude: ['@custom-elements-manifest/analyzer']
  }
});
```

### Package.json Configuration
```json
{
  "name": "@forge/ui",
  "type": "module",
  "files": ["dist", "types"],
  "main": "./dist/forge-ui.umd.js",
  "module": "./dist/forge-ui.es.js",
  "types": "./types/index.d.ts",
  "exports": {
    ".": {
      "types": "./types/index.d.ts",
      "import": "./dist/forge-ui.es.js",
      "require": "./dist/forge-ui.umd.js"
    },
    "./button": {
      "types": "./types/components/button/index.d.ts",
      "import": "./dist/components/button/index.js"
    },
    "./styles": {
      "import": "./dist/styles/tokens.css"
    }
  },
  "sideEffects": false
}
```

## Alternatives Considered

### 1. Webpack
- **Pros**: Mature, extensive plugin ecosystem, widely adopted
- **Cons**: Complex configuration, slower development builds, larger bundles

### 2. Rollup (standalone)
- **Pros**: Best-in-class tree-shaking, minimal bundles
- **Cons**: No dev server, requires additional tooling setup

### 3. Parcel
- **Pros**: Zero configuration, fast builds
- **Cons**: Less control, smaller ecosystem, less suitable for libraries

### 4. esbuild
- **Pros**: Extremely fast builds
- **Cons**: Limited plugin system, no type checking, less mature

### 5. Snowpack
- **Pros**: Fast development, unbundled development
- **Cons**: Deprecated in favor of Vite

## Build Optimization Strategies

### Tree-shaking Optimization
```javascript
// Enable tree-shaking with proper side-effect declarations
{
  "sideEffects": false,
  // OR specify files with side effects
  "sideEffects": ["./src/styles/global.css", "./src/polyfills.js"]
}
```

### Code Splitting
```javascript
// Dynamic imports for heavy components
const RichTextEditor = () => import('./components/RichTextEditor');

// Multiple entry points
export default {
  build: {
    rollupOptions: {
      input: {
        main: 'src/index.ts',
        button: 'src/components/button/index.ts',
        modal: 'src/components/modal/index.ts'
      }
    }
  }
};
```

### Bundle Analysis
```javascript
// visualizer plugin for bundle analysis
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
};
```

## Module Format Strategy

### ES Modules (Primary)
- Modern bundlers and browsers
- Tree-shaking support
- Future-proof

### UMD (Fallback)
- Legacy environments
- CDN usage
- Script tag inclusion

### TypeScript Declarations
- Generated separately via `tsc`
- Preserves JSDoc comments
- Supports IDE intellisense

## Performance Targets
- Development server startup: <500ms
- HMR update: <100ms
- Production build time: <30s
- Bundle size (gzipped):
  - Core components: <50KB
  - Individual component: <10KB
  - CSS tokens: <5KB

## CI/CD Integration
```yaml
build:
  steps:
    - npm ci
    - npm run build
    - npm run build:types
    - npm run build:manifest
    - npm run analyze:bundle
    - npm run size-limit
```

## Migration Path
For projects using other build tools:
1. Gradual migration supported (Vite can coexist)
2. Webpack aliases can be mapped to Vite config
3. Most Rollup plugins work with Vite
4. Build outputs remain compatible

## References
- [Vite Documentation](https://vitejs.dev/)
- [Rollup Best Practices](https://rollupjs.org/guide/en/)
- Development workflow plan: `/plans/development-workflow.md`
- Related: ADR-001 (Web Components), ADR-004 (Testing Strategy)