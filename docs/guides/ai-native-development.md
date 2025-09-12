# AI-Native Development Guide

## Introduction

Welcome to AI-Native Development with @nexcraft/forge - the FIRST component library built specifically for the age of AI-assisted development. This guide will help you leverage AI coding tools like Cursor, GitHub Copilot, and Claude to build better applications faster.

## What is AI-Native Development?

AI-Native Development is a paradigm shift where components are designed to communicate directly with AI systems, providing context, constraints, and capabilities automatically. Instead of AI tools guessing about component behavior, they have direct access to structured metadata.

### Traditional vs AI-Native

```typescript
// Traditional Approach
// AI must guess component capabilities
<Button onClick={handleClick}>Save</Button>

// AI-Native Approach  
// AI understands component purpose and constraints
<forge-button 
  variant="primary" 
  ai-context="form-submission"
  max-render-ms="2">
  Save Changes
</forge-button>
```

## Getting Started with AI-Native Development

### 1. Installation

```bash
npm install @nexcraft/forge@0.5.2-beta.8
```

### 2. Basic Setup

```javascript
import '@nexcraft/forge';

// Components automatically expose AI metadata
const button = document.querySelector('forge-button');
console.log(button.aiState); // Rich AI metadata available
```

### 3. Enable AI Features in Your IDE

#### For Cursor IDE

Add to your `.cursorrules` file:

```markdown
# @nexcraft/forge AI-Native Components

When working with @nexcraft/forge components:

1. Always check component aiState for current capabilities
2. Use ai-context attribute to provide usage context  
3. Leverage component.explainState() for debugging
4. Check component.getPossibleActions() before interactions
5. Use semantic variants (primary for main actions, danger for destructive)
6. Always include performance constraints (max-render-ms)

Example patterns:
- Form submission: variant="primary", ai-context="form-submit"
- Destructive actions: variant="danger", ai-context="delete-action"  
- Navigation: variant="outline", ai-context="navigation"
```

#### For GitHub Copilot

Configure your editor settings:

```json
{
  "github.copilot.advanced": {
    "componentLibraries": ["@nexcraft/forge"],
    "enableAIMetadata": true
  }
}
```

#### For Claude Code

Claude automatically recognizes @nexcraft/forge AI metadata when you import the library.

## AI-Enhanced Component Usage

### Intelligent Component Selection

AI tools can suggest the right component for your use case:

```javascript
// AI understands context and suggests appropriate components

// ❌ Generic request
"Create a button"

// ✅ Context-aware request  
"Create a form submission button with loading state and validation"

// AI suggests:
<forge-button 
  variant="primary" 
  type="submit"
  ai-context="form-submission"
  max-render-ms="2">
  Save Changes
</forge-button>
```

### Smart Prop Suggestions

```javascript
// AI knows component capabilities and suggests appropriate props

// Request: "Create a data table for user management"
// AI suggests with context:
<forge-data-grid
  sortable
  selectable  
  ai-context="user-management"
  max-render-ms="16"
  aria-label="User management table">
  
  <!-- AI knows proper column structure -->
  <forge-data-grid-column field="name" sortable>Name</forge-data-grid-column>
  <forge-data-grid-column field="email" sortable>Email</forge-data-grid-column>
  <forge-data-grid-column field="role">Role</forge-data-grid-column>
</forge-data-grid>
```

### Accessibility Automation

AI automatically includes proper accessibility attributes:

```javascript
// Request: "Create a modal dialog for editing user profile"
// AI includes accessibility by default:

<forge-modal 
  open
  ai-context="user-profile-edit"
  aria-labelledby="edit-profile-title"
  aria-describedby="edit-profile-desc">
  
  <h2 id="edit-profile-title">Edit Profile</h2>
  <p id="edit-profile-desc">Update your account information</p>
  
  <!-- AI knows form should be in modal -->
  <forge-form-field label="Full Name" required>
    <forge-input 
      type="text" 
      aria-describedby="name-help"
      max-render-ms="2">
    </forge-input>
  </forge-form-field>
</forge-modal>
```

