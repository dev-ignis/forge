/**
 * @fileoverview React Integration for @nexcraft/forge
 * 
 * This module provides React wrappers for all Forge Web Components,
 * ensuring seamless integration with React applications including:
 * - TypeScript support with proper React prop types
 * - Event handler mapping (onClick, onChange, etc.)
 * - Controlled/uncontrolled component patterns
 * - SSR/Next.js compatibility
 * - Form integration (React Hook Form, Formik)
 * 
 * ADR Compliance:
 * - ADR-001: Web Components abstraction with React wrappers
 * - ADR-002: Shadow DOM encapsulation maintained
 * - ADR-007: Framework integration patterns
 * - ADR-013: TypeScript interfaces for React props
 */

// React wrapper components - addressing GitHub Issue #17
export { ForgeButton } from './components/ForgeButton';
export { ForgeInput } from './components/ForgeInput';
export { ForgeAlert } from './components/ForgeAlert';
export { ForgeCard } from './components/ForgeCard';
export { ForgeCheckbox } from './components/ForgeCheckbox';
export { ForgeProgress } from './components/ForgeProgress';
export { ForgeModal } from './components/ForgeModal';
export { ForgeDataGrid } from './components/ForgeDataGrid';
export { ForgeAvatar } from './components/ForgeAvatar';
export { ForgeDropdown } from './components/ForgeDropdown';

// React-specific utilities
export { useForgeComponent } from './hooks/useForgeComponent';
export { useForgeEvent } from './hooks/useForgeEvent';
export { ForgeProvider } from './context/ForgeProvider';

// TypeScript interfaces for React props
export type {
  ForgeButtonProps,
  ForgeInputProps,
  ForgeAlertProps,
  ForgeCardProps,
  ForgeCheckboxProps,
  ForgeProgressProps,
  ForgeModalProps,
  ForgeDataGridProps,
  ForgeAvatarProps,
  ForgeDropdownProps,
} from './types';

// SSR utilities for Next.js
export { withSSRSupport } from './utils/ssr';
export { ClientOnly } from './components/ClientOnly';