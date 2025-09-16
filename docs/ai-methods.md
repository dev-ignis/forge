# AI Methods Documentation

All Forge components implement standardized AI methods that enable intelligent interaction with AI coding tools like Cursor, GitHub Copilot, and Claude Code.

## Overview

Every component in the Forge library inherits from `BaseElement` and implements three core AI methods:

- **`getPossibleActions()`** - Returns available actions for the component
- **`explainState()`** - Explains the current state in human-readable format
- **`aiState`** - Getter that provides comprehensive component metadata

## AI Methods API

### `getPossibleActions(): AIAction[]`

Returns an array of actions that can be performed on the component.

**Returns:** Array of `AIAction` objects with:
- `name: string` - Action identifier (e.g., 'click', 'focus', 'toggle')
- `description: string` - Human-readable description
- `available: boolean` - Whether the action is currently available

**Example:**
```javascript
const button = document.querySelector('forge-button');
const actions = button.getPossibleActions();
// [
//   {name: 'click', description: 'Trigger button action', available: true},
//   {name: 'focus', description: 'Focus the button', available: true},
//   {name: 'disable', description: 'Disable the button', available: true}
// ]
```

### `explainState(): AIStateExplanation`

Provides a human-readable explanation of the component's current state.

**Returns:** `AIStateExplanation` object with:
- `currentState: string` - Current state identifier
- `possibleStates: string[]` - All possible states
- `stateDescription: string` - Human-readable description

**Example:**
```javascript
const checkbox = document.querySelector('forge-checkbox');
const explanation = checkbox.explainState();
// {
//   currentState: 'checked',
//   possibleStates: ['unchecked', 'checked', 'indeterminate'],
//   stateDescription: 'Checkbox with default variant, currently checked, required field'
// }
```

### `aiState: AIComponentState` (getter)

Comprehensive state information for AI analysis.

**Returns:** `AIComponentState` object with:
- `component: string` - Component tag name
- `semanticRole: string` - Semantic role in UI
- `context: string` - AI context information
- `metadata: AIMetadata` - Component metadata
- `state: Record<string, unknown>` - Internal state
- `attributes: Record<string, string>` - HTML attributes
- `possibleActions: AIAction[]` - Available actions
- `stateExplanation: AIStateExplanation` - State explanation
- `performance: AIPerformanceMetrics` - Performance data

**Example:**
```javascript
const alert = document.querySelector('forge-alert');
const aiState = alert.aiState;
// {
//   component: 'forge-alert',
//   semanticRole: 'alert',
//   context: 'notification',
//   metadata: {...},
//   state: {severity: 'error', closable: true},
//   possibleActions: [...],
//   stateExplanation: {...},
//   performance: {renderTime: 1.2, renderCount: 1}
// }
```

## Component-Specific Actions

### Button
- `click` - Trigger button action
- `focus` - Focus the button  
- `disable` - Disable the button
- `enable` - Enable the button

### Input
- `focus` - Focus the input
- `blur` - Remove focus
- `clear` - Clear input value
- `validate` - Validate input value
- `reset` - Reset to default

### Checkbox
- `toggle` - Toggle checked state
- `check` - Set to checked
- `uncheck` - Set to unchecked
- `setIndeterminate` - Set indeterminate state

### Modal
- `open` - Open the modal
- `close` - Close the modal
- `focus` - Focus first element

### Badge
- `show` - Show the badge
- `hide` - Hide the badge
- `increment` - Increase count
- `decrement` - Decrease count
- `reset` - Reset count to zero

### Icon
- `reload` - Reload icon from source
- `clearCache` - Clear from cache
- `startSpin` - Start spinning animation
- `stopSpin` - Stop spinning animation

## AI Tool Integration

### Cursor AI

Cursor can access these methods to understand component state:

```javascript
// Check what actions are available
const actions = component.getPossibleActions();

// Understand current state
const state = component.explainState();

// Get full AI context
const aiData = component.aiState;
```

### GitHub Copilot

Copilot can suggest code based on AI methods:

```javascript
// AI will know these methods are available
button.getPossibleActions()  // Suggests available actions
button.explainState()       // Explains current state
button.aiState             // Provides full context
```

### Claude Code

Claude can interact with components intelligently:

```javascript
// Claude understands component capabilities
const isClickable = component.getPossibleActions()
  .some(action => action.name === 'click' && action.available);

// Claude can explain component behavior
const explanation = component.explainState().stateDescription;
```

## Discovery by AI Agents

AI agents can discover these methods through:

1. **AI Manifest** - `ai-manifest.json` documents all AI methods
2. **TypeScript Definitions** - `.d.ts` files show method signatures
3. **Package Documentation** - README and docs explain usage
4. **Runtime Inspection** - Methods are available on component instances

## Best Practices

### For Developers
- Always check `available` property before calling actions
- Use `explainState()` for debugging component behavior
- Access `aiState` for comprehensive component analysis

### For AI Tools
- Query `getPossibleActions()` to determine available operations
- Use `explainState()` to understand current component state
- Access `aiState` for complete context when generating code

## Examples

### React Integration
```tsx
import { useRef, useEffect } from 'react';

function MyComponent() {
  const buttonRef = useRef<any>(null);

  useEffect(() => {
    if (buttonRef.current) {
      // AI can understand what's possible
      console.log(buttonRef.current.getPossibleActions());
      console.log(buttonRef.current.explainState());
    }
  }, []);

  return <forge-button ref={buttonRef}>Click me</forge-button>;
}
```

### Vanilla JavaScript
```javascript
// AI agents can query component capabilities
const component = document.querySelector('forge-input');

// Check if validation is available
const canValidate = component.getPossibleActions()
  .some(action => action.name === 'validate' && action.available);

if (canValidate) {
  // AI knows this action is safe to perform
  component.validate();
}
```

## AI Method Coverage

All 30 Forge components implement these AI methods with 100% coverage:

**Atoms (14):** alert, aspect-ratio, avatar, badge, button, checkbox, icon, input, progress, progress-circle, radio-group, select, skeleton, switch

**Molecules (9):** card, date-picker, dropdown, form-field, modal, multi-select, toast, toast-container, tooltip

**Organisms (7):** accordion, data-grid, data-table, navigation-bar, pagination, tabs, tree-view

This ensures consistent AI interaction across the entire component library.