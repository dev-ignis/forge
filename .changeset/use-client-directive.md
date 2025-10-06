---
'@nexcraft/forge-react': patch
---

feat(ssr): automatic 'use client' directive for Next.js App Router compatibility

**Critical SSR Fix:**
- ✅ Automatic 'use client' directive added to all React components during build
- ✅ Components work in Next.js App Router without manual 'use client' directives
- ✅ Zero-config SSR support for all React frameworks

**What Changed:**
- Build script automatically prepends `'use client';` to all compiled components
- 40 component files now have 'use client' directive
- No changes needed in source files (framework-agnostic)

**Impact:**
- ✅ Next.js App Router: Components work automatically
- ✅ Remix: Full SSR support
- ✅ Gatsby: No changes needed
- ✅ No breaking changes - existing code works better

**Before (v1.0.3):**
```tsx
'use client'; // User must add this
import { ForgeButton } from '@nexcraft/forge-react';

export function MyComponent() {
  return <ForgeButton>Click</ForgeButton>;
}
```

**After (v1.0.4):**
```tsx
// No 'use client' needed - package handles it!
import { ForgeButton } from '@nexcraft/forge-react';

export function MyComponent() {
  return <ForgeButton>Click</ForgeButton>;
}
```

**Technical Details:**
- Post-build script: `packages/forge-react/scripts/add-use-client.js`
- Build command updated: `tsc && node scripts/add-use-client.js`
- Follows industry standard pattern (Material UI approach)
