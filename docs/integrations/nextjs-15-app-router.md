# Next.js 15 App Router Integration Guide

**Complete guide for using Forge web components with Next.js 15 and React 19**

## Quick Start (v1.0.4+)

```bash
npm install @nexcraft/forge @nexcraft/forge-react
```

```tsx
// app/layout.tsx
import '@nexcraft/forge-react/fallbacks.css'; // Optional: styles during SSR
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx (Server or Client Component - both work!)
import { ForgeButton, ForgeInput } from '@nexcraft/forge-react';

export default function Page() {
  return (
    <form>
      <ForgeInput placeholder="Email" type="email" />
      <ForgeButton type="submit">Submit</ForgeButton>
    </form>
  );
}
```

**That's it!** ✅ No `'use client'` needed - the package handles it automatically.

---

## How It Works

### ✅ Automatic `'use client'` Directive (v1.0.4+)

All Forge React components have `'use client'` built-in:

```js
// @nexcraft/forge-react/dist/components/ForgeInput.js
'use client';

// ... component code
```

**Benefits:**
- ✅ Import components anywhere (Server or Client Components)
- ✅ Next.js handles client boundary automatically
- ✅ No manual directives needed
- ✅ Works with App Router and Pages Router

### ✅ SSR Fallback Support

During SSR, components render as semantic HTML:

```tsx
// Server render
<ForgeInput placeholder="Email" />
// Renders: <input class="forge-input" placeholder="Email" data-ssr-fallback="true" />

// Client hydration
// Upgrades to: <forge-input placeholder="Email"></forge-input>
```

### ✅ Fallback CSS (Optional)

Import fallback styles to avoid flash of unstyled content:

```tsx
// app/layout.tsx
import '@nexcraft/forge-react/fallbacks.css';
```

**Styles included:**
- Form inputs (Input, Select, Checkbox, Switch, DatePicker)
- Buttons (all variants and sizes)
- UI components (Card, Badge, LoadingSpinner)

---

## Loading Strategies

### Option 1: CDN with `beforeInteractive` (Recommended)

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Pros:** ✅ Loads before React hydration, ✅ No timing issues
**Cons:** ⚠️ External dependency

### Option 2: Self-Hosted in `public/`

```bash
# Copy Forge to public folder
cp node_modules/@nexcraft/forge/dist/forge.js public/forge.js
```

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script src="/forge.js" strategy="beforeInteractive" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Pros:** ✅ Self-hosted, ✅ Version control
**Cons:** ⚠️ Manual updates needed

### Option 3: npm Import (Not Recommended for App Router)

```tsx
// app/layout.tsx
'use client';
import '@nexcraft/forge';

export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>;
}
```

**Pros:** ✅ npm-managed
**Cons:** ❌ Forces entire app to client-side, ❌ Loses SSR benefits

---

## Common Patterns

### Forms with Validation

```tsx
// app/register/page.tsx
'use client'; // Only needed if using useState/hooks

import { useState } from 'react';
import { ForgeInput, ForgeButton } from '@nexcraft/forge-react';
import '@nexcraft/forge-react/fallbacks.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); }}>
      <ForgeInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(value) => setEmail(value)}
        required
      />
      <ForgeButton type="submit">Register</ForgeButton>
    </form>
  );
}
```

### React Hook Form Integration

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { ForgeInput, ForgeButton } from '@nexcraft/forge-react';

export default function LoginForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <ForgeInput
        placeholder="Email"
        {...register('email', { required: true })}
      />
      <ForgeButton type="submit">Login</ForgeButton>
    </form>
  );
}
```

### Server Component with Client Island

```tsx
// app/dashboard/page.tsx (Server Component)
import { Suspense } from 'react';
import { ForgeCard } from '@nexcraft/forge-react';

export default async function Dashboard() {
  const data = await fetchData(); // Server-side data fetching

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Static card - rendered on server */}
      <ForgeCard>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
      </ForgeCard>

      {/* Interactive component - client island */}
      <Suspense fallback={<div>Loading...</div>}>
        <InteractiveChart data={data} />
      </Suspense>
    </div>
  );
}
```

```tsx
// components/InteractiveChart.tsx (Client Component)
'use client';

import { useState } from 'react';
import { ForgeButton } from '@nexcraft/forge-react';

