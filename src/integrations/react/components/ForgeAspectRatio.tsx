/**
 * @fileoverview React wrapper for ForgeAspectRatio component
 */

import type { ForgeAspectRatioProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeAspectRatio = createReactWrapper<HTMLElement, ForgeAspectRatioProps>({
  tagName: 'forge-aspect-ratio',
  displayName: 'ForgeAspectRatio'
});
