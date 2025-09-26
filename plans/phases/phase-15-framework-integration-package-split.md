# Phase 15: Framework Integration Package Split

## Objective
Extract framework-specific integrations into separate, optional packages to keep the main `@nexcraft/forge` package lightweight and eliminate CI noise from unused dependencies.

## Scope
- Split Angular integration into `@nexcraft/forge-angular`
- Consider Vue integration package `@nexcraft/forge-vue` (future)
- Maintain `@nexcraft/forge` as core web components + React wrappers only
- Follow the successful pattern established by `@nexcraft/forge-rhf`

## Problem Statement
Currently, the main package attempts to compile Angular integration during build, causing:
- ❌ CI noise: TypeScript errors when Angular deps not installed
- ❌ Build warnings: Fallback compilation mode required
- ❌ Forced dependencies: Users don't need Angular if they use React/Vue
- ❌ Bundle bloat potential: Framework-specific code in main package

## Solution Architecture

### **Package Structure**
```
@nexcraft/forge              // Core web components + React integration
├── src/components/          // Web components (unchanged)
├── src/integrations/react/  // React wrappers (keep)
└── src/integrations/vue.ts  // Vue composables (keep, lightweight)

@nexcraft/forge-angular      // Angular integration (NEW)
├── src/directives/          // Angular directives
├── src/services/            // Angular services  
├── src/components/          // Angular component wrappers
└── src/forms/               // Angular reactive forms integration

@nexcraft/forge-rhf          // React Hook Form (EXISTING ✅)
└── src/adapters/            // RHF adapters
```

### **Benefits**
1. **Clean CI**: No more Angular compilation errors
2. **Focused Packages**: Each package serves specific ecosystem
3. **Optional Dependencies**: Install only what you need
4. **Better Maintenance**: Framework experts can maintain their integrations
5. **Proven Pattern**: Follows successful RHF approach

## Deliverables

### **Phase 15.1: Angular Package Creation (Priority)**
- [ ] New workspace package: `packages/forge-angular`
- [ ] Migrate Angular integration from `src/integrations/angular.ts`
- [ ] Angular directives for web component integration
- [ ] Angular reactive forms adapters
- [ ] Angular service for theme management
- [ ] TypeScript definitions and build setup
- [ ] Documentation: `docs/integrations/angular.md`

### **Phase 15.2: Main Package Cleanup**
- [ ] Remove Angular compilation from `vite.config.ts`
- [ ] Remove `src/integrations/angular.ts` 
- [ ] Update package exports (remove Angular subpath)
- [ ] Clean CI output validation
- [ ] Update main package documentation

### **Phase 15.3: Vue Package (Future Consideration)**
- [ ] Evaluate if Vue integration warrants separate package
- [ ] Vue composables are lightweight, may stay in main package
- [ ] Consider `@nexcraft/forge-vue` if ecosystem grows complex

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

- [ ] `@nexcraft/forge` builds without any Angular references
- [ ] `@nexcraft/forge-angular` provides full Angular integration
- [ ] CI output is clean with no compilation warnings
- [ ] Documentation clearly explains package separation
- [ ] Angular developers can use Forge components seamlessly
- [ ] Main package remains focused on web components + React

## Related Phases

- **Phase 12**: React Hook Form package split (completed) - provides pattern
- **Phase 13**: Monorepo platform (in progress) - provides infrastructure
- **Phase 14**: Monorepo publishing (future) - will handle multi-package releases

---

**Status**: Ready to implement  
**Depends on**: Phase 13 monorepo infrastructure (workspace setup)  
**Enables**: Clean CI output, focused packages, better Angular support