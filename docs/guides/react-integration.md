---
title: React Integration (moved)
---

# React Integration (moved)

This guide has moved. Please see the canonical React docs:

- New location: `../integrations/react.md`

Notes:
- The React integration now lives in the `@nexcraft/forge-react` package.
- Previous examples using `@nexcraft/forge/integrations/react` are deprecated.
        Open Modal
      </forge-button>
      
      <forge-modal 
        ref={ref}
        title="My Modal"
        onClose={() => console.log('Modal closed')}
      >
        <p>Modal content here</p>
        <forge-button onClick={hideModal}>
          Close
        </forge-button>
      </forge-modal>
    </div>
  );
}
```

### Data Table with State

```jsx
import { useState } from 'react';

function DataTableExample() {
  const [data, setData] = useState([
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' },
  ]);

  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    { key: 'id', title: 'ID', sortable: true },
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email' },
  ];

  const handleSelect = ForgeEventHandlers.onSelect(setSelectedRows);
  const handleSort = (key, direction) => {
    console.log('Sort:', key, direction);
    // Implement sorting logic
  };

  return (
    <forge-data-table 
      data={data}
      columns={columns}
      selectable="multiple"
      onSelect={handleSelect}
      onSort={ForgeEventHandlers.onSort(handleSort)}
    />
  );
}
```

## Theme Integration

```jsx
import { useForgeTheme } from '@nexcraft/forge/integrations/react';

function ThemeProvider({ children }) {
  const { theme, setTheme } = useForgeTheme();

  return (
    <div data-forge-theme={theme}>
      <div className="theme-controls">
        <forge-button onClick={() => setTheme('light')}>
          Light
        </forge-button>
        <forge-button onClick={() => setTheme('dark')}>
          Dark
        </forge-button>
        <forge-button onClick={() => setTheme('auto')}>
          Auto
        </forge-button>
      </div>
      {children}
    </div>
  );
}
```

## Next.js Integration

### App Directory (Next.js 13+)

```jsx
// app/layout.tsx
import '@nexcraft/forge';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```jsx
// app/page.tsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      <forge-button 
        variant="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </forge-button>
      
      {isOpen && (
        <forge-modal 
          title="Next.js Modal"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <p>This is a modal in Next.js!</p>
        </forge-modal>
      )}
    </main>
  );
}
```

### Pages Directory (Next.js 12 and below)

```jsx
// pages/_app.js
import '@nexcraft/forge';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

## Best Practices

### 1. Component Import Strategy
```jsx
// ✅ Good: Import once at app level
// app.tsx
import '@nexcraft/forge';

// ✅ Good: Import specific components if needed
import '@nexcraft/forge/dist/components/button.js';
import '@nexcraft/forge/dist/components/modal.js';
```

### 2. Event Handling Patterns
```jsx
// ✅ Good: Use helper functions for type safety
import { ForgeEventHandlers } from '@nexcraft/forge/integrations/react';

const handleInput = ForgeEventHandlers.onInput((value) => {
  console.log('Typed value:', value);
});

// ✅ Good: Use custom event details
const handleCustomEvent = (event) => {
  console.log('Event detail:', event.detail);
  console.log('Target element:', event.target);
};
```

### 3. TypeScript Integration
```tsx
// ✅ Good: Use provided types
import type { 
  ForgeButtonProps, 
  ForgeInputProps,
  ForgeCustomEvent 
} from '@nexcraft/forge/types/framework-integration';

// ✅ Good: Type your event handlers
const handleButtonClick = (event: ForgeCustomEvent) => {
  // Fully typed event handling
};
```

### 4. Form Integration
```jsx
// ✅ Good: Use integration utilities
import { useForgeControlled } from '@nexcraft/forge/integrations/react';

function MyInput({ value, onChange }) {
  const { ref } = useForgeControlled(value, onChange);
  return <forge-input ref={ref} />;
}
```

## Performance Optimization

### Lazy Loading Components
```jsx
import { lazy, Suspense } from 'react';

// Lazy load Forge components
const ForgeDataTable = lazy(() => 
  import('@nexcraft/forge/dist/components/data-table.js').then(() => ({
    default: () => null // Web Components don't need default export
  }))
);

function MyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgeDataTable data={data} />
    </Suspense>
  );
}
```

### Memoization
```jsx
import { memo } from 'react';

const MemoizedForgeComponent = memo(({ data, ...props }) => {
  return (
    <forge-data-table 
      data={JSON.stringify(data)}  // Stable reference
      {...props}
    />
  );
});
```

## Troubleshooting

### Common Issues

**Issue: TypeScript errors with Web Components**
```tsx
// ❌ Problem: JSX element type does not have any construct signatures
<forge-button>Click</forge-button>

// ✅ Solution: Import type definitions
import '@nexcraft/forge/types/framework-integration';
```

**Issue: Events not firing**
```jsx
// ❌ Problem: Wrong event name
<forge-button onButtonClick={handleClick}>Click</forge-button>

// ✅ Solution: Use standard DOM events
<forge-button onClick={handleClick}>Click</forge-button>
```

**Issue: Props not updating**
```jsx
// ❌ Problem: Passing objects directly
<forge-data-table data={dataObject} />

// ✅ Solution: Use JSON or proper serialization
<forge-data-table data={JSON.stringify(dataObject)} />
```

## Migration from Other Libraries

### From Material-UI
```jsx
// Material-UI
import { Button, TextField } from '@mui/material';

<Button variant="contained" color="primary">
  Click Me
</Button>
<TextField label="Name" variant="outlined" />

// Forge equivalent
<forge-button variant="primary">
  Click Me
</forge-button>
<forge-form-field label="Name">
  <forge-input />
</forge-form-field>
```

### From Ant Design
```jsx
// Ant Design
import { Button, Input } from 'antd';

<Button type="primary">Click Me</Button>
<Input placeholder="Enter name" />

// Forge equivalent  
<forge-button variant="primary">Click Me</forge-button>
<forge-input placeholder="Enter name" />
```

## Resources

- [Storybook Documentation](https://forge.ignis.dev)
- [TypeScript Definitions](../types/framework-integration.d.ts)
- [React Integration Utilities](../integrations/react.ts)
- [Vue Integration Utilities](../integrations/vue.ts)
- [Angular Integration Utilities](../integrations/angular.ts)
- [Build Integration Script](../scripts/build-integrations.js)
- [Example Repository](https://github.com/dev-ignis/forge-react-examples)

## Support

- [GitHub Issues](https://github.com/dev-ignis/forge/issues)
- [GitHub Discussions](https://github.com/dev-ignis/forge/discussions)
- [Discord Community](#) (coming soon)
