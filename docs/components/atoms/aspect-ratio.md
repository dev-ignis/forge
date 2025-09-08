# ForgeAspectRatio

Responsive container component that maintains consistent aspect ratios for media content and layout elements.

## Overview

The ForgeAspectRatio component provides a flexible container that maintains specific width-to-height ratios regardless of screen size or container dimensions. Perfect for responsive images, videos, and maintaining consistent layouts across different devices.

## Key Features

- **Preset Ratios**: Common ratios like 16:9, 4:3, 1:1, and more
- **Custom Ratios**: Support for any width:height ratio
- **Responsive Design**: Maintains ratio across all screen sizes
- **Content Positioning**: Control how content is positioned within the container
- **Overflow Handling**: Options for handling oversized content
- **Multiple Use Cases**: Images, videos, cards, placeholder content
- **Accessibility**: Proper semantic structure and focus management
- **AI-Ready**: Complete AI metadata for layout context

## Basic Usage

### Preset Ratios

```html
<!-- 16:9 ratio (default) -->
<forge-aspect-ratio>
  <img src="landscape.jpg" alt="Landscape photo" />
</forge-aspect-ratio>

<!-- Square ratio -->
<forge-aspect-ratio ratio="1:1">
  <img src="profile.jpg" alt="Profile photo" />
</forge-aspect-ratio>

<!-- Portrait ratio -->
<forge-aspect-ratio ratio="3:4">
  <img src="portrait.jpg" alt="Portrait photo" />
</forge-aspect-ratio>
```

### Video Embed

```html
<forge-aspect-ratio ratio="16:9">
  <iframe 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="Video title"
    frameborder="0"
    allowfullscreen>
  </iframe>
</forge-aspect-ratio>
```

## Advanced Usage

### Custom Ratios and Positioning

```html
<forge-aspect-ratio 
  ratio="21:9"
  position="center"
  overflow="hidden"
  background="var(--forge-color-neutral-100)">
  
  <img 
    src="ultrawide-image.jpg" 
    alt="Ultrawide landscape"
    style="object-fit: cover; width: 100%; height: 100%;" />
</forge-aspect-ratio>
```

### Card Layout with Consistent Heights

```html
<div class="card-grid">
  <div class="card" v-for="item in items">
    <forge-aspect-ratio ratio="4:3" class="card-image">
      <img :src="item.image" :alt="item.title" />
    </forge-aspect-ratio>
    
    <div class="card-content">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</div>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .card {
    border: 1px solid var(--forge-color-neutral-200);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .card-image img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  
  .card-content {
    padding: 16px;
  }
</style>
```

### Placeholder Content

```html
<forge-aspect-ratio 
  ratio="16:9" 
  position="center"
  background="var(--forge-color-neutral-50)"
  border="2px dashed var(--forge-color-neutral-300)">
  
  <div class="placeholder-content">
    <forge-icon name="image" size="48"></forge-icon>
    <p>Drop image here or click to upload</p>
    <small>Recommended size: 1920x1080</small>
  </div>
</forge-aspect-ratio>

<style>
  .placeholder-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--forge-color-neutral-600);
    gap: 12px;
    padding: 24px;
  }
</style>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ratio` | `string` | `'16:9'` | Aspect ratio in format 'width:height' |
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'center-left' \| 'center' \| 'center-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'center'` | Content positioning |
| `overflow` | `'visible' \| 'hidden' \| 'scroll' \| 'auto'` | `'hidden'` | Overflow handling |
| `background` | `string` | `'transparent'` | Background color |
| `border` | `string` | `'none'` | Border styling |
| `minHeight` | `string` | `undefined` | Minimum height constraint |
| `maxHeight` | `string` | `undefined` | Maximum height constraint |

## Preset Ratios

