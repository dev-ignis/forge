# Navigation Bar Component

Responsive navigation bar component with mobile drawer, dropdowns, and automatic route detection capabilities.

## Usage

```typescript
import '@nexcraft/forge/organisms/navigation-bar';

// Basic usage
html`
  <forge-navigation-bar .items=${this.navItems}></forge-navigation-bar>
`;
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `NavItem[]` | `[]` | Navigation items to display |
| `logo` | `string` | `''` | Logo image URL or text |
| `logoHref` | `string` | `'/'` | Logo link destination |
| `fixed` | `boolean` | `false` | Fix navbar to top of viewport |
| `transparent` | `boolean` | `false` | Transparent background mode |
| `breakpoint` | `number` | `768` | Mobile breakpoint in pixels |
| `currentRoute` | `string` | `''` | Current route for active state |
| `showSearch` | `boolean` | `false` | Show search input |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |

## NavItem Interface

```typescript
interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  items?: NavItem[];
  badge?: string | number;
}
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-nav-item-click` | `{ item: NavItem, href?: string }` | Fired when navigation item is clicked |
| `forge-nav-search` | `{ query: string }` | Fired when search is performed |
| `forge-nav-toggle` | `{ open: boolean }` | Fired when mobile menu is toggled |

## Methods

### Public Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `toggleMobileMenu()` | - | `void` | Toggle mobile menu visibility |
| `closeMobileMenu()` | - | `void` | Close mobile menu |
| `setActiveItem(itemId)` | `itemId: string` | `void` | Set active navigation item |

### AI Metadata Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `explainState()` | `string` | Returns detailed explanation of current state |
| `getPossibleActions()` | `AIAction[]` | Returns available actions based on current state |
| `aiState` | `AIState` | Current component state for AI analysis |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Left/Right` | Navigate between top-level items |
| `Arrow Down` | Open dropdown menu |
| `Arrow Up/Down` | Navigate dropdown items |
| `Enter/Space` | Activate focused item |
| `Escape` | Close dropdown/mobile menu |
| `Tab` | Move focus to next interactive element |

## Styling

### CSS Custom Properties

```css
forge-navigation-bar {
  --forge-navbar-height: 64px;
  --forge-navbar-bg: #ffffff;
  --forge-navbar-color: #333333;
  --forge-navbar-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --forge-navbar-border: #e0e0e0;
  --forge-navbar-item-padding: 12px 16px;
  --forge-navbar-item-hover-bg: #f8f9fa;
  --forge-navbar-active-color: #007bff;
  --forge-navbar-dropdown-bg: #ffffff;
  --forge-navbar-dropdown-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  --forge-navbar-mobile-overlay: rgba(0, 0, 0, 0.5);
}
```

### CSS Parts

| Part | Description |
|------|-------------|
| `navbar` | Main navigation container |
| `navbar-brand` | Logo/brand area |
| `navbar-nav` | Navigation items container |
| `navbar-item` | Individual navigation item |
| `navbar-dropdown` | Dropdown menu container |
| `mobile-toggle` | Mobile menu toggle button |
| `mobile-menu` | Mobile menu container |
| `search-input` | Search input field |

## Examples

### Basic Navigation

```typescript
const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'contact', label: 'Contact', href: '/contact' }
];

html`
  <forge-navigation-bar 
    .items=${navItems}
    logo="MyApp"
    logo-href="/"
  ></forge-navigation-bar>
`;
```

### Navigation with Dropdowns

```typescript
const navWithDropdowns: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'products',
    label: 'Products',
    items: [
      { id: 'web-apps', label: 'Web Applications', href: '/products/web' },
      { id: 'mobile-apps', label: 'Mobile Apps', href: '/products/mobile' },
      { id: 'desktop-apps', label: 'Desktop Apps', href: '/products/desktop' }
    ]
  },
  {
    id: 'resources',
    label: 'Resources',
    items: [
      { id: 'docs', label: 'Documentation', href: '/docs' },
      { id: 'tutorials', label: 'Tutorials', href: '/tutorials' },
      { id: 'blog', label: 'Blog', href: '/blog' }
    ]
  }
];

html`
  <forge-navigation-bar 
    .items=${navWithDropdowns}
    logo="Company"
  ></forge-navigation-bar>
`;
```

### Fixed Navigation with Search

```typescript
html`
  <forge-navigation-bar 
    .items=${this.navItems}
    logo="SearchApp"
    fixed
    show-search
    search-placeholder="Search products..."
    @forge-nav-search=${this.handleSearch}
  ></forge-navigation-bar>
