# ADR-015: Atomic Design Composition Pattern

**Status**: Accepted  
**Date**: 2025-01-02  
**Decision Makers**: Development Team  

## Context

As our component library grows, we need clear architectural guidelines for how components at different levels of the atomic design hierarchy should interact. Specifically, we need to establish whether molecules should use atoms as building blocks, or if they should be self-contained implementations.

During the development of the DatePicker molecule, we encountered issues with Lit template processing when using native HTML elements. This led to a critical decision point about component composition.

## Decision

**Molecules MUST use Atoms as their building blocks whenever an appropriate atom exists.**

This follows the atomic design methodology where:
- **Atoms** are the basic building blocks (Button, Input, Select, Icon, etc.)
- **Molecules** are groups of atoms functioning together as a unit
- **Organisms** are groups of molecules and/or atoms forming distinct sections

## Rationale

### 1. Consistency
Using atoms ensures consistent behavior and styling across all components. When a button appears in a Dropdown, Modal, or DatePicker, it should look and behave identically.

### 2. Maintainability
Bug fixes and improvements to atoms automatically propagate to all molecules using them. Fix once, benefit everywhere.

### 3. Testing Efficiency
Atoms are tested independently. Molecules only need to test the integration logic, not the atomic functionality.

### 4. Bundle Size Optimization
Reusing atoms prevents code duplication, resulting in smaller bundle sizes.

### 5. Framework Compliance
This approach aligns with established atomic design principles used by major design systems (Material Design, Ant Design, Carbon).

## Implementation Guidelines

### Required Atom Usage

Molecules MUST use these atoms when applicable:

| Functionality | Use Atom | Instead of |
|--------------|----------|------------|
| Buttons | `ForgeButton` | `<button>` |
| Text inputs | `ForgeInput` | `<input type="text">` |
| Selections | `ForgeSelect` | `<select>` |
| Icons | `ForgeIcon` | SVG or icon fonts |
| Checkboxes | `ForgeCheckbox` | `<input type="checkbox">` |
| Radio buttons | `ForgeRadio` | `<input type="radio">` |
| Switches | `ForgeSwitch` | Custom toggle |
| Badges | `ForgeBadge` | Custom badge |

### Current Implementation Status

✅ **Correctly Using Atoms:**
- `DatePicker`: Uses ForgeInput, ForgeSelect, ForgeIcon
- `FormField`: Uses ForgeInput
- `MultiSelect`: Uses ForgeInput, ForgeCheckbox, ForgeIcon

⚠️ **Need Refactoring:**
- `Dropdown`: Should use ForgeButton for trigger
- `Modal`: Should use ForgeButton for close/action buttons

### Example: DatePicker Implementation

```typescript
// ✅ CORRECT: Using atoms
import '../../atoms/input/input';
import '../../atoms/select/select';
import '../../atoms/icon/icon';

class ForgeDatePicker extends BaseElement {
  render() {
    return html`
      <forge-input
        type="text"
        .value=${this.inputValue}
        @click=${this.toggleCalendar}
      ></forge-input>
      
      <forge-select
        .options=${this.monthOptions}
        @forge-change=${this.handleMonthChange}
      ></forge-select>
      
      <forge-icon name="calendar"></forge-icon>
    `;
  }
}
```

```typescript
// ❌ WRONG: Reimplementing atom functionality
class ForgeDatePicker extends BaseElement {
  render() {
    return html`
      <!-- Don't do this - use ForgeInput instead -->
      <input 
        type="text" 
        class="custom-input"
        @click=${this.toggleCalendar}
      />
      
      <!-- Don't do this - use ForgeSelect instead -->
      <select class="custom-select">
        ${this.months.map(m => html`<option>${m}</option>`)}
      </select>
    `;
  }
}
```

## Consequences

### Positive
- **Consistency**: Uniform look and behavior across all components
- **Reduced Maintenance**: Fixes propagate automatically
- **Smaller Bundles**: No duplicate implementations
- **Faster Development**: Reuse existing, tested atoms
- **Better Testing**: Isolated unit tests for atoms, integration tests for molecules

### Negative
- **Dependency Management**: Molecules depend on atom APIs remaining stable
- **Learning Curve**: Developers must understand the atom library
- **Potential Over-abstraction**: Some simple cases might feel over-engineered

## Exceptions

Molecules MAY implement custom elements when:
1. No suitable atom exists for the required functionality
2. The functionality is molecule-specific and wouldn't benefit other components
3. Performance requirements demand a specialized implementation

Any exceptions should be documented in the component's documentation.

## Migration Plan

1. **Phase 1** (Immediate): New molecules must follow this pattern
2. **Phase 2** (Q1 2025): Refactor Dropdown to use ForgeButton
3. **Phase 3** (Q1 2025): Refactor Modal to use ForgeButton
4. **Phase 4** (Q2 2025): Audit all molecules for compliance

## References

- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [Component Composition in Web Components](https://developers.google.com/web/fundamentals/web-components/customelements)
- Issue #[DatePicker Template Errors] - Real-world example of why this pattern matters

## Decision Log

- 2025-01-02: Initial decision based on DatePicker implementation experience
- 2025-01-02: Identified Dropdown and Modal as needing refactoring