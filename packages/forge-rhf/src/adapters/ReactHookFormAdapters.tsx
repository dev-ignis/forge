/**
 * @fileoverview React Hook Form Adapter Components
 * 
 * Provides guaranteed-compatible components for React Hook Form integration.
 * These components properly bridge Forge components with React Hook Form's API.
 * 
 * @example
 * ```tsx
 * import { RHFForgeInput, RHFForgeSelect } from '@nexcraft/forge-rhf';
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

// Import react-hook-form directly - this is now a separate package
// so users explicitly opt-in by installing @nexcraft/forge-rhf
import { Controller, type FieldValues, type Path, type Control, type RegisterOptions } from 'react-hook-form';

// Import from main package using TypeScript path mapping
import { ForgeInput } from '@nexcraft/forge/integrations/react';
import { ForgeSelect } from '@nexcraft/forge/integrations/react';
import { ForgeCheckbox } from '@nexcraft/forge/integrations/react';
import { ForgeRadioGroup } from '@nexcraft/forge/integrations/react';
import type { ForgeInputProps, ForgeSelectProps, ForgeCheckboxProps, ForgeRadioGroupProps } from '@nexcraft/forge/integrations/react';


// Base adapter props - use any for control to avoid version conflicts
interface BaseRHFProps<T extends FieldValues, TName extends Path<T>> {
  name: TName;
  control: any; // Use any to avoid strict type conflicts between RHF versions
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => field.onChange(event)}
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
          onChange={(value: string | string[]) => {
            // Create a synthetic event to pass the value
            const syntheticEvent = { target: { value, name: field.name } } as any;
            field.onChange(syntheticEvent);
          }}
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
          // Ensure controlled checkbox; coerce undefined -> false
          checked={Boolean(field.value)}
          // Forward event directly; wrapper/fallback normalize to RHF-style event
          onChange={(e: any) => field.onChange(e)}
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
          onChange={(value: string) => {
            // Create a synthetic event to pass the value
            const syntheticEvent = { target: { value, name: field.name, type: 'radio' } } as any;
            field.onChange(syntheticEvent);
          }}
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