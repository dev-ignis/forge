# Phase 15: Framework Integration Package Split

## Objective
Extract framework-specific integrations into separate, optional packages to keep the main `@nexcraft/forge` package lightweight and eliminate CI noise from unused dependencies.

## Scope
- Split Angular integration into `@nexcraft/forge-angular` ✅ **COMPLETED**
- Split Vue integration into `@nexcraft/forge-vue` ✅ **COMPLETED**
- Split React integration into `@nexcraft/forge-react` 🚧 **PLANNED**
- Maintain `@nexcraft/forge` as **pure web components only** (truly framework-agnostic)
- Follow the successful pattern established by `@nexcraft/forge-rhf`

## Problem Statement
Originally, the main package contained all framework integrations, causing:
- ❌ CI noise: TypeScript errors when framework deps not installed
- ❌ Build warnings: Fallback compilation mode required
- ❌ Forced dependencies: Users forced to download framework code they don't use
- ❌ Bundle bloat: Framework-specific code increasing core package size
- ❌ **Architectural impurity**: Core package tied to specific frameworks

## Solution Architecture

### **Package Structure (ULTIMATE MINIMAL ARCHITECTURE)**
```
@nexcraft/forge              // PURE web components (truly framework-agnostic)
└── src/components/          // Web components ONLY

@nexcraft/forge-react        // React integration (NEW - Phase 15.4)
├── src/components/          // React component wrappers (33 components)
├── src/utils/               // React utilities
├── src/types/               // React TypeScript definitions
└── src/ssr/                 // SSR compatibility

@nexcraft/forge-vue          // Vue integration (COMPLETED ✅)
├── src/composables/         // Vue composables
├── src/directives/          // Vue directives  
├── src/plugin/              // Vue plugin
└── src/types/               // Vue TypeScript definitions

@nexcraft/forge-angular      // Angular integration (COMPLETED ✅)
├── src/directives/          // Angular directives
├── src/services/            // Angular services  
├── src/forms/               // Angular reactive forms integration
└── src/types/               // Angular TypeScript definitions

@nexcraft/forge-rhf          // React Hook Form (EXISTING ✅)
└── src/adapters/            // RHF adapters (keeps specialized purpose)
```

### **Benefits**
1. **Clean CI**: No more Angular compilation errors
2. **Focused Packages**: Each package serves specific ecosystem
3. **Optional Dependencies**: Install only what you need
4. **Better Maintenance**: Framework experts can maintain their integrations
5. **Proven Pattern**: Follows successful RHF approach

## Deliverables

### **Phase 15.1: Angular Package Creation (Priority)** ✅ **COMPLETED**
- [x] ✅ New workspace package: `packages/forge-angular`
- [x] ✅ Migrate Angular integration from `src/integrations/angular.ts`
- [x] ✅ Angular directives for web component integration
- [x] ✅ Angular reactive forms adapters
- [x] ✅ Angular service for theme management
- [x] ✅ TypeScript definitions and build setup
- [x] ✅ Documentation: `docs/integrations/angular.md`

### **Phase 15.2: Main Package Cleanup**
- [x] ✅ Remove Angular compilation from `vite.config.ts`
- [x] ✅ Remove `src/integrations/angular.ts` (migrated to @nexcraft/forge-angular)
- [x] ✅ Update package exports (remove Angular subpath)
- [x] ✅ Clean CI output validation (zero Angular compilation errors)
- [x] ✅ Update main package documentation (README.md updated with framework packages section)
- [x] ✅ **PUBLISHED**: `@nexcraft/forge-angular@0.1.0` available on npm

### **Phase 15.3: Vue Package (Active Implementation)** ✅ **COMPLETED**
- [x] ✅ **Evaluation Complete**: Vue integration is 500+ lines (NOT lightweight!)
- [x] ✅ **Decision**: Extract to `@nexcraft/forge-vue` for truly minimal core package
- [x] ✅ New workspace package: `packages/forge-vue`
- [x] ✅ Migrate Vue integration from `src/integrations/vue.ts` (composables, plugin, types)
- [x] ✅ Remove Vue compilation from main package
- [x] ✅ Update package exports (remove Vue subpath)
- [x] ✅ **PUBLISHED**: `@nexcraft/forge-vue@0.1.0` available on npm
- [x] ✅ Update documentation and README

