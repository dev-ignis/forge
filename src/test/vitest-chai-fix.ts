// Vitest-compatible expectation fixes for tests using @open-wc/testing

// Type definitions for Chai
interface ChaiStatic {
  Assertion: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    addMethod(name: string, fn: Function): void;
  };
}

// Extend expect to support the mixed syntax
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Chai {
    interface Assertion {
      toHaveBeenCalled(): void;
      toHaveBeenCalledTimes(times: number): void;
      toHaveBeenCalledWith(...args: unknown[]): void;
    }
    
    interface AssertionContext {
      _obj: unknown;
      assert(expr: boolean, msg?: string, negateMsg?: string): void;
    }
  }
}

// Add the missing methods to Chai assertions for vi.fn() mocks
if (typeof window !== 'undefined' && (window as Window & { chai?: unknown }).chai) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chai = (window as any).chai as ChaiStatic;
  
  chai.Assertion.addMethod('toHaveBeenCalled', function(this: globalThis.Chai.AssertionContext) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = this._obj as any;
    if (obj && typeof obj === 'function' && obj._isMockFunction) {
      this.assert(
        obj.mock.calls.length > 0,
        'expected #{this} to have been called',
        'expected #{this} not to have been called'
      );
    }
  });

  chai.Assertion.addMethod('toHaveBeenCalledTimes', function(this: globalThis.Chai.AssertionContext, times: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = this._obj as any;
    if (obj && typeof obj === 'function' && obj._isMockFunction) {
      this.assert(
        obj.mock.calls.length === times,
        `expected #{this} to have been called ${times} times but was called ${obj.mock.calls.length} times`,
        `expected #{this} not to have been called ${times} times`
      );
    }
  });

  chai.Assertion.addMethod('toHaveBeenCalledWith', function(this: globalThis.Chai.AssertionContext, ...expectedArgs: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = this._obj as any;
    if (obj && typeof obj === 'function' && obj._isMockFunction) {
      const calls = obj.mock.calls;
      const found = calls.some((call: unknown[]) => 
        expectedArgs.every((arg, i) => arg === call[i])
      );
      this.assert(
        found,
        'expected #{this} to have been called with arguments #{exp}',
        'expected #{this} not to have been called with arguments #{exp}'
      );
    }
  });
}

export {};