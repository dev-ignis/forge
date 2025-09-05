# Organism Components

Complex, feature-rich components that combine multiple molecules and atoms to create sophisticated UI patterns. These components represent complete interface sections and provide advanced functionality.

## Available Components

### Navigation & Structure
- **[Navigation Bar](./navigation-bar.md)** - Responsive navigation with mobile drawer, dropdowns, and route detection
- **[Tabs](./tabs.md)** - Advanced tabbed interface with keyboard navigation, drag-to-reorder, and lazy loading

### Data Display & Management
- **[Data Table](./data-table.md)** - Feature-rich table with sorting, selection, pagination, and responsive modes
- **[Tree View](./tree-view.md)** - Hierarchical tree structure with expand/collapse, selection, and search capabilities
- **[Accordion](./accordion.md)** - Expandable panels with single/multiple expansion modes and smooth animations

### Navigation & Flow
- **[Pagination](./pagination.md)** - Comprehensive pagination with multiple modes (standard, infinite scroll, load more)

## Component Features

All organism components include:

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
All organisms implement the complete AI metadata interface:
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

All organism components include comprehensive test suites covering:
- Rendering and DOM structure
- Property changes and reactivity
- Event emission and handling
- Keyboard navigation
- Accessibility features
- AI metadata functionality

Run tests with:
```bash
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

All organism components support:
- Chrome 84+
- Firefox 78+
- Safari 14+
- Edge 84+

## Related Documentation

- [Component Architecture](../../COMPONENTS.md)
- [AI Integration Guide](../../ai-integration-examples.md)
- [Performance Monitoring](../../performance-monitoring.md)
- [Theming System](../../theming/token-reference.md)