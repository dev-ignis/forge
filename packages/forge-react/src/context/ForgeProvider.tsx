/**
 * @fileoverview React Context Provider for Forge components
 *
 * Provides theme and configuration context for Forge React components
 *
 * Note: This component uses React Context and must be used in a Client Component.
 * If using Next.js App Router, add 'use client' to the file that imports this.
 */

import React, { createContext, useContext, type ReactNode } from 'react';

export interface ForgeConfig {
  theme?: 'light' | 'dark' | 'auto';
  density?: 'compact' | 'comfortable' | 'spacious';
  rtl?: boolean;
}

const ForgeContext = createContext<ForgeConfig>({});

export interface ForgeProviderProps {
  children: ReactNode;
  config?: ForgeConfig;
}

/**
 * Provider component for Forge configuration
 * Usage: <ForgeProvider config={{ theme: 'dark' }}><App /></ForgeProvider>
 *
 * Important: In Next.js App Router, use this in a Client Component file marked with 'use client'
 */
export const ForgeProvider: React.FC<ForgeProviderProps> = ({
  children,
  config = {}
}) => {
  return (
    <ForgeContext.Provider value={config}>
      {children}
    </ForgeContext.Provider>
  );
};

/**
 * Hook to access Forge configuration
 */
export const useForgeConfig = (): ForgeConfig => {
  return useContext(ForgeContext);
};