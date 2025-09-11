# Next.js Integration Guide

This guide shows how to use **unified Forge components** with Next.js. All components now work seamlessly with SSR out-of-the-box - **no ClientOnly wrapper needed!**

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
  description: 'Built with @nexcraft/forge unified components',
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

### 3. Using Unified Forge Components

```typescript
// app/page.tsx
import { useState } from 'react';
import { 
  ForgeButton, 
  ForgeInput, 
  ForgeCard, 
  ForgeAlert,
  ForgeProgress
} from '@nexcraft/forge/integrations/react';

export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  
  // Components work everywhere - SSR, client, hydration!
  return (
    <ForgeCard>
      <h1>Welcome to Forge + Next.js</h1>
      
      <ForgeAlert severity="info">
        Unified components work with SSR automatically!
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
  );
}
```

## How Unified Components Work

Forge components automatically adapt to their environment:

### Server-Side Rendering (SSR)
- Renders semantic HTML with proper styling and accessibility
- No JavaScript required for basic functionality
- SEO-friendly and fast initial page load

### Client-Side Hydration  
- Progressively enhances semantic HTML to full web components
- Maintains all existing state and interactions
- Graceful degradation if JavaScript fails

### Client-Only Apps (Vite, CRA)
- Renders web components directly
- Full interactive functionality from the start
- No additional configuration needed

```typescript
// Same component works in ALL environments:

// ✅ Next.js SSR - renders semantic HTML first
<ForgeButton variant="primary">Submit</ForgeButton>

// ✅ Next.js client-side - hydrates to web component  
<ForgeButton variant="primary">Submit</ForgeButton>

// ✅ Vite/CRA - renders web component directly
<ForgeButton variant="primary">Submit</ForgeButton>
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
import { ForgeInput, ForgeButton } from '@nexcraft/forge/integrations/react';

interface FormData {
  email: string;
  name: string;
}

export default function MyForm() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  // No ClientOnly wrapper needed - works with SSR!
  return (
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
  );
}
```

### Formik Integration

```typescript
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ForgeInput, ForgeButton } from '@nexcraft/forge/integrations/react';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().required('Required'),
});

export default function FormikForm() {
  return (
    {/* Unified components work with SSR automatically */}
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
    {/* End of component section */}
  );
}
```

## Advanced Data Grid Example

```typescript
// components/UserDataGrid.tsx
'use client';

import { useState } from 'react';
import { ForgeDataGrid } from '@nexcraft/forge/integrations/react';
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
    {/* End of component section */}
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
    {/* End of component section */}
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
    {/* Unified components work with SSR automatically */}
      <ForgeInput label="Email" variant="outlined" />
      <ForgeAlert severity="info">Info message</ForgeAlert>
      <ForgeButton variant="primary">Submit</ForgeButton>
    {/* End of component section */}
  );
}
```

## Best Practices

1. **Use unified React wrappers for all components** - they work everywhere
2. **Prefer TypeScript for better developer experience and type safety**  
3. **Implement proper error boundaries** for production apps
4. **Consider code splitting for large component sets** to optimize performance
5. **Test in both SSR and client environments** to ensure compatibility
6. **Leverage semantic HTML fallbacks** for better accessibility and SEO

## Example Projects

- **Basic Next.js App**: [View on GitHub](https://github.com/nexcraft/forge-nextjs-example)
- **Advanced Dashboard**: [View on GitHub](https://github.com/nexcraft/forge-dashboard-example)
- **E-commerce Store**: [View on GitHub](https://github.com/nexcraft/forge-shop-example)

This guide resolves all issues mentioned in **GitHub Issue #17**. For additional support, please file an issue on our GitHub repository.