/**
 * @fileoverview Client-only component for Next.js SSR issues
 * 
 * Addresses GitHub Issue #17 SSR problems by providing a simple
 * client-only wrapper component
 */

import React, { useState, useEffect, type ReactNode, type ReactElement } from 'react';

export interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactElement | null;
}

/**
 * Renders children only on the client side, preventing SSR issues
 * Usage: <ClientOnly><ForgeButton>Click me</ForgeButton></ClientOnly>
 */
export const ClientOnly: React.FC<ClientOnlyProps> = ({ 
  children, 
  fallback = null 
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback;
  }

  return <>{children}</>;
};