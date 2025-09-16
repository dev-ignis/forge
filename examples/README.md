# Forge UI Examples

Live examples demonstrating @nexcraft/forge components in different frameworks and environments.

## 🌐 Live Demos

Visit **[https://dev-ignis.github.io/forge/examples/](https://dev-ignis.github.io/forge/examples/)** to see all examples running live.

## 📁 Available Examples

### ✅ Next.js Example
**Location**: `./nextjs-app/`  
**Live Demo**: [https://dev-ignis.github.io/forge/examples/nextjs/](https://dev-ignis.github.io/forge/examples/nextjs/)  

Complete Next.js 15 application showcasing:
- Server-side rendering with Forge components
- React Hook Form integration
- Tailwind CSS styling
- TypeScript support
- AI-native development patterns

**Features demonstrated**:
- Form validation with ForgeInput and ForgeSelect
- Component composition with ForgeCard and ForgeModal
- Theme switching with ForgeSwitch
- Data display with ForgeAlert and ForgeBadge
- React Hook Form adapters from `@nexcraft/forge-rhf`

### 🚧 Planned Examples

#### React Example (Coming Soon)
**Location**: `./react-app/` (planned)

Pure React application showing:
- Vite + React setup
- Component integration
- State management patterns
- Custom hooks usage

#### Vue Example (Coming Soon)  
**Location**: `./vue-app/` (planned)

Vue.js application demonstrating:
- Vue 3 Composition API
- Web Components integration
- Reactive data binding
- Vue-specific patterns

#### Vanilla JavaScript Example (Coming Soon)
**Location**: `./vanilla-js/` (planned)

Plain JavaScript implementation featuring:
- No framework dependencies  
- Web Components direct usage
- Progressive enhancement
- Performance optimizations

## 🚀 Running Examples Locally

### Next.js Example

```bash
# Install dependencies
cd examples/nextjs-app
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm run export  # For static export
```

### General Setup

```bash
# Install main package dependencies (from repo root)
npm install
npm run build

# Examples use the local build
cd examples/[example-name]
npm install
npm run dev
```

## 📖 Documentation

Each example includes:
- **README.md** - Setup and usage instructions
- **Inline comments** - Code explanations and best practices  
- **TypeScript types** - Full type safety examples
- **Testing examples** - Component testing patterns

## 🎯 Use Cases

These examples demonstrate:

### Form Handling
- React Hook Form integration
- Validation patterns
- Error handling
- Accessibility features

### Component Composition
- Building complex UIs
- State management
- Event handling
- Performance optimization

### Framework Integration
- SSR considerations
- Hydration patterns
- Bundle optimization
- Development experience

### AI-Native Development
- AI metadata usage
- Component state explanation
- Action suggestions
- Performance monitoring

## 🔗 Related Resources

- **[Main Documentation](../docs/)** - Complete component guides
- **[Storybook](https://dev-ignis.github.io/forge/storybook/)** - Interactive component showcase
- **[AI Component Catalog](../docs/AI_COMPONENT_CATALOG.md)** - AI-specific features
- **[Integration Guides](../docs/guides/)** - Framework-specific guides

## 🤝 Contributing

Found an issue or want to add an example?

1. **Bug Reports**: [GitHub Issues](https://github.com/dev-ignis/forge/issues)
2. **Feature Requests**: Use GitHub Issues with "enhancement" label  
3. **New Examples**: Create PR with new example in appropriate directory
4. **Improvements**: PR welcome for existing examples

### Adding a New Example

1. Create directory: `examples/[framework-name]/`
2. Add `package.json` with appropriate scripts
3. Include `README.md` with setup instructions
4. Update this main README.md
5. Add to GitHub Pages workflow if needed

## 📄 License

All examples are MIT licensed, same as the main @nexcraft/forge package.