---
'@nexcraft/forge-react': patch
---

refactor(types): improve TypeScript type safety across React integration

**Type Safety Improvements:**
- ✅ Replaced `any[]` with proper typed arrays (`GridSortConfig[]`, `DataTableRow[]`, `TreeNode[]`)
- ✅ Added proper type definitions for data structures (GridSortConfig, DataTableRow, TreeNode)
- ✅ Improved utility types (removed 20+ `any` casts)
- ✅ Better DOM/React type annotations

**What Changed:**
- `ForgeDataGridProps.onSortChanged`: `any[]` → `GridSortConfig[]`
- `ForgeDataTableProps.data`: `Record<string, any>[]` → `DataTableRow[]`
- `ForgeDataTableProps.onSelectionChange`: `any[]` → `DataTableRow[]`
- `ForgeTreeViewProps.data.children`: `any[]` → `TreeNode[]` (recursive)
- `createUnifiedWrapper`: Improved type annotations for refs and props

**Impact:**
- ✅ Better IDE autocomplete and IntelliSense
- ✅ Catch type errors at compile time
- ✅ Improved developer experience
- ✅ No breaking changes (compatible types)

**Remaining Work:**
Some component-specific fallback renderers still use `unknown` for flexibility. These are non-critical and will be addressed incrementally.
