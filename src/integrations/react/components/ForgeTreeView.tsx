/**
 * @fileoverview Unified React wrapper for ForgeTreeView component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML tree with nested ul/li structure, checkboxes/radios, and expand/collapse
 * - Client: Hydrates to full web component functionality with keyboard navigation and virtualization
 * - No separate SSR/client components needed
 * - Supports hierarchical data, single/multi-select, expandable nodes, and visual connectors
 */

import React from 'react';
import type { ForgeTreeViewProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeTreeView = createUnifiedWrapper<HTMLElement, ForgeTreeViewProps>({
  tagName: 'forge-tree-view',
  displayName: 'ForgeTreeView',
  
  eventMappings: {
    onSelect: 'select',
    onExpand: 'expand'
  },
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-tree-view ${props.multiSelect ? 'forge-tree-view--multi' : ''} ${props.showConnectors ? 'forge-tree-view--connectors' : ''}`}
      role="tree"
      data-forge-component="forge-tree-view"
    >
      <ul className="forge-tree-view-list" role="group">{children}</ul>
    </div>
  ),
  
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
