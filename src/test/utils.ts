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