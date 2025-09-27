# Vue Integration

Vue integration for Nexcraft Forge web components through the `@nexcraft/forge-vue` package.

## Overview

The `@nexcraft/forge-vue` package provides Vue-specific composables, directives, and plugin for seamless use of Forge web components in Vue 3 applications.

## Installation

```bash
npm install @nexcraft/forge @nexcraft/forge-vue
```

## Quick Start

### 1. Install the Plugin (Recommended)

```typescript
import { createApp } from 'vue';
import { ForgeVuePlugin } from '@nexcraft/forge-vue';
import App from './App.vue';

const app = createApp(App);
app.use(ForgeVuePlugin, {
  theme: 'auto',
  autoImport: true
});
app.mount('#app');
```

### 2. Use Composables in Components

```vue
<script setup>
import { ref } from 'vue';
import { 
  useForgeComponent, 
  useForgeVModel, 
  useForgeTheme 
} from '@nexcraft/forge-vue';

// Component ref management
const { elementRef, getElement } = useForgeComponent();

// Two-way binding
const inputValue = ref('Hello World');
const { modelValue, onInput } = useForgeVModel(inputValue, elementRef);

// Theme management
const { theme, setTheme, toggleTheme } = useForgeTheme();
</script>

<template>
  <div :data-forge-theme="theme">
    <!-- Basic usage -->
    <forge-button @click="toggleTheme">
      Toggle Theme ({{ theme }})
    </forge-button>

    <!-- With reactive binding -->
    <forge-input 
      ref="elementRef"
      :value="modelValue"
      @input="onInput"
      placeholder="Type something..."
    />
    <p>Current value: {{ modelValue }}</p>

    <!-- Theme controls -->
    <div>
      <forge-button @click="setTheme('light')">Light</forge-button>
      <forge-button @click="setTheme('dark')">Dark</forge-button>
      <forge-button @click="setTheme('auto')">Auto</forge-button>
    </div>
  </div>
</template>
```

## Composables API

### useForgeComponent()

Base composable for managing Forge component refs:

```vue
<script setup>
import { useForgeComponent } from '@nexcraft/forge-vue';

const { elementRef, getElement } = useForgeComponent();

const handleInteraction = () => {
  const element = getElement();
  console.log('Button element:', element);
  // Access AI methods
  console.log('AI state:', element?.aiState);
  console.log('Possible actions:', element?.getPossibleActions?.());
};
</script>

<template>
  <forge-button ref="elementRef" @click="handleInteraction">
    Interact with me
  </forge-button>
</template>
```

### useForgeVModel()

Two-way data binding for form components:

```vue
<script setup>
import { ref } from 'vue';
import { useForgeComponent, useForgeVModel } from '@nexcraft/forge-vue';

const { elementRef } = useForgeComponent();
const userInput = ref('');
const { modelValue, onInput, onUpdate } = useForgeVModel(userInput, elementRef);

// Watch for changes
watch(modelValue, (newValue) => {
  console.log('Input value changed:', newValue);
});
</script>

<template>
  <forge-input 
    ref="elementRef"
    :value="modelValue"
    @input="onInput"
    @change="onUpdate"
    placeholder="Enter text"
  />
  
  <p>You typed: {{ modelValue }}</p>
</template>
```

### useForgeTheme()

Reactive theme management with automatic DOM updates:

```vue
<script setup>
import { useForgeTheme } from '@nexcraft/forge-vue';

const { theme, setTheme, toggleTheme } = useForgeTheme('auto');

// Theme changes automatically update the DOM
watch(theme, (newTheme) => {
  console.log('Theme changed to:', newTheme);
});
</script>

<template>
  <div :data-forge-theme="theme">
    <h1>Current theme: {{ theme }}</h1>
    
    <forge-button @click="toggleTheme">
      Toggle ({{ theme === 'light' ? 'Go Dark' : 'Go Light' }})
    </forge-button>
    
    <forge-button @click="setTheme('auto')">
      Auto Theme
    </forge-button>
  </div>
</template>
```

### useForgeModal()

Modal state management:

```vue
<script setup>
import { useForgeComponent, useForgeModal } from '@nexcraft/forge-vue';

const { elementRef } = useForgeComponent();
const { isOpen, show, hide, toggle } = useForgeModal(elementRef);
</script>

<template>
  <div>
    <forge-button @click="show">Open Modal</forge-button>
    <forge-button @click="toggle">Toggle Modal</forge-button>
    
    <p v-if="isOpen">Modal is currently open!</p>
    
    <forge-modal ref="elementRef">
      <h2>Modal Title</h2>
      <p>This modal is managed by Vue composables.</p>
      <forge-button @click="hide">Close Modal</forge-button>
    </forge-modal>
  </div>
</template>
```

