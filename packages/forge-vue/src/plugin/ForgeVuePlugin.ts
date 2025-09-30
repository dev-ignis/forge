import type { App, Plugin } from 'vue';

/**
 * Vue plugin for Forge web components
 *
 * Registers global properties and provides for easier Forge integration.
 * Can be installed with app.use(ForgeVuePlugin).
 *
 * @example
 * ```typescript
 * import { createApp } from 'vue';
 * import { ForgeVuePlugin } from '@nexcraft/forge-vue';
 * import App from './App.vue';
 *
 * const app = createApp(App);
 * app.use(ForgeVuePlugin, {
 *   theme: 'auto',
 *   prefix: 'forge-'
 * });
 * app.mount('#app');
 * ```
 */

export interface ForgeVuePluginOptions {
  /**
   * Default theme for Forge components
   * @default 'auto'
   */
  theme?: 'light' | 'dark' | 'auto';
  
  /**
   * Component prefix for registration
   * @default 'forge-'
   */
  prefix?: string;
  
  /**
   * Auto-import Forge web components
   * @default true
   */
  autoImport?: boolean;
}

export const ForgeVuePlugin: Plugin = {
  install(app: App, options: ForgeVuePluginOptions = {}) {
    const {
      theme = 'auto',
      prefix = 'forge-',
      autoImport = true
    } = options;

    // Set global theme
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-forge-theme', theme);
      document.documentElement.style.setProperty('--forge-theme', theme);
    }

    // Auto-import Forge components if requested
    if (autoImport && typeof window !== 'undefined') {
      try {
        // Try to import Forge components dynamically
        import('@nexcraft/forge').catch(() => {
          console.warn('Forge Vue Plugin: Could not auto-import @nexcraft/forge. Make sure it is installed.');
        });
      } catch (error) {
        console.warn('Forge Vue Plugin: Could not auto-import @nexcraft/forge. Make sure it is installed.');
      }
    }

    // Provide global configuration
    app.provide('forge-vue-config', {
      theme,
      prefix,
      autoImport
    });

    // Add global properties
    app.config.globalProperties.$forge = {
      theme,
      setTheme: (newTheme: 'light' | 'dark' | 'auto') => {
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-forge-theme', newTheme);
          document.documentElement.style.setProperty('--forge-theme', newTheme);
        }
      }
    };
  }
};