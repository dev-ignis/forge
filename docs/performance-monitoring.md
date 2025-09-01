# Performance Monitoring System

Comprehensive performance tracking and budget enforcement system built into Forge components.

## Overview

The Performance Monitoring System provides real-time tracking of component render performance, memory usage, and event handling efficiency. It includes budget enforcement, automatic degradation strategies, and detailed metrics collection for optimization.

## Key Features

- **Render Time Tracking**: Precise measurement using Performance API
- **Budget Enforcement**: Configurable performance budgets with violations tracking
- **Automatic Degradation**: Smart performance mode switching
- **Metrics Collection**: Comprehensive performance data gathering
- **Developer Tools**: Built-in debugging and profiling capabilities
- **AI Integration**: Performance metrics exposed through AI metadata system

## Core Architecture

### BaseElement Integration

All Forge components inherit performance monitoring through `BaseElement`:

```typescript
export abstract class BaseElement extends LitElement {
  // Performance monitoring properties
  @property({ type: Number, attribute: 'max-render-ms' }) maxRenderMs = 16;
  @property({ type: Boolean, attribute: 'warn-on-violation' }) warnOnViolation = false;
  @property({ type: String, attribute: 'performance-mode' }) 
    performanceMode: 'auto' | 'fast' | 'balanced' | 'quality' = 'auto';
  
  // Performance tracking
  protected renderTime = 0;
  protected renderCount = 0;
  private performanceStartTime = 0;
  
  constructor() {
    super();
    this.performanceStartTime = globalThis.performance.now();
  }
  
  protected render() {
    const startTime = performance.now();
    
    // Component rendering logic here
    const content = this.renderContent();
    
    this.checkPerformance(startTime);
    return content;
  }
  
  protected checkPerformance(startTime: number): void {
    const endTime = globalThis.performance.now();
    this.renderTime = endTime - startTime;
    this.renderCount++;

    if (this.renderTime > this.maxRenderMs) {
      this.handlePerformanceViolation();
    }

    if (this.devMode) {
      this.logPerformanceMetrics(endTime);
    }
  }
}
```

## Performance Budget System

### Budget Configuration

Components can be configured with performance budgets:

```html
<!-- Set 10ms render budget -->
<forge-card max-render-ms="10" warn-on-violation>
  Card content
</forge-card>

<!-- Enable automatic performance mode switching -->
<forge-dropdown performance-mode="auto" max-render-ms="8">
  <option value="1">Option 1</option>
</forge-dropdown>

<!-- Development mode with metrics logging -->
<forge-modal dev-mode show-metrics>
  Modal content
</forge-modal>
```

### Budget Enforcement

When performance budgets are exceeded:

```typescript
protected checkPerformance(startTime: number): void {
  const endTime = globalThis.performance.now();
  this.renderTime = endTime - startTime;
  this.renderCount++;

  if (this.renderTime > this.maxRenderMs) {
    const message = `${this.tagName} render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;
    
    // Warning system
    if (this.warnOnViolation) {
      console.warn(message, {
        component: this.tagName.toLowerCase(),
        renderTime: this.renderTime,
        maxRenderMs: this.maxRenderMs,
        renderCount: this.renderCount,
        performanceMode: this.performanceMode
      });
    }

    // Automatic degradation
    if (this.performanceMode === 'auto') {
      this.applyPerformanceDegradation();
    }

    // Emit performance violation event
    this.emit('performance-violation', {
      component: this.tagName.toLowerCase(),
      renderTime: this.renderTime,
      budget: this.maxRenderMs,
      violationCount: this.getViolationCount()
    });
  }
}
```

## Performance Modes

### Mode Types

Four performance modes provide different optimization strategies:

```typescript
type PerformanceMode = 'auto' | 'fast' | 'balanced' | 'quality';
```

#### Auto Mode
Automatically switches between modes based on performance:

```typescript
private applyPerformanceDegradation(): void {
  const violationCount = this.getViolationCount();
  
  if (violationCount > 5) {
    this.switchToFastMode();
  } else if (violationCount > 2) {
    this.switchToBalancedMode();
  }
}

private switchToFastMode(): void {
  // Disable animations
  this.style.setProperty('--forge-transition-duration', '0ms');
  
  // Reduce re-render frequency
  this.updateThrottled = true;
  
  // Simplify complex calculations
  this.useSimplifiedRendering = true;
  
  console.info(`${this.tagName}: Switched to fast mode due to performance constraints`);
}
```

#### Fast Mode
Optimized for speed with minimal features:

```html
<forge-dropdown performance-mode="fast">
  <!-- Disables animations, reduces visual effects -->
