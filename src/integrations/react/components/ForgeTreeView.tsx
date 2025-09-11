/**
 * @fileoverview React wrapper for ForgeTreeView component
 */

import type { ForgeTreeViewProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeTreeView = createReactWrapper<HTMLElement, ForgeTreeViewProps>({
  tagName: 'forge-tree-view',
  displayName: 'ForgeTreeView',
  eventMappings: {
    onSelect: 'select',
    onExpand: 'expand'
  }
});
