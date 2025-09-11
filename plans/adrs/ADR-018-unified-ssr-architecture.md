# ADR-018: Unified SSR Architecture for React Components

**Status:** ✅ Accepted  
**Date:** 2024-09-11  
**Deciders:** Development Team  
**Related ADRs:** ADR-007 (Framework Integration), ADR-013 (TypeScript Interfaces)

## Context

Our current React integration requires developers to choose between two different component approaches:
- `ForgeButton` - Client-only components requiring `ClientOnly` wrapper for SSR
- `ForgeButtonSSR` - Separate SSR-compatible components with semantic HTML fallbacks

This creates:
- **Developer confusion** - which component to use?
- **Maintenance overhead** - dual codebases for same functionality
- **API fragmentation** - different imports and usage patterns
- **Breaking changes risk** - migrating between approaches

Meanwhile, the unified approach offers significant advantages:
- **Single component API** works everywhere
- **Automatic environment detection** and optimization
- **Progressive enhancement** from HTML to web component
- **Zero breaking changes** to existing code

## Decision

We will implement a **Unified SSR Architecture** where every React component automatically works in both SSR and client-only environments using a single import and API.

### Technical Implementation

#### 1. Unified Wrapper Architecture
```tsx
// createUnifiedWrapper.tsx - Core unified wrapper utility
export function createUnifiedWrapper<T, P>(options: {
  tagName: string;
  fallbackRenderer: (props, children) => JSX.Element;
  eventMappings?: Record<string, string>;
  propMappings?: Record<string, string>;
  preserveAttributes?: string[];
}) {
  // Automatic environment detection
  // SSR: Render semantic HTML with styling
  // Client: Detect web component support and hydrate
  // Fallback: Enhanced HTML if web components fail
}
```

#### 2. Single Component Usage
```tsx
// Same component works EVERYWHERE
import { ForgeButton } from '@nexcraft/forge/integrations/react';

// SSR (Next.js) - automatically renders semantic HTML
<ForgeButton variant="primary">Submit</ForgeButton>

// Client-only (Vite) - automatically renders web component  
<ForgeButton variant="primary">Submit</ForgeButton>

// No ClientOnly wrapper needed!
// No separate imports required!
// No developer decision needed!
```

#### 3. Progressive Enhancement Process
1. **Server**: Renders semantic HTML with proper styling and accessibility
2. **Client**: Detects web component support and hydrates appropriately
3. **Upgrade**: Seamlessly replaces HTML with web component when ready
4. **Fallback**: Enhanced HTML remains functional if web components fail

### Implementation Requirements

#### Phase 10.1: Infrastructure ✅ Complete
- [x] `createUnifiedWrapper.tsx` utility
- [x] `FallbackRenderers` for semantic HTML  
- [x] Proof of concept with `ForgeButton`
- [x] Usage examples and documentation

#### Phase 10.2-10.4: Component Conversion
All 31 React components (14 atoms + 10 molecules + 7 organisms) must be converted using unified wrapper approach.

#### Phase 10.5: Integration
- Update main exports to use unified components
- Remove old client-only wrapper references
- Update all documentation

## Architectural Benefits

### 1. Automatic Optimization
```tsx
// Component automatically chooses best strategy:

// SSR Environment
<ForgeButton> 
  // Renders: <button class="forge-button forge-button--primary">
  
// Client Environment  
<ForgeButton>
  // Renders: <forge-button variant="primary">
  
// Hydration
// Seamlessly upgrades from <button> to <forge-button>
```

### 2. Zero Configuration Required
- No build-time environment detection needed
- No separate bundles required  
- No runtime configuration
- Works out-of-the-box everywhere

### 3. Framework Compatibility
- ✅ Next.js App Router
- ✅ Next.js Pages Router  
- ✅ Vite/CRA client-only apps
- ✅ Turbopack compatibility
- ✅ Any React SSR framework

## Quality Assurance Requirements

Every converted component must verify compliance with:
- **ADR-001**: Web Components abstraction maintained
- **ADR-002**: Shadow DOM encapsulation (client-side only)  
- **ADR-007**: Framework integration patterns
- **ADR-013**: TypeScript interfaces preserved
- **ADR-014**: AI-ready components functionality
- **ADR-015**: Atomic composition patterns
- **All other ADRs**: Complete architectural compliance

## Success Metrics

### Developer Experience
- ✅ Single import path per component
- ✅ Zero breaking changes to existing code
- ✅ No environment-specific decision making
- ✅ Consistent API across all environments

### Performance  
- ✅ Fast server-side rendering with semantic HTML
- ✅ Progressive enhancement on client
- ✅ Graceful degradation if JavaScript fails
- ✅ Minimal bundle impact

### Reliability
- ✅ Works in all React SSR frameworks
- ✅ Handles web component loading failures gracefully
- ✅ Maintains accessibility throughout lifecycle
- ✅ Preserves all component functionality

## Documentation Requirements

Each component conversion requires:
1. **Convert to unified wrapper** - Technical implementation
2. **Document in `docs/components/{type}/{name}.md`** - Component-specific docs
3. **Update README.md component showcase** - Project visibility
4. **Verify ADR compliance** - All 17 established ADRs

## Migration Strategy

### Backward Compatibility
- Existing `ForgeButton` usage continues working
- No breaking changes to component APIs
- Gradual rollout per component
- Old components deprecated gracefully

### Rollout Plan
1. **Phase 10.2**: Convert all atom components (14)
2. **Phase 10.3**: Convert all molecule components (10)  
3. **Phase 10.4**: Convert all organism components (7)
4. **Phase 10.5**: Update exports and documentation

## Consequences

### Positive
- ✅ **Developer Experience**: Single component API eliminates confusion
- ✅ **Maintenance**: Single codebase per component reduces overhead
- ✅ **Performance**: Automatic optimization for each environment
- ✅ **Reliability**: Progressive enhancement ensures components always work
- ✅ **Future-proof**: Architecture adapts to new SSR frameworks automatically

### Negative
- ❌ **Complexity**: Unified wrapper more complex than simple client-only approach
- ❌ **Bundle Size**: Slightly larger due to environment detection logic
- ❌ **Testing**: Must test both SSR and client scenarios for each component

### Risks & Mitigation
- **Risk**: Web component hydration failures
  - **Mitigation**: Graceful fallback to enhanced semantic HTML
- **Risk**: SSR/client rendering mismatches  
  - **Mitigation**: `suppressHydrationWarning` and careful attribute handling
- **Risk**: Complex debugging scenarios
  - **Mitigation**: Comprehensive logging and debug utilities

## Implementation Status

- **✅ Phase 10.1**: Infrastructure complete
- **🔄 Phase 10.2**: Atoms conversion (in progress)  
- **⏳ Phase 10.3**: Molecules conversion (pending)
- **⏳ Phase 10.4**: Organisms conversion (pending)
- **⏳ Phase 10.5**: Integration & testing (pending)

## Related Documentation

- [Phase 10: Unified SSR Architecture](../phases/phase-10-unified-ssr-architecture.md)
- [ADR-007: Framework Integration](./ADR-007-framework-integration.md)
- [ADR-013: TypeScript Interfaces](./ADR-013-typescript-interfaces.md)
- [createUnifiedWrapper.tsx](../../src/integrations/react/utils/createUnifiedWrapper.tsx)

---

**This ADR eliminates the SSR/client divide entirely - one component API that works everywhere, automatically optimized for each environment.**