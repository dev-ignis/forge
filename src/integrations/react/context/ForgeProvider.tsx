'use client';

/**
 * @fileoverview React Context Provider for Forge components
 * 
 * Provides theme and configuration context for Forge React components
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