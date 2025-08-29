# Theming Integration Plan

## Executive Summary
This plan outlines the integration of the advanced theming strategy into the Forge UI development flow, treating CSS Custom Properties as a stable API and providing both manual theming and Tailwind CSS plugin options.

## Integration Timeline

### Phase 0: Foundation Setup (Week 1-2) - UPDATED
**When:** Immediately after Day 1 technical setup
**Priority:** Critical - Must be completed before any component development

#### Day 1 Additions:
- Define initial CSS Custom Properties token system
- Create base token categories:
  - Colors: `--forge-color-*`
  - Typography: `--forge-font-*`
  - Spacing: `--forge-spacing-*`
  - Borders: `--forge-border-*`
  - Shadows: `--forge-shadow-*`

#### Day 2 Additions:
- Implement token inheritance strategy
- Create default fallback values
- Document token naming conventions
- Set up token documentation generator

### Phase 0.5: Token API Foundation (NEW - Week 2)
**When:** Before first component implementation
**Duration:** 3 days

#### Day 6-7: Token API Definition
- Formalize complete `--forge-*` custom properties list
- Create TypeScript interfaces for token categories
- Generate token documentation
- Create token validation utilities

#### Day 8: Base Component Integration
- Update BaseElement class to support theming
- Add theme observation capabilities
- Implement CSS variable injection helpers
- Create theme testing utilities

### Phase 1: Component Token Integration (Week 3-6)
**When:** During atomic component development
**Approach:** Every component uses tokens from day one

#### Component Development Process:
1. No hardcoded colors, spacing, or typography
2. All styles use `var(--forge-*)` with fallbacks
3. Document token dependencies per component
4. Create component-specific token extensions if needed

Example for Button Component:
```css
.button {
  background-color: var(--forge-color-primary, #2563eb);
  color: var(--forge-color-on-primary, #ffffff);
  padding: var(--forge-spacing-sm) var(--forge-spacing-md);
  border-radius: var(--forge-border-radius-md);
  font-family: var(--forge-font-family);
}
```

### Phase 2: Tailwind Plugin Development (Week 7-8)
**When:** Early in molecule component phase
**Duration:** 1 week

#### Week 7: Plugin Development
- Create `@forge/tailwind-plugin` package
- Implement config parsing logic
- Build CSS generation engine
- Add theme mapping capabilities
- Create plugin test suite

#### Week 8: Plugin Testing & Documentation
- Test with various Tailwind configurations
- Create example projects
- Write plugin documentation
- Build migration guides

### Phase 3: Theme Testing Infrastructure (Week 9)
**When:** Alongside modal/dialog development
**Duration:** 3 days

- Visual regression testing for themes
- Theme switching test scenarios
- Performance benchmarks for CSS variables
- Cross-browser theme testing
- Accessibility validation for all themes

## Implementation Details

### 1. Token API Structure
```typescript
// src/theming/tokens.ts
export interface ForgeTokens {
  colors: {
    primary: string;
    secondary: string;
    surface: string;
    'on-surface': string;
    // ... complete list
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    'font-family': string;
    'font-size-sm': string;
    'font-size-md': string;
    'font-size-lg': string;
  };
  borders: {
    'radius-sm': string;
    'radius-md': string;
    'radius-lg': string;
  };
}
```

### 2. BaseElement Theme Support
```typescript
// Updates to BaseElement class
export class BaseElement extends LitElement {
  // Existing code...
  
  protected getToken(token: string, fallback?: string): string {
    return `var(--forge-${token}${fallback ? `, ${fallback}` : ''})`;
  }
  
  protected observeTheme(): void {
    // Watch for theme changes if needed
  }
}
```

### 3. Tailwind Plugin Architecture
```javascript
// packages/tailwind-plugin/src/index.js
module.exports = function forgePlugin(options = {}) {
  return {
    handler: ({ addBase, theme }) => {
      const tokens = mapThemeToTokens(theme, options.themeMap);
      addBase({
        ':root': tokens
      });
    }
  };
};
```

### 4. Documentation Structure
- `/docs/theming/README.md` - Overview
- `/docs/theming/tokens.md` - Complete token reference
- `/docs/theming/manual-theming.md` - CSS file approach
- `/docs/theming/tailwind-plugin.md` - Plugin usage
- `/docs/theming/migration.md` - Migration from other systems

## Testing Strategy

### Unit Tests
- Token generation accuracy
- Fallback value resolution
- Plugin configuration parsing
- Theme inheritance

### Integration Tests
- Component rendering with custom themes
- Theme switching behavior
- Framework integration with themes
- Build output validation

### Visual Tests
- Screenshot comparison across themes
- Responsive behavior with themes
- Dark mode validation
- High contrast compliance

## Success Criteria

1. **Token Coverage**: 100% of visual properties use tokens
2. **Plugin Adoption**: Works with 90% of Tailwind configs
3. **Performance**: <1ms theme switching time
4. **Documentation**: Every token documented with examples
5. **Testing**: 95% test coverage for theming code
6. **Developer Experience**: Theme creation in <10 minutes

## Migration Path

### For Existing Components
1. Audit all hardcoded values
2. Map to appropriate tokens
3. Add fallbacks for safety
4. Test with multiple themes
5. Update documentation

### For New Components
1. Start with tokens only
2. Never hardcode values
3. Document token dependencies
4. Test with theme variations

## Rollout Strategy

### Phase 1: Internal Testing (Week 2-3)
- Apply to Button component
- Create 3 example themes
- Gather feedback

### Phase 2: Expand Coverage (Week 4-6)
- Apply to all atomic components
- Release alpha Tailwind plugin
- Create theme gallery

### Phase 3: Production Release (Week 7-8)
- Finalize token API
- Release stable plugin
- Publish migration guides

## Risk Mitigation

### Risk: Token API Changes
- **Mitigation**: Version tokens separately, support deprecation

### Risk: Performance Impact
- **Mitigation**: Benchmark every component, optimize critical paths

### Risk: Browser Compatibility
- **Mitigation**: Test CSS variable support, provide polyfills

### Risk: Developer Confusion
- **Mitigation**: Extensive documentation, clear examples, migration tools

## Dependencies

- ADR-002: Shadow DOM Encapsulation
- ADR-003: CSS Custom Properties Theming
- ADR-008: Component API Design
- Quick Start Guide token definitions
- BaseElement implementation

## Next Steps

1. Review and approve this plan
2. Update implementation-roadmap.md
3. Create token definition file
4. Update BaseElement class
5. Begin Button component migration
6. Start Tailwind plugin development