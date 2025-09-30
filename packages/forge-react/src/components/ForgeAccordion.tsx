/**
 * @fileoverview Unified React wrapper for ForgeAccordion component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML with native `<details>`/`<summary>` elements for accessibility
 * - Client: Hydrates to full web component functionality with smooth animations
 * - No separate SSR/client components needed
 * - Supports multiple variants (default, filled, outlined) and disabled states
 */

import React from 'react';
import type { ForgeAccordionProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeAccordion = createUnifiedWrapper<HTMLElement, ForgeAccordionProps>({
  tagName: 'forge-accordion',
  displayName: 'ForgeAccordion',
  
  eventMappings: {
    onToggle: 'toggle'
  },
  
  fallbackRenderer: (props, children) => (
    <details
      className={`forge-accordion ${props.variant ? `forge-accordion--${props.variant}` : ''}`}
      open={props.open}
      data-forge-component="forge-accordion"
    >
      <summary className="forge-accordion-header">{props.title}</summary>
      <div className="forge-accordion-content">{children}</div>
    </details>
  ),
  
  fallbackProps: {
    open: false,
    disabled: false,
    variant: 'default'
  },
  
  preserveAttributes: [
    'title',
    'open',
    'disabled',
    'variant'
  ]
});
