# Performance Dashboard API Reference

Complete API documentation for the Performance Dashboard system.

## Core Classes

### PerformanceDashboard

Main class for monitoring component performance across the application.

#### Constructor
```typescript
new PerformanceDashboard()
```

Creates a new performance dashboard instance. The dashboard automatically starts discovering Forge components on the page.

---

#### Instance Methods

##### `registerComponent(component: BaseElement): void`
Manually register a component for monitoring.

```typescript
const dashboard = new PerformanceDashboard();
const button = document.querySelector('forge-button');
dashboard.registerComponent(button);
```

**Parameters:**
- `component` - BaseElement instance to monitor

**Note:** Auto-discovery usually handles this automatically.

---

##### `getAllMetrics(): Record<string, AIPerformanceMetrics>`
Get current performance metrics for all monitored components.

```typescript
const metrics = dashboard.getAllMetrics();
console.log(metrics);
// {
//   'forge-button': { renderTime: 1.2, renderCount: 15, violations: 0, mode: 'auto' },
//   'forge-card': { renderTime: 3.8, renderCount: 8, violations: 1, mode: 'balanced' }
// }
```

**Returns:** Object mapping component names to their performance metrics

---

##### `getComponentMetrics(componentName: string): AIPerformanceMetrics | null`
Get performance metrics for a specific component type.

```typescript
const buttonMetrics = dashboard.getComponentMetrics('forge-button');
if (buttonMetrics) {
  console.log(`Button renders in ${buttonMetrics.renderTime}ms`);
}
```

**Parameters:**
- `componentName` - Name of component type (e.g., 'forge-button')

**Returns:** Performance metrics object or null if component not found

---

##### `getSlowComponents(threshold?: number): string[]`
Get list of components exceeding the performance threshold.

```typescript
const slowComponents = dashboard.getSlowComponents(16);
console.log('Components over 16ms:', slowComponents);
// ['forge-modal', 'forge-data-table']
```

**Parameters:**
- `threshold` - Performance threshold in milliseconds (default: 16)

**Returns:** Array of component names exceeding threshold

---

##### `getViolations(limit?: number): PerformanceViolation[]`
Get recent performance budget violations.

```typescript
const violations = dashboard.getViolations(10);
violations.forEach(v => {
  console.log(`${v.component}: ${v.renderTime}ms > ${v.budget}ms at ${new Date(v.timestamp)}`);
});
```

**Parameters:**
- `limit` - Maximum number of violations to return (default: 50)

**Returns:** Array of recent performance violations

---

##### `getMetricsHistory(fromTimestamp?: number, componentName?: string): PerformanceMetricsHistory[]`
Get historical performance data with optional filtering.

```typescript
// Get all history from the last hour
const oneHourAgo = Date.now() - (60 * 60 * 1000);
const recentHistory = dashboard.getMetricsHistory(oneHourAgo);

// Get history for specific component
const buttonHistory = dashboard.getMetricsHistory(undefined, 'forge-button');
```

**Parameters:**
- `fromTimestamp` - Optional timestamp to filter from
- `componentName` - Optional component name to filter by

**Returns:** Array of historical performance entries

---

##### `getComponentSummaries(): ComponentMetricsSummary[]`
Get aggregated performance summaries for all components.

```typescript
const summaries = dashboard.getComponentSummaries();
summaries.forEach(summary => {
  console.log(`${summary.name}:`, {
    avgRender: `${summary.averageRenderTime.toFixed(2)}ms`,
    maxRender: `${summary.maxRenderTime.toFixed(2)}ms`,
    health: summary.health,
    violations: summary.violations
  });
});
```

**Returns:** Array of component performance summaries

---

##### `subscribe(listener: (metrics: Record<string, AIPerformanceMetrics>) => void): () => void`
Subscribe to real-time performance metric updates.

```typescript
const unsubscribe = dashboard.subscribe((metrics) => {
  console.log('Performance metrics updated:', metrics);
  
  // Handle slow components
  Object.entries(metrics).forEach(([name, metric]) => {
    if (metric.renderTime > 20) {
      console.warn(`⚠️ ${name} is slow: ${metric.renderTime}ms`);
    }
  });
});

// Cleanup subscription
unsubscribe();
```

**Parameters:**
- `listener` - Function called with updated metrics

**Returns:** Unsubscribe function

---

##### `stopMonitoring(): void`
Stop performance monitoring and cleanup resources.

```typescript
dashboard.stopMonitoring();
```

**Note:** This stops metrics collection and clears intervals. Use when shutting down the dashboard.

---

### ForgePerformanceDashboard

