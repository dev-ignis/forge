# Remix Integration Guide

**Complete guide for using Forge web components with Remix**

## Quick Start

```bash
npm install @nexcraft/forge @nexcraft/forge-react
```

```tsx
// app/root.tsx
import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import '@nexcraft/forge-react/fallbacks.css';

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
        <script
          src="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.js"
          type="module"
        />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
```

```tsx
// app/routes/_index.tsx
import { ForgeButton, ForgeInput } from '@nexcraft/forge-react';

export default function Index() {
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

All Forge React components have `'use client'` built-in. Remix doesn't use this directive, but it ensures compatibility across React frameworks.

### ✅ SSR Fallback Support

During server rendering, components render as semantic HTML:

```tsx
// Server render
<ForgeInput placeholder="Email" />
// Renders: <input class="forge-input" placeholder="Email" data-ssr-fallback="true" />

// Client hydration
// Upgrades to: <forge-input placeholder="Email"></forge-input>
```

### ✅ Fallback CSS

Import fallback styles to avoid flash of unstyled content:

```tsx
// app/root.tsx
import '@nexcraft/forge-react/fallbacks.css';
```

---

## Loading Strategies

### Option 1: CDN in Root Layout (Recommended)

```tsx
// app/root.tsx
export default function App() {
  return (
    <html>
      <head>
        <script
          src="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.js"
          type="module"
        />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
```

**Pros:** ✅ Loads early, ✅ Cached across pages
**Cons:** ⚠️ External dependency

### Option 2: Self-Hosted in `public/`

```bash
# Copy Forge to public folder
cp node_modules/@nexcraft/forge/dist/forge.js public/forge.js
```

```tsx
// app/root.tsx
export default function App() {
  return (
    <html>
      <head>
        <script src="/forge.js" type="module" />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
```

**Pros:** ✅ Self-hosted, ✅ Version control
**Cons:** ⚠️ Manual updates needed

### Option 3: npm Import with ClientOnly

```tsx
// app/components/ClientOnly.tsx
import { useEffect, useState } from 'react';

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : null;
}
```

```tsx
// app/routes/_index.tsx
import { ClientOnly } from '~/components/ClientOnly';
import { ForgeButton } from '@nexcraft/forge-react';

export default function Index() {
  return (
    <ClientOnly>
      <ForgeButton>Click</ForgeButton>
    </ClientOnly>
  );
}
```

**Pros:** ✅ npm-managed
**Cons:** ⚠️ No SSR for wrapped components

---

## Common Patterns

### Forms with Loaders and Actions

```tsx
// app/routes/login.tsx
import { json, type ActionFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { ForgeInput, ForgeButton, ForgeAlert } from '@nexcraft/forge-react';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  // Validate and authenticate...
  if (!email || !password) {
    return json({ error: 'Email and password required' }, { status: 400 });
  }

  // Success - redirect
  return redirect('/dashboard');
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      {actionData?.error && (
        <ForgeAlert variant="error">{actionData.error}</ForgeAlert>
      )}

      <ForgeInput
        name="email"
        type="email"
        placeholder="Email"
        required
      />

      <ForgeInput
        name="password"
        type="password"
        placeholder="Password"
        required
      />

      <ForgeButton type="submit">Login</ForgeButton>
    </Form>
  );
}
```

### Controlled Forms with Client State

```tsx
// app/routes/register.tsx
import { useState } from 'react';
import { ForgeInput, ForgeButton } from '@nexcraft/forge-react';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (validate()) { /* submit */ }}}>
      <ForgeInput
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
        placeholder="Email"
        error={!!errors.email}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <ForgeInput
        type="password"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, password: value })}
        placeholder="Password"
        error={!!errors.password}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <ForgeInput
        type="password"
        value={formData.confirmPassword}
        onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
        placeholder="Confirm Password"
        error={!!errors.confirmPassword}
      />
      {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

      <ForgeButton type="submit">Register</ForgeButton>
    </form>
  );
}
```

### Data Tables with Loaders

```tsx
// app/routes/users.tsx
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ForgeDataTable } from '@nexcraft/forge-react';

export async function loader({ request }: LoaderFunctionArgs) {
  const users = await db.user.findMany();

  return json({
    users: users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role
    }))
  });
}

export default function Users() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <ForgeDataTable
      data={users}
      columns={[
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'role', header: 'Role' }
      ]}
      pagination
      pageSize={10}
    />
  );
}
```

---

## Troubleshooting

### ❌ Components Stay as Unstyled HTML

**Problem:** Components render as `<input>` instead of `<forge-input>`

**Solutions:**
1. **Add fallback CSS**:
   ```tsx
   import '@nexcraft/forge-react/fallbacks.css';
   ```

2. **Check Script loading** in `app/root.tsx`:
   ```tsx
   <script src="/forge.js" type="module" />
   ```

3. **Verify web components loaded** (browser console):
   ```js
   console.log(customElements.get('forge-input')); // Should not be undefined
   ```

### ❌ Hydration Mismatch Warnings

**Problem:** `Warning: Prop 'data-ssr-fallback' did not match`

**Solution:** This is expected - components upgrade from fallback. To suppress:
```tsx
<ForgeInput suppressHydrationWarning />
```

### ❌ "Module not found" Error

**Problem:** Can't resolve `@nexcraft/forge-react/fallbacks.css`

**Solution:** Ensure you're on v1.0.4+:
```bash
npm install @nexcraft/forge-react@latest
```

---

## Performance Tips

### 1. Preload Critical Resources

```tsx
// app/root.tsx
export function links() {
  return [
    {
      rel: 'modulepreload',
      href: 'https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.js'
    }
  ];
}
```

### 2. Use Remix's Built-in Prefetching

```tsx
import { Link } from '@remix-run/react';

<Link to="/dashboard" prefetch="intent">
  <ForgeButton>Go to Dashboard</ForgeButton>
</Link>
```

### 3. Lazy Load Heavy Components

```tsx
import { lazy, Suspense } from 'react';

const ForgeDataTable = lazy(() =>
  import('@nexcraft/forge-react').then(m => ({ default: m.ForgeDataTable }))
);

export default function DataPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgeDataTable data={data} />
    </Suspense>
  );
}
```

---

## Version Compatibility

| Remix Version | Forge React Version | Status |
|--------------|---------------------|--------|
| 2.x | v1.0.4+ | ✅ Fully Supported |
| 1.x | v1.0.4+ | ✅ Supported |

**React Compatibility:**
- React 19 ✅
- React 18 ✅

---

## Examples

**GitHub Example:** See `examples/remix-app/` (coming soon)

---

## Need Help?

- 📚 [Forge Documentation](https://forge.nexcraft.io)
- 💬 [GitHub Discussions](https://github.com/dev-ignis/forge/discussions)
- 🐛 [Report Issues](https://github.com/dev-ignis/forge/issues)
- 📧 [Contact Support](mailto:support@nexcraft.io)
