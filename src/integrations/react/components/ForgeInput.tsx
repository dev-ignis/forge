/**
 * @fileoverview Unified React wrapper for ForgeInput component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML input with proper styling and validation
 * - Client: Hydrates to full web component functionality  
 * - No separate SSR/client components needed
 * - Full form integration support
 */

import React from 'react';
import type { ForgeInputProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeInput = createUnifiedWrapper<HTMLElement, ForgeInputProps>({
  tagName: 'forge-input',
  displayName: 'ForgeInput',
  
  eventMappings: {
    onChange: 'input',
    onFocus: 'focus',
    onBlur: 'blur'
  },
  
  propMappings: {
    errorText: 'error-text'
  },
  
  fallbackRenderer: (props, children) => {
    // Handle both controlled and uncontrolled input patterns
    const inputProps: any = {
      className: `forge-input forge-input--${props.variant || 'default'} forge-input--${props.size || 'md'}`,
      type: props.type || 'text',
      placeholder: props.placeholder,
      disabled: props.disabled,
      required: props.required,
      'data-forge-component': 'forge-input'
    };

    // Only add value if onChange is also provided (controlled component)
    if (props.onChange && props.value !== undefined) {
      inputProps.value = props.value || '';
      inputProps.onChange = props.onChange;
    } else if (props.value !== undefined && !props.onChange) {
      // If value is provided without onChange, use defaultValue instead
      inputProps.defaultValue = props.value || '';
    } else if (props.onChange) {
      // onChange provided but no value - controlled component with empty value
      inputProps.value = props.value || '';
      inputProps.onChange = props.onChange;
    }

    // Add other React Hook Form props if provided
    if (props.onBlur) inputProps.onBlur = props.onBlur;
    if (props.onFocus) inputProps.onFocus = props.onFocus;
    if (props.name) inputProps.name = props.name;
    if (props.ref) inputProps.ref = props.ref;

    return <input {...inputProps} />;
  },
  
  fallbackProps: {
    type: 'text',
    variant: 'default',
    size: 'md'
  },
  
  preserveAttributes: [
    'type',
    'placeholder',
    'value',
    'disabled',
    'required',
    'aria-label',
    'aria-describedby',
    'aria-invalid',
    'name',
    'id'
  ]
});