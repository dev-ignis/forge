/**
 * @fileoverview React Hook Form Integration for @nexcraft/forge
 * 
 * This package provides React Hook Form adapter components that seamlessly
 * integrate Forge Web Components with React Hook Form's Controller pattern.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { RHFForgeInput, RHFForgeSelect } from '@nexcraft/forge-rhf';
 * import { useForm } from 'react-hook-form';
 * 
 * function MyForm() {
 *   const { control, handleSubmit } = useForm();
 *   
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <RHFForgeInput 
 *         name="email" 
 *         control={control} 
 *         placeholder="Enter email"
 *         rules={{ required: 'Email is required' }}
 *       />
 *       <RHFForgeSelect
 *         name="country"
 *         control={control}
 *         options={countryOptions}
 *         rules={{ required: 'Please select a country' }}
 *       />
 *     </form>
 *   );
 * }
 * ```
 * 
 * ## Installation
 * 
 * This package requires both `@nexcraft/forge` and `react-hook-form`:
 * 
 * ```bash
 * npm install @nexcraft/forge @nexcraft/forge-rhf react-hook-form
 * ```
 * 
 * ## Architecture Decision Records (ADR) Compliance
 * 
 * - ADR-007: Framework integration patterns
 * - ADR-013: TypeScript interfaces for React props
 * - ADR-019: Monorepo package boundaries (separate RHF package)
 * - ADR-020: Cross-package dependency management
 */

// React Hook Form Adapter Components
export { 
  RHFForgeInput, 
  RHFForgeSelect, 
  RHFForgeCheckbox, 
  RHFForgeRadioGroup,
  createRHFAdapter
} from './adapters/ReactHookFormAdapters';

// TypeScript interfaces for RHF adapter props
export type {
  RHFForgeInputProps,
  RHFForgeSelectProps, 
  RHFForgeCheckboxProps,
  RHFForgeRadioGroupProps
} from './adapters/ReactHookFormAdapters';