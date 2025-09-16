# 📦 Import Guide for AI Tools

**Complete reference for importing Forge components in any project**

This guide shows every way to import and use Forge components, optimized for AI-assisted development. Choose the method that best fits your project and framework.

## 🚀 Quick Decision Tree

```
Need React components? → Use React integrations
Building with Tailwind? → Add Tailwind plugin
Want tree-shaking? → Use selective imports
Using forms? → Add React Hook Form integration
SSR project? → Use React integrations (SSR-ready)
Quick prototyping? → Use full bundle
```

## 📋 All Import Methods

### 1. 🌟 Selective Imports (Tree-Shaking Optimized)

**Best for**: Production builds, bundle optimization, specific component usage

```javascript
// Individual components (NEW in v0.5.2+)
import { ForgeButton } from '@nexcraft/forge/button'
import { ForgeInput } from '@nexcraft/forge/input'
import { ForgeCard } from '@nexcraft/forge/card'
import { ForgeAlert } from '@nexcraft/forge/alert'
import { ForgeModal } from '@nexcraft/forge/modal'
import { ForgeSelect } from '@nexcraft/forge/select'
import { ForgeCheckbox } from '@nexcraft/forge/checkbox'

// Usage - Auto-registers web components
document.body.innerHTML = `
  <forge-card>
    <forge-input label="Email" type="email"></forge-input>
    <forge-button variant="primary">Submit</forge-button>
  </forge-card>
`

// Or programmatically
const button = document.createElement('forge-button')
button.variant = 'primary'
button.textContent = 'Click me'
```

### 2. ⚛️ React Integrations (Recommended for React)

**Best for**: React projects, TypeScript, SSR, better DX

```jsx
// React wrapper components
import { 
  ForgeButton, 
  ForgeInput, 
  ForgeCard,
  ForgeAlert,
  ForgeModal,
  ForgeSelect,
  ForgeCheckbox,
  ForgeDataTable
} from '@nexcraft/forge/integrations/react'

// Usage - Native React components
function LoginForm() {
  const [email, setEmail] = useState('')
  
  return (
    <ForgeCard>
      <ForgeInput 
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <ForgeButton variant="primary" onClick={handleLogin}>
        Sign In
      </ForgeButton>
    </ForgeCard>
  )
}
```

### 3. 📝 React Hook Form Integration

**Best for**: Forms with validation, React Hook Form projects

```jsx
// Form-specific components with validation
import { 
  RHFForgeInput, 
  RHFForgeSelect, 
  RHFForgeCheckbox,
  RHFForgeRadioGroup
} from '@nexcraft/forge/integrations/rhf'

import { useForm } from 'react-hook-form'

function RegistrationForm() {
  const { control, handleSubmit, formState: { errors } } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFForgeInput
        name="email"
        label="Email"
        control={control}
        rules={{ 
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email'
          }
        }}
      />
      
      <RHFForgeSelect
        name="role"
        label="Role"
        control={control}
        options={[
          { value: 'admin', label: 'Administrator' },
          { value: 'user', label: 'User' }
        ]}
        rules={{ required: 'Role is required' }}
      />
      
      <ForgeButton type="submit" variant="primary">
        Register
      </ForgeButton>
    </form>
  )
}
```

### 4. 🎨 Tailwind Plugin (NEW)

**Best for**: Tailwind CSS projects, design system integration

```javascript
// tailwind.config.js
import forgePlugin from '@nexcraft/forge/plugin'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [forgePlugin],
  theme: {
    extend: {
      // Plugin adds forge-specific utilities
    }
  }
}
```

```jsx
// Usage with Tailwind utilities
<div className="space-y-4">
  <forge-input className="w-full" />
  <forge-button className="btn-forge btn-forge-primary">
    Submit
  </forge-button>
</div>

// Or use semantic classes provided by plugin
<forge-button className="btn-forge-primary">Primary</forge-button>
<forge-input className="input-forge" />
<forge-card className="card-forge">Card content</forge-card>
```

### 5. 🌍 Framework Integrations

#### Vue.js Integration

```javascript
// main.js
import '@nexcraft/forge/integrations/vue'

// Adds v-model support and Vue directives
```

```vue
<template>
  <forge-card>
    <forge-input 
      v-model="email" 
      label="Email" 
      type="email"
    />
    <forge-button @click="handleSubmit" variant="primary">
      Submit
    </forge-button>
  </forge-card>
</template>
```

#### Angular Integration

```typescript
// app.module.ts
import '@nexcraft/forge/integrations/angular'

// Adds Angular forms integration
```

