# Next.js Integration Guide

This guide addresses **GitHub Issue #17** integration challenges and provides comprehensive Next.js setup instructions for `@nexcraft/forge`.

## Quick Start

### 1. Installation

```bash
npm install @nexcraft/forge
# or
yarn add @nexcraft/forge
```

### 2. Basic Setup (App Router - Next.js 13+)

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My App with Forge Components',
  description: 'Built with @nexcraft/forge',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### 3. Using Forge Components (Two Approaches)

#### Option A: React Wrapper Components (Recommended)

```typescript
// app/page.tsx
import { 
  ForgeButton, 
  ForgeInput, 
  ForgeCard, 
  ForgeAlert,
  ForgeProgress,
  ClientOnly 
} from '@nexcraft/forge/integrations/react';

export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <ForgeCard>
        <h1>Welcome to Forge + Next.js</h1>
        
        <ForgeAlert severity="info">
          This resolves GitHub Issue #17 integration problems!
        </ForgeAlert>
        
        <ForgeInput
          label="Your Name"
          value={inputValue}
          onChange={(value) => setInputValue(value)}
          placeholder="Enter your name..."
        />
        
        <ForgeButton 
          variant="primary" 
          onClick={() => alert(`Hello, ${inputValue}!`)}
        >
          Say Hello
        </ForgeButton>
        
        <ForgeProgress value={75} max={100} />
      </ForgeCard>
    </ClientOnly>
  );
}
```

#### Option B: Direct Web Components (Advanced)

```typescript
// app/components/ForgeComponents.tsx
'use client'; // Required for web components

import { useEffect } from 'react';

export default function ForgeComponents() {
  useEffect(() => {
    // Import web components on client side only
    import('@nexcraft/forge');
  }, []);

  return (
    <div>
      <forge-button variant="primary">Direct Web Component</forge-button>
      <forge-input placeholder="Direct input"></forge-input>
    </div>
  );
}

// app/page.tsx
import dynamic from 'next/dynamic';

const ForgeComponents = dynamic(() => import('./components/ForgeComponents'), {
  ssr: false, // Disable SSR for web components
  loading: () => <p>Loading Forge components...</p>
});

export default function HomePage() {
  return (
    <div>
      <h1>My Next.js App</h1>
      <ForgeComponents />
    </div>
  );
}
```

## SSR Configuration

### Method 1: ClientOnly Wrapper (Simplest)

```typescript
import { ClientOnly, ForgeButton } from '@nexcraft/forge/integrations/react';

export default function MyPage() {
  return (
    <ClientOnly fallback={<button>Loading...</button>}>
      <ForgeButton variant="primary">Server-Safe Button</ForgeButton>
    </ClientOnly>
  );
}
```

### Method 2: Dynamic Imports with No SSR

```typescript
import dynamic from 'next/dynamic';

const ForgeButton = dynamic(
  () => import('@nexcraft/forge/integrations/react').then(mod => ({ default: mod.ForgeButton })),
  { 
    ssr: false,
    loading: () => <button className="loading">Loading...</button>
  }
);

export default function MyPage() {
  return <ForgeButton variant="primary">Dynamic Button</ForgeButton>;
}
```

### Method 3: Custom Hook for SSR Detection

```typescript
// hooks/useIsClient.ts
import { useState, useEffect } from 'react';

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

// components/MyComponent.tsx
import { useIsClient } from '../hooks/useIsClient';
import { ForgeButton } from '@nexcraft/forge/integrations/react';

export default function MyComponent() {
  const isClient = useIsClient();

  if (!isClient) {
    return <button className="fallback">Loading...</button>;
  }

  return <ForgeButton variant="primary">Client-Only Button</ForgeButton>;
}
```

## TypeScript Configuration

### 1. Update tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### 2. Add Web Components Type Declarations

```typescript
// types/forge.d.ts
import '@nexcraft/forge';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'forge-button': any;
      'forge-input': any;
      'forge-card': any;
      'forge-alert': any;
      'forge-progress': any;
      'forge-data-grid': any;
    }
  }
}

export {};
```

## Form Integration

### React Hook Form

```typescript
import { useForm, Controller } from 'react-hook-form';
import { ForgeInput, ForgeButton, ClientOnly } from '@nexcraft/forge/integrations/react';

interface FormData {
  email: string;
  name: string;
}

export default function MyForm() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <ClientOnly>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: 'Email is required' }}
          render={({ field, fieldState }) => (
            <ForgeInput
              {...field}
              type="email"
              label="Email"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <ForgeInput
              {...field}
              label="Full Name"
              placeholder="Enter your name"
            />
          )}
        />

        <ForgeButton type="submit" variant="primary">
          Submit Form
        </ForgeButton>
      </form>
    </ClientOnly>
  );
}
```

### Formik Integration

