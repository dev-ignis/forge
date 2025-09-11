/**
 * @fileoverview React wrapper for ForgeNavigationBar component
 */

import type { ForgeNavigationBarProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeNavigationBar = createReactWrapper<HTMLElement, ForgeNavigationBarProps>({
  tagName: 'forge-navigation-bar',
  displayName: 'ForgeNavigationBar',
  eventMappings: {
    onItemClick: 'item-click'
  }
});
