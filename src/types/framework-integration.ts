/**
 * Framework Integration Types
 * Common types shared across React, Vue, and Angular integrations
 */

/**
 * Custom event interface for Forge components
 * Used across all framework integrations for type-safe event handling
 */
export interface ForgeCustomEvent<T = any> extends CustomEvent {
  detail: T;
}

/**
 * Base component event handler types
 */
export type ForgeEventHandler<T = any> = (event: ForgeCustomEvent<T>) => void;

/**
 * Framework integration configuration
 */
export interface ForgeIntegrationConfig {
  /** Enable SSR fallbacks for server-side rendering */
  enableSSRFallbacks?: boolean;
  /** Custom theme provider configuration */
  themeProvider?: {
    defaultTheme?: 'light' | 'dark' | 'auto';
    storageKey?: string;
  };
}

/**
 * Common props shared across framework wrappers
 */
export interface ForgeComponentProps {
  /** Component ref for direct DOM access */
  ref?: any;
  /** CSS class names */
  className?: string;
  /** Inline styles */
  style?: Record<string, any>;
  /** Data attributes */
  'data-*'?: string;
}
