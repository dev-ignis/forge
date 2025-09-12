# ForgeProgressCircle

Circular progress indicator component for compact progress visualization with customizable appearance and animations.

## Overview

The ForgeProgressCircle component provides a space-efficient circular progress indicator perfect for dashboards, compact layouts, and visual progress displays. It supports determinate and indeterminate states with customizable size, stroke width, and color variants.

## Key Features

- **Circular Design**: Space-efficient circular progress visualization
- **Multiple Sizes**: Small, medium, large, and extra-large options
- **Stroke Customization**: Configurable stroke width and style
- **Progress States**: Determinate (specific value) and indeterminate (spinning) modes
- **Value Display**: Optional centered percentage or custom content
- **Color Variants**: Multiple color schemes and custom colors
- **Smooth Animations**: CSS-based transitions and rotations
- **Accessibility**: Full ARIA support for screen readers
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

### Determinate Progress

```html
<!-- Basic circular progress -->
<forge-progress-circle value="75"></forge-progress-circle>

<!-- With size and variant -->
<forge-progress-circle 
  value="60" 
  size="large"
  variant="success" 
  show-value="true">
</forge-progress-circle>
```

### Indeterminate Progress

```html
<!-- Loading spinner -->
<forge-progress-circle indeterminate="true"></forge-progress-circle>

<!-- Custom loading with label -->
<forge-progress-circle 
  indeterminate="true" 
  size="large"
  variant="primary"
  aria-label="Loading content">
</forge-progress-circle>
```

## Advanced Usage

### Custom Content and Styling

```html
<forge-progress-circle
  value="85"
  size="xlarge"
  variant="success"
  stroke-width="6"
  track-color="#f0f0f0"
  progress-color="#22c55e"
  show-value="false"
>
  <div slot="content" class="custom-content">
    <div class="score">85</div>
    <div class="label">Score</div>
  </div>
</forge-progress-circle>

<style>
  .custom-content {
    text-align: center;
  }
  .score {
    font-size: 24px;
    font-weight: bold;
    color: #22c55e;
  }
  .label {
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
  }
</style>
```

### Dashboard Metrics

```html
<div class="metrics-grid">
  <div class="metric">
    <forge-progress-circle 
      value="78" 
      size="large" 
      variant="primary"
      show-value="true"
      aria-label="CPU Usage">
    </forge-progress-circle>
    <div class="metric-label">CPU</div>
  </div>
  
  <div class="metric">
    <forge-progress-circle 
      value="45" 
      size="large" 
      variant="success"
      show-value="true"
      aria-label="Memory Usage">
    </forge-progress-circle>
    <div class="metric-label">Memory</div>
  </div>
  
  <div class="metric">
    <forge-progress-circle 
      value="92" 
      size="large" 
      variant="warning"
      show-value="true"
      aria-label="Disk Usage">
    </forge-progress-circle>
    <div class="metric-label">Disk</div>
  </div>
</div>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `number` | `0` | Current progress value (0-max) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | Circle size |
| `strokeWidth` | `number` | `4` | Stroke width in pixels |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Color variant |
| `indeterminate` | `boolean` | `false` | Shows spinning animation when true |
| `showValue` | `boolean` | `false` | Display percentage in center |
| `trackColor` | `string` | `undefined` | Custom track (background) color |
| `progressColor` | `string` | `undefined` | Custom progress color |
| `lineCap` | `'round' \| 'square' \| 'butt'` | `'round'` | Stroke line cap style |
| `clockwise` | `boolean` | `true` | Progress direction |
| `animated` | `boolean` | `true` | Enable smooth transitions |

## Slots

| Slot | Description |
|------|-------------|
| `content` | Custom content to display in the center |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `progress-change` | `{ value: number, percentage: number }` | Fired when value changes |
| `progress-complete` | `{ value: number }` | Fired when progress reaches maximum |

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `setValue(value)` | `number` | `void` | Update progress value with validation |
| `reset()` | - | `void` | Reset progress to minimum value |
| `setComplete()` | - | `void` | Set progress to maximum value |

## CSS Custom Properties

```css
forge-progress-circle {
  /* Circle dimensions */
  --progress-circle-size: 64px;
  --progress-circle-stroke-width: 4px;
  
  /* Colors */
  --progress-circle-track-color: var(--forge-color-neutral-200);
  --progress-circle-progress-color: var(--forge-color-primary-500);
  
  /* Size variants */
  --progress-circle-small-size: 32px;
  --progress-circle-medium-size: 64px;
  --progress-circle-large-size: 96px;
  --progress-circle-xlarge-size: 128px;
  
  /* Stroke variants */
  --progress-circle-small-stroke: 3px;
  --progress-circle-medium-stroke: 4px;
  --progress-circle-large-stroke: 6px;
  --progress-circle-xlarge-stroke: 8px;
  
  /* Colors by variant */
  --progress-circle-primary: var(--forge-color-primary-500);
  --progress-circle-secondary: var(--forge-color-secondary-500);
  --progress-circle-success: var(--forge-color-success-500);
  --progress-circle-warning: var(--forge-color-warning-500);
  --progress-circle-error: var(--forge-color-error-500);
  
  /* Animation */
  --progress-circle-transition-duration: 300ms;
  --progress-circle-transition-timing: ease-out;
  --progress-circle-spin-duration: 2s;
  
  /* Value display */
  --progress-circle-value-font-size: var(--forge-font-size-sm);
  --progress-circle-value-font-weight: 600;
  --progress-circle-value-color: var(--forge-color-neutral-700);
}
```

## Accessibility

### ARIA Support

- **Role**: Automatically sets `role="progressbar"`
- **Value Attributes**: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Labels**: Supports `aria-label` and `aria-labelledby`
- **Descriptions**: Links to descriptive text with `aria-describedby`
- **Live Updates**: Screen reader announcements for value changes

### Visual Accessibility

- **High Contrast**: Sufficient color contrast ratios
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Focus Indicators**: Clear focus states when interactive

## Framework Integration

### React

```tsx
import { useState, useEffect } from 'react';

