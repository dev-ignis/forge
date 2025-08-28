# ADR-001: Web Component Abstraction Layer Selection

## Status
**Accepted**

## Context
The project requires building a framework-agnostic UI component library that can work seamlessly across React, Vue, Angular, and vanilla JavaScript applications. The modern frontend landscape is fragmented with multiple competing frameworks, and building framework-specific components would lead to:
- Technological lock-in
- Duplicated development effort across teams
- Costly rewrites when technology stacks evolve
- Inconsistent UI/UX across different applications

Four primary architectural approaches were evaluated:
1. **Pure Web Components**: Using native browser APIs directly
2. **Web Component Libraries/Compilers**: Using tools like Lit or Stencil
3. **Framework Wrappers**: Building in one framework and wrapping for others
4. **Transpilation**: Write-once, compile to multiple frameworks

## Decision
We will use **Lit 3.x** as the Web Component abstraction layer for building our framework-agnostic component library.

### Rationale for Choosing Lit over Alternatives:

**Lit vs Pure Web Components:**
- Lit provides essential developer experience improvements (reactive properties, declarative templates) while maintaining minimal overhead (~5KB)
- Pure Web Components require verbose, error-prone DOM manipulation and manual state management
- Lit stays close to the platform, making it easier to understand and debug

**Lit vs Stencil:**
- Lighter runtime footprint (~5KB vs ~15KB)
- Simpler build process without complex compilation steps
- Closer to native Web Component APIs, reducing abstraction layers
- Google backing ensures long-term support and maintenance
- Built-in reactive system with decorators provides excellent DX

**Lit vs Framework Wrappers (e.g., React + Direflow):**
- True framework agnosticism - not locked into any specific framework
- No need to ship framework runtime (e.g., React DOM) with components
- Better performance due to native implementation
- Avoids event propagation and data binding impedance mismatches

**Lit vs Transpilers (e.g., Mitosis):**
- More mature and stable technology
- No dependency on experimental transpilation tools
- Easier debugging (debug actual code, not generated code)
- Lower risk of tool abandonment

## Consequences

### Positive Consequences
- **True Framework Independence**: Components work natively in any framework or vanilla JS
- **Performance**: Minimal runtime overhead, leveraging native browser APIs
- **Future-Proof**: Based on web standards that browsers will support indefinitely
- **Developer Experience**: Modern DX with TypeScript, decorators, and reactive properties
- **Bundle Size**: Small footprint (~5KB) compared to framework-specific solutions
- **Maintainability**: Single codebase for all framework targets
- **Browser Support**: Works in all modern browsers with optional polyfills for older ones

### Negative Consequences
- **Learning Curve**: Developers need to learn Lit's APIs and Web Component concepts
- **Shadow DOM Limitations**: Some CSS frameworks may have compatibility issues
- **Framework Integration**: May require thin wrapper utilities for optimal framework-specific DX
- **Ecosystem**: Smaller ecosystem compared to React/Vue component libraries
- **Testing Complexity**: Requires specialized testing tools that support Shadow DOM

## Alternatives Considered

### 1. Stencil.js
- **Pros**: Compiler-based optimizations, lazy loading, framework-specific output targets
- **Cons**: Heavier runtime, more complex build process, additional compilation step

### 2. Pure Web Components
- **Pros**: No dependencies, maximum performance, full control
- **Cons**: Poor developer experience, verbose code, manual everything

### 3. React with Wrappers
- **Pros**: Mature ecosystem, familiar to many developers
- **Cons**: Not truly agnostic, requires React runtime, integration issues

### 4. Mitosis Transpilation
- **Pros**: Write once, compile to any framework
- **Cons**: Immature technology, debugging challenges, tool dependency risk

## Implementation Notes
- All components will extend Lit's `LitElement` base class
- TypeScript will be used for type safety
- Decorators will be used for reactive properties and state management
- Shadow DOM will be the default for style encapsulation
- CSS Custom Properties will be used for theming

## References
- [Web Components Specification](https://www.w3.org/standards/techs/components)
- [Lit Documentation](https://lit.dev/)
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/)
- Main strategy document: `/plans/main.md`
- Technology stack plan: `/plans/technology-stack.md`