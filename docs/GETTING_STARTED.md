# Getting Started with Forge UI Components

Welcome to Forge UI! This guide will help you get up and running with our framework-agnostic component library in minutes.

## Installation

### npm

```bash
npm install @forge-ui/components
```

### yarn

```bash
yarn add @forge-ui/components
```

### CDN (for quick prototyping)

```html
<script type="module" src="https://unpkg.com/@forge-ui/components/dist/forge-ui.es.js"></script>
```

## Framework Integration

### Vanilla HTML/JavaScript

The simplest way to use Forge UI components:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forge UI Demo</title>
</head>
<body>
  <forge-button variant="primary">Click me!</forge-button>
  
  <script type="module">
    import '@forge-ui/components';
    
    document.querySelector('forge-button').addEventListener('forge-click', (e) => {
      console.log('Button clicked:', e.detail);
    });
  </script>
</body>
</html>
```

### React Integration

Forge components work seamlessly in React applications:

```jsx
// App.jsx
import '@forge-ui/components';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleButtonClick = (event) => {
    console.log('Button clicked:', event.detail);
    setCount(count + 1);
  };

  return (
    <div className="app">
      <h1>React + Forge UI</h1>
      <forge-button 
        variant="primary"
        onClick={handleButtonClick}
      >
        Clicked {count} times
      </forge-button>
      
      <forge-input 
        label="Your name"
        placeholder="Enter your name"
        onInput={(e) => console.log('Input value:', e.detail.value)}
      />
    </div>
  );
}

export default App;
```

#### React TypeScript Support

For full TypeScript support with React, install the React wrapper package:

```bash
npm install @forge-ui/react-components
```

```tsx
// App.tsx
import { ForgeButton, ForgeInput } from '@forge-ui/react-components';

function App() {
  const handleClick = (event: CustomEvent) => {
    console.log('Clicked:', event.detail);
  };

  return (
    <div>
      <ForgeButton variant="primary" onClick={handleClick}>
        TypeScript Button
      </ForgeButton>
      <ForgeInput 
        label="Email"
        type="email"
        required
        onInput={(e) => console.log(e.detail.value)}
      />
    </div>
  );
}
```

### Vue 3 Integration

Vue 3 has excellent support for Web Components:

```vue
<!-- App.vue -->
<template>
  <div class="app">
    <h1>Vue 3 + Forge UI</h1>
    <forge-button 
      variant="primary"
      @forge-click="handleClick"
    >
      {{ buttonText }}
    </forge-button>
    
    <forge-input
      v-model="inputValue"
      label="Your message"
      placeholder="Type something..."
    />
    
    <p v-if="inputValue">You typed: {{ inputValue }}</p>
  </div>
</template>

<script setup>
import '@forge-ui/components';
import { ref } from 'vue';

const buttonText = ref('Click me!');
const inputValue = ref('');

const handleClick = (event) => {
  console.log('Button clicked:', event.detail);
  buttonText.value = 'Clicked!';
};
</script>
```

#### Vue Plugin (Optional)

For enhanced Vue integration:

```bash
npm install @forge-ui/vue-components
```

```javascript
// main.js
import { createApp } from 'vue';
import ForgeUI from '@forge-ui/vue-components';
import App from './App.vue';

const app = createApp(App);
app.use(ForgeUI);
app.mount('#app');
```

### Angular Integration

Angular supports Web Components through `CUSTOM_ELEMENTS_SCHEMA`:

```typescript
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import '@forge-ui/components';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular + Forge UI</h1>
    <forge-button 
      variant="primary"
      (forge-click)="handleClick($event)"
    >
      {{ buttonText }}
    </forge-button>
    
    <forge-input
      label="Your input"
      [value]="inputValue"
      (forge-input)="onInput($event)"
    ></forge-input>
  `
})
export class AppComponent {
  buttonText = 'Click me!';
  inputValue = '';

  handleClick(event: CustomEvent) {
    console.log('Button clicked:', event.detail);
    this.buttonText = 'Clicked!';
  }

  onInput(event: CustomEvent) {
    this.inputValue = event.detail.value;
  }
}
```

