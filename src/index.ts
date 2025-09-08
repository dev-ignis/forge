// Core exports
export { BaseElement } from './core/BaseElement';
export type { 
  AIMetadata,
  AIAction,
  AIStateExplanation,
  AIComponentState,
  AIDataType,
  AICriticality,
  AIInteractionPattern,
  AIValidationRule,
  AIRelation,
  AIPerformanceMetrics
} from './core/ai-metadata.types';
export { AIMetadataBuilder, AIMetadataUtils } from './core/ai-metadata.types';

// Component exports
export { ForgeButton } from './components/atoms/button/button';
export { type ButtonVariant, type ButtonSize, type ButtonType } from './components/atoms/button/button.types';
export { ForgeInput, type InputType, type InputSize, type InputVariant } from './components/atoms/input/input';
export { ForgeIcon, commonIcons, type IconSize } from './components/atoms/icon/icon';
export { ForgeAlert, type AlertSeverity, type AlertVariant } from './components/atoms/alert/alert';
export { ForgeCheckbox, type CheckboxSize, type CheckboxVariant, type CheckboxLabelPosition } from './components/atoms/checkbox/checkbox';
export { ForgeBadge, type BadgeVariant, type BadgeSize, type BadgePosition } from './components/atoms/badge/badge';
export { ForgeSwitch, type SwitchSize, type SwitchLabelPosition } from './components/atoms/switch/switch';
export { ForgeRadioGroup, type RadioOption, type RadioOrientation, type RadioLabelPosition, type RadioSize } from './components/atoms/radio-group/radio-group';
export { ForgeSelect, type SelectOption, type SelectSize, type SelectVariant } from './components/atoms/select/select';
export { ForgeProgress } from './components/atoms/progress/progress';
export { ForgeProgressCircle } from './components/atoms/progress/progress-circle';
export { ForgeSkeleton } from './components/atoms/skeleton/skeleton';
export { ForgeAspectRatio } from './components/atoms/aspect-ratio/aspect-ratio';

// Molecule exports
export { ForgeFormField, type FormFieldVariant, type FormFieldValidationState } from './components/molecules/form-field/form-field';
export { ForgeMultiSelect, type MultiSelectOption } from './components/molecules/multi-select/multi-select';
export { ForgeDatePicker, type DateRange } from './components/molecules/date-picker/date-picker';
export { ForgeCard, type CardVariant, type CardSize } from './components/molecules/card/card';
export { ForgeModal, type ModalSize, type ModalScrollBehavior } from './components/molecules/modal/modal';
export { ForgeToast } from './components/molecules/toast/toast';
export { ForgeToastContainer, showToast, toast } from './components/molecules/toast/toast-container';

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
  
  // Component props and events
  ForgeButtonProps,
  ForgeButtonEventDetail,
  ForgeButtonEvents,
  ForgeInputProps,
  ForgeInputEventDetail,
  ForgeInputEvents,
  ForgeSelectProps,
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