# Forge Next.js Demo

Professional showcase for `@nexcraft/forge` - The FIRST AI-Native component library.

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:9091

## Required Setup

### 1. Import Design Tokens (REQUIRED)

```tsx
// app/layout.tsx
import "@nexcraft/forge/tokens.css"; // REQUIRED: CSS variables
```

### 2. Import Fallback Styles (for SSR)

```tsx
import "@nexcraft/forge-react/fallbacks.css";
```

## How Users Should Use Forge

```tsx
// 1. Import tokens CSS globally (in root layout)
import "@nexcraft/forge/tokens.css";

// 2. Import React components
import { ForgeButton, ForgeCard } from '@nexcraft/forge-react';

// 3. Use them (they auto-register web components)
<ForgeButton variant="primary">Click me</ForgeButton>
```

## Why tokens.css is Required

Forge components use CSS Shadow DOM with CSS variables for styling:
- `--forge-color-primary-500` for colors
- `--forge-spacing-md` for spacing
- `--forge-border-radius-md` for borders

Without importing `tokens.css`, components render with no styling.
