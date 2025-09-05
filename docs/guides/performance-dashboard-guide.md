# Performance Dashboard Complete Guide

> **Industry-First Feature**: @nexcraft/forge is the ONLY component library with built-in real-time performance monitoring and visual dashboard. Every component monitors its own performance and provides actionable insights - no external tools needed.

## 🎯 Why Performance Dashboard Is Revolutionary

### The Problem Every Team Faces
```javascript
// The old way: External tools and guesswork
// ❌ React DevTools - Only works in development
// ❌ Chrome DevTools - Manual performance profiling
// ❌ Lighthouse - Periodic audits, not real-time
// ❌ Third-party APM - Expensive, complex setup

// Components are "black boxes" with no performance insight
<Button onClick={handleClick}>Click</Button>  // Is this slow? 🤷‍♂️
```

### The @nexcraft/forge Solution
```javascript
// The new way: Built-in performance monitoring
<forge-button max-render-ms="2" warn-on-violation performance-mode="auto">
  Click Me
</forge-button>

// Real-time dashboard shows everything
<forge-performance-dashboard auto-refresh="true" show-violations="true">
</forge-performance-dashboard>

// Every component knows its performance
button.aiState.performance  // { renderTime: 0.8ms, violations: 0 }
```

## 🚀 Quick Start (30 Seconds!)

### Step 1: Add the Performance Dashboard
```html
<!-- Instant real-time performance monitoring -->
<forge-performance-dashboard 
  auto-refresh="true" 
  refresh-interval="1000"
  show-violations="true">
</forge-performance-dashboard>
```

### Step 2: Components Automatically Monitor Themselves
```html
<!-- Set performance budgets -->
<forge-button max-render-ms="2" warn-on-violation>Fast Button</forge-button>
<forge-card max-render-ms="5" performance-mode="auto">Auto-optimizing Card</forge-card>
<forge-modal max-render-ms="10" dev-mode>Development Modal</forge-modal>
```

### Step 3: Watch Real-Time Metrics
```javascript
// Dashboard automatically shows:
// ✅ Component render times
// ✅ Performance violations
// ✅ Health indicators (excellent/good/warning/critical)
// ✅ Automatic performance degradation
// ✅ Memory usage tracking
```

## 📊 Dashboard Features

### 1. Real-Time Metrics Display

The dashboard provides live performance data for all Forge components:

```html
<forge-performance-dashboard></forge-performance-dashboard>
```

**What You See:**
- **Component Names**: All active Forge components
- **Average Render Time**: Performance over time
- **Max Render Time**: Worst-case performance
- **Total Renders**: Component activity level
- **Violations**: Budget exceeded count
- **Current Mode**: auto/fast/balanced/quality
- **Health Status**: Excellent/Good/Warning/Critical

### 2. Health Indicators

Components are automatically categorized:

```javascript
// Health calculation based on average render time
const health = {
  'excellent': '≤ 8ms',      // 🟢 Green
  'good':      '8-16ms',     // 🔵 Blue  
  'warning':   '16-32ms',    // 🟡 Yellow
  'critical':  '> 32ms'      // 🔴 Red
};
```

### 3. Performance Violations Tracking

Real-time violation monitoring:

```javascript
// Violations are recorded when components exceed budgets
<forge-button max-render-ms="5">  <!-- Budget: 5ms -->
  Slow Button  <!-- Actual: 8ms = VIOLATION -->
</forge-button>
```

**Violation Details:**
- Timestamp of violation
- Component name
- Actual render time vs budget
- Violation count per component

### 4. Auto-Refresh & Live Updates

```html
<!-- Configure refresh behavior -->
<forge-performance-dashboard 
  auto-refresh="true"           <!-- Enable live updates -->
  refresh-interval="500">       <!-- Update every 500ms -->
</forge-performance-dashboard>
```

## ⚡ Component Performance Monitoring

### Setting Performance Budgets

Every Forge component accepts performance attributes:

