---
"@nexcraft/forge": minor
---

Add selective imports for all 28 components

- Previously only 7 components had selective imports (button, input, checkbox, select, alert, card, modal)
- Now all 28 components support selective imports for optimal tree-shaking
- Auto-discovery system ensures new components automatically get exports
- Fixes customer issue where ForgeProgress, ForgeBadge, ForgeAvatar, ForgeDropdown were missing

**New selective imports available:**
- ForgeAccordion, ForgeAspectRatio, ForgeAvatar, ForgeBadge
- ForgeDataGrid, ForgeDataTable, ForgeDatePicker, ForgeDropdown
- ForgeFormField, ForgeIcon, ForgeMultiSelect, ForgeNavigationBar
- ForgePagination, ForgeProgress, ForgeRadioGroup, ForgeSkeleton
- ForgeSwitch, ForgeTabs, ForgeToast, ForgeTooltip, ForgeTreeView

**Usage:**
```typescript
import { ForgeProgress } from '@nexcraft/forge/progress';
import { ForgeBadge } from '@nexcraft/forge/badge';
import { ForgeAvatar } from '@nexcraft/forge/avatar';
```
