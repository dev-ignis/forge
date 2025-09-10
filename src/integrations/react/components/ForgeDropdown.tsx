/**
 * @fileoverview React wrapper for ForgeDropdown component
 * 
 * Provides React-style Dropdown component with proper TypeScript support,
 * event handling, and SSR compatibility. Supports single/multi-select,
 * search functionality, and virtual scrolling.
 */

import type { ForgeDropdownProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

// Import the web component to ensure it's registered
import '../../../components/molecules/dropdown/dropdown';

export const ForgeDropdown = createReactWrapper<HTMLElement, ForgeDropdownProps>({
  tagName: 'forge-dropdown',
  displayName: 'ForgeDropdown',
  eventMappings: {
    onSelectionChange: 'selection-change',
    onOpen: 'open',
    onClose: 'close',
    onSearch: 'search'
  },
  propMappings: {
    selectedItems: 'selected-items'
  },
  ssrFallback: () => null  // Return null during SSR, will hydrate on client
});