import { Directive, Output, EventEmitter } from '@angular/core';
import { ForgeComponentDirective } from './forge-component.directive';
import type { ForgeCustomEvent } from '../types/forge-angular.types';

/**
 * Directive for Forge modal component integration
 * Provides Angular-friendly events and methods for modal management
 */
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