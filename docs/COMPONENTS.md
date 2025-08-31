# Forge UI Components Overview

## Quick Start

```bash
# Install
npm install @nexcraft/forge

# Import what you need
import '@nexcraft/forge/button';
import '@nexcraft/forge/input';
```

## Component Library

The Forge UI Component Library provides 9 production-ready atomic components, all built with Web Components and featuring AI-ready architecture, performance monitoring, and WCAG 2.1 AA accessibility compliance.

> 📚 **Detailed Documentation:** Each component has comprehensive documentation in the [components](./components/) directory with API references, examples, and integration guides.

## Component Status

| Component | Version | Coverage | Bundle Size | Documentation |
|-----------|---------|----------|-------------|---------------|
| [ForgeButton](./components/button.md) | 1.0.0 | 94.17% | ~7KB | [Full Docs →](./components/button.md) |
| [ForgeInput](./components/input.md) | 1.0.0 | 88.29% | ~9KB | [Full Docs →](./components/input.md) |
| [ForgeIcon](./components/icon.md) | 1.0.0 | 94.09% | ~6KB | [Full Docs →](./components/icon.md) |
| [ForgeAlert](./components/alert.md) | 1.0.0 | 98.20% | ~8KB | [Full Docs →](./components/alert.md) |
| [ForgeCheckbox](./components/checkbox.md) | 1.0.0 | 97.87% | ~7KB | [Full Docs →](./components/checkbox.md) |
| [ForgeBadge](./components/badge.md) | 1.0.0 | 96.37% | ~6KB | [Full Docs →](./components/badge.md) |
| [ForgeSwitch](./components/switch.md) | 1.0.0 | 96.93% | ~7KB | [Full Docs →](./components/switch.md) |
| [ForgeRadioGroup](./components/radio-group.md) | 1.0.0 | Tests ✅ | ~8KB | [Full Docs →](./components/radio-group.md) |
| [ForgeSelect](./components/select.md) | 1.0.0 | Tests ✅ | ~10KB | [Full Docs →](./components/select.md) |

**Overall Coverage:** 93.77% | **Total Components:** 9 | **Average Bundle Size:** ~7.5KB

## Component Categories

### Form Controls
- **[Input](./components/input.md)** - Text input with validation (7 types)
- **[Select](./components/select.md)** - Dropdown with search and grouping
- **[Checkbox](./components/checkbox.md)** - Multi-select with indeterminate state
- **[RadioGroup](./components/radio-group.md)** - Single selection with keyboard nav
- **[Switch](./components/switch.md)** - Toggle with loading state

### Actions
- **[Button](./components/button.md)** - 5 variants, 3 sizes, loading states

### Feedback
- **[Alert](./components/alert.md)** - 4 severities with auto-dismiss
- **[Badge](./components/badge.md)** - Count/dot indicators with positioning

### Media
- **[Icon](./components/icon.md)** - 25+ icons with lazy loading

## Common Features

### 🤖 AI-Ready Architecture
Every component implements ADR-014 with:
- Semantic metadata
- Natural language descriptions
- Action discovery
- State explanations

```javascript
component.getAIDescription();
// "Primary button for submit action, currently enabled"

component.getPossibleActions();
// [{ name: 'click', available: true }]
```

### ⚡ Performance Monitoring
Built-in performance budgets with auto-degradation:

```html
<forge-button dev-mode show-metrics max-render-ms="16">
  Monitored Button
</forge-button>
```

### ♿ Accessibility
WCAG 2.1 AA compliant:
- Full keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes
- 4.5:1 color contrast

### 🎨 Theming
CSS custom properties for complete control:

```css
:root {
  --forge-color-primary: #3b82f6;
  --forge-radius-md: 6px;
  --forge-font-size-md: 14px;
}
```

## Framework Integration

Works with any framework - same Web Components everywhere:

### React
```jsx
import '@nexcraft/forge/button';

<forge-button variant="primary" onClick={handleClick}>
  Click Me
</forge-button>
```

### Vue
```vue
<forge-button variant="primary" @click="handleClick">
  Click Me
</forge-button>
```

### Angular
```html
<forge-button variant="primary" (click)="handleClick()">
  Click Me
</forge-button>
```

### Vanilla JS
```html
<forge-button variant="primary" onclick="handleClick()">
  Click Me
</forge-button>
```

## Migration Guides

### From Material UI
```jsx
// Before
<Button variant="contained" color="primary">Click</Button>
<TextField label="Email" error helperText="Required" />

// After
<forge-button variant="primary">Click</forge-button>
<forge-input label="Email" error error-text="Required" />
```

### From Ant Design
```jsx
// Before
<Button type="primary" loading>Submit</Button>
<Select showSearch allowClear />

// After
<forge-button variant="primary" loading>Submit</forge-button>
<forge-select searchable clearable />
```

## Browser Support

- Chrome 67+ ✅
- Firefox 63+ ✅
- Safari 10.1+ ✅
- Edge 79+ ✅

## Bundle Impact

- **Core (Lit):** ~5KB gzipped
- **Per component:** 6-10KB
- **Tree-shakeable:** Import only what you need
- **Zero dependencies:** No external libraries

## Testing

- **Coverage:** 93.77% average
- **Unit tests:** Vitest
- **Component tests:** Web Test Runner
- **E2E tests:** Playwright ready
- **Accessibility tests:** Built-in

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run Storybook
npm run storybook

# Run tests
npm test

# Build library
npm run build
```

## Resources

- 📖 [Component Documentation](./components/)
- 🏗️ [Architecture Decision Records](../plans/adrs/)
- 🧪 [Testing Guide](./TESTING.md)
- 🤝 [Contributing Guide](./CONTRIBUTING.md)
- 🎯 [Implementation Roadmap](../plans/implementation-roadmap.md)

## License

MIT © Nexcraft Team