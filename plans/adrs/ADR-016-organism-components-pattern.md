# ADR-016: Organism Components Pattern

**Status**: Accepted  
**Date**: 2024-01-20  
**Decision Makers**: Development Team  

## Context

Following the successful implementation of atoms (ADR-001) and molecules (ADR-015), we need to establish architectural patterns for organism components. Organisms are complex UI components that combine multiple atoms and molecules to create complete interface sections like navigation bars, data tables, and complex forms.

Organism components present unique challenges:
- Higher complexity with multiple interaction patterns
- Need to manage significant internal state
- Must coordinate between multiple child components
- Handle large datasets and performance-critical operations
- Provide complete, production-ready interface patterns

## Decision

We will implement organism components following these architectural principles:

### 1. Composition Architecture

**Organisms MUST compose atoms and molecules as their building blocks:**

```typescript
// ✅ GOOD: Organism using atoms and molecules
class ForgeNavigationBar extends BaseElement {
  render() {
    return html`
      <forge-button>Menu</forge-button>
      <forge-dropdown .items=${menuItems}>
        <forge-button slot="trigger">User</forge-button>
      </forge-dropdown>
    `;
  }
}

// ❌ BAD: Organism using native elements when atoms exist
class ForgeNavigationBar extends BaseElement {
  render() {
    return html`
      <button>Menu</button>  <!-- Should use ForgeButton -->
      <div class="dropdown">...</div>  <!-- Should use ForgeDropdown -->
    `;
  }
}
```

