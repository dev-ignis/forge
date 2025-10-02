# Theming Overview

Core theming concepts and strategies for @nexcraft/forge component library.

## Table of Contents

- [Core Concept: CSS Custom Properties as API](#core-concept-css-custom-properties-as-api)
- [Manual Theming Approach](#manual-theming-approach)
- [Tailwind Plugin Integration](#tailwind-plugin-integration)
- [Design Token Bridge](#design-token-bridge)
- [Choosing Your Approach](#choosing-your-approach)

## Core Concept: CSS Custom Properties as API

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

## Manual Theming Approach

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

## Tailwind Plugin Integration

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

## Design Token Bridge

The most powerful approach is using the **Token Bridge** system - the ONLY component library with built-in design token conversion from any design system.

### Why Token Bridge is Revolutionary

Import design tokens from Figma, Tailwind CSS, Material Design, and more with zero configuration:

```javascript
import { TokenBridge } from '@nexcraft/forge/utils';

// Import from any design system
const bridge = TokenBridge.fromFigma(figmaTokens);
const css = bridge.toCSSProperties();

// Automatic CSS generation - always in sync!
```

### Supported Design Systems

1. **Figma Design Tokens** - Export directly from Figma
2. **Tailwind CSS** - Import from your tailwind.config.js
3. **Material Design 3** - Google's design system tokens
4. **Custom Tokens** - Build your own token system

### Quick Example

```javascript
// From Figma
const figmaTokens = {
  'Brand/Primary/Blue/500': {
    value: '#3b82f6',
    type: 'color',
    description: 'Primary brand color'
  }
};

const bridge = TokenBridge.fromFigma(figmaTokens);
const css = bridge.toCSSProperties();

// Inject into your app
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(css);
document.adoptedStyleSheets = [styleSheet];
```

### Advanced Features

- **Multiple Sources**: Combine tokens from different design systems
- **Custom Tokens**: Create and add your own tokens
- **Output Formats**: CSS, Sass, JavaScript, JSON
- **Performance**: Built-in caching for fast regeneration
- **Type Safety**: Full TypeScript support

📖 **[Complete Token Bridge Guide](../theming/token-bridge.md)** - Full documentation with examples and API reference

## Choosing Your Approach

### Use Manual Theming When:
- You have a simple, stable design system
- You prefer direct control over CSS
- You don't use a design system tool
- You want zero dependencies

### Use Tailwind Plugin When:
- You're already using Tailwind CSS
- You want automatic sync with your Tailwind config
- You prefer configuration over manual CSS
- You want type-safe theme values

### Use Token Bridge When:
- You use Figma, Material Design, or other design systems
- You want automatic design-to-code sync
- You need to combine multiple design systems
- You want the most powerful and flexible approach
- You're building a complex application with evolving design

## Benefits of This Strategy

*   **Ultimate Flexibility**: We do not impose any design decisions. The consumer has full control.
*   **Seamless Integration**: The Tailwind plugin and Token Bridge make using Forge UI feel native in any ecosystem.
*   **High Performance**: Relies entirely on the browser's native CSS engine with zero JavaScript runtime for theming.
*   **Maintainable**: Keeps a clean separation of concerns. Our components handle logic and structure; the consumer handles the look and feel.
*   **Future-Proof**: As the consumer's design system evolves, our components will adapt automatically.

---

## Additional Resources

- **[Token Bridge Reference](../theming/token-bridge.md)** - Complete guide and API reference
- **[Migration Guide](../theming/migration-guide.md)** - Migrate from existing theming systems
- **[Figma Integration](./figma-to-forge.md)** - Pull tokens from Figma via CLI/MCP
- **[AI Styling Guide](./AI_STYLING_GUIDE.md)** - Complete styling reference for AI assistants
