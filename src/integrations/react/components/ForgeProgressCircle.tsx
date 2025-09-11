/**
 * @fileoverview React wrapper for ForgeProgressCircle component
 */

import type { ForgeProgressCircleProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeProgressCircle = createReactWrapper<HTMLElement, ForgeProgressCircleProps>({
  tagName: 'forge-progress-circle',
  displayName: 'ForgeProgressCircle'
});
