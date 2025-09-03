# ForgeModal

Advanced modal dialog component with focus trapping, backdrop controls, and stacking context management.

## Overview

The ForgeModal component provides a comprehensive modal dialog solution with focus management, backdrop controls, keyboard interactions, and support for stacking multiple modals. It includes accessibility features and customizable animations.

## Key Features

- **Focus Trap Management**: Automatic focus containment within modal
- **Backdrop Controls**: Configurable backdrop click behavior
- **Multiple Sizes**: Small, medium, large, and full-screen variants
- **Stacking Support**: Multiple modal management with z-index control
- **Scroll Behavior**: Body or entire modal scrolling options
- **Keyboard Shortcuts**: ESC to close, Tab navigation
- **Accessibility**: Full ARIA compliance and screen reader support
- **AI-Ready**: Comprehensive AI metadata for intelligent interactions

## Basic Usage

```html
<forge-modal 
  title="Modal Title"
  .open="${isOpen}"
  @forge-modal-close="${handleClose}"
>
  <p>Modal content goes here</p>
  <forge-button slot="footer" variant="primary">Save</forge-button>
  <forge-button slot="footer" variant="secondary">Cancel</forge-button>
</forge-modal>
```

## Advanced Usage

```html
<forge-modal
  size="large"
  .open="${isOpen}"
  .showClose="${true}"
  .closeOnBackdrop="${true}"
  .closeOnEscape="${true}"
  .preventBodyScroll="${true}"
  animation="slide"
  scroll-behavior="body"
  stack-level="1"
  @forge-modal-open="${handleOpen}"
  @forge-modal-close="${handleClose}"
  @forge-modal-toggle="${handleToggle}"
>
  <div slot="header">
    <h2>Custom Header</h2>
    <forge-badge variant="info">New</forge-badge>
  </div>
  
  <div>
    <p>Modal content with custom header and footer</p>
    <!-- Large content here -->
  </div>
  
  <div slot="footer">
    <forge-button variant="danger" @click="${deleteAction}">Delete</forge-button>
    <forge-button variant="primary" @click="${saveAction}">Save Changes</forge-button>
    <forge-button variant="secondary" @click="${close}">Cancel</forge-button>
  </div>
</forge-modal>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Whether modal is visible |
| `size` | `ModalSize` | `'medium'` | Modal size variant |
| `title` | `string` | `''` | Modal title (if not using header slot) |
| `show-close` | `boolean` | `true` | Show close button in header |
| `close-on-backdrop` | `boolean` | `true` | Close when clicking backdrop |
| `close-on-escape` | `boolean` | `true` | Close when pressing ESC key |
| `no-header-border` | `boolean` | `false` | Remove header bottom border |
| `no-footer-border` | `boolean` | `false` | Remove footer top border |
| `scroll-behavior` | `ModalScrollBehavior` | `'body'` | How scrolling is handled |
| `prevent-body-scroll` | `boolean` | `true` | Prevent body scrolling when open |
| `animation` | `string` | `'fade'` | Animation type (none, fade, slide) |
| `stack-level` | `number` | `0` | Z-index stacking level |
| `aria-label` | `string` | `null` | Accessibility label |

## Types

### ModalSize
```typescript
type ModalSize = 'small' | 'medium' | 'large' | 'full';
```

### ModalScrollBehavior
```typescript
type ModalScrollBehavior = 'body' | 'entire';
```

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main modal content |
| `header` | Custom header content (overrides title) |
| `footer` | Footer content and actions |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-modal-open` | `{}` | Fired when modal is about to open (cancelable) |
| `forge-modal-close` | `{}` | Fired when modal is about to close (cancelable) |
| `forge-modal-toggle` | `{ open: boolean }` | Fired when modal visibility changes |

## Methods

| Method | Description |
|--------|-------------|
| `show()` | Programmatically open the modal |
| `close()` | Programmatically close the modal |

## Size Variants

### Small
Compact modal for simple interactions:

