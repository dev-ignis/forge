# Tailwind CSS Plugin

The @nexcraft/forge Tailwind plugin adds semantic utility classes and design tokens from Forge components to your Tailwind CSS build, following the industry-standard pattern established by libraries like daisyUI.

## Installation

```bash
npm install @nexcraft/forge
```

## Setup

Add the Forge plugin to your `tailwind.config.js`:

```javascript
import forgePlugin from '@nexcraft/forge/plugin';

export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  plugins: [
    forgePlugin
  ]
}
```

Or with CommonJS:

```javascript
const forgePlugin = require('@nexcraft/forge/plugin');

module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  plugins: [
    forgePlugin
  ]
}
```

## Features

### 🎨 **Design Tokens Integration**

The plugin automatically adds Forge design tokens to your Tailwind theme:

```css
/* These color utilities are now available */
bg-forge-primary-500
text-forge-secondary-700
border-forge-success
shadow-forge-lg
```

### 🔧 **Semantic Utility Classes** 

Pre-built component classes that match Forge components:

```html
<!-- Button styling that matches forge-button -->
<button class="btn-forge-primary">
  Primary Button
</button>

<!-- Input styling that matches forge-input -->
<input class="input-forge" type="text" placeholder="Enter text...">

<!-- Card styling that matches forge-card -->
<div class="card-forge">
  <div class="card-forge-body">
    Card content
  </div>
</div>

<!-- Alert styling that matches forge-alert -->
<div class="alert-forge-success">
  Success message!
</div>
```

### 🌗 **Dark Mode Support**

The plugin includes automatic dark mode variants:

```html
<!-- Automatically adapts to dark mode -->
<div class="card-forge">
  <button class="btn-forge-primary">
    Works in light and dark mode
  </button>
</div>
```

## Available Utility Classes

### Buttons
- `.btn-forge` - Base button styling
- `.btn-forge-primary` - Primary button variant
- `.btn-forge-secondary` - Secondary button variant  
- `.btn-forge-outline` - Outline button variant

### Form Elements
- `.input-forge` - Base input styling
- `.input-forge-error` - Error state input

### Layout
- `.card-forge` - Card container
- `.card-forge-body` - Card content area

### Feedback
- `.alert-forge` - Base alert styling
- `.alert-forge-info` - Info alert variant
- `.alert-forge-success` - Success alert variant
- `.alert-forge-warning` - Warning alert variant
- `.alert-forge-error` - Error alert variant

### Components  
- `.badge-forge` - Base badge styling
- `.badge-forge-primary` - Primary badge variant
- `.badge-forge-secondary` - Secondary badge variant
- `.toggle-forge` - Toggle/switch styling
- `.progress-forge` - Progress bar container
- `.progress-forge-bar` - Progress bar fill
- `.skeleton-forge` - Loading skeleton effect

### Aspect Ratios
- `.aspect-forge-square` - 1:1 aspect ratio
- `.aspect-forge-video` - 16:9 aspect ratio  
- `.aspect-forge-photo` - 3:4 aspect ratio

## Design Tokens Reference

### Colors

**Primary Colors:**
```css
forge-primary-{50-900}    /* Blue scale */
forge-secondary-{50-900}  /* Gray scale */
```

**Semantic Colors:**
```css
forge-success    /* Green */
forge-warning    /* Orange */  
forge-error      /* Red */
forge-info       /* Blue */
```

### Spacing
```css  
forge-xs    /* 0.25rem */
forge-sm    /* 0.5rem */
forge-md    /* 1rem */
forge-lg    /* 1.5rem */
forge-xl    /* 2rem */
```

### Border Radius
```css
rounded-forge     /* 0.375rem */
rounded-forge-sm  /* 0.25rem */
rounded-forge-md  /* 0.375rem */
rounded-forge-lg  /* 0.5rem */
```

### Shadows
```css
shadow-forge     /* Default shadow */
shadow-forge-md  /* Medium shadow */
shadow-forge-lg  /* Large shadow */
```

## Customization

### Override Default Tokens

You can customize Forge tokens using CSS custom properties:

```css
:root {
  /* Override primary color */
  --forge-color-primary-500: #your-brand-color;
  
  /* Override spacing */
  --forge-spacing-md: 1.25rem;
  
  /* Override border radius */
  --forge-border-radius: 0.5rem;
}
```

### Extend Plugin Configuration

```javascript
import forgePlugin, { forgeTheme } from '@nexcraft/forge/plugin';

export default {
  plugins: [forgePlugin],
  theme: {
    extend: {
      // Add custom colors alongside Forge tokens
      colors: {
        'brand': '#your-color',
        ...forgeTheme.colors
      }
    }
  }
}
```