## Component Communication with AI

### Real-Time State Access

```javascript
// AI tools can query component state in real-time
const button = document.querySelector('forge-button');

// Get comprehensive state information
const aiState = button.aiState;
console.log(aiState);
/*
{
  component: 'forge-button',
  semanticRole: 'button',
  context: 'form-submission',
  metadata: {
    purpose: 'Trigger actions and user interactions',
    criticality: 'medium',
    usagePatterns: ['form-submission', 'navigation', 'modal-trigger'],
    antiPatterns: ['never use primary for destructive actions']
  },
  state: { variant: 'primary', disabled: false, loading: false },
  possibleActions: [
    { name: 'click', available: true, description: 'Trigger button action' }
  ],
  stateExplanation: {
    currentState: 'enabled',
    stateDescription: 'Button is enabled and ready for interaction'
  }
}
*/
```

### Component Self-Explanation

```javascript
// Components can explain their current state
console.log(button.explainState());
// "Button is enabled and primary variant. Not loading. Ready for click interaction."

// Get available actions
console.log(button.getPossibleActions());
// [{ name: 'click', description: 'Trigger button action', available: true }]
```

## AI-Powered Development Patterns

### 1. Context-Aware Form Building

```javascript
// Request: "Build a user registration form with validation"
// AI creates context-aware form:

<form ai-context="user-registration">
  <forge-form-field label="Email Address" required>
    <forge-input 
      type="email" 
      ai-context="user-email"
      required
      aria-describedby="email-help">
    </forge-input>
    <small id="email-help">We'll never share your email</small>
  </forge-form-field>

  <forge-form-field label="Password" required>
    <forge-input 
      type="password" 
      ai-context="password-creation"
      min-length="8"
      aria-describedby="password-requirements">
    </forge-input>
    <small id="password-requirements">
      Must be at least 8 characters with letters and numbers
    </small>
  </forge-form-field>

  <forge-button 
    variant="primary" 
    type="submit"
    ai-context="registration-submit"
    max-render-ms="4">
    Create Account
  </forge-button>
</form>
```

### 2. Smart Component Composition

```javascript
// Request: "Create a dashboard with data visualization and controls"
// AI composes components intelligently:

<div class="dashboard" ai-context="analytics-dashboard">
  <!-- AI knows navigation comes first -->
  <forge-navigation-bar ai-context="dashboard-navigation">
    <forge-dropdown ai-context="user-menu" placement="bottom-end">
      <forge-avatar slot="trigger" name="John Doe"></forge-avatar>
      <forge-dropdown-item>Profile</forge-dropdown-item>
      <forge-dropdown-item>Settings</forge-dropdown-item>
    </forge-dropdown>
  </forge-navigation-bar>

  <!-- AI understands layout patterns -->
  <main class="dashboard-content">
    <forge-card ai-context="data-visualization" elevation="2">
      <h2>Revenue Overview</h2>
      <forge-data-grid 
        ai-context="revenue-data"
        sortable
        max-render-ms="16">
        <!-- Data grid columns -->
      </forge-data-grid>
    </forge-card>

    <forge-card ai-context="quick-actions" elevation="1">
      <h3>Quick Actions</h3>
      <forge-button variant="primary" ai-context="export-data">
        Export Data
      </forge-button>
      <forge-button variant="outline" ai-context="refresh-data">
        Refresh
      </forge-button>
    </forge-card>
  </main>
</div>
```

### 3. Performance-Optimized Suggestions

AI automatically includes performance optimizations:

```javascript
// Request: "Create a large data table with sorting and filtering"
// AI includes performance optimizations:

<forge-data-grid
  ai-context="large-dataset"
  virtual-scrolling
  max-render-ms="16"
  performance-mode="auto"
  sortable
  filterable
  aria-label="Large dataset table">
  
  <!-- AI knows to use virtual scrolling for performance -->
  <!-- AI sets appropriate render budgets -->
  <!-- AI includes accessibility by default -->
</forge-data-grid>
```

