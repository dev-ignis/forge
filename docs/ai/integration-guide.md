# AI Integration Guide

Real-world examples and patterns for integrating Forge with AI systems.

## Table of Contents
- [ChatGPT Integration](#chatgpt-integration)
- [Claude Integration](#claude-integration)
- [GitHub Copilot Integration](#github-copilot-integration)
- [Custom AI Agents](#custom-ai-agents)
- [Voice Assistants](#voice-assistants)
- [Automated Testing](#automated-testing)
- [Analytics & Monitoring](#analytics--monitoring)
- [Common UI Patterns](#common-ui-patterns)
- [Best Practices](#best-practices)

## ChatGPT Integration

### Basic UI Context Provider

```javascript
// chatgpt-integration.js
import { Configuration, OpenAIApi } from 'openai';

class ChatGPTUIAssistant {
  constructor(apiKey) {
    this.openai = new OpenAIApi(new Configuration({ apiKey }));
  }

  // Gather context from all Forge components on the page
  gatherUIContext() {
    const components = document.querySelectorAll('[data-semantic-role]');
    const context = [];

    components.forEach(component => {
      if (typeof component.explainState === 'function') {
        context.push({
          type: component.tagName.toLowerCase(),
          state: component.explainState(),
          actions: component.getPossibleActions?.() || [],
          context: component.getAttribute('ai-context'),
          role: component.getAttribute('semantic-role')
        });
      }
    });

    return context;
  }

  // Ask ChatGPT about the current UI state
  async askAboutUI(userQuestion) {
    const uiContext = this.gatherUIContext();

    const response = await this.openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a UI assistant. Help users interact with the application.'
        },
        {
          role: 'user',
          content: `Current UI state: ${JSON.stringify(uiContext, null, 2)}\n\nUser question: ${userQuestion}`
        }
      ]
    });

    return response.data.choices[0].message.content;
  }

  // Suggest next action based on UI state
  async suggestNextAction() {
    const uiContext = this.gatherUIContext();
    const availableActions = uiContext
      .flatMap(c => c.actions)
      .filter(a => a.available);

    const response = await this.openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Analyze the UI and suggest the most logical next action for the user.'
        },
        {
          role: 'user',
          content: `Available actions: ${JSON.stringify(availableActions)}\nUI Context: ${JSON.stringify(uiContext)}`
        }
      ]
    });

    return response.data.choices[0].message.content;
  }
}

// Usage
const assistant = new ChatGPTUIAssistant('your-api-key');

// Example: Help user complete a form
const formButton = document.querySelector('forge-button[semantic-role="form-submit"]');
if (!formButton.getPossibleActions().find(a => a.name === 'click').available) {
  const suggestion = await assistant.askAboutUI('Why can\'t I submit the form?');
  console.log(suggestion); // "The form cannot be submitted because required fields are empty..."
}
```

### Form Validation Assistant

```javascript
class FormValidationAI {
  constructor(openai) {
    this.openai = openai;
  }

  async validateWithAI(formElement) {
    // Gather all form fields
    const fields = formElement.querySelectorAll('forge-input, forge-select, forge-checkbox');
    const fieldData = [];

    fields.forEach(field => {
      fieldData.push({
        name: field.name || field.id,
        type: field.type,
        value: field.value,
        required: field.required,
        state: field.explainState(),
        semanticRole: field.getAttribute('semantic-role')
      });
    });

    // Ask ChatGPT to validate the form data
    const response = await this.openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Validate form data and provide specific, helpful feedback.'
        },
        {
          role: 'user',
          content: `Validate this form data: ${JSON.stringify(fieldData)}`
        }
      ]
    });

    return JSON.parse(response.data.choices[0].message.content);
  }

  // Real-time field suggestions
  async suggestFieldValue(field) {
    const context = {
      fieldName: field.name,
      fieldType: field.type,
      currentValue: field.value,
      semanticRole: field.getAttribute('semantic-role'),
      formContext: field.closest('form')?.getAttribute('ai-context')
    };

    const response = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Suggest a value for field: ${JSON.stringify(context)}`
        }
      ]
    });

    return response.data.choices[0].message.content;
  }
}
```

## Claude Integration

### Claude UI Navigator

```javascript
// claude-integration.js
class ClaudeUINavigator {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.anthropic.com/v1/messages';
  }

  async analyzeComponent(element) {
    if (!element.aiState) return null;

    const analysis = {
      state: element.aiState,
      explanation: element.explainState(),
      actions: element.getPossibleActions(),
      context: element.getAttribute('ai-context'),
      role: element.getAttribute('semantic-role'),
      performance: {
        renderTime: element.renderTime,
        renderCount: element.renderCount
      }
    };

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        messages: [{
          role: 'user',
          content: `Analyze this UI component and suggest improvements: ${JSON.stringify(analysis)}`
        }],
        max_tokens: 1024
      })
    });

    const data = await response.json();
    return data.content[0].text;
  }

  // Interactive UI guide
  async createInteractiveGuide() {
    const components = document.querySelectorAll('[semantic-role]');
    const guide = [];

    for (const component of components) {
      const actions = component.getPossibleActions?.() || [];
      const availableActions = actions.filter(a => a.available);

      if (availableActions.length > 0) {
        guide.push({
          element: component.tagName.toLowerCase(),
          location: this.getElementPath(component),
          purpose: component.getAttribute('semantic-role'),
          currentState: component.explainState(),
          nextSteps: availableActions.map(a => a.description)
        });
      }
    }

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        messages: [{
          role: 'user',
          content: `Create a step-by-step guide for using this interface: ${JSON.stringify(guide)}`
        }],
        max_tokens: 2048
      })
    });

    const data = await response.json();
    return data.content[0].text;
  }

  getElementPath(element) {
    const path = [];
    let current = element;

    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      if (current.id) {
        selector += `#${current.id}`;
      } else if (current.className) {
        selector += `.${current.className.split(' ')[0]}`;
      }
      path.unshift(selector);
      current = current.parentElement;
    }

    return path.join(' > ');
  }
}