interface MetricCircleProps {
  label: string;
  value: number;
  maxValue: number;
  variant?: 'primary' | 'success' | 'warning' | 'error';
}

function MetricCircle({ label, value, maxValue, variant = 'primary' }: MetricCircleProps) {
  const percentage = Math.round((value / maxValue) * 100);
  
  return (
    <div className="metric-container">
      <forge-progress-circle
        value={percentage}
        size="large"
        variant={variant}
        show-value="false"
        aria-label={`${label}: ${percentage}%`}
      >
        <div slot="content" className="metric-content">
          <div className="metric-value">{value}</div>
          <div className="metric-max">/{maxValue}</div>
        </div>
      </forge-progress-circle>
      <div className="metric-label">{label}</div>
    </div>
  );
}

// Usage
<MetricCircle label="Tasks" value={15} maxValue={20} variant="primary" />
```

### Vue

```vue
<template>
  <div class="dashboard">
    <div v-for="metric in metrics" :key="metric.id" class="metric">
      <forge-progress-circle
        :value="metric.percentage"
        :variant="getVariant(metric.percentage)"
        size="large"
        show-value="true"
        :aria-label="`${metric.name}: ${metric.percentage}%`"
      />
      <div class="metric-info">
        <div class="metric-name">{{ metric.name }}</div>
        <div class="metric-details">{{ metric.current }}/{{ metric.total }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const metrics = ref([
  { id: 1, name: 'CPU', current: 78, total: 100 },
  { id: 2, name: 'Memory', current: 6.2, total: 16 },
  { id: 3, name: 'Storage', current: 450, total: 500 }
]);

const getVariant = (percentage) => {
  if (percentage >= 90) return 'error';
  if (percentage >= 75) return 'warning';
  if (percentage >= 50) return 'primary';
  return 'success';
};

// Add computed percentage property
metrics.value = metrics.value.map(metric => ({
  ...metric,
  percentage: Math.round((metric.current / metric.total) * 100)
}));
</script>
```

### Angular

```typescript
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-indicator',
  template: `
    <div class="loading-container">
      <forge-progress-circle 
        [value]="progress"
        [indeterminate]="isIndeterminate"
        size="large"
        variant="primary"
        [aria-label]="loadingLabel">
      </forge-progress-circle>
      
      <div class="loading-text">
        {{ loadingMessage }}
        <div class="loading-details" *ngIf="showDetails">
          {{ currentStep }} of {{ totalSteps }} completed
        </div>
      </div>
      
      <button (click)="cancel()" class="cancel-btn">Cancel</button>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 24px;
    }
    .loading-text {
      text-align: center;
    }
    .loading-details {
      font-size: 0.875rem;
      color: var(--forge-color-neutral-600);
      margin-top: 4px;
    }
  `]
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
  @Input() loadingMessage = 'Processing...';
  @Input() totalSteps = 5;
  @Input() showDetails = true;
  
  progress = 0;
  currentStep = 0;
  isIndeterminate = false;
  private subscription?: Subscription;
  
  get loadingLabel() {
    return `${this.loadingMessage} - ${this.progress}% complete`;
  }
  
  ngOnInit() {
    this.startProgress();
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  
  private startProgress() {
    this.subscription = interval(800).subscribe((step) => {
      this.currentStep = step + 1;
      this.progress = Math.min((this.currentStep / this.totalSteps) * 100, 100);
      
      if (this.currentStep >= this.totalSteps) {
        this.subscription?.unsubscribe();
      }
    });
  }
  
  cancel() {
    this.subscription?.unsubscribe();
    // Emit cancellation event
  }
}
```

## Examples

### Download Progress

```html
<div class="download-progress">
  <forge-progress-circle 
    id="download-circle"
    size="xlarge" 
    variant="primary"
    show-value="false"
    aria-label="Download progress">
    <div slot="content" class="download-content">
      <div class="download-percent">0%</div>
      <div class="download-speed">-- MB/s</div>
    </div>
  </forge-progress-circle>
  
  <div class="download-info">
    <div class="filename" id="filename">file.zip</div>
    <div class="status" id="status">Preparing download...</div>
  </div>
  
  <button onclick="startDownload()">Start Download</button>
