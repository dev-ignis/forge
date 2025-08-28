# ADR-007: Framework Integration Strategy

## Status
**Accepted**

## Context
While Web Components are theoretically framework-agnostic, practical integration with popular frameworks (React, Vue, Angular) presents challenges:

**React Challenges:**
- Synthetic event system doesn't naturally work with CustomEvents
- Props vs attributes confusion
- Ref forwarding complexity
- React's reconciliation doesn't understand Web Component properties

**Vue Challenges:**
- v-model doesn't work out-of-the-box with Web Components
- Slot content handling differences
- Style scoping conflicts

**Angular Challenges:**
- Form integration requires custom ControlValueAccessor
- Change detection doesn't track Web Component changes
- Event binding syntax differences

Without proper integration utilities, developers face friction when using Web Components in their framework of choice, potentially limiting adoption.

## Decision
We will provide **thin framework-specific wrapper utilities** that enhance the developer experience while maintaining the core Web Components as the single source of truth.

### Integration Strategy:
1. **Core Components**: Pure Web Components using Lit (framework-agnostic)
2. **Optional Wrappers**: Lightweight utilities for each framework
3. **Not Required**: Components work without wrappers, but DX is better with them
4. **No Duplication**: Wrappers are thin layers, not reimplementations

## Consequences

### Positive Consequences
- **Better DX**: Framework-specific patterns work as expected
- **Type Safety**: Full TypeScript support in each framework
- **Maintainability**: Single implementation, multiple consumption patterns
- **Gradual Adoption**: Wrappers can be added/removed without breaking changes
- **Performance**: Minimal overhead from thin wrappers
- **Documentation**: Framework-specific examples and guides

### Negative Consequences
- **Additional Packages**: Separate packages to maintain for each framework
- **Version Synchronization**: Wrapper versions must align with core
- **Testing Overhead**: Each wrapper needs its own test suite
- **Documentation Burden**: Multiple sets of documentation
- **Learning Curve**: Contributors need to understand multiple frameworks

## React Integration

### React Wrapper Utility
```typescript
// @forge/react/wrapper.tsx
import React, { useRef, useEffect, useLayoutEffect } from 'react';

export function createComponent<T extends HTMLElement>(
  tagName: string,
  events?: string[]
) {
  return React.forwardRef<T, any>((props, ref) => {
    const elementRef = useRef<T>(null);
    
    // Sync props to Web Component
    useLayoutEffect(() => {
      const element = elementRef.current;
      if (!element) return;
      
      Object.entries(props).forEach(([key, value]) => {
        if (key === 'children' || key === 'ref') return;
        if (key.startsWith('on') && events?.includes(key.slice(2).toLowerCase())) {
          // Handle events
          const eventName = key.slice(2).toLowerCase();
          element.addEventListener(eventName, value as EventListener);
        } else {
          // Set property (not attribute)
          (element as any)[key] = value;
        }
      });
    });
    
    // Forward ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(elementRef.current);
        } else {
          ref.current = elementRef.current;
        }
      }
    });
    
    return React.createElement(tagName, {
      ref: elementRef,
      suppressHydrationWarning: true
    }, props.children);
  });
}

// Usage
export const Button = createComponent<MyButtonElement>('my-button', ['click']);
```

### React Package Structure
```
@forge/react/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── hooks/
│   │   └── useWebComponent.ts
│   └── index.ts
└── package.json
```

## Vue Integration

### Vue Plugin
```typescript
// @forge/vue/plugin.ts
import { App, defineCustomElement } from 'vue';

export function ForgeUI(app: App) {
  // Register all components
  const components = import.meta.glob('./components/*.ce.vue');
  
  Object.entries(components).forEach(([path, component]) => {
    const name = path.match(/\.\/components\/(.*)\.ce\.vue$/)?.[1];
    if (name) {
      app.component(`Forge${name}`, defineCustomElement(component));
    }
  });
  
  // Add v-model support
  app.config.compilerOptions.isCustomElement = (tag) => 
    tag.startsWith('my-');
}

// Usage in Vue app
import { createApp } from 'vue';
import { ForgeUI } from '@forge/vue';

const app = createApp(App);
app.use(ForgeUI);
```