export function InteractiveChart({ data }) {
  const [view, setView] = useState('bar');

  return (
    <div>
      <ForgeButton onClick={() => setView('bar')}>Bar Chart</ForgeButton>
      <ForgeButton onClick={() => setView('line')}>Line Chart</ForgeButton>
      {/* Chart rendering... */}
    </div>
  );
}
```

---

## Troubleshooting

### ❌ Components Stay as Unstyled HTML

**Problem:** Components render as `<input>` instead of `<forge-input>`

**Solutions:**
1. **Add fallback CSS** (provides styling during SSR):
   ```tsx
   import '@nexcraft/forge-react/fallbacks.css';
   ```

2. **Check Script loading**:
   ```tsx
   // Ensure beforeInteractive strategy
   <Script src="/forge.js" strategy="beforeInteractive" />
   ```

3. **Verify web components loaded**:
   ```tsx
   // Add to Client Component for debugging
   useEffect(() => {
     console.log('forge-input defined:', customElements.get('forge-input'));
   }, []);
   ```

### ❌ Hydration Mismatch Warnings

**Problem:** `Warning: Prop 'data-ssr-fallback' did not match`

**Solution:** This is expected behavior. The warning is harmless - components intentionally upgrade from fallback to web component.

To suppress:
```tsx
<ForgeInput suppressHydrationWarning />
```

### ❌ "customElements is not defined" Error

**Problem:** Script not loading before React hydration

**Solution:** Use `beforeInteractive` strategy:
```tsx
<Script
  src="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.js"
  strategy="beforeInteractive"
/>
```

### ❌ Components Not Interactive

**Problem:** Event handlers not working

**Solution:** Ensure you're using a Client Component:
```tsx
'use client'; // Add this at top of file

import { ForgeButton } from '@nexcraft/forge-react';

export default function MyComponent() {
  return <ForgeButton onClick={() => alert('Works!')}>Click</ForgeButton>;
}
```

---

## Migration from v1.0.3

### Before (v1.0.3)

```tsx
'use client'; // ❌ Required on every file

import { ForgeButton } from '@nexcraft/forge-react';

export function MyComponent() {
  return <ForgeButton>Click</ForgeButton>;
}
```

### After (v1.0.4+)

```tsx
// ✅ No 'use client' needed (unless using hooks/state)

import { ForgeButton } from '@nexcraft/forge-react';

export function MyComponent() {
  return <ForgeButton>Click</ForgeButton>;
}
```

**Breaking Changes:** None! Existing `'use client'` directives still work.

---

## Performance Tips

### 1. Lazy Load Components

```tsx
import dynamic from 'next/dynamic';

const ForgeDataTable = dynamic(
  () => import('@nexcraft/forge-react').then(mod => ({ default: mod.ForgeDataTable })),
  { ssr: true }
);
```

### 2. Preload Critical Components

```tsx
// app/layout.tsx
<link rel="modulepreload" href="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.js" />
```

### 3. Use Server Components When Possible

```tsx
// ✅ Server Component (static content)
export default function StaticPage() {
  return (
    <ForgeCard>
      <h1>Static Content</h1>
    </ForgeCard>
  );
}

// ❌ Avoid (unless interactivity needed)
'use client';
export default function StaticPage() {
  return (
    <ForgeCard>
      <h1>Static Content</h1>
    </ForgeCard>
  );
}
```

---

## Version Compatibility

| Next.js Version | Forge React Version | Status |
|----------------|---------------------|--------|
| 15.x (App Router) | v1.0.4+ | ✅ Fully Supported |
| 14.x (App Router) | v1.0.4+ | ✅ Fully Supported |
| 13.x (App Router) | v1.0.4+ | ✅ Supported |
| 12.x (Pages Router) | v1.0.4+ | ✅ Supported |

**React Compatibility:**
- React 19 ✅
- React 18 ✅
- React 17 ✅

---

## Examples

**Full working example:** See `demos/nextjs-app/` in the Forge repository

**Live Demo:** [https://forge-nextjs-demo.vercel.app](https://forge-nextjs-demo.vercel.app)

---

## Need Help?

- 📚 [Forge Documentation](https://forge.nexcraft.io)
- 💬 [GitHub Discussions](https://github.com/dev-ignis/forge/discussions)
- 🐛 [Report Issues](https://github.com/dev-ignis/forge/issues)
- 📧 [Contact Support](mailto:support@nexcraft.io)
