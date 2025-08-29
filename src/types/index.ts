/**
 * Core type definitions for Forge UI Component Library
 */

// ============================================================================
// Common Types
// ============================================================================

/**
 * Standard component sizes used across the library
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Semantic color variants for components
 */
export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

/**
 * Component states for styling
 */
export type ComponentState = 'default' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'error';

/**
 * Alignment options
 */
export type ComponentAlignment = 'start' | 'center' | 'end' | 'stretch';

/**
 * Orientation for components that can be vertical or horizontal
 */
export type ComponentOrientation = 'horizontal' | 'vertical';

// ============================================================================
// Component Interfaces
// ============================================================================

/**
 * Base properties shared by all Forge components
 */
export interface ForgeComponentBase {
  /** Whether the component is disabled */
  disabled?: boolean;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** ARIA described by for accessibility */
  ariaDescribedBy?: string;
  /** Additional CSS classes */
  className?: string;
  /** Component ID */
  id?: string;
}

/**
 * Properties for interactive components
 */
export interface ForgeInteractive extends ForgeComponentBase {
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Whether the component should receive focus on mount */
  autoFocus?: boolean;
}

// ============================================================================
// Button Component
// ============================================================================

/**
 * Button component variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';

/**
 * Button component sizes
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button types for form submission
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Button component properties
 */
export interface ForgeButtonProps extends ForgeInteractive {
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Type attribute for the button */
  type?: ButtonType;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Whether the button should take full width of its container */
  fullWidth?: boolean;
  /** Icon to display before the text */
  iconStart?: string;
  /** Icon to display after the text */
  iconEnd?: string;
}

/**
 * Button click event detail
 */
export interface ForgeButtonEventDetail {
  variant: ButtonVariant;
  size: ButtonSize;
}

/**
 * Button events
 */
export interface ForgeButtonEvents {
  'forge-click': CustomEvent<ForgeButtonEventDetail>;
}

// ============================================================================
// Input Component
// ============================================================================

/**
 * Input types supported
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';

/**
 * Input component properties
 */
export interface ForgeInputProps extends ForgeInteractive {
  /** Type of input */
  type?: InputType;
  /** Input value */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Label for the input */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message */
  errorText?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input is readonly */
  readonly?: boolean;
  /** Minimum value (for number inputs) */
  min?: number | string;
  /** Maximum value (for number inputs) */
  max?: number | string;
  /** Step value (for number inputs) */
  step?: number | string;
  /** Pattern for validation */
  pattern?: string;
  /** Maximum length of input */
  maxLength?: number;
  /** Size variant */
  size?: ComponentSize;
  /** Whether to show clear button */
  clearable?: boolean;
}

/**
 * Input change event detail
 */
export interface ForgeInputEventDetail {
  value: string;
  previousValue: string;
}

/**
 * Input events
 */
export interface ForgeInputEvents {
  'forge-input': CustomEvent<ForgeInputEventDetail>;
  'forge-change': CustomEvent<ForgeInputEventDetail>;
  'forge-blur': CustomEvent<FocusEvent>;
  'forge-focus': CustomEvent<FocusEvent>;
  'forge-clear': CustomEvent<void>;
}

// ============================================================================
// Select Component
// ============================================================================

/**
 * Option for select components
 */
export interface SelectOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
  group?: string;
}

/**
 * Select component properties
 */
export interface ForgeSelectProps<T = unknown> extends ForgeInteractive {
  /** Options to display */
  options?: SelectOption<T>[];
  /** Selected value */
  value?: T;
  /** Placeholder text */
  placeholder?: string;
  /** Label for the select */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error text */
  errorText?: string;
  /** Whether selection is required */
  required?: boolean;
  /** Allow multiple selection */
  multiple?: boolean;
  /** Allow searching/filtering options */
  searchable?: boolean;
  /** Size variant */
  size?: ComponentSize;
  /** Whether to show clear button */
  clearable?: boolean;
}

// ============================================================================
// Alert Component
// ============================================================================

/**
 * Alert severity levels
 */
export type AlertSeverity = 'success' | 'info' | 'warning' | 'error';

/**
 * Alert component properties
 */
export interface ForgeAlertProps extends ForgeComponentBase {
  /** Severity/type of alert */
  severity?: AlertSeverity;
  /** Alert title */
  title?: string;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Icon to show */
  icon?: string | boolean;
  /** Action buttons/links to show */
  action?: string;
}

/**
 * Alert events
 */
export interface ForgeAlertEvents {
  'forge-dismiss': CustomEvent<void>;
}

// ============================================================================
// Card Component
// ============================================================================

/**
 * Card component properties
 */
export interface ForgeCardProps extends ForgeComponentBase {
  /** Whether the card is clickable/interactive */
  interactive?: boolean;
  /** Elevation level (shadow depth) */
  elevation?: 0 | 1 | 2 | 3 | 4;
  /** Padding size */
  padding?: ComponentSize;
  /** Whether to show a border */
  bordered?: boolean;
}

// ============================================================================
// Modal Component
// ============================================================================

/**
 * Modal component properties
 */
export interface ForgeModalProps extends ForgeComponentBase {
  /** Whether the modal is open */
  open?: boolean;
  /** Modal title */
  title?: string;
  /** Size of the modal */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether clicking backdrop closes modal */
  closeOnBackdropClick?: boolean;
  /** Whether ESC key closes modal */
  closeOnEscape?: boolean;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether to lock body scroll when open */
  lockScroll?: boolean;
}

/**
 * Modal events
 */
export interface ForgeModalEvents {
  'forge-open': CustomEvent<void>;
  'forge-close': CustomEvent<void>;
  'forge-backdrop-click': CustomEvent<void>;
}

// ============================================================================
// Event Helpers
// ============================================================================

/**
 * Helper type to extract event types from event interfaces
 */
export type EventMap<T> = T extends { [K in keyof T]: CustomEvent<infer U> }
  ? { [K in keyof T]: U }
  : never;

/**
 * Helper to create strongly-typed custom events
 */
export function createForgeEvent<T>(
  type: string,
  detail?: T,
  options?: EventInit
): CustomEvent<T> {
  return new CustomEvent(type, {
    detail,
    bubbles: true,
    composed: true,
    cancelable: true,
    ...options,
  });
}

// ============================================================================
// Validation
// ============================================================================

/**
 * Validation rule for form components
 */
export interface ValidationRule {
  /** Rule type */
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  /** Error message if validation fails */
  message: string;
  /** Value for the rule (e.g., min length number) */
  value?: unknown;
  /** Custom validation function */
  validator?: (value: unknown) => boolean;
}

/**
 * Validation result
 */
export interface ValidationResult {
  /** Whether validation passed */
  valid: boolean;
  /** Error messages if validation failed */
  errors?: string[];
}

// ============================================================================
// Theme Types
// ============================================================================

/**
 * Theme mode
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Theme configuration
 */
export interface ThemeConfig {
  /** Current theme mode */
  mode: ThemeMode;
  /** Custom token overrides */
  tokens?: Record<string, string>;
}

// ============================================================================
// Export all types
// ============================================================================

export * from './component-types';