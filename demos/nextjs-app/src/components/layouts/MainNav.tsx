'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ForgeButton, ForgeIcon } from '@nexcraft/forge/integrations/react';

export function MainNav() {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', label: 'Home', href: '/', icon: 'home' },
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
    { id: 'components', label: 'Components', href: '/components', icon: 'components' },
    { id: 'ecommerce', label: 'E-Commerce', href: '/ecommerce', icon: 'shopping-cart' },
    { id: 'social', label: 'Social', href: '/social', icon: 'users' },
    { id: 'kanban', label: 'Kanban', href: '/kanban', icon: 'trello' },
    { id: 'settings', label: 'Settings', href: '/settings', icon: 'settings' },
    { id: 'themes', label: 'Themes', href: '/themes', icon: 'palette' },
    { id: 'ai', label: 'AI Demo', href: '/ai-demo', icon: 'sparkles' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Forge
              </span>
              <span className="text-xs text-gray-500">AI-Native Components</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.id} href={item.href}>
                  <button
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/dev-ignis/forge"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ForgeIcon name="github" className="w-5 h-5" />
              <span className="hidden lg:inline">GitHub</span>
            </a>
            <ForgeButton variant="primary" size="sm">
              Get Started
            </ForgeButton>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <ForgeIcon name="menu" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
