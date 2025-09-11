/**
 * @fileoverview Unified React wrapper for ForgeTreeView component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML tree with nested ul/li structure, checkboxes/radios, and expand/collapse
 * - Client: Hydrates to full web component functionality with keyboard navigation and virtualization
 * - No separate SSR/client components needed
 * - Supports hierarchical data, single/multi-select, expandable nodes, and visual connectors
 */

import type { ForgeTreeViewProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeTreeView = createUnifiedWrapper<HTMLElement, ForgeTreeViewProps>({
  tagName: 'forge-tree-view',
  displayName: 'ForgeTreeView',
  
  eventMappings: {
    onSelect: 'select',
    onExpand: 'expand'
  },
  
  fallbackRenderer: FallbackRenderers.treeView,
  
  fallbackProps: {
    data: [],
    selectable: true,
    multiSelect: false,
    expandable: true,
    showConnectors: true
  },
  
  preserveAttributes: [
    'selectable',
    'multi-select',
    'expandable',
    'show-connectors',
    'role',
    'aria-label'
  ]
});
