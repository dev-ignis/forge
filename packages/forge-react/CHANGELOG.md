# @nexcraft/forge-react

## 1.0.0

### Patch Changes

- Updated dependencies [7a38d60]
- Updated dependencies [7a38d60]
  - @nexcraft/forge@0.9.0

## 0.3.0

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

- Updated dependencies [6515991]
  - @nexcraft/forge@0.8.0

## 2.0.0

### Minor Changes

- Phase 15.4: React integration package split
  - Extract all React components and utilities to @nexcraft/forge-react package
  - Remove React integration from main @nexcraft/forge package
  - Achieve pure web components core package (truly framework-agnostic)
  - Update documentation and migration guides
  - Add comprehensive React integration documentation

  **Migration**: For React users, install the new dedicated package:

  ```bash
  npm install @nexcraft/forge-react
  ```

  ```diff
  - import { ForgeButton } from '@nexcraft/forge/integrations/react';
  + import { ForgeButton } from '@nexcraft/forge-react';
  ```

  **Benefits**:
  - Consistent modular architecture across all frameworks
  - Optional React dependency - install only what you need
  - Better maintenance by React experts
  - Architectural purity - core package is framework-agnostic

### Patch Changes

- Updated dependencies
  - @nexcraft/forge@0.9.0

## 1.0.0

### Major Changes

- Phase 15.4: React integration package split

  **BREAKING CHANGE**: React integration moved to separate @nexcraft/forge-react package
  - Extract all React components and utilities to @nexcraft/forge-react package
  - Remove React integration from main @nexcraft/forge package
  - Achieve pure web components core package (truly framework-agnostic)
  - Update documentation and migration guides

  **Migration**: Replace `@nexcraft/forge/integrations/react` imports with `@nexcraft/forge-react`

  ```diff
  - import { ForgeButton } from '@nexcraft/forge/integrations/react';
  + import { ForgeButton } from '@nexcraft/forge-react';
  ```

  **Benefits**:
  - Consistent modular architecture across all frameworks
  - Optional React dependency - install only what you need
  - Better maintenance by React experts
  - Architectural purity - core package is framework-agnostic

### Patch Changes

- Updated dependencies
  - @nexcraft/forge@0.8.0