**Exception**: Native HTML elements are acceptable for:
- Semantic structural elements (`<nav>`, `<main>`, `<section>`, `<article>`)
- Table structure (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`)
- Lists (`<ul>`, `<ol>`, `<li>`)
- Layout containers (`<div>`, `<span>`) when no semantic element exists

### 2. State Management Patterns

**Organisms handle complex state using:**

```typescript
interface OrganismState {
  // UI state
  @state() private expandedItems = new Set<string>();
  @state() private selectedRows = new Set<string>();
  @state() private sortColumn: string;
  @state() private sortDirection: 'asc' | 'desc';
  
  // Data state
  @property({ type: Array }) data: any[] = [];
  @property({ type: Number }) currentPage = 1;
  
  // Configuration state
  @property({ type: String }) mode: 'default' | 'compact' | 'comfortable';
  @property({ type: Boolean }) virtualScrolling = false;
}
```

### 3. Performance Requirements

**Organisms MUST implement performance optimizations:**

```typescript
class ForgeDataTable extends BaseElement {
  // Virtual scrolling for large datasets
  private virtualScroller = new VirtualScroller();
  
  // Debounced operations
  private debouncedSort = debounce(this.performSort, 300);
  
  // Progressive rendering
  private renderRows() {
    if (this.rows.length > 1000) {
      return this.renderVirtual();
    }
    return this.renderStandard();
  }
  
  // Lazy loading
  @property({ type: Boolean }) lazyLoad = true;
  
  // Performance mode
  @property({ type: String }) performanceMode: 'auto' | 'fast' | 'quality' = 'auto';
}
```

### 4. Data Handling Patterns

**Organisms that handle data MUST support:**

```typescript
interface DataHandlingOrganism {
  // Data input
  @property({ type: Array }) data: any[];
  @property({ type: Function }) dataProvider?: () => Promise<any[]>;
  
  // Pagination
  @property({ type: Number }) pageSize: number;
  @property({ type: Number }) currentPage: number;
  
  // Sorting
  @property({ type: String }) sortBy?: string;
  @property({ type: String }) sortDirection?: 'asc' | 'desc';
  
  // Filtering
  @property({ type: Object }) filters?: Record<string, any>;
  
  // Selection
  @property({ type: Array }) selectedItems: any[];
  @property({ type: String }) selectionMode: 'none' | 'single' | 'multiple';
}
```

### 5. Responsive Design Patterns

**Organisms MUST implement responsive strategies:**

```typescript
class ResponsiveOrganism extends BaseElement {
  @property({ type: String }) responsiveMode: 'auto' | 'stack' | 'scroll' | 'hide' = 'auto';
  
  private mediaQueries = {
    mobile: '(max-width: 768px)',
    tablet: '(max-width: 1024px)',
    desktop: '(min-width: 1025px)'
  };
  
  private handleResponsive() {
    if (window.matchMedia(this.mediaQueries.mobile).matches) {
      this.applyMobileLayout();
    } else if (window.matchMedia(this.mediaQueries.tablet).matches) {
      this.applyTabletLayout();
    } else {
      this.applyDesktopLayout();
    }
  }
}
```

### 6. Event Architecture

**Organisms emit high-level, semantic events:**

```typescript
// Events describe business actions, not UI interactions
this.dispatchEvent(new CustomEvent('itemselect', {
  detail: { item, index, selected: true },
  bubbles: true,
  composed: true
}));

this.dispatchEvent(new CustomEvent('sortchange', {
  detail: { column, direction },
  bubbles: true,
  composed: true
}));

this.dispatchEvent(new CustomEvent('pagechange', {
  detail: { page, previousPage },
  bubbles: true,
  composed: true
}));
```

### 7. Accessibility Requirements

**Organisms MUST provide complete accessibility:**

```typescript
class AccessibleOrganism extends BaseElement {
  // Keyboard navigation
  private handleKeyboard(e: KeyboardEvent) {
    switch(e.key) {
      case 'Tab': this.handleTabNavigation(e);
      case 'Enter': this.handleEnterKey(e);
      case 'Escape': this.handleEscape(e);
      case 'ArrowUp': this.navigatePrevious(e);
      case 'ArrowDown': this.navigateNext(e);
    }
  }
  
  // Focus management
  private trapFocus() {
    this.focusableElements = this.getFocusableElements();
    this.firstFocusable?.focus();
  }
  
  // ARIA live regions
  private announceChange(message: string) {
    this.liveRegion.textContent = message;
  }
  
  // Landmark roles
  render() {
    return html`
      <nav role="navigation" aria-label="Main">
        ...
      </nav>
    `;
  }
}
```

### 8. Configuration Patterns

**Organisms support multiple configuration modes:**

```typescript
interface OrganismConfiguration {
  // Display modes
  mode: 'default' | 'compact' | 'comfortable' | 'dense';
  
  // Feature flags
  features: {
    sorting?: boolean;
    filtering?: boolean;
    selection?: boolean;
    pagination?: boolean;
    virtualization?: boolean;
  };
  
  // Performance settings
  performance: {
    virtualThreshold: number;
    debounceDelay: number;
    lazyLoad: boolean;
  };
}
```

### 9. Testing Requirements

**Organisms require comprehensive testing:**

```typescript
describe('OrganismComponent', () => {
  // Performance tests
  it('should handle 10,000 items efficiently');
  it('should render in under 16ms');
  it('should not leak memory');
  
  // Interaction tests
  it('should handle complex user flows');
  it('should manage keyboard navigation');
  it('should maintain focus correctly');
  
  // Responsive tests
  it('should adapt to mobile viewport');
  it('should stack on small screens');
  
  // Integration tests
  it('should work with child atoms/molecules');
  it('should emit correct events');
});
```

## Consequences

### Positive
- **Consistency**: Uniform patterns across all complex components
- **Performance**: Built-in optimizations for large datasets
- **Reusability**: Complete interface patterns ready for production
- **Accessibility**: Comprehensive keyboard and screen reader support
- **Maintainability**: Clear separation between organisms and simpler components

### Negative
- **Complexity**: Organisms are inherently complex components
- **Bundle Size**: Larger components with more dependencies
- **Testing Overhead**: Require extensive testing for all scenarios
- **Performance Risk**: Must carefully manage render performance

### Neutral
- **Learning Curve**: Developers need to understand composition patterns
- **Documentation**: Requires extensive documentation for configuration
- **Framework Integration**: May need wrappers for framework-specific features

## Implementation Guidelines

### DO:
- ✅ Compose with atoms and molecules
- ✅ Implement virtual scrolling for large datasets
- ✅ Provide keyboard navigation
- ✅ Include responsive design modes
- ✅ Emit semantic, high-level events
- ✅ Support progressive enhancement
- ✅ Include performance monitoring

### DON'T:
- ❌ Recreate atom/molecule functionality
- ❌ Use native elements when atoms exist
- ❌ Ignore performance for large datasets
- ❌ Skip accessibility features
- ❌ Emit low-level DOM events
- ❌ Hard-code responsive breakpoints

## Examples

### Good Organism Implementation:
```typescript
@customElement('forge-data-table')
export class ForgeDataTable extends BaseElement {
  // Uses atoms/molecules
  render() {
    return html`
      <forge-checkbox 
        .checked=${this.allSelected}
        @change=${this.handleSelectAll}>
      </forge-checkbox>
      <forge-pagination
        .currentPage=${this.currentPage}
        @pagechange=${this.handlePageChange}>
      </forge-pagination>
    `;
  }
  
  // Performance optimized
  private renderRows() {
    return this.rows.length > 1000 
      ? this.renderVirtualRows()
      : this.renderStandardRows();
  }
  
  // Semantic events
  private handleSort(column: string) {
    this.dispatchEvent(new CustomEvent('sortchange', {
      detail: { column, direction: this.sortDirection }
    }));
  }
}
```

### Bad Organism Implementation:
```typescript
@customElement('forge-data-table')
export class ForgeDataTable extends BaseElement {
  // Uses native elements
  render() {
    return html`
      <input type="checkbox" @click=${this.handleSelectAll}>
      <div class="pagination">...</div>
    `;
  }
  
  // No performance optimization
  private renderRows() {
    return this.rows.map(row => this.renderRow(row));
  }
  
  // Low-level events
  private handleSort(e: Event) {
    this.dispatchEvent(new CustomEvent('click', { detail: e }));
  }
}
```

## Related ADRs

- ADR-001: Web Component Abstraction Layer (Foundation)
- ADR-015: Atomic Composition Pattern (Molecules)
- ADR-014: AI-Ready Components (AI Integration)
- ADR-012: Accessibility Standards (WCAG Compliance)
- ADR-008: Component API Design (Event Patterns)

## References

- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Web Components Best Practices](https://developers.google.com/web/fundamentals/web-components)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Virtual Scrolling Patterns](https://developers.google.com/web/updates/2016/07/infinite-scroller)