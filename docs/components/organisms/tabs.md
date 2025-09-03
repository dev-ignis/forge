# Tabs Component

Advanced tabbed interface component with keyboard navigation, drag-to-reorder functionality, and lazy loading capabilities.

## Usage

```typescript
import '@nexcraft/forge/organisms/tabs';

// Basic usage
html`
  <forge-tabs .tabs=${this.tabData}></forge-tabs>
`;
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tabs` | `TabItem[]` | `[]` | Array of tab items to display |
| `activeTab` | `string` | `''` | ID of the currently active tab |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Tab orientation |
| `reorderable` | `boolean` | `false` | Enable drag-to-reorder functionality |
| `lazyLoad` | `boolean` | `false` | Enable lazy loading of tab content |
| `closeable` | `boolean` | `false` | Allow tabs to be closed globally |
| `showScrollButtons` | `boolean` | `true` | Show scroll buttons when tabs overflow |

## TabItem Interface

```typescript
interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  closeable?: boolean;
  panel?: string | TemplateStringsArray;
}
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-tab-change` | `{ tabId: string, previousTabId: string }` | Fired when the active tab changes |
| `forge-tab-close` | `{ tabId: string }` | Fired when a tab is closed |
| `forge-tab-reorder` | `{ fromIndex: number, toIndex: number }` | Fired when tabs are reordered |

## Methods

### Public Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `activateTab(tabId)` | `tabId: string` | `void` | Programmatically activate a tab |
| `closeTab(tabId)` | `tabId: string` | `void` | Programmatically close a tab |
| `addTab(tab, index?)` | `tab: TabItem, index?: number` | `void` | Add a new tab at specified position |
| `scrollToTab(tabId)` | `tabId: string` | `void` | Scroll to make a specific tab visible |

### AI Metadata Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `explainState()` | `string` | Returns detailed explanation of current state |
| `getPossibleActions()` | `AIAction[]` | Returns available actions based on current state |
| `aiState` | `AIState` | Current component state for AI analysis |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Left/Right` | Navigate between tabs (horizontal) |
| `Arrow Up/Down` | Navigate between tabs (vertical) |
| `Home` | Go to first tab |
| `End` | Go to last tab |
| `Enter/Space` | Activate focused tab |
| `Delete` | Close focused tab (if closeable) |

## Styling

### CSS Custom Properties

```css
forge-tabs {
  --forge-tab-bg: #ffffff;
  --forge-tab-border: #e0e0e0;
  --forge-tab-active-color: #007bff;
  --forge-tab-hover-bg: #f8f9fa;
  --forge-tab-disabled-opacity: 0.5;
  --forge-tab-padding: 12px 16px;
  --forge-tab-border-radius: 4px;
  --forge-tab-transition: all 0.2s ease;
}
```

### CSS Parts

| Part | Description |
|------|-------------|
| `tabs-container` | Main container element |
| `tabs-header` | Header containing tab buttons |
| `tab-button` | Individual tab button |
| `tab-panels` | Container for tab content |
| `tab-panel` | Individual tab panel |
| `scroll-button` | Navigation scroll buttons |

## Examples

### Basic Tabs

```typescript
const basicTabs = [
  { id: 'home', label: 'Home', panel: html`<div>Home content</div>` },
  { id: 'about', label: 'About', panel: html`<div>About content</div>` },
  { id: 'contact', label: 'Contact', panel: html`<div>Contact content</div>` }
];

html`
  <forge-tabs .tabs=${basicTabs}></forge-tabs>
`;
```

### Tabs with Icons and Badges

```typescript
const tabsWithIcons = [
  { 
    id: 'inbox', 
    label: 'Inbox', 
    icon: 'mail', 
    badge: '12',
    panel: html`<div>Inbox content</div>` 
  },
  { 
    id: 'sent', 
    label: 'Sent', 
    icon: 'send',
    panel: html`<div>Sent content</div>` 
  },
  { 
    id: 'drafts', 
    label: 'Drafts', 
    icon: 'draft',
    badge: '3',
    panel: html`<div>Drafts content</div>` 
  }
];

html`
  <forge-tabs .tabs=${tabsWithIcons}></forge-tabs>
`;
```

### Vertical Tabs with Reordering

```typescript
html`
  <forge-tabs 
    .tabs=${this.tabs}
    orientation="vertical"
    reorderable
    @forge-tab-reorder=${this.handleReorder}
  ></forge-tabs>
`;

private handleReorder(e: CustomEvent) {
  const { fromIndex, toIndex } = e.detail;
  // Update your data model
  this.reorderTabs(fromIndex, toIndex);
}
```

### Closeable Tabs

```typescript
html`
  <forge-tabs 
    .tabs=${this.tabs}
    closeable
    @forge-tab-close=${this.handleTabClose}
  ></forge-tabs>
`;

private handleTabClose(e: CustomEvent) {
  const { tabId } = e.detail;
  this.tabs = this.tabs.filter(tab => tab.id !== tabId);
}
```

### Lazy Loading

```typescript
html`
  <forge-tabs 
    .tabs=${this.tabs}
    lazy-load
    @forge-tab-change=${this.handleTabChange}
  ></forge-tabs>
`;

private handleTabChange(e: CustomEvent) {
  const { tabId } = e.detail;
  // Load content for the activated tab
  this.loadTabContent(tabId);
}
```

## Accessibility

- Full WCAG 2.1 AA compliance
- Keyboard navigation support
- ARIA attributes for screen readers:
  - `role="tablist"` on tab container
  - `role="tab"` on tab buttons
  - `role="tabpanel"` on content panels
  - `aria-selected` and `aria-expanded` states
- Focus management and visual indicators
- Announcements for tab changes and actions

## Performance Considerations

- Lazy loading prevents rendering of inactive tab content
- Virtual scrolling for large numbers of tabs
- Efficient event delegation
- Memory cleanup in `disconnectedCallback`
- Optimized drag-and-drop implementation

## Browser Support

- Chrome 84+
- Firefox 78+
- Safari 14+
- Edge 84+

## Related Components

- [Navigation Bar](./navigation-bar.md) - For main site navigation
- [Accordion](./accordion.md) - Alternative collapsible content
- [Button](../button.md) - Used internally for tab buttons