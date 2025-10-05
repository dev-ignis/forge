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
    const inputProps: React.InputHTMLAttributes<HTMLInputElement> & { 'data-forge-component'?: string } = {
      className: `forge-input forge-input--${props.variant || 'default'} forge-input--${props.size || 'md'}`,
      type: (props.type as React.HTMLInputTypeAttribute) || 'text',
      placeholder: props.placeholder,
      disabled: props.disabled,
      required: props.required,
      'data-forge-component': 'forge-input'
    };

    // Detect React Hook Form register pattern
    const isLikelyRHFRegister = Boolean(props.name && typeof props.onBlur === 'function' && props.ref);

    // Create onChange handler that supports both signatures
    const handleChange = props.onChange ? (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!props.onChange) return;

      // Check if it's likely RHF or has single-arg signature
      if (isLikelyRHFRegister || props.onChange.length < 2) {
        (props.onChange as (event: React.ChangeEvent<HTMLInputElement>) => void)(e);
      } else {
        // Forge signature: (value, event)
        (props.onChange as (value: string, event: React.FormEvent<HTMLElement>) => void)(e.target.value, e);
      }
    } : undefined;

    // Handle controlled vs uncontrolled input patterns safely
    if (props.value !== undefined) {
      // Explicit value provided -> controlled
      inputProps.value = props.value;
      if (handleChange) inputProps.onChange = handleChange;
    } else if (handleChange) {
      // onChange without value: usually RHF register() or uncontrolled React pattern
      // Keep it uncontrolled so typing works; still wire onChange
      inputProps.onChange = handleChange;
    }
    // For RHF register(), don't set defaultValue here; RHF will manage initial value via ref

    // Add other React Hook Form props if provided
    if (props.onBlur) inputProps.onBlur = props.onBlur as React.FocusEventHandler<HTMLInputElement>;
    if (props.onFocus) inputProps.onFocus = props.onFocus as React.FocusEventHandler<HTMLInputElement>;
    if (props.name) inputProps.name = props.name;

    return <input {...inputProps} ref={props.ref as React.Ref<HTMLInputElement> | undefined} />;
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