## Usage Patterns

### With Forge Web Components

Use utility classes to style elements that work alongside Forge components:

```html
<!-- Mix Forge utilities with web components -->
<div class="card-forge">
  <div class="card-forge-body">
    <h2 class="text-forge-primary-700 text-lg font-semibold">
      Settings
    </h2>
    <forge-input label="Email" class="mt-forge-md"></forge-input>
    <forge-button variant="primary" class="mt-forge-lg">
      Save Changes
    </forge-button>
  </div>
</div>
```

### Pure HTML with Forge Styling

Create HTML that looks like Forge components without JavaScript:

```html
<!-- Looks like forge-button but pure HTML -->
<button class="btn-forge-primary">
  <svg class="w-4 h-4 mr-2" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
  Save to Favorites
</button>

<!-- Looks like forge-alert but pure HTML -->
<div class="alert-forge-success">
  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
  </svg>
  Changes saved successfully!
</div>
```

### Responsive Design

All utility classes work with Tailwind's responsive prefixes:

```html
<!-- Responsive button sizes -->
<button class="btn-forge px-forge-sm md:px-forge-md lg:px-forge-lg">
  Responsive Button  
</button>

<!-- Responsive card layouts -->
<div class="card-forge w-full md:w-1/2 lg:w-1/3">
  <div class="card-forge-body">
    Responsive card
  </div>
</div>
```

## Framework Integration

### React

```jsx
import { ForgeButton } from '@nexcraft/forge/integrations/react';

function MyComponent() {
  return (
    <div className="card-forge">
      <div className="card-forge-body">
        {/* Mix utility classes with React components */}
        <h2 className="text-forge-primary-700 mb-forge-md">
          Dashboard
        </h2>
        <ForgeButton variant="primary" className="btn-forge-primary">
          Get Started
        </ForgeButton>
      </div>
    </div>
  );
}
```

### Vue

```vue
<template>
  <div class="card-forge">
    <div class="card-forge-body">
      <h2 class="text-forge-primary-700 mb-forge-md">
        Settings
      </h2>
      <forge-button variant="primary" class="btn-forge-primary">
        Save Changes
      </forge-button>
    </div>
  </div>
</template>

<script>
import '@nexcraft/forge/integrations/vue';
</script>
```

## Migration from Other Libraries

### From daisyUI

```html
<!-- daisyUI -->
<button class="btn btn-primary">Button</button>

<!-- Forge Plugin -->
<button class="btn-forge-primary">Button</button>
```

### From Tailwind UI

```html
<!-- Tailwind UI pattern -->
<button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
  Button
</button>

<!-- Forge Plugin -->
<button class="btn-forge-primary">
  Button
</button>
```

## Best Practices

### 1. Use Semantic Classes for Components

```html
<!-- ✅ Good: Semantic and maintainable -->
<button class="btn-forge-primary">Submit</button>

<!-- ❌ Avoid: Too verbose -->
<button class="bg-forge-primary-500 text-white px-forge-md py-forge-sm rounded-forge hover:bg-forge-primary-600">
  Submit
</button>
```

### 2. Combine with Forge Web Components

```html
<!-- ✅ Good: Mix utilities with components -->
<div class="card-forge">
  <forge-input class="input-forge mb-forge-md" label="Email"></forge-input>
  <forge-button variant="primary">Submit</forge-button>
</div>
```

### 3. Maintain Design System Consistency

```html
<!-- ✅ Good: Consistent with Forge design system -->
<div class="space-y-forge-md">
  <button class="btn-forge-primary">Primary Action</button>
  <button class="btn-forge-secondary">Secondary Action</button>
</div>
```

## Troubleshooting

### Plugin Not Found

```javascript
// ✅ Correct import
import forgePlugin from '@nexcraft/forge/plugin';

// ❌ Incorrect
import forgePlugin from '@nexcraft/forge/plugins';
```

### Classes Not Working

1. **Check plugin installation:**
   ```javascript
   // Make sure plugin is added
   plugins: [forgePlugin]
   ```

2. **Verify content paths:**
   ```javascript
   content: ['./src/**/*.{html,js,ts,jsx,tsx}']
   ```

3. **Check version compatibility:**
   ```bash
   npm ls @nexcraft/forge
   # Plugin requires v0.5.2-beta.22+
   ```

### CSS Custom Properties Not Applied

Make sure you're including the base styles:

```css
@tailwind base;
@tailwind components; 
@tailwind utilities;
```

## Version Requirements

- **Minimum Version:** @nexcraft/forge v0.5.2-beta.22+
- **Tailwind CSS:** v3.0.0+
- **Node.js:** v16.0.0+