// Usage Example
const claude = new ClaudeUINavigator('your-api-key');

// Analyze a specific component
const button = document.querySelector('forge-button[semantic-role="checkout"]');
const analysis = await claude.analyzeComponent(button);
console.log(analysis);

// Generate interactive guide
const guide = await claude.createInteractiveGuide();
document.getElementById('help-content').textContent = guide;
```

### Claude-Powered Accessibility Checker

```javascript
class AccessibilityAI {
  constructor(claudeApi) {
    this.claude = claudeApi;
  }

  async checkAccessibility() {
    const components = document.querySelectorAll('forge-button, forge-input, forge-select');
    const issues = [];

    components.forEach(component => {
      // Check for missing labels
      if (!component.getAttribute('aria-label') && !component.label) {
        issues.push({
          element: component.tagName.toLowerCase(),
          issue: 'Missing accessible label',
          severity: 'high',
          suggestion: 'Add aria-label or label attribute',
          currentState: component.explainState()
        });
      }

      // Check for missing semantic roles
      if (!component.getAttribute('semantic-role')) {
        issues.push({
          element: component.tagName.toLowerCase(),
          issue: 'Missing semantic role',
          severity: 'medium',
          suggestion: 'Add semantic-role attribute for AI understanding'
        });
      }
    });

    // Ask Claude for accessibility recommendations
    const response = await this.claude.askClaude({
      prompt: `Review these accessibility issues and provide fixes: ${JSON.stringify(issues)}`,
      context: 'WCAG 2.1 AA compliance'
    });

    return response;
  }
}
```

## GitHub Copilot Integration

### Copilot-Friendly Component Usage

```javascript
// copilot-integration.js

/**
 * Copilot can understand Forge components through their AI metadata
 * Type annotations help Copilot suggest the right properties
 */