`;

private handleSearch(e: CustomEvent) {
  const { query } = e.detail;
  this.performSearch(query);
}
```

### Navigation with Icons and Badges

```typescript
const navWithIcons: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { id: 'messages', label: 'Messages', href: '/messages', icon: 'mail', badge: '5' },
  { id: 'notifications', label: 'Notifications', href: '/notifications', icon: 'bell', badge: '12' },
  {
    id: 'account',
    label: 'Account',
    icon: 'person',
    items: [
      { id: 'profile', label: 'Profile', href: '/profile', icon: 'person' },
      { id: 'settings', label: 'Settings', href: '/settings', icon: 'settings' },
      { id: 'logout', label: 'Logout', href: '/logout', icon: 'exit' }
    ]
  }
];

html`
  <forge-navigation-bar .items=${navWithIcons}></forge-navigation-bar>
`;
```

### Transparent Navigation

```typescript
html`
  <forge-navigation-bar 
    .items=${this.navItems}
    transparent
    logo="Hero App"
    class="hero-nav"
  ></forge-navigation-bar>
`;
```

### Route-Aware Navigation

```typescript
class MyApp extends LitElement {
  @state() private currentRoute = '/';

  connectedCallback() {
    super.connectedCallback();
    // Listen for route changes
    window.addEventListener('popstate', this.handleRouteChange);
  }

  private handleRouteChange = () => {
    this.currentRoute = window.location.pathname;
  };

  render() {
    return html`
      <forge-navigation-bar 
        .items=${this.navItems}
        .currentRoute=${this.currentRoute}
        @forge-nav-item-click=${this.handleNavigation}
      ></forge-navigation-bar>
    `;
  }

  private handleNavigation(e: CustomEvent) {
    const { item, href } = e.detail;
    if (href) {
      // Prevent default and handle routing
      e.preventDefault();
      this.router.navigate(href);
    }
  }
}
```

## Responsive Behavior

### Desktop Layout
- Horizontal navigation with dropdown menus
- Search input (if enabled) in the navbar
- Full navigation items visible

### Tablet Layout
- Condensed spacing
- Dropdown menus adapt to available space
- Search may move to mobile-style overlay

### Mobile Layout
- Hamburger menu button
- Off-canvas/drawer navigation
- Stacked navigation items
- Search overlay (if enabled)

## Accessibility

- Full WCAG 2.1 AA compliance
- Keyboard navigation support
- ARIA attributes for screen readers:
  - `role="navigation"` with `aria-label`
  - `aria-expanded` for dropdown states
  - `aria-current="page"` for active items
  - `aria-haspopup` for dropdown triggers
- Focus management and trap in mobile menu
- Screen reader announcements for navigation changes

## Performance Considerations

- Efficient event delegation
- Lazy loading of dropdown content
- Optimized mobile menu animations
- Memory cleanup for resize listeners
- Throttled scroll event handling for fixed navbar

## Integration Patterns

### With Router

```typescript
import { Router } from '@vaadin/router';

class MyApp extends LitElement {
  private router = new Router();

  firstUpdated() {
    this.router.setRoutes([
      { path: '/', component: 'home-page' },
      { path: '/about', component: 'about-page' },
      { path: '/services', component: 'services-page' }
    ]);
  }

  render() {
    return html`
      <forge-navigation-bar 
        .items=${this.navItems}
        @forge-nav-item-click=${this.handleNavigation}
      ></forge-navigation-bar>
      <main id="outlet"></main>
    `;
  }
}
```

### With Authentication

```typescript
html`
  <forge-navigation-bar 
    .items=${this.user ? this.authenticatedNavItems : this.publicNavItems}
    @forge-nav-item-click=${this.handleNavigation}
  ></forge-navigation-bar>
`;

get authenticatedNavItems() {
  return [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    {
      id: 'account',
      label: this.user.name,
      items: [
        { id: 'profile', label: 'Profile', href: '/profile' },
        { id: 'settings', label: 'Settings', href: '/settings' },
        { id: 'logout', label: 'Logout', href: '/logout' }
      ]
    }
  ];
}
```

## Browser Support

- Chrome 84+
- Firefox 78+
- Safari 14+
- Edge 84+

## Related Components

- [Dropdown](../molecules/dropdown.md) - Used internally for navigation dropdowns
- [Button](../button.md) - Used for navigation items and mobile toggle
- [Icon](../icon.md) - Used for navigation item icons
- [Input](../input.md) - Used for search functionality