| Ratio | Description | Common Use Cases |
|-------|-------------|------------------|
| `16:9` | Widescreen (Default) | Videos, hero images, banners |
| `4:3` | Traditional | Photos, presentations |
| `1:1` | Square | Profile pictures, social media |
| `3:2` | Classic photo | Photography, thumbnails |
| `21:9` | Ultrawide | Cinematic content, panoramas |
| `9:16` | Portrait/Mobile | Mobile screens, stories |
| `2:1` | Banner | Website headers, covers |
| `3:4` | Portrait photo | Vertical photography |
| `5:4` | Close to square | Product images |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `ratio-change` | `{ ratio: string, width: number, height: number }` | Fired when ratio changes |
| `content-resize` | `{ contentWidth: number, contentHeight: number }` | Fired when content size changes |

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `setRatio(ratio)` | `string` | `void` | Update aspect ratio |
| `getComputedDimensions()` | - | `{width: number, height: number}` | Get current computed dimensions |
| `fitContent()` | - | `void` | Adjust to fit content optimally |

## CSS Custom Properties

```css
forge-aspect-ratio {
  /* Container */
  --aspect-ratio-bg: transparent;
  --aspect-ratio-border: none;
  --aspect-ratio-border-radius: 0;
  --aspect-ratio-overflow: hidden;
  
  /* Positioning */
  --aspect-ratio-position: center;
  --aspect-ratio-justify: center;
  --aspect-ratio-align: center;
  
  /* Constraints */
  --aspect-ratio-min-height: 0;
  --aspect-ratio-max-height: none;
  --aspect-ratio-min-width: 0;
  --aspect-ratio-max-width: 100%;
  
  /* Content */
  --aspect-ratio-content-fit: contain;
  --aspect-ratio-content-position: center;
  
  /* Responsive breakpoints */
  --aspect-ratio-mobile: var(--aspect-ratio, 16/9);
  --aspect-ratio-tablet: var(--aspect-ratio, 16/9);
  --aspect-ratio-desktop: var(--aspect-ratio, 16/9);
}

/* Responsive ratio adjustments */
@media (max-width: 768px) {
  forge-aspect-ratio[mobile-ratio] {
    aspect-ratio: var(--aspect-ratio-mobile);
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  forge-aspect-ratio[tablet-ratio] {
    aspect-ratio: var(--aspect-ratio-tablet);
  }
}
```

## Accessibility

### Semantic Structure

- **Container Role**: Maintains semantic structure of content
- **Focus Management**: Proper focus handling for interactive content
- **Image Alt Text**: Preserves alt text and ARIA labels
- **Screen Reader**: Announces content within ratio containers

### Best Practices

```html
<!-- Image with proper alt text -->
<forge-aspect-ratio ratio="16:9" role="img" aria-label="Product showcase">
  <img src="product.jpg" alt="Red sneakers on white background" />
</forge-aspect-ratio>

<!-- Interactive content -->
<forge-aspect-ratio ratio="1:1">
  <button class="image-button" aria-label="View product details">
    <img src="thumbnail.jpg" alt="Product thumbnail" />
    <div class="overlay">
      <span>View Details</span>
    </div>
  </button>
</forge-aspect-ratio>
```

## Framework Integration

### React

