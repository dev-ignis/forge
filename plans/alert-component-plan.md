# Alert Component Implementation Plan

## Overview
The Alert component is a foundational UI element for displaying important messages, notifications, and feedback to users. It's part of Phase 1 (Atomic Components) and is a top-10 priority component.

## Component Specification

### Variants
- **success**: Positive feedback, confirmation messages (green)
- **error**: Error messages, critical issues (red)
- **warning**: Warnings, cautions (yellow/orange)
- **info**: Informational messages (blue)

### Features
1. **Visual Design**
   - Icon integration (contextual icons per variant)
   - Title and description support
   - Consistent padding and spacing using tokens
   - Border and background colors per variant

2. **Interactivity**
   - Dismissible option with close button
   - Auto-dismiss timer configuration
   - Smooth entry/exit animations
   - Focus management for accessibility

3. **Accessibility**
   - `role="alert"` for screen reader announcements
   - ARIA live regions for dynamic content
   - Keyboard navigation for dismiss button
   - High contrast mode support

## Token Dependencies

### Color Tokens
```css
/* Success variant */
--forge-color-success-bg: #f0fdf4;
--forge-color-success-border: #86efac;
--forge-color-success-text: #166534;
--forge-color-success-icon: #16a34a;

/* Error variant */
--forge-color-error-bg: #fef2f2;
--forge-color-error-border: #fca5a5;
--forge-color-error-text: #991b1b;
--forge-color-error-icon: #dc2626;

/* Warning variant */
--forge-color-warning-bg: #fffbeb;
--forge-color-warning-border: #fcd34d;
--forge-color-warning-text: #92400e;
--forge-color-warning-icon: #f59e0b;

/* Info variant */
--forge-color-info-bg: #eff6ff;
--forge-color-info-border: #93c5fd;
--forge-color-info-text: #1e3a8a;
--forge-color-info-icon: #3b82f6;
```

### Animation Tokens
```css
--forge-transition-alert-enter: all 0.3s ease-out;
--forge-transition-alert-exit: all 0.2s ease-in;
--forge-animation-slide-in: slideInFromTop 0.3s ease-out;
--forge-animation-fade-out: fadeOut 0.2s ease-in;
```

## TypeScript Interface

```typescript
// alert.types.ts
export type AlertVariant = 'success' | 'error' | 'warning' | 'info';
export type AlertRole = 'alert' | 'status';

// AI Metadata interface (ADR-014)
export interface AlertAIMetadata {
  purpose: 'user-notification';
  context?: string;
  criticality: 'low' | 'medium' | 'high' | 'critical';
  semanticRole: 'alert' | 'status' | 'notification';
  dismissible: boolean;
  autoClose: boolean;
}

export interface ForgeAlertProps extends ForgeComponentBase {
  /** Visual variant of the alert */
  variant?: AlertVariant;
  /** Title text for the alert */
  title?: string;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Auto-dismiss timeout in milliseconds (0 = no auto-dismiss) */
  autoClose?: number;
  /** Icon name to display (auto-selected based on variant if not provided) */
  icon?: string;
  /** ARIA role for the alert */
  role?: AlertRole;
  /** Whether to show the icon */
  showIcon?: boolean;
  /** AI metadata for enhanced understanding (ADR-014) */
  aiMetadata?: Partial<AlertAIMetadata>;
}

export interface ForgeAlertEventDetail {
  variant: AlertVariant;
  reason: 'user' | 'timeout';
}

export interface ForgeAlertEvents {
  'forge-close': CustomEvent<ForgeAlertEventDetail>;
  'forge-open': CustomEvent<ForgeAlertEventDetail>;
}
```

## Implementation Steps

### 1. Generate Component Structure
```bash
npm run generate:component alert
```

### 2. Core Implementation
- Extend BaseElement with Shadow DOM
- Implement variant-based styling
- Add icon support (inline SVG or icon font)
- Create dismissible functionality
- Add auto-close timer logic

### 3. Animations
- Entry animation (slide down + fade in)
- Exit animation (fade out + slide up)
- Smooth height transitions for dynamic content

### 4. Accessibility Features
- ARIA attributes based on variant
- Focus management for dismiss button
- Keyboard support (Escape to dismiss)
- Screen reader announcements

