# Token Bridge Migration Guide

Step-by-step guide for migrating from existing token systems to @nexcraft/forge Token Bridge.

## 🎯 Migration Overview

### What You'll Gain
- ✅ **Single Source of Truth**: All tokens in one unified system
- ✅ **Automatic Sync**: Design system changes flow automatically to code
- ✅ **Type Safety**: Full TypeScript support with intelligent autocomplete
- ✅ **Multi-Format Output**: CSS, Sass, JavaScript, and JSON exports
- ✅ **Performance**: Built-in caching and optimized conversions
- ✅ **Future-Proof**: Framework-agnostic token management

### Migration Time Estimates
- **From CSS Variables**: 2-4 hours
- **From Sass Variables**: 3-5 hours  
- **From CSS-in-JS**: 4-6 hours
- **From Design Token Tools**: 1-3 hours

---

## 🚀 Migration Paths

### Path 1: From Manual CSS Variables

**Before:**
```css
/* styles/tokens.css */
:root {
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
  --success-color: #10b981;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}
```

**After:**
```javascript
// tokens/figma.js
export const figmaTokens = {
  'Brand/Primary/500': {
    value: '#3b82f6',
    type: 'color',
    description: 'Primary brand color'
  },
  'Brand/Primary/600': {
    value: '#2563eb', 
    type: 'color',
    description: 'Primary hover state'
  },
  'Semantic/Success': {
    value: '#10b981',
    type: 'color',
    description: 'Success state color'
  },
  'Layout/Spacing/Small': {
    value: '8px',
    type: 'dimension',
    description: 'Small spacing'
  }
};

// styles/tokens.js
import { TokenBridge } from '@nexcraft/forge/utils';
import { figmaTokens } from '../tokens/figma.js';

const bridge = TokenBridge.fromFigma(figmaTokens);
const css = bridge.toCSSProperties();

// Inject into app
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(css);
document.adoptedStyleSheets = [styleSheet];
```

**Migration Steps:**

1. **Audit Existing Variables**
   ```bash
   # Find all CSS custom properties
   grep -r "--" src/ --include="*.css" > css-variables.txt
   ```

2. **Convert to Figma Token Format**
   ```javascript
   // Create conversion script
   const cssVariables = {
     '--primary-color': '#3b82f6',
     '--primary-hover': '#2563eb'
   };
   
   const figmaTokens = {};
   Object.entries(cssVariables).forEach(([name, value]) => {
     const cleanName = name.replace('--', '').replace('-', '/');
     figmaTokens[`Brand/${cleanName}`] = {
       value,
       type: 'color'
     };
   });
   ```

3. **Replace CSS Import**
   ```html
   <!-- Before -->
   <link rel="stylesheet" href="tokens.css">
   
   <!-- After -->
   <script type="module">
     import { TokenBridge } from '@nexcraft/forge/utils';
     import { figmaTokens } from './tokens/figma.js';
     
     const bridge = TokenBridge.fromFigma(figmaTokens);
     const css = bridge.toCSSProperties();
     
     const styleSheet = new CSSStyleSheet();
     styleSheet.replaceSync(css);
     document.adoptedStyleSheets = [styleSheet];
   </script>
   ```

4. **Update Component Usage**
   ```css
   /* Variables remain the same! */
   .button {
     background: var(--forge-brand-primary-500);
     color: var(--forge-brand-primary-600);
   }
   ```

---

### Path 2: From Sass Variables

**Before:**
```scss
// tokens/_variables.scss
$primary-blue: #3b82f6;
$primary-blue-dark: #2563eb;
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;

// components/_button.scss
@import '../tokens/variables';

.button {
  background: $primary-blue;
  padding: $spacing-sm $spacing-md;
  
  &:hover {
    background: $primary-blue-dark;
  }
}
```

**After:**
```javascript
// build-tokens.js
import { TokenBridge } from '@nexcraft/forge/utils';
import fs from 'fs';

const tailwindConfig = {
  theme: {
    colors: {
      blue: {
        500: '#3b82f6',
        600: '#2563eb'
      }
    },
    spacing: {
      '1': '0.25rem',
      '2': '0.5rem', 
      '4': '1rem'
    }
  }
};

const bridge = TokenBridge.fromTailwind(tailwindConfig);
const sass = bridge.toSassVariables();

fs.writeFileSync('src/tokens/_generated.scss', sass);
```

