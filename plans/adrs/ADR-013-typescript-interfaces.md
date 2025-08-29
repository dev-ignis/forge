# ADR-013: TypeScript Interfaces and Type Definitions

## Status
**Accepted** - Implemented August 29, 2025

## Context

As we build a production-ready component library, we need to ensure:
1. Strong type safety for component consumers
2. Excellent developer experience with IntelliSense
3. Framework integration compatibility (React, Vue, Angular)
4. Consistent API contracts across all components
5. Clear documentation through types
6. Maintainable and extensible type system

The initial implementation used inline type definitions directly in component properties, which limited reusability and made it harder to maintain consistent types across components.

## Decision

We will implement a comprehensive type system with proper interfaces for all components, following these principles:

### 1. Centralized Type Definitions
- Create a `src/types/` directory for all type definitions
- Separate common types from component-specific types
- Export all types from the main package entry point

### 2. Interface Hierarchy
```typescript
// Base interfaces that all components extend
ForgeComponentBase -> ForgeInteractive -> Component-specific interface

// Example:
interface ForgeButtonProps extends ForgeInteractive {
  variant?: ButtonVariant;
  size?: ButtonSize;
  // ... component-specific props
}
```

### 3. Type Categories

#### Common Types
- `ComponentSize`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `ComponentVariant`: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
- `ComponentState`: 'default' | 'hover' | 'focus' | 'active' | 'disabled'
- `ComponentAlignment`: 'start' | 'center' | 'end' | 'stretch'
- `ComponentOrientation`: 'horizontal' | 'vertical'

#### Component-Specific Types
Each component should have:
- Props interface (e.g., `ForgeButtonProps`)
- Event detail interfaces (e.g., `ForgeButtonEventDetail`)
- Events interface (e.g., `ForgeButtonEvents`)
- Specific type unions (e.g., `ButtonVariant`, `ButtonSize`)

#### Utility Types
- Type guards for runtime validation
- Helper functions for type-safe operations
- Builder utilities (e.g., `ClassBuilder`)

### 4. File Structure
```
src/
├── types/
│   ├── index.ts              # Main type exports
│   └── component-types.ts    # Utility types and helpers
├── components/
│   └── atoms/
│       └── button/
│           ├── button.ts
│           ├── button.types.ts  # Component-specific types
│           ├── button.test.ts
│           └── index.ts
```

### 5. Component Implementation
```typescript
// button.types.ts
export interface ForgeButtonProps extends ForgeInteractive {
  variant?: ButtonVariant;
  size?: ButtonSize;
  // ...
}

// button.ts
import type { ForgeButtonProps, ForgeButtonEventDetail } from './button.types';

@customElement('forge-button')
export class ForgeButton extends BaseElement implements ForgeButtonProps {
  @property({ type: String }) variant: ButtonVariant = 'primary';
  // ...
}
```

### 6. Event Type Safety
```typescript
// Define event detail
export interface ForgeButtonEventDetail {
  variant: ButtonVariant;
  size: ButtonSize;
}

// Type-safe event creation
const detail: ForgeButtonEventDetail = {
  variant: this.variant,
  size: this.size
};
this.emit('click', detail);
```

### 7. Consumer Usage
```typescript
import type { ForgeButton, ButtonVariant, ForgeButtonEventDetail } from '@ignis/forge';

const button = document.createElement('forge-button') as ForgeButton;
const variant: ButtonVariant = 'primary';
button.variant = variant;

button.addEventListener('click', (e: CustomEvent<ForgeButtonEventDetail>) => {
  console.log(e.detail.variant, e.detail.size);
});
```

## Consequences

### Positive
- **Type Safety**: Full TypeScript support with compile-time checking
- **IntelliSense**: Excellent IDE support with auto-completion
- **Documentation**: Types serve as living documentation
- **Framework Integration**: Easy to create typed wrappers for React/Vue/Angular
- **Consistency**: Enforced consistent API across all components
- **Maintainability**: Changes to types are caught at compile time
- **Reusability**: Common types can be shared across components
- **Testing**: Type guards enable runtime validation

### Negative
- **Build Complexity**: Additional compilation step for type definitions
- **Learning Curve**: Developers need to understand the type hierarchy
- **Maintenance Overhead**: Types need to be kept in sync with implementation
- **Bundle Size**: Type definitions add to package size (mitigated by tree-shaking)

### Neutral
- **Migration Path**: Existing components need to be updated to use interfaces
- **Generator Updates**: Component generator must create type files

## Implementation Requirements

### Component Generator Updates
The component generator (`scripts/generate-component.js`) must:
1. Create a `.types.ts` file for each component
2. Generate proper interface extending `ForgeComponentBase` or `ForgeInteractive`
3. Import and implement the interface in the component class
4. Export types from component's index file

### Build Configuration
- TypeScript must generate declaration files (`*.d.ts`)
- Type definitions must be included in the NPM package
- Source maps should be generated for debugging

### Testing Requirements
- Type guards should have unit tests
- Build process should validate type exports
- Example TypeScript consumer file should compile without errors

## Validation Checklist

- [ ] All components have corresponding `.types.ts` files
- [ ] Common types are centralized in `src/types/`
- [ ] All types are exported from main package entry
- [ ] Component generator creates type files
- [ ] TypeScript consumer can import and use types
- [ ] IDE IntelliSense works correctly
- [ ] Type definitions are included in NPM package
- [ ] Documentation includes type information

## Migration Strategy

1. **Phase 1**: Create type infrastructure (COMPLETED)
   - Set up `src/types/` directory
   - Create common type definitions
   - Update build configuration

2. **Phase 2**: Update existing components (COMPLETED)
   - Add `.types.ts` file for Button component
   - Update Button to implement interface
   - Export types from main index

3. **Phase 3**: Update tooling (COMPLETED)
   - Update component generator
   - Add type validation to build process
   - Create TypeScript consumer test

4. **Phase 4**: Apply to new components (ONGOING)
   - All new components use interfaces from the start
   - Maintain type consistency across library

## References

- [TypeScript Handbook - Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [TypeScript Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
- [Web Components Type Definitions](https://github.com/webcomponents/custom-elements-manifest)
- [Lit TypeScript Guide](https://lit.dev/docs/typescript/overview/)

## Review Notes

*Implemented during Day 2 session. The type system provides excellent developer experience and will be crucial for framework integrations. The overhead is minimal compared to the benefits gained.*