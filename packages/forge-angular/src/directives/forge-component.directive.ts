import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import type { ForgeCustomEvent, PerformanceMode } from '../types/forge-angular.types';

/**
 * Base directive for all Forge components
 * Provides common functionality like theme management and event handling
 */
@Directive({
  selector: '[forgeComponent]'
})
export class ForgeComponentDirective implements OnInit, OnDestroy {
  @Input() forgeTheme?: string;
  @Input() performanceMode?: PerformanceMode;

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