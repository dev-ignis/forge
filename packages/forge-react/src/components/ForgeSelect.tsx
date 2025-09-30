/**
 * @fileoverview Unified React wrapper for ForgeSelect component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML select with proper form integration and accessibility
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports single/multiple selection and option arrays
 */

import React from 'react';
import type { ForgeSelectProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeSelect = createUnifiedWrapper<HTMLElement, ForgeSelectProps>({
  tagName: 'forge-select',
  displayName: 'ForgeSelect',
  
  eventMappings: {
    onChange: 'change'
  },
  
  fallbackRenderer: (props, children) => (
    <select
      className={`forge-select ${props.disabled ? 'forge-select--disabled' : ''} ${props.multiple ? 'forge-select--multiple' : ''}`}
      disabled={props.disabled}
      multiple={props.multiple}
      name={props.name}
      required={props.required}
      value={props.value}
      data-forge-component="forge-select"
    >
      {props.placeholder && <option value="" disabled>{props.placeholder}</option>}
      {children}
    </select>
  ),
  
  fallbackProps: {
    disabled: false,
    multiple: false,
    placeholder: 'Select option'
  },
  
  preserveAttributes: [
    'value',
    'placeholder',
    'disabled',
    'multiple',
    'name',
    'required'
  ]
});