---
'@nexcraft/forge-react': patch
'@nexcraft/forge-vue': patch
'@nexcraft/forge-angular': patch
'@nexcraft/forge-rhf': patch
---

fix(release): build workspace packages before publishing

**Critical Fix:** v1.0.0 packages were published without compiled `dist/` folders, making them completely unusable.

**Root Cause:**
Release workflow only built main @nexcraft/forge package, not workspace packages (forge-react, forge-vue, forge-angular, forge-rhf).

**Fix:**
- Add build step for all workspace packages before `changeset publish`
- Ensures dist/ folders exist for all packages
- Validates packages are usable after installation

**Impact:**
- ✅ @nexcraft/forge-react@1.0.1 will include dist/ folder
- ✅ @nexcraft/forge-vue@1.0.1 will include dist/ folder
- ✅ @nexcraft/forge-angular@1.0.1 will include dist/ folder
- ✅ @nexcraft/forge-rhf@1.0.1 will include dist/ folder

**Affected Users:**
Anyone who installed v1.0.0 packages encountered:
```
Error: Cannot find module './dist/index.js'
```

**Resolution:**
Upgrade to v1.0.1 when released:
```bash
npm install @nexcraft/forge-react@latest
npm install @nexcraft/forge-vue@latest
npm install @nexcraft/forge-angular@latest
npm install @nexcraft/forge-rhf@latest
```

**Apologies:**
We sincerely apologize for this critical oversight. We've added additional validation to prevent this from happening again.
