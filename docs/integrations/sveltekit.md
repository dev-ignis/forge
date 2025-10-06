# SvelteKit Integration Guide

**Complete guide for using Forge web components with SvelteKit**

## Quick Start

```bash
npm install @nexcraft/forge
```

```html
<!-- src/routes/+layout.svelte -->
<script>
  import '@nexcraft/forge/dist/forge.js';
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.css" />
</svelte:head>

<slot />
```

```html
<!-- src/routes/+page.svelte -->
<script lang="ts">
  let email = '';

  function handleSubmit(e: Event) {
    e.preventDefault();
    console.log('Email:', email);
  }
</script>

<form on:submit={handleSubmit}>
  <forge-input
    placeholder="Email"
    type="email"
    bind:value={email}
  />
  <forge-button type="submit">Submit</forge-button>
</form>
```

**That's it!** ✅ Forge web components work natively in Svelte.

---

## Why Svelte is Perfect for Web Components

✅ **Native web component support** - No wrappers needed
✅ **Two-way binding** - `bind:value` works out of the box
✅ **Event handling** - Standard `on:event` syntax
✅ **SSR compatible** - Works with SvelteKit SSR
✅ **TypeScript support** - Full type safety with declarations

---

## Loading Strategies

### Option 1: npm Import in Layout (Recommended)

```html
<!-- src/routes/+layout.svelte -->
<script>
  import '@nexcraft/forge/dist/forge.js';
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.css" />
</svelte:head>

<slot />
```

**Pros:** ✅ npm-managed, ✅ Bundled with app
**Cons:** ⚠️ Increases bundle size

### Option 2: CDN in `app.html`

```html
<!-- src/app.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Load Forge from CDN -->
    <script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.css" />

    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

**Pros:** ✅ Cached, ✅ Doesn't affect bundle size
**Cons:** ⚠️ External dependency

### Option 3: Self-Hosted in `static/`

```bash
# Copy Forge to static folder
cp node_modules/@nexcraft/forge/dist/forge.js static/
cp node_modules/@nexcraft/forge/dist/forge.css static/
```

```html
<!-- src/app.html -->
<script type="module" src="/forge.js"></script>
<link rel="stylesheet" href="/forge.css" />
```

**Pros:** ✅ Self-hosted, ✅ Version control
**Cons:** ⚠️ Manual updates needed

---

## Common Patterns

### Forms with Two-Way Binding

```html
<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  let email = '';
  let password = '';
  let rememberMe = false;

  async function handleLogin(e: Event) {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rememberMe })
    });

    if (response.ok) {
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }
  }
</script>

<form on:submit={handleLogin}>
  <forge-input
    type="email"
    placeholder="Email"
    bind:value={email}
    required
  />

  <forge-input
    type="password"
    placeholder="Password"
    bind:value={password}
    required
  />

  <forge-checkbox
    bind:checked={rememberMe}
  >
    Remember me
  </forge-checkbox>

  <forge-button type="submit">
    Login
  </forge-button>
</form>
```

### Form Validation

```html
<!-- src/routes/register/+page.svelte -->
<script lang="ts">
  import { z } from 'zod';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let errors: Record<string, string> = {};

  const schema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string()
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

  function validate() {
    const result = schema.safeParse({ email, password, confirmPassword });

    if (!result.success) {
      errors = result.error.flatten().fieldErrors as Record<string, string>;
      return false;
    }

    errors = {};
    return true;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!validate()) return;

    // Submit form...
  }
</script>

<form on:submit={handleSubmit}>
  <div>
    <forge-input
      type="email"
      placeholder="Email"
      bind:value={email}
      error={!!errors.email}
    />
    {#if errors.email}
      <span class="error">{errors.email}</span>
    {/if}
  </div>

  <div>
    <forge-input
      type="password"
      placeholder="Password"
      bind:value={password}
      error={!!errors.password}
    />
    {#if errors.password}
      <span class="error">{errors.password}</span>
    {/if}
  </div>

  <div>
    <forge-input
      type="password"
      placeholder="Confirm Password"
      bind:value={confirmPassword}
      error={!!errors.confirmPassword}
    />
    {#if errors.confirmPassword}
      <span class="error">{errors.confirmPassword}</span>
    {/if}
  </div>

  <forge-button type="submit">Register</forge-button>
</form>
```

### Server Load Data with Data Tables

```typescript
// src/routes/users/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const users = await locals.db.user.findMany();

  return {
    users: users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role
    }))
  };
};
```

```html
<!-- src/routes/users/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  let selectedRows: any[] = [];

  function handleSelectionChange(event: CustomEvent) {
    selectedRows = event.detail;
    console.log('Selected:', selectedRows);
  }
</script>

<forge-data-table
  data={JSON.stringify(data.users)}
  columns={JSON.stringify([
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' }
  ])}
  pagination
  page-size="10"
  on:selectionchange={handleSelectionChange}
/>