```html
<forge-modal size="small" title="Confirm Action">
  <p>Are you sure you want to continue?</p>
  <forge-button slot="footer" variant="danger">Delete</forge-button>
  <forge-button slot="footer" variant="secondary">Cancel</forge-button>
</forge-modal>
```

### Medium (Default)
Standard modal for most content:

```html
<forge-modal size="medium" title="Edit Profile">
  <form>
    <!-- Form content -->
  </form>
</forge-modal>
```

### Large
Wide modal for complex content:

```html
<forge-modal size="large" title="Data Visualization">
  <div class="chart-container">
    <!-- Large chart or complex UI -->
  </div>
</forge-modal>
```

### Full Screen
Maximum available space:

```html
<forge-modal size="full" title="Document Editor">
  <div class="editor-interface">
    <!-- Full-featured editor -->
  </div>
</forge-modal>
```

## Focus Management

The modal automatically manages focus:

1. **Focus Trap**: Constrains Tab navigation within modal
2. **Initial Focus**: Focuses first interactive element
3. **Return Focus**: Restores focus to trigger element on close
4. **Escape Handling**: ESC key closes modal and restores focus

```typescript
private setupFocusTrap(): void {
  const focusableElements = this.modalElement.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  this.firstFocusableElement = focusableElements[0] as HTMLElement;
  this.lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;
}
```

## Scroll Behavior

### Body Scrolling (Default)
Only modal body scrolls, header/footer remain fixed:

```html
<forge-modal scroll-behavior="body">
  <div style="height: 2000px;">
    Long content that scrolls within modal body
  </div>
</forge-modal>
```

### Entire Modal Scrolling
Entire modal scrolls as one unit:

```html
<forge-modal scroll-behavior="entire">
  <div style="height: 2000px;">
    Long content that scrolls with entire modal
  </div>
</forge-modal>
```

## Stacking Context

Support for multiple modals with proper z-index management:

```html
<!-- Base modal -->
<forge-modal stack-level="0">
  <p>Base modal content</p>
  <forge-button @click="${openSecondModal}">Open Another Modal</forge-button>
</forge-modal>

<!-- Stacked modal -->
<forge-modal stack-level="1">
  <p>This modal appears above the first</p>
</forge-modal>
```

The `stack-level` property controls the z-index calculation:
```css
z-index: calc(var(--forge-modal-z-index, 1000) + var(--stack-level, 1));
```

## Animation Options

### Fade Animation (Default)
Smooth opacity transition:

```html
<forge-modal animation="fade">
  Content with fade animation
</forge-modal>
```

### Slide Animation
Slides up from bottom:

```html
<forge-modal animation="slide">
  Content with slide animation
</forge-modal>
```

### No Animation
Instant show/hide:

```html
<forge-modal animation="none">
  Content with no animation
</forge-modal>
```

## Accessibility Features

- **ARIA Compliance**: `role="dialog"` and `aria-modal="true"`
- **Focus Trap**: Keyboard navigation contained within modal
- **Screen Reader**: Proper announcements and labeling
- **Keyboard Support**: ESC to close, Tab navigation
- **Focus Restoration**: Returns focus to triggering element

## AI Metadata

Comprehensive AI metadata for intelligent interactions:

```typescript
{
  purpose: 'Modal dialog for focused content or interactions',
  criticality: 'high',
  semanticRole: 'dialog',
  interactions: [
    {
      type: 'keyboard',
      description: 'ESC to close, Tab for focus navigation',
      shortcuts: ['Escape', 'Tab', 'Shift+Tab']
    },
    {
      type: 'click',
      description: 'Click backdrop to close',
      outcome: 'Closes modal if closeOnBackdrop is true'
    },
    {
      type: 'focus',
      description: 'Focus trap management',
      outcome: 'Keeps focus within modal while open'
    }
  ]
}
```

## Performance Features

- Automatic render time tracking
- Performance budget enforcement
- Efficient DOM updates
- Optimized animation performance

## Styling

### CSS Custom Properties