```typescript
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ForgeInput, ForgeButton, ClientOnly } from '@nexcraft/forge/integrations/react';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().required('Required'),
});

export default function FormikForm() {
  return (
    <ClientOnly>
      <Formik
        initialValues={{ email: '', name: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <ForgeInput
              label="Email"
              type="email"
              value={values.email}
              onChange={(value) => setFieldValue('email', value)}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
            
            <ForgeInput
              label="Name"
              value={values.name}
              onChange={(value) => setFieldValue('name', value)}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            
            <ForgeButton type="submit" variant="primary">
              Submit
            </ForgeButton>
          </Form>
        )}
      </Formik>
    </ClientOnly>
  );
}
```

## Advanced Data Grid Example

```typescript
// components/UserDataGrid.tsx
'use client';

import { useState } from 'react';
import { ForgeDataGrid, ClientOnly } from '@nexcraft/forge/integrations/react';
import type { GridColumn, GridData } from '@nexcraft/forge';

const columns: GridColumn[] = [
  { id: 'name', title: 'Name', field: 'name', sortable: true },
  { id: 'email', title: 'Email', field: 'email', sortable: true },
  { id: 'role', title: 'Role', field: 'role', filterable: true },
  { id: 'status', title: 'Status', field: 'status', filterable: true }
];

export default function UserDataGrid() {
  const [users] = useState<GridData[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    // ... more data
  ]);

  const handleSelectionChange = (selectedRows: string[], allSelected: boolean) => {
    console.log('Selected rows:', selectedRows, 'All selected:', allSelected);
  };

  return (
    <ClientOnly fallback={<div>Loading data grid...</div>}>
      <ForgeDataGrid
        columns={columns}
        data={users}
        selectable
        virtualScrolling
        showToolbar
        showSearch
        onSelectionChanged={handleSelectionChange}
      />
    </ClientOnly>
  );
}
```

## Performance Optimization

### 1. Code Splitting

```typescript
// Lazy load Forge components
const ForgeDataGrid = lazy(() => 
  import('@nexcraft/forge/integrations/react').then(mod => ({ 
    default: mod.ForgeDataGrid 
  }))
);

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgeDataGrid columns={columns} data={data} />
    </Suspense>
  );
}
```

### 2. Bundle Analysis

Add to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@nexcraft/forge']
  },
  webpack: (config) => {
    // Optimize Forge component imports
    config.resolve.alias['@nexcraft/forge$'] = '@nexcraft/forge/dist/index.js';
    return config;
  }
};

module.exports = nextConfig;
```

## Troubleshooting

### Common Issues and Solutions

#### Issue: "Export doesn't exist" errors

```bash
# ❌ Error: Export Alert doesn't exist
import { Button, Alert } from '@nexcraft/forge';

# ✅ Solution: Use React wrappers
import { ForgeButton, ForgeAlert } from '@nexcraft/forge/integrations/react';
```

#### Issue: SSR hydration mismatches

```typescript
// ❌ Problematic
function MyComponent() {
  return <forge-button>Click me</forge-button>;
}

// ✅ Solution: Use ClientOnly wrapper
function MyComponent() {
  return (
    <ClientOnly fallback={<button>Loading...</button>}>
      <ForgeButton>Click me</ForgeButton>
    </ClientOnly>
  );
}
```

#### Issue: Events not firing

```typescript
// ❌ Won't work with web components
<forge-button onClick={handleClick}>Button</forge-button>

// ✅ Use React wrapper
<ForgeButton onClick={handleClick}>Button</ForgeButton>

// ✅ Or manual event listeners
useEffect(() => {
  const button = buttonRef.current;
  button?.addEventListener('click', handleClick);
  return () => button?.removeEventListener('click', handleClick);
}, []);
```

## Migration from Other Libraries

### From Material-UI

```typescript
// Before (Material-UI)
import { Button, TextField, Alert } from '@mui/material';

function MyForm() {
  return (
    <>
      <TextField label="Email" variant="outlined" />
      <Alert severity="info">Info message</Alert>
      <Button variant="contained" color="primary">Submit</Button>
    </>
  );
}

// After (Forge)
import { ForgeInput, ForgeAlert, ForgeButton, ClientOnly } from '@nexcraft/forge/integrations/react';

function MyForm() {
  return (
    <ClientOnly>
      <ForgeInput label="Email" variant="outlined" />
      <ForgeAlert severity="info">Info message</ForgeAlert>
      <ForgeButton variant="primary">Submit</ForgeButton>
    </ClientOnly>
  );
}
```

## Best Practices

1. **Always use `ClientOnly` wrapper for SSR apps**
2. **Prefer React wrappers over direct web components**  
3. **Use TypeScript for better developer experience**
4. **Implement proper error boundaries**
5. **Consider code splitting for large component sets**
6. **Test both SSR and client-side rendering**

## Example Projects

- **Basic Next.js App**: [View on GitHub](https://github.com/nexcraft/forge-nextjs-example)
- **Advanced Dashboard**: [View on GitHub](https://github.com/nexcraft/forge-dashboard-example)
- **E-commerce Store**: [View on GitHub](https://github.com/nexcraft/forge-shop-example)

This guide resolves all issues mentioned in **GitHub Issue #17**. For additional support, please file an issue on our GitHub repository.