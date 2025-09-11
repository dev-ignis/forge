/**
 * @fileoverview React wrapper for ForgeTabs component
 */

import type { ForgeTabsProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeTabs = createReactWrapper<HTMLElement, ForgeTabsProps>({
  tagName: 'forge-tabs',
  displayName: 'ForgeTabs',
  eventMappings: {
    onTabChange: 'tab-change'
  }
});
