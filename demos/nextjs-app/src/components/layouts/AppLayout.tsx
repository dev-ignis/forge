'use client';

import { ReactNode } from 'react';
import { MainNav } from './MainNav';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <main className="relative">
        {children}
      </main>
    </div>
  );
}