// When you type this comment, Copilot understands the component state
// Create a primary button that submits the user registration form
const submitButton = document.createElement('forge-button');
submitButton.variant = 'primary';
submitButton.setAttribute('semantic-role', 'form-submit');
submitButton.setAttribute('ai-context', 'user-registration');

// Copilot can suggest actions based on component state
if (submitButton.explainState().stateDescription.includes('disabled')) {
  // Copilot suggests: Enable the button when form is valid
  const form = document.querySelector('form');
  form.addEventListener('input', () => {
    const isValid = form.checkValidity();
    submitButton.disabled = !isValid;
  });
}

// Copilot understands available actions
const actions = submitButton.getPossibleActions();
// Copilot autocompletes: Find the 'click' action and check if available
const clickAction = actions.find(a => a.name === 'click');
if (clickAction?.available) {
  submitButton.addEventListener('click', handleSubmit);
}
```

### Type-Safe Component Creation with Copilot

```typescript
// copilot-types.ts
import type { ForgeButton, ForgeInput, ForgeSelect } from '@nexcraft/forge';

/**
 * Copilot uses these types to provide better suggestions
 */
class FormBuilder {
  /**
   * When you start typing, Copilot knows all available properties
   */
  createSmartForm() {
    // Copilot suggests: Create form with AI metadata
    const form = document.createElement('form');
    form.setAttribute('ai-context', 'user-profile');

    // Copilot knows ForgeInput properties from AI metadata
    const emailInput = document.createElement('forge-input') as ForgeInput;
    emailInput.type = 'email'; // Copilot suggests valid types
    emailInput.required = true;
    emailInput.setAttribute('semantic-role', 'email-input');

    // Copilot can suggest validation based on component state
    emailInput.addEventListener('forge-change', (e) => {
      const state = emailInput.explainState();
      // Copilot suggests: Check if input is valid
      if (state.stateDescription.includes('invalid')) {
        this.showError('Please enter a valid email');
      }
    });

    return form;
  }
}
```

## Custom AI Agents

### Building a Custom UI Agent

```javascript
// custom-ai-agent.js
class CustomUIAgent {
  constructor(config) {
    this.config = config;
    this.memory = new Map(); // Remember past interactions
  }

  // Learn from user interactions
  learnFromInteraction(component, action, outcome) {
    const key = `${component.tagName}-${action}`;
    if (!this.memory.has(key)) {
      this.memory.set(key, []);
    }

    this.memory.get(key).push({
      state: component.aiState,
      action: action,
      outcome: outcome,
      timestamp: Date.now()
    });
  }

  // Predict user's next action
  predictNextAction(currentComponent) {
    const state = currentComponent.aiState;
    const possibleActions = currentComponent.getPossibleActions();

    // Check memory for similar states
    const history = this.memory.get(currentComponent.tagName) || [];
    const similarStates = history.filter(h =>
      JSON.stringify(h.state) === JSON.stringify(state)
    );

    if (similarStates.length > 0) {
      // Return most common action for this state
      const actionCounts = {};
      similarStates.forEach(s => {
        actionCounts[s.action] = (actionCounts[s.action] || 0) + 1;
      });

      const predictedAction = Object.entries(actionCounts)
        .sort(([,a], [,b]) => b - a)[0][0];

      return possibleActions.find(a => a.name === predictedAction);
    }

    // Default to first available action
    return possibleActions.find(a => a.available);
  }

  // Auto-complete forms based on patterns
  async autoCompleteForm(form) {
    const inputs = form.querySelectorAll('forge-input, forge-select');

    for (const input of inputs) {
      const semanticRole = input.getAttribute('semantic-role');
      const aiContext = input.getAttribute('ai-context');

      // Use AI to suggest values based on semantic role
      const suggestion = await this.suggestValue({
        role: semanticRole,
        context: aiContext,
        type: input.type,
        currentState: input.explainState()
      });

      if (suggestion && !input.value) {
        input.value = suggestion;
        input.dispatchEvent(new Event('change'));
      }
    }
  }

