/**
 * @fileoverview Unified React wrapper for ForgeDatePicker component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML date input with proper form integration
 * - Client: Hydrates to full web component functionality with calendar popup
 * - No separate SSR/client components needed
 * - Supports date ranges, formatting, and validation
 */

import React from 'react';
import type { ForgeDatePickerProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeDatePicker = createUnifiedWrapper<HTMLElement, ForgeDatePickerProps>({
  tagName: 'forge-date-picker',
  displayName: 'ForgeDatePicker',
  
  eventMappings: {
    onChange: 'change'
  },
  
  fallbackRenderer: (props, children) => (
    <input
      type="date"
      className={`forge-date-picker ${props.disabled ? 'forge-date-picker--disabled' : ''}`}
      value={props.value}
      min={props.min}
      max={props.max}
      disabled={props.disabled}
      placeholder={props.placeholder}
      name={props.name as string | undefined}
      required={props.required as boolean | undefined}
      data-forge-component="forge-date-picker"
    />
  ),
  
  fallbackProps: {
    disabled: false,
    placeholder: 'Select date',
    format: 'YYYY-MM-DD'
  },
  
  preserveAttributes: [
    'value',
    'min',
    'max',
    'disabled',
    'placeholder',
    'format',
    'name',
    'required'
  ]
});
