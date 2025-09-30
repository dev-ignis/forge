/**
 * @fileoverview Unified React wrapper for ForgeRadioGroup component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML fieldset with radio inputs and proper form integration
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports horizontal/vertical orientation and option arrays
 */

import React from 'react';
import type { ForgeRadioGroupProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeRadioGroup = createUnifiedWrapper<HTMLElement, ForgeRadioGroupProps>({
  tagName: 'forge-radio-group',
  displayName: 'ForgeRadioGroup',
  
  eventMappings: {
    onChange: 'change'
  },
  
  fallbackRenderer: (props, children) => (
    <fieldset
      className={`forge-radio-group ${props.orientation ? `forge-radio-group--${props.orientation}` : ''} ${props.disabled ? 'forge-radio-group--disabled' : ''}`}
      disabled={props.disabled}
      data-forge-component="forge-radio-group"
    >
      {children}
    </fieldset>
  ),
  
  fallbackProps: {
    disabled: false,
    orientation: 'vertical'
  },
  
  preserveAttributes: [
    'name',
    'value',
    'disabled',
    'orientation'
  ]
});