</forge-dropdown>
```

#### Balanced Mode
Good compromise between performance and features:

```html
<forge-card performance-mode="balanced">
  <!-- Moderate animations, essential features -->
</forge-card>
```

#### Quality Mode
Full features with best visual experience:

```html
<forge-modal performance-mode="quality">
  <!-- All animations, full feature set -->
</forge-modal>
```

## Metrics Collection

### Performance Metrics Interface

```typescript
interface AIPerformanceMetrics {
  renderTime: number;        // Last render time in milliseconds
  renderCount: number;       // Total number of renders
  memoryUsage?: number;      // Memory usage in bytes
  eventHandlingTime?: number; // Average event handling time
  violations: number;        // Number of budget violations
  mode: 'auto' | 'fast' | 'balanced' | 'quality';
}
```

### Metrics Implementation

```typescript
protected getPerformanceMetrics(): AIPerformanceMetrics {
  return {
    renderTime: this.renderTime,
    renderCount: this.renderCount,
    memoryUsage: this.getMemoryUsage(),
    eventHandlingTime: this.getAverageEventHandlingTime(),
    violations: this.getViolationCount(),
    mode: this.performanceMode
  };
}

private getMemoryUsage(): number | undefined {
  if ('memory' in performance) {
    return (performance as any).memory.usedJSHeapSize;
  }
  return undefined;
}

private getAverageEventHandlingTime(): number {
  if (this.eventTimings.length === 0) return 0;
  const total = this.eventTimings.reduce((sum, time) => sum + time, 0);
  return total / this.eventTimings.length;
}
```

## Event Performance Tracking

### Event Handler Monitoring

```typescript
protected trackEventPerformance<T extends Event>(
  handler: (event: T) => void,
  eventName: string
): (event: T) => void {
  return (event: T) => {
    const startTime = performance.now();
    
    handler(event);
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    this.recordEventTiming(eventName, duration);
    
    if (duration > this.maxEventHandlingMs) {
      console.warn(`Slow event handling: ${eventName} took ${duration.toFixed(2)}ms`);
    }
  };
}

// Usage in components
connectedCallback() {
  super.connectedCallback();
  
  this.addEventListener('click', 
    this.trackEventPerformance(this.handleClick, 'click')
  );
}
```

## Memory Monitoring

### Memory Usage Tracking

```typescript
private memoryObserver?: PerformanceObserver;

private setupMemoryMonitoring(): void {
  if (!('memory' in performance)) return;
  
  // Monitor memory usage periodically
  this.memoryCheckInterval = setInterval(() => {
    const memory = (performance as any).memory;
    const usage = memory.usedJSHeapSize;
    
    if (usage > this.maxMemoryUsage) {
      this.handleMemoryPressure(usage);
    }
    
    this.updateComponentState('memoryUsage', usage);
  }, 5000); // Check every 5 seconds
}

private handleMemoryPressure(usage: number): void {
  console.warn(`High memory usage detected: ${(usage / 1024 / 1024).toFixed(2)}MB`);
  
  // Automatic cleanup strategies
  this.cleanupUnusedData();
  this.compactInternalState();
  
  // Emit memory pressure event
  this.emit('memory-pressure', { 
    usage, 
    threshold: this.maxMemoryUsage,
    component: this.tagName.toLowerCase()
  });
}
```

## Real-time Monitoring

### Performance Dashboard Integration

```typescript
class PerformanceDashboard {
  private components: Map<string, BaseElement> = new Map();
  private metricsHistory: PerformanceMetricsHistory[] = [];
  
  registerComponent(component: BaseElement): void {
    this.components.set(component.tagName.toLowerCase(), component);
    
    // Listen for performance events
    component.addEventListener('performance-violation', (e) => {
      this.recordViolation(e.detail);
    });
    
    component.addEventListener('ai-state-change', (e) => {
      if (e.detail.key.startsWith('performance')) {
        this.updateMetrics(component);
      }
    });
  }
  
  getComponentMetrics(componentName: string): AIPerformanceMetrics | null {
    const component = this.components.get(componentName);
    return component?.aiState.performance || null;
  }
  
