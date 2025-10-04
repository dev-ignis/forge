/**
 * Developer debugging utilities for Forge components
 *
 * These utilities help developers debug component behavior, inspect state,
 * and profile performance during development.
 *
 * @example
 * ```ts
 * import { debugComponent, enableGlobalDebug } from '@nexcraft/forge/utils';
 *
 * // Enable debug mode for all components
 * enableGlobalDebug();
 *
 * // Debug a specific component
 * const button = document.querySelector('forge-button');
 * debugComponent(button);
 * ```
 */

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface DebugInfo {
  tagName: string;
  properties: Record<string, unknown>;
  attributes: Record<string, string>;
  state: Record<string, unknown>;
  performance: {
    renderTime?: number;
    renderCount?: number;
    totalTime?: number;
  };
  aiState?: unknown;
}

export interface DebugOptions {
  logToConsole?: boolean;
  includePrivate?: boolean;
  includeAI?: boolean;
}

/**
 * Global debug mode flag
 */
let globalDebugEnabled = false;

/**
 * Enable global debug mode for all Forge components
 */
export function enableGlobalDebug(): void {
  globalDebugEnabled = true;
  console.log('🔧 Forge Debug Mode: ENABLED');
  console.log('All components will log debug information');
}

/**
 * Disable global debug mode
 */
export function disableGlobalDebug(): void {
  globalDebugEnabled = false;
  console.log('🔧 Forge Debug Mode: DISABLED');
}

/**
 * Check if global debug is enabled
 */
export function isGlobalDebugEnabled(): boolean {
  return globalDebugEnabled;
}

/**
 * Extract debug information from a component
 */
export function getDebugInfo(element: HTMLElement, options: DebugOptions = {}): DebugInfo {
  const { includePrivate = false, includeAI = true } = options;

  // Extract all properties
  const properties: Record<string, unknown> = {};
  const state: Record<string, unknown> = {};

  for (const key in element) {
    if (Object.prototype.hasOwnProperty.call(element, key)) {
      const value = (element as any)[key];

      // Skip functions and internal properties unless includePrivate
      if (typeof value === 'function') continue;
      if (!includePrivate && key.startsWith('_')) continue;

      // Categorize as state or property
      if (key.includes('State') || key.startsWith('is') || key.startsWith('has')) {
        state[key] = value;
      } else {
        properties[key] = value;
      }
    }
  }

  // Extract all attributes
  const attributes: Record<string, string> = {};
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    attributes[attr.name] = attr.value;
  }

  // Extract performance info if available
  const performance: DebugInfo['performance'] = {};
  if ('renderTime' in element) performance.renderTime = (element as any).renderTime;
  if ('renderCount' in element) performance.renderCount = (element as any).renderCount;

  // Extract AI state if available
  let aiState: unknown;
  if (includeAI && typeof (element as any).aiState === 'object') {
    aiState = (element as any).aiState;
  }

  const result: DebugInfo = {
    tagName: element.tagName.toLowerCase(),
    properties,
    attributes,
    state,
    performance,
  };

  if (aiState) {
    result.aiState = aiState;
  }

  return result;
}

/**
 * Debug a component by logging comprehensive information
 */
export function debugComponent(element: HTMLElement, options: DebugOptions = {}): DebugInfo {
  const { logToConsole = true } = options;
  const debugInfo = getDebugInfo(element, options);

  if (logToConsole) {
    console.group(`🔍 Debug: <${debugInfo.tagName}>`);
    console.log('📋 Properties:', debugInfo.properties);
    console.log('🏷️  Attributes:', debugInfo.attributes);
    console.log('🔄 State:', debugInfo.state);
    console.log('⚡ Performance:', debugInfo.performance);
    if (debugInfo.aiState) {
      console.log('🤖 AI State:', debugInfo.aiState);
    }
    console.groupEnd();
  }

  return debugInfo;
}

/**
 * Watch a component for property changes
 */
export function watchComponent(
  element: HTMLElement,
  properties: string[] = [],
  callback?: (property: string, oldValue: unknown, newValue: unknown) => void,
): () => void {
  const watchers: Array<{ property: string; value: unknown }> = properties.map((prop) => ({
    property: prop,
    value: (element as any)[prop],
  }));

  const intervalId = setInterval(() => {
    watchers.forEach((watcher) => {
      const currentValue = (element as any)[watcher.property];
      if (currentValue !== watcher.value) {
        const oldValue = watcher.value;
        watcher.value = currentValue;

        console.log(`🔄 <${element.tagName.toLowerCase()}>.${watcher.property} changed:`, {
          oldValue,
          newValue: currentValue,
        });

        if (callback) {
          callback(watcher.property, oldValue, currentValue);
        }
      }
    });
  }, 100);

  // Return cleanup function
  return () => clearInterval(intervalId);
}

