---
'@nexcraft/forge-react': patch
---

fix(ssr): proper SSR architecture - NO 'use client' in library files

**Critical Architecture Fix:**
- **REMOVED** 'use client' from all library files (was polluting all consumers)
- Library files stay framework-agnostic (no Next.js-specific directives)
- Consumers add 'use client' to their own files when needed
- Matches industry standard (Radix UI, Headless UI, Framer Motion)

**What Changed:**
- ✅ ForgeProvider: NO 'use client' (consumers add it)
- ✅ createUnifiedWrapper: NO 'use client' (consumers add it)
- ✅ Added clear documentation: "add 'use client' to your file"
- ✅ SSR demo shows correct usage pattern

**Why This Matters:**
- ❌ **Wrong**: Library has 'use client' → ALL consumers forced to client-side
- ✅ **Correct**: Consumers add 'use client' → They control client boundaries

**Usage Pattern (Correct):**
```tsx
// ✅ YOUR file - add 'use client' here
'use client';
import { ForgeButton } from '@nexcraft/forge-react';

export function MyComponent() {
  return <ForgeButton>Click</ForgeButton>;
}
```

**Impact:**
- ✅ No forced client-side rendering for all consumers
- ✅ Consumers control their own SSR/client boundaries
- ✅ Better performance (only client components when needed)
- ✅ Framework-agnostic library architecture
