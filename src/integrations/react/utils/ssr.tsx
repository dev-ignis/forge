'use client';

/**
 * @fileoverview SSR utilities for Next.js integration
 * 
 * Addresses GitHub Issue #17 SSR compatibility issues:
 * "ReferenceError: HTMLElement is not defined"
 */

import React, { type ComponentType, type ReactElement } from 'react';

/**
 * HOC to provide SSR support for Forge components
 * Prevents server-side rendering issues by deferring to client-side
 */
export function withSSRSupport<P extends object>(
  Component: ComponentType<P>,
  fallback?: ReactElement | null
) {
  const SSRCompatibleComponent = (props: P) => {
    // During SSR, return fallback or null
    if (typeof window === 'undefined') {
      return fallback || null;
    }

    // On client, render the actual component
    return <Component {...props} />;
  };

  SSRCompatibleComponent.displayName = `withSSRSupport(${Component.displayName || Component.name})`;
  return SSRCompatibleComponent;
}

/**
 * Client-only wrapper component for Next.js
 * Alternative to withSSRSupport HOC
 */
export const ClientOnly: React.FC<{ 
  children: React.ReactNode; 
  fallback?: ReactElement | null; 
}> = ({ children, fallback = null }) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback;
  }

  return <>{children}</>;
};