  getAllMetrics(): Record<string, AIPerformanceMetrics> {
    const metrics: Record<string, AIPerformanceMetrics> = {};
    
    this.components.forEach((component, name) => {
      const componentMetrics = component.aiState.performance;
      if (componentMetrics) {
        metrics[name] = componentMetrics;
      }
    });
    
    return metrics;
  }
  
  getSlowComponents(threshold: number = 16): string[] {
    return Array.from(this.components.entries())
      .filter(([, component]) => 
        (component.aiState.performance?.renderTime || 0) > threshold
      )
      .map(([name]) => name);
  }
}

// Global dashboard instance
export const performanceDashboard = new PerformanceDashboard();
```

## Developer Tools

### Performance Profiler

```typescript
class PerformanceProfiler {
  private profiles: Map<string, ProfileData> = new Map();
  
  startProfile(component: BaseElement): string {
    const profileId = this.generateProfileId();
    
    const profile: ProfileData = {
      id: profileId,
      component: component.tagName.toLowerCase(),
      startTime: performance.now(),
      renderTimes: [],
      eventTimes: [],
      memorySnapshots: []
    };
    
    this.profiles.set(profileId, profile);
    
    // Hook into component performance events
    this.hookComponentEvents(component, profileId);
    
    return profileId;
  }
  
  endProfile(profileId: string): ProfileReport {
    const profile = this.profiles.get(profileId);
    if (!profile) throw new Error('Profile not found');
    
    const endTime = performance.now();
    const duration = endTime - profile.startTime;
    
    return {
      duration,
      totalRenders: profile.renderTimes.length,
      averageRenderTime: this.average(profile.renderTimes),
      maxRenderTime: Math.max(...profile.renderTimes),
      minRenderTime: Math.min(...profile.renderTimes),
      eventPerformance: this.analyzeEventTimes(profile.eventTimes),
      memoryUsage: this.analyzeMemoryUsage(profile.memorySnapshots),
      recommendations: this.generateRecommendations(profile)
    };
  }
}
```

### Performance Analyzer

```typescript
class PerformanceAnalyzer {
  analyzeComponent(component: BaseElement): PerformanceAnalysis {
    const metrics = component.aiState.performance;
    const analysis: PerformanceAnalysis = {
      component: component.tagName.toLowerCase(),
      score: this.calculatePerformanceScore(metrics),
      issues: this.identifyIssues(metrics),
      recommendations: this.generateRecommendations(metrics),
      trends: this.analyzeTrends(component)
    };
    
    return analysis;
  }
  
  private calculatePerformanceScore(metrics?: AIPerformanceMetrics): number {
    if (!metrics) return 0;
    
    let score = 100;
    
    // Deduct points for slow renders
    if (metrics.renderTime > 16) {
      score -= Math.min(50, (metrics.renderTime - 16) * 2);
    }
    
    // Deduct points for violations
    score -= Math.min(30, metrics.violations * 5);
    
    // Consider render count efficiency
    const efficiency = metrics.renderTime / metrics.renderCount;
    if (efficiency > 2) {
      score -= Math.min(20, (efficiency - 2) * 5);
    }
    
    return Math.max(0, score);
  }
  
  private identifyIssues(metrics?: AIPerformanceMetrics): PerformanceIssue[] {
    if (!metrics) return [];
    
    const issues: PerformanceIssue[] = [];
    
    if (metrics.renderTime > 16) {
      issues.push({
        type: 'slow-render',
        severity: metrics.renderTime > 50 ? 'critical' : 'warning',
        description: `Render time ${metrics.renderTime.toFixed(2)}ms exceeds 16ms budget`,
        impact: 'May cause frame drops and poor user experience'
      });
    }
    
    if (metrics.violations > 5) {
      issues.push({
        type: 'frequent-violations',
        severity: 'warning',
        description: `${metrics.violations} performance budget violations`,
        impact: 'Consistent performance issues'
      });
    }
    
    return issues;
  }
}
```

## Integration Examples

### React Integration

```typescript
// React hook for Forge component performance monitoring
export function useForgePerformance(ref: RefObject<BaseElement>) {
  const [metrics, setMetrics] = useState<AIPerformanceMetrics | null>(null);
  
  useEffect(() => {
    const component = ref.current;
    if (!component) return;
    
    const updateMetrics = () => {
      setMetrics(component.aiState.performance || null);
    };
    
    // Listen for performance updates
    component.addEventListener('ai-state-change', updateMetrics);
    component.addEventListener('performance-violation', updateMetrics);
    
    // Initial metrics
    updateMetrics();
    
    return () => {
      component.removeEventListener('ai-state-change', updateMetrics);
      component.removeEventListener('performance-violation', updateMetrics);
    };
  }, [ref]);
  
  return metrics;
}

