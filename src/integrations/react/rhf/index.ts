/**
 * @fileoverview React Hook Form Integration for @nexcraft/forge
 * 
 * This module provides React Hook Form adapter components that seamlessly
 * integrate Forge Web Components with React Hook Form's Controller pattern.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { RHFForgeInput, RHFForgeSelect } from '@nexcraft/forge/integrations/rhf';
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
 * ## Requirements
 * 
 * This integration requires `react-hook-form` to be installed in your project:
 * 
 * ```bash
 * npm install react-hook-form
 * ```
 * 
 * ADR Compliance:
 * - ADR-007: Framework integration patterns
 * - ADR-013: TypeScript interfaces for React props
 * - ADR-022: Peer dependency management
 */

// React Hook Form Adapter Components
export { 
  RHFForgeInput, 
  RHFForgeSelect, 
  RHFForgeCheckbox, 
  RHFForgeRadioGroup,
  createRHFAdapter
} from './ReactHookFormAdapters';

// TypeScript interfaces for RHF adapter props
export type {
  RHFForgeInputProps,
  RHFForgeSelectProps, 
  RHFForgeCheckboxProps,
  RHFForgeRadioGroupProps
} from './ReactHookFormAdapters';