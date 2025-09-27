# @nexcraft/forge-vue

Vue integration for Nexcraft Forge web components.

## Installation

```bash
npm install @nexcraft/forge @nexcraft/forge-vue
```

## Quick Start

### 1. Install the Plugin (Optional)

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
const inputValue = ref('');
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

    <!-- With v-model equivalent -->
    <forge-input 
      ref="elementRef"
      :value="modelValue"
      @input="onInput"
      placeholder="Type something..."
    />
    <p>Value: {{ modelValue }}</p>

    <!-- Theme controls -->
    <div>
      <forge-button @click="setTheme('light')">Light</forge-button>
      <forge-button @click="setTheme('dark')">Dark</forge-button>
      <forge-button @click="setTheme('auto')">Auto</forge-button>
    </div>
  </div>
</template>
```

## Composables

### useForgeComponent()

Base composable for managing Forge component refs:

```vue
<script setup>
import { useForgeComponent } from '@nexcraft/forge-vue';

const { elementRef, getElement } = useForgeComponent();

const handleClick = () => {
  const button = getElement();
  console.log('Button element:', button);
};
</script>

<template>
  <forge-button ref="elementRef" @click="handleClick">
    Click me
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
const inputValue = ref('initial value');
const { modelValue, onInput, onUpdate } = useForgeVModel(inputValue, elementRef);
</script>

<template>
  <forge-input 
    ref="elementRef"
    :value="modelValue"
    @input="onInput"
    @change="onUpdate"
  />
</template>
```

### useForgeTheme()

Theme management with automatic DOM updates:

```vue
<script setup>
import { useForgeTheme } from '@nexcraft/forge-vue';

const { theme, setTheme, toggleTheme } = useForgeTheme('auto');
</script>

<template>
  <div :data-forge-theme="theme">
    <forge-button @click="toggleTheme">
      Current: {{ theme }}
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
    <p v-if="isOpen">Modal is open!</p>
    
    <forge-modal ref="elementRef">
      <h2>Modal Content</h2>
      <forge-button @click="hide">Close</forge-button>
    </forge-modal>
  </div>
</template>
```

## Plugin Options

```typescript
app.use(ForgeVuePlugin, {
  theme: 'auto',        // Default theme: 'light' | 'dark' | 'auto'
  autoImport: true,     // Auto-import @nexcraft/forge
  prefix: 'forge-'      // Component prefix
});
```

## TypeScript Support

Full TypeScript support with proper type inference:

```typescript
import type { 
  ForgeTheme, 
  ForgeComponentRef,
  ForgeModalContext 
} from '@nexcraft/forge-vue';
```

## Advanced Usage

### Custom Event Handling

```vue
<script setup>
import { useForgeComponent } from '@nexcraft/forge-vue';

const { elementRef } = useForgeComponent();

const handleCustomEvent = (event) => {
  console.log('Custom event:', event.detail);
};
</script>

<template>
  <forge-data-table 
    ref="elementRef"
    @sort="handleCustomEvent"
    @filter="handleCustomEvent"
  />
</template>
```

### Theme Context (Provide/Inject)

```vue
<!-- Parent Component -->
<script setup>
import { useForgeThemeContext } from '@nexcraft/forge-vue';

// Provides theme to all child components
const themeContext = useForgeThemeContext('dark');
</script>

<!-- Child Component -->
<script setup>
import { useForgeThemeInjection } from '@nexcraft/forge-vue';

// Consumes theme from parent
const { theme, setTheme } = useForgeThemeInjection();
</script>
```

## Migration from Main Package

If you were using Vue integration from `@nexcraft/forge/integrations/vue`, migrate to the dedicated package:

```typescript
// Old (deprecated)
import { useForgeComponent } from '@nexcraft/forge/integrations/vue';

// New (recommended)
import { useForgeComponent } from '@nexcraft/forge-vue';
```

## Peer Dependencies

- `@nexcraft/forge >= 0.7.0`
- `vue ^3.0.0`

## Contributing

The Vue package is part of the Nexcraft Forge monorepo. See the main project's contributing guide for development setup and guidelines.