### 5. Testing Requirements
- Unit tests for all variants
- Auto-dismiss timer tests
- Accessibility tests (ARIA roles, keyboard nav)
- Animation tests (entry/exit)
- Event emission tests

### 6. Storybook Stories
- Individual variant stories
- Dismissible vs non-dismissible
- Auto-close demonstration
- Icon customization
- Long content handling
- Stacked alerts example

## Usage Examples

### Basic Alert
```html
<forge-alert variant="success">
  Operation completed successfully!
</forge-alert>
```

### Alert with Title and Dismissible
```html
<forge-alert 
  variant="error" 
  title="Error occurred"
  dismissible
>
  Failed to save changes. Please try again.
</forge-alert>
```

### Auto-dismiss Alert
```html
<forge-alert 
  variant="info" 
  auto-close="5000"
>
  Your session will expire in 5 minutes.
</forge-alert>
```

### Custom Icon
```html
<forge-alert 
  variant="warning" 
  icon="shield-exclamation"
  title="Security Warning"
>
  Unusual activity detected on your account.
</forge-alert>
```

## Component Structure

```typescript
@customElement('forge-alert')
export class ForgeAlert extends BaseElement implements ForgeAlertProps {
  @property({ type: String }) variant: AlertVariant = 'info';
  @property({ type: String }) title = '';
  @property({ type: Boolean }) dismissible = false;
  @property({ type: Number, attribute: 'auto-close' }) autoClose = 0;
  @property({ type: String }) icon = '';
  @property({ type: String }) role: AlertRole = 'alert';
  @property({ type: Boolean, attribute: 'show-icon' }) showIcon = true;
  
  private timeoutId?: number;
  
  connectedCallback() {
    super.connectedCallback();
    this.setupAutoClose();
    this.announceToScreenReaders();
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearAutoClose();
  }
  
  private handleDismiss() {
    const detail: ForgeAlertEventDetail = {
      variant: this.variant,
      reason: 'user'
    };
    this.emit('forge-close', detail);
    this.remove();
  }
  
  // ... rest of implementation
}
```

## CSS Structure

```css
:host {
  --alert-bg: var(--forge-color-info-bg);
  --alert-border: var(--forge-color-info-border);
  --alert-text: var(--forge-color-info-text);
  --alert-icon: var(--forge-color-info-icon);
  
  display: block;
  padding: var(--forge-spacing-md);
  background: var(--alert-bg);
  border: 1px solid var(--alert-border);
  border-radius: var(--forge-border-radius-md);
  color: var(--alert-text);
  animation: var(--forge-animation-slide-in);
}

:host([variant="success"]) {
  --alert-bg: var(--forge-color-success-bg);
  --alert-border: var(--forge-color-success-border);
  --alert-text: var(--forge-color-success-text);
  --alert-icon: var(--forge-color-success-icon);
}

/* ... other variant styles ... */

.alert-icon {
  color: var(--alert-icon);
  width: 20px;
  height: 20px;
}

.alert-dismiss {
  background: none;
  border: none;
  color: var(--alert-text);
  cursor: pointer;
  opacity: 0.7;
  transition: var(--forge-transition-fast);
}

.alert-dismiss:hover {
  opacity: 1;
}
```

## Timeline

- **Component generation**: 5 minutes
- **Core implementation**: 30 minutes
- **Animations**: 15 minutes
- **Accessibility**: 15 minutes
- **Testing**: 20 minutes
- **Storybook stories**: 15 minutes
- **Documentation**: 10 minutes

**Total estimated time**: ~2 hours

## Success Criteria

- [ ] All 4 variants implemented with proper styling
- [ ] Dismissible functionality works correctly
- [ ] Auto-close timer functions as expected
- [ ] Smooth animations for entry/exit
- [ ] ARIA compliance for screen readers
- [ ] Keyboard navigation support
- [ ] 90%+ test coverage
- [ ] Storybook stories for all variants
- [ ] TypeScript interfaces properly defined
- [ ] Token-first implementation (no hardcoded values)

## Next Steps

After completing the Alert component:
1. Implement Input component (next Phase 1 priority)
2. Create Select component
3. Build Radio Group component
4. Continue with remaining atomic components