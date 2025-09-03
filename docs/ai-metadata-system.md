# AI Metadata System (ADR-014)

Comprehensive AI-ready infrastructure enabling intelligent component interactions and automated tooling.

## Overview

The AI Metadata System provides a standardized way for components to expose their capabilities, state, and context to AI systems. This enables intelligent interactions, automated testing, documentation generation, and enhanced developer tooling.

## Key Features

- **Semantic Component Description**: Rich metadata about component purpose and behavior
- **State Exposition**: Real-time component state accessible to AI systems
- **Action Discovery**: Available actions and their requirements
- **Context Awareness**: Component relationships and data flow
- **Performance Metrics**: Built-in monitoring and reporting
- **Validation Framework**: Comprehensive metadata validation

## Architecture

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

## Data Types and Classifications

### AIDataType
Standardized data type classifications:

```typescript
type AIDataType = 
  | 'text' | 'number' | 'boolean' | 'date' | 'time' | 'datetime'
  | 'email' | 'phone' | 'url' | 'password' | 'file' | 'image'
  | 'selection' | 'multiselection' | 'range' | 'color' | 'json' | 'custom';
```

### AICriticality
Business importance levels:

```typescript
type AICriticality = 'low' | 'medium' | 'high' | 'critical';
```

### AIInteractionPattern
Supported user interactions:

```typescript
interface AIInteractionPattern {
  type: 'click' | 'input' | 'select' | 'drag' | 'hover' | 'focus' | 'keyboard' | 'voice' | 'gesture';
  description: string;
  outcome?: string;
  shortcuts?: string[];
}
```

## Component Implementation