```html
<!-- Strict performance budget -->
<forge-dropdown max-render-ms="2" warn-on-violation>
  <option value="1">Fast Option</option>
</forge-dropdown>

<!-- Development monitoring -->
<forge-modal max-render-ms="10" dev-mode show-metrics>
  Modal with detailed logging
</forge-modal>

<!-- Auto-optimization -->
<forge-tooltip max-render-ms="1" performance-mode="auto">
  Self-optimizing tooltip
</forge-tooltip>
```

### Performance Modes

Components automatically degrade features when slow:

```javascript
// Auto mode switches between performance levels
const performanceModes = {
  'auto':      'Switches modes automatically based on performance',
  'fast':      'Minimal features, maximum speed',
  'balanced':  'Good compromise of features and speed', 
  'quality':   'All features, best visual experience'
};

// Example: Button in fast mode
// ✅ Disables animations
// ✅ Reduces visual effects  
// ✅ Simplifies calculations
// ✅ Throttles updates
```

### Monitoring API

Programmatic access to performance data:

```javascript
import { performanceDashboard } from '@nexcraft/forge/utils';

// Get current metrics for all components
const metrics = performanceDashboard.getAllMetrics();
console.log(metrics);
// {
//   'forge-button': { renderTime: 1.2ms, violations: 0 },
//   'forge-card': { renderTime: 3.8ms, violations: 2 }
// }

// Get metrics for specific component
const buttonMetrics = performanceDashboard.getComponentMetrics('forge-button');
console.log(`Button renders in ${buttonMetrics.renderTime}ms`);

// Find slow components
const slowComponents = performanceDashboard.getSlowComponents(16); // > 16ms
console.log('Needs optimization:', slowComponents);

// Get recent violations
const violations = performanceDashboard.getViolations(10);
violations.forEach(v => {
  console.log(`${v.component}: ${v.renderTime}ms > ${v.budget}ms`);
});
```

## 🔄 Real-World Usage Patterns

### 1. Development Workflow

```javascript
// Development setup with strict budgets
if (process.env.NODE_ENV === 'development') {
  // Enable strict monitoring
  document.querySelectorAll('[tagName*="FORGE-"]').forEach(element => {
    element.maxRenderMs = 5;     // Strict 5ms budget
    element.warnOnViolation = true;
    element.devMode = true;
  });
  
  // Add dashboard to page
  const dashboard = document.createElement('forge-performance-dashboard');
  dashboard.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 400px;
    z-index: 9999;
  `;
  document.body.appendChild(dashboard);
}
```

### 2. Production Monitoring

```javascript
// Production setup with sampling
if (process.env.NODE_ENV === 'production') {
  // Sample 1% of users for performance monitoring
  if (Math.random() < 0.01) {
    performanceDashboard.subscribe((metrics) => {
      // Send performance data to analytics
      analytics.track('component_performance', {
        metrics: Object.entries(metrics).map(([name, metric]) => ({
          component: name,
          averageRenderTime: metric.renderTime,
          violations: metric.violations
        }))
      });
    });
  }
}
```

### 3. CI/CD Integration

```javascript
// Performance testing in CI
// test/performance.test.js
import { performanceDashboard } from '@nexcraft/forge/utils';

describe('Component Performance', () => {
  it('should render all components under budget', async () => {
    // Render test page
    await page.goto('http://localhost:3000/test-page');
    
    // Wait for components to load
    await page.waitForSelector('[data-ready="true"]');
    
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      return window.performanceDashboard.getComponentSummaries();
    });
    
    // Assert performance budgets
    metrics.forEach(component => {
      expect(component.averageRenderTime).toBeLessThan(10);
      expect(component.violations).toBe(0);
    });
  });
});
```

## 🎨 Dashboard Customization

### Styling the Dashboard

```css
/* Custom dashboard styling */
forge-performance-dashboard {
  --dashboard-bg: #1a1a1a;
  --dashboard-text: #ffffff;
  --dashboard-border: #333;
  --health-excellent: #00ff00;
  --health-good: #0080ff;
  --health-warning: #ffff00;
  --health-critical: #ff0000;
}
```

### Custom Dashboard Creation

```javascript
// Create custom dashboard with specific metrics
class CustomPerformanceDashboard extends HTMLElement {
  connectedCallback() {
    // Subscribe to performance updates
    this.unsubscribe = performanceDashboard.subscribe((metrics) => {
      this.updateDisplay(metrics);
    });
    
    this.innerHTML = `
      <div class="performance-summary">
        <h3>Performance Overview</h3>
        <div id="metrics-container"></div>
      </div>
    `;
  }
  
