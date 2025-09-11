/**
 * @fileoverview Unified React wrapper for ForgeAccordion component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML with native `<details>`/`<summary>` elements for accessibility
 * - Client: Hydrates to full web component functionality with smooth animations
 * - No separate SSR/client components needed
 * - Supports multiple variants (default, filled, outlined) and disabled states
 */

import type { ForgeAccordionProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeAccordion = createUnifiedWrapper<HTMLElement, ForgeAccordionProps>({
  tagName: 'forge-accordion',
  displayName: 'ForgeAccordion',
  
  eventMappings: {
    onToggle: 'toggle'
  },
  
  fallbackRenderer: FallbackRenderers.accordion,
  
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
