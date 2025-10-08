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
      <div className="min-h-screen bg-background">
        <MainNav />
        <main className="mx-auto max-w-6xl px-6 py-8">
          {children}
        </main>
      </div>
    </ForgeProvider>
  );
}
