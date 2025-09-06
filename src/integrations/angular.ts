/**
 * Angular Integration Utilities
 * Directives and services for using Forge components in Angular applications
 */

import { 
  Directive, 
  ElementRef, 
  EventEmitter, 
  Injectable, 
  Input, 
  Output, 
  OnInit, 
  OnDestroy, 
  forwardRef,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ForgeCustomEvent } from '../types/framework-integration';

// Service for theme management
@Injectable({
  providedIn: 'root'
})
export class ForgeThemeService {
  private _theme: 'light' | 'dark' | 'auto' = 'auto';

  get theme(): string {
    return this._theme;
  }

  setTheme(theme: 'light' | 'dark' | 'auto'): void {
    this._theme = theme;
    document.documentElement.setAttribute('data-forge-theme', theme);
    document.documentElement.style.setProperty('--forge-theme', theme);
  }

  toggleTheme(): void {
    const newTheme = this._theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}

// Base directive for all Forge components
@Directive({
  selector: '[forgeComponent]'
})
export class ForgeComponentDirective implements OnInit, OnDestroy {
  @Input() forgeTheme?: string;
  @Input() performanceMode?: 'high' | 'balanced' | 'battery';

  private listeners: (() => void)[] = [];

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;

    // Apply theme if provided
    if (this.forgeTheme) {
      element.setAttribute('data-forge-theme', this.forgeTheme);
    }

    // Apply performance mode
    if (this.performanceMode) {
      element.setAttribute('performance-mode', this.performanceMode);
    }
  }

  ngOnDestroy(): void {
    // Clean up event listeners
    this.listeners.forEach(unsubscribe => unsubscribe());
  }

  protected addEventListener<T>(
    eventType: string,
    handler: (event: ForgeCustomEvent<T>) => void
  ): void {
    const element = this.elementRef.nativeElement;
    element.addEventListener(eventType, handler);
    
    this.listeners.push(() => {
      element.removeEventListener(eventType, handler);
    });
  }

  protected getElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}

// Directive for form control integration
@Directive({
  selector: 'forge-input[ngModel], forge-select[ngModel], forge-checkbox[ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ForgeControlValueAccessor),
      multi: true
    }
  ]
})
export class ForgeControlValueAccessor implements ControlValueAccessor, OnInit, OnDestroy {
  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};
  private listeners: (() => void)[] = [];

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;

    // Handle input events
    const inputHandler = (event: ForgeCustomEvent) => {
      const value = event.detail?.value ?? (event.target as any)?.value;
      this.onChange(value);
    };

    const blurHandler = () => {
      this.onTouched();
    };

    element.addEventListener('input', inputHandler);
    element.addEventListener('change', inputHandler);
    element.addEventListener('blur', blurHandler);

    this.listeners.push(
      () => element.removeEventListener('input', inputHandler),
      () => element.removeEventListener('change', inputHandler),
      () => element.removeEventListener('blur', blurHandler)
    );
  }

  ngOnDestroy(): void {
    this.listeners.forEach(unsubscribe => unsubscribe());
  }

  writeValue(value: any): void {
    const element = this.elementRef.nativeElement as any;
    if (element.value !== value) {
      element.value = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const element = this.elementRef.nativeElement as any;
    element.disabled = isDisabled;
  }
}

// Directive for modal management
@Directive({
  selector: 'forge-modal[forgeModal]',
  exportAs: 'forgeModal'
})
export class ForgeModalDirective extends ForgeComponentDirective {
  @Output() modalOpen = new EventEmitter<ForgeCustomEvent>();
  @Output() modalClose = new EventEmitter<ForgeCustomEvent>();
  @Output() backdropClick = new EventEmitter<ForgeCustomEvent>();

  override ngOnInit(): void {
    super.ngOnInit();

    this.addEventListener('open', (event) => this.modalOpen.emit(event));
    this.addEventListener('close', (event) => this.modalClose.emit(event));
    this.addEventListener('backdrop-click', (event) => this.backdropClick.emit(event));
  }

  show(): void {
    (this.getElement() as any).show?.();
  }

  hide(): void {
    (this.getElement() as any).hide?.();
  }

  toggle(): void {
    const element = this.getElement() as any;
    const isOpen = element.open;
    if (isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }
}

// Directive for data table management
@Directive({
  selector: 'forge-data-table[forgeDataTable]',
  exportAs: 'forgeDataTable'
})
export class ForgeDataTableDirective extends ForgeComponentDirective {
  @Input() data: any[] = [];
  @Output() sort = new EventEmitter<ForgeCustomEvent<{ key: string; direction: 'asc' | 'desc' }>>();
  @Output() filter = new EventEmitter<ForgeCustomEvent<{ filters: Record<string, any> }>>();
  @Output() select = new EventEmitter<ForgeCustomEvent<{ selected: any[] }>>();
  @Output() rowClick = new EventEmitter<ForgeCustomEvent<{ row: any; index: number }>>();

