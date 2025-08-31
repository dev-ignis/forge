import { expect } from 'vitest';
import './vitest-chai-fix';

// Happy DOM is automatically available in the test environment
// when environment: 'happy-dom' is set in vitest.config.ts

// Prevent duplicate custom element registration
const registeredElements = new Set<string>();
const originalDefine = customElements.define.bind(customElements);

customElements.define = function(name: string, constructor: any, options?: any) {
  if (!registeredElements.has(name)) {
    registeredElements.add(name);
    originalDefine(name, constructor, options);
  }
};

// Add custom matchers for Shadow DOM testing
expect.extend({
  toHaveShadowRoot(received: Element) {
    const pass = received.shadowRoot !== null;
    return {
      pass,
      message: () => 
        pass 
          ? `Expected element not to have shadow root`
          : `Expected element to have shadow root`,
    };
  },
  
  toContainShadowElement(received: Element, selector: string) {
    const element = received.shadowRoot?.querySelector(selector);
    const pass = element !== null && element !== undefined;
    return {
      pass,
      message: () =>
        pass
          ? `Expected shadow root not to contain element matching "${selector}"`
          : `Expected shadow root to contain element matching "${selector}"`,
    };
  }
});

// Extend vitest matchers type
declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveShadowRoot(): void;
    toContainShadowElement(selector: string): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveShadowRoot(): void;
    toContainShadowElement(selector: string): void;
  }
}