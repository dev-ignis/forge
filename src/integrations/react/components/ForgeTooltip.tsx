/**
 * @fileoverview React wrapper for ForgeTooltip component
 */

import type { ForgeTooltipProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeTooltip = createReactWrapper<HTMLElement, ForgeTooltipProps>({
  tagName: 'forge-tooltip',
  displayName: 'ForgeTooltip'
});
