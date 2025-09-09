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
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'full-width'?: boolean;
  'icon-start'?: string;
  'icon-end'?: string;
  onClick?: (event: ForgeCustomEvent) => void;
}

// Input component types  
export interface ForgeInputProps extends BaseForgeComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  label?: string;
  'helper-text'?: string;
  'error-text'?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  maxlength?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  clearable?: boolean;
  onInput?: (event: ForgeCustomEvent<{ value: string }>) => void;
  onChange?: (event: ForgeCustomEvent<{ value: string }>) => void;
  onFocus?: (event: ForgeCustomEvent) => void;
  onBlur?: (event: ForgeCustomEvent) => void;
  onClear?: (event: ForgeCustomEvent) => void;
}

// Icon component types
export interface ForgeIconProps extends BaseForgeComponentProps {
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

// Alert component types
export interface ForgeAlertProps extends BaseForgeComponentProps {
  severity?: 'success' | 'info' | 'warning' | 'error';
  variant?: 'filled' | 'outlined' | 'standard';
  title?: string;
  dismissible?: boolean;
  icon?: string | boolean;
  action?: string;
  onDismiss?: (event: ForgeCustomEvent) => void;
}

// Checkbox component types
export interface ForgeCheckboxProps extends BaseForgeComponentProps {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  required?: boolean;
  value?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  'label-position'?: 'start' | 'end';
  onChange?: (event: ForgeCustomEvent<{ checked: boolean }>) => void;
}

// Badge component types
export interface ForgeBadgeProps extends BaseForgeComponentProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  dot?: boolean;
}

// Switch component types
export interface ForgeSwitchProps extends BaseForgeComponentProps {
  checked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  'label-position'?: 'start' | 'end';
  onChange?: (event: ForgeCustomEvent<{ checked: boolean }>) => void;
}

// Radio Group component types
export interface ForgeRadioGroupProps extends BaseForgeComponentProps {
  value?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  orientation?: 'horizontal' | 'vertical';
  'label-position'?: 'start' | 'end';
  size?: 'sm' | 'md' | 'lg';
  onChange?: (event: ForgeCustomEvent<{ value: string }>) => void;
}

// Select component types
export interface ForgeSelectProps extends BaseForgeComponentProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'filled' | 'outlined';
  label?: string;
  'helper-text'?: string;
  'error-text'?: string;
  onChange?: (event: ForgeCustomEvent<{ value: string | string[] }>) => void;
}

// Progress component types
export interface ForgeProgressProps extends BaseForgeComponentProps {
  value?: number;
  max?: number;
  variant?: 'linear' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  indeterminate?: boolean;
  'show-label'?: boolean;
}

// Progress Circle component types
export interface ForgeProgressCircleProps extends BaseForgeComponentProps {
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  thickness?: number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  'show-label'?: boolean;
}

// Skeleton component types
export interface ForgeSkeletonProps extends BaseForgeComponentProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

// Aspect Ratio component types
export interface ForgeAspectRatioProps extends BaseForgeComponentProps {
  ratio?: number | string;
}

// Avatar component types
export interface ForgeAvatarProps extends BaseForgeComponentProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  'status-position'?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  fallback?: string;
}

// Form Field component types
export interface ForgeFormFieldProps extends BaseForgeComponentProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  disabled?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
  'validation-state'?: 'valid' | 'invalid' | 'warning';
}

// Multi Select component types
export interface ForgeMultiSelectProps extends BaseForgeComponentProps {
  value?: string[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  'max-selections'?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  'helper-text'?: string;
  'error-text'?: string;
  onChange?: (event: ForgeCustomEvent<{ value: string[] }>) => void;
}

// Date Picker component types
export interface ForgeDatePickerProps extends BaseForgeComponentProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  min?: string;
  max?: string;
  format?: string;
  'enable-range'?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  'helper-text'?: string;
  'error-text'?: string;
  onChange?: (event: ForgeCustomEvent<{ value: string | { start: string; end: string } }>) => void;
}

// Dropdown component types
export interface ForgeDropdownProps extends BaseForgeComponentProps {
  open?: boolean;
  trigger?: 'click' | 'hover';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  'close-on-click'?: boolean;
  offset?: number;
  onOpen?: (event: ForgeCustomEvent) => void;
  onClose?: (event: ForgeCustomEvent) => void;
}

// Card component types
export interface ForgeCardProps extends BaseForgeComponentProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  elevation?: 0 | 1 | 2 | 3 | 4;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  bordered?: boolean;
  onClick?: (event: ForgeCustomEvent) => void;
}

// Modal component types
export interface ForgeModalProps extends BaseForgeComponentProps {
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  open?: boolean;
  'close-on-backdrop-click'?: boolean;
  'close-on-escape'?: boolean;
  'show-close-button'?: boolean;
  'lock-scroll'?: boolean;
  'scroll-behavior'?: 'inside' | 'outside';
  onOpen?: (event: ForgeCustomEvent) => void;
  onClose?: (event: ForgeCustomEvent) => void;
  onBackdropClick?: (event: ForgeCustomEvent) => void;
}

// Toast component types
export interface ForgeToastProps extends BaseForgeComponentProps {
  severity?: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  duration?: number;
  dismissible?: boolean;
  action?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  onDismiss?: (event: ForgeCustomEvent) => void;
  onAction?: (event: ForgeCustomEvent) => void;
}

// Toast Container component types
export interface ForgeToastContainerProps extends BaseForgeComponentProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  'max-toasts'?: number;
}