</div>

<script>
  function startDownload() {
    const circle = document.getElementById('download-circle');
    const percentText = circle.querySelector('.download-percent');
    const speedText = circle.querySelector('.download-speed');
    const status = document.getElementById('status');
    
    let progress = 0;
    status.textContent = 'Downloading...';
    
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      const speed = (Math.random() * 2 + 1).toFixed(1);
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        circle.variant = 'success';
        status.textContent = 'Download complete!';
        speedText.textContent = 'Complete';
      } else {
        speedText.textContent = `${speed} MB/s`;
      }
      
      circle.value = progress;
      percentText.textContent = `${Math.round(progress)}%`;
    }, 200);
  }
</script>
```

### Skill Level Indicators

```html
<div class="skills-section">
  <h3>Technical Skills</h3>
  <div class="skills-grid">
    <div class="skill">
      <forge-progress-circle value="90" size="medium" variant="success" show-value="true"></forge-progress-circle>
      <span class="skill-name">JavaScript</span>
    </div>
    
    <div class="skill">
      <forge-progress-circle value="75" size="medium" variant="primary" show-value="true"></forge-progress-circle>
      <span class="skill-name">TypeScript</span>
    </div>
    
    <div class="skill">
      <forge-progress-circle value="60" size="medium" variant="warning" show-value="true"></forge-progress-circle>
      <span class="skill-name">Python</span>
    </div>
  </div>
</div>

<style>
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 24px;
    margin-top: 16px;
  }
  
  .skill {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .skill-name {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
</style>
```

## AI Integration

### State Explanation

```typescript
const circle = document.querySelector('forge-progress-circle');
console.log(circle.explainState());
// "Circular progress at 75%, large size, primary variant, determinate mode"
```

### Possible Actions

```typescript
const actions = circle.getPossibleActions();
// [
//   { name: 'setValue', available: true, description: 'Update progress value' },
//   { name: 'reset', available: true, description: 'Reset to minimum' },
//   { name: 'setComplete', available: true, description: 'Complete progress' }
// ]
```

## Performance

- **Lightweight**: <4KB gzipped
- **SVG-based**: Scalable and crisp at any size
- **Hardware Accelerated**: Smooth CSS animations
- **Memory Efficient**: Minimal DOM footprint

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **SVG Support**: Full SVG 1.1 support required
- **Custom Elements**: Custom Elements v1 support

## Related Components

- **[ForgeProgress](./progress.md)** - Linear progress variant
- **[ForgeSkeleton](./skeleton.md)** - Loading state placeholders
- **[ForgeSpinner](./spinner.md)** - Simple loading indicators