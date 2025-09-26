# Angular Integration

Angular integration for Nexcraft Forge web components through the `@nexcraft/forge-angular` package.

## Overview

The `@nexcraft/forge-angular` package provides Angular-specific directives, services, and form integration for seamless use of Forge web components in Angular applications.

## Installation

```bash
npm install @nexcraft/forge @nexcraft/forge-angular
```

## Quick Start

### 1. Import the Module

Add the `ForgeAngularModule` to your Angular module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ForgeAngularModule } from '@nexcraft/forge-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ForgeAngularModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: ForgeAngularModule.getSchemas()
})
export class AppModule { }
```

### 2. Use Components in Templates

```html
<!-- Basic component usage -->
<forge-button>Click me</forge-button>

<!-- With Angular directive for enhanced functionality -->
<forge-input 
  forgeComponent
  placeholder="Enter text"
  [(ngModel)]="inputValue">
</forge-input>

<!-- Modal with Angular directive -->
<forge-modal forgeModal #modal="forgeModal">
  <h2>Modal Title</h2>
  <p>Modal content goes here</p>
  <button (click)="modal.hide()">Close</button>
</forge-modal>
```

## Reactive Forms Integration

The Angular package provides seamless integration with Angular reactive forms:

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-example',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <forge-input 
        forgeComponent
        formControlName="name"
        placeholder="Full Name"
        required>
      </forge-input>

      <forge-input 
        forgeComponent
        formControlName="email"
        type="email"
        placeholder="Email Address"
        required>
      </forge-input>

      <forge-checkbox 
        forgeComponent
        formControlName="isActive">
        Active User
      </forge-checkbox>

      <forge-select 
        forgeComponent
        formControlName="role">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </forge-select>

      <forge-button type="submit" [disabled]="userForm.invalid">
        Submit
      </forge-button>
    </form>
  `
})
export class FormExampleComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isActive: [true],
      role: ['user']
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
    }
  }
}
```

## Data Table Integration

Use the data table directive for enhanced Angular integration:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-data-table-example',
  template: `
    <forge-data-table 
      forgeDataTable
      [tableData]="users"
      (sort)="onSort($event)"
      (filter)="onFilter($event)"
      (select)="onSelect($event)"
      (rowClick)="onRowClick($event)">
    </forge-data-table>
  `
})
export class DataTableExampleComponent {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: false },
    // ... more data
  ];

  onSort(event: any) {
    console.log('Sort event:', event.detail);
    // Handle sorting logic
  }

  onFilter(event: any) {
    console.log('Filter event:', event.detail);
    // Handle filtering logic
  }

  onSelect(event: any) {
    console.log('Selection changed:', event.detail.selected);
    // Handle selection logic
  }

  onRowClick(event: any) {
    console.log('Row clicked:', event.detail);
    // Handle row click logic
  }
}
```

## Theme Management

Use the theme service to manage application themes:

```typescript
import { Component } from '@angular/core';
import { ForgeThemeService } from '@nexcraft/forge-angular';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <forge-button (click)="toggleTheme()">
      Toggle Theme ({{ currentTheme }})
    </forge-button>
    
    <forge-button (click)="setTheme('light')">Light</forge-button>
    <forge-button (click)="setTheme('dark')">Dark</forge-button>
    <forge-button (click)="setTheme('auto')">Auto</forge-button>
  `
})
export class ThemeToggleComponent {
  constructor(public themeService: ForgeThemeService) {}

  get currentTheme() {
    return this.themeService.theme;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  setTheme(theme: 'light' | 'dark' | 'auto') {
    this.themeService.setTheme(theme);
  }
}
```

## Notifications

Display notifications using the component service:

```typescript
import { Component } from '@angular/core';
import { ForgeComponentService } from '@nexcraft/forge-angular';

@Component({
  selector: 'app-notification-example',
  template: `
    <forge-button (click)="showSuccess()">Success</forge-button>
    <forge-button (click)="showError()">Error</forge-button>
    <forge-button (click)="showWarning()">Warning</forge-button>
    <forge-button (click)="showInfo()">Info</forge-button>
  `
})
export class NotificationExampleComponent {
  constructor(private forgeService: ForgeComponentService) {}

  showSuccess() {
    this.forgeService.showNotification('Operation completed successfully!', 'success');
  }

  showError() {
    this.forgeService.showNotification('An error occurred!', 'error');
  }

  showWarning() {
    this.forgeService.showNotification('Warning: Please check your input.', 'warning');
  }

  showInfo() {
    this.forgeService.showNotification('Information: Process started.', 'info');
  }
}
```

## API Reference

### Services

#### ForgeThemeService
- `theme: string` - Get current theme
- `setTheme(theme: 'light' | 'dark' | 'auto'): void` - Set application theme
- `toggleTheme(): void` - Toggle between light and dark themes

#### ForgeComponentService
- `showModal(selector: string): void` - Show modal by CSS selector
- `hideModal(selector: string): void` - Hide modal by CSS selector
- `toggleTheme(): void` - Toggle application theme
- `showNotification(message: string, type?: NotificationType): void` - Show notification

### Directives

#### forgeComponent
Base directive providing theme and performance mode support:
```html
<forge-input forgeComponent [forgeTheme]="'dark'" [performanceMode]="'high'">
```

#### forgeModal
Modal management directive:
```html
<forge-modal forgeModal #modal="forgeModal" (modalOpen)="onOpen()" (modalClose)="onClose()">
```

#### forgeDataTable
Data table integration directive:
```html
<forge-data-table forgeDataTable [tableData]="data" (sort)="onSort($event)">
```

### Form Integration

The package automatically provides `ControlValueAccessor` for:
- `forge-input`
- `forge-select` 
- `forge-checkbox`

These components work seamlessly with Angular reactive forms and template-driven forms.

## TypeScript Support

The package includes comprehensive TypeScript definitions for all directives, services, and event types:

```typescript
import { 
  ForgeCustomEvent,
  ForgeTableSortEvent,
  ForgeTableFilterEvent,
  ForgeTableSelectEvent,
  NotificationType
} from '@nexcraft/forge-angular';
```

## Migration from Main Package

If you were previously using Angular integration from `@nexcraft/forge/integrations/angular`, migrate to the dedicated package:

```typescript
// Old (deprecated)
import { ... } from '@nexcraft/forge/integrations/angular';

// New (recommended)
import { ... } from '@nexcraft/forge-angular';
```

## Troubleshooting

### Custom Elements Schema

If you encounter errors about unknown elements, ensure you're importing the schemas:

```typescript
@NgModule({
  // ...
  schemas: ForgeAngularModule.getSchemas()
})
export class AppModule { }
```

### Peer Dependencies

Ensure you have the required peer dependencies installed:

```bash
npm install @angular/core @angular/forms @nexcraft/forge
```

The package supports Angular versions 17, 18, and 19.

## Contributing

The Angular package is part of the Nexcraft Forge monorepo. See the main project's contributing guide for development setup and guidelines.