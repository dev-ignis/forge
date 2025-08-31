import { vi } from 'vitest';
import { expect as vitestExpect } from 'vitest';

// Helper to make vi.fn() work with Chai expectations
export function createSpy() {
  const spy = vi.fn();
  // Add properties that Chai might check
  interface SpyWithChaiProps {
    called: boolean;
    calledOnce: boolean;
    callCount: number;
  }
  
  const spyWithProps = spy as typeof spy & SpyWithChaiProps;
  spyWithProps.called = false;
  spyWithProps.calledOnce = false;
  spyWithProps.callCount = 0;
  
  // Intercept calls to update properties
  const originalFn = spy;
  const wrappedSpy = new Proxy(originalFn, {
    apply(target, thisArg, args) {
      const result = Reflect.apply(target, thisArg, args);
      (wrappedSpy as typeof spy & SpyWithChaiProps).called = true;
      (wrappedSpy as typeof spy & SpyWithChaiProps).callCount = target.mock.calls.length;
      (wrappedSpy as typeof spy & SpyWithChaiProps).calledOnce = target.mock.calls.length === 1;
      return result;
    }
  });
  
  return wrappedSpy;
}

// Helper to wrap vi.spyOn with Chai-compatible properties
export function spyOn<T extends object>(object: T, method: keyof T) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const spy = vi.spyOn(object as any, method as any);
  
  // Create a wrapper that updates Chai properties
  const wrapper = {
    get called() {
      return spy.mock.calls.length > 0;
    },
    get calledOnce() {
      return spy.mock.calls.length === 1;
    },
    get callCount() {
      return spy.mock.calls.length;
    },
    mock: spy.mock,
    mockRestore: () => spy.mockRestore(),
    mockClear: () => spy.mockClear()
  };
  
  // Add Chai-compatible properties directly to the spy
  Object.defineProperty(spy, 'called', {
    get: () => wrapper.called
  });
  Object.defineProperty(spy, 'calledOnce', {
    get: () => wrapper.calledOnce
  });
  Object.defineProperty(spy, 'callCount', {
    get: () => wrapper.callCount
  });
  
  return spy;
}

// Re-export for convenience
export { vitestExpect };

// Helper for keyboard events
export function createKeyboardEvent(key: string, type = 'keydown'): KeyboardEvent {
  return new KeyboardEvent(type, {
    key,
    code: key === 'Enter' ? 'Enter' : key === 'Escape' ? 'Escape' : `Key${key.toUpperCase()}`,
    bubbles: true,
    composed: true,
    cancelable: true
  });
}

// Helper to dispatch keyboard event  
export async function sendKeys(options: { press: string; target?: Element } | { type: string; target?: Element }) {
  let target = ('target' in options ? options.target : undefined) || document.activeElement;
  
  // If the active element is a shadow host, find the actual input within
  if (target && target.shadowRoot) {
    const shadowActive = target.shadowRoot.activeElement;
    if (shadowActive) {
      target = shadowActive;
    }
  }
  
  if (!target) return;
  
  if ('press' in options) {
    const key = options.press;
    target.dispatchEvent(createKeyboardEvent(key, 'keydown'));
    target.dispatchEvent(createKeyboardEvent(key, 'keyup'));
  } else if ('type' in options) {
    const input = target as HTMLInputElement;
    input.value = options.type;
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }
}