  async suggestValue(config) {
    // Implement your AI logic here
    const suggestions = {
      'email-input': 'user@example.com',
      'name-input': 'John Doe',
      'phone-input': '555-0123',
      'address-input': '123 Main St'
    };

    return suggestions[config.role];
  }
}

// Usage
const agent = new CustomUIAgent({ learning: true });

// Track all interactions
document.addEventListener('click', (e) => {
  if (e.target.tagName.startsWith('FORGE-')) {
    agent.learnFromInteraction(e.target, 'click', 'success');
  }
});

// Predict and highlight next action
setInterval(() => {
  const activeElement = document.activeElement;
  if (activeElement?.tagName.startsWith('FORGE-')) {
    const prediction = agent.predictNextAction(activeElement);
    if (prediction) {
      console.log(`Suggested next action: ${prediction.description}`);
    }
  }
}, 1000);
```

## Voice Assistants

### Alexa/Google Assistant Integration

```javascript
// voice-assistant.js
class VoiceUIController {
  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.synthesis = window.speechSynthesis;
    this.setupRecognition();
  }

  setupRecognition() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript;
      this.processVoiceCommand(command);
    };
  }

  async processVoiceCommand(command) {
    // Find relevant components based on voice command
    const components = document.querySelectorAll('[semantic-role]');

    for (const component of components) {
      const state = component.explainState();
      const actions = component.getPossibleActions();

      // Match command to component actions
      if (command.includes('click') || command.includes('press')) {
        const clickAction = actions.find(a => a.name === 'click' && a.available);
        if (clickAction && state.stateDescription.toLowerCase().includes(command.toLowerCase())) {
          component.click();
          this.speak(`Clicked ${component.getAttribute('semantic-role')}`);
          break;
        }
      }

      if (command.includes('fill') || command.includes('type')) {
        if (component.tagName === 'FORGE-INPUT') {
          const value = command.split('type')[1]?.trim();
          if (value) {
            component.value = value;
            this.speak(`Filled ${component.getAttribute('semantic-role')} with ${value}`);
            break;
          }
        }
      }
    }
  }

  speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    this.synthesis.speak(utterance);
  }

  // Describe current UI state
  describeUI() {
    const components = document.querySelectorAll('[semantic-role]');
    const descriptions = [];

    components.forEach(component => {
      if (component.explainState) {
        descriptions.push(component.explainState().stateDescription);
      }
    });

    this.speak(`Current page has ${descriptions.length} interactive elements. ${descriptions.join('. ')}`);
  }
}

// Usage
const voiceUI = new VoiceUIController();

// Voice commands
// "Click the submit button"
// "Fill email with john@example.com"
// "Describe the page"
```

## Automated Testing

### AI-Driven Test Generation

```javascript
// ai-test-generator.js
class AITestGenerator {
  generateTestsForComponent(componentTag) {
    const element = document.createElement(componentTag);
    const tests = [];

    // Generate tests based on AI metadata
    const actions = element.getPossibleActions();

    // Test each action
    actions.forEach(action => {
      tests.push({
        name: `should ${action.description}`,
        test: async () => {
          const el = document.createElement(componentTag);
          document.body.appendChild(el);

          if (action.available) {
            // Perform action
            if (typeof el[action.name] === 'function') {
              el[action.name](...(action.params || []));
            }

            // Verify state changed
            const newState = el.explainState();
            expect(newState).not.toBe(el.explainState());
          } else {
            // Verify action is not available
            expect(() => el[action.name]()).toThrow();
          }

          document.body.removeChild(el);
        }
      });
    });

    // Test state transitions
    tests.push({
      name: 'should handle state transitions',
      test: async () => {
        const el = document.createElement(componentTag);
        const initialState = el.aiState;

        // Trigger state changes
        el.disabled = true;
        expect(el.aiState.disabled).toBe(true);
        expect(el.explainState().stateDescription).toContain('disabled');

        el.disabled = false;
        expect(el.aiState.disabled).toBe(false);
        expect(el.explainState().stateDescription).not.toContain('disabled');
      }
    });

    return tests;
  }