  updateDisplay(metrics) {
    const container = this.querySelector('#metrics-container');
    const slowComponents = Object.entries(metrics)
      .filter(([name, metric]) => metric.renderTime > 10)
      .length;
    
    container.innerHTML = `
      <p>Total Components: ${Object.keys(metrics).length}</p>
      <p>Slow Components: ${slowComponents}</p>
      <p>Overall Health: ${slowComponents === 0 ? 'Good' : 'Needs Attention'}</p>
    `;
  }
  
  disconnectedCallback() {
    this.unsubscribe?.();
  }
}

customElements.define('custom-performance-dashboard', CustomPerformanceDashboard);
```

## 🛠️ Framework Integration

### React Integration

```jsx
import { performanceDashboard } from '@nexcraft/forge/utils';
import { useState, useEffect } from 'react';

function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({});
  const [slowComponents, setSlowComponents] = useState([]);
  
  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = performanceDashboard.subscribe((newMetrics) => {
      setMetrics(newMetrics);
      setSlowComponents(
        Object.entries(newMetrics)
          .filter(([name, metric]) => metric.renderTime > 16)
          .map(([name]) => name)
      );
    });
    
    return unsubscribe;
  }, []);
  
  return (
    <div className="performance-monitor">
      <h3>Performance Status</h3>
      <p>Components Monitored: {Object.keys(metrics).length}</p>
      <p>Slow Components: {slowComponents.length}</p>
      
      {slowComponents.length > 0 && (
        <div className="alert">
          ⚠️ Components need optimization: {slowComponents.join(', ')}
        </div>
      )}
      
      {/* Forge Dashboard Component */}
      <forge-performance-dashboard auto-refresh="true" />
    </div>
  );
}
```

### Vue Integration

```vue
<template>
  <div class="performance-monitor">
    <div class="metrics-summary">
      <h3>Performance Overview</h3>
      <p>Total Components: {{ totalComponents }}</p>
      <p>Average Render Time: {{ averageRenderTime }}ms</p>
      <p>Components Needing Attention: {{ slowComponents.length }}</p>
    </div>
    
    <!-- Native Forge Dashboard -->
    <forge-performance-dashboard 
      :auto-refresh="true" 
      :refresh-interval="1000"
      :show-violations="true" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { performanceDashboard } from '@nexcraft/forge/utils';

const metrics = ref({});
let unsubscribe;

const totalComponents = computed(() => Object.keys(metrics.value).length);

const averageRenderTime = computed(() => {
  const times = Object.values(metrics.value).map(m => m.renderTime);
  return times.length ? (times.reduce((a, b) => a + b) / times.length).toFixed(1) : 0;
});

const slowComponents = computed(() => 
  Object.entries(metrics.value)
    .filter(([name, metric]) => metric.renderTime > 16)
    .map(([name]) => name)
);

onMounted(() => {
  unsubscribe = performanceDashboard.subscribe((newMetrics) => {
    metrics.value = newMetrics;
  });
});

onUnmounted(() => {
  unsubscribe?.();
});
</script>
```

### Angular Integration

```typescript
// performance-monitor.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { performanceDashboard } from '@nexcraft/forge/utils';

