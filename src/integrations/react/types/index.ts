/**
 * @fileoverview React TypeScript interfaces for @nexcraft/forge components
 * 
 * Provides proper TypeScript support for React wrapper components,
 * addressing GitHub Issue #17 request for "TypeScript definitions for component props"
 */

import type { ReactNode, HTMLAttributes, FormEvent, MouseEvent } from 'react';
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
} from '../../../index';

// Base interface for all Forge React components
export interface ForgeComponentProps extends HTMLAttributes<HTMLElement> {
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
  helperText?: string;
  label?: string;
  onChange?: (value: string, event: FormEvent<HTMLElement>) => void;
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