  // Generate E2E tests from user flows
  generateE2ETests(userFlow) {
    const tests = [];

    userFlow.steps.forEach((step, index) => {
      tests.push({
        name: `Step ${index + 1}: ${step.description}`,
        test: async () => {
          const element = document.querySelector(step.selector);

          // Verify element is in expected state
          expect(element.explainState().stateDescription).toContain(step.expectedState);

          // Perform action
          if (step.action) {
            const action = element.getPossibleActions()
              .find(a => a.name === step.action);

            expect(action.available).toBe(true);
            element[step.action](...(step.params || []));
          }

          // Verify outcome
          if (step.expectedOutcome) {
            await new Promise(resolve => setTimeout(resolve, 100));
            expect(element.explainState().stateDescription).toContain(step.expectedOutcome);
          }
        }
      });
    });

    return tests;
  }
}
```

## Analytics & Monitoring

### AI-Powered Analytics Dashboard

```javascript
// ai-analytics.js
class AIAnalytics {
  constructor() {
    this.metrics = [];
    this.startTracking();
  }

  startTracking() {
    // Track all Forge component interactions
    document.addEventListener('click', this.trackInteraction.bind(this));
    document.addEventListener('forge-change', this.trackInteraction.bind(this));

    // Monitor performance
    setInterval(() => this.collectPerformanceMetrics(), 5000);
  }

  trackInteraction(event) {
    const target = event.target;
    if (!target.tagName.startsWith('FORGE-')) return;

    const metric = {
      timestamp: Date.now(),
      component: target.tagName.toLowerCase(),
      event: event.type,
      state: target.aiState,
      explanation: target.explainState(),
      semanticRole: target.getAttribute('semantic-role'),
      aiContext: target.getAttribute('ai-context'),
      performance: {
        renderTime: target.renderTime,
        renderCount: target.renderCount
      }
    };

    this.metrics.push(metric);
    this.analyzePattern(metric);
  }

  collectPerformanceMetrics() {
    const components = document.querySelectorAll('[data-semantic-role]');
    const performanceData = [];

    components.forEach(component => {
      if (component.renderTime !== undefined) {
        performanceData.push({
          component: component.tagName.toLowerCase(),
          renderTime: component.renderTime,
          renderCount: component.renderCount,
          performanceMode: component.performanceMode,
          violations: component.renderTime > (component.maxRenderMs || Infinity)
        });
      }
    });

    // Identify performance bottlenecks
    const slowComponents = performanceData
      .filter(d => d.violations)
      .sort((a, b) => b.renderTime - a.renderTime);

    if (slowComponents.length > 0) {
      console.warn('Performance violations detected:', slowComponents);
      this.suggestOptimizations(slowComponents);
    }
  }

  generateInsights() {
    return {
      mostUsedComponents: this.getMostUsedComponents(),
      averageRenderTimes: this.getAverageRenderTimes(),
      userFlow: this.detectUserFlow(),
      bottlenecks: this.identifyBottlenecks(),
      recommendations: this.generateRecommendations()
    };
  }
}
```

## Common UI Patterns

### Authentication Patterns

#### Login Form

```jsx
import { ForgeInput, ForgeButton, ForgeCard, ForgeAlert } from '@nexcraft/forge/integrations/react'

function LoginForm() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(e.target)
      await login(formData.get('email'), formData.get('password'))
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ForgeCard className="w-full max-w-md">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Sign in to your account
          </h2>

          {error && (
            <ForgeAlert severity="error" className="mb-6">
              {error}
            </ForgeAlert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <ForgeInput
              name="email"
              type="email"
              label="Email address"
              required
              autoComplete="email"
              semantic-role="email-input"
              ai-context="login-form"
            />

            <ForgeInput
              name="password"
              type="password"
              label="Password"
              required
              autoComplete="current-password"
              semantic-role="password-input"
              ai-context="login-form"
            />

            <ForgeButton
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
              semantic-role="form-submit"
              ai-context="login-form.submit"
            >
              Sign in
            </ForgeButton>
          </form>
        </div>
      </ForgeCard>
    </div>
  )
}
```

### Dashboard Patterns

#### KPI Cards

```jsx
import { ForgeCard, ForgeBadge, ForgeProgress } from '@nexcraft/forge/integrations/react'

