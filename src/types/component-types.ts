/**
 * Component-specific type definitions and utilities
 */

import type { LitElement } from 'lit';

/**
 * Base type for all Forge components
 */
export interface ForgeElement extends LitElement {
  /** Component ready state */
  readonly ready: boolean;
  /** Emit custom event helper */
  emit<T = unknown>(eventName: string, detail?: T, options?: EventInit): boolean;
  /** Announce to screen readers */
  announceToScreenReader(message: string): void;
}

/**
 * Type guard to check if an element is a Forge component
 */
export function isForgeElement(element: unknown): element is ForgeElement {
  return element instanceof HTMLElement && 
         'emit' in element && 
         'announceToScreenReader' in element;
}

/**
 * Type guard to check if a value is a valid component size
 */
export function isValidSize(size: string): size is 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
  return ['xs', 'sm', 'md', 'lg', 'xl'].includes(size);
}

/**
 * Type guard to check if a value is a valid component variant
 */
export function isValidVariant(variant: string): variant is 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  return ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'].includes(variant);
}

/**
 * CSS class name builder utility
 */
export class ClassBuilder {
  private classes: Set<string> = new Set();

  add(className: string | undefined | null): this {
    if (className) {
      this.classes.add(className);
    }
    return this;
  }

  addIf(condition: boolean, className: string): this {
    if (condition && className) {
      this.classes.add(className);
    }
    return this;
  }

  remove(className: string): this {
    this.classes.delete(className);
    return this;
  }

  toggle(className: string, force?: boolean): this {
    if (force === undefined) {
      if (this.classes.has(className)) {
        this.classes.delete(className);
      } else {
        this.classes.add(className);
      }
    } else if (force) {
      this.classes.add(className);
    } else {
      this.classes.delete(className);
    }
    return this;
  }

  toString(): string {
    return Array.from(this.classes).join(' ');
  }

  toObject(): Record<string, boolean> {
    const obj: Record<string, boolean> = {};
    this.classes.forEach(cls => {
      obj[cls] = true;
    });
    return obj;
  }
}

/**
 * Debounce utility for input events
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function(this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Throttle utility for scroll/resize events
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * ID generator for unique component IDs
 */
let idCounter = 0;
export function generateId(prefix: string = 'forge'): string {
  return `${prefix}-${++idCounter}-${Date.now()}`;
}

/**
 * Deep merge utility for theme tokens
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target;
  
  const source = sources.shift();
  if (!source) return target;

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
      if (targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)) {
        target[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        ) as T[typeof key];
      } else {
        target[key] = sourceValue as T[typeof key];
      }
    } else {
      target[key] = sourceValue as T[typeof key];
    }
  }

  return deepMerge(target, ...sources);
}