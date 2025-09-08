# ForgeSkeleton

Loading placeholder component that displays animated shimmer effects while content is being loaded to improve perceived performance.

## Overview

The ForgeSkeleton component provides elegant loading state placeholders that mimic the structure of content being loaded. It features smooth shimmer animations, multiple shape variants, and customizable dimensions to match any content layout.

## Key Features

- **Shape Variants**: Rounded, square, circle, and text shapes
- **Custom Dimensions**: Flexible width and height sizing
- **Shimmer Animation**: Smooth gradient animation effect
- **Multiple Instances**: Easy composition for complex layouts
- **Accessibility**: Proper ARIA labels and reduced motion support
- **Performance**: Lightweight CSS animations
- **Responsive**: Adapts to container and screen sizes
- **AI-Ready**: Complete AI metadata for loading state context

## Basic Usage

### Simple Placeholders

```html
<!-- Text line placeholder -->
<forge-skeleton width="200px" height="16px"></forge-skeleton>

<!-- Button placeholder -->
<forge-skeleton width="100px" height="36px" shape="rounded"></forge-skeleton>

<!-- Avatar placeholder -->
<forge-skeleton width="48px" height="48px" shape="circle"></forge-skeleton>
```

### Card Layout Skeleton

```html
<div class="card-skeleton">
  <forge-skeleton width="100%" height="200px" shape="rounded"></forge-skeleton>
  <div class="card-content">
    <forge-skeleton width="80%" height="20px"></forge-skeleton>
    <forge-skeleton width="100%" height="16px"></forge-skeleton>
    <forge-skeleton width="60%" height="16px"></forge-skeleton>
  </div>
</div>
```

## Advanced Usage

### Complex Layout Skeletons

```html
<div class="profile-skeleton">
  <!-- Profile header -->
  <div class="profile-header">
    <forge-skeleton width="80px" height="80px" shape="circle"></forge-skeleton>
    <div class="profile-info">
      <forge-skeleton width="150px" height="24px"></forge-skeleton>
      <forge-skeleton width="100px" height="16px"></forge-skeleton>
      <forge-skeleton width="200px" height="14px"></forge-skeleton>
    </div>
  </div>
  
  <!-- Content sections -->
  <div class="profile-content">
    <forge-skeleton width="100%" height="120px" shape="rounded"></forge-skeleton>
    
    <div class="profile-stats">
      <forge-skeleton width="80px" height="60px" shape="rounded"></forge-skeleton>
      <forge-skeleton width="80px" height="60px" shape="rounded"></forge-skeleton>
      <forge-skeleton width="80px" height="60px" shape="rounded"></forge-skeleton>
    </div>
  </div>
</div>
```

### Table Skeleton

