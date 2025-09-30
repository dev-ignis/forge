/**
 * @fileoverview Server-side fallback component for debugging and graceful degradation
 * 
 * Provides utilities for detecting SSR environment and debugging hydration issues
 */

import React, { useEffect, useState, type PropsWithChildren } from 'react';

interface ServerFallbackProps {
  /** Component name for debugging */
  component?: string;
  /** Show debug information in development */
  debug?: boolean;
}

/**
 * Helper component to detect server/client rendering and provide debugging info
 */
export function ServerFallback({ 
  component = 'unknown', 
  debug = false, 
  children 
}: PropsWithChildren<ServerFallbackProps>) {
  const [isClient, setIsClient] = useState(false);
  const [hydrationTime, setHydrationTime] = useState<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    setIsClient(true);
    setHydrationTime(performance.now() - startTime);
  }, []);

  if (debug && typeof window !== 'undefined') {
    console.log(`[ServerFallback] ${component}:`, {
      isClient,
      hydrationTime: hydrationTime ? `${hydrationTime.toFixed(2)}ms` : 'pending',
      webComponentsSupported: 'customElements' in window
    });
  }

  return (
    <>
      {children}
      {debug && !isClient && (
        <span 
          style={{ 
            fontSize: '10px', 
            color: '#888', 
            marginLeft: '8px' 
          }}
          data-ssr-debug
        >
          [SSR: {component}]
        </span>
      )}
      {debug && isClient && hydrationTime && (
        <span 
          style={{ 
            fontSize: '10px', 
            color: '#4ade80', 
            marginLeft: '8px' 
          }}
          data-hydration-debug
        >
          [Hydrated: {hydrationTime.toFixed(1)}ms]
        </span>
      )}
    </>
  );
}

/**
 * Hook to detect if we're running on the server or client
 */
export function useIsServer() {
  const [isServer, setIsServer] = useState(true);
  
  useEffect(() => {
    setIsServer(false);
  }, []);
  
  return isServer;
}

/**
 * Hook to detect web component support
 */
export function useWebComponentSupport() {
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkSupport = () => {
      const supported = 'customElements' in window && 
                       'attachShadow' in Element.prototype &&
                       'ShadowRoot' in window;
      setIsSupported(supported);
      setIsLoading(false);
    };
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkSupport);
      return () => document.removeEventListener('DOMContentLoaded', checkSupport);
    } else {
      checkSupport();
    }
  }, []);
  
  return { isSupported, isLoading };
}