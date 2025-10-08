'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function MainNav() {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'components', label: 'Components', href: '/components' },
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'ecommerce', label: 'E-Commerce', href: '/ecommerce' },
    { id: 'social', label: 'Social', href: '/social' },
    { id: 'kanban', label: 'Kanban', href: '/kanban' },
    { id: 'settings', label: 'Settings', href: '/settings' },
    { id: 'themes', label: 'Themes', href: '/themes' },
    { id: 'ai', label: 'AI Demo', href: '/ai-demo' },
  ];

  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neutral-900 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-lg font-semibold text-neutral-900">
              Forge
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.slice(0, 5).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
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
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/components"
              className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