Web component providing visual performance dashboard.

#### HTML Usage
```html
<forge-performance-dashboard 
  auto-refresh="true"
  refresh-interval="1000" 
  show-violations="true">
</forge-performance-dashboard>
```

#### Properties

##### `autoRefresh: boolean`
Enable automatic dashboard updates.

```typescript
dashboard.autoRefresh = true;  // Enable auto-refresh
dashboard.autoRefresh = false; // Disable auto-refresh
```

**Default:** `true`

---

##### `refreshInterval: number`
Update interval in milliseconds when auto-refresh is enabled.

```typescript
dashboard.refreshInterval = 2000; // Update every 2 seconds
```

**Default:** `1000` (1 second)

---

##### `showViolations: boolean`
Show performance violations section in dashboard.

```typescript
dashboard.showViolations = true;  // Show violations
dashboard.showViolations = false; // Hide violations
```

**Default:** `true`

---

#### Methods

##### `updateData(): void`
Manually trigger dashboard update.

```typescript
const dashboard = document.querySelector('forge-performance-dashboard');
dashboard.updateData(); // Force refresh
```

---

## Type Definitions

### AIPerformanceMetrics
```typescript
interface AIPerformanceMetrics {
  renderTime: number;        // Last render time in milliseconds
  renderCount: number;       // Total number of renders
  violations: number;        // Number of budget violations
  mode: 'auto' | 'fast' | 'balanced' | 'quality'; // Current performance mode
  memoryUsage?: number;      // Memory usage in bytes (if available)
  eventHandlingTime?: number; // Average event handling time
}
```

### PerformanceMetricsHistory
```typescript
interface PerformanceMetricsHistory {
  timestamp: number;         // When the metric was recorded
  component: string;         // Component name
  renderTime: number;        // Render time for this entry
  renderCount: number;       // Total renders at this time
  violations: number;        // Violations count at this time
  mode: 'auto' | 'fast' | 'balanced' | 'quality'; // Performance mode
}
```

### PerformanceViolation
```typescript
interface PerformanceViolation {
  timestamp: number;         // When violation occurred
  component: string;         // Component that violated budget
  renderTime: number;        // Actual render time
  budget: number;           // Performance budget that was exceeded
  violationCount: number;   // Number of violations for this component
}
```

### ComponentMetricsSummary
```typescript
interface ComponentMetricsSummary {
  name: string;                    // Component name
  averageRenderTime: number;       // Average render time across all renders
  maxRenderTime: number;           // Maximum render time observed
  totalRenders: number;            // Total number of renders
  violations: number;              // Total violations
  currentMode: string;             // Current performance mode
  health: 'excellent' | 'good' | 'warning' | 'critical'; // Overall health
}
```

---

## Usage Examples

### Basic Dashboard Setup
```typescript
import { performanceDashboard } from '@nexcraft/forge/utils';

// Get current performance overview
const metrics = performanceDashboard.getAllMetrics();
console.log(`Monitoring ${Object.keys(metrics).length} components`);

// Check for slow components
const slowComponents = performanceDashboard.getSlowComponents(10);
if (slowComponents.length > 0) {
  console.warn('Slow components detected:', slowComponents);
}
```

### Real-Time Monitoring
```typescript
// Subscribe to performance updates
const unsubscribe = performanceDashboard.subscribe((metrics) => {
  const componentsCount = Object.keys(metrics).length;
  const slowCount = Object.values(metrics)
    .filter(m => m.renderTime > 16).length;
  
  console.log(`${componentsCount} components, ${slowCount} slow`);
  
  // Alert on critical performance
  Object.entries(metrics).forEach(([name, metric]) => {
    if (metric.renderTime > 50) {
      alert(`🚨 Critical: ${name} taking ${metric.renderTime}ms!`);
    }
  });
});

// Stop monitoring after 5 minutes
setTimeout(unsubscribe, 5 * 60 * 1000);
```

### Performance Analysis
```typescript
// Analyze component performance trends
const summaries = performanceDashboard.getComponentSummaries();

// Find components with performance issues
const problematicComponents = summaries.filter(s => 
  s.health === 'critical' || s.violations > 5
);

console.log('Components needing optimization:');
problematicComponents.forEach(component => {
  console.log(`- ${component.name}:`);
  console.log(`  Average: ${component.averageRenderTime.toFixed(2)}ms`);
  console.log(`  Max: ${component.maxRenderTime.toFixed(2)}ms`);
  console.log(`  Violations: ${component.violations}`);
  console.log(`  Health: ${component.health}`);
});
```

