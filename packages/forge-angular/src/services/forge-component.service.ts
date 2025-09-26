import { Injectable } from '@angular/core';
import { ForgeThemeService } from './forge-theme.service';
import type { NotificationType } from '../types/forge-angular.types';

/**
 * Service for managing Forge components in Angular applications
 */
@Injectable({
  providedIn: 'root'
})
export class ForgeComponentService {
  constructor(private themeService: ForgeThemeService) {}

  /**
   * Show modal by CSS selector
   */
  showModal(selector: string): void {
    const modal = document.querySelector(selector) as any;
    modal?.show?.();
  }

  /**
   * Hide modal by CSS selector
   */
  hideModal(selector: string): void {
    const modal = document.querySelector(selector) as any;
    modal?.hide?.();
  }

  /**
   * Toggle theme between light and dark
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Show notification using Forge alert component
   */
  showNotification(message: string, type: NotificationType = 'info'): void {
    const alert = document.createElement('forge-alert');
    alert.setAttribute('type', type);
    alert.setAttribute('dismissible', 'true');
    alert.setAttribute('auto-dismiss', '5000');
    alert.textContent = message;

    document.body.appendChild(alert);

    // Auto-remove after animation
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert);
      }
    }, 6000);
  }
}