## AI-Assisted Debugging

### Component State Inspection

```javascript
// AI can help debug component issues
function debugComponent(selector) {
  const component = document.querySelector(selector);
  const aiState = component.aiState;
  
  console.log('🔍 Component Debug Info:');
  console.log('Current State:', aiState.stateExplanation);
  console.log('Available Actions:', aiState.possibleActions);
  console.log('Performance:', aiState.performance);
  
  // AI can suggest fixes based on state
  if (aiState.performance?.violations > 0) {
    console.log('⚠️ Performance issues detected');
    console.log('Suggestions:', getPerformanceSuggestions(component));
  }
}

debugComponent('forge-data-grid');
```

### Error Context Enhancement

```javascript
// AI provides enhanced error context
component.addEventListener('ai-state-change', (event) => {
  const { key, value, fullState } = event.detail;
  
  // AI can understand state changes and provide insights
  if (key === 'error' && value) {
    console.log('🚨 Component Error Context:');
    console.log('Component:', fullState.component);
    console.log('Context:', fullState.context);
    console.log('State:', fullState.stateExplanation);
    console.log('Possible Actions:', fullState.possibleActions);
  }
});
```

## Best Practices for AI-Native Development

### 1. Always Provide Context

```javascript
// ✅ Good: Clear context for AI
<forge-button variant="danger" ai-context="delete-user">
  Delete User
</forge-button>

// ❌ Bad: No context for AI
<forge-button variant="primary">
  Delete User
</forge-button>
```

### 2. Use Semantic Variants

```javascript
// ✅ Good: Semantic meaning
<forge-alert severity="error" ai-context="form-validation">
  Please fix the errors above
</forge-alert>

// ❌ Bad: Generic usage
<forge-alert>
  Please fix the errors above
</forge-alert>
```

### 3. Include Performance Constraints

```javascript
// ✅ Good: Performance awareness
<forge-data-grid 
  max-render-ms="16"
  performance-mode="auto"
  ai-context="user-data">
</forge-data-grid>

// ❌ Bad: No performance guidance
<forge-data-grid>
</forge-data-grid>
```

### 4. Leverage Component Communication

```javascript
// ✅ Good: Components communicate with AI
function handleFormSubmit() {
  const form = document.querySelector('form');
  const buttons = form.querySelectorAll('forge-button');
  
  buttons.forEach(button => {
    // AI understands the context automatically
    if (button.aiState.context === 'form-submit') {
      button.loading = true;
    }
  });
}
```

## AI Prompt Patterns

### Component Generation Prompts

```markdown
# Effective AI Prompts for @nexcraft/forge

## Form Components
"Create a [type] form for [purpose] with [validation requirements] using forge components"

Example:
"Create a login form for user authentication with email validation and password requirements using forge components"

## Data Display
"Create a [component] to display [data type] with [features] for [context] using forge components"

Example:
"Create a data table to display user information with sorting and filtering for admin dashboard using forge components"

## Interactive Elements
"Create [interaction] for [purpose] with [constraints] in [context] using forge components"

Example:
"Create a multi-step wizard for user onboarding with validation in mobile app using forge components"
```

### Debugging Prompts

```markdown
# AI Debugging Assistance

"Why is my [component] [behavior] when [condition]?"

Example:
"Why is my forge-data-grid rendering slowly when displaying 1000+ rows?"

AI Response includes:
- Component state analysis
- Performance metrics review
- Optimization suggestions
- Alternative approaches
```

## Advanced AI Integration

### Custom AI Metadata

