---
'@nexcraft/forge-react': patch
---

feat(forge-card): add border prop to control card border visibility

**New Feature:**
- Added `border` prop to ForgeCard component
- Default: border shown (1px solid #e5e7eb)
- Set `border={false}` to remove border

**Usage:**
```tsx
// With border (default)
<ForgeCard>Content</ForgeCard>

// Without border
<ForgeCard border={false}>Clean borderless card</ForgeCard>
```

**Implementation:**
- Fallback renderer adds 'forge-card--no-border' class when border={false}
- CSS: `.forge-card--no-border { border: none; }`
- Attribute preserved during hydration to web component

**Impact:**
- ✅ Gives users control without custom CSS
- ✅ Matches common UI patterns (cards with/without borders)
- ✅ Simple API: `<ForgeCard border={false}>`
- ✅ No breaking changes