```scss
// Generated: src/tokens/_generated.scss
$forge-blue-500: #3b82f6;
$forge-blue-600: #2563eb;
$forge-spacing-1: 0.25rem;
$forge-spacing-2: 0.5rem;
$forge-spacing-4: 1rem;

// components/_button.scss
@import '../tokens/generated';

.button {
  background: $forge-blue-500;
  padding: $forge-spacing-2 $forge-spacing-4;
  
  &:hover {
    background: $forge-blue-600;
  }
}
```

**Migration Steps:**

1. **Extract Sass Variables**
   ```bash
   # Find all Sass variables
   grep -r "\$" src/ --include="*.scss" > sass-variables.txt
   ```

2. **Convert to Tailwind Config**
   ```javascript
   // scripts/migrate-sass.js
   const sassVariables = {
     '$primary-blue': '#3b82f6',
     '$spacing-sm': '0.5rem'
   };
   
   const tailwindTheme = { colors: {}, spacing: {} };
   
   Object.entries(sassVariables).forEach(([name, value]) => {
     if (name.includes('color') || name.includes('blue')) {
       tailwindTheme.colors[name.replace('$', '')] = value;
     } else if (name.includes('spacing')) {
       tailwindTheme.spacing[name.replace('$spacing-', '')] = value;
     }
   });
   ```

3. **Set Up Build Process**
   ```json
   // package.json
   {
     "scripts": {
       "build:tokens": "node build-tokens.js",
       "build": "npm run build:tokens && sass src:dist"
     }
   }
   ```

4. **Update Imports**
   ```scss
   // Before
   @import '../tokens/variables';
   
   // After  
   @import '../tokens/generated';
   ```

---

### Path 3: From CSS-in-JS (React/styled-components)

**Before:**
```javascript
// theme.js
export const theme = {
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    success: '#10b981'
  },
  spacing: {
    xs: '4px',
    sm: '8px', 
    md: '16px',
    lg: '24px'
  }
};

// Button.js
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
  }
`;
```

**After:**
```javascript
// tokens/design-system.js
const designTokens = {
  'Brand/Primary': {
    value: '#3b82f6',
    type: 'color'
  },
  'Brand/Primary/Hover': {
    value: '#2563eb',
    type: 'color'
  },
  'Semantic/Success': {
    value: '#10b981', 
    type: 'color'
  },
  'Layout/Spacing/XS': {
    value: '4px',
    type: 'dimension'
  }
};

// theme.js
import { TokenBridge } from '@nexcraft/forge/utils';
import { designTokens } from './tokens/design-system.js';

const bridge = TokenBridge.fromFigma(designTokens);
export const theme = bridge.toJSObject();

// CSS approach
const css = bridge.toCSSProperties();
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(css);
document.adoptedStyleSheets = [styleSheet];

// Button.js - Using CSS variables instead
const Button = styled.button`
  background: var(--forge-brand-primary);
  padding: var(--forge-layout-spacing-xs) var(--forge-layout-spacing-md);
  
  &:hover {
    background: var(--forge-brand-primary-hover);
  }
`;
```

**Migration Steps:**

1. **Extract JS Theme Objects**
   ```javascript
   // scripts/extract-theme.js
   const fs = require('fs');
   const path = require('path');
   
   // Parse existing theme files and extract values
   const themeContent = fs.readFileSync('src/theme.js', 'utf8');
   // Convert to Figma token format
   ```

2. **Create Token Bridge Setup**
   ```javascript
   // src/tokens/index.js
   import { TokenBridge } from '@nexcraft/forge/utils';
   import { designTokens } from './design-system.js';
   
   const bridge = TokenBridge.fromFigma(designTokens);
   
   // Export both formats for gradual migration
   export const cssTokens = bridge.toCSSProperties();
   export const jsTokens = bridge.toJSObject();
   export const theme = jsTokens; // Drop-in replacement
   ```

3. **Gradual Migration Strategy**
   ```javascript
   // Phase 1: Drop-in replacement
   import { theme } from './tokens';
   // Use existing theme structure
   
   // Phase 2: Move to CSS variables
   import { cssTokens } from './tokens';
   // Inject CSS and use var() syntax
   
   // Phase 3: Native web components
   // Use forge components directly
   ```

---

### Path 4: From Design Token Tools (Style Dictionary, Theo)

**Before Style Dictionary:**
```json
// tokens.json
{
  "color": {
    "brand": {
      "primary": { "value": "#3b82f6" },
      "secondary": { "value": "#6b7280" }
    }
  },
  "size": {
    "spacing": {
      "small": { "value": "8px" },
      "medium": { "value": "16px" }
    }
  }
}
```

```javascript
// build.js (Style Dictionary)
const StyleDictionary = require('style-dictionary').extend({
  source: ['tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
      }]
    }
  }
});

