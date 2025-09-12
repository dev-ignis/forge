# ForgeProgress

Linear progress indicator component for displaying task completion, loading states, and process visualization.

## Overview

The ForgeProgress component provides a flexible linear progress bar with support for determinate and indeterminate states. It includes multiple variants, size options, and accessibility features while maintaining high performance and responsive design.

## Key Features

- **Progress States**: Determinate (specific value) and indeterminate (loading) modes
- **Multiple Variants**: Primary, secondary, success, warning, and error styles
- **Size Options**: Small, medium, and large sizes
- **Value Display**: Optional percentage text display
- **Responsive Design**: Adapts to container width
- **Accessibility**: Full ARIA support with screen reader compatibility
- **Animation**: Smooth transitions and indeterminate animations
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

### Determinate Progress

```html
<!-- Basic progress bar -->
<forge-progress value="75"></forge-progress>

<!-- With variant and label -->
<forge-progress 
  value="60" 
  variant="success" 
  label="Upload Progress"
  show-value="true">
</forge-progress>
```

### Indeterminate Progress

```html
<!-- Loading state -->
<forge-progress indeterminate="true" label="Loading..."></forge-progress>

<!-- With custom variant -->
<forge-progress 
  indeterminate="true" 
  variant="primary" 
  size="large"
  label="Processing request">
</forge-progress>
```

## Advanced Usage

### Custom Styling and Behavior

```html
<forge-progress
  value="45"
  min="0"
  max="100"
  variant="warning"
  size="large"
  label="Disk Usage"
  show-value="true"
  animated="true"
  aria-describedby="progress-help"
>
</forge-progress>

<div id="progress-help">Current disk usage is at 45% capacity</div>
```

### Dynamic Progress Updates

```html
<forge-progress id="upload-progress" variant="primary" show-value="true"></forge-progress>

<script>
  const progress = document.getElementById('upload-progress');
  let currentValue = 0;
  
  // Simulate progress updates
  const interval = setInterval(() => {
    currentValue += 10;
    progress.value = currentValue;
    
    if (currentValue >= 100) {
      clearInterval(interval);
      progress.variant = 'success';
    }
  }, 500);
</script>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `number` | `0` | Current progress value (0-max) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Progress bar size |
| `indeterminate` | `boolean` | `false` | Shows loading animation when true |
| `label` | `string` | `''` | Accessible label for the progress |
| `showValue` | `boolean` | `false` | Display percentage value |
| `animated` | `boolean` | `true` | Enable smooth transitions |

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
forge-progress {
  /* Track (background) */
  --progress-track-bg: var(--forge-color-neutral-200);
  --progress-track-height: 8px;
  --progress-track-border-radius: 4px;
  
  /* Bar (fill) */
  --progress-bar-bg: var(--forge-color-primary-500);
  --progress-bar-border-radius: 4px;
  
  /* Variants */
  --progress-primary-bg: var(--forge-color-primary-500);
  --progress-secondary-bg: var(--forge-color-secondary-500);
  --progress-success-bg: var(--forge-color-success-500);
  --progress-warning-bg: var(--forge-color-warning-500);
  --progress-error-bg: var(--forge-color-error-500);
  
  /* Sizes */
  --progress-small-height: 4px;
  --progress-medium-height: 8px;
  --progress-large-height: 12px;
  
  /* Animation */
  --progress-transition-duration: 250ms;
  --progress-transition-timing: ease-out;
  --progress-indeterminate-duration: 2s;
  
  /* Value display */
  --progress-value-font-size: var(--forge-font-size-sm);
  --progress-value-color: var(--forge-color-neutral-700);
  --progress-value-spacing: 8px;
}
```

## Accessibility

### ARIA Support

- **Progressive Enhancement**: Uses semantic HTML with ARIA enhancements
- **Role**: Automatically sets `role="progressbar"`
- **Value Attributes**: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Labels**: Supports `aria-label` and `aria-labelledby`
- **Descriptions**: Links to descriptive text with `aria-describedby`
- **Live Regions**: Announces changes to screen readers

### Screen Reader Support

```html
<!-- Accessible progress with description -->
<forge-progress 
  value="75" 
  label="File upload progress"
  aria-describedby="upload-status"
>
</forge-progress>
<div id="upload-status">3 of 4 files uploaded</div>
```

## Framework Integration

### React

```tsx
import { useState, useEffect } from 'react';

function UploadProgress({ file }: { file: File }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 10;
        return next > 100 ? 100 : next;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <forge-progress 
      value={progress}
      variant={progress === 100 ? 'success' : 'primary'}
      label={`Uploading ${file.name}`}
      show-value="true"
    />
  );
}
```

### Vue

