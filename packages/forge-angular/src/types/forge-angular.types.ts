/**
 * TypeScript type definitions for Angular integration
 */

export interface ForgeCustomEvent<T = any> extends CustomEvent {
  detail: T;
}

export type ForgeTheme = 'light' | 'dark' | 'auto';

export type PerformanceMode = 'high' | 'balanced' | 'battery';

export interface ForgeComponentConfig {
  theme?: ForgeTheme;
  performanceMode?: PerformanceMode;
}

export interface ForgeTableSortEvent {
  key: string;
  direction: 'asc' | 'desc';
}

export interface ForgeTableFilterEvent {
  filters: Record<string, any>;
}

export interface ForgeTableSelectEvent {
  selected: any[];
}

export interface ForgeTableRowClickEvent {
  row: any;
  index: number;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';