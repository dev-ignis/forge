# Accordion Component

Expandable accordion component with smooth animations, supporting both single and multiple expansion modes for organizing content in collapsible panels.

## Usage

```typescript
import '@nexcraft/forge/organisms/accordion';

// Basic usage
html`
  <forge-accordion .panels=${this.panels}></forge-accordion>
`;
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `panels` | `AccordionPanel[]` | `[]` | Array of accordion panels |
| `multiple` | `boolean` | `false` | Allow multiple panels to be open simultaneously |
| `collapsible` | `boolean` | `true` | Allow all panels to be collapsed |
| `disabled` | `boolean` | `false` | Disable the entire accordion |
| `bordered` | `boolean` | `true` | Show borders around panels |
| `expandedPanels` | `string[]` | `[]` | Array of expanded panel IDs |

## AccordionPanel Interface

```typescript
interface AccordionPanel {
  id: string;
  header: string;
  content: string | TemplateStringsArray;
  disabled?: boolean;
  icon?: string;
}
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-panel-expand` | `{ panelId: string }` | Fired when a panel is expanded |
| `forge-panel-collapse` | `{ panelId: string }` | Fired when a panel is collapsed |
| `forge-panel-toggle` | `{ panelId: string, expanded: boolean }` | Fired when panel state changes |

## Methods

### Public Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `expandPanel(panelId)` | `panelId: string` | `void` | Expand a specific panel |
| `collapsePanel(panelId)` | `panelId: string` | `void` | Collapse a specific panel |
| `togglePanel(panelId)` | `panelId: string` | `void` | Toggle a panel's expanded state |
| `expandAll()` | - | `void` | Expand all panels (multiple mode only) |
| `collapseAll()` | - | `void` | Collapse all panels |
| `isExpanded(panelId)` | `panelId: string` | `boolean` | Check if a panel is expanded |

### AI Metadata Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `explainState()` | `string` | Returns detailed explanation of current state |
| `getPossibleActions()` | `AIAction[]` | Returns available actions based on current state |
| `aiState` | `AIState` | Current component state for AI analysis |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Up/Down` | Navigate between panel headers |
| `Enter/Space` | Toggle focused panel |
| `Home` | Focus first panel |
| `End` | Focus last panel |
| `Tab` | Move to next focusable element |

## Styling

### CSS Custom Properties

```css
forge-accordion {
  --forge-accordion-bg: #ffffff;
  --forge-accordion-border: #e0e0e0;
  --forge-accordion-border-radius: 8px;
  --forge-accordion-header-bg: transparent;
  --forge-accordion-header-hover-bg: #f8f9fa;
  --forge-accordion-header-padding: 16px;
  --forge-accordion-content-padding: 16px;
  --forge-accordion-icon-size: 20px;
  --forge-accordion-icon-color: #666666;
  --forge-accordion-transition-duration: 0.3s;
  --forge-accordion-transition-easing: ease-in-out;
}
```

### CSS Parts

| Part | Description |
|------|-------------|
| `accordion` | Main accordion container |
| `panel` | Individual panel container |
| `panel-header` | Panel header button |
| `panel-content` | Panel content container |
| `panel-icon` | Expand/collapse icon |
| `header-text` | Header text content |

## Examples

### Basic Accordion

```typescript
const panels: AccordionPanel[] = [
  {
    id: 'panel1',
    header: 'General Information',
    content: html`
      <p>This is the general information section with basic details about our service.</p>
    `
  },
  {
    id: 'panel2',
    header: 'Technical Specifications',
    content: html`
      <ul>
        <li>Modern web standards</li>
        <li>Responsive design</li>
        <li>Cross-browser compatibility</li>
      </ul>
    `
  },
  {
    id: 'panel3',
    header: 'Pricing Information',
    content: html`
      <p>Contact us for detailed pricing information tailored to your needs.</p>
    `
  }
];

html`
  <forge-accordion .panels=${panels}></forge-accordion>
`;
```

### Multiple Expansion Mode

```typescript
html`
  <forge-accordion 
    .panels=${this.panels}
    multiple
    @forge-panel-toggle=${this.handlePanelToggle}
  ></forge-accordion>
`;

private handlePanelToggle(e: CustomEvent) {
  const { panelId, expanded } = e.detail;
  console.log(`Panel ${panelId} is now ${expanded ? 'expanded' : 'collapsed'}`);
}
```

### FAQ Accordion

```typescript
const faqPanels: AccordionPanel[] = [
  {
    id: 'faq1',
    header: 'What is the refund policy?',
    content: html`
      <p>We offer a 30-day money-back guarantee on all purchases. Contact support for assistance.</p>
    `
  },
  {
    id: 'faq2',
    header: 'How do I cancel my subscription?',
    content: html`
      <p>You can cancel your subscription at any time from your account settings page.</p>
    `
  },
  {
    id: 'faq3',
    header: 'Is there a free trial available?',
    content: html`
      <p>Yes, we offer a 14-day free trial for new users. No credit card required.</p>
    `
  }
];

html`
  <div class="faq-section">
    <h2>Frequently Asked Questions</h2>
    <forge-accordion 
      .panels=${faqPanels}
      .expandedPanels=${['faq1']}
    ></forge-accordion>
  </div>
`;
```

### Accordion with Icons