```html
<!-- component.html -->
<forge-card>
  <forge-input 
    [(ngModel)]="email" 
    label="Email" 
    type="email">
  </forge-input>
  <forge-button (click)="handleSubmit()" variant="primary">
    Submit
  </forge-button>
</forge-card>
```

### 6. 📦 Full Bundle Import

**Best for**: Quick prototyping, all components needed, simple setup

```javascript
// Everything at once
import '@nexcraft/forge'

// All 26+ components now available as web components
document.body.innerHTML = `
  <forge-data-table></forge-data-table>
  <forge-navigation-bar></forge-navigation-bar>
  <forge-date-picker></forge-date-picker>
  <!-- All components available -->
`
```

### 7. 🌐 CDN Import (Zero Build)

**Best for**: Quick demos, no build process, HTML-only projects

```html
<!-- From CDN -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge"></script>

<!-- Or specific version -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge@0.5.2"></script>

<!-- Usage -->
<forge-card>
  <forge-input label="Name" required></forge-input>
  <forge-button variant="primary">Submit</forge-button>
</forge-card>
```

## 🔧 Framework-Specific Examples

### Next.js (App Router)

```jsx
// app/components/LoginForm.jsx
'use client' // Only if using interactivity

import { ForgeInput, ForgeButton, ForgeCard } from '@nexcraft/forge/integrations/react'

export default function LoginForm() {
  return (
    <ForgeCard className="max-w-md mx-auto">
      <form className="p-6 space-y-4">
        <ForgeInput type="email" label="Email" required />
        <ForgeInput type="password" label="Password" required />
        <ForgeButton type="submit" variant="primary" className="w-full">
          Sign In
        </ForgeButton>
      </form>
    </ForgeCard>
  )
}
```

### Next.js (Pages Router)

```jsx
// pages/login.js
import { ForgeInput, ForgeButton, ForgeCard } from '@nexcraft/forge/integrations/react'

export default function LoginPage() {
  // Components render semantic HTML during SSR
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ForgeCard>
        <form className="p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">Sign In</h1>
          <ForgeInput type="email" label="Email" required />
          <ForgeInput type="password" label="Password" required />
          <ForgeButton type="submit" variant="primary" className="w-full">
            Sign In
          </ForgeButton>
        </form>
      </ForgeCard>
    </div>
  )
}
```

### Vite + React

```jsx
// src/App.jsx
import { ForgeButton, ForgeCard } from '@nexcraft/forge/integrations/react'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-8">
      <ForgeCard>
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Vite + Forge</h1>
          <p className="mb-4">Count: {count}</p>
          <ForgeButton 
            variant="primary" 
            onClick={() => setCount(count + 1)}
          >
            Increment
          </ForgeButton>
        </div>
      </ForgeCard>
    </div>
  )
}

export default App
```

### Create React App

```jsx
// src/App.js
import { ForgeInput, ForgeButton, ForgeCard } from '@nexcraft/forge/integrations/react'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ForgeCard>
          <div className="p-6">
            <h1>Create React App + Forge</h1>
            <div className="space-y-4 mt-4">
              <ForgeInput label="Your name" placeholder="Enter your name" />
              <ForgeButton variant="primary">Get Started</ForgeButton>
            </div>
          </div>
        </ForgeCard>
      </header>
    </div>
  )
}

export default App
```

### Vue 3

```vue
<!-- App.vue -->
<template>
  <div class="app">
    <forge-card>
      <div class="p-6">
        <h1>Vue 3 + Forge</h1>
        <div class="space-y-4 mt-4">
          <forge-input 
            v-model="name" 
            label="Your name" 
            placeholder="Enter your name"
          />
          <forge-button @click="greet" variant="primary">
            Greet
          </forge-button>
          <p v-if="greeting">{{ greeting }}</p>
        </div>
      </div>
    </forge-card>
  </div>
</template>

<script>
import '@nexcraft/forge/integrations/vue'

export default {
  name: 'App',
  data() {
    return {
      name: '',
      greeting: ''
    }
  },
  methods: {
    greet() {
      this.greeting = `Hello, ${this.name || 'World'}!`
    }
  }
}
</script>
```

### Angular

