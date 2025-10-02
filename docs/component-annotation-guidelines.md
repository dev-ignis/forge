# Component Annotation Guidelines - @nexcraft/forge

> **How to properly annotate Forge components for maximum AI understanding and developer productivity**

This guide provides comprehensive guidelines for annotating @nexcraft/forge components with semantic roles, AI context, performance budgets, and accessibility attributes.

## Table of Contents
- [Quick Reference](#quick-reference)
- [Required Annotations](#required-annotations)
- [Optional Enhancements](#optional-enhancements)
- [Annotation by Component Type](#annotation-by-component-type)
- [Performance Annotations](#performance-annotations)
- [AI-Specific Annotations](#ai-specific-annotations)
- [Testing Annotations](#testing-annotations)

## Quick Reference

### Minimal Component Annotation

```html
<!-- Every Forge component should have at least these -->
<forge-button
  semantic-role="action-type"     Required: Component purpose
  aria-label="Descriptive text"    Required: Accessibility
>
  Button Text
</forge-button>
```

### Full Component Annotation

```html
<!-- Fully annotated component with all features -->
<forge-button
  semantic-role="form-submit"            Purpose for AI
  ai-context="checkout.payment.submit"   Hierarchical context
  aria-label="Submit payment"            Screen reader text
  aria-describedby="submit-help"         Additional help
  criticality="high"                     Importance level
  max-render-ms="2"                      Performance budget
  performance-mode="auto"                Auto-optimization
  data-testid="payment-submit"           Testing hook
>
  Place Order
</forge-button>
```

## Required Annotations

### 1. Semantic Role (Always Required)

Every interactive component MUST have a semantic role:

```html
<!-- Buttons -->
<forge-button semantic-role="nav-primary">Home</forge-button>
<forge-button semantic-role="form-submit">Submit</forge-button>
<forge-button semantic-role="dialog-close">Close</forge-button>
<forge-button semantic-role="data-delete">Delete</forge-button>

<!-- Inputs -->
<forge-input semantic-role="user-email"></forge-input>
<forge-input semantic-role="search-query"></forge-input>
<forge-input semantic-role="filter-price"></forge-input>

<!-- Selects -->
<forge-select semantic-role="sort-order"></forge-select>
<forge-select semantic-role="filter-category"></forge-select>
```

### 2. Accessibility Labels (Required for Interactive Elements)

All interactive elements need proper ARIA labels:

```html
<!-- Text buttons - aria-label optional if text is clear -->
<forge-button semantic-role="form-submit">
  Submit Form   Text is self-explanatory
</forge-button>

<!-- Icon buttons - aria-label REQUIRED -->
<forge-button 
  semantic-role="nav-menu"
  aria-label="Open navigation menu">
  <forge-icon name="menu" aria-hidden="true"></forge-icon>
</forge-button>

<!-- Form inputs - label or aria-label REQUIRED -->
<forge-input
  semantic-role="user-email"
  aria-label="Email address"
  placeholder="Enter your email">
</forge-input>
```

## Optional Enhancements

### AI Context (Recommended)

Provide hierarchical context for better AI understanding:

```html
<!-- Page level -->
<main ai-context="product-catalog">
  
  <!-- Section level -->
  <section ai-context="product-catalog.filters">
    
    <!-- Component level -->
    <forge-select
      semantic-role="filter-category"
      ai-context="product-catalog.filters.category">
    </forge-select>
  </section>
</main>
```

### Criticality Levels (Recommended for Key Actions)

Indicate importance for AI prioritization:

```html
<!-- High criticality - Payment, deletion, irreversible actions -->
<forge-button
  semantic-role="payment-submit"
  criticality="high">
  Pay Now
</forge-button>

<!-- Medium criticality - Important but reversible -->
<forge-button
  semantic-role="form-save"
  criticality="medium">
  Save Draft
</forge-button>

<!-- Low criticality - Informational, navigation -->
<forge-button
  semantic-role="help-toggle"
  criticality="low">
  Show Help
</forge-button>
```

## Annotation by Component Type

### Buttons

```html
<!-- Navigation button -->
<forge-button
  semantic-role="nav-products"       Specific navigation target
  ai-context="header.nav.products"   Location in UI
  aria-label="View products"         Clear action
  data-track="nav-click"             Analytics tracking
>
  Products
</forge-button>

<!-- Action button -->
<forge-button
  semantic-role="cart-add"               Specific action
  ai-context="product.actions.add-cart"  Context within product
  aria-label="Add to shopping cart"      Full description
  criticality="medium"                   Commerce importance
  data-product-id="12345"                Related data
>
  Add to Cart
</forge-button>

<!-- Dangerous action -->
<forge-button
  semantic-role="account-delete"         Dangerous action
  ai-context="settings.danger.delete"    Danger zone context
  aria-label="Delete account permanently"  Clear warning
  criticality="high"                     Highest criticality
  aria-describedby="delete-warning"      Additional warning
>
  Delete Account
</forge-button>
<span id="delete-warning" class="sr-only">
  This action cannot be undone. All data will be permanently deleted.
</span>
```

### Form Inputs

```html
<!-- Email input -->
<forge-input
  semantic-role="user-email"            User data type
  ai-context="registration.email"       Form context
  type="email"                          HTML5 type
  aria-label="Email address"            Accessible name
  aria-required="true"                  Required field
  aria-describedby="email-help"         Help text
  autocomplete="email"                  Browser autofill
  data-validate="email"                 Validation rule
>
</forge-input>
<span id="email-help">We'll never share your email</span>

<!-- Password input -->
<forge-input
  semantic-role="user-password"         Sensitive data
  ai-context="login.password"           Auth context
  type="password"                       Masked input
  aria-label="Password"                 Simple label
  aria-required="true"                  Required
  autocomplete="current-password"       Password manager
  minlength="8"                         Validation
  data-strength-meter="true"            Feature flag
>
</forge-input>

<!-- Search input -->
<forge-input
  semantic-role="search-global"         Search scope
  ai-context="header.search"            Location
  type="search"                         Search type
  aria-label="Search products"          Search target
  placeholder="Search..."               Placeholder
  aria-controls="search-results"        Controls results
  aria-autocomplete="list"              Has suggestions
>
</forge-input>
```

### Selects and Dropdowns

```html
<!-- Filter select -->
<forge-select
  semantic-role="filter-category"       Filter type
  ai-context="products.filters.category"  Filter location
  aria-label="Filter by category"       Clear purpose
  multiple                               Multi-select
  data-filter-field="category"          Filter mapping
>
  <option value="">All Categories</option>
  <option value="electronics">Electronics</option>
  <option value="clothing">Clothing</option>
</forge-select>

<!-- Sort dropdown -->
<forge-dropdown
  semantic-role="sort-products"         Sort function
  ai-context="products.toolbar.sort"    Toolbar location
  aria-label="Sort products"            Action
  aria-haspopup="listbox"               Popup type
  data-current-sort="name-asc"          Current state
>
  <span slot="trigger">Sort by: Name</span>
  <forge-button slot="item" data-sort="name-asc">Name A-Z</forge-button>
  <forge-button slot="item" data-sort="price-asc">Price Low-High</forge-button>
</forge-dropdown>
```

### Cards and Containers

```html
<!-- Product card -->
<forge-card
  semantic-role="product-item"          Content type
  ai-context="products.grid.item"       Layout context
  aria-label="Product: Widget Pro"      Specific item
  data-product-id="12345"               Data reference
  elevation="2"                         Visual hierarchy
  hoverable                              Interactive
>
  <!-- Card content -->
</forge-card>

<!-- Information card -->
<forge-card
  semantic-role="info-summary"          Information type
  ai-context="dashboard.summary"        Dashboard section
  aria-labelledby="summary-title"       Title reference
  criticality="low"                     Info only
>
  <h2 id="summary-title">Account Summary</h2>
  <!-- Summary content -->
</forge-card>
```

### Modals and Dialogs

```html
<!-- Confirmation modal -->
<forge-modal
  semantic-role="dialog-confirm"        Dialog type
  ai-context="actions.confirm-delete"   Action context
  aria-label="Confirm deletion"         Dialog purpose
  aria-modal="true"                     Modal behavior
  aria-describedby="confirm-message"    Message reference
  criticality="high"                    Important dialog
>
  <h2 slot="header">Confirm Delete</h2>
  <p slot="body" id="confirm-message">
    Are you sure you want to delete this item?
  </p>
  <forge-button
    slot="footer"
    semantic-role="dialog-confirm-yes"
    criticality="high">
    Delete
  </forge-button>
  <forge-button
    slot="footer"
    semantic-role="dialog-confirm-no">
    Cancel
  </forge-button>
</forge-modal>
```

## Performance Annotations

### Setting Performance Budgets

```html
<!-- Component with performance monitoring -->
<forge-tooltip
  semantic-role="help-info"
  max-render-ms="2"               2ms render budget
  warn-on-violation               Console warnings
  performance-mode="auto"         Auto-degrade if slow
>
  Hover for help
</forge-tooltip>

<!-- Heavy component with relaxed budget -->
<forge-date-picker
  semantic-role="date-select"
  max-render-ms="10"              10ms for complex component
  performance-mode="balanced"     Balance features/speed
>
</forge-date-picker>

<!-- Critical path component -->
<forge-button
  semantic-role="checkout-submit"
  max-render-ms="1"               Strict 1ms budget
  performance-mode="fast"         Prioritize speed
  criticality="high"              Critical interaction
>
  Complete Purchase
</forge-button>
```

### Performance Modes

```html
<!-- Auto mode - degrades features if slow -->
<forge-card performance-mode="auto">
  Content adapts to device speed
</forge-card>

<!-- Fast mode - minimal features, maximum speed -->
<forge-list performance-mode="fast">
  Optimized for slow devices
</forge-list>

<!-- Balanced mode - good features and speed -->
<forge-dropdown performance-mode="balanced">
  Standard performance
</forge-dropdown>

<!-- Quality mode - all features enabled -->
<forge-tooltip performance-mode="quality">
  Full animations and effects
</forge-tooltip>
```

## AI-Specific Annotations

### AI Description Override

```html
<!-- Custom AI description -->
<forge-button
  semantic-role="special-action"
  ai-description="This button triggers a complex workflow that validates user data, processes payment, and sends confirmation emails">
  Process
</forge-button>
```

### AI Hints

```html
<!-- Provide hints for AI systems -->
<forge-input
  semantic-role="ai-prompt"
  data-ai-hint="Accepts natural language queries for product search"
  data-ai-examples="red shoes, laptop under $1000, waterproof jacket">
</forge-input>
```

### AI Training Data

```html
<!-- Mark components used for AI training -->
<forge-button
  semantic-role="feedback-positive"
  data-ai-training="true"
  data-ai-label="user-satisfied"
  data-ai-weight="1.0">
  👍 Helpful
</forge-button>
```

## Testing Annotations

### Test IDs

```html
<!-- Consistent test IDs for E2E testing -->
<forge-button
  semantic-role="login-submit"
  data-testid="login-submit-button"
  data-test-group="authentication">
  Log In
</forge-button>

<!-- Dynamic test IDs -->
<forge-card
  semantic-role="product-item"
  data-testid={`product-card-${productId}`}
  data-test-state="loaded">
  Product Details
</forge-card>
```

### Visual Testing Annotations

```html
<!-- Mark areas for visual regression testing -->
<forge-card
  semantic-role="hero-banner"
  data-visual-test="true"
  data-visual-test-name="homepage-hero"
  data-visual-test-viewport="desktop,mobile">
  Hero Content
</forge-card>
```

## Validation Checklist

### Required Attributes Checklist

- [ ] ✅ `semantic-role` on ALL interactive components
- [ ] ✅ `aria-label` on icon-only buttons
- [ ] ✅ `aria-label` or `<label>` on all inputs
- [ ] ✅ `aria-required` on required form fields
- [ ] ✅ `type` attribute on all inputs

### Recommended Attributes Checklist

- [ ] 📌 `ai-context` for hierarchical understanding
- [ ] 📌 `criticality` for important actions
- [ ] 📌 `aria-describedby` for additional help
- [ ] 📌 `data-testid` for testing
- [ ] 📌 `autocomplete` on form inputs

### Performance Attributes Checklist

- [ ] ⚡ `max-render-ms` on critical path components
- [ ] ⚡ `performance-mode` on heavy components
- [ ] ⚡ `warn-on-violation` during development

## Common Mistakes to Avoid

### ❌ Don't Use Generic Roles

```html
<!-- Bad -->
<forge-button semantic-role="button">Click</forge-button>

<!-- Good -->
<forge-button semantic-role="nav-home">Home</forge-button>
```

### ❌ Don't Forget Icon Button Labels

```html
<!-- Bad -->
<forge-button>
  <forge-icon name="settings"></forge-icon>
</forge-button>

<!-- Good -->
<forge-button aria-label="Open settings">
  <forge-icon name="settings" aria-hidden="true"></forge-icon>
</forge-button>
```

### ❌ Don't Mix Criticality Levels

```html
<!-- Bad - Delete is high criticality -->
<forge-button semantic-role="data-delete" criticality="low">
  Delete
</forge-button>

<!-- Good -->
<forge-button semantic-role="data-delete" criticality="high">
  Delete
</forge-button>
```

### ❌ Don't Over-Annotate

```html
<!-- Bad - Too many redundant attributes -->
<forge-button
  semantic-role="submit"
  aria-label="Submit"
  title="Submit"
  data-action="submit"
  data-type="submit"
  data-button-type="submit">
  Submit
</forge-button>

<!-- Good - Just what's needed -->
<forge-button semantic-role="form-submit">
  Submit
</forge-button>
```

## Automated Validation

### ESLint Rule for Required Annotations

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'forge/semantic-role-required': 'error',
    'forge/aria-label-required': 'error',
    'forge/test-id-format': ['error', { pattern: 'kebab-case' }]
  }
};
```

### Test to Validate Annotations

```javascript
// annotation-validation.test.js
describe('Component Annotations', () => {
  it('should have semantic roles on all buttons', () => {
    const buttons = document.querySelectorAll('forge-button');
    buttons.forEach(button => {
      expect(button.getAttribute('semantic-role'))
        .toBeTruthy(`Button missing semantic-role: ${button.outerHTML}`);
    });
  });
  
  it('should have aria-labels on icon buttons', () => {
    const iconButtons = document.querySelectorAll(
      'forge-button:has(forge-icon):not(:has(text))'
    );
    iconButtons.forEach(button => {
      expect(button.getAttribute('aria-label'))
        .toBeTruthy(`Icon button missing aria-label: ${button.outerHTML}`);
    });
  });
});
```

## Conclusion

Proper component annotation is essential for:
- 🤖 **AI Understanding** - Components explain themselves to AI systems
- ♿ **Accessibility** - Screen readers and assistive tech work correctly
- ⚡ **Performance** - Components self-optimize based on budgets
- 🧪 **Testing** - Reliable test selectors and clear component purpose
- 📈 **Analytics** - Track user interactions meaningfully

Following these guidelines ensures your Forge components are truly intelligent, accessible, and maintainable.

---

## Related Documentation

- [AI Metadata Reference](./ai/metadata-reference.md)
- [AI Integration Guide](./ai/integration-guide.md)
- [Semantic HTML Best Practices](./semantic-html-best-practices.md)
- [Performance Monitoring Guide](./performance-monitoring-guide.md)
- [Accessibility Testing Guide](./accessibility-testing-guide.md)
