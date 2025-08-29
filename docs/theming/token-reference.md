# Forge UI Token Reference

## Overview

Forge UI uses CSS Custom Properties (CSS Variables) for theming. All visual properties should use these tokens to ensure consistency and themability.

## Color Tokens

### Primary Colors
```css
--forge-color-primary-50: #e3f2fd;
--forge-color-primary-100: #bbdefb;
--forge-color-primary-200: #90caf9;
--forge-color-primary-300: #64b5f6;
--forge-color-primary-400: #42a5f5;
--forge-color-primary-500: #2196f3;  /* Main primary */
--forge-color-primary-600: #1e88e5;
--forge-color-primary-700: #1976d2;
--forge-color-primary-800: #1565c0;
--forge-color-primary-900: #0d47a1;
```

### Neutral Colors
```css
--forge-color-neutral-50: #fafafa;
--forge-color-neutral-100: #f5f5f5;
--forge-color-neutral-200: #eeeeee;
--forge-color-neutral-300: #e0e0e0;
--forge-color-neutral-400: #bdbdbd;
--forge-color-neutral-500: #9e9e9e;
--forge-color-neutral-600: #757575;
--forge-color-neutral-700: #616161;
--forge-color-neutral-800: #424242;
--forge-color-neutral-900: #212121;
```

### Semantic Colors
```css
--forge-color-success-500: #4caf50;
--forge-color-warning-500: #ff9800;
--forge-color-danger-500: #f44336;
--forge-color-info-500: #2196f3;
```

**Component Usage:**
- Button: Uses primary, neutral, success, warning, danger variants
- Alert: Uses semantic colors for different alert types
- Input: Uses neutral for borders, primary for focus

## Spacing Tokens

```css
--forge-spacing-xs: 4px;
--forge-spacing-sm: 8px;
--forge-spacing-md: 16px;
--forge-spacing-lg: 24px;
--forge-spacing-xl: 32px;
--forge-spacing-2xl: 48px;
--forge-spacing-3xl: 64px;
```

**Component Usage:**
- Button: padding uses sm/md/lg based on size
- Card: padding uses md/lg
- Form: gap between elements uses md

## Typography Tokens

### Font Family
```css
--forge-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--forge-font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;
```

### Font Sizes
```css
--forge-font-size-xs: 0.75rem;   /* 12px */
--forge-font-size-sm: 0.875rem;  /* 14px */
--forge-font-size-base: 1rem;    /* 16px */
--forge-font-size-lg: 1.125rem;  /* 18px */
--forge-font-size-xl: 1.25rem;   /* 20px */
--forge-font-size-2xl: 1.5rem;   /* 24px */
--forge-font-size-3xl: 1.875rem; /* 30px */
--forge-font-size-4xl: 2.25rem;  /* 36px */
```

### Font Weights
```css
--forge-font-weight-light: 300;
--forge-font-weight-normal: 400;
--forge-font-weight-medium: 500;
--forge-font-weight-semibold: 600;
--forge-font-weight-bold: 700;
```

### Line Heights
```css
--forge-line-height-tight: 1.2;
--forge-line-height-normal: 1.5;
--forge-line-height-relaxed: 1.75;
--forge-line-height-loose: 2;
```

**Component Usage:**
- Button: Uses font-size-base, font-weight-medium
- Heading: Uses font-size-2xl to 4xl, font-weight-semibold
- Body text: Uses font-size-base, line-height-normal

## Border Tokens

### Border Radius
```css
--forge-border-radius-sm: 2px;
--forge-border-radius-md: 4px;
--forge-border-radius-lg: 8px;
--forge-border-radius-xl: 12px;
--forge-border-radius-full: 9999px;
```

### Border Width
```css
--forge-border-width-thin: 1px;
--forge-border-width-medium: 2px;
--forge-border-width-thick: 4px;
```

**Component Usage:**
- Button: Uses border-radius-md
- Card: Uses border-radius-lg
- Avatar: Uses border-radius-full
- Input: Uses border-width-thin

## Shadow Tokens

```css
--forge-shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--forge-shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--forge-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--forge-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--forge-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--forge-shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

**Component Usage:**
- Card: Uses shadow-md by default, shadow-lg on hover
- Modal: Uses shadow-2xl
- Dropdown: Uses shadow-lg
- Button: Can use shadow-sm for raised variant

## Transition Tokens

```css
--forge-transition-fast: 150ms ease-in-out;
--forge-transition-base: 250ms ease-in-out;
--forge-transition-slow: 350ms ease-in-out;
--forge-transition-slower: 500ms ease-in-out;
```

**Component Usage:**
- Button: Uses transition-fast for hover effects
- Modal: Uses transition-base for open/close
- Accordion: Uses transition-slow for expand/collapse
- Tooltip: Uses transition-fast for show/hide

## Z-Index Tokens

```css
--forge-z-index-dropdown: 1000;
--forge-z-index-sticky: 1020;
--forge-z-index-fixed: 1030;
--forge-z-index-modal-backdrop: 1040;
--forge-z-index-modal: 1050;
--forge-z-index-popover: 1060;
--forge-z-index-tooltip: 1070;
```

## Usage Guidelines

### 1. Always Use Tokens
```css
/* ✅ Good */
.button {
  padding: var(--forge-spacing-sm) var(--forge-spacing-md);
  font-size: var(--forge-font-size-base);
  border-radius: var(--forge-border-radius-md);
}

/* ❌ Bad */
.button {
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
}
```

### 2. Provide Fallbacks
```css
.button {
  /* Fallback for older browsers */
  padding: var(--forge-spacing-md, 16px);
}
```

### 3. Component-Specific Tokens
Components can define their own tokens that reference base tokens:

```css
:host {
  /* Component-specific tokens that use base tokens */
  --button-height-sm: 32px;
  --button-height-md: 40px;
  --button-height-lg: 48px;
  
  /* These reference the base tokens */
  --button-padding: var(--forge-spacing-md);
  --button-font-size: var(--forge-font-size-base);
}
```

### 4. Dark Mode Support
Tokens can be overridden for dark mode:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --forge-color-neutral-50: #212121;
    --forge-color-neutral-900: #fafafa;
    /* ... other overrides */
  }
}
```

## Token Dependencies by Component

### Button Component
- Colors: primary, neutral, success, warning, danger
- Spacing: sm, md, lg
- Typography: font-family, font-size-base, font-weight-medium
- Border: border-radius-md
- Transitions: transition-fast

### Input Component
- Colors: neutral-300 (border), primary-500 (focus)
- Spacing: sm, md
- Typography: font-family, font-size-base
- Border: border-width-thin, border-radius-md
- Transitions: transition-fast

### Card Component
- Colors: neutral-50 (background), neutral-200 (border)
- Spacing: md, lg
- Border: border-radius-lg
- Shadows: shadow-md, shadow-lg (hover)

## Extending Tokens

To add new tokens:

1. Add to the appropriate section in `src/styles/tokens.css`
2. Document in this file
3. Use in components with fallbacks
4. Test in both light and dark modes

## Migration Guide

When updating existing components to use tokens:

1. Identify all hardcoded values
2. Map to appropriate tokens
3. Test visual appearance
4. Verify theme switching works
5. Update component documentation