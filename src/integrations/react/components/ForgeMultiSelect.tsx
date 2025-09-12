/**
 * @fileoverview Unified React wrapper for ForgeMultiSelect component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML multi-select control with tag display
 * - Client: Hydrates to full web component functionality with search and filtering
 * - No separate SSR/client components needed
 * - Supports searchable options, maximum selections, and tag management
 */

import React from 'react';
import type { ForgeMultiSelectProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeMultiSelect = createUnifiedWrapper<HTMLElement, ForgeMultiSelectProps>({
  tagName: 'forge-multi-select',
  displayName: 'ForgeMultiSelect',
  
  eventMappings: {
    onChange: 'change'
  },
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-multi-select ${props.disabled ? 'forge-multi-select--disabled' : ''} ${props.searchable ? 'forge-multi-select--searchable' : ''}`}
      data-forge-component="forge-multi-select"
    >
      <div className="forge-multi-select-input">
        {props.searchable ? (
          <input type="text" placeholder={props.placeholder} disabled={props.disabled} />
        ) : (
          <div className="forge-multi-select-placeholder">{props.placeholder}</div>
        )}
      </div>
      <div className="forge-multi-select-options">{children}</div>
    </div>
  ),
  
  fallbackProps: {
    value: [],
    disabled: false,
    searchable: false,
    placeholder: 'Select options',
    options: []
  },
  
  preserveAttributes: [
    'value',
    'placeholder',
    'disabled',
    'searchable',
    'max-selections',
    'name'
  ]
});