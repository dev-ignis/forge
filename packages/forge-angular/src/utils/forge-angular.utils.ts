import { ElementRef } from '@angular/core';
import type { ForgeCustomEvent } from '../types/forge-angular.types';

/**
 * Utility functions for Angular integration with Forge components
 */
export const ForgeAngularUtils = {
  /**
   * Get typed reference to Forge component
   */
  getForgeComponent<T = any>(elementRef: ElementRef): T {
    return elementRef.nativeElement;
  },

  /**
   * Create event handler that properly types Forge events
   */
  createEventHandler<T = any>(handler: (detail: T, event: ForgeCustomEvent<T>) => void) {
    return (event: ForgeCustomEvent<T>) => {
      handler(event.detail, event);
    };
  },

  /**
   * Helper for form validation
   */
  createValidator(validatorFn: (value: any) => string | null) {
    return (control: any) => {
      const error = validatorFn(control.value);
      return error ? { forgeValidation: { message: error } } : null;
    };
  },

  /**
   * Setup component with theme
   */
  setupWithTheme(elementRef: ElementRef, theme?: string): void {
    if (theme) {
      elementRef.nativeElement.setAttribute('data-forge-theme', theme);
    }
  }
};