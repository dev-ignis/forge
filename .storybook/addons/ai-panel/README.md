# 🤖 Storybook AI Panel Addon

**Industry-First**: The only component library with AI metadata visualization in Storybook!

## Overview

The AI Panel addon provides real-time introspection and monitoring of Forge component AI capabilities directly within Storybook. This showcases Forge's unique AI-native features and helps developers understand how components communicate with AI systems.

## Features

### ✅ Live Component Introspection
- **explainState()**: Real-time natural language explanations of component state
- **getPossibleActions()**: Available interactions with availability status
- **Auto-refresh**: Updates every 2 seconds for live monitoring

### 🧠 AI State Monitoring
- Display current `aiState` object with all AI metadata
- JSON visualization with syntax highlighting
- Real-time updates as component state changes

### ⚡ Performance Metrics
- Last render time with color-coded badges (Fast/OK/Slow)
- Total render count
- Performance budget indicators
- Visual warnings for slow renders (>16ms)

### 🎨 Beautiful UI
- Clean, professional interface using Storybook's design system
- Organized sections for different data types
- Color-coded status indicators
- Copy-friendly JSON output

## Usage

1. **Start Storybook**:
   ```bash
   npm run storybook
   ```

2. **Navigate to any component story** (e.g., Button, Input, Modal)

3. **Open the AI Metadata panel** in the addon panel area (bottom of Storybook UI)

4. **Interact with the component** and watch the panel update in real-time!

## What You'll See

### Component State
Natural language explanation of the current component state:
> "Button is enabled and primary variant. Not loading. Ready for click interaction."

### Possible Actions
List of actions the component can perform:
- ✅ **click** - Available - "Trigger button action"
- ❌ **submit** - Unavailable - "Not in a form context"

### AI State
Complete AI metadata object:
```json
{
  "variant": "primary",
  "disabled": false,
  "loading": false,
  "renderTime": 0.8
}
```

### Performance Metrics
- Last Render: **0.82ms** 🟢 Fast
- Render Count: **3**
- Total Time: **2.46ms**

## Technical Details

### Architecture
- **register.tsx**: Addon registration and panel setup
- **AIPanelContent.tsx**: Main panel UI component with live data fetching

### Data Collection
The addon inspects the canvas iframe and queries Forge components for:
- AI methods (explainState, getPossibleActions)
- AI state properties (aiState)
- Performance metrics (renderTime, renderCount)

### Auto-Refresh
Updates every 2 seconds to provide real-time monitoring of component state changes.

## Why This Matters

This addon demonstrates Forge's unique value proposition:
1. **AI-Native Components**: First library with built-in AI introspection
2. **Developer Experience**: Visual debugging of AI features
3. **Documentation**: Shows developers exactly how AI features work
4. **Competitive Advantage**: No other component library offers this

## Future Enhancements

- [ ] Export AI state as JSON
- [ ] Copy code examples for React/Vue/Angular
- [ ] Historical state tracking
- [ ] AI metadata comparison between components
- [ ] Integration with Storybook's Controls panel
