# Semantic HTML Best Practices - @nexcraft/forge

> **Building AI-friendly, accessible components with semantic HTML**

This guide covers best practices for using semantic HTML with @nexcraft/forge components to maximize AI understanding, accessibility, and SEO.

## Table of Contents
- [Why Semantic HTML Matters](#why-semantic-html-matters)
- [Semantic Role Guidelines](#semantic-role-guidelines)
- [AI Context Hierarchies](#ai-context-hierarchies)
- [Accessibility Patterns](#accessibility-patterns)
- [Common Patterns](#common-patterns)
- [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

## Why Semantic HTML Matters

### The Triple Win

Semantic HTML benefits three key audiences simultaneously:

1. **AI Systems** - Understand component purpose and relationships
2. **Screen Readers** - Navigate and announce content correctly  
3. **Search Engines** - Index and rank content appropriately

### Real Impact

```html
<!-- Non-semantic: AI/Screen readers see generic elements -->
<div class="header">
  <div class="nav">
    <div class="button">Home</div>
  </div>
</div>

<!-- Semantic: Clear purpose and structure -->
<header>
  <nav aria-label="Main navigation">
    <forge-button semantic-role="nav-home" aria-label="Go to homepage">
      Home
    </forge-button>
  </nav>
</header>
```

## Semantic Role Guidelines

### Choosing the Right Semantic Role

Semantic roles describe the purpose of a component in your application:

```html
<!-- Navigation roles -->
<forge-button semantic-role="nav-primary">Products</forge-button>
<forge-button semantic-role="nav-secondary">Support</forge-button>
<forge-button semantic-role="nav-breadcrumb">Back</forge-button>

<!-- Action roles -->
<forge-button semantic-role="form-submit">Submit</forge-button>
<forge-button semantic-role="dialog-confirm">OK</forge-button>
<forge-button semantic-role="data-delete">Delete</forge-button>

<!-- Input roles -->
<forge-input semantic-role="search-query"></forge-input>
<forge-input semantic-role="user-email"></forge-input>
<forge-input semantic-role="filter-price"></forge-input>
```

### Semantic Role Naming Convention

Use a hierarchical naming pattern: `category-specific-action`

| Category | Examples | Usage |
|----------|----------|-------|
| `nav-*` | nav-primary, nav-menu, nav-breadcrumb | Navigation elements |
| `form-*` | form-submit, form-reset, form-field | Form-related elements |
| `dialog-*` | dialog-confirm, dialog-cancel, dialog-close | Modal/dialog actions |
| `data-*` | data-create, data-update, data-delete | CRUD operations |
| `user-*` | user-profile, user-settings, user-logout | User-specific actions |
| `search-*` | search-query, search-filter, search-results | Search functionality |
| `filter-*` | filter-category, filter-price, filter-date | Filtering controls |
| `sort-*` | sort-name, sort-date, sort-price | Sorting controls |

## AI Context Hierarchies

### Building Context Trees

AI context should flow from general to specific:

```html
<!-- Level 1: Page context -->
<main ai-context="product-catalog">
  
  <!-- Level 2: Section context -->
  <section ai-context="product-catalog.filters">
    
    <!-- Level 3: Component context -->
    <forge-select 
      semantic-role="filter-category"
      ai-context="product-catalog.filters.category">
    </forge-select>
    
    <forge-input
      semantic-role="filter-price-min"
      ai-context="product-catalog.filters.price.min">
    </forge-input>
  </section>
  
  <section ai-context="product-catalog.results">
    <forge-card
      semantic-role="product-item"
      ai-context="product-catalog.results.item">
    </forge-card>
  </section>
</main>
```

### Context Inheritance

Components inherit context from their parents:

```javascript
// AI systems can understand the full context
const button = document.querySelector('forge-button');
const fullContext = [];
let element = button;

while (element) {
  const context = element.getAttribute('ai-context');
  if (context) fullContext.unshift(context);
  element = element.parentElement;
}

console.log(fullContext.join(' > '));
// "app > checkout > payment > submit"
```

## Accessibility Patterns

### ARIA Labels and Descriptions

```html
<!-- Provide both label and description when needed -->
<forge-button
  semantic-role="form-submit"
  aria-label="Submit order"
  aria-describedby="submit-help">
  Place Order
</forge-button>
<span id="submit-help" class="sr-only">
  Clicking this will charge your card and start order processing
</span>

<!-- Use aria-live for dynamic updates -->
<forge-alert
  semantic-role="status-message"
  aria-live="polite"
  aria-atomic="true">
  Order successfully placed
</forge-alert>
```

### Landmark Roles

Use HTML5 semantic elements with Forge components:

```html
<header>
  <forge-button semantic-role="nav-logo">Company</forge-button>
  <nav aria-label="Main">
    <forge-button semantic-role="nav-primary">Products</forge-button>
    <forge-button semantic-role="nav-primary">About</forge-button>
  </nav>
</header>

<main>
  <article>
    <forge-card semantic-role="content-primary">
      <!-- Main content -->
    </forge-card>
  </article>
  
  <aside>
    <forge-card semantic-role="content-related">
      <!-- Related content -->
    </forge-card>
  </aside>
</main>

<footer>
  <forge-button semantic-role="nav-footer">Privacy</forge-button>
</footer>
```

### Focus Management

```html
<!-- Proper focus order with tabindex -->
<forge-modal semantic-role="dialog-container">
  <forge-button 
    semantic-role="dialog-close"
    tabindex="1"
    aria-label="Close dialog">
    ×
  </forge-button>
  
  <forge-input
    semantic-role="dialog-input"
    tabindex="2"
    autofocus>
  </forge-input>
  
  <forge-button
    semantic-role="dialog-confirm"
    tabindex="3">
    Confirm
  </forge-button>
</forge-modal>
```

## Common Patterns

### Search Interface

```html
<search role="search" ai-context="site-search">
  <forge-input
    semantic-role="search-query"
    type="search"
    aria-label="Search products"
    placeholder="Search...">
  </forge-input>
  
  <forge-button
    semantic-role="search-submit"
    aria-label="Submit search">
    <forge-icon name="search" aria-hidden="true"></forge-icon>
  </forge-button>
  
  <forge-select
    semantic-role="search-filter-category"
    aria-label="Filter by category">
  </forge-select>
</search>
```

### Form with Validation

```html
<form ai-context="user-registration">
  <forge-form-field
    semantic-role="user-email"
    ai-context="user-registration.email">
    <label slot="label">Email Address</label>
    <forge-input
      type="email"
      required
      aria-required="true"
      aria-describedby="email-error">
    </forge-input>
    <span slot="error" id="email-error" role="alert">
      Please enter a valid email
    </span>
  </forge-form-field>
  
  <forge-button
    semantic-role="form-submit"
    ai-context="user-registration.submit"
    aria-label="Create account">
    Sign Up
  </forge-button>
</form>
```

### Data Table

```html
<table ai-context="user-data">
  <thead>
    <tr>
      <th scope="col">
        <forge-button
          semantic-role="sort-name"
          aria-label="Sort by name">
          Name
        </forge-button>
      </th>
      <th scope="col">
        <forge-button
          semantic-role="sort-date"
          aria-label="Sort by date">
          Date
        </forge-button>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <forge-button
          semantic-role="data-view"
          ai-context="user-data.row.view">
          View
        </forge-button>
      </td>
      <td>
        <forge-button
          semantic-role="data-edit"
          ai-context="user-data.row.edit">
          Edit
        </forge-button>
      </td>
    </tr>
  </tbody>
</table>
```

### Navigation Menu

```html
<nav aria-label="Main navigation" ai-context="main-nav">
  <ul role="list">
    <li>
      <forge-button
        semantic-role="nav-primary"
        aria-current="page">
        Home
      </forge-button>
    </li>
    <li>
      <forge-dropdown
        semantic-role="nav-dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        <span slot="trigger">Products</span>
        <forge-button
          semantic-role="nav-submenu"
          slot="item">
          Category 1
        </forge-button>
      </forge-dropdown>
    </li>
  </ul>
</nav>
```

### Alert Messages

```html
<!-- Success message -->
<forge-alert
  semantic-role="status-success"
  severity="success"
  aria-live="polite"
  role="status">
  Your changes have been saved
</forge-alert>

<!-- Error message -->
<forge-alert
  semantic-role="status-error"
  severity="error"
  aria-live="assertive"
  role="alert">
  Failed to save. Please try again.
</forge-alert>

<!-- Warning with action -->
<forge-alert
  semantic-role="status-warning"
  severity="warning"
  aria-live="polite">
  Your session will expire in 5 minutes
  <forge-button
    slot="action"
    semantic-role="session-extend"
    aria-label="Extend session">
    Extend
  </forge-button>
</forge-alert>
```

## Anti-Patterns to Avoid

### ❌ Generic Semantic Roles

```html
<!-- Bad: Too generic -->
<forge-button semantic-role="button">Click</forge-button>
<forge-input semantic-role="input"></forge-input>

<!-- Good: Specific purpose -->
<forge-button semantic-role="cart-add">Add to Cart</forge-button>
<forge-input semantic-role="product-search"></forge-input>
```

### ❌ Missing ARIA Labels

```html
<!-- Bad: Icon button without label -->
<forge-button>
  <forge-icon name="trash"></forge-icon>
</forge-button>

<!-- Good: Accessible icon button -->
<forge-button aria-label="Delete item">
  <forge-icon name="trash" aria-hidden="true"></forge-icon>
</forge-button>
```

### ❌ Incorrect ARIA Usage

```html
<!-- Bad: Conflicting ARIA -->
<forge-button aria-disabled="true" onclick="submit()">
  Submit
</forge-button>

<!-- Good: Proper disabled state -->
<forge-button disabled aria-disabled="true">
  Submit
</forge-button>
```

### ❌ Missing Context Hierarchy

```html
<!-- Bad: Isolated context -->
<forge-button ai-context="submit">Submit</forge-button>

<!-- Good: Full context path -->
<form ai-context="checkout">
  <section ai-context="checkout.payment">
    <forge-button ai-context="checkout.payment.submit">
      Submit Payment
    </forge-button>
  </section>
</form>
```

### ❌ Redundant Descriptions

```html
<!-- Bad: Repetitive -->
<forge-button 
  aria-label="Click to submit the form"
  title="Click to submit the form">
  Click to submit the form
</forge-button>

<!-- Good: Concise -->
<forge-button aria-label="Submit form">
  Submit
</forge-button>
```

## Testing Semantic HTML

### Automated Testing

```javascript
// Test semantic roles are present
describe('Semantic HTML', () => {
  it('should have semantic roles on interactive elements', () => {
    const buttons = document.querySelectorAll('forge-button');
    buttons.forEach(button => {
      expect(button.getAttribute('semantic-role')).toBeTruthy();
    });
  });
  
  it('should have ARIA labels on icon buttons', () => {
    const iconButtons = document.querySelectorAll('forge-button:has(forge-icon)');
    iconButtons.forEach(button => {
      expect(button.getAttribute('aria-label')).toBeTruthy();
    });
  });
  
  it('should have proper context hierarchy', () => {
    const contexts = [];
    document.querySelectorAll('[ai-context]').forEach(el => {
      contexts.push(el.getAttribute('ai-context'));
    });
    
    // Check for hierarchical naming
    contexts.forEach(context => {
      if (context.includes('.')) {
        const parent = context.split('.').slice(0, -1).join('.');
        expect(contexts).toContain(parent);
      }
    });
  });
});
```

### Manual Testing Checklist

- [ ] Navigate using only keyboard (Tab, Arrow keys, Enter, Escape)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify focus indicators are visible
- [ ] Check color contrast ratios (WCAG AA: 4.5:1 for normal text)
- [ ] Test with browser zoom at 200%
- [ ] Validate HTML with W3C validator
- [ ] Run axe DevTools accessibility scan
- [ ] Test with voice control (Dragon, Voice Control)

## Tools and Resources

### Development Tools

- **axe DevTools** - Browser extension for accessibility testing
- **WAVE** - Web Accessibility Evaluation Tool
- **Lighthouse** - Chrome DevTools accessibility audit
- **NVDA** - Free screen reader for Windows
- **VoiceOver** - Built-in macOS/iOS screen reader

### Validation Tools

```bash
# Install accessibility testing tools
npm install --save-dev @axe-core/playwright
npm install --save-dev pa11y

# Run accessibility tests
npx pa11y http://localhost:3000
npx axe http://localhost:3000
```

### References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Resources](https://webaim.org/resources/)

## Conclusion

Semantic HTML is the foundation of accessible, AI-friendly web applications. By following these best practices with @nexcraft/forge components, you create interfaces that work for everyone - humans, AI systems, and assistive technologies alike.

Remember: **Semantic HTML is not optional** - it's essential for building inclusive, future-proof applications.

---

## Related Documentation

- [AI Metadata Reference](./ai/metadata-reference.md)
- [AI Integration Guide](./ai/integration-guide.md)
- [Component Annotation Guidelines](./component-annotation-guidelines.md)
- [Accessibility Testing Guide](./accessibility-testing-guide.md)