## Vue Plugin Configuration

The ForgeVuePlugin provides global configuration and auto-imports:

```typescript
import { ForgeVuePlugin } from '@nexcraft/forge-vue';

app.use(ForgeVuePlugin, {
  theme: 'auto',        // Default theme: 'light' | 'dark' | 'auto'
  autoImport: true,     // Auto-import @nexcraft/forge web components
  prefix: 'forge-'      // Component prefix (for future use)
});
```

## Theme Context (Provide/Inject)

Share theme state across your component tree:

```vue
<!-- App.vue (Root) -->
<script setup>
import { useForgeThemeContext } from '@nexcraft/forge-vue';

// Provides theme to all child components
const { theme, setTheme, toggleTheme } = useForgeThemeContext('dark');
</script>

<template>
  <div :data-forge-theme="theme">
    <header-component />
    <main-content />
    <footer-component />
  </div>
</template>
```

```vue
<!-- Any Child Component -->
<script setup>
import { useForgeThemeInjection } from '@nexcraft/forge-vue';

// Consumes theme from parent
const { theme, setTheme } = useForgeThemeInjection();
</script>

<template>
  <forge-button @click="setTheme('light')">
    Switch to Light (current: {{ theme }})
  </forge-button>
</template>
```

## Advanced Usage

### Custom Event Handling

```vue
<script setup>
import { useForgeComponent } from '@nexcraft/forge-vue';

const { elementRef } = useForgeComponent();

const handleSort = (event) => {
  console.log('Sort event:', event.detail);
  // Handle sorting logic
};

const handleFilter = (event) => {
  console.log('Filter event:', event.detail);
  // Handle filtering logic
};
</script>

<template>
  <forge-data-table 
    ref="elementRef"
    :data="tableData"
    @sort="handleSort"
    @filter="handleFilter"
  />
</template>
```

### Form Validation

```vue
<script setup>
import { ref, computed } from 'vue';
import { useForgeComponent, useForgeVModel } from '@nexcraft/forge-vue';

const { elementRef: emailRef } = useForgeComponent();
const email = ref('');
const { modelValue: emailValue } = useForgeVModel(email, emailRef);

const isValidEmail = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.value);
});
</script>

<template>
  <form>
    <forge-input 
      ref="emailRef"
      :value="emailValue"
      type="email"
      placeholder="Enter email"
      :class="{ 'error': !isValidEmail && emailValue }"
    />
    
    <p v-if="!isValidEmail && emailValue" class="error">
      Please enter a valid email address
    </p>
    
    <forge-button :disabled="!isValidEmail">
      Submit
    </forge-button>
  </form>
</template>
```

## TypeScript Support

Full TypeScript support with proper type inference:

```typescript
import type { 
  ForgeTheme, 
  ForgeComponentRef,
  ForgeModalContext,
  ForgeVuePluginOptions
} from '@nexcraft/forge-vue';

// Strongly typed composables
const { elementRef }: ForgeComponentRef<HTMLElement> = useForgeComponent();
const themeContext: ForgeThemeContext = useForgeTheme();
```

## Migration from Main Package

If you were previously using Vue integration from `@nexcraft/forge/integrations/vue`, migrate to the dedicated package:

```typescript
// Old (deprecated as of v0.8.0)
import { useForgeComponent } from '@nexcraft/forge/integrations/vue';

// New (recommended)
import { useForgeComponent } from '@nexcraft/forge-vue';
```

## Performance Tips

1. **Use the plugin for auto-imports** - Avoids manual component registration
2. **Leverage theme context** - Share theme state efficiently across components  
3. **Compose multiple hooks** - Combine composables for complex interactions
4. **Use reactive bindings** - Let Vue handle DOM updates automatically

## Troubleshooting

### Components not rendering
Ensure you've imported the base Forge package:
```bash
npm install @nexcraft/forge @nexcraft/forge-vue
```

### TypeScript errors
Ensure you have Vue 3 types installed:
```bash
npm install @types/node --save-dev
```

### Theme not applying
Make sure the theme is set on a parent element:
```vue
<template>
  <div :data-forge-theme="theme">
    <!-- Your components here -->
  </div>
</template>
```

## Peer Dependencies

- `@nexcraft/forge >= 0.7.0`
- `vue ^3.0.0`

## Contributing

The Vue package is part of the Nexcraft Forge monorepo. See the main project's contributing guide for development setup and guidelines.