```css
:host {
  --forge-modal-z-index: 1000;
  --forge-modal-backdrop: rgba(0, 0, 0, 0.5);
  --forge-modal-backdrop-blur: blur(4px);
  --forge-modal-bg: #ffffff;
  --forge-modal-radius: 12px;
  --forge-border-light: #e5e7eb;
}
```

### Size Styles

```css
.modal--small { max-width: 400px; }
.modal--medium { max-width: 600px; }
.modal--large { max-width: 900px; }
.modal--full { 
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
}
```

## Mobile Responsiveness

Modals adapt to mobile screens:

- Small viewports use full-screen layout
- Touch-optimized interactions
- Proper viewport handling
- Gesture support for closing

```css
@media (max-width: 640px) {
  .modal--small,
  .modal--medium,
  .modal--large {
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    border-radius: 0;
  }
}
```

## Examples

### Confirmation Modal
```html
<forge-modal
  size="small"
  title="Confirm Delete"
  .open="${showConfirm}"
  @forge-modal-close="${handleConfirmClose}"
>
  <p>This action cannot be undone. Are you sure?</p>
  <forge-button slot="footer" variant="danger" @click="${confirmDelete}">
    Delete
  </forge-button>
  <forge-button slot="footer" variant="secondary" @click="${cancelDelete}">
    Cancel
  </forge-button>
</forge-modal>
```

### Form Modal
```html
<forge-modal
  size="medium"
  title="Create New Item"
  .open="${showForm}"
  .closeOnBackdrop="${false}"
  @forge-modal-close="${handleFormClose}"
>
  <form @submit="${handleSubmit}">
    <forge-form-field label="Name" required>
      <forge-input type="text" name="name"></forge-input>
    </forge-form-field>
    <forge-form-field label="Description">
      <textarea name="description" rows="4"></textarea>
    </forge-form-field>
  </form>
  
  <div slot="footer">
    <forge-button variant="primary" type="submit">Create</forge-button>
    <forge-button variant="secondary" @click="${closeForm}">Cancel</forge-button>
  </div>
</forge-modal>
```

### Image Gallery Modal
```html
<forge-modal
  size="large"
  .open="${showGallery}"
  .showClose="${true}"
  animation="fade"
>
  <div slot="header">
    <h3>Image Gallery</h3>
    <span>Image 1 of 10</span>
  </div>
  
  <div class="gallery-container">
    <img src="large-image.jpg" alt="Gallery image" />
  </div>
  
  <div slot="footer">
    <forge-button variant="secondary" @click="${previousImage}">Previous</forge-button>
    <forge-button variant="secondary" @click="${nextImage}">Next</forge-button>
  </div>
</forge-modal>
```

## Testing

Comprehensive test coverage includes:

- Focus management and trapping
- Keyboard navigation
- Backdrop interaction
- Stacking context
- Accessibility compliance
- Animation behaviors

```typescript
// Example test
it('should trap focus within modal when open', async () => {
  const modal = await fixture<ForgeModal>(html`
    <forge-modal .open="${true}">
      <button id="first">First</button>
      <button id="last">Last</button>
    </forge-modal>
  `);
  
  const firstButton = modal.querySelector('#first') as HTMLElement;
  const lastButton = modal.querySelector('#last') as HTMLElement;
  
  // Test focus trap
  lastButton.focus();
  await sendKeys({ press: 'Tab' });
  expect(document.activeElement).to.equal(firstButton);
});
```

## Best Practices

1. **Focus Management**: Always test keyboard navigation
2. **Content Size**: Consider mobile viewport constraints
3. **Stacking**: Use stack-level for multiple modals
4. **Accessibility**: Provide meaningful titles and labels
5. **Performance**: Use appropriate animation settings

## Browser Support

- Modern browsers with Web Components support
- Focus trap polyfills for older browsers
- Touch-optimized for mobile devices

## Related Components

- [ForgeButton](../atoms/button.md) - For modal actions
- [ForgeFormField](./form-field.md) - For modal forms
- [ForgeTooltip](./tooltip.md) - For contextual help
- [ForgeCard](./card.md) - For structured modal content