// Usage in React component
function MyReactComponent() {
  const cardRef = useRef<ForgeCard>(null);
  const metrics = useForgePerformance(cardRef);
  
  return (
    <div>
      <forge-card ref={cardRef} max-render-ms="10">
        Card content
      </forge-card>
      
      {metrics && (
        <div className="performance-info">
          Render time: {metrics.renderTime.toFixed(2)}ms
          {metrics.violations > 0 && (
            <span className="warning">
              {metrics.violations} violations
            </span>
          )}
        </div>
      )}
    </div>
  );
}
```

### Vue Integration

```vue
<template>
  <div>
    <forge-button 
      ref="button"
      :max-render-ms="budget"
      @performance-violation="handleViolation"
    >
      Click me
    </forge-button>
    
    <div v-if="showMetrics" class="metrics">
      <p>Render Count: {{ metrics?.renderCount }}</p>
      <p>Last Render: {{ metrics?.renderTime?.toFixed(2) }}ms</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import type { ForgeButton } from '@nexcraft/forge';

export default defineComponent({
  setup() {
    const button = ref<ForgeButton>();
    const showMetrics = ref(false);
    const budget = ref(16);
    
    const metrics = computed(() => {
      return button.value?.aiState.performance;
    });
    
    const handleViolation = (event: CustomEvent) => {
      console.warn('Performance violation:', event.detail);
      showMetrics.value = true;
    };
    
    return {
      button,
      metrics,
      showMetrics,
      budget,
      handleViolation
    };
  }
});
</script>
```

## Testing Performance

### Performance Test Suite

```typescript
describe('Component Performance', () => {
  let component: ForgeCard;
  let profiler: PerformanceProfiler;
  
  beforeEach(async () => {
    component = await fixture<ForgeCard>(html`
      <forge-card max-render-ms="10">
        Test content
      </forge-card>
    `);
    
    profiler = new PerformanceProfiler();
  });
  
  it('should render within budget', async () => {
    const profileId = profiler.startProfile(component);
    
    // Trigger multiple renders
    for (let i = 0; i < 10; i++) {
      component.title = `Title ${i}`;
      await component.updateComplete;
    }
    
    const report = profiler.endProfile(profileId);
    
    expect(report.averageRenderTime).to.be.lessThan(10);
    expect(report.maxRenderTime).to.be.lessThan(16);
  });
  
  it('should not have memory leaks', async () => {
    const initialMemory = getMemoryUsage();
    
    // Create and destroy many components
    for (let i = 0; i < 100; i++) {
      const card = await fixture(html`<forge-card>Content ${i}</forge-card>`);
      card.remove();
    }
    
    // Force garbage collection if available
    if (window.gc) window.gc();
    
    const finalMemory = getMemoryUsage();
    const memoryIncrease = finalMemory - initialMemory;
    
    expect(memoryIncrease).to.be.lessThan(1024 * 1024); // Less than 1MB
  });
  
  it('should handle performance degradation', async () => {
    // Set very strict budget to trigger degradation
    component.maxRenderMs = 1;
    component.performanceMode = 'auto';
    
    // Trigger multiple renders to cause violations
    for (let i = 0; i < 10; i++) {
      component.title = `Long title that might cause slow renders ${i}`;
      await component.updateComplete;
    }
    
    // Should have switched to fast mode
    expect(component.performanceMode).to.equal('fast');
  });
});
```

## Best Practices

### Performance Budget Guidelines

1. **16ms Budget**: Target for smooth 60fps interactions
2. **Component-Specific**: Different budgets for different component types
3. **Mobile Consideration**: Stricter budgets for mobile devices
4. **Context Aware**: Critical path components need tighter budgets

### Monitoring Strategy

1. **Development Mode**: Always enable in development
2. **Production Sampling**: Monitor subset of users in production
3. **Critical Components**: Always monitor high-impact components
4. **Gradual Rollout**: Implement monitoring incrementally

### Optimization Techniques

1. **Lazy Loading**: Defer expensive operations
2. **Virtualization**: For large lists and data sets
3. **Memoization**: Cache expensive calculations
4. **Debouncing**: Limit update frequency
5. **Animation Optimization**: Use transform and opacity for animations

This comprehensive performance monitoring system ensures Forge components maintain excellent performance while providing detailed insights for optimization.