## Technical Implementation

### **Angular Package Setup**
```json
// packages/forge-angular/package.json
{
  "name": "@nexcraft/forge-angular",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./forms": {
      "types": "./dist/forms/index.d.ts", 
      "import": "./dist/forms/index.js"
    }
  },
  "peerDependencies": {
    "@nexcraft/forge": ">=0.7.0",
    "@angular/core": "^17.0.0 || ^18.0.0",
    "@angular/forms": "^17.0.0 || ^18.0.0"
  }
}
```

### **Migration Strategy**
1. **Extract Current Code**: Move `src/integrations/angular.ts` to new package
2. **Expand Functionality**: Add proper Angular directives and services
3. **Build System**: Create Angular-specific build configuration
4. **Dependencies**: Add Angular as peer dependencies only
5. **Clean Main Package**: Remove Angular compilation entirely

### **Usage Pattern**
```typescript
// Core Forge components (main package)
import { ForgeButton, ForgeInput } from '@nexcraft/forge';

// Angular integration (separate package)
import { ForgeDirective, ForgeFormsModule } from '@nexcraft/forge-angular';
import { ForgeInputAdapter } from '@nexcraft/forge-angular/forms';
```

## Timeline (1-2 weeks)

### **Week 1: Angular Package Creation**
- Day 1-2: Package scaffold and build setup
- Day 3-4: Migrate and expand Angular integration
- Day 5: Documentation and examples

### **Week 2: Integration and Cleanup**
- Day 1-2: Main package cleanup and CI fixes
- Day 3-4: Testing with Angular projects
- Day 5: Publishing and announcement

## Success Metrics

### **Immediate (CI Health)**
- ✅ Zero Angular compilation errors in main package CI
- ✅ Clean build output without fallback warnings
- ✅ Main package builds without Angular dependencies

### **Long-term (Ecosystem)**
- 📈 Angular package adoption by Angular developers
- 📈 Reduced main package bundle size
- 📈 Better framework-specific documentation and examples

## Risks & Mitigations

### **Risk: Package Proliferation**
- **Mitigation**: Only create packages when clear value (Angular has CI noise issue)
- **Decision**: Vue stays in main package (lightweight, no build issues)

### **Risk: Version Synchronization**
- **Mitigation**: Use workspace publishing with version locking
- **Benefit**: Follow established RHF package patterns

### **Risk: Maintenance Overhead**
- **Mitigation**: Framework packages can be maintained by framework experts
- **Community**: Angular package can attract Angular community contributors

## Acceptance Criteria

- [x] ✅ `@nexcraft/forge` builds without any Angular or Vue references
- [x] ✅ `@nexcraft/forge-angular` provides full Angular integration (published)
- [x] ✅ `@nexcraft/forge-vue` provides full Vue integration (published)
- [x] ✅ CI output is clean with no compilation warnings
- [x] ✅ Documentation clearly explains package separation
- [x] ✅ Angular developers can use Forge components seamlessly
- [x] ✅ Vue developers can use Forge components seamlessly  
- [x] ✅ Main package remains focused on web components + React only

## Related Phases

- **Phase 12**: React Hook Form package split (completed) - provides pattern
- **Phase 13**: Monorepo platform (in progress) - provides infrastructure
- **Phase 14**: Monorepo publishing (future) - will handle multi-package releases

---

**Status**: ✅ **COMPLETED**  
**Dependencies**: ✅ Phase 13 monorepo infrastructure (satisfied)  
**Achievements**: ✅ Clean CI output, truly minimal core package, better framework support

## 🎉 **Phase 15 Complete!**

### **Published Packages:**
- `@nexcraft/forge-angular@0.1.0` - Angular integration
- `@nexcraft/forge-vue@0.1.0` - Vue composables & plugin

### **Core Package Now Minimal:**
- `@nexcraft/forge` - Web components + React only (373.91 kB)
- Zero framework compilation noise ✅
- Truly modular architecture ✅