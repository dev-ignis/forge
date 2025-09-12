/**
 * @fileoverview React TypeScript interfaces for @nexcraft/forge components
 * 
 * Provides proper TypeScript support for React wrapper components,
 * addressing GitHub Issue #17 request for "TypeScript definitions for component props"
 */

import type { ReactNode, HTMLAttributes, FormEvent, MouseEvent, ChangeEvent } from 'react';
import type {
  ButtonVariant,
  ButtonSize,
  InputType,
  InputSize,
  InputVariant,
  AlertSeverity,
  AlertVariant,
  CardVariant,
  CardSize,
  ModalSize,
  GridColumn,
  GridData,
  AvatarSize,
  AvatarStatus,
  StatusPosition,
  AvatarShape,
  DropdownItem,
  DropdownPosition,
  DropdownVariant,
  DropdownSize,
} from '../../../index';

// Base interface for all Forge React components
export interface ForgeComponentProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  children?: ReactNode;
}

// Button component props
export interface ForgeButtonProps extends ForgeComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

// Input component props  
export interface ForgeInputProps extends ForgeComponentProps {
  type?: InputType;
  size?: InputSize;
  variant?: InputVariant;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorText?: string;
  label?: string;
  // Support both Forge signature and React Hook Form signature for better compatibility
  onChange?: ((value: string, event: FormEvent<HTMLElement>) => void) | ((event: ChangeEvent<HTMLInputElement>) => void);
  onFocus?: (event: FormEvent<HTMLElement>) => void;
  onBlur?: (event: FormEvent<HTMLElement>) => void;
}

// Alert component props
export interface ForgeAlertProps extends ForgeComponentProps {
  severity?: AlertSeverity;
  variant?: AlertVariant;
  dismissible?: boolean;
  title?: string;
  onDismiss?: () => void;
}

// Card component props
export interface ForgeCardProps extends ForgeComponentProps {
  variant?: CardVariant;
  size?: CardSize;
  hoverable?: boolean;
  padding?: string;
}

// Checkbox component props
export interface ForgeCheckboxProps extends ForgeComponentProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  value?: string;
  onChange?: (checked: boolean, event: FormEvent<HTMLElement>) => void;
}

// Progress component props
export interface ForgeProgressProps extends ForgeComponentProps {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'linear' | 'circular';
}

// Modal component props
export interface ForgeModalProps extends ForgeComponentProps {
  open?: boolean;
  size?: ModalSize;
  title?: string;
  showCloseButton?: boolean;
  backdrop?: boolean;
  escapeClose?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

// DataGrid component props - addressing the advanced component from Phase 8
export interface ForgeDataGridProps extends ForgeComponentProps {
  columns: GridColumn[];
  data: GridData[];
  selectable?: boolean;
  selectionType?: 'single' | 'multiple';
  virtualScrolling?: boolean;
  virtualThreshold?: number;
  showToolbar?: boolean;
  showSearch?: boolean;
  searchQuery?: string;
  loading?: boolean;
  editable?: boolean;
  onSelectionChanged?: (selectedRows: string[], allSelected: boolean) => void;
  onCellEdit?: (rowId: string, field: string, oldValue: unknown, newValue: unknown) => void;
  onSortChanged?: (sorts: any[]) => void;
  onSearchChanged?: (query: string, results: GridData[]) => void;
}

// Avatar component props
export interface ForgeAvatarProps extends ForgeComponentProps {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  initials?: string;
  status?: AvatarStatus;
  statusPosition?: StatusPosition;
  shape?: AvatarShape;
  badge?: string | number;
  loading?: boolean;
  onError?: (event: FormEvent<HTMLElement>) => void;
  onLoad?: (event: FormEvent<HTMLElement>) => void;
}

// Dropdown component props
export interface ForgeDropdownProps extends ForgeComponentProps {
  items: DropdownItem[];
  label?: string;
  placeholder?: string;
  position?: DropdownPosition;
  variant?: DropdownVariant;
  size?: DropdownSize;
  disabled?: boolean;
  multiSelect?: boolean;
  searchable?: boolean;
  maxHeight?: string;
  virtualScrolling?: boolean;
  virtualThreshold?: number;
  loading?: boolean;
  selectedItems?: string[];
  onSelectionChange?: (selectedItems: string[], allSelected: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onSearch?: (query: string, results: DropdownItem[]) => void;
}

// Additional Atom Component Props
export interface ForgeBadgeProps extends ForgeComponentProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export interface ForgeIconProps extends ForgeComponentProps {
  name: string;
  size?: string | number;
  color?: string;
}

export interface ForgeSelectProps extends ForgeComponentProps {
  value?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  onChange?: (value: string | string[], event: FormEvent<HTMLElement>) => void;
}

export interface ForgeSwitchProps extends ForgeComponentProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (checked: boolean, event: FormEvent<HTMLElement>) => void;
}

export interface ForgeSkeletonProps extends ForgeComponentProps {
  width?: string | number;
  height?: string | number;
  animated?: boolean;
  variant?: 'text' | 'rectangular' | 'circular';
}

export interface ForgeRadioGroupProps extends ForgeComponentProps {
  name: string;
  value?: string;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  onChange?: (value: string, event: FormEvent<HTMLElement>) => void;
}

export interface ForgeAspectRatioProps extends ForgeComponentProps {
  ratio?: string | number;
}

export interface ForgeProgressCircleProps extends ForgeComponentProps {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  size?: string | number;
  strokeWidth?: number;
  showValue?: boolean;
}

// Molecule Component Props
export interface ForgeTooltipProps extends ForgeComponentProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
}

