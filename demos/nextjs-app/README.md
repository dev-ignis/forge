# Next.js 15 + Forge React Example

**Demonstration of @nexcraft/forge-react v1.0.4+ with Next.js 15 App Router**

This example application demonstrates how to use [@nexcraft/forge-react](https://www.npmjs.com/package/@nexcraft/forge-react) components in a Next.js 15 application with automatic 'use client' directives, SSR fallback rendering, and React Hook Form integration.

## 🎯 What This Demonstrates

✅ **Automatic 'use client' directive** - No manual directives needed (v1.0.4+)
✅ **SSR fallback rendering** - Components render as semantic HTML during SSR
✅ **Fallback CSS styling** - Styled components during SSR (no FOUC)
✅ **Proper hydration** - Components upgrade to web components after load
✅ **React Hook Form integration** - Form validation with Forge components
✅ **Server + Client Components** - Mixed rendering strategies
✅ **TypeScript Compatibility** - Full type safety and intellisense
✅ **Production Ready** - Real-world usage patterns and best practices

## 🚀 Quick Start

### From the Forge root directory:
```bash
# Install example app dependencies
npm run example:install

# Start development server
npm run example:dev

# Build for production (builds Forge + example)
npm run example:build

# Test production build
npm run example:start
```

### Or directly in the example directory:
```bash
cd examples/nextjs-app

# Install dependencies
npm install

# Start development server  
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the example app.

## 📁 Example Pages

### 🖥️ [SSR Demo](http://localhost:3000/ssr-demo)
- **Purpose**: Validates server-side rendering compatibility
- **Key Features**:
  - No 'use client' directive - pure SSR
  - Semantic HTML fallbacks (view page source)
  - Progressive enhancement to web components
  - Proper hydration without mismatches

### 📝 [React Hook Form Demo](http://localhost:3000/forms-demo)
- **Purpose**: Demonstrates form integration solutions
- **Key Features**:
  - `{...register('field')}` spread syntax ✅
  - `useForgeReactHookForm` hook ✅
  - Full validation and error handling
  - Live form state monitoring
  - TypeScript type safety

### 🧩 [Component Showcase](http://localhost:3000/components)
- **Purpose**: Interactive component gallery
- **Key Features**:
  - All Forge components in action
  - Event handling demonstrations
  - Theme switching examples
  - Accessibility testing

### ⚡ [Performance Test](http://localhost:3000/performance)
- **Purpose**: Load testing and performance validation
- **Key Features**:
  - Large-scale component rendering
  - Memory usage profiling
  - Bundle size analysis
  - Interaction performance metrics

## 🔧 Technical Implementation

### Package Dependencies
```json
{
  "@nexcraft/forge": "file:../../",
  "next": "15.5.3", 
  "react": "19.1.0",
  "react-hook-form": "^7.62.0"
}
```

### Key Configuration Files

- **`next.config.js`** - Transpiles @nexcraft/forge package
- **`tsconfig.json`** - TypeScript configuration with proper paths
- **`tailwind.config.ts`** - Styling configuration

### Integration Patterns

#### ✅ React Hook Form (RECOMMENDED)
```tsx
import { useForm } from 'react-hook-form';
import { ForgeInput } from '@nexcraft/forge/integrations/react';

const { register } = useForm();

// Direct spread - now works without type errors
<ForgeInput {...register('email')} />
```

#### ✅ useForgeReactHookForm Hook
```tsx
import { useForgeReactHookForm } from '@nexcraft/forge/integrations/react';

const emailProps = useForgeReactHookForm('email', control);
<ForgeInput {...emailProps} />
```

#### ✅ Direct Usage
```tsx
<ForgeInput 
  value={value}
  onChange={(value, event) => setValue(value)} // Forge signature
/>
```

## 🐛 Testing & Validation

### Automated Tests
```bash
# Run integration tests
npm run test:integration

# Lint and type check
npm run lint
```

### Manual Testing Checklist

**SSR Validation:**
- [ ] View page source shows semantic HTML
- [ ] Components work without JavaScript
- [ ] Progressive enhancement after JS loads
- [ ] No hydration mismatches in console

**React Hook Form:**
- [ ] `{...register()}` works without TypeScript errors
- [ ] Form validation displays properly
- [ ] `useForgeReactHookForm` hook functions correctly
- [ ] Both onChange signatures work

**Performance:**
- [ ] Large lists render smoothly
- [ ] No memory leaks in component creation/destruction
- [ ] Bundle size is reasonable
- [ ] Time to interactive is acceptable

## 🚨 Known Issues & Solutions

### Module Resolution
If you encounter module resolution issues with the file reference, install a published version:
```bash
npm uninstall @nexcraft/forge
npm install @nexcraft/forge@latest
```

### TypeScript Errors
Ensure you have the latest TypeScript definitions:
```bash
npm install @types/react@latest @types/react-dom@latest
```

## 📚 Related Documentation

- [Forge Component Docs](../../docs/components/)
- [React Integration Guide](../../docs/integrations/react.md)
- [SSR Architecture](../../docs/integrations/ssr.md)
- [Form Integration](../../docs/integrations/forms.md)

## 🤝 Contributing

This example app serves as both documentation and testing. When adding new features:

1. **Update Examples** - Add usage patterns to relevant demo pages
2. **Test Integration** - Verify examples work in both dev and production
3. **Document Patterns** - Update README with new integration approaches
4. **Validate Types** - Ensure TypeScript compatibility

## 📞 Support

Issues with the example app? Please report them:
- [GitHub Issues](https://github.com/dev-ignis/forge/issues)
- Include example app version and browser details
- Provide steps to reproduce any issues

## 🤖 New in v0.7.1: AI-Native Features

This example now includes a new **AI Demo** page (`/ai-demo`) showcasing:
- AI manifest and discovery system
- Function-calling specifications for AI tools  
- Real-time component state analysis
- AI-powered action suggestions

Visit [http://localhost:9091/ai-demo](http://localhost:9091/ai-demo) to explore the AI-native capabilities!