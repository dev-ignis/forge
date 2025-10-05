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

// Web component registration should be handled by consumers importing '@nexcraft/forge'
// Keeping wrapper independent of side-effectful registrations avoids build-time path issues.

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
      id={props.id as string | undefined}
      ref={props.ref as React.Ref<HTMLInputElement> | undefined}
      // Only control checked when explicitly provided; otherwise allow uncontrolled for RHF register()
      {...(typeof props.checked === 'boolean' ? { checked: props.checked } : {})}
      disabled={props.disabled}
      value={props.value}
      name={props.name}
      onChange={props.onChange ? (e) => {
        if (typeof props.onChange !== 'function') return;

        const isLikelyRHF = Boolean(props.name && typeof props.onBlur === 'function');

        if (isLikelyRHF) {
          // React Hook Form register handler expects the event to read target.name/checked
          (props.onChange as (event: React.ChangeEvent<HTMLInputElement>) => void)(e);
          return;
        }

        // Non-RHF: prefer Forge signature when handler declares 2+ params
        if (props.onChange.length >= 2) {
          (props.onChange as (checked: boolean, event: React.FormEvent<HTMLElement>) => void)(e.target.checked, e);
        } else {
          // Fallback: forward event (common React pattern)
          (props.onChange as (event: React.ChangeEvent<HTMLInputElement>) => void)(e);
        }
      } : undefined}
      onBlur={props.onBlur}
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
