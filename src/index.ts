// Core exports
export { BaseElement } from './core/BaseElement';

// Component exports
export { ForgeButton } from './components/atoms/button/button';

// Type exports
export type {
  // Common types
  ComponentSize,
  ComponentVariant,
  ComponentState,
  ComponentAlignment,
  ComponentOrientation,
  
  // Base interfaces
  ForgeComponentBase,
  ForgeInteractive,
  ForgeElement,
  
  // Button types
  ButtonVariant,
  ButtonSize,
  ButtonType,
  ForgeButtonProps,
  ForgeButtonEventDetail,
  ForgeButtonEvents,
  
  // Input types
  InputType,
  ForgeInputProps,
  ForgeInputEventDetail,
  ForgeInputEvents,
  
  // Select types
  SelectOption,
  ForgeSelectProps,
  
  // Alert types
  AlertSeverity,
  ForgeAlertProps,
  ForgeAlertEvents,
  
  // Card types
  ForgeCardProps,
  
  // Modal types
  ForgeModalProps,
  ForgeModalEvents,
  
  // Validation types
  ValidationRule,
  ValidationResult,
  
  // Theme types
  ThemeMode,
  ThemeConfig
} from './types';

// Utility exports
export {
  isForgeElement,
  isValidSize,
  isValidVariant,
  ClassBuilder,
  debounce,
  throttle,
  generateId,
  deepMerge
} from './types/component-types';

export { createForgeEvent } from './types';