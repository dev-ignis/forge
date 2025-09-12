/**
 * @fileoverview React Hook Form Adapter Components
 * 
 * Provides guaranteed-compatible components for React Hook Form integration.
 * These components properly bridge Forge components with React Hook Form's API.
 * 
 * @example
 * ```tsx
 * import { RHFForgeInput, RHFForgeSelect } from '@nexcraft/forge/integrations/react/adapters';
 * 
 * function MyForm() {
 *   const { control } = useForm();
 *   
 *   return (
 *     <form>
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
 */

import React from 'react';
import { ForgeInput } from '../components/ForgeInput';
import { ForgeSelect } from '../components/ForgeSelect';
import { ForgeCheckbox } from '../components/ForgeCheckbox';
import { ForgeRadioGroup } from '../components/ForgeRadioGroup';
import type { ForgeInputProps, ForgeSelectProps, ForgeCheckboxProps, ForgeRadioGroupProps } from '../types';

// Dynamic imports to handle optional react-hook-form dependency
type Controller = any;
type Control<T extends Record<string, any> = Record<string, any>> = any;
type FieldValues = Record<string, any>;
type Path<T extends FieldValues> = keyof T;
type RegisterOptions<T extends FieldValues = FieldValues, TName extends Path<T> = Path<T>> = any;

// Get Controller dynamically
let ControllerComponent: any = null;
try {
  if (typeof window !== 'undefined') {
    // Client-side dynamic import
    import('react-hook-form').then(rhf => {
      ControllerComponent = rhf.Controller;
    });
  } else {
    // Server-side - Controller won't work anyway, so skip
    ControllerComponent = null;
  }
} catch {
  // react-hook-form not available
}

// Base adapter props
interface BaseRHFProps<T extends FieldValues, TName extends Path<T>> {
  name: TName;
  control: Control<T>;
  rules?: RegisterOptions<T, TName>;
  rhfDefaultValue?: T[TName];
}

// React Hook Form Input Adapter
export interface RHFForgeInputProps<T extends FieldValues, TName extends Path<T>> 
  extends BaseRHFProps<T, TName>, Omit<ForgeInputProps, 'onChange' | 'value' | 'name'> {}

export function RHFForgeInput<T extends FieldValues, TName extends Path<T>>({
  name,
  control,
  rules,
  rhfDefaultValue,
  ...forgeProps
}: RHFForgeInputProps<T, TName>) {
  // Simple wrapper that uses runtime require to avoid build issues
  let Controller: any = null;
  try {
    Controller = (global as any).reactHookFormController || (typeof require !== 'undefined' ? require('react-hook-form')?.Controller : null);
  } catch {
    Controller = null;
  }
  
  if (!Controller) {
    console.warn('RHFForgeInput: react-hook-form not found. Install react-hook-form to use this component.');
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={rhfDefaultValue}
      render={({ field, fieldState }: any) => (
        <ForgeInput
          {...forgeProps}
          name={field.name}
          value={field.value || ''}
          onChange={(value: string) => field.onChange(value)}
          onBlur={field.onBlur}
          error={fieldState.invalid}
          errorText={fieldState.error?.message}
        />
      )}
    />
  );
}

// React Hook Form Select Adapter
export interface RHFForgeSelectProps<T extends FieldValues, TName extends Path<T>>
  extends BaseRHFProps<T, TName>, Omit<ForgeSelectProps, 'onChange' | 'value' | 'name'> {}

export function RHFForgeSelect<T extends FieldValues, TName extends Path<T>>({
  name,
  control,
  rules,
  rhfDefaultValue,
  ...forgeProps
}: RHFForgeSelectProps<T, TName>) {
  let Controller: any = null;
  try {
    Controller = (global as any).reactHookFormController || (typeof require !== 'undefined' ? require('react-hook-form')?.Controller : null);
  } catch {
    Controller = null;
  }
  
  if (!Controller) {
    console.warn('RHFForgeSelect: react-hook-form not found. Install react-hook-form to use this component.');
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={rhfDefaultValue}
      render={({ field, fieldState }: any) => (
        <ForgeSelect
          {...forgeProps}
          name={field.name}
          value={field.value}
          onChange={(value: string | string[]) => field.onChange(value)}
          onBlur={field.onBlur}
          error={fieldState.invalid}
        />
      )}
    />
  );
}

// React Hook Form Checkbox Adapter  
export interface RHFForgeCheckboxProps<T extends FieldValues, TName extends Path<T>>
  extends BaseRHFProps<T, TName>, Omit<ForgeCheckboxProps, 'onChange' | 'checked' | 'name'> {}

export function RHFForgeCheckbox<T extends FieldValues, TName extends Path<T>>({
  name,
  control,
  rules,
  rhfDefaultValue,
  ...forgeProps
}: RHFForgeCheckboxProps<T, TName>) {
  let Controller: any = null;
  try {
    Controller = (global as any).reactHookFormController || (typeof require !== 'undefined' ? require('react-hook-form')?.Controller : null);
  } catch {
    Controller = null;
  }
  
  if (!Controller) {
    console.warn('RHFForgeCheckbox: react-hook-form not found. Install react-hook-form to use this component.');
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={rhfDefaultValue}
      render={({ field, fieldState }: any) => (
        <ForgeCheckbox
          {...forgeProps}
          name={field.name}
          checked={field.value}
          onChange={(checked: boolean) => field.onChange(checked)}
          onBlur={field.onBlur}
        />
      )}
    />
  );
}

// React Hook Form Radio Group Adapter
export interface RHFForgeRadioGroupProps<T extends FieldValues, TName extends Path<T>>
  extends BaseRHFProps<T, TName>, Omit<ForgeRadioGroupProps, 'onChange' | 'value' | 'name'> {}

export function RHFForgeRadioGroup<T extends FieldValues, TName extends Path<T>>({
  name,
  control,
  rules,
  rhfDefaultValue,
  ...forgeProps
}: RHFForgeRadioGroupProps<T, TName>) {
  let Controller: any = null;
  try {
    Controller = (global as any).reactHookFormController || (typeof require !== 'undefined' ? require('react-hook-form')?.Controller : null);
  } catch {
    Controller = null;
  }
  
  if (!Controller) {
    console.warn('RHFForgeRadioGroup: react-hook-form not found. Install react-hook-form to use this component.');
    return null;
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={rhfDefaultValue}
      render={({ field, fieldState }: any) => (
        <ForgeRadioGroup
          {...forgeProps}
          name={field.name}
          value={field.value}
          onChange={(value: string) => field.onChange(value)}
          onBlur={field.onBlur}
        />
      )}
    />
  );
}

// Utility function for creating custom RHF adapters
export function createRHFAdapter<
  TComponent extends React.ComponentType<any>,
  TProps extends Record<string, any>
>(
  Component: TComponent,
  propMapper: (field: any, fieldState: any, componentProps: any) => any
) {
  return function RHFAdapter<T extends FieldValues, TName extends Path<T>>({
    name,
    control,
    rules,
    rhfDefaultValue,
    ...componentProps
  }: BaseRHFProps<T, TName> & TProps) {
    let Controller: any = null;
  try {
    Controller = (global as any).reactHookFormController || (typeof require !== 'undefined' ? require('react-hook-form')?.Controller : null);
  } catch {
    Controller = null;
  }
    
    if (!Controller) {
      console.warn('createRHFAdapter: react-hook-form not found. Install react-hook-form to use this component.');
      return null;
    }

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={rhfDefaultValue}
        render={({ field, fieldState }: any) => (
          <Component {...propMapper(field, fieldState, componentProps)} />
        )}
      />
    );
  };
}