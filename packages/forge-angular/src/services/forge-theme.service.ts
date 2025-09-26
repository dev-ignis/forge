import { Injectable } from '@angular/core';
import type { ForgeTheme } from '../types/forge-angular.types';

/**
 * Service for managing Forge component themes in Angular applications
 */
@Injectable({
  providedIn: 'root'
})
export class ForgeThemeService {
  private _theme: ForgeTheme = 'auto';

  get theme(): ForgeTheme {
    return this._theme;
  }

  setTheme(theme: ForgeTheme): void {
    this._theme = theme;
    document.documentElement.setAttribute('data-forge-theme', theme);
    document.documentElement.style.setProperty('--forge-theme', theme);
  }

  toggleTheme(): void {
    const newTheme = this._theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}