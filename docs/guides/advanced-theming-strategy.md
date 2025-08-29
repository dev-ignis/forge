# Advanced Theming Strategy

This document outlines a flexible, consumer-driven theming strategy for the Forge UI component library. It supersedes earlier concepts of simple light/dark theme switching in favor of a more powerful system that integrates with modern development tools.

## Core Concept: Theming as a Public API

The fundamental principle is that **Forge UI does not dictate themes; it provides a "Theming API" that applications can use to implement any design system.**

This API is a documented set of CSS Custom Properties (e.g., `--forge-color-primary`, `--forge-spacing-md`) that our components use for styling. The consuming application is responsible for defining the values of these properties.

This approach respects our core architecture:

1.  **Shadow DOM Compatible**: CSS Custom Properties are the standard and most performant way to pierce Shadow DOM boundaries for styling.
2.  **Framework Agnostic**: It's a browser-native feature and requires no JavaScript framework.

### Example: Inside a Forge Component

A component's internal stylesheet will use our variables with sensible fallbacks:

```css
/* Simplified example from inside forge-button.ts */
.button {
  background-color: var(--forge-color-primary, #2196f3);
  font-family: var(--forge-font-family, sans-serif);
  border-radius: var(--forge-border-radius-md, 8px);
}
```

## Implementation Path 1: Manual Theming

Any project can theme Forge UI by creating a standard CSS file that defines the values for our Theming API. This file is then included in their application.

**Example `my-app-theme.css`:**

```css
/* This file defines the application's brand and applies it to Forge components */
:root {
  /* Color Palette */
  --forge-color-primary: #c42a38; /* A custom brand red */
  --forge-color-secondary: #4a5568;
  --forge-color-surface: #ffffff;
  --forge-color-on-surface: #1a202c;

  /* Typography */
  --forge-font-family: 'Georgia', serif;

  /* Shape */
  --forge-border-radius-md: 2px; /* Sharp corners */
}
```

**Pros**: Universal, simple, no dependencies.
**Cons**: Requires manual maintenance.

## Implementation Path 2: Tailwind CSS Integration

To provide a best-in-class developer experience for the vast number of projects using Tailwind CSS, we will create and distribute an official **Forge UI Tailwind Plugin** (`@forge/tailwind-plugin`).

This plugin bridges the gap between a project's `tailwind.config.js` and our components.

### How It Works

1.  The user installs the plugin: `npm install -D @forge/tailwind-plugin`.
2.  They add it to their `tailwind.config.js`.
3.  The plugin reads the user's defined theme values (colors, spacing, etc.) from the config.
4.  It then injects the corresponding `--forge-*` CSS variables into Tailwind's base layer.

**Example `tailwind.config.js`:**

```javascript
const forgePlugin = require('@forge/tailwind-plugin');

module.exports = {
  theme: {
    // User's existing Tailwind theme configuration
    extend: {
      colors: {
        brand: '#c42a38',
        neutral: {
          900: '#1a202c',
          100: '#ffffff',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
      borderRadius: {
        DEFAULT: '2px',
      },
    },
  },
  plugins: [
    // The user maps their Tailwind theme keys to the Forge Theming API
    forgePlugin({
      themeMap: {
        primary: 'theme.colors.brand',
        surface: 'theme.colors.neutral.100',
        'on-surface': 'theme.colors.neutral.900',
        'font-family': 'theme.fontFamily.serif',
        'border-radius-md': 'theme.borderRadius.DEFAULT',
      },
    }),
  ],
};
```

This configuration would automatically generate the same CSS as the manual example above, but it would always be in sync with the project's `tailwind.config.js`.

## Benefits of This Strategy

*   **Ultimate Flexibility**: We do not impose any design decisions. The consumer has full control.
*   **Seamless Integration**: The Tailwind plugin makes using Forge UI in that ecosystem feel native.
*   **High Performance**: Relies entirely on the browser's native CSS engine with zero JavaScript runtime for theming.
*   **Maintainable**: Keeps a clean separation of concerns. Our components handle logic and structure; the consumer handles the look and feel.
*   **Future-Proof**: As the consumer's design system evolves, our components will adapt automatically.
