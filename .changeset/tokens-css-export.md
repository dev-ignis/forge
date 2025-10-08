---
'@nexcraft/forge': patch
---

fix(tokens): export CSS design tokens for component styling

**Bug Fix:**
- Added missing `tokens.css` export to package.json
- Users can now import CSS custom properties for theming

**What Changed:**
```json
// package.json exports
"./tokens.css": "./dist/tokens.css"
```

**Usage:**
```js
// Before: Not available
// After: Can import tokens
import '@nexcraft/forge/tokens.css';
```

**Impact:**
- ✅ Design tokens now accessible via package export
- ✅ Enables custom theming with CSS variables
- ✅ Matches documented token bridge usage
- ✅ No breaking changes
