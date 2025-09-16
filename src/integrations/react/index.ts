/**
 * @fileoverview Unified React Integration for @nexcraft/forge
 * 
 * This module provides unified React wrappers for all Forge Web Components,
 * ensuring seamless integration across all React environments including:
 * - TypeScript support with proper React prop types
 * - Event handler mapping (onClick, onChange, etc.)
 * - Controlled/uncontrolled component patterns
 * - **Universal SSR/Client compatibility** - single components work everywhere
 * - Progressive enhancement with semantic HTML fallbacks
 * - Form integration utilities
 * 
 * ## Usage
 * 
 * Import and use components directly - they work everywhere:
 * 
 * ```tsx
 * import { ForgeButton, ForgeInput, ForgeCard } from '@nexcraft/forge/integrations/react';
 * 
 * function App() {
 *   return (
 *     <ForgeCard>
 *       <ForgeInput placeholder="Enter your name" />
 *       <ForgeButton variant="primary">Submit</ForgeButton>
 *     </ForgeCard>
 *   );
 * }
 * ```
 * 
 * **Universal Components:** Single components work in all environments:
 * - SSR: Renders semantic HTML with proper styling and accessibility
 * - Client: Progressively enhances to full web components  
 * - Hydration: Seamlessly upgrades from HTML to web component
 * - **No ClientOnly wrapper needed** - components are environment-aware
 * 
 * ADR Compliance:
 * - ADR-001: Web Components abstraction with React wrappers
 * - ADR-002: Shadow DOM encapsulation (client-side enhancement)
 * - ADR-007: Framework integration patterns
 * - ADR-013: TypeScript interfaces for React props
 * - ADR-018: Unified SSR/Client architecture
 */

// Universal React wrapper components - Work in all environments (SSR + Client)
// Atom Components
export { ForgeAlert } from './components/ForgeAlert';
export { ForgeAspectRatio } from './components/ForgeAspectRatio';
export { ForgeAvatar } from './components/ForgeAvatar';
export { ForgeBadge } from './components/ForgeBadge';
export { ForgeButton } from './components/ForgeButton';
export { ForgeCheckbox } from './components/ForgeCheckbox';
export { ForgeIcon } from './components/ForgeIcon';
export { ForgeInput } from './components/ForgeInput';
export { ForgeProgress } from './components/ForgeProgress';
export { ForgeProgressCircle } from './components/ForgeProgressCircle';
export { ForgeRadioGroup } from './components/ForgeRadioGroup';
export { ForgeSelect } from './components/ForgeSelect';
export { ForgeSkeleton } from './components/ForgeSkeleton';
export { ForgeSwitch } from './components/ForgeSwitch';

// Molecule Components
export { ForgeCard } from './components/ForgeCard';
export { ForgeDatePicker } from './components/ForgeDatePicker';
export { ForgeDropdown } from './components/ForgeDropdown';
export { ForgeFormField } from './components/ForgeFormField';
export { ForgeModal } from './components/ForgeModal';
export { ForgeMultiSelect } from './components/ForgeMultiSelect';
export { ForgeToast } from './components/ForgeToast';
export { ForgeTooltip } from './components/ForgeTooltip';

// Organism Components
export { ForgeAccordion } from './components/ForgeAccordion';
export { ForgeDataGrid } from './components/ForgeDataGrid';
export { ForgeDataTable } from './components/ForgeDataTable';
export { ForgeNavigationBar } from './components/ForgeNavigationBar';
export { ForgePagination } from './components/ForgePagination';
export { ForgeTabs } from './components/ForgeTabs';
export { ForgeTreeView } from './components/ForgeTreeView';

// React-specific utilities
export { useForgeComponent } from './hooks/useForgeComponent';
export { useForgeEvent } from './hooks/useForgeEvent';
export { ForgeProvider } from './context/ForgeProvider';

// Form integration hooks (re-exported from main react.ts)
export { useForgeReactHookForm, useForgeFormik } from '../react';


// TypeScript interfaces for React props - Complete library coverage
export type {
  // Atom Component Props
  ForgeAlertProps,
  ForgeAspectRatioProps,
  ForgeAvatarProps,
  ForgeBadgeProps,
  ForgeButtonProps,
  ForgeCheckboxProps,
  ForgeIconProps,
  ForgeInputProps,
  ForgeProgressProps,
  ForgeProgressCircleProps,
  ForgeRadioGroupProps,
  ForgeSelectProps,
  ForgeSkeletonProps,
  ForgeSwitchProps,
  
  // Molecule Component Props
  ForgeCardProps,
  ForgeDatePickerProps,
  ForgeDropdownProps,
  ForgeFormFieldProps,
  ForgeModalProps,
  ForgeMultiSelectProps,
  ForgeToastProps,
  ForgeTooltipProps,
  
  // Organism Component Props
  ForgeAccordionProps,
  ForgeDataGridProps,
  ForgeDataTableProps,
  ForgeNavigationBarProps,
  ForgePaginationProps,
  ForgeTabsProps,
  ForgeTreeViewProps,
  
  // Base Props
  ForgeComponentProps,
} from './types';

// Unified wrapper utilities for advanced use cases
export { createUnifiedWrapper } from './utils/createUnifiedWrapper';