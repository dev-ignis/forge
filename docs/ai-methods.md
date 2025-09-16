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

### Quick Component Usage

#### Basic Components with AI Methods
```jsx
// React Examples
import { ForgeButton, ForgeInput, ForgeAlert } from '@nexcraft/forge/integrations/react'

// Button with AI-aware interactions
<ForgeButton 
  variant="primary" 
  size="lg"
  onClick={() => {
    // AI can query what actions are available
    console.log(button.getPossibleActions());
  }}
>
  Save Changes
</ForgeButton>

// Input with validation and AI state
<ForgeInput 
  type="email" 
  label="Email Address" 
  placeholder="user@example.com"
  required
  helperText="We'll never share your email"
/>

// Alert with closable state
<ForgeAlert 
  severity="success" 
  variant="filled"
  closable={true}
>
  Your changes have been saved successfully!
</ForgeAlert>
```

#### Authentication Form Example
```jsx
// Login Form with AI-queryable state
function LoginForm() {
  return (
    <ForgeCard className="max-w-md mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form className="space-y-4">
          <ForgeInput 
            type="email" 
            label="Email" 
            placeholder="Enter your email"
            required 
          />
          <ForgeInput 
            type="password" 
            label="Password" 
            placeholder="Enter your password"
            required 
          />
          <ForgeButton type="submit" variant="primary" className="w-full">
            Sign In
          </ForgeButton>
        </form>
      </div>
    </ForgeCard>
  )
}
```

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

### Framework Patterns

#### React Hook Form Integration
```jsx
import { useForm } from 'react-hook-form'
import { RHFForgeInput, RHFForgeSelect } from '@nexcraft/forge/integrations/rhf'

function UserForm() {
  const { control, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <RHFForgeInput 
        name="firstName"
        label="First Name"
        control={control}
        rules={{ required: 'First name is required' }}
      />
      
      <RHFForgeInput 
        name="email"
        type="email"
        label="Email"
        control={control}
        rules={{ 
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address'
          }
        }}
      />
      
      <ForgeButton type="submit" variant="primary">
        Submit
      </ForgeButton>
    </form>
  )
}
```

#### Next.js SSR Pattern
```jsx
// pages/users.js
import { ForgeCard, ForgeButton } from '@nexcraft/forge/integrations/react'

export default function UsersPage({ users }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="grid gap-4">
        {users.map(user => (
          <ForgeCard key={user.id}>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <ForgeButton variant="secondary" size="sm">
                View Profile
              </ForgeButton>
            </div>
          </ForgeCard>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  // Components render semantic HTML during SSR
  const users = await fetchUsers()
  return { props: { users } }
}
```

## AI Method Coverage

All 30 Forge components implement these AI methods with 100% coverage:

**Atoms (14):** alert, aspect-ratio, avatar, badge, button, checkbox, icon, input, progress, progress-circle, radio-group, select, skeleton, switch

**Molecules (9):** card, date-picker, dropdown, form-field, modal, multi-select, toast, toast-container, tooltip

**Organisms (7):** accordion, data-grid, data-table, navigation-bar, pagination, tabs, tree-view

This ensures consistent AI interaction across the entire component library.