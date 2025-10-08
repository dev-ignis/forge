# 🤖 AI-Native Forge Components - Vue 3 Demo

A comprehensive Vue 3 demonstration of the @nexcraft/forge AI-native component library, showcasing real AI manifest integration, performance monitoring, and interactive component features.

## ✨ Features

### 🧠 AI-Native Intelligence
- **Real AI Manifest Integration**: Uses actual component metadata from `ai-index.json` and `ai-manifest.json`
- **Component Discovery**: Browse 31+ available components with real-time information
- **AI State Explanation**: Dynamic component state analysis and recommendations
- **Performance Monitoring**: Real-time metrics and optimization insights

### 🎨 Interactive Components
- **Smart Forms**: Input, select, and checkbox components with AI-powered validation
- **UI Components**: Alerts, buttons, modals with full event handling
- **Component Library**: Visual showcase of all available Forge components
- **Live Console**: Real-time debugging and AI state monitoring

### 🚀 Vue 3 Integration
- **Composition API**: Modern Vue 3 patterns with reactive state management
- **TypeScript Support**: Full type safety and IntelliSense
- **Custom Elements**: Seamless web component integration
- **Responsive Design**: Mobile-first approach with beautiful gradients

## 🛠️ Technical Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development and building
- **@nexcraft/forge** AI-native component library
- **CSS Grid & Flexbox** for responsive layouts

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Available Components

The demo showcases 31+ AI-native components including:

### Atoms
- `forge-button` - Interactive buttons with AI state
- `forge-input` - Smart form inputs with validation
- `forge-card` - Content containers with AI metadata
- `forge-alert` - Notification components
- `forge-badge` - Status indicators
- `forge-checkbox` - Form controls
- `forge-select` - Dropdown selections
- `forge-modal` - Dialog components
- `forge-progress` - Progress indicators
- `forge-skeleton` - Loading placeholders

### Advanced Components
- `forge-data-table` - Data visualization
- `forge-navigation-bar` - Navigation components
- `forge-accordion` - Collapsible content
- `forge-tabs` - Tabbed interfaces
- `forge-tree-view` - Hierarchical data
- `forge-performance-dashboard` - Performance monitoring

## 🧠 AI Features Demonstrated

### Component Intelligence
```javascript
// Real AI manifest integration
const aiIndex = instance?.appContext.config.globalProperties.$aiIndex
console.log(`Found ${aiIndex.summary.totalComponents} components`)

// Component discovery
const components = aiIndex.components.map(c => ({
  tag: c.tag,
  category: c.category,
  hasAiMethods: c.hasAiMethods
}))
```

### Performance Monitoring
- Real-time render time tracking
- Memory usage monitoring
- Component count analysis
- AI method availability detection

### State Management
- Reactive form state with AI validation
- Component interaction tracking
- Live console output
- Theme switching with persistence

## 🎯 Key Improvements Made

### 1. Real AI Manifest Integration
- ✅ Imports actual `ai-index.json` and `ai-manifest.json`
- ✅ Displays real component metadata (31 components)
- ✅ Shows actual AI method availability
- ✅ Real-time component discovery

### 2. Enhanced UI Components
- ✅ Added component library showcase
- ✅ Improved status bar with component count
- ✅ Better console controls (refresh, clear)
- ✅ Enhanced responsive design

### 3. Better Performance Monitoring
- ✅ Real performance metrics integration
- ✅ AI method availability detection
- ✅ Component count from manifest
- ✅ Memory usage simulation

### 4. Improved User Experience
- ✅ Component library toggle
- ✅ Better error handling
- ✅ Enhanced console output
- ✅ More interactive elements

## 🔧 Configuration

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // Treat all tags with a dash as custom elements
        isCustomElement: (tag) => tag.includes('-')
      }
    }
  })],
  optimizeDeps: {
    exclude: ['@nexcraft/forge'],
    esbuildOptions: {
      target: 'es2020'
    }
  }
})
```

### AI Manifest Integration
```typescript
// main.ts
import aiIndex from '@nexcraft/forge/ai-index.json'
import aiManifest from '@nexcraft/forge/ai-manifest.json'

app.config.globalProperties.$aiIndex = aiIndex
app.config.globalProperties.$aiManifest = aiManifest
```

## 🎨 Styling

The demo features a modern design with:
- **Gradient backgrounds** with glassmorphism effects
- **Responsive grid layouts** for all screen sizes
- **Interactive animations** and hover effects
- **Dark/light theme support** with smooth transitions
- **Monospace console** styling for technical feel

## 🚀 Future Enhancements

- [ ] Real AI method implementation (when available in package)
- [ ] Component testing playground
- [ ] Performance benchmarking tools
- [ ] Theme customization interface
- [ ] Component code generation
- [ ] Accessibility testing tools

## 📊 Performance

- **Bundle Size**: Optimized with tree-shaking
- **Load Time**: Fast initial render with lazy loading
- **Memory Usage**: Efficient component lifecycle management
- **Responsiveness**: 60fps animations and interactions

## 🤝 Contributing

This demo serves as both a showcase and testing ground for the Forge component library. Contributions are welcome for:

- Additional component demonstrations
- Performance optimizations
- Accessibility improvements
- New AI feature implementations

## 📄 License

MIT License - see the main Forge repository for details.