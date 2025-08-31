// Core exports
export { 
  BaseElement,
  type AIMetadata,
  type Action,
  type StateExplanation 
} from './core/BaseElement';

// Component exports
export { ForgeButton } from './components/atoms/button/button';
export { ForgeInput } from './components/atoms/input/input';
export { ForgeIcon, commonIcons, type IconSize } from './components/atoms/icon/icon';
export { ForgeAlert, type AlertSeverity as ForgeAlertSeverity, type AlertVariant as ForgeAlertVariant } from './components/atoms/alert/alert';
export { ForgeCheckbox, type CheckboxSize, type CheckboxVariant, type CheckboxLabelPosition } from './components/atoms/checkbox/checkbox';
export { ForgeBadge, type BadgeVariant, type BadgeSize, type BadgePosition } from './components/atoms/badge/badge';
export { ForgeSwitch, type SwitchSize, type SwitchLabelPosition } from './components/atoms/switch/switch';
export { ForgeRadioGroup, type RadioOption, type RadioOrientation, type RadioLabelPosition, type RadioSize } from './components/atoms/radio-group/radio-group';
export { ForgeSelect, type SelectOption, type SelectSize, type SelectVariant } from './components/atoms/select/select';

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