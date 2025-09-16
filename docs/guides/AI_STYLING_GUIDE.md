# 🎨 AI Styling Guide for Forge Components

**Complete styling reference for AI tools and developers**

This guide explains all the ways to style Forge components, with clear examples for AI tools like Cursor, GitHub Copilot, and Claude Code.

## 📋 Styling Methods Overview

Forge components support **4 styling approaches** that can be used together:

| Method | Use Case | Example | AI-Friendly |
|--------|----------|---------|-------------|
| **Built-in Variants** | Common use cases | `variant="primary"` | ✅ Excellent |
| **CSS Custom Properties** | Design system integration | `--forge-primary-color: #007bff` | ⚠️ Moderate |
| **CSS Classes** | Custom styling | `className="my-button"` | ✅ Excellent |
| **Inline Styles** | Quick tweaks | `style={{color: 'red'}}` | ✅ Excellent |

## 🚀 Method 1: Built-in Variants (Recommended for AI)

### ForgeButton Variants
```jsx
// Primary actions (blue, prominent)
<ForgeButton variant="primary" size="lg">Save Changes</ForgeButton>

// Secondary actions (gray, subtle)  
<ForgeButton variant="secondary" size="md">Cancel</ForgeButton>

// Destructive actions (red, warning)
<ForgeButton variant="danger" size="sm">Delete</ForgeButton>

// Ghost/minimal styling
<ForgeButton variant="ghost">Learn More</ForgeButton>

// Sizes: xs, sm, md, lg, xl
<ForgeButton variant="primary" size="xl">Large CTA</ForgeButton>
```

### ForgeInput Variants
```jsx
// Standard input
<ForgeInput variant="default" placeholder="Enter text..." />

// Error state
<ForgeInput variant="error" helperText="This field is required" />

// Success state  
<ForgeInput variant="success" helperText="Valid email address" />

// Disabled state
<ForgeInput variant="disabled" value="Read only" />
```

### ForgeAlert Variants
```jsx
// Information (blue)
<ForgeAlert severity="info">Processing your request...</ForgeAlert>

// Success (green)
<ForgeAlert severity="success">Profile updated successfully!</ForgeAlert>

// Warning (orange)
<ForgeAlert severity="warning">Session expires in 5 minutes</ForgeAlert>

// Error (red)
<ForgeAlert severity="error">Failed to save changes</ForgeAlert>
```

## 🎨 Method 2: CSS Custom Properties (Design System)

### Primary Color Customization
```css
/* Global theme colors */
:root {
  --forge-primary-color: #007bff;
  --forge-primary-hover: #0056b3;
  --forge-secondary-color: #6c757d;
  --forge-danger-color: #dc3545;
  --forge-success-color: #28a745;
  --forge-warning-color: #ffc107;
  --forge-info-color: #17a2b8;
}
```

### Component-Specific Variables
```css
/* Button customization */
forge-button {
  --button-border-radius: 8px;
  --button-font-weight: 600;
  --button-padding: 12px 24px;
}

/* Input customization */
forge-input {
  --input-border-color: #e2e8f0;
  --input-focus-color: #3b82f6;
  --input-border-radius: 6px;
}

/* Card customization */
forge-card {
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --card-border-radius: 12px;
  --card-padding: 24px;
}
```

## 🏷️ Method 3: CSS Classes (Most Flexible)

### Tailwind CSS Integration
```jsx
// Using Tailwind classes
<ForgeButton className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Custom Styled Button
</ForgeButton>

<ForgeInput className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500" />

<ForgeCard className="shadow-xl rounded-2xl p-6 bg-gradient-to-r from-blue-50 to-purple-50">
  <h3 className="text-xl font-bold text-gray-800">Custom Card</h3>
</ForgeCard>
```

### Custom CSS Classes
```css
/* Custom button styles */
.my-custom-button {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  padding: 14px 28px;
  transition: transform 0.2s;
}

.my-custom-button:hover {
  transform: translateY(-2px);
}
```

```jsx
<ForgeButton className="my-custom-button">
  Gradient Button
</ForgeButton>
```