```typescript
// app.component.ts
import { Component } from '@angular/core'
import '@nexcraft/forge/integrations/angular'

@Component({
  selector: 'app-root',
  template: `
    <forge-card>
      <div class="p-6">
        <h1>Angular + Forge</h1>
        <div class="space-y-4 mt-4">
          <forge-input 
            [(ngModel)]="name" 
            label="Your name" 
            placeholder="Enter your name">
          </forge-input>
          <forge-button (click)="greet()" variant="primary">
            Greet
          </forge-button>
          <p *ngIf="greeting">{{ greeting }}</p>
        </div>
      </div>
    </forge-card>
  `
})
export class AppComponent {
  name = ''
  greeting = ''

  greet() {
    this.greeting = \`Hello, \${this.name || 'World'}!\`
  }
}
```

### Svelte

```svelte
<!-- App.svelte -->
<script>
  import '@nexcraft/forge'
  
  let name = ''
  let greeting = ''
  
  function greet() {
    greeting = `Hello, ${name || 'World'}!`
  }
</script>

<forge-card>
  <div class="p-6">
    <h1>Svelte + Forge</h1>
    <div class="space-y-4 mt-4">
      <forge-input 
        bind:value={name} 
        label="Your name" 
        placeholder="Enter your name"
      />
      <forge-button on:click={greet} variant="primary">
        Greet
      </forge-button>
      {#if greeting}
        <p>{greeting}</p>
      {/if}
    </div>
  </div>
</forge-card>
```

## 📊 Bundle Size Comparison

| Import Method | Bundle Size | Components | Best For |
|---------------|-------------|------------|----------|
| Full bundle | ~374KB | All 26+ | Prototyping, using many components |
| Selective (5 components) | ~45KB | Only imported | Production, specific needs |
| React integration | ~380KB | All + React wrappers | React projects |
| Single component | ~8-15KB | One component | Micro-frontends, specific use |

## 🎯 AI Tool Recommendations

### For Cursor/GitHub Copilot

```javascript
// Preferred pattern - most context for AI
import { 
  ForgeButton, 
  ForgeInput, 
  ForgeCard,
  ForgeAlert,
  ForgeModal 
} from '@nexcraft/forge/integrations/react'

// AI can suggest props, events, and patterns easily
<ForgeInput 
  type="email" 
  label="Email" 
  required 
  helperText="We'll never share your email"
/>
```

### For Claude Code

```javascript
// Selective imports with clear naming
import { ForgeButton } from '@nexcraft/forge/button'
import { ForgeInput } from '@nexcraft/forge/input'

// Claude can reason about component capabilities
const button = document.querySelector('forge-button')
button.variant = 'primary'
button.loading = true
```

### For Quick Demos

```html
<!-- CDN import for instant usage -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge"></script>

<forge-card>
  <forge-input label="Demo input"></forge-input>
  <forge-button variant="primary">Demo button</forge-button>
</forge-card>
```

## 🚨 Common Pitfalls

### ❌ Wrong Import Paths

```javascript
// ❌ Don't do this
import ForgeButton from '@nexcraft/forge/components/button'
import { ForgeButton } from '@nexcraft/forge/src/components'

// ✅ Do this
import { ForgeButton } from '@nexcraft/forge/button'
import { ForgeButton } from '@nexcraft/forge/integrations/react'
```

### ❌ Missing Web Component Registration

```javascript
// ❌ Don't do this (components won't work)
import { ForgeButton } from '@nexcraft/forge/integrations/react'
// Using without registration

// ✅ Do this (auto-registration happens)
import { ForgeButton } from '@nexcraft/forge/integrations/react'
// Or explicit registration
import '@nexcraft/forge/button'
```

### ❌ Mixing Import Styles

```javascript
// ❌ Don't mix randomly
import '@nexcraft/forge' // Full bundle
import { ForgeButton } from '@nexcraft/forge/button' // Selective
import { ForgeInput } from '@nexcraft/forge/integrations/react' // React

// ✅ Pick one strategy
import { ForgeButton, ForgeInput } from '@nexcraft/forge/integrations/react'
```

## 📚 Related Documentation

- [AI Methods Guide](../ai-methods.md) - Complete AI methods reference with examples
- [Common Patterns](../patterns/AI_COMMON_PATTERNS.md) - Complete UI patterns  
- [Tailwind Plugin Guide](./tailwind-plugin.md) - Styling integration
- [Selective Imports Guide](./selective-imports.md) - Tree-shaking details

## 🔗 Quick Links

- **React projects**: Use `@nexcraft/forge/integrations/react`
- **Form validation**: Use `@nexcraft/forge/integrations/rhf`  
- **Tailwind styling**: Use `@nexcraft/forge/plugin`
- **Bundle optimization**: Use selective imports like `@nexcraft/forge/button`
- **Quick prototyping**: Use CDN or full bundle `@nexcraft/forge`