### Basic AI Metadata Setup

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
  
  // Implementation of required AI methods
  getPossibleActions(): AIAction[] {
    return [
      {
        name: 'click',
        description: 'Click the button',
        available: !this.disabled,
        result: 'Executes button action'
      }
    ];
  }
  
  explainState(): AIStateExplanation {
    return {
      currentState: this.disabled ? 'disabled' : 'enabled',
      possibleStates: ['enabled', 'disabled', 'loading'],
      stateDescription: `Button is ${this.disabled ? 'disabled and cannot be clicked' : 'enabled and ready for interaction'}`
    };
  }
}
```

### State Tracking

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

## AI Actions System

### Action Definition

Actions represent what can be performed on a component:

```typescript
interface AIAction {
  name: string;                    // Action identifier
  description: string;             // Human-readable description
  available: boolean;              // Whether action is currently available
  parameters?: AIActionParameter[]; // Required parameters
  result?: string;                 // Expected result
  sideEffects?: string[];          // Side effects of the action
}
```

### Complex Action Example

```typescript
// Multi-select component actions
getPossibleActions(): AIAction[] {
  return [
    {
      name: 'selectOption',
      description: 'Select or deselect an option',
      available: !this.disabled && this.isOpen,
      parameters: [
        {
          name: 'value',
          type: 'text',
          required: true,
          description: 'Option value to toggle'
        }
      ],
      result: 'Option selection state changes',
      sideEffects: ['Updates value array', 'Emits change event']
    },
    {
      name: 'search',
      description: 'Search/filter options',
      available: !this.disabled && this.showSearch,
      parameters: [
        {
          name: 'query',
          type: 'text',
          required: true,
          description: 'Search query'
        }
      ],
      result: 'Options filtered by search query'
    }
  ];
}
```

## State Explanation System

### StateExplanation Interface

```typescript
interface AIStateExplanation {
  currentState: string;              // Current state identifier
  possibleStates: string[];          // All possible states
  stateDescription: string;          // Human-readable description
  transitions?: AIStateTransition[]; // State transition rules
  visualIndicators?: string[];       // Visual state indicators
}
```

### Implementation Example

```typescript
explainState(): AIStateExplanation {
  const states = ['closed', 'open', 'searching', 'selecting'];
  let currentState = 'closed';
  
  if (this.isOpen) {
    currentState = this.searchQuery ? 'searching' : 'open';
  } else if (this.value.length > 0) {
    currentState = 'selecting';
  }

  return {
    currentState,
    possibleStates: states,
    stateDescription: `Multi-select is ${currentState}. ${this.value.length} of ${this.options.length} options selected.`,
    transitions: [
      {
        from: 'closed',
        to: 'open',
        trigger: 'Click trigger or press Enter'
      },
      {
        from: 'open',
        to: 'searching',
        trigger: 'Type in search field'
      }
    ],
    visualIndicators: [
      this.isOpen ? 'Dropdown visible' : 'Dropdown hidden',
      `${this.value.length} items selected`
    ]
  };
}
```

## Validation and Relations

### Validation Rules

Components can expose their validation constraints:

```typescript
validation: [
  {
    type: 'required',
    message: 'This field is required'
  },
  {
    type: 'minLength',
    value: 8,
    message: 'Password must be at least 8 characters'
  },
  {
    type: 'pattern',
    value: '^[a-zA-Z0-9]+$',
    message: 'Only alphanumeric characters allowed'
  }
]
```

### Component Relations

Express relationships between components:

```typescript
relations: [
  {
    type: 'controls',
    target: '#modal-content',
    description: 'Button controls modal visibility'
  },
  {
    type: 'updates',
    target: '[data-display]',
    description: 'Updates display value when changed'
  }
]
```

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

## Performance Integration

### Performance Metrics

AI metadata includes performance monitoring:

```typescript
interface AIPerformanceMetrics {
  renderTime: number;        // Last render time in ms
  renderCount: number;       // Total render count
  memoryUsage?: number;      // Memory usage in bytes
  eventHandlingTime?: number; // Event handling performance
  violations: number;        // Performance budget violations
  mode: 'auto' | 'fast' | 'balanced' | 'quality'; // Performance mode
}
```

### Integration with Performance System

```typescript
protected checkPerformance(startTime: number): void {
  const endTime = performance.now();
  this.renderTime = endTime - startTime;
  this.renderCount++;

  // Update AI state with performance metrics
  this.updateComponentState('renderTime', this.renderTime);
  this.updateComponentState('renderCount', this.renderCount);

  if (this.renderTime > this.maxRenderMs) {
    this.updateComponentState('performanceViolations', 
      (this.componentState.get('performanceViolations') || 0) + 1);
  }
}
```

## Usage Examples

### AI-Assisted Testing

```typescript
// AI can discover and test component actions
const component = document.querySelector('forge-multi-select');
const aiState = component.aiState;

// Get available actions
const actions = aiState.possibleActions;
console.log('Available actions:', actions.map(a => a.name));

// Execute action with parameters
if (actions.find(a => a.name === 'selectOption')) {
  component.selectOption('option1');
}

// Verify state change
const newState = component.aiState;
console.log('State after action:', newState.stateExplanation);
```

### Documentation Generation

```typescript
// Generate component documentation from AI metadata
function generateComponentDocs(component: BaseElement): string {
  const state = component.aiState;
  const metadata = state.metadata;
  
  return `
# ${state.component}

**Purpose:** ${metadata.purpose}
**Criticality:** ${metadata.criticality}

## Available Actions
${state.possibleActions.map(action => 
  `- **${action.name}**: ${action.description}`
).join('\n')}

## Interactions
${metadata.interactions?.map(interaction => 
  `- **${interaction.type}**: ${interaction.description}`
).join('\n') || 'None'}
  `;
}
```

### AI-Powered Form Filling

```typescript
// AI can understand and fill forms based on metadata
function fillFormWithAI(form: HTMLElement, data: Record<string, any>) {
  const formFields = form.querySelectorAll('forge-form-field');
  
  formFields.forEach(field => {
    const aiState = field.aiState;
    const fieldName = aiState.attributes.name;
    const dataType = aiState.metadata.dataType;
    
    if (fieldName && data[fieldName]) {
      const value = data[fieldName];
      
      // AI understands data types and can format appropriately
      switch (dataType) {
        case 'email':
          if (isValidEmail(value)) field.value = value;
          break;
        case 'date':
          field.value = formatDate(value);
          break;
        case 'phone':
          field.value = formatPhone(value);
          break;
        default:
          field.value = String(value);
      }
    }
  });
}
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