## ⚡ Method 4: Inline Styles (Quick Tweaks)

```jsx
// Quick color overrides
<ForgeButton 
  variant="primary" 
  style={{
    backgroundColor: '#ff6b6b',
    borderColor: '#ff5252',
    fontSize: '18px'
  }}
>
  Custom Red Button
</ForgeButton>

// Responsive sizing
<ForgeInput 
  style={{
    width: '100%',
    maxWidth: '400px',
    fontSize: '16px'
  }} 
/>
```

## 🎯 AI-Specific Styling Patterns

### Pattern 1: Modern App UI
```jsx
// Clean, modern styling for SaaS apps
<ForgeCard className="bg-white shadow-sm border border-gray-200 rounded-xl">
  <div className="p-6">
    <ForgeButton 
      variant="primary" 
      className="w-full bg-indigo-600 hover:bg-indigo-700"
    >
      Get Started
    </ForgeButton>
  </div>
</ForgeCard>
```

### Pattern 2: Dashboard Components
```jsx
// Dashboard card with metrics
<ForgeCard className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-md">
  <div className="p-6">
    <h3 className="text-2xl font-bold text-blue-900">1,234</h3>
    <p className="text-blue-600">Total Users</p>
  </div>
</ForgeCard>
```

### Pattern 3: Form Styling
```jsx
// Modern form with consistent spacing
<div className="space-y-6">
  <ForgeInput 
    variant="default"
    className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    placeholder="Email address"
  />
  
  <ForgeButton 
    variant="primary"
    className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg font-medium"
  >
    Sign In
  </ForgeButton>
</div>
```

## 🔧 Framework-Specific Styling

### React + Styled Components
```jsx
import styled from 'styled-components'

const StyledButton = styled(ForgeButton)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  border-radius: 3px;
  color: white;
  height: 48px;
  padding: 0 30px;
`

<StyledButton variant="primary">Styled Component</StyledButton>
```

### Vue + Scoped CSS
```vue
<template>
  <ForgeButton class="custom-button" variant="primary">
    Vue Button
  </ForgeButton>
</template>

<style scoped>
.custom-button {
  background: var(--primary-gradient);
  border-radius: 8px;
  font-weight: 600;
}
</style>
```

## 🎨 Design System Integration

### Importing Your Design Tokens
```css
/* Import your design system */
@import 'design-tokens.css';

/* Map to Forge variables */
:root {
  --forge-primary-color: var(--color-brand-primary);
  --forge-secondary-color: var(--color-brand-secondary);
  --forge-border-radius: var(--border-radius-medium);
  --forge-spacing-unit: var(--spacing-base);
}
```

## 📱 Responsive Styling

```jsx
// Responsive button sizing
<ForgeButton 
  variant="primary"
  className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
>
  Responsive Button
</ForgeButton>

// Responsive card layout
<ForgeCard className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
  <div className="p-4 sm:p-6 lg:p-8">
    Content scales with screen size
  </div>
</ForgeCard>
```

## 🤖 AI Prompt Examples

### For Cursor/Copilot:
```
// Prompt: "Create a primary button with custom blue styling"
<ForgeButton 
  variant="primary" 
  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
>
  Custom Blue Button
</ForgeButton>

// Prompt: "Style this input for a modern login form"
<ForgeInput 
  variant="default"
  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  placeholder="Enter your email"
/>
```

## 🚀 Quick Reference for AI Tools

### Most Common Styling Patterns:
```jsx
// Primary action button
<ForgeButton variant="primary" className="w-full py-3">Action</ForgeButton>

// Form input with validation
<ForgeInput variant="default" className="w-full rounded-lg border-gray-300" />

// Success alert
<ForgeAlert severity="success" className="rounded-lg">Success message</ForgeAlert>

// Modern card
<ForgeCard className="shadow-lg rounded-xl p-6">Card content</ForgeCard>

// Data table
<ForgeDataTable className="w-full border border-gray-200 rounded-lg" />
```

This combination of **variants + CSS classes** gives you maximum flexibility while maintaining consistency and AI-friendliness.