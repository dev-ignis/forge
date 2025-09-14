# Version Features Matrix

This guide documents which features are available in each version of @nexcraft/forge, helping developers understand what's available based on their installed version.

## Quick Version Check

```bash
# Check your installed version
npm list @nexcraft/forge

# Check latest published version
npm view @nexcraft/forge version

# Check all available versions
npm view @nexcraft/forge versions --json
```

## Feature Availability by Version

### 🎯 **v0.5.2-beta.22** (Next Release - In Development)

**NEW FEATURES:**
- ✅ **Tailwind Plugin**: `@nexcraft/forge/plugin`
- ✅ **Selective Component Imports**: `@nexcraft/forge/button`, `@nexcraft/forge/input`, etc.
- ✅ **Enhanced Tree-Shaking**: Import only what you need

**Exports Added:**
```javascript
// NEW: Tailwind Plugin
import forgePlugin from '@nexcraft/forge/plugin';

// NEW: Individual Component Imports
import { ForgeButton } from '@nexcraft/forge/button';
import { ForgeInput } from '@nexcraft/forge/input'; 
import { ForgeCheckbox } from '@nexcraft/forge/checkbox';
import { ForgeSelect } from '@nexcraft/forge/select';
import { ForgeAlert } from '@nexcraft/forge/alert';
import { ForgeCard } from '@nexcraft/forge/card';
import { ForgeModal } from '@nexcraft/forge/modal';
```

### ✅ **v0.5.2-beta.21** (Current Beta)

**FEATURES:**
- ✅ **React Hook Form Integration**: `@nexcraft/forge/integrations/rhf`
- ✅ **All Core Components**: 27 production-ready components
- ✅ **AI-Native Metadata**: 100% coverage
- ✅ **Performance Monitoring**: Built-in dashboard
- ✅ **Framework Integrations**: React, Vue, Angular

**Available Exports:**
```javascript
// Core library
import '@nexcraft/forge';

// Framework integrations  
import { ForgeButton } from '@nexcraft/forge/integrations/react';
import { ForgeInput } from '@nexcraft/forge/integrations/vue';
import { ForgeCheckbox } from '@nexcraft/forge/integrations/angular';

// React Hook Form (NEW in this version)
import { RHFForgeInput, RHFForgeCheckbox } from '@nexcraft/forge/integrations/rhf';
```

### ✅ **v0.5.2** (Stable Release)

**FEATURES:**
- ✅ **Core Components**: Full component library
- ✅ **Framework Integrations**: React, Vue, Angular
- ✅ **AI Metadata**: Complete implementation
- ✅ **Performance Monitoring**: Dashboard and metrics

**Missing Features:**
- ❌ React Hook Form adapters
- ❌ Tailwind plugin
- ❌ Selective imports

**Available Exports:**
```javascript
// Core library only
import '@nexcraft/forge';
import { ForgeButton } from '@nexcraft/forge/integrations/react';
```

### 📈 **v0.5.2-beta.20 and Earlier**

**FEATURES:**
- ✅ **Core Components**: Progressive component releases
- ✅ **Basic Framework Support**: React integration
- ✅ **AI Metadata**: Initial implementation

**Missing Features:**
- ❌ React Hook Form adapters
- ❌ Tailwind plugin  
- ❌ Selective imports
- ❌ Vue/Angular integrations (some versions)

## Migration Guide

### From v0.5.2 (Stable) → v0.5.2-beta.21+

**New Capabilities:**
```javascript
// React Hook Form integration now available
import { RHFForgeInput } from '@nexcraft/forge/integrations/rhf';

// Enhanced React integration
import { useForgeReactHookForm } from '@nexcraft/forge/integrations/react';
```

**Breaking Changes:** None - fully backward compatible.

### From v0.5.2-beta.21 → v0.5.2-beta.22+

**New Capabilities:**
```javascript
// Tailwind plugin
import forgePlugin from '@nexcraft/forge/plugin';

// Selective imports for better tree-shaking
import { ForgeButton } from '@nexcraft/forge/button';
import { ForgeInput } from '@nexcraft/forge/input';
```

**Breaking Changes:** None - all existing imports continue to work.

## Usage Patterns by Version

### For v0.5.2-beta.22+ Users (Latest)

