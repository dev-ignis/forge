---
"@nexcraft/forge": patch
---

Fix AI manifest generation build ordering and add validation gates

## High-confidence fixes for 0.7.2

**Build ordering and packaging:**
- Ensure CEM is generated before AI manifest generation (build:manifest → build:ai)
- Fixed AI manifest script to fail fast when CEM is missing or invalid
- Added validation that generated manifest has at least 25 components
- Custom-elements.json properly included in npm package

**CI gates and validation:**
- Added prepublish checks that fail if AI artifacts are invalid
- Validates ai-manifest.json has correct component count
- Validates ai-index.json is not empty
- Verifies custom-elements.json exists and is valid
- Tests npm pack to ensure all files are included

**Robust manifest generation:**
- AI manifest script now logs error and exits if CEM is missing
- Added success metrics showing component count and AI method coverage
- Improved error messages with actionable fix suggestions

These changes ensure the published package contains valid AI artifacts and prevents shipping empty manifests like in v0.7.1.