```tsx
import React, { useState } from 'react';

interface MediaGalleryProps {
  images: Array<{
    id: string;
    src: string;
    alt: string;
    aspectRatio?: string;
  }>;
}

function MediaGallery({ images }: MediaGalleryProps) {
  const [selectedRatio, setSelectedRatio] = useState('16:9');
  
  return (
    <div className="media-gallery">
      <div className="ratio-selector">
        <label>Aspect Ratio:</label>
        <select 
          value={selectedRatio} 
          onChange={(e) => setSelectedRatio(e.target.value)}>
          <option value="16:9">16:9 (Widescreen)</option>
          <option value="4:3">4:3 (Traditional)</option>
          <option value="1:1">1:1 (Square)</option>
          <option value="3:2">3:2 (Photo)</option>
        </select>
      </div>
      
      <div className="gallery-grid">
        {images.map((image) => (
          <forge-aspect-ratio 
            key={image.id}
            ratio={image.aspectRatio || selectedRatio}
            position="center"
            className="gallery-item"
          >
            <img 
              src={image.src} 
              alt={image.alt}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
            />
          </forge-aspect-ratio>
        ))}
      </div>
    </div>
  );
}

// Responsive image component
interface ResponsiveImageProps {
  src: string;
  alt: string;
  desktopRatio?: string;
  mobileRatio?: string;
}

function ResponsiveImage({ 
  src, 
  alt, 
  desktopRatio = '16:9', 
  mobileRatio = '4:3' 
}: ResponsiveImageProps) {
  const [currentRatio, setCurrentRatio] = useState(desktopRatio);
  
  React.useEffect(() => {
    const updateRatio = () => {
      setCurrentRatio(window.innerWidth < 768 ? mobileRatio : desktopRatio);
    };
    
    updateRatio();
    window.addEventListener('resize', updateRatio);
    return () => window.removeEventListener('resize', updateRatio);
  }, [desktopRatio, mobileRatio]);
  
  return (
    <forge-aspect-ratio ratio={currentRatio}>
      <img src={src} alt={alt} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
    </forge-aspect-ratio>
  );
}
```

### Vue

```vue
<template>
  <div class="video-player">
    <forge-aspect-ratio 
      :ratio="videoRatio"
      position="center"
      class="video-container"
      @ratio-change="onRatioChange"
    >
      <video 
        ref="videoRef"
        :src="videoSrc"
        :poster="posterImage"
        controls
        @loadedmetadata="updateVideoRatio"
        style="width: 100%; height: 100%; object-fit: contain;"
      />
      
      <div v-if="loading" class="video-loading">
        <forge-skeleton width="100%" height="100%" />
      </div>
    </forge-aspect-ratio>
    
    <div class="video-controls">
      <button @click="toggleRatio">
        Toggle Ratio ({{ videoRatio }})
      </button>
      <select v-model="videoRatio">
        <option value="16:9">16:9 Widescreen</option>
        <option value="4:3">4:3 Standard</option>
        <option value="21:9">21:9 Cinematic</option>
        <option value="1:1">1:1 Square</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Props {
  videoSrc: string;
  posterImage?: string;
  defaultRatio?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultRatio: '16:9'
});

const videoRef = ref<HTMLVideoElement>();
const videoRatio = ref(props.defaultRatio);
const loading = ref(true);
const naturalRatio = ref<string | null>(null);

const ratioOptions = ['16:9', '4:3', '21:9', '1:1', '3:2'];

const updateVideoRatio = () => {
  if (videoRef.value) {
    const { videoWidth, videoHeight } = videoRef.value;
    if (videoWidth && videoHeight) {
      // Calculate closest standard ratio
      const aspectRatio = videoWidth / videoHeight;
      naturalRatio.value = `${videoWidth}:${videoHeight}`;
      
      // Find closest standard ratio
      const closestRatio = ratioOptions.reduce((closest, ratio) => {
        const [w, h] = ratio.split(':').map(Number);
        const ratioValue = w / h;
        const [cw, ch] = closest.split(':').map(Number);
        const closestValue = cw / ch;
        
        return Math.abs(aspectRatio - ratioValue) < Math.abs(aspectRatio - closestValue) 
          ? ratio : closest;
      });
      
      videoRatio.value = closestRatio;
    }
    loading.value = false;
  }
};

const toggleRatio = () => {
  const currentIndex = ratioOptions.indexOf(videoRatio.value);
  const nextIndex = (currentIndex + 1) % ratioOptions.length;
  videoRatio.value = ratioOptions[nextIndex];
};

const onRatioChange = (event: CustomEvent) => {
  console.log('Ratio changed:', event.detail);
};

onMounted(() => {
  if (videoRef.value?.readyState >= 1) {
    updateVideoRatio();
  }
});
</script>

<style scoped>
.video-player {
  max-width: 800px;
  margin: 0 auto;
}

.video-container {
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.video-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--forge-color-neutral-900);
}

.video-controls {
  display: flex;
  gap: 12px;
  margin-top: 12px;
  justify-content: center;
}
</style>
```