**Recommended Pattern - Selective Imports:**
```typescript
// Best: Import only what you need
import { ForgeButton } from '@nexcraft/forge/button';
import { ForgeInput } from '@nexcraft/forge/input';

// Good: Framework integration
import { RHFForgeInput } from '@nexcraft/forge/integrations/rhf';

// Great: Tailwind plugin
import forgePlugin from '@nexcraft/forge/plugin';

export default {
  plugins: [forgePlugin]
}
```

### For v0.5.2-beta.21 Users

**Recommended Pattern - Integration Imports:**
```typescript
// Best available option
import { ForgeButton, ForgeInput } from '@nexcraft/forge/integrations/react';
import { RHFForgeInput } from '@nexcraft/forge/integrations/rhf';

// Bulk import (less optimal bundle size)
import '@nexcraft/forge';
```

### For v0.5.2 Stable Users

**Available Pattern - Framework Integration:**
```typescript
// Only option for stable release
import { ForgeButton, ForgeInput } from '@nexcraft/forge/integrations/react';

// Or bulk import
import '@nexcraft/forge';

// React Hook Form: Use direct spread pattern
const { register } = useForm();
<ForgeInput {...register('email')} />
```

## Feature Development Timeline

| Version | React Hook Form | Tailwind Plugin | Selective Imports | Status |
|---------|----------------|-----------------|-------------------|--------|
| v0.5.2 | ❌ | ❌ | ❌ | ✅ Stable |
| v0.5.2-beta.21 | ✅ | ❌ | ❌ | ✅ Published |
| v0.5.2-beta.22 | ✅ | ✅ | ✅ | 🚧 In Development |

## Troubleshooting by Version

### "Cannot find module '@nexcraft/forge/integrations/rhf'"

**Diagnosis:** You're using v0.5.2 (stable) or earlier beta versions.

**Solution:** 
```bash
# Upgrade to beta with RHF support
npm install @nexcraft/forge@beta

# Or use direct spread pattern
import { useForm } from 'react-hook-form';
const { register } = useForm();
<ForgeInput {...register('field')} />
```

### "Cannot find module '@nexcraft/forge/plugin'"

**Diagnosis:** You're using v0.5.2-beta.21 or earlier.

**Solution:**
```bash
# Wait for v0.5.2-beta.22 release, or
# Use regular Tailwind utilities for now
@apply bg-blue-500 text-white rounded;
```

### "Cannot find module '@nexcraft/forge/button'"

**Diagnosis:** You're using v0.5.2-beta.21 or earlier.

**Solution:**
```bash
# Use integration imports instead
import { ForgeButton } from '@nexcraft/forge/integrations/react';
```

## Checking Your Version Features

**Runtime Feature Detection:**
```typescript
// Check if RHF integration is available
try {
  const rhfModule = await import('@nexcraft/forge/integrations/rhf');
  console.log('RHF integration available:', !!rhfModule.RHFForgeInput);
} catch {
  console.log('RHF integration not available in this version');
}

// Check if Tailwind plugin is available  
try {
  const pluginModule = await import('@nexcraft/forge/plugin');
  console.log('Tailwind plugin available:', !!pluginModule.default);
} catch {
  console.log('Tailwind plugin not available in this version');
}

// Check if selective imports are available
try {
  const buttonModule = await import('@nexcraft/forge/button');
  console.log('Selective imports available:', !!buttonModule.ForgeButton);
} catch {
  console.log('Selective imports not available in this version');
}
```

## Recommendation

For **new projects**, use the latest beta version to access all features:

```bash
npm install @nexcraft/forge@beta
```

For **production projects**, use the stable version and migrate gradually:

```bash
npm install @nexcraft/forge@latest
```

## Support Matrix

| Feature | v0.5.2 | v0.5.2-beta.21 | v0.5.2-beta.22+ |
|---------|--------|----------------|------------------|
| Core Components | ✅ | ✅ | ✅ |
| React Integration | ✅ | ✅ | ✅ |
| Vue Integration | ✅ | ✅ | ✅ |
| Angular Integration | ✅ | ✅ | ✅ |
| RHF Adapters | ❌ | ✅ | ✅ |
| Tailwind Plugin | ❌ | ❌ | ✅ |
| Selective Imports | ❌ | ❌ | ✅ |
| AI Metadata | ✅ | ✅ | ✅ |
| Performance Monitoring | ✅ | ✅ | ✅ |