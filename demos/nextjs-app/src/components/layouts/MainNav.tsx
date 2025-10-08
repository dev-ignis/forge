'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function MainNav() {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'get-started', label: 'Get Started', href: '/#get-started' },
  ];

  return (
    <nav className="sticky top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="grid h-8 w-8 place-items-center rounded bg-gradient-to-br from-primary-500 to-violet-500 text-white shadow-sm">
            <span className="text-sm font-bold">F</span>
          </div>
          <span className="text-base font-semibold text-neutral-900">Forge</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'text-neutral-900 bg-neutral-100'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/#get-started"
            className="rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white shadow hover:bg-neutral-800 no-underline"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
