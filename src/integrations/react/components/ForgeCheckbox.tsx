/**
 * @fileoverview Unified React wrapper for ForgeCheckbox component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML checkbox with label and proper styling
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Full form integration and indeterminate state support
 */

import React from 'react';
import type { ForgeCheckboxProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeCheckbox = createUnifiedWrapper<HTMLElement, ForgeCheckboxProps>({
  tagName: 'forge-checkbox',
  displayName: 'ForgeCheckbox',
  
  eventMappings: {
    onChange: 'change'
  },
  
  fallbackRenderer: (props, children) => (
    <input
      type="checkbox"
      className={`forge-checkbox ${props.disabled ? 'forge-checkbox--disabled' : ''}`}
      checked={props.checked || false}
      disabled={props.disabled}
      value={props.value}
      name={props.name}
      aria-label={props['aria-label']}
      data-forge-component="forge-checkbox"
    />
  ),
  
  fallbackProps: {
    checked: false,
    indeterminate: false,
    disabled: false
  },
  
  preserveAttributes: [
    'checked',
    'indeterminate',
    'disabled',
    'value',
    'name',
    'aria-label',
    'aria-describedby',
    'required'
  ]
});