# @nexcraft/forge-rhf

## 1.0.1

### Patch Changes

- c074759: fix(release): build workspace packages before publishing

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

- Updated dependencies [c074759]
  - @nexcraft/forge-react@1.0.1
  - @nexcraft/forge@0.9.0

## 1.0.0

### Patch Changes

- d04ae04: fix: support React 19 in peer dependencies
  - Update peer dependency to accept React 18 or 19
  - Fixes compatibility with Next.js 15 and React 19

- Updated dependencies [7a38d60]
- Updated dependencies [7a38d60]
  - @nexcraft/forge@0.9.0
  - @nexcraft/forge-react@1.0.0

## 0.4.0

### Minor Changes

- 842b2e4: chore: increment beta versions to skip unpublished versions
  - Bump framework packages to 0.2.0-beta.0 to skip past unpublished 0.1.1-beta.0
  - Bump forge-mcp-figma to 0.2.0-beta.0 to skip past unpublished 0.1.1-beta.0
  - Bump forge-rhf to 0.4.0-beta.0 to skip past unpublished 0.3.1-beta.0 and 1.0.0-beta.0

- 6515991: Phase 15.4: Complete React package extraction and framework separation
  - Extract React integration to separate @nexcraft/forge-react package
  - Remove all framework integrations from core @nexcraft/forge package
  - Update @nexcraft/forge-rhf to use new React package
  - Achieve pure web components core architecture
  - Set up linked package releases for coordinated versioning

### Patch Changes

- Updated dependencies [842b2e4]
- Updated dependencies [6515991]
  - @nexcraft/forge-react@0.3.0
  - @nexcraft/forge@0.8.0

## 2.0.0

### Patch Changes

- Updated dependencies
  - @nexcraft/forge@0.9.0

## 1.0.0

### Patch Changes

- Updated dependencies
  - @nexcraft/forge@0.8.0

## 0.3.0

### Minor Changes

- - **fix**: - rhf peer dependency; (b38f5af)
  - **fix**: - align package versions with published npm versions; (e7400ba)
  - **fix**: - correct forge-rhf version from 1.0.0 to 0.3.0; (a4c841f)
  - **feat**: align package versions with npm registry for stable v0.7.0 release (a39eeeb)
  - **fix**: resolve GitHub Actions CI failures and dependency conflicts (6eb371d)

### Patch Changes

- Updated dependencies
  - @nexcraft/forge@0.7.0

## 0.2.0

### Patch Changes

- 581a548: # Phase 11: AI Manifest & Tooling - Major Release

  ## 🤖 AI-Native Development Features
  - **Enhanced AI Manifest**: Comprehensive a11y metadata for all 30+ components with WCAG 2.1 AA compliance data
  - **SSR Fallback Examples**: Server-side rendering examples showing semantic HTML structure for better SEO and accessibility
  - **AI Metadata Validation**: Schema-based validation using AJV for AI manifest integrity
  - **Component Intelligence**: Complete AI state tracking and action suggestions for all components

  ## 📚 Documentation & Developer Experience
  - **Documentation Cleanup**: Removed redundant files (COMPONENTS.md, IMPLEMENTATION_STATUS.md) and fixed broken references
  - **AI-Native Guides**: Enhanced guides for AI-assisted development patterns and component usage
  - **Shipping Optimization**: Fixed package.json files array to only ship necessary documentation
  - **Cross-Reference Validation**: Ensured all shipped documentation has valid internal references

  ## 🏗️ Infrastructure & Deployment
  - **GitHub Pages Integration**: Complete deployment pipeline for live examples and documentation
  - **Next.js Example App**: Production-ready example with static export capabilities
  - **Examples Structure**: Organized framework examples with live demo hosting
  - **CI/CD Enhancement**: Automated deployment and example updates

  ## 📋 Planning & Roadmap
  - **Priority Roadmaps**: Updated immediate, short-term, and long-term strategic plans
  - **Security Framework**: Added cross-cutting security and quality concerns documentation
  - **Progress Tracking**: Enhanced status tracking and completion metrics

  ## 🐛 Bug Fixes & Improvements
  - **React Integration**: Fixed TypeScript errors in React hooks and components
  - **File References**: Resolved broken documentation links and missing file issues
  - **Schema Compliance**: Updated AI manifest schema to match rich component metadata structure

  ## 🚀 What's Next

  This release establishes a solid foundation for AI-native component development with comprehensive tooling, documentation, and deployment infrastructure. The library now includes 30+ components with full AI metadata, live examples, and production-ready deployment pipelines.

- Updated dependencies [581a548]
  - @nexcraft/forge@0.7.0

## 0.2.0

### Minor Changes

- Add React Hook Form adapters package

  Initial release of @nexcraft/forge-rhf package containing React Hook Form adapters extracted from the main package for better modularity.
