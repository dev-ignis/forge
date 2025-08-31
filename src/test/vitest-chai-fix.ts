// Vitest-compatible expectation fixes for tests using @open-wc/testing
import { vi } from 'vitest';

// Extend expect to support the mixed syntax
declare global {
  namespace Chai {
    interface Assertion {
      toHaveBeenCalled(): void;
      toHaveBeenCalledTimes(times: number): void;
      toHaveBeenCalledWith(...args: any[]): void;
    }
  }
}

// Add the missing methods to Chai assertions for vi.fn() mocks
if (typeof window !== 'undefined' && (window as any).chai) {
  const chai = (window as any).chai;
  
  chai.Assertion.addMethod('toHaveBeenCalled', function(this: any) {
    const obj = this._obj;
    if (obj && typeof obj === 'function' && obj._isMockFunction) {
      this.assert(
        obj.mock.calls.length > 0,
        'expected #{this} to have been called',
        'expected #{this} not to have been called'
      );
    }
  });

  chai.Assertion.addMethod('toHaveBeenCalledTimes', function(this: any, times: number) {
    const obj = this._obj;
    if (obj && typeof obj === 'function' && obj._isMockFunction) {
      this.assert(
        obj.mock.calls.length === times,
        `expected #{this} to have been called ${times} times but was called ${obj.mock.calls.length} times`,
        `expected #{this} not to have been called ${times} times`
      );
    }
  });

  chai.Assertion.addMethod('toHaveBeenCalledWith', function(this: any, ...expectedArgs: any[]) {
    const obj = this._obj;
    if (obj && typeof obj === 'function' && obj._isMockFunction) {
      const calls = obj.mock.calls;
      const found = calls.some((call: any[]) => 
        expectedArgs.every((arg, i) => arg === call[i])
      );
      this.assert(
        found,
        'expected #{this} to have been called with arguments #{exp}',
        'expected #{this} not to have been called with arguments #{exp}',
        expectedArgs
      );
    }
  });
}

export {};