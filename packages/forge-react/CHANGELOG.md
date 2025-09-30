# @nexcraft/forge-react

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
