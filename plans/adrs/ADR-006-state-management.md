# ADR-006: State Management Architecture

## Status
**Accepted**

## Context
State management in a framework-agnostic component library requires careful consideration of:
- Component internal state (UI state)
- Application state integration (business logic)
- Framework compatibility (React state, Vue reactivity, Angular observables)
- Performance implications
- Developer experience

The challenge is to create components that:
- Manage their own UI state efficiently
- Remain agnostic to application state management solutions
- Integrate seamlessly with different framework state patterns
- Follow a predictable, unidirectional data flow

Components must work with various state management approaches:
- React: useState, useReducer, Context, Redux, Zustand
- Vue: ref, reactive, Pinia, Vuex
- Angular: Services, RxJS, NgRx
- Vanilla JS: No framework state management

## Decision
We will implement a **strict separation between local UI state and application state**, following a **"properties down, events up"** pattern.

### State Management Strategy:
1. **Local State**: Managed internally using Lit's reactive properties
2. **Application State**: Received via properties, changes requested via events
3. **No External Dependencies**: No dependency on state management libraries
4. **Controlled/Uncontrolled**: Support both patterns where applicable

## Consequences

### Positive Consequences
- **Framework Independence**: No coupling to specific state management solutions
- **Predictable Data Flow**: Clear, unidirectional data flow pattern
- **Performance**: Efficient reactive updates via Lit's rendering system
- **Simplicity**: Components remain "dumb" presentation layers
- **Testability**: Easy to test with simple prop/event assertions
- **Flexibility**: Applications can use any state management pattern

### Negative Consequences
- **Boilerplate**: More event handling code in consuming applications
- **Complexity**: Controlled/uncontrolled duality adds complexity
- **Learning Curve**: Developers must understand the event-based pattern
- **Integration Work**: Framework wrappers may need state adapters

## State Categories

### 1. Local UI State (Component-Owned)
```typescript
class MyDropdown extends LitElement {
  // UI state managed internally
  @state()
  private _isOpen = false;
  
  @state()
  private _highlightedIndex = -1;
  
  private toggleOpen() {
    this._isOpen = !this._isOpen;
    // Notify consumers of state change
    this.dispatchEvent(new CustomEvent('toggle', {
      detail: { isOpen: this._isOpen },
      bubbles: true,
      composed: true
    }));
  }
}
```

### 2. Application State (Consumer-Owned)
```typescript
class MyInput extends LitElement {
  // Application state received as property
  @property()
  value = '';
  
  private handleInput(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    // Request state change via event
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: newValue },
      bubbles: true,
      composed: true
    }));
  }
  
  render() {
    return html`
      <input 
        .value=${this.value}
        @input=${this.handleInput}
      />
    `;
  }
}
```

### 3. Controlled vs Uncontrolled Components
```typescript
class MyToggle extends LitElement {
  // Support both controlled and uncontrolled usage
  @property({ type: Boolean })
  checked?: boolean;  // Controlled if provided
  
  @state()
  private _internalChecked = false;  // Uncontrolled state
  
  get isChecked() {
    return this.checked !== undefined 
      ? this.checked 
      : this._internalChecked;
  }
  
  private handleToggle() {
    if (this.checked === undefined) {
      // Uncontrolled mode: update internal state
      this._internalChecked = !this._internalChecked;
    }
    
    // Always emit event for consumer handling
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: !this.isChecked },
      bubbles: true,
      composed: true
    }));
  }
}
```

## Alternatives Considered

### 1. Built-in State Management Library
- **Pros**: Powerful state management capabilities
- **Cons**: Adds dependency, may conflict with app state management

### 2. Two-way Data Binding
- **Pros**: Simpler API, less boilerplate
- **Cons**: Breaks unidirectional flow, harder to debug, framework-specific

### 3. State Adapters per Framework
- **Pros**: Native feel in each framework
- **Cons**: Maintenance burden, inconsistent behavior

### 4. MobX/XState Integration
- **Pros**: Powerful state machines, reactive patterns
- **Cons**: Large dependencies, learning curve, overkill for most components

## Framework Integration Patterns

### React Integration
```jsx
function MyApp() {
  const [value, setValue] = useState('');
  
  return (
    <my-input
      value={value}
      onInput={(e) => setValue(e.detail.value)}
    />
  );
}
```

### Vue Integration
```vue
<template>
  <my-input 
    :value="value"
    @input="value = $event.detail.value"
  />
</template>

<script setup>
import { ref } from 'vue';
const value = ref('');
</script>
```

### Angular Integration
```typescript
@Component({
  template: `
    <my-input 
      [value]="value"
      (input)="onInput($event)"
    ></my-input>
  `
})
export class MyComponent {
  value = '';
  
  onInput(event: CustomEvent) {
    this.value = event.detail.value;
  }
}
```

## Complex State Scenarios

### When to Consider External State Management
Only for exceptionally complex components (e.g., data grids, rich text editors):

```typescript
// Only if absolutely necessary
import { atom } from 'xoid';  // Minimal, framework-agnostic

class ComplexDataGrid extends LitElement {
  private gridState = atom({
    sortColumn: null,
    sortDirection: 'asc',
    filters: {},
    selectedRows: [],
    expandedRows: []
  });
  
  // Still expose changes via events
  private updateSort(column: string) {
    this.gridState.update(state => ({
      ...state,
      sortColumn: column
    }));
    
    this.dispatchEvent(new CustomEvent('sort-change', {
      detail: this.gridState.value
    }));
  }
}
```

## Best Practices
1. **Keep Components Stateless**: Prefer stateless components when possible
2. **Document State Behavior**: Clearly indicate controlled vs uncontrolled
3. **Consistent Event Names**: Use standard event names (change, input, click)
4. **Event Detail Structure**: Keep event details flat and simple
5. **Avoid Side Effects**: Components should not modify external state directly
6. **Predictable Defaults**: Sensible defaults for uncontrolled mode

## Testing Considerations
```typescript
// Easy to test with props and events
it('emits change event when toggled', async () => {
  const el = await fixture(html`<my-toggle></my-toggle>`);
  const spy = sinon.spy();
  el.addEventListener('change', spy);
  
  el.click();
  
  expect(spy).to.have.been.calledOnce;
  expect(spy.args[0][0].detail.checked).to.be.true;
});
```

## References
- [Lit Reactive Properties](https://lit.dev/docs/components/properties/)
- [Custom Events MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
- Component architecture plan: `/plans/component-architecture.md`
- Related: ADR-001 (Web Components), ADR-007 (Framework Integration)