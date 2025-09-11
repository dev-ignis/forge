/**
 * @fileoverview React wrapper for ForgeSkeleton component
 */

import type { ForgeSkeletonProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeSkeleton = createReactWrapper<HTMLElement, ForgeSkeletonProps>({
  tagName: 'forge-skeleton',
  displayName: 'ForgeSkeleton'
});