### Component Inspector

Browser extension or dev tool that visualizes AI metadata:

```typescript
// Component inspector functionality
class ComponentInspector {
  inspectComponent(element: BaseElement) {
    const aiState = element.aiState;
    
    return {
      metadata: aiState.metadata,
      currentState: aiState.stateExplanation,
      availableActions: aiState.possibleActions,
      performance: aiState.performance,
      relationships: this.findRelatedComponents(element)
    };
  }
  
  private findRelatedComponents(element: BaseElement): BaseElement[] {
    const relations = element.aiState.metadata.relations || [];
    return relations
      .map(rel => document.querySelector(rel.target))
      .filter(el => el instanceof BaseElement) as BaseElement[];
  }
}
```

## Best Practices

### Metadata Completeness

1. **Always provide purpose**: Clear, concise description of component function
2. **Set appropriate criticality**: Based on business impact
3. **Include interaction patterns**: Document all supported user interactions
4. **Add validation rules**: Express data constraints
5. **Define relationships**: Connect related components

### Performance Considerations

1. **Lazy evaluation**: Generate complex metadata only when accessed
2. **Caching**: Cache computed state explanations when possible
3. **Minimal overhead**: Keep metadata lightweight
4. **Optional features**: Make expensive features opt-in

### Testing Integration

1. **Validate metadata**: Include metadata validation in tests
2. **Test actions**: Verify all declared actions work correctly
3. **State accuracy**: Ensure state explanations match reality
4. **Performance tracking**: Monitor AI metadata performance impact

## Future Enhancements

### Planned Features

- **Visual state indicators**: Component highlighting based on AI state
- **Automated accessibility testing**: Using AI metadata for a11y validation
- **Smart component suggestions**: AI-powered component recommendations
- **Behavioral analytics**: Track how AI systems interact with components
- **Cross-framework compatibility**: Extend to React, Vue, Angular components

### AI Integration Roadmap

- **Natural language queries**: "Show me all critical components with errors"
- **Automated bug detection**: AI identifies inconsistent states
- **Performance optimization**: AI-suggested performance improvements
- **User experience insights**: AI analysis of interaction patterns
- **Code generation**: Generate components from natural language descriptions

## Migration Guide

### Adding AI Metadata to Existing Components

1. **Extend BaseElement**: Ensure component extends `BaseElement`
2. **Define aiMetadata**: Add metadata object with required fields
3. **Implement required methods**: Add `getPossibleActions()` and `explainState()`
4. **Add state tracking**: Use `updateComponentState()` for state changes
5. **Test metadata**: Validate completeness and accuracy

### Example Migration

```typescript
// Before: Standard Lit component
@customElement('my-component')
export class MyComponent extends LitElement {
  @property() value = '';
  @property() disabled = false;
}

// After: AI-ready component
@customElement('my-component')
export class MyComponent extends BaseElement {
  @property() value = '';
  @property() disabled = false;
  
  protected aiMetadata: AIMetadata = {
    purpose: 'Custom input component',
    dataType: 'text',
    criticality: 'medium'
  };
  
  getPossibleActions(): AIAction[] {
    return [
      {
        name: 'setValue',
        description: 'Set component value',
        available: !this.disabled,
        parameters: [
          { name: 'value', type: 'text', required: true }
        ]
      }
    ];
  }
  
  explainState(): AIStateExplanation {
    return {
      currentState: this.disabled ? 'disabled' : 'enabled',
      possibleStates: ['enabled', 'disabled'],
      stateDescription: `Component is ${this.disabled ? 'disabled' : 'enabled'} with value: "${this.value}"`
    };
  }
}
```

This comprehensive AI metadata system enables powerful interactions between components and AI systems while maintaining performance and developer experience.