// Data Grid component types
export interface ForgeDataGridProps extends BaseForgeComponentProps {
  data?: any[];
  columns?: Array<{
    key: string;
    title: string;
    sortable?: boolean;
    filterable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
    editable?: boolean;
    type?: 'text' | 'number' | 'date' | 'boolean' | 'select';
  }>;
  sortable?: boolean;
  filterable?: boolean;
  selectable?: boolean | 'multiple';
  editable?: boolean;
  'page-size'?: number;
  'current-page'?: number;
  'total-items'?: number;
  loading?: boolean;
  'empty-message'?: string;
  onSort?: (event: ForgeCustomEvent<{ key: string; direction: 'asc' | 'desc' }>) => void;
  onFilter?: (event: ForgeCustomEvent<{ filters: Record<string, any> }>) => void;
  onSelect?: (event: ForgeCustomEvent<{ selected: any[] }>) => void;
  onRowClick?: (event: ForgeCustomEvent<{ row: any; index: number }>) => void;
  onEdit?: (event: ForgeCustomEvent<{ row: any; key: string; value: any }>) => void;
  onPageChange?: (event: ForgeCustomEvent<{ page: number }>) => void;
}

// Framework-specific declarations

// React JSX support
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Atoms
      'forge-button': ForgeButtonProps & React.DOMAttributes<HTMLElement>;
      'forge-input': ForgeInputProps & React.DOMAttributes<HTMLElement>;
      'forge-icon': ForgeIconProps & React.DOMAttributes<HTMLElement>;
      'forge-alert': ForgeAlertProps & React.DOMAttributes<HTMLElement>;
      'forge-checkbox': ForgeCheckboxProps & React.DOMAttributes<HTMLElement>;
      'forge-badge': ForgeBadgeProps & React.DOMAttributes<HTMLElement>;
      'forge-switch': ForgeSwitchProps & React.DOMAttributes<HTMLElement>;
      'forge-radio-group': ForgeRadioGroupProps & React.DOMAttributes<HTMLElement>;
      'forge-select': ForgeSelectProps & React.DOMAttributes<HTMLElement>;
      'forge-progress': ForgeProgressProps & React.DOMAttributes<HTMLElement>;
      'forge-progress-circle': ForgeProgressCircleProps & React.DOMAttributes<HTMLElement>;
      'forge-skeleton': ForgeSkeletonProps & React.DOMAttributes<HTMLElement>;
      'forge-aspect-ratio': ForgeAspectRatioProps & React.DOMAttributes<HTMLElement>;
      'forge-avatar': ForgeAvatarProps & React.DOMAttributes<HTMLElement>;
      
      // Molecules
      'forge-form-field': ForgeFormFieldProps & React.DOMAttributes<HTMLElement>;
      'forge-multi-select': ForgeMultiSelectProps & React.DOMAttributes<HTMLElement>;
      'forge-date-picker': ForgeDatePickerProps & React.DOMAttributes<HTMLElement>;
      'forge-dropdown': ForgeDropdownProps & React.DOMAttributes<HTMLElement>;
      'forge-card': ForgeCardProps & React.DOMAttributes<HTMLElement>;
      'forge-modal': ForgeModalProps & React.DOMAttributes<HTMLElement>;
      'forge-toast': ForgeToastProps & React.DOMAttributes<HTMLElement>;
      'forge-toast-container': ForgeToastContainerProps & React.DOMAttributes<HTMLElement>;
      
      // Organisms
      'forge-data-grid': ForgeDataGridProps & React.DOMAttributes<HTMLElement>;
    }
  }
}

// Vue component types
declare module '@vue/runtime-dom' {
  export interface HTMLElementTagNameMap {
    // Atoms
    'forge-button': ForgeButtonProps;
    'forge-input': ForgeInputProps;
    'forge-icon': ForgeIconProps;
    'forge-alert': ForgeAlertProps;
    'forge-checkbox': ForgeCheckboxProps;
    'forge-badge': ForgeBadgeProps;
    'forge-switch': ForgeSwitchProps;
    'forge-radio-group': ForgeRadioGroupProps;
    'forge-select': ForgeSelectProps;
    'forge-progress': ForgeProgressProps;
    'forge-progress-circle': ForgeProgressCircleProps;
    'forge-skeleton': ForgeSkeletonProps;
    'forge-aspect-ratio': ForgeAspectRatioProps;
    'forge-avatar': ForgeAvatarProps;
    
    // Molecules
    'forge-form-field': ForgeFormFieldProps;
    'forge-multi-select': ForgeMultiSelectProps;
    'forge-date-picker': ForgeDatePickerProps;
    'forge-dropdown': ForgeDropdownProps;
    'forge-card': ForgeCardProps;
    'forge-modal': ForgeModalProps;
    'forge-toast': ForgeToastProps;
    'forge-toast-container': ForgeToastContainerProps;
    
    // Organisms
    'forge-data-grid': ForgeDataGridProps;
  }
}

// Export types for external use
export type {
  // Base types
  ForgeCustomEvent,
  BaseForgeComponentProps,
  
  // Atom component types
  ForgeButtonProps,
  ForgeInputProps,
  ForgeIconProps,
  ForgeAlertProps,
  ForgeCheckboxProps,
  ForgeBadgeProps,
  ForgeSwitchProps,
  ForgeRadioGroupProps,
  ForgeSelectProps,
  ForgeProgressProps,
  ForgeProgressCircleProps,
  ForgeSkeletonProps,
  ForgeAspectRatioProps,
  ForgeAvatarProps,
  
  // Molecule component types
  ForgeFormFieldProps,
  ForgeMultiSelectProps,
  ForgeDatePickerProps,
  ForgeDropdownProps,
  ForgeCardProps,
  ForgeModalProps,
  ForgeToastProps,
  ForgeToastContainerProps,
  
  // Organism component types
  ForgeDataGridProps,
};