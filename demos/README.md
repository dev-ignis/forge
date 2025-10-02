# Forge UI Demos

Production-quality applications showcasing @nexcraft/forge components in real-world scenarios across different frameworks.

## 🌐 Live Demos

**Explore interactive demos**: [https://dev-ignis.github.io/forge/demos/](https://dev-ignis.github.io/forge/demos/)

## 🎯 Available Demos

### ✅ Next.js Demo
**Live**: [https://dev-ignis.github.io/forge/demos/nextjs/](https://dev-ignis.github.io/forge/demos/nextjs/)
**Source**: [`./nextjs-app/`](./nextjs-app/)

Full-featured Next.js 15 application demonstrating enterprise-grade patterns:
- **Server-Side Rendering** with web components
- **React Hook Form** integration for complex forms
- **Tailwind CSS** theming and customization
- **TypeScript** strict mode with full type safety
- **AI-native components** with runtime introspection

**Highlighted features**:
- Multi-step form wizard with validation
- Dynamic theme switching
- Responsive layouts and mobile optimization
- Accessible component patterns (WCAG 2.1 AA)
- Performance monitoring integration

### 🚧 Vue Demo (In Progress)
**Source**: [`./vue-app/`](./vue-app/)

Vue 3 Composition API application showcasing:
- Web Components integration with Vue
- Reactive data binding patterns
- Vite build optimization
- Framework-agnostic component usage

### 🚧 Vanilla JavaScript Demo (In Progress)
**Source**: [`./vanilla-app/`](./vanilla-app/)

Zero-dependency implementation featuring:
- Direct Web Components API usage
- Progressive enhancement patterns
- Lightweight bundle size (<50KB)
- Browser-native features only

## 🚀 Running Demos Locally

### Next.js Demo

```bash
cd demos/nextjs-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### General Setup

```bash
# From repository root
npm install
npm run build

# Navigate to any demo
cd demos/[demo-name]
npm install
npm run dev
```

## 🎨 What These Demos Showcase

### Real-World Patterns
- Complex form validation and state management
- Enterprise component composition
- Theme customization and design tokens
- Responsive design across devices
- Production build optimization

### Framework Integration
- SSR/SSG with Next.js
- Client-side rendering with Vue
- Framework-free vanilla JavaScript
- Hybrid rendering strategies

### Advanced Features
- AI-powered component introspection
- Performance budget monitoring
- Accessibility compliance
- Type-safe component APIs
- Custom design system integration

## 🔗 Additional Resources

- **[Component Documentation](../docs/components/)** - Complete API reference
- **[Storybook](https://dev-ignis.github.io/forge/storybook/)** - Interactive component explorer
- **[Integration Guides](../docs/integrations/)** - Framework-specific patterns
- **[AI Metadata Reference](../docs/ai/metadata-reference.md)** - AI integration details

## 🤝 Contributing

Want to add a demo or improve an existing one?

1. **Report Issues**: [GitHub Issues](https://github.com/dev-ignis/forge/issues)
2. **Suggest Demos**: Open an issue with "demo" label
3. **Submit PR**: Contributions welcome for all demos

### Adding a New Demo

1. Create directory: `demos/[framework-name]-app/`
2. Set up build tooling (Vite/Next.js/etc.)
3. Add `README.md` with setup instructions
4. Update this index README
5. Add deployment workflow (if applicable)

**Demo Requirements**:
- Production-ready code quality
- Responsive design
- Accessibility compliance
- TypeScript strict mode
- Comprehensive inline comments
- README with deployment instructions

## 📄 License

All demos are MIT licensed, matching the @nexcraft/forge package.
