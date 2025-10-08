---
'@nexcraft/forge-react': patch
---

fix(docs): correct CDN URL to use nexcraft-forge.es.js instead of forge.js

**Critical Documentation Fix:**
- CDN URL was incorrect: `/dist/forge.js` does not exist in the package
- Correct file: `/dist/nexcraft-forge.es.js`
- Updated all integration guides (Next.js, Remix, SvelteKit)

**What Changed:**
- ❌ Old: `https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.js`
- ✅ New: `https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/nexcraft-forge.es.js`

**Files Updated:**
- docs/integrations/nextjs-15-app-router.md
- docs/integrations/remix.md
- docs/integrations/sveltekit.md

**Impact:**
- ✅ CDN links now work correctly
- ✅ Self-hosted instructions use correct filename
- ✅ Import statements reference actual file
- ✅ Fixes "404 Not Found" errors when using CDN