@Component({
  selector: 'app-performance-monitor',
  template: `
    <div class="performance-monitor">
      <h3>Performance Dashboard</h3>
      
      <div class="metrics-grid">
        <div class="metric-card" *ngFor="let metric of metricsArray">
          <h4>{{ metric.name }}</h4>
          <p>Render Time: {{ metric.renderTime.toFixed(2) }}ms</p>
          <p>Violations: {{ metric.violations }}</p>
          <span class="health-indicator" [class]="metric.health">
            {{ metric.health }}
          </span>
        </div>
      </div>
      
      <!-- Forge Dashboard Component -->
      <forge-performance-dashboard 
        [attr.auto-refresh]="true"
        [attr.show-violations]="true">
      </forge-performance-dashboard>
    </div>
  `
})
export class PerformanceMonitorComponent implements OnInit, OnDestroy {
  metrics: Record<string, any> = {};
  metricsArray: any[] = [];
  private unsubscribe?: () => void;
  
  ngOnInit() {
    this.unsubscribe = performanceDashboard.subscribe((metrics) => {
      this.metrics = metrics;
      this.metricsArray = Object.entries(metrics).map(([name, metric]) => ({
        name,
        ...metric,
        health: this.calculateHealth(metric.renderTime)
      }));
    });
  }
  
  ngOnDestroy() {
    this.unsubscribe?.();
  }
  
  private calculateHealth(renderTime: number): string {
    if (renderTime <= 8) return 'excellent';
    if (renderTime <= 16) return 'good';
    if (renderTime <= 32) return 'warning';
    return 'critical';
  }
}
```

## 📈 Performance Analytics

### Automated Performance Reports

```javascript
// utils/performance-reporter.js
import { performanceDashboard } from '@nexcraft/forge/utils';

class PerformanceReporter {
  constructor(options = {}) {
    this.reportInterval = options.interval || 60000; // 1 minute
    this.threshold = options.threshold || 16; // 16ms
    this.startReporting();
  }
  
  startReporting() {
    setInterval(() => {
      this.generateReport();
    }, this.reportInterval);
  }
  
  generateReport() {
    const summaries = performanceDashboard.getComponentSummaries();
    const violations = performanceDashboard.getViolations(100);
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalComponents: summaries.length,
        averageRenderTime: this.calculateAverageRenderTime(summaries),
        slowComponents: summaries.filter(s => s.averageRenderTime > this.threshold),
        totalViolations: violations.length
      },
      components: summaries.map(s => ({
        name: s.name,
        averageRenderTime: s.averageRenderTime,
        maxRenderTime: s.maxRenderTime,
        violations: s.violations,
        health: s.health
      })),
      recentViolations: violations.slice(-10)
    };
    
    // Send to analytics service
    this.sendReport(report);
  }
  
  calculateAverageRenderTime(summaries) {
    if (summaries.length === 0) return 0;
    const total = summaries.reduce((sum, s) => sum + s.averageRenderTime, 0);
    return (total / summaries.length).toFixed(2);
  }
  
  sendReport(report) {
    // Integration with analytics services
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_report', {
        custom_parameters: report
      });
    }
    
    // Custom analytics endpoint
    fetch('/api/performance-reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report)
    });
  }
}

// Initialize reporter
new PerformanceReporter({
  interval: 30000,  // Report every 30 seconds
  threshold: 10     // Flag components > 10ms
});
```

### Performance Budgets & Alerts

```javascript
// utils/performance-budget.js
class PerformanceBudget {
  constructor() {
    this.budgets = new Map();
    this.alerts = new Map();
    this.setupMonitoring();
  }
  
  // Set performance budgets for specific components
  setBudget(componentName, budget) {
    this.budgets.set(componentName, budget);
  }
  
  // Set up budget monitoring
  setupMonitoring() {
    performanceDashboard.subscribe((metrics) => {
      Object.entries(metrics).forEach(([name, metric]) => {
        const budget = this.budgets.get(name);
        if (budget && metric.renderTime > budget.maxRenderTime) {
          this.triggerAlert(name, metric, budget);
        }
      });
    });
  }
  
