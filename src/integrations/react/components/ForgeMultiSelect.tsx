/**
 * @fileoverview React wrapper for ForgeMultiSelect component
 */

import type { ForgeMultiSelectProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeMultiSelect = createReactWrapper<HTMLElement, ForgeMultiSelectProps>({
  tagName: 'forge-multi-select',
  displayName: 'ForgeMultiSelect',
  eventMappings: {
    onChange: 'change'
  }
});