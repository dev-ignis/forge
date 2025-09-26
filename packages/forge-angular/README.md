# @nexcraft/forge-angular

Angular integration for Nexcraft Forge web components.

## Installation

```bash
npm install @nexcraft/forge @nexcraft/forge-angular
```

## Usage

### 1. Import the Module

```typescript
import { NgModule } from '@angular/core';
import { ForgeAngularModule } from '@nexcraft/forge-angular';

@NgModule({
  imports: [
    ForgeAngularModule.forRoot()
  ],
  schemas: ForgeAngularModule.getSchemas()
})
export class AppModule { }
```

### 2. Use Forge Components

```html
<!-- Basic component usage -->
<forge-button>Click me</forge-button>

<!-- With Angular directive -->
<forge-input 
  forgeComponent
  [(ngModel)]="inputValue"
  placeholder="Enter text">
</forge-input>

<!-- Modal with directive -->
<forge-modal forgeModal #modal="forgeModal">
  <h2>Modal Title</h2>
  <p>Modal content</p>
  <button (click)="modal.hide()">Close</button>
</forge-modal>

<!-- Data table with binding -->
<forge-data-table 
  forgeDataTable
  [tableData]="users"
  (sort)="onSort($event)"
  (select)="onSelect($event)">
</forge-data-table>
```

### 3. Form Integration

```typescript
import { FormBuilder, FormGroup } from '@angular/forms';

export class MyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      isActive: [false]
    });
  }
}
```

```html
<form [formGroup]="form">
  <forge-input 
    forgeComponent
    formControlName="name"
    placeholder="Name">
  </forge-input>

  <forge-input 
    forgeComponent
    formControlName="email"
    type="email"
    placeholder="Email">
  </forge-input>

  <forge-checkbox 
    forgeComponent
    formControlName="isActive">
    Active
  </forge-checkbox>
</form>
```

### 4. Theme Management

```typescript
import { ForgeThemeService } from '@nexcraft/forge-angular';

export class AppComponent {
  constructor(private themeService: ForgeThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  setDarkTheme() {
    this.themeService.setTheme('dark');
  }
}
```

### 5. Notifications

```typescript
import { ForgeComponentService } from '@nexcraft/forge-angular';

export class MyComponent {
  constructor(private forgeService: ForgeComponentService) {}

  showSuccess() {
    this.forgeService.showNotification('Success!', 'success');
  }

  showError() {
    this.forgeService.showNotification('Error occurred', 'error');
  }
}
```

## API Reference

### Services

- `ForgeThemeService` - Theme management
- `ForgeComponentService` - Component utilities and notifications

### Directives

- `forgeComponent` - Base directive for all components
- `forgeModal` - Modal management directive  
- `forgeDataTable` - Data table binding directive
- Form integration with `ControlValueAccessor`

### Types

All TypeScript types are exported for use in your Angular applications.

## Peer Dependencies

- `@nexcraft/forge >= 0.7.0`
- `@angular/core ^17.0.0 || ^18.0.0 || ^19.0.0`
- `@angular/forms ^17.0.0 || ^18.0.0 || ^19.0.0`