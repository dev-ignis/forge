---
'@nexcraft/forge': patch
---

fix(forge-card): add padding to custom header slot

**Bug Fix:**
- Added proper padding to custom header slot in ForgeCard
- Ensures consistent spacing when using slotted header content

**What Changed:**
- Custom header slot now has appropriate padding
- Matches design system spacing standards

**Usage:**
```html
<!-- Header slot now has proper padding -->
<forge-card>
  <div slot="header">Custom Header</div>
  <p>Card content</p>
</forge-card>
```

**Impact:**
- ✅ Better visual consistency for custom headers
- ✅ Matches other card sections' padding
- ✅ No breaking changes - only adds missing padding
