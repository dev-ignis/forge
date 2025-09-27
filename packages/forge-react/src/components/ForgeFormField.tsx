/**
 * @fileoverview Unified React wrapper for ForgeFormField component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML form field wrapper with labels, errors, and help text
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports validation states, required indicators, and accessibility
 */

import React from 'react';
import type { ForgeFormFieldProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeFormField = createUnifiedWrapper<HTMLElement, ForgeFormFieldProps>({
  tagName: 'forge-form-field',
  displayName: 'ForgeFormField',
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-form-field ${props.error ? 'forge-form-field--error' : ''} ${props.disabled ? 'forge-form-field--disabled' : ''}`}
      data-forge-component="forge-form-field"
    >
      {props.label && <label className="forge-form-field-label">{props.label}{props.required && <span>*</span>}</label>}
      <div className="forge-form-field-input">{children}</div>
      {props['error-message'] && <span className="forge-form-field-error">{props['error-message']}</span>}
      {props['helper-text'] && <span className="forge-form-field-helper">{props['helper-text']}</span>}
    </div>
  ),
  
  fallbackProps: {
    required: false,
    error: false,
    disabled: false
  },
  
  preserveAttributes: [
    'label',
    'required',
    'error',
    'error-message',
    'helper-text',
    'disabled'
  ]
});