```html
<div class="table-skeleton">
  <div class="table-header">
    <forge-skeleton width="120px" height="16px"></forge-skeleton>
    <forge-skeleton width="100px" height="16px"></forge-skeleton>
    <forge-skeleton width="80px" height="16px"></forge-skeleton>
    <forge-skeleton width="90px" height="16px"></forge-skeleton>
  </div>
  
  <div class="table-rows">
    <div class="table-row" v-for="i in 5">
      <forge-skeleton width="120px" height="14px"></forge-skeleton>
      <forge-skeleton width="100px" height="14px"></forge-skeleton>
      <forge-skeleton width="80px" height="14px"></forge-skeleton>
      <forge-skeleton width="60px" height="32px" shape="rounded"></forge-skeleton>
    </div>
  </div>
</div>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `string` | `'100%'` | Width of skeleton element |
| `height` | `string` | `'1rem'` | Height of skeleton element |
| `shape` | `'rounded' \| 'square' \| 'circle' \| 'text'` | `'rounded'` | Shape variant |
| `animated` | `boolean` | `true` | Enable shimmer animation |
| `count` | `number` | `1` | Number of skeleton lines (for text) |
| `spacing` | `string` | `'0.5rem'` | Space between multiple lines |

## CSS Custom Properties

```css
forge-skeleton {
  /* Base colors */
  --skeleton-base-color: var(--forge-color-neutral-200);
  --skeleton-highlight-color: var(--forge-color-neutral-300);
  --skeleton-shimmer-color: rgba(255, 255, 255, 0.8);
  
  /* Shape variants */
  --skeleton-border-radius-rounded: 6px;
  --skeleton-border-radius-square: 0px;
  --skeleton-border-radius-circle: 50%;
  --skeleton-border-radius-text: 4px;
  
  /* Animation */
  --skeleton-animation-duration: 2s;
  --skeleton-animation-timing: ease-in-out;
  --skeleton-shimmer-gradient: linear-gradient(
    90deg,
    transparent,
    var(--skeleton-shimmer-color),
    transparent
  );
  
  /* Responsive breakpoints */
  --skeleton-mobile-spacing: 0.25rem;
  --skeleton-tablet-spacing: 0.375rem;
  --skeleton-desktop-spacing: 0.5rem;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  forge-skeleton {
    --skeleton-base-color: var(--forge-color-neutral-700);
    --skeleton-highlight-color: var(--forge-color-neutral-600);
    --skeleton-shimmer-color: rgba(255, 255, 255, 0.1);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  forge-skeleton {
    --skeleton-animation-duration: 0s;
  }
}
```

## Accessibility

### ARIA Support

- **Role**: Automatically sets appropriate ARIA roles
- **Labels**: Provides `aria-label="Loading content"` by default
- **Live Regions**: Can announce loading state changes
- **Reduced Motion**: Respects `prefers-reduced-motion` settings

### Screen Reader Support

```html
<!-- With custom aria label -->
<forge-skeleton 
  width="200px" 
  height="20px"
  aria-label="Loading article title">
</forge-skeleton>

<!-- Hidden from screen readers when appropriate -->
<forge-skeleton 
  width="48px" 
  height="48px" 
  shape="circle"
  aria-hidden="true">
</forge-skeleton>
```

## Framework Integration

### React

```tsx
import React from 'react';

interface SkeletonCardProps {
  count?: number;
}

function SkeletonCard({ count = 1 }: SkeletonCardProps) {
  return (
    <div className="skeleton-cards">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="skeleton-card">
          <forge-skeleton width="100%" height="160px" shape="rounded" />
          <div className="skeleton-card-content">
            <forge-skeleton width="100%" height="20px" />
            <forge-skeleton width="80%" height="16px" />
            <forge-skeleton width="60%" height="16px" />
            <div className="skeleton-card-actions">
              <forge-skeleton width="80px" height="32px" shape="rounded" />
              <forge-skeleton width="80px" height="32px" shape="rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Usage with loading state
function ArticleList() {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    fetchArticles().then(data => {
      setArticles(data);
      setLoading(false);
    });
  }, []);
  
  if (loading) {
    return <SkeletonCard count={6} />;
  }
  
  return (
    <div className="articles">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
```

### Vue

```vue
<template>
  <div class="user-profile">
    <div v-if="loading" class="profile-skeleton">
      <!-- Profile header skeleton -->
      <div class="profile-header-skeleton">
        <forge-skeleton width="80px" height="80px" shape="circle" />
        <div class="profile-info-skeleton">
          <forge-skeleton width="150px" height="24px" />
          <forge-skeleton width="100px" height="16px" />
          <forge-skeleton width="200px" height="14px" />
        </div>
      </div>
      
      <!-- Profile content skeleton -->
      <div class="profile-content-skeleton">
        <forge-skeleton 
          v-for="i in 3" 
          :key="i"
          width="100%" 
          height="80px" 
          shape="rounded" 
        />
      </div>
    </div>
    
    <div v-else class="profile-content">
      <!-- Actual profile content -->
      <ProfileHeader :user="user" />
      <ProfileDetails :user="user" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const user = ref<User | null>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    user.value = await fetchUser();
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.profile-header-skeleton {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
}

.profile-info-skeleton {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile-content-skeleton {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

### Angular

```typescript
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skeleton-loader',
  template: `
    <div class="skeleton-container" *ngIf="loading; else content">
      <div class="skeleton-item" *ngFor="let item of skeletonItems">
        <forge-skeleton 
          [width]="item.width"
          [height]="item.height"
          [shape]="item.shape">
        </forge-skeleton>
      </div>
    </div>
    
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [`
    .skeleton-container {
      display: flex;
      flex-direction: column;
      gap: var(--skeleton-spacing, 12px);
    }
    
    .skeleton-item {
      display: flex;
      gap: 8px;
    }
  `]
})
export class SkeletonLoaderComponent {
  @Input() loading = true;
  @Input() type: 'list' | 'card' | 'table' | 'profile' = 'list';
  @Input() count = 3;
  
  get skeletonItems() {
    const templates = {
      list: [
        { width: '100%', height: '20px', shape: 'rounded' },
        { width: '80%', height: '16px', shape: 'rounded' },
        { width: '60%', height: '16px', shape: 'rounded' }
      ],
      card: [
        { width: '100%', height: '160px', shape: 'rounded' },
        { width: '100%', height: '24px', shape: 'rounded' },
        { width: '70%', height: '16px', shape: 'rounded' }
      ],
      profile: [
        { width: '80px', height: '80px', shape: 'circle' },
        { width: '150px', height: '24px', shape: 'rounded' },
        { width: '100px', height: '16px', shape: 'rounded' }
      ],
      table: [
        { width: '120px', height: '16px', shape: 'rounded' },
        { width: '100px', height: '16px', shape: 'rounded' },
        { width: '80px', height: '16px', shape: 'rounded' }
      ]
    };
    
    return Array(this.count).fill(templates[this.type]).flat();
  }
}

// Usage
@Component({
  template: `
    <app-skeleton-loader [loading]="isLoading" type="card" [count]="6">
      <div class="cards-grid">
        <app-card *ngFor="let item of items" [data]="item"></app-card>
      </div>
    </app-skeleton-loader>
  `
})
export class ProductListComponent implements OnInit {
  items: any[] = [];
  isLoading = true;
  
  ngOnInit() {
    this.loadItems().subscribe(data => {
      this.items = data;
      this.isLoading = false;
    });
  }
}
```

## Examples

### Article List Skeleton

```html
<div class="article-list-skeleton">
  <div class="article-skeleton" v-for="i in 5">
    <!-- Article image -->
    <forge-skeleton width="100%" height="200px" shape="rounded"></forge-skeleton>
    
    <!-- Article content -->
    <div class="article-content-skeleton">
      <!-- Category -->
      <forge-skeleton width="80px" height="14px" shape="rounded"></forge-skeleton>
      
      <!-- Title -->
      <forge-skeleton width="100%" height="24px"></forge-skeleton>
      <forge-skeleton width="80%" height="24px"></forge-skeleton>
      
      <!-- Description -->
      <forge-skeleton width="100%" height="16px"></forge-skeleton>
      <forge-skeleton width="100%" height="16px"></forge-skeleton>
      <forge-skeleton width="60%" height="16px"></forge-skeleton>
      
      <!-- Meta info -->
      <div class="article-meta-skeleton">
        <forge-skeleton width="32px" height="32px" shape="circle"></forge-skeleton>
        <forge-skeleton width="100px" height="14px"></forge-skeleton>
        <forge-skeleton width="80px" height="14px"></forge-skeleton>
      </div>
    </div>
  </div>
</div>

<style>
  .article-list-skeleton {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .article-skeleton {
    border: 1px solid var(--forge-color-neutral-200);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .article-content-skeleton {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .article-meta-skeleton {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }
</style>
```

### Dashboard Widget Skeleton

```html
<div class="dashboard-skeleton">
  <div class="dashboard-header-skeleton">
    <forge-skeleton width="200px" height="32px"></forge-skeleton>
    <forge-skeleton width="120px" height="36px" shape="rounded"></forge-skeleton>
  </div>
  
  <div class="dashboard-stats-skeleton">
    <div class="stat-card-skeleton" v-for="i in 4">
      <forge-skeleton width="100%" height="60px" shape="rounded"></forge-skeleton>
      <forge-skeleton width="80px" height="24px"></forge-skeleton>
      <forge-skeleton width="60px" height="16px"></forge-skeleton>
    </div>
  </div>
  
  <div class="dashboard-chart-skeleton">
    <forge-skeleton width="100%" height="300px" shape="rounded"></forge-skeleton>
  </div>
  
  <div class="dashboard-table-skeleton">
    <div class="table-header-skeleton">
      <forge-skeleton width="100px" height="16px" v-for="i in 4"></forge-skeleton>
    </div>
    <div class="table-row-skeleton" v-for="i in 8">
      <forge-skeleton width="100px" height="14px"></forge-skeleton>
      <forge-skeleton width="120px" height="14px"></forge-skeleton>
      <forge-skeleton width="80px" height="14px"></forge-skeleton>
      <forge-skeleton width="60px" height="24px" shape="rounded"></forge-skeleton>
    </div>
  </div>
</div>
```

## AI Integration

### State Explanation

```typescript
const skeleton = document.querySelector('forge-skeleton');
console.log(skeleton.explainState());
// "Loading placeholder, rounded shape, 200px width, animated shimmer effect active"
```

### Possible Actions

```typescript
const actions = skeleton.getPossibleActions();
// [
//   { name: 'toggleAnimation', available: true, description: 'Toggle shimmer animation' },
//   { name: 'changeShape', available: true, description: 'Change skeleton shape' }
// ]
```

## Performance

- **Lightweight**: <2KB gzipped
- **CSS Animations**: Hardware-accelerated animations
- **No Dependencies**: Pure CSS and Web Components
- **Memory Efficient**: Minimal DOM impact

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **CSS Features**: CSS Grid, Custom Properties, Animations
- **Graceful Degradation**: Falls back to static placeholder

## Best Practices

### Layout Matching

```html
<!-- Match the actual content structure -->
<!-- Actual content -->
<div class="user-card">
  <img src="avatar.jpg" alt="User avatar" class="avatar">
  <div class="user-info">
    <h3 class="user-name">John Doe</h3>
    <p class="user-role">Developer</p>
    <p class="user-location">San Francisco, CA</p>
  </div>
</div>

<!-- Matching skeleton -->
<div class="user-card">
  <forge-skeleton width="48px" height="48px" shape="circle" class="avatar"></forge-skeleton>
  <div class="user-info">
    <forge-skeleton width="120px" height="20px" class="user-name"></forge-skeleton>
    <forge-skeleton width="80px" height="16px" class="user-role"></forge-skeleton>
    <forge-skeleton width="140px" height="16px" class="user-location"></forge-skeleton>
  </div>
</div>
```

### Progressive Loading

```javascript
// Show skeleton initially
function showSkeleton() {
  document.getElementById('content').innerHTML = `
    <div class="skeleton-container">
      ${Array(5).fill('<forge-skeleton width="100%" height="60px"></forge-skeleton>').join('')}
    </div>
  `;
}

// Replace with content as it loads
function loadContent() {
  showSkeleton();
  
  fetchData().then(data => {
    const content = data.map(item => `
      <div class="content-item">${item.title}</div>
    `).join('');
    
    document.getElementById('content').innerHTML = content;
  });
}
```

## Related Components

- **[ForgeProgress](./progress.md)** - Progress indicators for determinate loading
- **[ForgeSpinner](./spinner.md)** - Simple loading spinners
- **[ForgeCard](../molecules/card.md)** - Cards with skeleton loading states