```javascript
// Extend components with custom AI metadata
class CustomButton extends ForgeButton {
  protected aiMetadata = {
    ...super.aiMetadata,
    purpose: 'Custom business action button',
    businessContext: 'invoice-processing',
    complianceRequirements: ['SOX', 'GDPR'],
    customActions: ['auditLog', 'approvalWorkflow']
  };
  
  getPossibleActions() {
    return [
      ...super.getPossibleActions(),
      {
        name: 'auditLog',
        description: 'Log action for compliance',
        available: this.hasPermission('audit'),
        result: 'Creates audit trail entry'
      }
    ];
  }
}
```

### AI-Powered Analytics

```javascript
// Track AI interactions for insights
class AIAnalytics {
  static trackComponentUsage(component, action, context) {
    const aiState = component.aiState;
    
    // Send to analytics with AI context
    analytics.track('component_interaction', {
      component: aiState.component,
      action: action,
      context: aiState.context,
      metadata: aiState.metadata,
      performance: aiState.performance
    });
  }
}

// Use with components
button.addEventListener('click', () => {
  AIAnalytics.trackComponentUsage(button, 'click', 'user-action');
});
```

## Migration from Traditional to AI-Native

### Step 1: Add AI Context

```javascript
// Before
<button className="btn btn-primary" onClick={handleSave}>
  Save
</button>

// After
<forge-button 
  variant="primary" 
  ai-context="save-action"
  onClick={handleSave}>
  Save
</forge-button>
```

### Step 2: Leverage AI Features

```javascript
// Use AI state for dynamic behavior
const button = document.querySelector('forge-button');

if (button.aiState.possibleActions.find(a => a.name === 'click' && a.available)) {
  // AI confirms button is ready for interaction
  button.click();
}
```

### Step 3: Add Performance Monitoring

```javascript
// AI-native performance awareness
<forge-data-grid 
  max-render-ms="16"
  performance-mode="auto"
  onPerformanceViolation={handleSlowRender}>
</forge-data-grid>
```

## Troubleshooting AI Integration

### Common Issues

1. **AI not recognizing components**
   ```javascript
   // Ensure components are properly imported
   import '@nexcraft/forge';
   
   // Check AI metadata availability
   console.log(component.aiState);
   ```

2. **Missing context suggestions**
   ```javascript
   // Always provide ai-context
   <forge-button ai-context="user-action">Click me</forge-button>
   ```

3. **Performance suggestions not working**
   ```javascript
   // Include performance constraints
   <forge-component max-render-ms="2" performance-mode="auto">
   ```

### Debug Commands

```javascript
// Check AI capabilities
window.forgeAIDebug = {
  getAllComponents: () => {
    return Array.from(document.querySelectorAll('*'))
      .filter(el => el.aiState)
      .map(el => ({
        tag: el.tagName.toLowerCase(),
        state: el.aiState
      }));
  },
  
  getComponentSuggestions: (element) => {
    const aiState = element.aiState;
    return {
      performance: aiState.performance,
      accessibility: aiState.metadata.a11yGuidelines,
      improvements: generateImprovements(aiState)
    };
  }
};
```

## Future of AI-Native Development

### Upcoming Features

- **Natural Language Component Generation**: "Create a user profile form" → Complete component
- **Automated Testing**: AI generates tests based on component metadata
- **Performance Optimization**: AI suggests real-time optimizations
- **Accessibility Auditing**: Automatic WCAG compliance checking
- **Code Review**: AI reviews component usage patterns

### Community and Ecosystem

- **VS Code Extension**: Enhanced IntelliSense with AI metadata
- **Storybook Integration**: AI-generated component stories
- **Design Tool Plugins**: Figma/Sketch integration with AI metadata
- **Framework Adapters**: AI-native wrappers for React, Vue, Angular

---

**Ready to build faster with AI? Start using @nexcraft/forge today and experience the future of component development.**

## Related Documentation

- [AI Metadata System](../ai-metadata-system.md)
- [Phase 9: AI-Native Development Strategy](../../plans/phases/phase-9-ai-native-development.md)
- [Performance Monitoring](../performance-monitoring.md)
- [Component Architecture](../../plans/architecture/component-architecture.md)