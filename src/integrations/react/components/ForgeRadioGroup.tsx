/**
 * @fileoverview Unified React wrapper for ForgeRadioGroup component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML fieldset with radio inputs and proper form integration
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports horizontal/vertical orientation and option arrays
 */

import type { ForgeRadioGroupProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeRadioGroup = createUnifiedWrapper<HTMLElement, ForgeRadioGroupProps>({
  tagName: 'forge-radio-group',
  displayName: 'ForgeRadioGroup',
  
  eventMappings: {
    onChange: 'change'
  },
  
  fallbackRenderer: FallbackRenderers.radioGroup,
  
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