### Angular

```typescript
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-showcase',
  template: `
    <div class="image-showcase">
      <div class="showcase-header">
        <h3>{{ title }}</h3>
        <div class="ratio-controls">
          <label for="ratio-select">Aspect Ratio:</label>
          <select 
            id="ratio-select" 
            [(ngModel)]="currentRatio" 
            (change)="onRatioChange()">
            <option *ngFor="let option of ratioOptions" [value]="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      
      <forge-aspect-ratio 
        [ratio]="currentRatio"
        [position]="imagePosition"
        class="showcase-container"
        (ratio-change)="onContainerRatioChange($event)">
        
        <img 
          #imageRef
          [src]="imageSrc" 
          [alt]="imageAlt"
          (load)="onImageLoad()"
          (error)="onImageError()"
          [style.object-fit]="objectFit"
          [style.width]="'100%'"
          [style.height]="'100%'" />
          
        <div *ngIf="loading" class="loading-overlay">
          <forge-skeleton width="100%" height="100%"></forge-skeleton>
        </div>
        
        <div *ngIf="error" class="error-overlay">
          <forge-icon name="image-off" size="48"></forge-icon>
          <p>Failed to load image</p>
          <button (click)="retryLoad()">Retry</button>
        </div>
      </forge-aspect-ratio>
      
      <div class="showcase-info" *ngIf="showInfo">
        <div class="image-details">
          <span>Natural: {{ naturalDimensions }}</span>
          <span>Display: {{ displayRatio }}</span>
          <span>Fit: {{ objectFit }}</span>
        </div>
        
        <div class="fit-controls">
          <button 
            *ngFor="let fit of objectFitOptions"
            [class.active]="objectFit === fit"
            (click)="objectFit = fit">
            {{ fit }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .image-showcase {
      max-width: 600px;
      margin: 0 auto;
    }
    
    .showcase-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .ratio-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .showcase-container {
      border: 2px solid var(--forge-color-neutral-200);
      border-radius: 8px;
      overflow: hidden;
      position: relative;
    }
    
    .loading-overlay,
    .error-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--forge-color-neutral-50);
    }
    
    .error-overlay {
      color: var(--forge-color-error-600);
      gap: 12px;
    }
    
    .showcase-info {
      margin-top: 16px;
      padding: 12px;
      background: var(--forge-color-neutral-50);
      border-radius: 6px;
    }
    
    .image-details {
      display: flex;
      gap: 16px;
      font-size: 0.875rem;
      margin-bottom: 8px;
    }
    
    .fit-controls {
      display: flex;
      gap: 4px;
    }
    
    .fit-controls button {
      padding: 4px 8px;
      border: 1px solid var(--forge-color-neutral-300);
      background: white;
      border-radius: 4px;
      font-size: 0.75rem;
    }
    
    .fit-controls button.active {
      background: var(--forge-color-primary-500);
      color: white;
      border-color: var(--forge-color-primary-500);
    }
  `]
})
export class ImageShowcaseComponent {
  @Input() imageSrc!: string;
  @Input() imageAlt = '';
  @Input() title = 'Image Showcase';
  @Input() showInfo = true;
  @Input() imagePosition: 'center' | 'top' | 'bottom' = 'center';
  
  @Output() ratioChanged = new EventEmitter<string>();
  @Output() imageLoaded = new EventEmitter<void>();
  
  @ViewChild('imageRef') imageRef!: ElementRef<HTMLImageElement>;
  
  currentRatio = '16:9';
  objectFit: 'contain' | 'cover' | 'fill' | 'scale-down' | 'none' = 'contain';
  loading = true;
  error = false;
  naturalDimensions = '';
  displayRatio = '';
  
  ratioOptions = [
    { value: '16:9', label: '16:9 Widescreen' },
    { value: '4:3', label: '4:3 Traditional' },
    { value: '1:1', label: '1:1 Square' },
    { value: '3:2', label: '3:2 Photo' },
    { value: '21:9', label: '21:9 Ultrawide' },
    { value: '9:16', label: '9:16 Portrait' }
  ];
  
  objectFitOptions: Array<'contain' | 'cover' | 'fill' | 'scale-down' | 'none'> = [
    'contain', 'cover', 'fill', 'scale-down', 'none'
  ];
  
  onImageLoad() {
    this.loading = false;
    this.error = false;
    
    if (this.imageRef?.nativeElement) {
      const img = this.imageRef.nativeElement;
      this.naturalDimensions = `${img.naturalWidth}×${img.naturalHeight}`;
      
      const naturalRatio = img.naturalWidth / img.naturalHeight;
      this.displayRatio = `${naturalRatio.toFixed(2)}:1`;
    }
    
    this.imageLoaded.emit();
  }
  
  onImageError() {
    this.loading = false;
    this.error = true;
  }
  
  retryLoad() {
    this.loading = true;
    this.error = false;
    // Force image reload
    if (this.imageRef?.nativeElement) {
      this.imageRef.nativeElement.src = this.imageSrc + '?retry=' + Date.now();
    }
  }
  
  onRatioChange() {
    this.ratioChanged.emit(this.currentRatio);
  }
  
  onContainerRatioChange(event: CustomEvent) {
    console.log('Container ratio changed:', event.detail);
  }
}
```

