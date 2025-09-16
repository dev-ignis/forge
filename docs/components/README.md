# Forge Components

A comprehensive component library organized using Atomic Design principles. Components are categorized into atoms (basic building blocks), molecules (combinations of atoms), and organisms (complex UI patterns).

## Component Categories

### [Atoms](./atoms/) - Basic Building Blocks
Simple, fundamental UI elements that serve as the building blocks for more complex components.

### [Molecules](./molecules/) - Combined Elements  
Combinations of atoms that work together to form functional UI components.

### [Organisms](./organisms/) - Complex UI Patterns
Feature-rich components that combine multiple molecules and atoms to create sophisticated UI patterns.

## Available Components

### Atoms
- **[Alert](./atoms/alert.md)** - Status messages and notifications
- **[Avatar](./atoms/avatar.md)** - User profile images and placeholders
- **[Badge](./atoms/badge.md)** - Status indicators and labels
- **[Button](./atoms/button.md)** - Interactive buttons with multiple variants
- **[Checkbox](./atoms/checkbox.md)** - Binary selection controls
- **[Icon](./atoms/icon.md)** - Scalable vector icons
- **[Input](./atoms/input.md)** - Text input fields with validation
- **[Radio Group](./atoms/radio-group.md)** - Single selection from multiple options
- **[Select](./atoms/select.md)** - Dropdown selection controls
- **[Switch](./atoms/switch.md)** - Toggle controls for binary states

### Molecules
- **[Card](./molecules/card.md)** - Content containers with headers and actions
- **[Date Picker](./molecules/date-picker.md)** - Calendar-based date selection
- **[Dropdown](./molecules/dropdown.md)** - Contextual menus and option lists
- **[Form Field](./molecules/form-field.md)** - Complete form controls with labels and validation
- **[Modal](./molecules/modal.md)** - Overlay dialogs and popups
- **[Multi Select](./molecules/multi-select.md)** - Multiple option selection with search and filtering
- **[Toast](./molecules/toast.md)** - Temporary notification messages
- **[Tooltip](./molecules/tooltip.md)** - Contextual help and information overlays

### Organisms
- **[Navigation Bar](./organisms/navigation-bar.md)** - Responsive navigation with mobile drawer, dropdowns, and route detection
- **[Tabs](./organisms/tabs.md)** - Advanced tabbed interface with keyboard navigation, drag-to-reorder, and lazy loading
- **[Data Table](./organisms/data-table.md)** - Feature-rich table with sorting, selection, pagination, and responsive modes
- **[Tree View](./organisms/tree-view.md)** - Hierarchical tree structure with expand/collapse, selection, and search capabilities
- **[Accordion](./organisms/accordion.md)** - Expandable panels with single/multiple expansion modes and smooth animations
- **[Pagination](./organisms/pagination.md)** - Comprehensive pagination with multiple modes (standard, infinite scroll, load more)

## Component Features

All Forge components include:

### Core Capabilities
- **AI Integration**: Full AI metadata implementation with state explanation and action suggestions
- **Accessibility**: Complete ARIA support, keyboard navigation, and screen reader compatibility
- **Performance Monitoring**: Built-in performance tracking and optimization capabilities
- **Responsive Design**: Adaptive layouts that work across all device sizes
- **Theming**: Full design token integration with CSS custom properties

### Advanced Features
- **State Management**: Complex internal state handling with external state synchronization
- **Event System**: Rich event emission for parent component interaction
- **Configuration**: Extensive customization options via properties and CSS variables
- **Animation**: Smooth transitions and micro-interactions where appropriate

## Implementation Guidelines

### AI Metadata
All components implement AI metadata interfaces (with varying complexity levels):
- `explainState()` - Detailed state explanation for AI understanding
- `getPossibleActions()` - Available actions based on current state
- `aiState` - Current component state for AI analysis

### Performance Considerations
- Lazy loading where appropriate (tabs, tree nodes)
- Virtual scrolling for large datasets (data table)
- Efficient rendering with Lit's reactive properties
- Memory management for event listeners and observers

### Accessibility Standards
- WCAG 2.1 AA compliance
- Keyboard navigation patterns
- ARIA attributes and roles
- Focus management
- Screen reader announcements

## Usage Patterns

### Basic Implementation
```typescript
import '@nexcraft/forge/organisms';

// Use in templates
html`
  <forge-tabs .tabs=${tabData}></forge-tabs>
  <forge-data-table .columns=${columns} .data=${rows}></forge-data-table>
  <forge-navigation-bar .items=${navItems}></forge-navigation-bar>
`;
```

### Event Handling
```typescript
// Listen for organism events
html`
  <forge-tabs 
    @forge-tab-change=${this.handleTabChange}
    @forge-tab-close=${this.handleTabClose}
  ></forge-tabs>
`;
```

### AI Integration
```typescript
const tabs = document.querySelector('forge-tabs');
const aiState = tabs.aiState;
const actions = tabs.getPossibleActions();
const explanation = tabs.explainState();
```

## Testing

All components include comprehensive test suites covering:
- Rendering and DOM structure
- Property changes and reactivity
- Event emission and handling
- Keyboard navigation (where applicable)
- Accessibility features
- AI metadata functionality

Run tests with:
```bash
npm run test:components
# Or test specific categories:
npm run test:atoms
npm run test:molecules
npm run test:organisms
```

## Performance Guidelines

### Memory Management
- Components clean up event listeners in `disconnectedCallback`
- Use weak references for large datasets
- Implement lazy loading for performance-critical scenarios

### Rendering Optimization
- Use `shouldUpdate()` to prevent unnecessary renders
- Leverage Lit's efficient change detection
- Implement virtual scrolling for large lists

### Network Efficiency
- Support lazy loading of content
- Implement progressive enhancement
- Cache frequently accessed data

## Browser Support

All Forge components support:
- Chrome 84+
- Firefox 78+
- Safari 14+
- Edge 84+

## Related Documentation

- [AI-Native Development Guide](../guides/ai-native-development.md)
- [AI Import Guide](../guides/AI_IMPORT_GUIDE.md)
- [Common UI Patterns](../patterns/AI_COMMON_PATTERNS.md)
- [AI Styling Guide](../guides/AI_STYLING_GUIDE.md)