## Basic Theming

Forge UI components are fully customizable using CSS Custom Properties:

```css
:root {
  /* Primary color palette */
  --forge-color-primary-500: #3b82f6;    /* Blue 500 */
  --forge-color-primary-600: #2563eb;    /* Blue 600 */
  
  /* Spacing system */
  --forge-spacing-sm: 8px;
  --forge-spacing-md: 16px;
  --forge-spacing-lg: 24px;
  
  /* Typography */
  --forge-font-family: 'Inter', system-ui, sans-serif;
  --forge-font-size-base: 1rem;
  
  /* Border radius */
  --forge-border-radius-md: 8px;
}
```

### Dark Mode Support

```css
/* Automatic dark mode based on user preference */
@media (prefers-color-scheme: dark) {
  :root {
    --forge-color-primary-500: #60a5fa;
    --forge-color-surface: #18181b;
    --forge-color-text: #f4f4f5;
  }
}

/* Manual dark mode toggle */
[data-theme="dark"] {
  --forge-color-primary-500: #60a5fa;
  --forge-color-surface: #18181b;
  --forge-color-text: #f4f4f5;
}
```

## Common Patterns

### Form Handling

```html
<form id="user-form">
  <forge-input 
    name="name"
    label="Full Name" 
    required
  ></forge-input>
  
  <forge-input 
    name="email"
    label="Email" 
    type="email"
    required
  ></forge-input>
  
  <forge-button type="submit">Submit</forge-button>
</form>

<script type="module">
  document.getElementById('user-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Form data:', Object.fromEntries(formData));
  });
</script>
```

### Event Handling

All Forge components emit custom events with the `forge-` prefix:

```javascript
// Button clicks
document.addEventListener('forge-click', (e) => {
  console.log('Button clicked:', e.detail);
});

// Input changes
document.addEventListener('forge-input', (e) => {
  console.log('Input changed:', e.detail.value);
});

// Modal events
document.addEventListener('forge-modal-open', (e) => {
  console.log('Modal opened');
});

document.addEventListener('forge-modal-close', (e) => {
  console.log('Modal closed');
});
```

### Loading States

```html
<forge-button id="submit-btn" variant="primary">
  Submit Form
</forge-button>

<script>
const button = document.getElementById('submit-btn');

button.addEventListener('forge-click', async () => {
  button.loading = true;
  
  try {
    await submitForm();
    button.textContent = 'Success!';
  } catch (error) {
    button.textContent = 'Error!';
    button.variant = 'danger';
  } finally {
    button.loading = false;
  }
});
</script>
```

## Next Steps

- **[Developer Guide](./DEVELOPER_GUIDE.md)** - Deep dive into component development
- **[Component API Reference](./api/)** - Complete API documentation
- **[Examples Repository](../examples/)** - Real-world usage examples
- **[Storybook Documentation](https://forge-ui.netlify.app)** - Interactive component explorer

## Troubleshooting

### TypeScript Issues

If you're using TypeScript and getting type errors:

```typescript
// Add to your global types or vite-env.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'forge-button': any;
      'forge-input': any;
      'forge-modal': any;
      // ... other components
    }
  }
}
```

### Build Issues

If you're having build issues with bundlers:

1. **Vite**: Works out of the box
2. **Webpack**: May need to configure for ES modules
3. **Rollup**: Configure external dependencies properly

### Browser Support

For older browsers, you may need polyfills:

```html
<script src="https://unpkg.com/@webcomponents/custom-elements@1.6.0/custom-elements.min.js"></script>
```

## Community & Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/org/forge/issues)
- **Discord Community**: [Join our community](https://discord.gg/forge-ui)
- **Stack Overflow**: Tag questions with `forge-ui-components`
- **Documentation**: [Comprehensive guides and examples](https://forge-ui.dev)

Happy building with Forge UI! 🚀