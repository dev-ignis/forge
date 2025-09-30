/**
 * TypeScript type definitions for Vue integration
 */

import type { Ref } from 'vue';

export interface ForgeCustomEvent<T = any> extends CustomEvent {
  detail: T;
}

export type ForgeTheme = 'light' | 'dark' | 'auto';

export interface ForgeComponentRef<T extends HTMLElement = HTMLElement> {
  elementRef: Ref<T | undefined>;
  getElement: () => T | undefined;
}

export interface ForgeThemeContext {
  theme: Ref<ForgeTheme>;
  setTheme: (theme: ForgeTheme) => void;
  toggleTheme: () => void;
}

export interface ForgeValidationRule {
  test: (value: any) => boolean;
  message: string;
}

export interface ForgeValidationResult {
  isValid: Ref<boolean>;
  errors: Ref<string[]>;
  validate: () => boolean;
  reset: () => void;
}

export interface ForgeModalContext {
  isOpen: Ref<boolean>;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

export interface ForgeDataTableContext<T = any> {
  data: Ref<T[]>;
  sortColumn: Ref<string | null>;
  sortDirection: Ref<'asc' | 'desc'>;
  setData: (newData: T[]) => void;
  sort: (column: string) => void;
  filter: (predicate: (item: T) => boolean) => void;
}