StyleDictionary.buildAllPlatforms();
```

**After Token Bridge:**
```javascript
// tokens/design-system.js - Direct token definition
export const designSystemTokens = {
  'Brand/Primary': {
    value: '#3b82f6',
    type: 'color',
    category: 'brand'
  },
  'Brand/Secondary': {
    value: '#6b7280', 
    type: 'color',
    category: 'brand'
  },
  'Layout/Spacing/Small': {
    value: '8px',
    type: 'dimension',
    category: 'spacing'
  }
};

// build-tokens.js - Simpler build process
import { TokenBridge } from '@nexcraft/forge/utils';
import { designSystemTokens } from './tokens/design-system.js';
import fs from 'fs';

const bridge = TokenBridge.fromFigma(designSystemTokens);

// Generate all formats
fs.writeFileSync('dist/variables.css', bridge.toCSSProperties());
fs.writeFileSync('dist/variables.scss', bridge.toSassVariables());
fs.writeFileSync('dist/tokens.js', `export default ${JSON.stringify(bridge.toJSObject())};`);
fs.writeFileSync('dist/tokens.json', JSON.stringify(bridge.toJSON(), null, 2));
```

**Migration Benefits:**
- ✅ **Simpler Configuration**: No complex build configs
- ✅ **Better Performance**: Built-in caching and optimization
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Runtime Usage**: Use tokens in browser and Node.js
- ✅ **Multi-Source**: Combine tokens from multiple design systems

---

## 🔄 Advanced Migration Scenarios

### Migrating Large Codebases

1. **Gradual Migration Strategy**
   ```javascript
   // Phase 1: Parallel systems
   import { legacyTheme } from './old-theme';
   import { TokenBridge } from '@nexcraft/forge/utils';
   
   const bridge = TokenBridge.fromFigma(newTokens);
   const newTheme = bridge.toJSObject();
   
   // Merge for compatibility
   const theme = { ...legacyTheme, ...newTheme };
   ```

2. **Component-by-Component Migration**
   ```javascript
   // utils/theme-migration.js
   export const useTokens = (component) => {
     const isNewComponent = NEW_COMPONENTS.includes(component);
     return isNewComponent ? newTokens : legacyTokens;
   };
   ```

3. **Automated Token Replacement**
   ```bash
   # Replace old CSS variables with new ones
   find src/ -name "*.css" -exec sed -i 's/--primary-color/--forge-brand-primary-500/g' {} \;
   ```

### Migrating Multi-Brand Systems

```javascript
// tokens/brands/brand-a.js
export const brandATokens = {
  'Brand/Primary': { value: '#3b82f6', type: 'color' }
};

// tokens/brands/brand-b.js
export const brandBTokens = {
  'Brand/Primary': { value: '#dc2626', type: 'color' }
};

// tokens/index.js
import { TokenBridge } from '@nexcraft/forge/utils';

export const createBrandTheme = (brandTokens) => {
  const bridge = TokenBridge.fromFigma(brandTokens);
  return {
    css: bridge.toCSSProperties(),
    js: bridge.toJSObject(),
    sass: bridge.toSassVariables()
  };
};