/**
 * Profile a component's render performance
 */
export function profileComponent(
  element: HTMLElement,
  iterations = 10,
): Promise<{
  average: number;
  min: number;
  max: number;
  total: number;
}> {
  return new Promise((resolve) => {
    const times: number[] = [];
    let count = 0;

    const observer = new MutationObserver(() => {
      if ('renderTime' in element) {
        times.push((element as any).renderTime);
        count++;

        if (count >= iterations) {
          observer.disconnect();

          const average = times.reduce((a, b) => a + b, 0) / times.length;
          const min = Math.min(...times);
          const max = Math.max(...times);
          const total = times.reduce((a, b) => a + b, 0);

          console.log(`⚡ Performance Profile: <${element.tagName.toLowerCase()}>`);
          console.log(`   Average: ${average.toFixed(2)}ms`);
          console.log(`   Min: ${min.toFixed(2)}ms`);
          console.log(`   Max: ${max.toFixed(2)}ms`);
          console.log(`   Total: ${total.toFixed(2)}ms (${iterations} renders)`);

          resolve({ average, min, max, total });
        }
      }
    });

    observer.observe(element, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // Trigger re-renders by toggling an attribute
    for (let i = 0; i < iterations; i++) {
      setTimeout(() => {
        element.setAttribute('data-profile-test', String(i));
      }, i * 50);
    }
  });
}

/**
 * Get all Forge components on the page
 */
export function getAllForgeComponents(): HTMLElement[] {
  return Array.from(document.querySelectorAll('*')).filter((el) =>
    el.tagName.toLowerCase().startsWith('forge-'),
  ) as HTMLElement[];
}

/**
 * Debug all Forge components on the page
 */
export function debugAllComponents(options: DebugOptions = {}): DebugInfo[] {
  const components = getAllForgeComponents();
  console.group(`🔍 Debugging ${components.length} Forge components`);
  const results = components.map((comp) =>
    debugComponent(comp, { ...options, logToConsole: false }),
  );
  console.table(
    results.map((r) => ({
      Component: r.tagName,
      Attributes: Object.keys(r.attributes).length,
      Properties: Object.keys(r.properties).length,
      RenderTime: r.performance.renderTime ? `${r.performance.renderTime.toFixed(2)}ms` : 'N/A',
      RenderCount: r.performance.renderCount || 'N/A',
    })),
  );
  console.groupEnd();
  return results;
}

/**
 * Get component AI actions and state
 */
export function getAICapabilities(element: HTMLElement): {
  actions: unknown[];
  state: unknown;
  explanation: unknown;
} | null {
  if (typeof (element as any).getPossibleActions !== 'function') {
    console.warn(`<${element.tagName.toLowerCase()}> does not support AI capabilities`);
    return null;
  }

  const actions = (element as any).getPossibleActions?.() || [];
  const state = (element as any).aiState || {};
  const explanation = (element as any).explainState?.() || null;

  console.group(`🤖 AI Capabilities: <${element.tagName.toLowerCase()}>`);
  console.log('Available Actions:', actions);
  console.log('Current State:', state);
  console.log('State Explanation:', explanation);
  console.groupEnd();

  return { actions, state, explanation };
}

/**
 * Create a performance report for all components
 */
export function generatePerformanceReport(): void {
  const components = getAllForgeComponents();
  const report = components
    .map((comp) => ({
      component: comp.tagName.toLowerCase(),
      renderTime: (comp as any).renderTime || 0,
      renderCount: (comp as any).renderCount || 0,
    }))
    .filter((r) => r.renderTime > 0)
    .sort((a, b) => b.renderTime - a.renderTime);

  console.group('⚡ Performance Report');
  console.table(report);
  console.log(`Total components: ${components.length}`);
  console.log(`Components with metrics: ${report.length}`);
  console.log(
    `Slowest component: ${report[0]?.component || 'N/A'} (${report[0]?.renderTime?.toFixed(2) || 0}ms)`,
  );
  console.groupEnd();
}

// Expose debug utilities globally for browser console access
if (typeof window !== 'undefined') {
  (window as any).__FORGE_DEBUG__ = {
    enableGlobalDebug,
    disableGlobalDebug,
    debugComponent,
    debugAllComponents,
    watchComponent,
    profileComponent,
    getAICapabilities,
    generatePerformanceReport,
    getAllForgeComponents,
  };
}