  private _selectedRows: any[] = [];

  get selectedRows(): any[] {
    return this._selectedRows;
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.addEventListener('sort', (event) => this.sort.emit(event));
    this.addEventListener('filter', (event) => this.filter.emit(event));
    this.addEventListener('select', (event) => {
      this._selectedRows = event.detail.selected;
      this.select.emit(event);
    });
    this.addEventListener('row-click', (event) => this.rowClick.emit(event));

    // Set initial data
    if (this.data) {
      (this.getElement() as any).data = this.data;
    }
  }

  @Input() set tableData(data: any[]) {
    this.data = data;
    const element = this.getElement() as any;
    if (element) {
      element.data = data;
    }
  }
}

// Service for easier component management
@Injectable({
  providedIn: 'root'
})
export class ForgeComponentService {
  constructor(private themeService: ForgeThemeService) {}

  // Helper method to show modals by selector
  showModal(selector: string): void {
    const modal = document.querySelector(selector) as any;
    modal?.show?.();
  }

  // Helper method to hide modals by selector
  hideModal(selector: string): void {
    const modal = document.querySelector(selector) as any;
    modal?.hide?.();
  }

  // Helper method to toggle theme
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Helper method to show notifications
  showNotification(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): void {
    // Create a toast notification using Forge alert component
    const alert = document.createElement('forge-alert');
    alert.setAttribute('type', type);
    alert.setAttribute('dismissible', 'true');
    alert.setAttribute('auto-dismiss', '5000');
    alert.textContent = message;

    // Add to document
    document.body.appendChild(alert);

    // Auto-remove after animation
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert);
      }
    }, 6000);
  }
}

// Module setup helper
export class ForgeAngularModule {
  static forRoot() {
    return {
      ngModule: ForgeAngularModule,
      providers: [
        ForgeThemeService,
        ForgeComponentService
      ]
    };
  }

  static getSchemas() {
    return [CUSTOM_ELEMENTS_SCHEMA];
  }

  static getDirectives() {
    return [
      ForgeComponentDirective,
      ForgeControlValueAccessor,
      ForgeModalDirective,
      ForgeDataTableDirective
    ];
  }
}

// Utility functions for common tasks
export const ForgeAngularUtils = {
  // Get typed reference to Forge component
  getForgeComponent<T = any>(elementRef: ElementRef): T {
    return elementRef.nativeElement;
  },

  // Create event handler that properly types Forge events
  createEventHandler<T = any>(handler: (detail: T, event: ForgeCustomEvent<T>) => void) {
    return (event: ForgeCustomEvent<T>) => {
      handler(event.detail, event);
    };
  },

  // Helper for form validation
  createValidator(validatorFn: (value: any) => string | null) {
    return (control: any) => {
      const error = validatorFn(control.value);
      return error ? { forgeValidation: { message: error } } : null;
    };
  },

  // Setup component with theme
  setupWithTheme(elementRef: ElementRef, theme?: string): void {
    if (theme) {
      elementRef.nativeElement.setAttribute('data-forge-theme', theme);
    }
  }
};

// Example component implementations
export const ForgeAngularComponents = {
  // Button component example
  Button: `
    @Component({
      selector: 'app-forge-button',
      template: '<forge-button [attr.variant]="variant" [attr.disabled]="disabled" (click)="handleClick($event)"><ng-content></ng-content></forge-button>'
    })
    export class ForgeButtonComponent {
      @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
      @Input() disabled = false;
      @Output() buttonClick = new EventEmitter<Event>();
      
      handleClick(event: Event): void {
        this.buttonClick.emit(event);
      }
    }
  `,

  // Input component with form integration
  Input: `
    @Component({
      selector: 'app-forge-input',
      template: '<forge-input forgeComponent [ngModel]="value" (ngModelChange)="valueChange.emit($event)" [attr.placeholder]="placeholder" [attr.disabled]="disabled"></forge-input>',
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => ForgeInputComponent),
          multi: true
        }
      ]
    })
    export class ForgeInputComponent implements ControlValueAccessor {
      @Input() value: string = '';
      @Input() placeholder: string = '';
      @Input() disabled: boolean = false;
      @Output() valueChange = new EventEmitter<string>();
      
      // ControlValueAccessor implementation
      writeValue(value: any): void {
        this.value = value;
      }
      
      registerOnChange(fn: any): void {
        this.valueChange.subscribe(fn);
      }
      
      registerOnTouched(fn: any): void {
        // Implementation for touched state
      }
      
      setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
      }
    }
  `
};