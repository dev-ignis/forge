---
'@nexcraft/forge-react': patch
---

fix(ssr): improve hydration timing with customElements.whenDefined()

**Critical Timing Fix:**
- ✅ Components now properly upgrade from fallback to web component when loaded
- ✅ Fixes issue where components stayed as fallback HTML indefinitely
- ✅ Handles race condition between component render and web component registration

**What Changed:**
- Added `customElements.whenDefined()` detection in `createUnifiedWrapper`
- Components wait for web component definition before upgrading
- Graceful fallback if web components never load

**Technical Details:**
```tsx
// Before: Only checked if component was already defined
const shouldUpgrade = customElements.get(tagName) !== undefined;

// After: Waits for component to be defined
if (shouldUpgrade) {
  upgradeToWebComponent();
} else {
  customElements.whenDefined(tagName).then(() => {
    upgradeToWebComponent();
  });
}
```

**Impact:**
- ✅ Components upgrade correctly after web components load
- ✅ Handles dynamic import scenarios
- ✅ Handles Next.js Script with `beforeInteractive` strategy
- ✅ No hydration mismatches or warnings

**Related Issues Fixed:**
- "Components stay as fallbacks" - now properly upgrade
- Race condition with dynamic `import('@nexcraft/forge')`
- Timing issues with Next.js Script loading
