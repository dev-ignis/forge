/**
 * @fileoverview Unified React wrapper for ForgeSwitch component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML toggle switch with proper styling
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Multiple size variants and accessibility support
 */

import React from 'react';
import type { ForgeSwitchProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeSwitch = createUnifiedWrapper<HTMLElement, ForgeSwitchProps>({
  tagName: 'forge-switch',
  displayName: 'ForgeSwitch',
  
  eventMappings: {
    onChange: 'change'
  },
  
  fallbackRenderer: (props, children) => (
    <label className="forge-switch-container">
      <input
        type="checkbox"
        className={`forge-switch forge-switch--${props.size || 'md'} ${props.disabled ? 'forge-switch--disabled' : ''}`}
        checked={props.checked || false}
        disabled={props.disabled}
        id={props.id as string | undefined}
        name={props.name as string | undefined}
        value={props.value as string | number | readonly string[] | undefined}
        aria-label={props['aria-label']}
        data-forge-component="forge-switch"
      />
      <span className="forge-switch-slider"></span>
      {children}
    </label>
  ),
  
  fallbackProps: {
    checked: false,
    disabled: false,
    size: 'md'
  },
  
  preserveAttributes: [
    'checked',
    'disabled',
    'size',
    'name',
    'value',
    'aria-label',
    'aria-describedby',
    'role'
  ]
});