### Custom Performance Alerts
```typescript
class PerformanceAlerter {
  constructor(thresholds = {}) {
    this.thresholds = {
      warning: 16,   // 16ms warning threshold
      critical: 32,  // 32ms critical threshold
      ...thresholds
    };
    
    this.setupMonitoring();
  }
  
  setupMonitoring() {
    performanceDashboard.subscribe((metrics) => {
      Object.entries(metrics).forEach(([name, metric]) => {
        this.checkThresholds(name, metric);
      });
    });
  }
  
  checkThresholds(componentName, metric) {
    if (metric.renderTime > this.thresholds.critical) {
      this.sendCriticalAlert(componentName, metric);
    } else if (metric.renderTime > this.thresholds.warning) {
      this.sendWarningAlert(componentName, metric);
    }
  }
  
  sendCriticalAlert(componentName, metric) {
    console.error(`🚨 CRITICAL: ${componentName} - ${metric.renderTime.toFixed(2)}ms`);
    // Send to monitoring service
  }
  
  sendWarningAlert(componentName, metric) {
    console.warn(`⚠️ WARNING: ${componentName} - ${metric.renderTime.toFixed(2)}ms`);
  }
}

// Setup alerting
new PerformanceAlerter({
  warning: 10,   // Strict 10ms warning
  critical: 25   // 25ms critical
});
```

### Dashboard Integration
```typescript
// Create custom dashboard component
class CustomDashboard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="custom-dashboard">
        <h3>Performance Overview</h3>
        <div id="metrics"></div>
        <div id="alerts"></div>
      </div>
    `;
    
    // Subscribe to updates
    this.unsubscribe = performanceDashboard.subscribe((metrics) => {
      this.updateDisplay(metrics);
    });
  }
  
  updateDisplay(metrics) {
    const metricsDiv = this.querySelector('#metrics');
    const alertsDiv = this.querySelector('#alerts');
    
    // Show metrics summary
    const totalComponents = Object.keys(metrics).length;
    const avgRenderTime = Object.values(metrics)
      .reduce((sum, m) => sum + m.renderTime, 0) / totalComponents;
    
    metricsDiv.innerHTML = `
      <p>Components: ${totalComponents}</p>
      <p>Avg Render: ${avgRenderTime.toFixed(2)}ms</p>
    `;
    
    // Show alerts for slow components
    const slowComponents = Object.entries(metrics)
      .filter(([name, m]) => m.renderTime > 20);
    
    alertsDiv.innerHTML = slowComponents.length > 0 
      ? `<div class="alert">Slow: ${slowComponents.map(([name]) => name).join(', ')}</div>`
      : '<div class="ok">All components performing well</div>';
  }
  
  disconnectedCallback() {
    this.unsubscribe?.();
  }
}

customElements.define('custom-dashboard', CustomDashboard);
```

---

## Error Handling

### Common Issues

#### No Components Detected
```typescript
// Check if components are properly registered
const metrics = performanceDashboard.getAllMetrics();
if (Object.keys(metrics).length === 0) {
  console.warn('No components detected. Ensure Forge components have data-ready="true"');
}
```

#### Dashboard Not Updating
```typescript
// Verify dashboard is connected and auto-refresh is enabled
const dashboard = document.querySelector('forge-performance-dashboard');
if (!dashboard.autoRefresh) {
  dashboard.autoRefresh = true;
  console.log('Auto-refresh enabled');
}
```

#### High Memory Usage
```typescript
// Monitor memory usage and cleanup if needed
performanceDashboard.subscribe((metrics) => {
  const memoryUsage = Object.values(metrics)
    .reduce((sum, m) => sum + (m.memoryUsage || 0), 0);
  
  if (memoryUsage > 100 * 1024 * 1024) { // 100MB threshold
    console.warn('High memory usage detected:', memoryUsage);
    // Implement cleanup strategies
  }
});
```

---

## Performance Characteristics

### Time Complexity
- Metrics collection: O(n) where n is number of components
- Dashboard rendering: O(n) with automatic caching
- Subscription updates: O(m) where m is number of subscribers

### Memory Usage
- ~1KB per component for metrics storage
- ~5KB for dashboard component overhead
- History limited to 1000 entries (configurable)

### Update Frequency
- Default refresh: Every 100ms for collection, 1000ms for display
- Configurable refresh intervals from 100ms to 60000ms
- Automatic throttling when many components are monitored

---

*This API reference provides complete documentation for the Performance Dashboard system. For usage examples and integration patterns, see the [Performance Dashboard Guide](./guides/performance-dashboard-guide.md).*