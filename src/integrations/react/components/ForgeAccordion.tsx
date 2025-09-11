/**
 * @fileoverview React wrapper for ForgeAccordion component
 */

import type { ForgeAccordionProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeAccordion = createReactWrapper<HTMLElement, ForgeAccordionProps>({
  tagName: 'forge-accordion',
  displayName: 'ForgeAccordion',
  eventMappings: {
    onToggle: 'toggle'
  }
});
