import { LitElement } from 'lit';

/**
 * Creates a test fixture for a Web Component
 */
export async function fixture<T extends HTMLElement>(html: string): Promise<T> {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  const element = wrapper.firstElementChild as T;
  document.body.appendChild(element);
  
  // Wait for Lit element to complete update
  if (element instanceof LitElement) {
    await element.updateComplete;
  }
  
  // Wait for any async operations
  await new Promise(resolve => setTimeout(resolve, 0));
  
  return element;
}

/**
 * Cleans up test fixtures
 */
export function cleanup() {
  document.body.innerHTML = '';
}

/**
 * Waits for an element to appear in the Shadow DOM
 */
export async function waitForShadowElement(
  host: Element,
  selector: string,
  timeout = 1000
): Promise<Element | null> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const element = host.shadowRoot?.querySelector(selector);
    if (element) return element;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  
  return null;
}

/**
 * Simulates a click event that properly bubbles through Shadow DOM
 */
export function shadowClick(element: Element) {
  const event = new MouseEvent('click', {
    bubbles: true,
    composed: true,
    cancelable: true
  });
  element.dispatchEvent(event);
}

/**
 * Gets text content from Shadow DOM
 */
export function getShadowText(host: Element, selector?: string): string {
  const root = host.shadowRoot;
  if (!root) return '';
  
  if (selector) {
    const element = root.querySelector(selector);
    return element?.textContent?.trim() || '';
  }
  
  return root.textContent?.trim() || '';
}

/**
 * Queries Shadow DOM with multiple levels
 */
export function queryShadowDeep(host: Element, ...selectors: string[]): Element | null {
  let current: Element | null = host;
  
  for (const selector of selectors) {
    if (!current?.shadowRoot) return null;
    current = current.shadowRoot.querySelector(selector);
    if (!current) return null;
  }
  
  return current;
}

/**
 * Additional ADR-004 compliant utilities for behavior-focused testing
 */

/**
 * Check if content is visible to users (behavior-focused)
 * @param host - Shadow host element
 * @param selector - CSS selector
 * @returns True if content is visible
 */
export function isContentVisible(host: Element, selector: string): boolean {
  try {
    const shadowRoot = host.shadowRoot;
    if (!shadowRoot) return false;
    
    const element = shadowRoot.querySelector(selector) as HTMLElement;
    if (!element) return false;
    
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      style.opacity !== '0' &&
      rect.width > 0 &&
      rect.height > 0
    );
  } catch {
    return false;
  }
}

/**
 * Simulate keyboard interaction (behavior-focused)
 * @param element - Target element
 * @param key - Key to press
 * @param options - Additional keyboard event options
 */
export function simulateKeypress(
  element: Element, 
  key: string, 
  options: Partial<KeyboardEventInit> = {}
): void {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    composed: true,
    ...options
  });
  element.dispatchEvent(event);
}

/**
 * Wait for element to have expected text content
 * @param host - Shadow host element
 * @param selector - CSS selector
 * @param expectedText - Text to wait for
 * @param timeout - Maximum time to wait
 */
export async function waitForShadowTextContent(
  host: Element,
  selector: string,
  expectedText: string,
  timeout = 5000
): Promise<void> {
  const start = Date.now();
  
  return new Promise((resolve, reject) => {
    const check = () => {
      try {
        const actualText = getShadowText(host, selector);
        if (actualText.includes(expectedText)) {
          resolve();
          return;
        }
      } catch {
        // Element not found yet, continue waiting
      }
      
      if (Date.now() - start > timeout) {
        reject(new Error(`Text "${expectedText}" not found in element "${selector}" after ${timeout}ms`));
      } else {
        setTimeout(check, 10);
      }
    };
    
    check();
  });
}

/**
 * Check if element has expected ARIA attribute (accessibility-focused)
 * @param element - Element to check
 * @param attribute - ARIA attribute name (without aria- prefix)
 * @param expectedValue - Expected attribute value
 */
export function hasAriaAttribute(
  element: Element, 
  attribute: string, 
  expectedValue?: string
): boolean {
  const ariaAttr = `aria-${attribute}`;
  const actualValue = element.getAttribute(ariaAttr);
  
  if (expectedValue === undefined) {
    return actualValue !== null;
  }
  
  return actualValue === expectedValue;
}

/**
 * Performance testing utilities
 */
export const performanceUtils = {
  /**
   * Measure component render time
   */
  async measureRenderTime(setupFn: () => Promise<Element>): Promise<number> {
    const start = window.performance.now();
    await setupFn();
    return window.performance.now() - start;
  },

  /**
   * Assert render time is under threshold
   */
  async expectRenderTimeUnder(
    setupFn: () => Promise<Element>,
    maxTime: number
  ): Promise<void> {
    const renderTime = await this.measureRenderTime(setupFn);
    if (renderTime > maxTime) {
      throw new Error(`Render time ${renderTime}ms exceeds maximum ${maxTime}ms`);
    }
  }
};