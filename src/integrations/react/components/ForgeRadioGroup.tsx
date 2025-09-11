/**
 * @fileoverview React wrapper for ForgeRadioGroup component
 */

import type { ForgeRadioGroupProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeRadioGroup = createReactWrapper<HTMLElement, ForgeRadioGroupProps>({
  tagName: 'forge-radio-group',
  displayName: 'ForgeRadioGroup',
  eventMappings: {
    onChange: 'change'
  }
});