// Dynamic brand switching
const currentBrand = getCurrentBrand();
const theme = createBrandTheme(
  currentBrand === 'a' ? brandATokens : brandBTokens
);
```

### Migrating Design System Teams

1. **Design Handoff Process**
   ```javascript
   // designers export tokens directly to JSON
   const figmaExport = await fetchFigmaTokens();
   const bridge = TokenBridge.fromFigma(figmaExport);
   
   // Automatic PR creation
   await createPullRequest({
     title: 'Update design tokens',
     files: {
       'src/tokens.css': bridge.toCSSProperties()
     }
   });
   ```

2. **Continuous Integration**
   ```yaml
   # .github/workflows/tokens.yml
   name: Sync Design Tokens
   on:
     schedule:
       - cron: '0 */6 * * *'  # Every 6 hours
   
   jobs:
     sync-tokens:
       steps:
         - name: Fetch Figma tokens
           run: curl -H "X-Figma-Token: $TOKEN" $FIGMA_URL > tokens.json
         
         - name: Generate CSS
           run: node build-tokens.js
         
         - name: Create PR
           uses: peter-evans/create-pull-request@v4
   ```

---

## ✅ Migration Checklist

### Pre-Migration
- [ ] **Audit existing tokens** - Document all current design tokens
- [ ] **Choose migration strategy** - Gradual vs. complete migration
- [ ] **Set up development environment** - Install @nexcraft/forge
- [ ] **Create token inventory** - Map old tokens to new structure

### During Migration  
- [ ] **Convert token format** - Transform to Figma/Tailwind/Material format
- [ ] **Set up Token Bridge** - Configure bridge with your tokens
- [ ] **Generate outputs** - Create CSS, Sass, JS, and JSON files
- [ ] **Update imports** - Replace old token imports with new ones
- [ ] **Test components** - Verify all components use new tokens correctly

### Post-Migration
- [ ] **Remove old system** - Clean up legacy token files
- [ ] **Update documentation** - Document new token usage
- [ ] **Set up CI/CD** - Automate token generation in build process
- [ ] **Train team** - Educate team on new token system
- [ ] **Monitor performance** - Verify no performance regressions

### Validation
- [ ] **Visual regression testing** - Ensure UI looks identical
- [ ] **Bundle size analysis** - Confirm no size increases
- [ ] **Performance benchmarks** - Verify render times remain fast
- [ ] **Cross-browser testing** - Test in all supported browsers

---

## 🛟 Troubleshooting

### Common Migration Issues

#### Issue: Token Names Don't Match
```javascript
// Problem: Old variables don't map to new names
// --primary-color vs --forge-brand-primary-500

// Solution: Create mapping utility
const tokenMapper = {
  '--primary-color': '--forge-brand-primary-500',
  '--spacing-sm': '--forge-layout-spacing-small'
};

const mapLegacyToken = (oldName) => tokenMapper[oldName] || oldName;
```

#### Issue: Colors Look Different
```javascript
// Problem: Color space conversion differences

// Solution: Validate color conversion
import { ColorConverter } from '@nexcraft/forge/utils';

const oldColor = '#3b82f6';
const rgb = ColorConverter.hexToRgb(oldColor);
console.log('Converted RGB:', rgb); // Verify matches expectations
```

#### Issue: Performance Regression
```javascript
// Problem: Token generation is slow

// Solution: Use caching and lazy loading
const bridge = TokenBridge.fromFigma(tokens);
const css = bridge.toCSSProperties(); // Cached automatically

// Pre-generate tokens at build time
const preGeneratedCSS = fs.readFileSync('dist/tokens.css', 'utf8');
```

### Getting Help

1. **Check Documentation**
   - [Token Bridge Guide](./token-bridge-guide.md)
   - [Token Bridge API](./token-bridge-api.md)

2. **Common Patterns**
   - See [examples directory](../../examples/) for migration examples
   - Check test files for usage patterns

3. **Community Support**
   - Create GitHub issue with migration questions
   - Include before/after code snippets

---

## 🎯 Success Metrics

Track these metrics to measure migration success:

### Technical Metrics
- **Token Consistency**: 100% design system compliance
- **Build Time**: Token generation time
- **Bundle Size**: CSS file size comparison
- **Performance**: Component render time

### Team Metrics  
- **Design-to-Code Time**: Time from design to implementation
- **Bug Reports**: Design inconsistency issues
- **Developer Satisfaction**: Survey team on new system
- **Maintenance Overhead**: Time spent on token management

### Business Metrics
- **Feature Velocity**: Speed of new feature development
- **Brand Consistency**: Visual consistency across products
- **Design System Adoption**: Usage across teams
- **Technical Debt**: Reduction in token-related issues

---

*This migration guide provides step-by-step instructions for moving from any existing token system to @nexcraft/forge Token Bridge. The gradual migration approach ensures zero downtime and minimal risk.*