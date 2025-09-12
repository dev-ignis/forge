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
  
  fallbackRenderer: (props, children) => (
    <input
      className={`forge-input forge-input--${props.variant || 'default'} forge-input--${props.size || 'md'}`}
      type={props.type || 'text'}
      placeholder={props.placeholder}
      disabled={props.disabled}
      required={props.required}
      value={props.value || ''}
      data-forge-component="forge-input"
    />
  ),
  
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