export interface ForgeToastProps extends ForgeComponentProps {
  title?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  closeable?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  onClose?: () => void;
}

export interface ForgeFormFieldProps extends ForgeComponentProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
}

export interface ForgeDatePickerProps extends ForgeComponentProps {
  value?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  placeholder?: string;
  format?: string;
  onChange?: (value: string, event: FormEvent<HTMLElement>) => void;
}

export interface ForgeMultiSelectProps extends ForgeComponentProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string[];
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  maxSelections?: number;
  onChange?: (value: string[], event: FormEvent<HTMLElement>) => void;
}

// Organism Component Props
export interface ForgeTabsProps extends ForgeComponentProps {
  activeTab?: string;
  variant?: 'default' | 'pills' | 'underline';
  orientation?: 'horizontal' | 'vertical';
  tabs?: Array<{ id: string; label: string; disabled?: boolean; content?: ReactNode }>;
  onTabChange?: (tabId: string) => void;
}

export interface ForgeAccordionProps extends Omit<ForgeComponentProps, 'onToggle'> {
  title: string;
  open?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
  onToggle?: (open: boolean) => void;
}

export interface ForgeDataTableProps extends ForgeComponentProps {
  columns: Array<{ key: string; title: string; sortable?: boolean; width?: string }>;
  data: Array<Record<string, any>>;
  sortable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  totalItems?: number;
  loading?: boolean;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onSelectionChange?: (selectedRows: any[]) => void;
  onPageChange?: (page: number) => void;
}

export interface ForgePaginationProps extends ForgeComponentProps {
  currentPage: number;
  totalPages: number;
  pageSize?: number;
  totalItems?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  disabled?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface ForgeNavigationBarProps extends ForgeComponentProps {
  brand?: ReactNode;
  items?: Array<{ id: string; label: string; href?: string; active?: boolean; disabled?: boolean }>;
  variant?: 'default' | 'dark' | 'light';
  fixed?: boolean;
  sticky?: boolean;
  onItemClick?: (itemId: string) => void;
}

export interface ForgeTreeViewProps extends Omit<ForgeComponentProps, 'onSelect'> {
  data: Array<{
    id: string;
    label: string;
    children?: any[];
    disabled?: boolean;
    selected?: boolean;
    expanded?: boolean;
  }>;
  selectable?: boolean;
  multiSelect?: boolean;
  expandable?: boolean;
  showConnectors?: boolean;
  onSelect?: (nodeId: string, selected: boolean) => void;
  onExpand?: (nodeId: string, expanded: boolean) => void;
}