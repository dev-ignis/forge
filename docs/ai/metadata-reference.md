# AI Metadata Reference

Complete technical reference for the AI metadata system in @nexcraft/forge.

## Table of Contents
- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [Architecture & Interfaces](#architecture--interfaces)
- [API Reference](#api-reference)
- [Implementation Guide](#implementation-guide)
- [Best Practices](#best-practices)
- [Testing AI Metadata](#testing-ai-metadata)

## Overview

The AI Metadata System provides a standardized way for components to expose their capabilities, state, and context to AI systems. This enables intelligent interactions, automated testing, documentation generation, and enhanced developer tooling.

### Why AI Metadata Matters

Traditional UI components are "black boxes" to AI systems. Our AI metadata system solves this by making components:
- **Self-describing**: Components explain their current state in natural language
- **Predictive**: Components suggest what actions are available
- **Contextual**: Components provide semantic meaning for AI interpretation
- **Observable**: AI can understand component state without DOM inspection

### Key Features

- **Semantic Component Description**: Rich metadata about component purpose and behavior
- **State Exposition**: Real-time component state accessible to AI systems
- **Action Discovery**: Available actions and their requirements
- **Context Awareness**: Component relationships and data flow
- **Performance Metrics**: Built-in monitoring and reporting
- **Validation Framework**: Comprehensive metadata validation

## Core Concepts

### 1. Component Intelligence Hierarchy

```
┌─────────────────────────────────────┐
│         AI Metadata Layer           │ <- Natural language interface
├─────────────────────────────────────┤
│      Component State Layer          │ <- Properties and attributes
├─────────────────────────────────────┤
│         DOM Element Layer           │ <- Standard web component
└─────────────────────────────────────┘
```

### 2. Three Pillars of AI Metadata

#### a) State Exposition (`aiState`)
Exposes component state in a machine-readable format for AI analysis.

#### b) Natural Language Description (`explainState()`)
Provides human-readable state descriptions that AI systems can interpret.

#### c) Action Prediction (`getPossibleActions()`)
Lists available interactions with current availability status.

## Architecture & Interfaces

### Core Interfaces

The system is built around several key TypeScript interfaces:

```typescript
// Core AI metadata interface
interface AIMetadata {
  purpose: string;                      // Component's primary function
  context?: string;                     // Usage context
  dataType?: AIDataType;               // Type of data handled
  criticality?: AICriticality;         // Business importance
  semanticRole?: string;               // Semantic HTML role
  interactions?: AIInteractionPattern[]; // Supported interactions
  validation?: AIValidationRule[];     // Data validation rules
  relations?: AIRelation[];            // Component relationships
}

// Component state exposition
interface AIComponentState {
  component: string;                   // Component tag name
  semanticRole?: string;               // Current semantic role
  context?: string;                    // Current context
  description?: string | null;        // Accessibility description
  metadata: AIMetadata;                // Full metadata
  state: Record<string, any>;         // Current state values
  attributes: Record<string, string | null>; // DOM attributes
  possibleActions: AIAction[];        // Available actions
  stateExplanation: AIStateExplanation; // Human-readable state
  performance?: AIPerformanceMetrics;  // Performance data
}

// State explanation interface
interface AIStateExplanation {
  currentState: string;              // Current state identifier
  possibleStates: string[];          // All possible states
  stateDescription: string;          // Human-readable description
  transitions?: AIStateTransition[]; // State transition rules
  visualIndicators?: string[];       // Visual state indicators
}

// Action interface
interface AIAction {
  name: string;                    // Action identifier
  description: string;             // Human-readable description
  available: boolean;              // Whether action is currently available
  parameters?: AIActionParameter[]; // Required parameters
  result?: string;                 // Expected result
  sideEffects?: string[];          // Side effects of the action
}
```

### BaseElement Integration

All Forge components extend `BaseElement`, which provides AI metadata infrastructure:

```typescript
export abstract class BaseElement extends LitElement {
  // AI-Ready properties
  @property({ type: String, attribute: 'semantic-role' }) semanticRole?: string;
  @property({ type: String, attribute: 'ai-context' }) aiContext?: string;

  // AI Metadata storage
  protected aiMetadata: AIMetadata = {
    purpose: 'UI Component',
    criticality: 'low'
  };

  // AI state tracking
  protected componentState: Map<string, any> = new Map();

  // AI state getter - exposes complete component state
  get aiState(): AIComponentState {
    return {
      component: this.tagName.toLowerCase(),
      semanticRole: this.semanticRole,
      context: this.aiContext,
      description: this.ariaDescription,
      metadata: this.aiMetadata,
      state: this.getStateObject(),
      attributes: this.getAttributeMap(),
      possibleActions: this.getPossibleActions(),
      stateExplanation: this.explainState(),
      performance: this.getPerformanceMetrics()
    };
  }

  // Abstract methods for components to implement
  abstract getPossibleActions(): AIAction[];
  abstract explainState(): AIStateExplanation;
}
```

### Data Types and Classifications

#### AIDataType
Standardized data type classifications:

```typescript
type AIDataType =
  | 'text' | 'number' | 'boolean' | 'date' | 'time' | 'datetime'
  | 'email' | 'phone' | 'url' | 'password' | 'file' | 'image'
  | 'selection' | 'multiselection' | 'range' | 'color' | 'json' | 'custom';
```

#### AICriticality
Business importance levels:

```typescript
type AICriticality = 'low' | 'medium' | 'high' | 'critical';
```

#### AIInteractionPattern
Supported user interactions:

```typescript
interface AIInteractionPattern {
  type: 'click' | 'input' | 'select' | 'drag' | 'hover' | 'focus' | 'keyboard' | 'voice' | 'gesture';
  description: string;
  outcome?: string;
  shortcuts?: string[];
}
```

## API Reference

### BaseElement AI Methods

#### `get aiState(): AIComponentState`
Returns the current state of the component in a machine-readable format.

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
const state = element.aiState;
console.log(state);
// {
//   component: 'forge-button',
//   variant: 'primary',
//   disabled: false,
//   loading: false,
//   renderTime: 0.8
// }
```

#### `explainState(): AIStateExplanation`
Provides a human-readable explanation of the component's current state.

**Returns:** `AIStateExplanation` object with:
- `currentState: string` - Current state identifier
- `possibleStates: string[]` - All possible states
- `stateDescription: string` - Human-readable description
- `transitions?: AIStateTransition[]` - State transition rules
- `visualIndicators?: string[]` - Visual state indicators

**Example:**
```javascript
const explanation = element.explainState();
console.log(explanation);
// {
//   currentState: 'checked',
//   possibleStates: ['unchecked', 'checked', 'indeterminate'],
//   stateDescription: 'Checkbox with default variant, currently checked, required field'
// }
```

#### `getPossibleActions(): AIAction[]`
Returns an array of actions that can be performed on the component.

**Returns:** Array of `AIAction` objects with:
- `name: string` - Action identifier (e.g., 'click', 'focus', 'toggle')
- `description: string` - Human-readable description
- `available: boolean` - Whether the action is currently available
- `parameters?: AIActionParameter[]` - Required parameters
- `result?: string` - Expected result
- `sideEffects?: string[]` - Side effects of the action

**Example:**
```javascript
const actions = element.getPossibleActions();
console.log(actions);
// [
//   {name: 'click', description: 'Trigger button action', available: true},
//   {name: 'focus', description: 'Focus the button', available: true},
//   {name: 'disable', description: 'Disable the button', available: true}
// ]
```

#### `getAIDescription(): string`
Returns a comprehensive description for AI systems (includes state and context).

**Example:**
```javascript
const description = element.getAIDescription();
console.log(description);
// "Primary button for form submission. Currently enabled and ready for interaction."
```

### AI-Specific Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `semantic-role` | string | Describes the component's purpose (e.g., 'navigation', 'form-submit', 'data-display') |
| `ai-context` | string | Provides additional context for AI systems (e.g., 'user-profile', 'checkout-flow') |
| `criticality` | 'low' \| 'medium' \| 'high' | Indicates importance for AI prioritization |
| `ai-description` | string | Custom description override for AI systems |

## Implementation Guide

### Step 1: Extend BaseElement

All Forge components extend `BaseElement` which provides AI metadata infrastructure:

```typescript
import { BaseElement } from '@nexcraft/forge/core';

export class MyComponent extends BaseElement {
  // Your component implementation
}
```

### Step 2: Define AI Metadata

Components define their AI metadata in the constructor or class declaration:

```typescript
@customElement('forge-button')
export class ForgeButton extends BaseElement {
  protected aiMetadata: AIMetadata = {
    purpose: 'Trigger actions and user interactions',
    criticality: 'medium',
    semanticRole: 'button',
    dataType: 'custom',
    interactions: [
      {
        type: 'click',
        description: 'Execute button action',
        outcome: 'Triggers associated functionality',
        shortcuts: ['Enter', 'Space']
      },
      {
        type: 'keyboard',
        description: 'Keyboard activation',
        shortcuts: ['Enter', 'Space']
      }
    ]
  };
}
```

### Step 3: Implement getPossibleActions()

Define what actions can be performed on the component:

```typescript
getPossibleActions(): AIAction[] {
  return [
    {
      name: 'click',
      description: 'Click the button',
      available: !this.disabled,
      result: 'Executes button action'
    },
    {
      name: 'disable',
      description: 'Disable the button',
      available: !this.disabled
    },
    {
      name: 'enable',
      description: 'Enable the button',
      available: this.disabled
    }
  ];
}
```

### Step 4: Implement explainState()

Provide natural language descriptions of the component state:

```typescript
explainState(): AIStateExplanation {
  return {
    currentState: this.disabled ? 'disabled' : 'enabled',
    possibleStates: ['enabled', 'disabled', 'loading'],
    stateDescription: `Button is ${this.disabled ? 'disabled and cannot be clicked' : 'enabled and ready for interaction'}`,
    transitions: [
      {
        from: 'enabled',
        to: 'disabled',
        trigger: 'Set disabled property to true'
      }
    ],
    visualIndicators: [
      this.disabled ? 'Grayed out appearance' : 'Normal appearance'
    ]
  };
}
```

### Step 5: Add State Tracking

Components use `updateComponentState()` to track state changes:

```typescript
protected updated(changedProperties: PropertyValues): void {
  super.updated(changedProperties);

  if (changedProperties.has('disabled')) {
    this.updateComponentState('disabled', this.disabled);
  }

  if (changedProperties.has('loading')) {
    this.updateComponentState('loading', this.loading);
  }
}

// This automatically emits ai-state-change events
private updateComponentState(key: string, value: any): void {
  this.componentState.set(key, value);

  this.emit('ai-state-change', {
    key,
    value,
    fullState: this.aiState
  });
}
```

### Step 6: Add Semantic Attributes

Use HTML attributes to provide AI context:

```html
<!-- Semantic role for AI understanding -->
<forge-button
  semantic-role="form-submit"
  ai-context="user-registration">
  Register
</forge-button>

<!-- Criticality level for AI prioritization -->
<forge-alert
  semantic-role="error-message"
  criticality="high">
  Payment failed
</forge-alert>
```

## Best Practices

### 1. Metadata Completeness

- **Always provide purpose**: Clear, concise description of component function
- **Set appropriate criticality**: Based on business impact
- **Include interaction patterns**: Document all supported user interactions
- **Add validation rules**: Express data constraints
- **Define relationships**: Connect related components

### 2. Semantic Role Selection

Choose semantic roles that clearly describe the component's purpose:

```html
<!-- Good: Specific and descriptive -->
<forge-button semantic-role="form-submit" ai-context="checkout">
  Place Order
</forge-button>

<!-- Bad: Too generic -->
<forge-button semantic-role="button">
  Place Order
</forge-button>
```

### 3. Context Hierarchies

Structure AI context from general to specific:

```html
<div ai-context="user-dashboard">
  <section ai-context="user-dashboard.profile">
    <forge-button
      semantic-role="save-action"
      ai-context="user-dashboard.profile.save">
      Save Profile
    </forge-button>
  </section>
</div>
```

### 4. State Explanation Guidelines

Keep explanations concise but informative:

```typescript
// Good: Clear and informative
explainState(): AIStateExplanation {
  if (this.loading) {
    return {
      currentState: 'loading',
      possibleStates: ['enabled', 'disabled', 'loading'],
      stateDescription: `${this.label} button is loading. Please wait.`
    };
  }
  if (this.disabled) {
    return {
      currentState: 'disabled',
      possibleStates: ['enabled', 'disabled', 'loading'],
      stateDescription: `${this.label} button is disabled. ${this.disabledReason || 'Action not available.'}`
    };
  }
  return {
    currentState: 'enabled',
    possibleStates: ['enabled', 'disabled', 'loading'],
    stateDescription: `${this.label} button is ready. Click to ${this.actionDescription}.`
  };
}
```

### 5. Action Availability

Always indicate why an action is unavailable:

```typescript
getPossibleActions(): AIAction[] {
  return [
    {
      name: 'submit',
      description: this.disabled
        ? 'Cannot submit: form has validation errors'
        : 'Submit the form',
      available: !this.disabled && !this.loading
    }
  ];
}
```

### 6. Performance Considerations

- **Lazy evaluation**: Generate complex metadata only when accessed
- **Caching**: Cache computed state explanations when possible
- **Minimal overhead**: Keep metadata lightweight
- **Optional features**: Make expensive features opt-in

Include performance metrics in AI state:

```typescript
get aiState(): AIComponentState {
  return {
    component: this.tagName.toLowerCase(),
    variant: this.variant,
    renderTime: this.renderTime,
    lastInteraction: this.lastInteractionTime,
    interactionCount: this.interactionCount,
    performanceMode: this.performanceMode
  };
}
```

## Testing AI Metadata

### Unit Testing AI Methods

```typescript
import { expect, fixture, html } from '@open-wc/testing';

describe('AI Metadata', () => {
  it('should provide accurate state description', async () => {
    const el = await fixture(html`
      <forge-button variant="primary" disabled>Submit</forge-button>
    `);

    const state = el.explainState();
    expect(state.stateDescription).to.include('disabled');
    expect(state.currentState).to.equal('disabled');
  });

  it('should list available actions', async () => {
    const el = await fixture(html`<forge-button>Click</forge-button>`);

    const actions = el.getPossibleActions();
    const clickAction = actions.find(a => a.name === 'click');

    expect(clickAction).to.exist;
    expect(clickAction.available).to.be.true;
  });

  it('should expose AI state', async () => {
    const el = await fixture(html`
      <forge-button
        variant="secondary"
        semantic-role="cancel-action">
        Cancel
      </forge-button>
    `);

    const state = el.aiState;
    expect(state.component).to.equal('forge-button');
    expect(state.semanticRole).to.equal('cancel-action');
  });
});
```

### Integration Testing

```typescript
describe('AI Integration', () => {
  it('should provide context for AI systems', async () => {
    const container = await fixture(html`
      <div ai-context="checkout">
        <forge-input
          semantic-role="email-input"
          value="user@example.com">
        </forge-input>
        <forge-button
          semantic-role="form-submit"
          ai-context="checkout.submit">
          Place Order
        </forge-button>
      </div>
    `);

    const button = container.querySelector('forge-button');
    const input = container.querySelector('forge-input');

    // Verify AI can understand the UI state
    expect(button.explainState().stateDescription).to.include('Place Order');
    expect(input.aiState.state.value).to.equal('user@example.com');

    // Verify AI can determine next actions
    const actions = button.getPossibleActions();
    expect(actions.some(a => a.name === 'click')).to.be.true;
  });
});
```

### Testing Integration

- **Validate metadata**: Include metadata validation in tests
- **Test actions**: Verify all declared actions work correctly
- **State accuracy**: Ensure state explanations match reality
- **Performance tracking**: Monitor AI metadata performance impact

## AI Metadata Builder

Utility class for constructing complex metadata:

```typescript
const metadata = new AIMetadataBuilder()
  .setPurpose('User authentication form')
  .setContext('login-page')
  .setDataType('text')
  .setCriticality('high')
  .addInteraction({
    type: 'input',
    description: 'Enter credentials',
    outcome: 'Updates form state'
  })
  .addValidation({
    type: 'required',
    message: 'Username is required'
  })
  .build();
```

## Development Tools

### AI Metadata Validator

```typescript
export const AIMetadataUtils = {
  validate(metadata: AIMetadata): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!metadata.purpose) {
      errors.push('Missing required field: purpose');
    }

    if (metadata.criticality &&
        !['low', 'medium', 'high', 'critical'].includes(metadata.criticality)) {
      errors.push('Invalid criticality level');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  describe(metadata: AIMetadata): string {
    const parts = [metadata.purpose];

    if (metadata.context) parts.push(`in ${metadata.context} context`);
    if (metadata.dataType) parts.push(`handling ${metadata.dataType} data`);
    if (metadata.criticality !== 'low') parts.push(`with ${metadata.criticality} criticality`);

    return parts.join(' ');
  }
};
```

## Related Documentation

- [AI Integration Guide](./integration-guide.md)
- [Component API Reference](../api-reference.md)
- [Performance Monitoring Guide](../performance-monitoring-guide.md)
