import { Directive, ElementRef, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ForgeCustomEvent } from '../types/forge-angular.types';

/**
 * Directive for integrating Forge form components with Angular reactive forms
 * Implements ControlValueAccessor for seamless form binding
 */
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