```typescript
const panelsWithIcons: AccordionPanel[] = [
  {
    id: 'features',
    header: 'Features',
    icon: 'star',
    content: html`<p>Explore our comprehensive feature set.</p>`
  },
  {
    id: 'pricing',
    header: 'Pricing',
    icon: 'credit_card',
    content: html`<p>Flexible pricing options for every budget.</p>`
  },
  {
    id: 'support',
    header: 'Support',
    icon: 'help',
    content: html`<p>24/7 customer support and documentation.</p>`
  }
];

html`
  <forge-accordion .panels=${panelsWithIcons}></forge-accordion>
`;
```

### Controlled Accordion

```typescript
class ControlledAccordion extends LitElement {
  @state() private expandedPanels: string[] = [];

  render() {
    return html`
      <div class="accordion-controls">
        <forge-button @click=${this.expandAll}>
          Expand All
        </forge-button>
        <forge-button @click=${this.collapseAll}>
          Collapse All
        </forge-button>
      </div>

      <forge-accordion 
        .panels=${this.panels}
        .expandedPanels=${this.expandedPanels}
        multiple
        @forge-panel-toggle=${this.handlePanelToggle}
      ></forge-accordion>
    `;
  }

  private expandAll() {
    this.expandedPanels = this.panels.map(panel => panel.id);
  }

  private collapseAll() {
    this.expandedPanels = [];
  }

  private handlePanelToggle(e: CustomEvent) {
    const { panelId, expanded } = e.detail;
    
    if (expanded) {
      this.expandedPanels = [...this.expandedPanels, panelId];
    } else {
      this.expandedPanels = this.expandedPanels.filter(id => id !== panelId);
    }
  }
}
```

### Nested Accordions

```typescript
const nestedPanels: AccordionPanel[] = [
  {
    id: 'main1',
    header: 'Main Category 1',
    content: html`
      <p>Introduction to main category 1.</p>
      <forge-accordion .panels=${[
        {
          id: 'sub1a',
          header: 'Subcategory A',
          content: html`<p>Details about subcategory A.</p>`
        },
        {
          id: 'sub1b',
          header: 'Subcategory B',
          content: html`<p>Details about subcategory B.</p>`
        }
      ]}></forge-accordion>
    `
  },
  {
    id: 'main2',
    header: 'Main Category 2',
    content: html`
      <p>Introduction to main category 2.</p>
      <forge-accordion .panels=${[
        {
          id: 'sub2a',
          header: 'Subcategory C',
          content: html`<p>Details about subcategory C.</p>`
        }
      ]}></forge-accordion>
    `
  }
];

html`
  <forge-accordion .panels=${nestedPanels} multiple></forge-accordion>
`;
```

### Dynamic Content Loading

```typescript
class DynamicAccordion extends LitElement {
  @state() private panels: AccordionPanel[] = [
    {
      id: 'dynamic1',
      header: 'Load Content Dynamically',
      content: html`<div class="loading">Loading...</div>`
    }
  ];

  private async handlePanelExpand(e: CustomEvent) {
    const { panelId } = e.detail;
    
    if (panelId === 'dynamic1') {
      // Load content dynamically
      const content = await this.loadPanelContent(panelId);
      
      this.panels = this.panels.map(panel => 
        panel.id === panelId 
          ? { ...panel, content: html`<div>${content}</div>` }
          : panel
      );
    }
  }

  render() {
    return html`
      <forge-accordion 
        .panels=${this.panels}
        @forge-panel-expand=${this.handlePanelExpand}
      ></forge-accordion>
    `;
  }
}
```

## Animation and Transitions

The accordion component includes smooth animations for expanding and collapsing panels:

- **Expand**: Content slides down with easing
- **Collapse**: Content slides up with easing
- **Height calculation**: Automatic height calculation for dynamic content
- **Performance**: GPU-accelerated transforms for smooth animation

### Custom Animation Timing

```css
forge-accordion {
  --forge-accordion-transition-duration: 0.5s;
  --forge-accordion-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Accessibility

- Full WCAG 2.1 AA compliance
- Keyboard navigation support
- ARIA attributes for screen readers:
  - `role="button"` on panel headers
  - `aria-expanded` for panel state
  - `aria-controls` linking headers to content
  - `aria-disabled` for disabled panels
- Screen reader announcements for state changes
- Focus management and visual indicators

## Performance Considerations

- Efficient rendering with minimal DOM updates
- Lazy content rendering for large panels
- Optimized animation using CSS transforms
- Memory management for event listeners
- Debounced resize handling for responsive behavior

## Integration Patterns

### With Forms

```typescript
const formPanels: AccordionPanel[] = [
  {
    id: 'personal',
    header: 'Personal Information',
    content: html`
      <forge-form-field label="Full Name">
        <forge-input name="fullName"></forge-input>
      </forge-form-field>
      <forge-form-field label="Email">
        <forge-input type="email" name="email"></forge-input>
      </forge-form-field>
    `
  },
  {
    id: 'address',
    header: 'Address Information',
    content: html`
      <forge-form-field label="Street Address">
        <forge-input name="address"></forge-input>
      </forge-form-field>
      <forge-form-field label="City">
        <forge-input name="city"></forge-input>
      </forge-form-field>
    `
  }
];
```

### With Navigation

```typescript
html`
  <div class="sidebar">
    <forge-accordion .panels=${this.navigationPanels} multiple>
    </forge-accordion>
  </div>
`;
```

## Browser Support

- Chrome 84+
- Firefox 78+
- Safari 14+
- Edge 84+

## Related Components

- [Tabs](./tabs.md) - Alternative for organizing content
- [Dropdown](../molecules/dropdown.md) - Similar collapsible behavior
- [Button](../button.md) - Used internally for panel headers
- [Icon](../icon.md) - Used for expand/collapse indicators