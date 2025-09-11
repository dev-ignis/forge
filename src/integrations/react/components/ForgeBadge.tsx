/**
 * @fileoverview React wrapper for ForgeBadge component
 */

import type { ForgeBadgeProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeBadge = createReactWrapper<HTMLElement, ForgeBadgeProps>({
  tagName: 'forge-badge',
  displayName: 'ForgeBadge'
});