function KPICards({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ForgeCard semantic-role="kpi-card" ai-context="dashboard.revenue">
        <div className="p-6">
          <p className="text-sm font-medium text-gray-500 uppercase">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">${data.revenue.toLocaleString()}</p>
          <div className="mt-4">
            <ForgeBadge variant="success">+12.5%</ForgeBadge>
            <span className="text-sm text-gray-500 ml-2">vs last period</span>
          </div>
        </div>
      </ForgeCard>
    </div>
  )
}
```

### Form Patterns

#### Contact Form

```jsx
import { ForgeInput, ForgeButton, ForgeCard, ForgeSelect } from '@nexcraft/forge/integrations/react'

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)

    try {
      await submitContactForm(Object.fromEntries(formData))
      setSubmitted(true)
    } catch (error) {
      console.error('Failed to submit form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ForgeCard className="max-w-2xl mx-auto" semantic-role="contact-form" ai-context="customer-support">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ForgeInput
              name="firstName"
              label="First name"
              required
              semantic-role="name-input"
              ai-context="contact-form.firstname"
            />
            <ForgeInput
              name="lastName"
              label="Last name"
              required
              semantic-role="name-input"
              ai-context="contact-form.lastname"
            />
          </div>

          <ForgeInput
            name="email"
            type="email"
            label="Email address"
            required
            semantic-role="email-input"
            ai-context="contact-form.email"
          />

          <ForgeSelect
            name="subject"
            label="Subject"
            required
            semantic-role="category-select"
            ai-context="contact-form.subject"
            options={[
              { value: 'general', label: 'General Inquiry' },
              { value: 'support', label: 'Technical Support' },
              { value: 'sales', label: 'Sales Question' }
            ]}
          />

          <ForgeButton
            type="submit"
            variant="primary"
            loading={loading}
            semantic-role="form-submit"
            ai-context="contact-form.submit"
          >
            Send Message
          </ForgeButton>
        </form>
      </div>
    </ForgeCard>
  )
}
```

## Best Practices

### 1. Always Set Semantic Roles

```html
<!-- Good: AI understands the purpose -->
<forge-button semantic-role="checkout" ai-context="shopping-cart">
  Proceed to Checkout
</forge-button>

<!-- Bad: No context for AI -->
<forge-button>Proceed to Checkout</forge-button>
```

### 2. Use AI Context Hierarchies

```html
<div ai-context="user-profile">
  <section ai-context="user-profile.settings">
    <forge-input semantic-role="email-preference" />
    <forge-button semantic-role="save-settings" />
  </section>
</div>
```

### 3. Monitor Performance in Production

```javascript
// Set up performance monitoring for all components
document.querySelectorAll('[semantic-role]').forEach(component => {
  component.setAttribute('max-render-ms', '5');
  component.setAttribute('performance-mode', 'auto');
});
```

### 4. Cache AI Responses

```javascript
class CachedAI {
  constructor() {
    this.cache = new Map();
  }

  async getAIResponse(component) {
    const key = JSON.stringify(component.aiState);

    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const response = await this.fetchAIResponse(component);
    this.cache.set(key, response);

    // Clear old cache entries
    if (this.cache.size > 100) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    return response;
  }
}
```

### 5. Component Discovery by AI Agents

AI agents can discover these methods through:

1. **AI Manifest** - `ai-manifest.json` documents all AI methods
2. **TypeScript Definitions** - `.d.ts` files show method signatures
3. **Package Documentation** - README and docs explain usage
4. **Runtime Inspection** - Methods are available on component instances

## Related Documentation

- [AI Metadata Reference](./metadata-reference.md)
- [Component API Reference](../api-reference.md)
- [Performance Monitoring Guide](../performance-monitoring-guide.md)