{#if selectedRows.length > 0}
  <p>Selected {selectedRows.length} users</p>
{/if}
```

### Modal Dialogs

```html
<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  let modalOpen = false;
  let userName = '';

  function openModal() {
    modalOpen = true;
  }

  function closeModal() {
    modalOpen = false;
    userName = '';
  }

  function handleSave() {
    console.log('Saving user:', userName);
    closeModal();
  }
</script>

<forge-button on:click={openModal}>
  Add User
</forge-button>

<forge-modal
  open={modalOpen}
  on:close={closeModal}
>
  <h2 slot="header">Add New User</h2>

  <div slot="body">
    <forge-input
      placeholder="User Name"
      bind:value={userName}
    />
  </div>

  <div slot="footer">
    <forge-button variant="secondary" on:click={closeModal}>
      Cancel
    </forge-button>
    <forge-button on:click={handleSave}>
      Save
    </forge-button>
  </div>
</forge-modal>
```

---

## TypeScript Support

### Enable Custom Elements Types

```typescript
// src/app.d.ts
declare namespace svelteHTML {
  interface IntrinsicElements {
    'forge-input': {
      value?: string;
      placeholder?: string;
      type?: string;
      disabled?: boolean;
      required?: boolean;
      error?: boolean;
      'on:change'?: (event: CustomEvent<{ value: string }>) => void;
      'on:input'?: (event: CustomEvent<{ value: string }>) => void;
    };

    'forge-button': {
      variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
      size?: 'sm' | 'md' | 'lg';
      disabled?: boolean;
      type?: 'button' | 'submit' | 'reset';
      'on:click'?: (event: MouseEvent) => void;
    };

    'forge-checkbox': {
      checked?: boolean;
      disabled?: boolean;
      value?: string;
      'on:change'?: (event: CustomEvent<{ checked: boolean }>) => void;
    };

    'forge-modal': {
      open?: boolean;
      'on:close'?: () => void;
    };

    'forge-data-table': {
      data?: string;
      columns?: string;
      pagination?: boolean;
      'page-size'?: string;
      'on:selectionchange'?: (event: CustomEvent<any[]>) => void;
    };

    // Add more components as needed...
  }
}
```

### Using Types

```html
<script lang="ts">
  function handleChange(event: CustomEvent<{ value: string }>) {
    console.log('New value:', event.detail.value);
  }
</script>

<forge-input
  on:change={handleChange}
  placeholder="Type here..."
/>
```

---

## SSR Considerations

### Client-Only Components

Some components might not work during SSR. Use `browser` check:

```html
<script>
  import { browser } from '$app/environment';
</script>

{#if browser}
  <forge-chart data={chartData} />
{:else}
  <div>Loading chart...</div>
{/if}
```

### Hydration Issues

If you encounter hydration warnings:

```html
<!-- Suppress hydration warnings -->
<div data-sveltekit-reload>
  <forge-input bind:value={email} />
</div>
```

---

## Troubleshooting

### ❌ "Unknown custom element" Warning

**Problem:** Svelte warns about unknown custom elements

**Solution:** Add to `svelte.config.js`:

```js
import adapter from '@sveltejs/adapter-auto';

export default {
  kit: {
    adapter: adapter()
  },
  compilerOptions: {
    customElement: true
  }
};
```

### ❌ Two-Way Binding Not Working

**Problem:** `bind:value` doesn't update

**Solution:** Ensure the component dispatches proper events:

```html
<!-- Use on:change or on:input instead -->
<forge-input
  value={email}
  on:change={(e) => email = e.detail.value}
/>
```

### ❌ Styles Not Loading

**Problem:** Components appear unstyled

**Solution:** Import CSS in layout or `app.html`:

```html
<!-- src/routes/+layout.svelte -->
<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.css" />
</svelte:head>
```

---

## Performance Tips

### 1. Lazy Load Components

```html
<script lang="ts">
  import { onMount } from 'svelte';

  let loaded = false;

  onMount(async () => {
    await import('@nexcraft/forge/dist/forge.js');
    loaded = true;
  });
</script>

{#if loaded}
  <forge-data-table data={tableData} />
{:else}
  <div>Loading...</div>
{/if}
```

### 2. Optimize Bundle Size

```js
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';

export default {
  plugins: [sveltekit()],
  build: {
    rollupOptions: {
      external: ['@nexcraft/forge']
    }
  }
};
```

### 3. Preload Critical Resources

```html
<!-- src/app.html -->
<link
  rel="modulepreload"
  href="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.js"
/>
```

---

## Version Compatibility

| SvelteKit Version | Forge Version | Status |
|------------------|---------------|--------|
| 2.x | v0.9.0+ | ✅ Fully Supported |
| 1.x | v0.9.0+ | ✅ Supported |

**Svelte Compatibility:**
- Svelte 5 ✅
- Svelte 4 ✅

---

## Examples

**GitHub Example:** See `examples/sveltekit-app/` (coming soon)

---

## Need Help?

- 📚 [Forge Documentation](https://forge.nexcraft.io)
- 💬 [GitHub Discussions](https://github.com/dev-ignis/forge/discussions)
- 🐛 [Report Issues](https://github.com/dev-ignis/forge/issues)
- 📧 [Contact Support](mailto:support@nexcraft.io)
