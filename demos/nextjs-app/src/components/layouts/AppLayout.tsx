'use client';

import { ReactNode, useEffect } from 'react';
import { ForgeProvider } from '@nexcraft/forge-react';
import { registerForge } from '@/lib/registerForge';
import { MainNav } from './MainNav';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  useEffect(() => {
    // Register components in background, don't block rendering
    registerForge();
  }, []);

  return (
    <ForgeProvider config={{ theme: 'light' }}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <MainNav />
        <main className="relative">
          {children}
        </main>
      </div>
    </ForgeProvider>
  );
}
