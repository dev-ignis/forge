---
'@nexcraft/forge-react': patch
---

fix(fallback): pass through `id` prop in all form component fallbacks

**Bug Fix:**
- Fixed duplicate ID warning when multiple form components use the same `id` prop
- All form input fallback renderers now properly pass through the `id` attribute

**What Changed:**
- `ForgeInput`: Now passes `id` prop to fallback `<input>` element
- `ForgeSwitch`: Now passes `id` prop to fallback checkbox input
- `ForgeSelect`: Now passes `id` prop to fallback `<select>` element
- `ForgeDatePicker`: Now passes `id` prop to fallback date input

**Impact:**
- ✅ Fixes browser warning: "Found N elements with non-unique id"
- ✅ Proper label associations with `htmlFor` attribute
- ✅ Better accessibility for screen readers
- ✅ No breaking changes

**Before:**
```tsx
<ForgeInput id="email" />
// Fallback: <input /> (id ignored)
```

**After:**
```tsx
<ForgeInput id="email" />
// Fallback: <input id="email" />
```