### Vue Composable
```typescript
// @forge/vue/composables/useWebComponent.ts
import { ref, watchEffect } from 'vue';

export function useWebComponent(element: Ref<HTMLElement | null>) {
  const props = ref({});
  
  watchEffect(() => {
    if (!element.value) return;
    
    Object.entries(props.value).forEach(([key, value]) => {
      (element.value as any)[key] = value;
    });
  });
  
  return {
    setProps: (newProps: Record<string, any>) => {
      props.value = newProps;
    }
  };
}
```

## Angular Integration

### Angular Module
```typescript
// @forge/angular/forge-ui.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Directive for better property binding
@Directive({
  selector: 'my-button, my-input, my-modal'
})
export class WebComponentDirective implements OnInit {
  @Input() set props(value: any) {
    Object.assign(this.elementRef.nativeElement, value);
  }
  
  constructor(private elementRef: ElementRef) {}
}

@NgModule({
  declarations: [WebComponentDirective],
  imports: [CommonModule],
  exports: [WebComponentDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForgeUIModule {}
```

### Form Integration
```typescript
// @forge/angular/form-integration.ts
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'my-input',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputValueAccessor),
    multi: true
  }]
})
export class InputValueAccessor implements ControlValueAccessor {
  onChange = (_: any) => {};
  onTouched = () => {};
  
  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;
    element.addEventListener('input', (e: CustomEvent) => {
      this.onChange(e.detail.value);
    });
  }
  
  writeValue(value: any): void {
    this.elementRef.nativeElement.value = value;
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
```

## Alternatives Considered

### 1. No Framework Support
- **Pros**: Simpler maintenance, truly agnostic
- **Cons**: Poor DX, limited adoption, integration friction

### 2. Full Framework Components
- **Pros**: Native experience in each framework
- **Cons**: Multiple implementations, maintenance nightmare, defeats purpose

### 3. Automatic Wrapper Generation
- **Pros**: Less manual work
- **Cons**: Complex tooling, hard to customize, debugging issues

### 4. Single Wrapper Library
- **Pros**: One package to maintain
- **Cons**: Bloated package, unnecessary dependencies

## Package Distribution Strategy

```json
// Root package.json
{
  "name": "@forge/ui",
  "exports": {
    ".": "./dist/index.js",
    "./react": "./packages/react/dist/index.js",
    "./vue": "./packages/vue/dist/index.js",
    "./angular": "./packages/angular/dist/index.js"
  }
}
```

## Testing Requirements

Each framework wrapper must include:
1. Integration tests with the target framework
2. Type definition tests
3. Event handling tests
4. Prop synchronization tests
5. Lifecycle compatibility tests

## Documentation Strategy

### Framework-Specific Guides
1. Getting started guide for each framework
2. Migration guides from popular libraries
3. CodeSandbox examples
4. Framework-specific best practices
5. Troubleshooting guides

### Example Documentation Structure
```
docs/
├── getting-started/
│   ├── vanilla.md
│   ├── react.md
│   ├── vue.md
│   └── angular.md
├── migration/
│   ├── from-material-ui.md
│   ├── from-vuetify.md
│   └── from-ng-bootstrap.md
└── examples/
    ├── react-nextjs/
    ├── vue-nuxt/
    └── angular-universal/
```

## Success Metrics
- Framework integration tests passing: 100%
- Developer satisfaction per framework: >4.5/5
- Bundle size overhead from wrappers: <2KB
- Type safety coverage: 100%
- Framework-specific bug reports: <5% of total

## References
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/)
- [Web Components in React](https://reactjs.org/docs/web-components.html)
- Implementation roadmap: `/plans/implementation-roadmap.md`
- Related: ADR-001 (Web Components), ADR-006 (State Management)