```vue
<template>
  <div>
    <forge-progress 
      :value="uploadProgress"
      :variant="progressVariant"
      label="Upload Progress"
      show-value="true"
    />
    <button @click="startUpload" :disabled="isUploading">
      {{ isUploading ? 'Uploading...' : 'Start Upload' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const uploadProgress = ref(0);
const isUploading = ref(false);

const progressVariant = computed(() => {
  if (uploadProgress.value === 100) return 'success';
  if (uploadProgress.value > 75) return 'warning';
  return 'primary';
});

const startUpload = async () => {
  isUploading.value = true;
  uploadProgress.value = 0;
  
  // Simulate upload
  const interval = setInterval(() => {
    uploadProgress.value += 5;
    if (uploadProgress.value >= 100) {
      clearInterval(interval);
      isUploading.value = false;
    }
  }, 100);
};
</script>
```

### Angular

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-progress',
  template: `
    <div class="progress-container">
      <forge-progress 
        [value]="progress"
        [variant]="variant"
        [label]="label"
        show-value="true">
      </forge-progress>
      <div class="progress-actions">
        <button (click)="pause()" [disabled]="!isRunning">Pause</button>
        <button (click)="resume()" [disabled]="isRunning">Resume</button>
        <button (click)="cancel()">Cancel</button>
      </div>
    </div>
  `
})
export class TaskProgressComponent {
  @Input() taskName = '';
  
  progress = 0;
  isRunning = false;
  variant: 'primary' | 'success' | 'error' = 'primary';
  
  get label() {
    return `${this.taskName} - ${this.progress}% complete`;
  }
  
  start() {
    this.isRunning = true;
    this.simulateProgress();
  }
  
  private simulateProgress() {
    if (!this.isRunning) return;
    
    setTimeout(() => {
      this.progress += Math.random() * 10;
      if (this.progress >= 100) {
        this.progress = 100;
        this.variant = 'success';
        this.isRunning = false;
      } else {
        this.simulateProgress();
      }
    }, 200);
  }
}
```

## Examples

### File Upload Progress

```html
<div class="upload-container">
  <forge-progress 
    id="upload-progress"
    variant="primary" 
    label="Uploading files"
    show-value="true">
  </forge-progress>
  <div class="upload-status">
    <span id="file-status">Ready to upload</span>
    <button onclick="simulateUpload()">Start Upload</button>
  </div>
</div>

<script>
  function simulateUpload() {
    const progress = document.getElementById('upload-progress');
    const status = document.getElementById('file-status');
    
    progress.indeterminate = false;
    progress.value = 0;
    
    const files = ['image1.jpg', 'image2.jpg', 'document.pdf'];
    let currentFile = 0;
    
    function uploadFile() {
      if (currentFile >= files.length) {
        progress.variant = 'success';
        status.textContent = 'All files uploaded successfully!';
        return;
      }
      
      status.textContent = `Uploading ${files[currentFile]}...`;
      
      const interval = setInterval(() => {
        progress.value += Math.random() * 15;
        
        if (progress.value >= 100) {
          clearInterval(interval);
          progress.value = 100;
          currentFile++;
          
          setTimeout(() => {
            progress.value = 0;
            uploadFile();
          }, 500);
        }
      }, 100);
    }
    
    uploadFile();
  }
</script>
```

### Multi-Step Process

```html
<div class="wizard-progress">
  <h3>Account Setup Progress</h3>
  <forge-progress 
    value="33" 
    variant="primary"
    label="Setup Progress"
    show-value="true">
  </forge-progress>
  
  <div class="steps">
    <div class="step completed">✓ Personal Information</div>
    <div class="step active">📧 Email Verification</div>
    <div class="step">🔒 Security Settings</div>
  </div>
</div>

<style>
  .wizard-progress {
    max-width: 400px;
    padding: 20px;
  }
  
  .steps {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .step {
    padding: 8px 12px;
    border-radius: 4px;
    background: var(--forge-color-neutral-100);
  }
  
  .step.completed {
    background: var(--forge-color-success-100);
    color: var(--forge-color-success-800);
  }
  
  .step.active {
    background: var(--forge-color-primary-100);
    color: var(--forge-color-primary-800);
    font-weight: 500;
  }
</style>
```

## AI Integration

### State Explanation

```typescript
const progress = document.querySelector('forge-progress');
console.log(progress.explainState());
// "Progress bar showing 75% completion, primary variant, determinate state"
```

### Possible Actions

```typescript
const actions = progress.getPossibleActions();
// [
//   { name: 'setValue', available: true, description: 'Update progress value' },
//   { name: 'reset', available: true, description: 'Reset to minimum value' },
//   { name: 'setComplete', available: true, description: 'Set to maximum value' }
// ]
```

## Performance

- **Lightweight**: <3KB gzipped
- **Efficient Animations**: CSS-based animations with hardware acceleration
- **No Dependencies**: Pure Web Components implementation
- **Memory Efficient**: Automatic cleanup and optimized rendering

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Custom Elements**: Full Custom Elements v1 support
- **CSS Features**: Modern CSS with graceful fallbacks

## Related Components

- **[ForgeProgressCircle](./progress-circle.md)** - Circular progress variant
- **[ForgeSkeleton](./skeleton.md)** - Loading state placeholders
- **[ForgeSpinner](./spinner.md)** - Indeterminate loading indicators