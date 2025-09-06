/**
 * Framework Integration Type Definitions
 * Provides comprehensive TypeScript support for Forge components in all frameworks
 */

import type * as React from 'react';

// Base component event types
export interface ForgeCustomEvent<T = any> extends CustomEvent<T> {
  target: HTMLElement & EventTarget;
}

// Common component props
export interface BaseForgeComponentProps {
  id?: string;
  className?: string;
  style?: string | Partial<CSSStyleDeclaration>;
  'data-*'?: string;
  
  // AI Metadata attributes
  'semantic-role'?: string;
  'ai-context'?: string;
  'performance-mode'?: 'high' | 'balanced' | 'battery';
}

// Button component types
export interface ForgeButtonProps extends BaseForgeComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: ForgeCustomEvent) => void;
}

// Input component types  
export interface ForgeInputProps extends BaseForgeComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  autocomplete?: string;
  pattern?: string;
  minlength?: number;
  maxlength?: number;
  onInput?: (event: ForgeCustomEvent<{ value: string }>) => void;
  onChange?: (event: ForgeCustomEvent<{ value: string }>) => void;
  onFocus?: (event: ForgeCustomEvent) => void;
  onBlur?: (event: ForgeCustomEvent) => void;
}

// Modal component types
export interface ForgeModalProps extends BaseForgeComponentProps {
  title?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  closeable?: boolean;
  'backdrop-close'?: boolean;
  open?: boolean;
  onOpen?: (event: ForgeCustomEvent) => void;
  onClose?: (event: ForgeCustomEvent) => void;
  onBackdropClick?: (event: ForgeCustomEvent) => void;
}

// Data Table component types
export interface ForgeDataTableProps extends BaseForgeComponentProps {
  data?: any[];
  columns?: Array<{
    key: string;
    title: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
  }>;
  sortable?: boolean;
  filterable?: boolean;
  selectable?: boolean | 'multiple';
  'page-size'?: number;
  loading?: boolean;
  onSort?: (event: ForgeCustomEvent<{ key: string; direction: 'asc' | 'desc' }>) => void;
  onFilter?: (event: ForgeCustomEvent<{ filters: Record<string, any> }>) => void;
  onSelect?: (event: ForgeCustomEvent<{ selected: any[] }>) => void;
  onRowClick?: (event: ForgeCustomEvent<{ row: any; index: number }>) => void;
}

// Form Field component types
export interface ForgeFormFieldProps extends BaseForgeComponentProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  disabled?: boolean;
}

// Add more component types as needed...

// Framework-specific declarations

// React JSX support
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'forge-button': ForgeButtonProps & React.DOMAttributes<HTMLElement>;
      'forge-input': ForgeInputProps & React.DOMAttributes<HTMLElement>;
      'forge-modal': ForgeModalProps & React.DOMAttributes<HTMLElement>;
      'forge-data-table': ForgeDataTableProps & React.DOMAttributes<HTMLElement>;
      'forge-form-field': ForgeFormFieldProps & React.DOMAttributes<HTMLElement>;
      
      // Add all other Forge components...
      'forge-alert': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-badge': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-checkbox': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-select': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-switch': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-card': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-dropdown': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-tooltip': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-accordion': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-tabs': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-pagination': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-tree-view': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-navigation-bar': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-date-picker': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-multi-select': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-radio-group': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
      'forge-icon': BaseForgeComponentProps & React.DOMAttributes<HTMLElement>;
    }
  }
}

// Vue component types
declare module '@vue/runtime-dom' {
  export interface HTMLElementTagNameMap {
    'forge-button': ForgeButtonProps;
    'forge-input': ForgeInputProps;
    'forge-modal': ForgeModalProps;
    'forge-data-table': ForgeDataTableProps;
    'forge-form-field': ForgeFormFieldProps;
    // Add all other components...
  }
}

// Export types for external use
export type {
  ForgeButtonProps,
  ForgeInputProps,
  ForgeModalProps,
  ForgeDataTableProps,
  ForgeFormFieldProps,
  ForgeCustomEvent,
  BaseForgeComponentProps,
};