  triggerAlert(componentName, metric, budget) {
    const alertKey = `${componentName}-${Date.now()}`;
    
    const alert = {
      component: componentName,
      actualTime: metric.renderTime,
      budgetTime: budget.maxRenderTime,
      severity: this.calculateSeverity(metric.renderTime, budget.maxRenderTime),
      timestamp: new Date().toISOString()
    };
    
    this.alerts.set(alertKey, alert);
    
    // Send alert
    this.sendAlert(alert);
    
    // Auto-cleanup old alerts
    setTimeout(() => this.alerts.delete(alertKey), 300000); // 5 minutes
  }
  
  calculateSeverity(actual, budget) {
    const ratio = actual / budget;
    if (ratio > 3) return 'critical';
    if (ratio > 2) return 'high';
    if (ratio > 1.5) return 'medium';
    return 'low';
  }
  
  sendAlert(alert) {
    // Slack notification
    if (alert.severity === 'critical') {
      this.sendSlackAlert(alert);
    }
    
    // Email notification
    if (['critical', 'high'].includes(alert.severity)) {
      this.sendEmailAlert(alert);
    }
    
    // Console warning
    console.warn(`🚨 Performance Alert: ${alert.component} took ${alert.actualTime}ms (budget: ${alert.budgetTime}ms)`);
  }
}

// Usage
const budget = new PerformanceBudget();

// Set budgets for critical components
budget.setBudget('forge-button', { maxRenderTime: 2 });
budget.setBudget('forge-card', { maxRenderTime: 5 });
budget.setBudget('forge-modal', { maxRenderTime: 10 });
```

## 🔧 Advanced Configuration

### Custom Performance Metrics

```javascript
// Extend performance tracking with custom metrics
class EnhancedPerformanceTracker {
  constructor() {
    this.customMetrics = new Map();
    this.setupCustomTracking();
  }
  
  // Track custom performance metrics
  trackCustomMetric(componentName, metricName, value) {
    const key = `${componentName}-${metricName}`;
    if (!this.customMetrics.has(key)) {
      this.customMetrics.set(key, []);
    }
    this.customMetrics.get(key).push({
      value,
      timestamp: Date.now()
    });
  }
  
  // Track memory usage
  trackMemoryUsage(componentName) {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.trackCustomMetric(componentName, 'memory', memory.usedJSHeapSize);
    }
  }
  
  // Track event handling performance
  trackEventHandling(componentName, eventType, duration) {
    this.trackCustomMetric(componentName, `event-${eventType}`, duration);
  }
  
  // Get custom metrics summary
  getCustomMetrics(componentName, metricName) {
    const key = `${componentName}-${metricName}`;
    const values = this.customMetrics.get(key) || [];
    
    if (values.length === 0) return null;
    
    const recentValues = values.slice(-10); // Last 10 values
    const avg = recentValues.reduce((sum, v) => sum + v.value, 0) / recentValues.length;
    const max = Math.max(...recentValues.map(v => v.value));
    const min = Math.min(...recentValues.map(v => v.value));
    
    return { average: avg, max, min, count: values.length };
  }
}

// Global tracker instance
const enhancedTracker = new EnhancedPerformanceTracker();

// Usage in components
class PerformanceAwareComponent extends BaseElement {
  connectedCallback() {
    super.connectedCallback();
    enhancedTracker.trackMemoryUsage(this.tagName.toLowerCase());
  }
  
