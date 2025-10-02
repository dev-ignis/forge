# Getting Started with Forge

Use Forge web components in minutes with CDN or npm.

## Install

- npm
  ```bash
  npm install @nexcraft/forge
  ```

- CDN
  ```html
  <script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge"></script>
  ```

## Vanilla HTML/JS

```html
<forge-button variant="primary">Click me</forge-button>

<script type="module">
  import '@nexcraft/forge';
  const btn = document.querySelector('forge-button');
  btn.addEventListener('click', () => console.log('clicked'));
  // AI helpers
  console.log(btn.explainState?.());
  console.log(btn.getPossibleActions?.());
></script>
```

## React

Option A: use web components directly:
```tsx
import '@nexcraft/forge';

export default function App() {
  return <forge-button variant="primary">Click</forge-button>;
}
```

Option B: use wrappers for best DX:
```bash
npm install @nexcraft/forge-react
```
```tsx
import { ForgeButton, ForgeInput } from '@nexcraft/forge-react';

export default function App() {
  return (
    <div>
      <ForgeInput placeholder="Your name" />
      <ForgeButton variant="primary">Submit</ForgeButton>
    </div>
  );
}
```

## Vue 3

```bash
npm install @nexcraft/forge @nexcraft/forge-vue
```
```ts
import { createApp } from 'vue';
import { ForgeVuePlugin } from '@nexcraft/forge-vue';
import App from './App.vue';

createApp(App).use(ForgeVuePlugin).mount('#app');
```

## Angular

```bash
npm install @nexcraft/forge @nexcraft/forge-angular
```

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ForgeModule } from '@nexcraft/forge-angular';

@NgModule({
  imports: [BrowserModule, ForgeModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

## Theming Quick Tip

Use CSS custom properties or the Token Bridge utilities. See `docs/theming/token-bridge.md` or `docs/guides/theming-overview.md`.

## Next Steps

- Integrations: `docs/integrations/`
- AI Metadata Reference: `docs/ai/metadata-reference.md`
- AI Integration Guide: `docs/ai/integration-guide.md`
- Performance: `docs/performance-monitoring.md`
