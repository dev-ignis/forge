'use client';

import React from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'auto'>(() => {
    if (typeof window === 'undefined') return 'auto';
    return (localStorage.getItem('forge-theme') as any) || 'auto';
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    root.setAttribute('data-forge-theme', theme);
    root.style.setProperty('--forge-theme', theme);
    localStorage.setItem('forge-theme', theme);
  }, [theme]);

  return (
    <div className="flex items-center gap-1 text-xs rounded border border-gray-200 overflow-hidden">
      {(['light', 'dark', 'auto'] as const).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-2 py-1 hover:bg-gray-50 ${theme === t ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}
          aria-pressed={theme === t}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

