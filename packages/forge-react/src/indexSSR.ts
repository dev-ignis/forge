/**
 * @fileoverview Deprecated SSR Integration - Use Main Index Instead
 *
 * ⚠️ **DEPRECATED:** This module is no longer needed.
 * 
 * All Forge components are now **unified** and work seamlessly in both SSR and client environments.
 * 
 * ## Migration Guide
 *
 * **Before (deprecated):**
 * ```tsx
 * import { ForgeButtonSSR, ForgeInputSSR } from '@nexcraft/forge/integrations/react/ssr';
 * ```
 *
 * **After (recommended):**
 * ```tsx
 * import { ForgeButton, ForgeInput } from '@nexcraft/forge-react';
 * ```
 *
 * ## Benefits of Unified Components
 * - Single import path for all environments
 * - Automatic SSR/client detection and optimization  
 * - Progressive enhancement with semantic HTML fallbacks
 * - No separate SSR-specific components needed
 * - Zero breaking changes to existing code
 *
 * Please update your imports to use the main index for better maintainability.
 */

// Re-export everything from main index for backward compatibility
export * from './index';