/**
 * Vue Integration for Nexcraft Forge
 * Composables, directives, and plugin for using Forge components in Vue applications
 */

// Core composables
export {
  useForgeComponent,
  useForgeVModel,
  useForgeTheme,
  useForgeThemeContext,
  useForgeThemeInjection,
  useForgeModal
} from './composables';

// Plugin
export { ForgeVuePlugin } from './plugin';
export type { ForgeVuePluginOptions } from './plugin';

// Types
export type * from './types/forge-vue.types';