  handleClick(event) {
    const startTime = performance.now();
    
    // Handle click
    this.processClick(event);
    
    const duration = performance.now() - startTime;
    enhancedTracker.trackEventHandling(
      this.tagName.toLowerCase(), 
      'click', 
      duration
    );
  }
}
```

## 🎯 Performance Dashboard vs. Alternatives

| Feature | @nexcraft/forge | React DevTools | Chrome DevTools | Lighthouse | DataDog/NewRelic |
|---------|-----------------|----------------|-----------------|------------|------------------|
| **Real-time Monitoring** | ✅ Built-in | ❌ Development only | ❌ Manual profiling | ❌ Periodic audits | ✅ Expensive setup |
| **Component-Level Metrics** | ✅ Individual components | ⚠️ React components only | ⚠️ Manual inspection | ❌ Page-level only | ⚠️ Application-level |
| **Auto-Performance Budgets** | ✅ Per-component budgets | ❌ Not available | ❌ Not available | ⚠️ Manual thresholds | ⚠️ Custom setup |
| **Performance Degradation** | ✅ Automatic optimization | ❌ Not available | ❌ Not available | ❌ Not available | ❌ Not available |
| **Zero Configuration** | ✅ Works instantly | ❌ Setup required | ❌ Manual setup | ❌ CI/CD integration | ❌ Complex setup |
| **Production Ready** | ✅ Built for production | ❌ Development only | ❌ Development only | ⚠️ CI/CD only | ✅ Production focused |
| **Framework Agnostic** | ✅ Any framework | ❌ React only | ✅ Any framework | ✅ Any framework | ✅ Any framework |
| **Cost** | ✅ Free | ✅ Free | ✅ Free | ✅ Free | ❌ $$$$ Enterprise |

## ✅ Best Practices

### 1. Setting Realistic Budgets
```javascript
// Component complexity-based budgets
const performanceBudgets = {
  // Simple components
  'forge-button': 2,     // 2ms budget
  'forge-badge': 1,      // 1ms budget
  'forge-icon': 1,       // 1ms budget
  
  // Medium complexity
  'forge-card': 5,       // 5ms budget
  'forge-dropdown': 8,   // 8ms budget
  'forge-tooltip': 3,    // 3ms budget
  
  // Complex components
  'forge-modal': 15,     // 15ms budget
  'forge-data-table': 20, // 20ms budget
  'forge-tree-view': 25   // 25ms budget
};

// Apply budgets programmatically
Object.entries(performanceBudgets).forEach(([component, budget]) => {
  document.querySelectorAll(component).forEach(el => {
    el.maxRenderMs = budget;
  });
});
```

### 2. Staged Performance Monitoring
```javascript
// Different monitoring strategies by environment
const monitoringConfig = {
  development: {
    enabled: true,
    strictBudgets: true,
    warnOnViolation: true,
    showDashboard: true,
    refreshInterval: 500
  },
  
  staging: {
    enabled: true,
    strictBudgets: false,
    warnOnViolation: true,
    showDashboard: false,
    refreshInterval: 2000
  },
  
  production: {
    enabled: true,
    strictBudgets: false,
    warnOnViolation: false,
    showDashboard: false,
    refreshInterval: 10000,
    sampling: 0.01  // Monitor 1% of users
  }
};
```

### 3. Performance-First Development
```javascript
// Development workflow with performance first
class PerformanceFirstComponent extends BaseElement {
  constructor() {
    super();
    
    // Set aggressive performance budget during development
    if (process.env.NODE_ENV === 'development') {
      this.maxRenderMs = 5;  // Strict 5ms budget
      this.warnOnViolation = true;
      this.performanceMode = 'auto';
    }
  }
  
  render() {
    const startTime = performance.now();
    
    const content = this.renderContent();
    
    // Track render performance
    const renderTime = performance.now() - startTime;
    
    // Log slow renders in development
    if (process.env.NODE_ENV === 'development' && renderTime > 5) {
      console.warn(`🐌 Slow render detected: ${this.tagName} took ${renderTime.toFixed(2)}ms`);
    }
    
    return content;
  }
}
```

---

## 🔗 Additional Resources

- **[Performance Dashboard API Reference](./performance-dashboard-api.md)** - Complete API documentation
- **[Performance Monitoring Guide](./performance-monitoring.md)** - Comprehensive monitoring setup
- **[Component Performance Guide](./component-performance.md)** - Optimization techniques
- **[Performance Testing Guide](./performance-testing.md)** - Testing strategies
- **[Examples Repository](../examples/)** - Complete working examples

---

*Performance Dashboard is a core differentiator that makes @nexcraft/forge the only component library with built-in real-time performance monitoring. No external tools or complex setup required - just add the dashboard and watch your components' performance in real-time.*