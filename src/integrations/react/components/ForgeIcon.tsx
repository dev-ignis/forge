/**
 * @fileoverview React wrapper for ForgeIcon component
 */

import type { ForgeIconProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeIcon = createReactWrapper<HTMLElement, ForgeIconProps>({
  tagName: 'forge-icon',
  displayName: 'ForgeIcon'
});