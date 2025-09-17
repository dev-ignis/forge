# AI Tools Function-Calling Specifications

This directory contains function-calling specifications for AI tools to integrate with @nexcraft/forge components.

## Structure

- `react/` - React-specific component schemas and examples
- `vue/` - Vue-specific component schemas and examples  
- `angular/` - Angular-specific component schemas and examples
- `vanilla/` - Vanilla JavaScript component schemas and examples

## Usage

AI tools can import these specifications to understand:
- Component argument schemas
- Available props and their types
- Event handling patterns
- Framework-specific usage examples

## Examples

```javascript
// Import button specification for React
import buttonSpec from '@nexcraft/forge/ai-tools/react/button.json';

// Use the specification to generate component usage
const componentCode = generateReactComponent(buttonSpec);
```

## Schema Format

Each component specification follows this format:

```json
{
  "component": "forge-button",
  "framework": "react",
  "schema": {
    "props": { ... },
    "events": { ... },
    "slots": { ... }
  },
  "examples": [ ... ],
  "patterns": [ ... ]
}
```