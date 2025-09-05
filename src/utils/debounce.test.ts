/**
 * @fileoverview Tests for debounce utility functions
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce, throttle, raf } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should delay function execution', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('test');
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(mockFn).toHaveBeenCalledWith('test');
  });

  it('should cancel previous execution when called multiple times', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('first');
    vi.advanceTimersByTime(50);
    debouncedFn('second');
    vi.advanceTimersByTime(50);
    debouncedFn('third');

    vi.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith('third');
  });

  it('should execute immediately when immediate=true and not called recently', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100, true);

    debouncedFn('immediate');
    expect(mockFn).toHaveBeenCalledWith('immediate');
  });

  it('should not execute immediately when immediate=true and called recently', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100, true);

    debouncedFn('first');
    expect(mockFn).toHaveBeenCalledWith('first');

    mockFn.mockClear();
    debouncedFn('second');
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should handle multiple arguments correctly', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('arg1', 'arg2', 123);
    vi.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123);
  });

  it('should clear timeout when called again', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    debouncedFn();

    expect(clearTimeoutSpy).toHaveBeenCalledOnce();
    clearTimeoutSpy.mockRestore();
  });
});

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should execute function immediately on first call', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn('test');
    expect(mockFn).toHaveBeenCalledWith('test');
  });

  it('should prevent execution during throttle period', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn('first');
    throttledFn('second');
    throttledFn('third');

    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith('first');
  });

  it('should allow execution after throttle period expires', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn('first');
    expect(mockFn).toHaveBeenCalledWith('first');

    vi.advanceTimersByTime(100);
    
    throttledFn('second');
    expect(mockFn).toHaveBeenCalledWith('second');
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should maintain inThrottle state correctly', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    // First call executes
    throttledFn('1');
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Subsequent calls within throttle period are ignored
    throttledFn('2');
    throttledFn('3');
    expect(mockFn).toHaveBeenCalledTimes(1);

    // After throttle period, can execute again
    vi.advanceTimersByTime(100);
    throttledFn('4');
    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenLastCalledWith('4');
  });

  it('should handle multiple arguments correctly', () => {
    const mockFn = vi.fn();
    const throttledFn = throttle(mockFn, 100);

    throttledFn('arg1', 'arg2', 123);
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123);
  });
});

describe('raf (requestAnimationFrame)', () => {
  beforeEach(() => {
    // Mock requestAnimationFrame and cancelAnimationFrame
    global.requestAnimationFrame = vi.fn();
    global.cancelAnimationFrame = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should use requestAnimationFrame to execute function', () => {
    const mockFn = vi.fn();
    const rafFn = raf(mockFn);

    (global.requestAnimationFrame as any).mockImplementation((callback: Function) => {
      callback();
      return 1;
    });

    rafFn('test');
    expect(mockFn).toHaveBeenCalledWith('test');
    expect(global.requestAnimationFrame).toHaveBeenCalledTimes(1);
  });

  it('should cancel previous animation frame when called multiple times', () => {
    const mockFn = vi.fn();
    const rafFn = raf(mockFn);

    let rafId = 1;
    (global.requestAnimationFrame as any).mockImplementation(() => ++rafId);

    rafFn('first');
    rafFn('second');

    expect(global.cancelAnimationFrame).toHaveBeenCalledWith(2);
    expect(global.requestAnimationFrame).toHaveBeenCalledTimes(2);
  });

  it('should handle multiple arguments correctly', () => {
    const mockFn = vi.fn();
    const rafFn = raf(mockFn);

    (global.requestAnimationFrame as any).mockImplementation((callback: Function) => {
      callback();
      return 1;
    });

    rafFn('arg1', 'arg2', 123);
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123);
  });

  it('should not cancel animation frame if rafId is null', () => {
    const mockFn = vi.fn();
    const rafFn = raf(mockFn);

    (global.requestAnimationFrame as any).mockImplementation(() => 1);

    rafFn('test');
    expect(global.cancelAnimationFrame).not.toHaveBeenCalled();
  });

  it('should clear rafId after execution', () => {
    const mockFn = vi.fn();
    const rafFn = raf(mockFn);

    let callbackFn: Function;
    (global.requestAnimationFrame as any).mockImplementation((callback: Function) => {
      callbackFn = callback;
      return 1;
    });

    rafFn('test');
    
    // Simulate the RAF callback execution
    callbackFn();
    expect(mockFn).toHaveBeenCalledWith('test');

    // Call again - should not cancel since rafId was cleared
    rafFn('test2');
    expect(global.cancelAnimationFrame).not.toHaveBeenCalled();
  });
});

describe('integration tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should work with different function signatures', () => {
    const mockFn = vi.fn();
    
    // Test that only the last call's arguments are preserved
    const debouncedFn = debounce(mockFn, 10);
    debouncedFn(); // Called with no arguments - will be cancelled
    vi.advanceTimersByTime(5); // Partial wait
    debouncedFn('string'); // Called with 'string' - this will execute
    
    vi.advanceTimersByTime(10);
    expect(mockFn).toHaveBeenCalledOnce();
    expect(mockFn).toHaveBeenCalledWith('string');
  });

  it('should handle function context limitations', () => {
    // The debounce implementation doesn't preserve this context
    // This test verifies the current behavior
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 10);

    debouncedFn('test-arg');
    vi.advanceTimersByTime(10);

    expect(mockFn).toHaveBeenCalledWith('test-arg');
  });
});