/**
 * @fileoverview Unified React wrapper for ForgeSwitch component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML toggle switch with proper styling
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Multiple size variants and accessibility support
 */

import type { ForgeSwitchProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeSwitch = createUnifiedWrapper<HTMLElement, ForgeSwitchProps>({
  tagName: 'forge-switch',
  displayName: 'ForgeSwitch',
  
  eventMappings: {
    onChange: 'change'
  },
  
  fallbackRenderer: FallbackRenderers.switch,
  
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