/**
 * @fileoverview React wrapper for ForgeSelect component
 */

import type { ForgeSelectProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeSelect = createReactWrapper<HTMLElement, ForgeSelectProps>({
  tagName: 'forge-select',
  displayName: 'ForgeSelect',
  eventMappings: {
    onChange: 'change'
  }
});