# Angular Integration with @nexcraft/forge-angular

This guide explains how to use Forge Web Components in Angular applications via the dedicated integration package `@nexcraft/forge-angular`.

## Installation

```bash
npm install @nexcraft/forge @nexcraft/forge-angular
```

Peer dependencies (not auto-installed):
- `@angular/core` and `@angular/forms` (v17 or v18)

## Setup

Add `CUSTOM_ELEMENTS_SCHEMA` to your root module to allow custom elements, and import the Forge Angular module (example names shown — adjust to your package exports):

```ts
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Forge Angular integration (example)
import { ForgeModule } from '@nexcraft/forge-angular';

import './polyfills'; // if needed for older browsers

@NgModule({
  declarations: [/* your components */],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ForgeModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [/* root component */]
})
export class AppModule {}
```

## Basic Usage

Forge components are standard web components; use them directly in templates. The Angular integration provides helpers to bridge attributes/properties and events where useful.

```html
<!-- Button -->
<forge-button (click)="onSubmit()" semantic-role="form-submit">
  Submit
</forge-button>

<!-- Input with two-way binding via a helper directive (example: forgeModel) -->
<forge-input [value]="email" (input)="email = $event.detail?.value || $event.target?.value"
             aria-label="Email address"></forge-input>
```

## Forms Integration (Reactive Forms)

If the package exposes forms adapters (e.g., directives implementing ControlValueAccessor), use them to bind Forge inputs to Angular forms:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <!-- Example: forgeFormControl directive wiring to CVA adapter -->
  <forge-input formControlName="email" aria-label="Email"></forge-input>

  <forge-checkbox formControlName="newsletter">Subscribe</forge-checkbox>

  <forge-button type="submit">Save</forge-button>
</form>
```

If adapters aren’t available, you can bind via `(input)` and `[value]`/`[checked]` manually as shown in Basic Usage.

## Theme and Context

You can set global attributes (e.g., data-forge-theme) at the app root:

```ts
// app.component.ts
export class AppComponent {
  theme: 'light' | 'dark' | 'auto' = 'auto';
  setTheme(t: 'light' | 'dark' | 'auto') {
    this.theme = t;
    document.documentElement.setAttribute('data-forge-theme', t);
    document.documentElement.style.setProperty('--forge-theme', t);
  }
}
```

```html
<!-- app.component.html -->
<div [attr.data-forge-theme]="theme">
  <button (click)="setTheme('light')">Light</button>
  <button (click)="setTheme('dark')">Dark</button>
  <button (click)="setTheme('auto')">Auto</button>

  <ng-content></ng-content>
  <!-- Your Forge components here -->
</div>
```

## Events and AI Methods

Forge components emit standard DOM/CustomEvents. You can handle them with Angular’s `(event)` bindings. For AI methods (inherited from BaseElement), you can access the element via `ViewChild` and call `explainState()`, `getPossibleActions()`, or read `aiState`:

```ts
import { ElementRef, ViewChild } from '@angular/core';

export class DemoComponent {
  @ViewChild('btn', { static: true }) btnRef!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    const el = this.btnRef.nativeElement as any;
    console.log(el.explainState?.());
    console.log(el.getPossibleActions?.());
    console.log(el.aiState);
  }
}
```

```html
<forge-button #btn (click)="onClick()">Click</forge-button>
```

## Migration Note

Angular integration has moved to a separate package: `@nexcraft/forge-angular`.

- The `@nexcraft/forge/integrations/angular` subpath in the core package is deprecated and will be removed following the Phase 15 plan.
- Please install and import from `@nexcraft/forge-angular` going forward.

## Troubleshooting
- Ensure `CUSTOM_ELEMENTS_SCHEMA` is present in your module.
- Confirm Angular peers are installed at compatible versions.
- If SSR, render Forge tags as-is; they will upgrade on client. For complex SSR, consider platform-server hydration constraints.

---

For deeper architectural context, see:
- ADR-007 Framework Integration
- Phase 15: Framework Integration Package Split