## Examples

### Responsive Card Grid

```html
<div class="responsive-cards">
  <div class="card" v-for="item in products">
    <forge-aspect-ratio ratio="1:1" class="product-image">
      <img :src="item.image" :alt="item.name" />
      <div class="product-overlay">
        <button class="quick-view">Quick View</button>
      </div>
    </forge-aspect-ratio>
    
    <div class="product-info">
      <h3>{{ item.name }}</h3>
      <p class="price">${{ item.price }}</p>
    </div>
  </div>
</div>
```

### Hero Section

```html
<section class="hero">
  <forge-aspect-ratio 
    ratio="21:9" 
    position="center"
    class="hero-media">
    
    <img 
      src="hero-background.jpg" 
      alt="Hero background"
      style="object-fit: cover; width: 100%; height: 100%;" />
    
    <div class="hero-content">
      <h1>Welcome to Our Platform</h1>
      <p>Discover amazing features and possibilities</p>
      <forge-button variant="primary" size="large">Get Started</forge-button>
    </div>
  </forge-aspect-ratio>
</section>

<style>
  .hero-media {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
  }
  
  .hero-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 1;
  }
  
  .hero-content::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -40px;
    right: -40px;
    bottom: -20px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    z-index: -1;
  }
</style>
```

## AI Integration

### State Explanation

```typescript
const aspectRatio = document.querySelector('forge-aspect-ratio');
console.log(aspectRatio.explainState());
// "Aspect ratio container maintaining 16:9 ratio, content centered, 400px computed width"
```

### Possible Actions

```typescript
const actions = aspectRatio.getPossibleActions();
// [
//   { name: 'setRatio', available: true, description: 'Change aspect ratio' },
//   { name: 'fitContent', available: true, description: 'Optimize content fit' }
// ]
```

## Performance

- **Lightweight**: <3KB gzipped
- **CSS-based**: Uses modern CSS aspect-ratio property with fallbacks
- **No Layout Shifts**: Prevents content jumping during load
- **Memory Efficient**: Minimal JavaScript overhead

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **CSS aspect-ratio**: Native support with polyfill fallback
- **Responsive Images**: Full responsive image support

## Migration

### From CSS Padding Hack

```css
/* Before: Padding hack */
.aspect-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 ratio */
}

.aspect-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

```html
<!-- After: ForgeAspectRatio -->
<forge-aspect-ratio ratio="16:9">
  <img src="image.jpg" alt="Content" />
</forge-aspect-ratio>
```

## Related Components

- **[ForgeCard](../molecules/card.md)** - Cards with consistent media ratios
- **[ForgeModal](../molecules/modal.md)** - Modals with responsive media content
- **[ForgeSkeleton](./skeleton.md)** - Skeleton placeholders for loading states