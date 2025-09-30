/**
 * @fileoverview Unified React wrapper for ForgeProgressCircle component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic SVG circular progress with proper ARIA and styling
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports indeterminate states, custom sizes, and value display
 */

import React from 'react';
import type { ForgeProgressCircleProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeProgressCircle = createUnifiedWrapper<HTMLElement, ForgeProgressCircleProps>({
  tagName: 'forge-progress-circle',
  displayName: 'ForgeProgressCircle',
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-progress-circle ${props.indeterminate ? 'forge-progress-circle--indeterminate' : ''}`}
      style={{ width: props.size, height: props.size }}
      data-forge-component="forge-progress-circle"
    >
      <svg className="forge-progress-circle-svg" viewBox="0 0 100 100">
        <circle
          className="forge-progress-circle-track"
          cx="50"
          cy="50"
          r="45"
          strokeWidth={props.strokeWidth || 4}
        />
        <circle
          className="forge-progress-circle-fill"
          cx="50"
          cy="50"
          r="45"
          strokeWidth={props.strokeWidth || 4}
          strokeDasharray={`${((props.value || 0) / (props.max || 100)) * 283} 283`}
        />
      </svg>
      {props.showValue && <span className="forge-progress-circle-value">{props.value}%</span>}
      {children}
    </div>
  ),
  
  fallbackProps: {
    value: 0,
    max: 100,
    size: '48px',
    strokeWidth: 4,
    indeterminate: false,
    showValue: false
  },
  
  preserveAttributes: [
    'value',
    'max',
    'indeterminate',
    'size',
    'stroke-width',
    'show-value',
    'role',
    'aria-valuenow',
    'aria-valuemax'
  ]
});
