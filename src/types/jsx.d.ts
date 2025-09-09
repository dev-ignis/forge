/**
 * JSX Type Declarations for @nexcraft/forge Web Components
 * Provides comprehensive TypeScript support for all Forge components in React/JSX
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
  'aria-description'?: string;
  
  // Performance attributes
  'max-render-ms'?: number;
  'warn-on-violation'?: boolean;
  'performance-mode'?: 'auto' | 'fast' | 'balanced' | 'quality';
  'dev-mode'?: boolean;
  'show-metrics'?: boolean;
}

// Atom Component Props
export interface ForgeButtonProps extends BaseForgeComponentProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  'full-width'?: boolean;
  'icon-start'?: string;
  'icon-end'?: string;
  'aria-label'?: string;
  'aria-controls'?: string;
  'aria-expanded'?: 'true' | 'false';
  'aria-current'?: string;
  'aria-selected'?: 'true' | 'false';
  role?: string;
  tabIndex?: number;
  onClick?: (event: ForgeCustomEvent) => void;
}

export interface ForgeInputProps extends BaseForgeComponentProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
  placeholder?: string;
  name?: string;
  label?: string;
  'helper-text'?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  'validation-state'?: 'default' | 'error' | 'warning' | 'success';
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  clearable?: boolean;
  pattern?: string;
  minlength?: number;
  maxlength?: number;
  min?: number;
  max?: number;
  step?: number;
  autocomplete?: string;
  inputmode?: string;
  onInput?: (event: ForgeCustomEvent<{ value: string }>) => void;
  onChange?: (event: ForgeCustomEvent<{ value: string }>) => void;
  onFocus?: (event: ForgeCustomEvent) => void;
  onBlur?: (event: ForgeCustomEvent) => void;
}

export interface ForgeIconProps extends BaseForgeComponentProps {
  name?: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  spin?: boolean;
  pulse?: boolean;
  label?: string;
}

export interface ForgeAlertProps extends BaseForgeComponentProps {
  severity?: 'info' | 'success' | 'warning' | 'error';
  variant?: 'filled' | 'outlined' | 'standard';
  title?: string;
  message?: string;
  closable?: boolean;
  'animate-in'?: boolean;
  'auto-dismiss'?: number;
  icon?: string;
}

export interface ForgeCheckboxProps extends BaseForgeComponentProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  name?: string;
  value?: string;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  'label-position'?: 'start' | 'end';
  onChange?: (event: ForgeCustomEvent<{ checked: boolean }>) => void;
}

export interface ForgeBadgeProps extends BaseForgeComponentProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline';
  count?: number;
  'max-count'?: number;
  dot?: boolean;
  outlined?: boolean;
  pulse?: boolean;
  invisible?: boolean;
  content?: string;
}

export interface ForgeSwitchProps extends BaseForgeComponentProps {
  checked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  error?: boolean;
  name?: string;
  value?: string;
  label?: string;
  description?: string;
  'on-label'?: string;
  'off-label'?: string;
  size?: 'sm' | 'md' | 'lg';
  'label-position'?: 'start' | 'end' | 'top' | 'bottom';
  onChange?: (event: ForgeCustomEvent<{ checked: boolean }>) => void;
}

export interface ForgeRadioGroupProps extends BaseForgeComponentProps {
  value?: string;
  name?: string;
  label?: string;
  description?: string;
  options?: Array<{
    value: string;
    label: string;
    disabled?: boolean;
    description?: string;
  }>;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  'error-message'?: string;
  orientation?: 'horizontal' | 'vertical';
  'label-position'?: 'start' | 'end';
  size?: 'sm' | 'md' | 'lg';
  onChange?: (event: ForgeCustomEvent<{ value: string }>) => void;
}

export interface ForgeSelectProps extends BaseForgeComponentProps {
  value?: string;
  name?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  options?: Array<{
    value: string;
    label: string;
    disabled?: boolean;
    group?: string;
  }>;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  'error-message'?: string;
  searchable?: boolean;
  loading?: boolean;
  open?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  onChange?: (event: ForgeCustomEvent<{ value: string }>) => void;
}

export interface ForgeProgressProps extends BaseForgeComponentProps {
  value?: number;
  max?: number;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  indeterminate?: boolean;
  'aria-label'?: string;
}

export interface ForgeProgressCircleProps extends BaseForgeComponentProps {
  value?: number;
  max?: number;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  'stroke-width'?: number;
  'show-label'?: boolean;
  'hide-label'?: boolean;
  indeterminate?: boolean;
  'aria-label'?: string;
}

export interface ForgeSkeletonProps extends BaseForgeComponentProps {
  width?: string;
  height?: string;
  shape?: 'rounded' | 'square' | 'circle';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  'no-animation'?: boolean;
  'aria-label'?: string;
}

export interface ForgeAspectRatioProps extends BaseForgeComponentProps {
  ratio?: string;
  value?: number;
  'max-width'?: string;
  'max-height'?: string;
  center?: boolean;
  'object-fit'?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}

export interface ForgeAvatarProps extends BaseForgeComponentProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away' | 'none';
  'status-position'?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  shape?: 'circle' | 'square' | 'rounded';
  clickable?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: ForgeCustomEvent<{ src?: string; fallback?: string; status: string }>) => void;
}

// Molecule Component Props
export interface ForgeFormFieldProps extends BaseForgeComponentProps {
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  variant?: 'default' | 'floating' | 'inline';
  'validation-state'?: 'default' | 'error' | 'warning' | 'success';
  'error-message'?: string;
  'warning-message'?: string;
  'success-message'?: string;
  'help-text'?: string;
  required?: boolean;
  'show-optional'?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  pattern?: string;
  minlength?: number;
  maxlength?: number;
  min?: string;
  max?: string;
  onInput?: (event: ForgeCustomEvent<{ value: string }>) => void;
  onChange?: (event: ForgeCustomEvent<{ value: string }>) => void;
}

export interface ForgeMultiSelectProps extends BaseForgeComponentProps {
  options?: Array<{
    value: string;
    label: string;
    group?: string;
    disabled?: boolean;
  }>;
  value?: string[];
  placeholder?: string;
  'search-placeholder'?: string;
  disabled?: boolean;
  'show-search'?: boolean;
  'show-actions'?: boolean;
  'max-selections'?: number;
  'group-by'?: boolean;
  'no-results-text'?: string;
  onChange?: (event: ForgeCustomEvent<{ value: string[] }>) => void;
}

export interface ForgeDatePickerProps extends BaseForgeComponentProps {
  value?: string;
  range?: { start: string | null; end: string | null };
  placeholder?: string;
  format?: string;
  locale?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  'range-mode'?: boolean;
  'clear-button'?: boolean;
  min?: string;
  max?: string;
  'disabled-dates'?: string[];
  'week-start-monday'?: boolean;
  onChange?: (event: ForgeCustomEvent<{ value: string }>) => void;
}

export interface ForgeDropdownProps extends BaseForgeComponentProps {
  items?: Array<{
    id: string;
    label: string;
    value?: any;
    icon?: string;
    badge?: string | number;
    disabled?: boolean;
    divider?: boolean;
    group?: string;
    checked?: boolean;
    type?: 'default' | 'checkbox' | 'radio';
  }>;
  label?: string;
  position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right' | 'auto';
  variant?: 'default' | 'primary' | 'secondary' | 'minimal';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  'close-on-select'?: boolean;
  'multi-select'?: boolean;
  icon?: string;
  placeholder?: string;
  onSelect?: (event: ForgeCustomEvent<{ item: any }>) => void;
}

export interface ForgeCardProps extends BaseForgeComponentProps {
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  size?: 'small' | 'medium' | 'large';
  elevation?: number;
  clickable?: boolean;
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  subtitle?: string;
  'media-aspect'?: string;
  'no-header-border'?: boolean;
  'no-footer-border'?: boolean;
  'aria-label'?: string;
  onClick?: (event: ForgeCustomEvent) => void;
}

export interface ForgeModalProps extends BaseForgeComponentProps {
  open?: boolean;
  size?: 'small' | 'medium' | 'large' | 'full';
  title?: string;
  'show-close'?: boolean;
  'close-on-backdrop'?: boolean;
  'close-on-escape'?: boolean;
  'no-header-border'?: boolean;
  'no-footer-border'?: boolean;
  'scroll-behavior'?: 'body' | 'entire';
  'prevent-body-scroll'?: boolean;
  animation?: 'none' | 'fade' | 'slide';
  'stack-level'?: number;
  'aria-label'?: string;
  onOpen?: (event: ForgeCustomEvent) => void;
  onClose?: (event: ForgeCustomEvent) => void;
  onBackdropClick?: (event: ForgeCustomEvent) => void;
}

export interface ForgeTooltipProps extends BaseForgeComponentProps {
  text?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  'show-delay'?: number;
  'hide-delay'?: number;
  disabled?: boolean;
}

export interface ForgeToastProps extends BaseForgeComponentProps {
  title?: string;
  message?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  dismissible?: boolean;
  'show-progress'?: boolean;
  persistent?: boolean;
  'toast-id'?: string;
  onDismiss?: (event: ForgeCustomEvent) => void;
}

export interface ForgeToastContainerProps extends BaseForgeComponentProps {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  'max-toasts'?: number;
  'stack-newest'?: boolean;
}

// Organism Component Props
export interface ForgeTabsProps extends BaseForgeComponentProps {
  'active-tab'?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline';
  closeable?: boolean;
  'drag-reorder'?: boolean;
  'scroll-buttons'?: boolean;
  onTabChange?: (event: ForgeCustomEvent<{ tabId: string }>) => void;
  onTabClose?: (event: ForgeCustomEvent<{ tabId: string }>) => void;
}

export interface ForgePaginationProps extends BaseForgeComponentProps {
  'current-page'?: number;
  'total-pages'?: number;
  'page-size'?: number;
  'total-items'?: number;
  'show-size-selector'?: boolean;
  'show-first-last'?: boolean;
  'show-info'?: boolean;
  'max-visible'?: number;
  disabled?: boolean;
  onPageChange?: (event: ForgeCustomEvent<{ page: number }>) => void;
  onPageSizeChange?: (event: ForgeCustomEvent<{ pageSize: number }>) => void;
}

export interface ForgeNavigationBarProps extends BaseForgeComponentProps {
  title?: string;
  logo?: string;
  'logo-alt'?: string;
  'show-menu-button'?: boolean;
  'show-search'?: boolean;
  'show-theme-toggle'?: boolean;
  'user-name'?: string;
  'user-avatar'?: string;
  onMenuClick?: (event: ForgeCustomEvent) => void;
  onSearch?: (event: ForgeCustomEvent<{ query: string }>) => void;
  onThemeToggle?: (event: ForgeCustomEvent) => void;
  onUserClick?: (event: ForgeCustomEvent) => void;
}

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
  'empty-message'?: string;
  onSort?: (event: ForgeCustomEvent<{ key: string; direction: 'asc' | 'desc' }>) => void;
  onFilter?: (event: ForgeCustomEvent<{ filters: Record<string, any> }>) => void;
  onSelect?: (event: ForgeCustomEvent<{ selected: any[] }>) => void;
  onRowClick?: (event: ForgeCustomEvent<{ row: any; index: number }>) => void;
}

export interface ForgeDataGridProps extends BaseForgeComponentProps {
  data?: any[];
  columns?: Array<{
    key: string;
    title: string;
    type?: 'text' | 'number' | 'date' | 'boolean' | 'select';
    sortable?: boolean;
    filterable?: boolean;
    editable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
  }>;
  'virtual-scrolling'?: boolean;
  'row-height'?: number;
  'edit-mode'?: 'inline' | 'dialog';
  'multi-sort'?: boolean;
  'show-export'?: boolean;
  'search-query'?: string;
  loading?: boolean;
  onEdit?: (event: ForgeCustomEvent<{ row: any; column: string; value: any }>) => void;
  onExport?: (event: ForgeCustomEvent<{ data: any[]; format: string }>) => void;
  onSearch?: (event: ForgeCustomEvent<{ query: string }>) => void;
}

export interface ForgeAccordionProps extends BaseForgeComponentProps {
  'allow-multiple'?: boolean;
  'default-expanded'?: string[];
  variant?: 'default' | 'bordered' | 'separated';
  onExpand?: (event: ForgeCustomEvent<{ itemId: string; expanded: boolean }>) => void;
}

export interface ForgeTreeViewProps extends BaseForgeComponentProps {
  data?: Array<{
    id: string;
    label: string;
    icon?: string;
    children?: any[];
    expanded?: boolean;
    selected?: boolean;
    disabled?: boolean;
  }>;
  'allow-selection'?: boolean;
  'multi-select'?: boolean;
  'show-checkboxes'?: boolean;
  'drag-drop'?: boolean;
  'lazy-loading'?: boolean;
  onSelect?: (event: ForgeCustomEvent<{ selected: string[] }>) => void;
  onExpand?: (event: ForgeCustomEvent<{ nodeId: string; expanded: boolean }>) => void;
  onDragDrop?: (event: ForgeCustomEvent<{ from: string; to: string }>) => void;
}

// React JSX Global Declarations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Atom Components
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

      // Molecule Components
      'forge-form-field': ForgeFormFieldProps & React.DOMAttributes<HTMLElement>;
      'forge-multi-select': ForgeMultiSelectProps & React.DOMAttributes<HTMLElement>;
      'forge-date-picker': ForgeDatePickerProps & React.DOMAttributes<HTMLElement>;
      'forge-dropdown': ForgeDropdownProps & React.DOMAttributes<HTMLElement>;
      'forge-card': ForgeCardProps & React.DOMAttributes<HTMLElement>;
      'forge-modal': ForgeModalProps & React.DOMAttributes<HTMLElement>;
      'forge-tooltip': ForgeTooltipProps & React.DOMAttributes<HTMLElement>;
      'forge-toast': ForgeToastProps & React.DOMAttributes<HTMLElement>;
      'forge-toast-container': ForgeToastContainerProps & React.DOMAttributes<HTMLElement>;

      // Organism Components
      'forge-tabs': ForgeTabsProps & React.DOMAttributes<HTMLElement>;
      'forge-pagination': ForgePaginationProps & React.DOMAttributes<HTMLElement>;
      'forge-navigation-bar': ForgeNavigationBarProps & React.DOMAttributes<HTMLElement>;
      'forge-data-table': ForgeDataTableProps & React.DOMAttributes<HTMLElement>;
      'forge-data-grid': ForgeDataGridProps & React.DOMAttributes<HTMLElement>;
      'forge-accordion': ForgeAccordionProps & React.DOMAttributes<HTMLElement>;
      'forge-tree-view': ForgeTreeViewProps & React.DOMAttributes<HTMLElement>;
    }
  }
}

// Export all prop interfaces for external use
export type {
  // Base types
  BaseForgeComponentProps,
  ForgeCustomEvent,
  
  // Atom component props
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
  
  // Molecule component props
  ForgeFormFieldProps,
  ForgeMultiSelectProps,
  ForgeDatePickerProps,
  ForgeDropdownProps,
  ForgeCardProps,
  ForgeModalProps,
  ForgeTooltipProps,
  ForgeToastProps,
  ForgeToastContainerProps,
  
  // Organism component props
  ForgeTabsProps,
  ForgePaginationProps,
  ForgeNavigationBarProps,
  ForgeDataTableProps,
  ForgeDataGridProps,
  ForgeAccordionProps,
  ForgeTreeViewProps,
};