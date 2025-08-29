# Research: Strategy for a Composable, File-Based Theming System

## 1. Executive Summary

This document proposes a flexible, file-based theming strategy for Forge UI that empowers consumers to define the visual appearance of components using their own design tokens.

The core of this strategy is to treat **CSS Custom Properties as a stable API**. Our components will be styled using a predefined set of `--forge-*` variables. Consumers can then provide a standard CSS "theme file" that defines the values for these variables.

To provide a first-class developer experience for the modern ecosystem, we will also create and distribute an **optional Tailwind CSS plugin**. This plugin will automatically generate the required theme file by reading the user's existing `tailwind.config.js`, seamlessly bridging their design system with our component library.

This approach is fully compatible with our existing decisions to use **Shadow DOM** (`ADR-002`) and **CSS Custom Properties** (`ADR-003`).

## 2. Problem Statement

The previous research focused on switching between pre-defined themes (light/dark). This is too restrictive. A modern component library should not dictate the theme; it should adapt to the consuming application's design system. Developers need a way to apply their own branding, colors, and spacing, often managed in tools like Tailwind CSS, without having to fight against the component library's styles.

The primary technical challenge is applying these application-level styles to components that use Shadow DOM for style encapsulation.

## 3. Core Principles & The "CSS Variable API"

Our solution is to create a formal contract between the application and our components.

1.  **The Contract**: Each Forge UI component will be styled using a consistent, documented set of CSS Custom Properties (e.g., `var(--forge-color-primary)`, `var(--forge-spacing-md)`). This set of variables is the component's **theming API**.
2.  **The Bridge**: Because CSS Custom Properties pierce Shadow DOM boundaries, they are the perfect mechanism to bridge the gap between the global scope (the application) and the encapsulated scope (the component).
3.  **Consumer-Defined Themes**: Forge UI will not ship with opinionated themes like "dark" or "light". Instead, we will ship a default set of variable definitions as a fallback. The consumer is empowered to override these variables completely to implement *any* theme.

**Component Example:**
A Forge Button's internal stylesheet would not contain hardcoded colors, but rather use our variable API:

```css
/* Inside forge-button.ts */
.button {
  background-color: var(--forge-color-primary, #2563eb); /* Includes a fallback */
  color: var(--forge-color-on-primary, white);
  padding: var(--forge-spacing-sm) var(--forge-spacing-md);
  border-radius: var(--forge-border-radius-md);
}
```

## 4. Consumer Implementation Strategy

A consumer can provide a theme in two ways, depending on their tooling.

### Path A: The Manual "Theme File" (For Non-Tailwind Users)

This is the universal approach. The user simply creates a standard CSS file in their project that defines the values for the Forge UI variables.

**Example `my-theme.css`:**
```css
/* my-app/src/my-theme.css */
:root {
  /* Define the Forge variables using your own brand values */
  --forge-color-primary: #e6007a; /* My brand's magenta */
  --forge-color-secondary: #4a4a4a;
  --forge-color-surface: #f5f5f5;
  --forge-color-on-surface: #333333;

  --forge-font-family: 'Inter', sans-serif;
  --forge-border-radius-md: 4px;
  --forge-spacing-md: 1rem;
}
```

The user then imports this file in their application's entry point. All Forge components will now use these values.

### Path B: The Tailwind CSS Plugin (Recommended for Tailwind Users)

To provide a seamless experience for the large Tailwind CSS ecosystem, we will create and ship `@forge/tailwind-plugin`.

The user installs the plugin and adds it to their `tailwind.config.js`.

**Example `tailwind.config.js`:**
```javascript
const forgePlugin = require('@forge/tailwind-plugin');

module.exports = {
  theme: {
    extend: {
      colors: {
        // User's existing Tailwind color palette
        brand: {
          primary: '#e6007a',
          secondary: '#4a4a4a',
        },
        ui: {
          surface: '#f5f5f5',
          'on-surface': '#333333',
        }
      },
    },
  },
  plugins: [
    // Add our plugin, passing a config object
    forgePlugin({
      // Map user's Tailwind theme values to Forge's CSS variables
      themeMap: {
        primary: 'colors.brand.primary',
        secondary: 'colors.brand.secondary',
        surface: 'colors.ui.surface',
        'on-surface': 'colors.ui.on-surface',
      }
    })
  ],
};
```

**What the plugin does:**
Our plugin reads the user's `theme` object from the Tailwind config, resolves the values using the provided `themeMap`, and injects the corresponding `--forge-*` CSS variables into Tailwind's `@layer base`.

**Generated CSS (simplified):**
```css
@layer base {
  :root {
    --forge-color-primary: #e6007a;
    --forge-color-secondary: #4a4a4a;
    --forge-color-surface: #f5f5f5;
    --forge-color-on-surface: #333333;
    /* ...and so on for all mapped tokens */
  }
}
```
The result is the same as the manual file, but it's generated automatically and stays in sync with the user's `tailwind.config.js`.

## 5. Benefits of This Approach

*   **Maximum Flexibility**: Consumers are not locked into our theme choices. They can implement any design system.
*   **Ecosystem Friendly**: Provides a best-in-class experience for Tailwind CSS users, a massive and growing community.
*   **Maintains Encapsulation**: Fully respects the Shadow DOM boundary, a core architectural principle of this project.
*   **No JS Runtime**: The theming is handled entirely by the browser's CSS engine at render time, making it highly performant.
*   **Single Source of Truth**: Allows the application's `tailwind.config.js` or `theme.css` to be the single source of truth for design tokens.

## 6. Implementation Plan

1.  **Define Token API**: Formalize the complete list of `--forge-*` custom properties that our components will use. This list must be documented.
2.  **Build `@forge/tailwind-plugin`**: Create the Tailwind CSS plugin as a new package in the monorepo.
3.  **Update Components**: Ensure all components use the `--forge-*` variables for all themeable styles.
4.  **Create Documentation**: Write a comprehensive guide on "Theming Forge UI," explaining both the manual and Tailwind-based approaches.

This strategy elevates the project from a simple component library to a truly adaptable design system foundation.
